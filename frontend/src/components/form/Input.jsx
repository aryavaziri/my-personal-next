"use client";
import { useController, useForm } from "react-hook-form";
import React from "react";

const Input = ({
  name,
  label,
  errors,
  register,
  placeholder,
  autoFocus,
  required,type,
  ...rest
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-2">
        {label && (
          <label htmlFor={name} className={`text-sm mr-2 self-center w-8 text-end`}>
            {label}
          </label>
        )}
        <input
          {...register(name, { required: required })}
          placeholder={type!=="file" && placeholder || name}
          autoFocus={autoFocus}
          className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded"
          id={name}
          type={type||"text"}
        />

      </div>
      {errors[name] && (
        <span className="text-danger text-sm ml-12">
          {errors[name].message || "This field is required"}
        </span>
      )}
    </div>
  );
};
export default Input;
