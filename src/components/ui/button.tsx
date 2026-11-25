import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-semibold tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-navy-deep",
        secondary:
          "border border-navy/30 bg-transparent text-navy hover:border-navy hover:bg-navy/5",
        gold: "bg-gold text-navy-deep hover:bg-gold-soft",
        ghost: "text-navy hover:bg-navy/5",
      },
      size: {
        default: "min-h-11 px-6 py-3",
        small: "min-h-9 px-4 py-2 text-xs",
        large: "min-h-13 px-8 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
