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
    <div className="flex flex-col">
      <div className="flex gap-2">
        {label && (
          <label htmlFor={name} className={`text-md font-bold mr-2 self-center w-16 text-end`}>
            {label == 1 ? name : label}
          </label>
        )}
        {type != "textarea" ?
          <input
            {...inputProps}
            ref={ref}
            placeholder={type !== "file" ? placeholder || name : ""}
            autoFocus={autoFocus}
            className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded border-light/50 dark:border"
            id={name}
            type={type || "text"}
          />
          :
          <textarea
            {...inputProps}
            ref={ref}
            placeholder={placeholder || name}
            rows='3'
            className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded border-light/50 dark:border"
            id={name}
          />
        }
      </div>
      {error && (
        <span className="text-danger text-sm ml-20">
          {error.message || "This field is required"}
          {console.log(error)}
        </span>
      )}
    </div>
  );
};
export default Input;