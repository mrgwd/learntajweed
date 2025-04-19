"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "الاسم يجب أن يحتوي على حرفين على الأقل",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح",
  }),
  password: z.string().min(8, {
    message: "كلمة السر يجب أن تحتوي على 8 أحرف على الأقل",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "يجب عليك قبول الشروط والأحكام",
  }),
});

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const router = useRouter();

  const handleSignUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { displayName },
      },
    });
    if (error) {
      console.log("Error signing up:", error.message);
    } else {
      router.push("/home");
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    setIsLoading(true);
    handleSignUp(values.displayName, values.email, values.password);
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الإسم</FormLabel>
                <FormControl>
                  <Input
                    placeholder="أكتب اسمك"
                    className=" rounded-full shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className=" rounded-full shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة السر</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="8 حروف على الأقل"
                    className=" rounded-full shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    أوافق على{" "}
                    <a href="#" className="underline">
                      سياسة الخصوصية
                    </a>{" "}
                    والشروط والأحكام
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            أو سجل باستخدام
          </span>
        </div>
      </div>

      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex shadow-none rounded-full items-center justify-center gap-2"
        type="button"
      >
        <Image src="/svg/google.svg" alt="Google" width={20} height={20} />
        جوجل
      </Button>
    </div>
  );
}
