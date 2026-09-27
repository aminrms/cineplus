import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("flex h-11 w-full rounded-[12px] border border-white/10 bg-surface px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-luminous focus:outline-none focus:ring-2 focus:ring-electric/30 disabled:opacity-50", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
