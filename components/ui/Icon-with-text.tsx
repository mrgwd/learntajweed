import { cn } from "@/lib/utils";
import Image from "next/image";
interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function IconWithText({ className, children }: Props) {
  return (
    <div className={cn("flex gap-2 items-start", className)}>
      <div className="rounded-full mt-0.5 bg-primary/30 p-1 flex items-center size-5 justify-center aspect-square">
        <Image src="/svg/diamond.svg" alt="diamond" width={14} height={14} />
      </div>
      <div>{children}</div>
    </div>
  );
}
