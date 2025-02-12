import clsx from "clsx";
import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
};

export default function UiTextArea({
  label,
  required = false,
  helperText,
  error,
  ...textareaProps
}: Props) {
  return (
    <div className="flex gap-2 flex-col">
      <div className="relative">
        <textarea
          id="textarea"
          className={clsx([
            "textarea input-floating peer",
            error ? "is-invalid" : "",
          ])}
          aria-label="Textarea"
          required={required}
          {...textareaProps}
        />
        {label && (
          <label htmlFor="textarea" className="input-floating-label">
            {label}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <div className="label">
          <p className="label-text-alt">{error ?? helperText}</p>
        </div>
      )}
    </div>
  );
}
