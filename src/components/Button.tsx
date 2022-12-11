"use client";

import React from "react";

type ButtonProps = {
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ primary, children, onClick, disabled, className }, ref) => {
    return (
      <button
        className={[
          "cursor-pointer select-none px-16 py-4 border-2 border-blue-500 rounded-lg font-bold whitespace-nowrap",
          primary ? "bg-blue-500 text-white" : "",
          className,
        ].join(" ")}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default Button;
