import clsx from "clsx";

const sizes = {
  xs: "input-xs",
  md: "input-sm",
  lg: "input-lg",
};

type Props = {
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  size?: keyof typeof sizes;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function UiTextFiled({
  type = "text",
  label,
  required = false,
  helperText,
  error,
  size = "md",
  ...inputProps
}: Props) {
  return (
    <div className="flex flex-col gap-1 relative">
      <div className="relative">
        <input
          id="input"
          type={type}
          className={clsx(["input input-floating peer", sizes[size]])}
          aria-label="input"
          required={required}
          {...inputProps}
        />
        {label && (
          <label htmlFor="input" className="input-floating-label">
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
