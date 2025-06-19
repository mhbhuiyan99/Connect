import React, { useRef, useState } from "react";
import clsx from "clsx";

interface FloatingFileInputProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export const FloatingFileInput: React.FC<FloatingFileInputProps> = ({
    label,
    onChange,
    disabled = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file?.name || "");
        onChange(e);
    };

    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
                id="floatingFileInput"
            />

            <label
                htmlFor="floatingFileInput"
                className={clsx(
                    "peer block w-full h-12 px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer bg-white",
                    "hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-between",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                {fileName || "Choose File"}
            </label>

            <span
                className={clsx(
                    "absolute left-3 -top-2 px-1 text-xs text-gray-500 bg-white",
                    "peer-focus:text-blue-600"
                )}
            >
                {label}
            </span>
        </div>
    );
};
