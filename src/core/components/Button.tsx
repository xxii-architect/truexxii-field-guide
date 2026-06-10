import type { MouseEventHandler, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "ghost"
  | "truxxii";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  label: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-truexxii-olive text-truexxii-parchment border border-truexxii-charcoal shadow-sketch hover:bg-[#4a7736] focus:ring-truexxii-charcoal/40",
  success:
    "bg-truexxii-forest text-truexxii-parchment border border-truexxii-charcoal shadow-sketch hover:bg-[#2a452a] focus:ring-truexxii-charcoal/40",
  warning:
    "bg-truexxii-earth text-truexxii-parchment border border-truexxii-charcoal shadow-sketch hover:bg-[#7b6248] focus:ring-truexxii-charcoal/40",
  danger:
    "bg-truexxii-cocoa text-truexxii-parchment border border-truexxii-charcoal shadow-sketch hover:bg-[#3e2d25] focus:ring-truexxii-charcoal/40",
  neutral:
    "bg-[rgba(232,220,194,0.9)] text-truexxii-forest border border-truexxii-charcoal shadow-sm hover:bg-[rgba(232,220,194,1)] focus:ring-truexxii-charcoal/30",
  ghost:
    "bg-transparent border border-truexxii-charcoal text-truexxii-forest shadow-sm hover:bg-[rgba(58,58,58,0.05)] focus:ring-truexxii-charcoal/30",
  truxxii:
    "bg-truexxii-cocoa text-truexxii-parchment border border-truexxii-charcoal shadow-sketch hover:bg-[#3a2d25] focus:ring-truexxii-charcoal/40",
};

export default function Button({
  variant,
  label,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}
