"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح",
  }),
  password: z.string().min(8, {
    message: "كلمة السر يجب أن تحتوي على 8 أحرف على الأقل",
  }),
});
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleGoogleLogin = async () => {
    await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/home`,
      },
    });
  };
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Login error:", error.message);
      form.setError("password", {
        type: "manual",
        message: `فشل تسجيل الدخول! ${error.message}.`,
      });
    } else if (data && data.user) {
      router.push("/home");
    } else {
      form.setError("password", {
        type: "manual",
        message: "فشل تسجيل الدخول. من فضلك تحقق من بيانات الاعتماد الخاصة بك.",
      });
    }
  };
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { email, password } = data;
    await handleLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className="shadow-none rounded-full"
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
                    className="shadow-none rounded-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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
        className="w-full flex rounded-full items-center justify-center gap-2"
        type="button"
      >
        <Image src="/svg/google.svg" alt="Google" width={20} height={20} />
        جوجل
      </Button>
    </div>
  );
}
