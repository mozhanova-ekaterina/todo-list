import clsx from "clsx";
import React from "react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  label?: string;
  helperText?: string;
  error?: string;
};

export function UiTextArea({
  label,
  helperText,
  error,
  ...textareaProps
}: Props) {
  return (
    <div className="flex gap-2 flex-col">
      <div className="relative">
        <textarea
          id="form-textarea"
          placeholder=""
          className={clsx([
            "textarea textarea-floating peer",
            error ? "is-invalid" : "",
          ])}
          {...textareaProps}
        />
        {label && (
          <label htmlFor="form-textarea" className="textarea-floating-label">
            {label}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <div className="label">
          <p className="label-text-alt">{error || helperText}</p>
        </div>
      )}
    </div>
  );
}
