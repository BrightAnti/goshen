import classNames from "classnames";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  compact?: boolean;
  fillHeight?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      compact = false,
      fillHeight = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={classNames("w-full", {
          "flex flex-col flex-1 min-h-0": fillHeight,
        })}
      >
        {label && (
          <label
            className={classNames(
              "block font-medium text-gray-700",
              compact ? "text-xs mb-1" : "text-sm mb-2"
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={classNames(
            "w-full border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none",
            compact ? "px-3 py-1.5 text-sm" : "px-4 py-2",
            {
              "border-red-500 focus:ring-red-500 focus:border-red-500": error,
              "border-gray-300": !error,
              "flex-1 min-h-[5rem]": fillHeight,
            },
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;















