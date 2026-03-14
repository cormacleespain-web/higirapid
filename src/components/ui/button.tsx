"use client";

import Link from "next/link";
import { motion } from "motion/react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  className?: string;
};

const variantClasses = {
  primary: "bg-primary text-content-inverse hover:bg-primary/90 shadow-sm",
  secondary: "bg-accent text-content-primary hover:bg-accent/90",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
  ghost: "text-primary hover:bg-primary/10",
  whatsapp:
    "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm focus-visible:ring-emerald-400",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm min-h-[36px]",
  md: "px-6 py-3 text-base min-h-[44px]",
  lg: "px-8 py-4 text-lg min-h-[48px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth,
  children,
  "aria-label": ariaLabel,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-bold rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-hover-scale";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {loading ? (
          <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <motion.span className="inline-flex items-center justify-center gap-3" {...motionProps}>
            {children}
          </motion.span>
        )}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={classes}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...motionProps}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden />
      ) : (
        children
      )}
    </motion.button>
  );
}
