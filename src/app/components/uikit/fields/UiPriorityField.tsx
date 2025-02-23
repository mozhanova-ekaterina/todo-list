import { TPriority } from "@/app/types";
import clsx from "clsx";

const sizes = {
  default: "",
  xs: "select-xs",
};

type Props = {
  value: string;
  label?: string;
  size?: keyof typeof sizes;
  className?: string;
  options: { value: string; label: string }[];
  onChange: (value: TPriority) => void;
};

export function UiSelectField({
  label,
  value,
  options,
  onChange,
  className,
  size = "default",
}: Props) {
  return (
    <div className="relative">
      <select
        id="select-priority"
        className={clsx(["select select-floating", className, sizes[size]])}
        value={value}
        onChange={(e) => onChange(e.target.value as TPriority)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {size != "xs" && label && (
        <label htmlFor="select-priority" className="select-floating-label">
          {label}
        </label>
      )}
    </div>
  );
}
