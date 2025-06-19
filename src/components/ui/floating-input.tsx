import React, { useState } from "react";
import clsx from "clsx";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={isFocused ? placeholder : " "}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={clsx(
          "peer w-full h-12 border border-gray-300 rounded-md text-[15px] px-3 pt-5 pb-2 text-base",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-black-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}

        {...props}
      />
      <label
        className={clsx(
          "absolute left-2.5 px-1 bg-white text-gray-500 text-sm transition-all font-semibold text-[15px]",
          "-top-2 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black",
          "peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black-500"
        )}
      >
        {label}
      </label>
    </div>
  );
};
