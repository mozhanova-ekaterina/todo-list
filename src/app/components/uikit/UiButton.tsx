import clsx from "clsx";
import React from "react";

const sizes = {
  default: "",
  xs: "btn-xs",
  sm: "btn-sm",
  lg: "btn-lg",
};

const variants = {
  solid: "",
  outline: "btn-outline",
  text: "btn-text",
  soft: "btn-soft",
};

const colors = {
  warning: "btn-warning",
  success: "btn-success",
  error: "btn-error",
  accent: "btn-accent",
  primary: "btn-primary",
  default: "",
};

type Props = {
  id?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  circle?: boolean;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  color?: keyof typeof colors;
  ref?: React.Ref<HTMLButtonElement>;
  onClick?: () => void;
};

export function UiButton({
  id,
  variant = "solid",
  size = "default",
  type = "button",
  color = "default",
  icon,
  circle,
  className,
  children,
  ...props
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        id={id}
        type={type}
        className={clsx([
          "btn",
          circle && "btn-circle",
          sizes[size],
          variants[variant],
          colors[color],
          className,
        ])}
        {...props}
      >
        {children}
        {icon}
      </button>
    </div>
  );
}
