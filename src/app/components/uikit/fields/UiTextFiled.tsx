import clsx from "clsx";

const sizes = {
  default: "",
  xs: "input-xs",
  sm: "input-sm",
  lg: "input-lg",
};

type Props = {
  id?: string;
  value?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  type?: 'text' | 'search';
  size?: keyof typeof sizes;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function UiTextFiled({
  type = "text",
  label,
  required = false,
  helperText,
  error,
  size = "default",
  id = "input",
  className,
  ...inputProps
}: Props) {
  return (
    <div className="flex flex-col gap-1 relative">
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder=''
          className={clsx([
            "input input-floating peer",
            sizes[size],
            error ? "is-invalid" : "",
            className,
          ])}
          required={required}
          {...inputProps}
        />
        {label && size !== "xs" && (
          <label htmlFor={id} className="input-floating-label">
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
