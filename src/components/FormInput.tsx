"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  placeholder?: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

export default function FormInput({
  placeholder,
  type,
  register,
  error,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full p-2 border rounded-md transition focus:outline-green-700 focus:outline-1 focus:border-0 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">
          {error.message || "Invalid value"}
        </span>
      )}
    </div>
  );
}
