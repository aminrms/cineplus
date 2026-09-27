import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luminous disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-[44px] px-5",
  {
    variants: {
      variant: {
        default: "btn-primary-gradient text-white shadow-glow",
        secondary: "bg-elevated text-slate-100 border border-white/10 hover:bg-white/10",
        outline: "border border-white/15 bg-transparent hover:bg-white/5 text-slate-100",
        ghost: "hover:bg-white/5 text-slate-200",
        destructive: "bg-error text-white hover:brightness-110",
      },
      size: { default: "h-11", sm: "h-9 px-4 text-[13px]", lg: "h-[52px] px-8 text-base", icon: "h-11 w-11 px-0" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}
export function Button({ className, variant, size, asChild, loading, children, disabled, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />}
      {children}
    </Comp>
  );
}
export { buttonVariants };
