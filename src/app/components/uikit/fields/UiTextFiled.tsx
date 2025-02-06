import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  type?: string;
  id?: string;
};

export default function UiTextFiled({ ...inputProps }: Props) {
  return (
    <div className="flex gap-2">
      <label>Название</label>
      <input className="border" {...inputProps} />
    </div>
  );
}
