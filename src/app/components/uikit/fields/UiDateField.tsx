import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru";
import { useEffect, useRef } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { UiTextFiled } from "./UiTextFiled";
import { UiButton } from "../UiButton";
import { ITask } from "@/app/types";
import { dateFormat } from "@/utils/helpers";

type TSizes = {
  default: "default";
  xs: "xs";
};

type Props = {
  size?: keyof TSizes;
  id?: string;
  task: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
};

export function UiDateField({
  size = "default",
  id = "picker-date",
  task,
  setTask,
}: Props) {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        enableTime: true,
        defaultDate: task.dueDate,
        locale: Russian,
        onChange: (selectedDates) => {
          setTask((prev: ITask) => ({ ...prev, dueDate: selectedDates[0] }));
        },
      });
    }
  }, [task.dueDate, setTask]);

  return (
    <div className="relative">
      <UiTextFiled
        id={id}
        ref={datePickerRef}
        size={size}
        label="Дедлайн"
        readOnly
        value={task.dueDate ? dateFormat(task.dueDate) : ""}
      />
      {task.dueDate && (
        <UiButton
          variant="text"
          color="primary"
          className="absolute right-0 top-0"
          icon={<CloseIcon />}
          size={size}
          onClick={() => setTask((prev: ITask) => ({ ...prev, dueDate: "" }))}
        />
      )}
    </div>
  );
}
