import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  description?: string;
  icon?: string;
  type?: "danger" | "info" | "warning";
  children?: React.ReactNode;
}
export default function Note({ type = "info", children }: Props) {
  const baseClasses =
    "flex items-center gap-2 md:gap-3 p-4 mb-4 text-sm rounded-2xl dark:bg-gray-800 dark:text-gray-300 border border-solid";
  const variants = {
    danger:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
    info: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300 border-gray-200",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
  };
  return (
    <div className={cn(baseClasses, variants[type as keyof typeof variants])}>
      {children}
    </div>
  );
}
