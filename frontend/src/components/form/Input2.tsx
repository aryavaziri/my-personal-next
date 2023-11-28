"use client";
import { useController, Control } from "react-hook-form";
import React from "react";
const inputSchema = z.object({
  name: z.string(),
  label: z.boolean(),
  type: z.string().optional(),
  placeholder: z.string().optional(),
  autoFocus: z.boolean().optional(),
  value: z.string().optional(),
});
import { z } from "zod";
import { schema } from "@app/contact/page";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Input = z.infer<typeof inputSchema> & {
  control: Control;
};

const Input2: React.FC<Input> = ({
  name,
  label,
  type,
  placeholder,
  autoFocus,
  control,
  value,
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name: name,
    control: control,
    defaultValue: value || "",
  });
  error && console.log(error);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {label && (
          <label
            htmlFor={name}
            className={`text-md font-bold mr-2 self-center w-16 text-end`}
          >
            {label == true ? name : label}
          </label>
        )}
        {type != "textarea" ? (
          <input
            {...inputProps}
            ref={ref}
            placeholder={type !== "file" ? placeholder || name : ""}
            autoFocus={autoFocus}
            className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded border-light/50 dark:border"
            id={name}
            type={type || "text"}
          />
        ) : (
          <textarea
            {...inputProps}
            ref={ref}
            placeholder={placeholder || name}
            rows={3}
            className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded border-light/50 dark:border"
            id={name}
          />
        )}
      </div>
      {error && (
        <span className="text-danger text-sm ml-20">
          {error.message || "This field is required"}
        </span>
      )}
    </div>
  );
};
export default Input2;
