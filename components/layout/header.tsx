import Logo from "../ui/logo";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex my-4 sm:mt-8 items-center justify-between">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="space-x-2 *:rounded-full">
          <Button variant="default" asChild>
            <Link href="/login">تسجيل الدخول</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/sign-up">سجل الآن مجانًا</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
