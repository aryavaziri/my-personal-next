"use client";
import { useController } from "react-hook-form";
import React from "react";

const Input = ({ name, label, type, placeholder, autoFocus, required, control, value }) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name: name,
    control: control,
    rules: { required: required },
    defaultValue: value || '',
  });


  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-2">
        {label && (
          <label htmlFor={name} className={`text-sm mr-2 self-center w-8 text-end`}>
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          placeholder={type !== "file" ? placeholder || name : ""}
          autoFocus={autoFocus}
          className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded"
          id={name}
          type={type || "text"}
        />
      </div>
      {error && (
        <span className="text-danger text-sm ml-12">
          {error.message || "This field is required"}
          {console.log(error)}
        </span>
      )}
    </div>
  );
};
export default Input;