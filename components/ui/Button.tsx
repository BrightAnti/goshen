"use client";

import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" |
  "onDragStart" | "onDrag" | "onDragEnd"
> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center border";

  const variantClasses = {
    primary:
      "bg-white text-primary border-primary hover:bg-primary-50 focus:ring-2 focus:ring-primary-200",
    secondary:
      "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200",
    accent:
      "bg-white text-accent border-accent hover:bg-amber-50 focus:ring-2 focus:ring-accent-200",
    danger:
      "bg-white text-red-600 border-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-200",
    ghost:
      "bg-transparent text-primary border-transparent hover:bg-primary-50 focus:ring-2 focus:ring-primary-200",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed": disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
