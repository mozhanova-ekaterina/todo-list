import clsx from "clsx";

type Props = {
  id?: string;
  checked?: boolean;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UiCheckbox({ id, checked, onChange, label }: Props) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-primary"
      />
      <label
        htmlFor={id}
        className={clsx(["label label-text ", checked && "line-through"])}
      >
        {label}
      </label>
    </>
  );
}
