"use client";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

interface CustomInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  placeholder?: string;
  type?: string;
  label?: string | boolean;
  autoFocus?: boolean;
}

const Input3 = <T extends FieldValues>(props: CustomInputProps<T>) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController(props);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {props.label && (
          <label
            htmlFor={props.name}
            className={`text-md mr-2 self-center w-24 text-end`}
          >
            {props.label != true ? props.label : props.name}
          </label>
        )}
        {props.type != "textarea" ? (
          <input
            {...inputProps}
            ref={ref}
            placeholder={props.placeholder || props.name}
            autoFocus={props.autoFocus}
            className="py-1 px-2  min-w-0 shadow bg-white/60 dark:bg-white/70 rounded border-light/50 dark:border grow text-dark placeholder:text-dark/40"
            id={props.name}
            type={props.type || "text"}
          />
        ) : (
          <textarea
            {...inputProps}
            ref={ref}
            placeholder={props.placeholder || props.name}
            rows={4}
            className="py-1 px-2 flex-1 shadow bg-white/60 dark:bg-black/40 rounded border-light/50 dark:border"
            id={props.name}
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
export default Input3;
