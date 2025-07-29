"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidate?: (value: string) => string | null;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChange,
  onValidate,
  type = "text",
  placeholder = "",
  children = null,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    setIsFocused(false);
    if (onValidate) {
      const validationError = onValidate(value);
      setError(validationError);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={isFocused ? placeholder : " "}
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleBlur()}
        className={clsx(
          "peer w-full h-12 border border-gray-300 rounded-md text-[15px] px-3 pt-5 pb-2 text-base",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-black-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        {...props}
      />
      {children}
      <label
        className={clsx(
          "absolute left-2.5 px-1 bg-white text-gray-500 text-sm transition-all font-semibold text-[15px]",
          "-top-2 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black",
          "peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black-500"
        )}>
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
