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
          className="textarea max-w-sm input-floating peer"
          aria-label="Textarea"
          required={required}
          {...textareaProps}
        ></textarea>
        {label && (
          <label htmlFor="textarea" className="input-floating-label">
            {label}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <p className={clsx(["text-xs pl-2", error ? "text-red-400" : ""])}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
