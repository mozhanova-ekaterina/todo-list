import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru";
import { useEffect, useRef } from "react";
import { ITask } from "@/app/types";

type Props = {
  newTask: ITask;
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
};

export default function UiDateField({ newTask, setNewTask }: Props) {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        enableTime: true,
        locale: Russian,
        onChange: (selectedDates) => {
          setNewTask({ ...newTask, dueDate: selectedDates[0] });
        },
      });
    }
  }, []);
  return (
    <div className="relative mt-2">
      <input
        id="date"
        type="text"
        placeholder=""
        ref={datePickerRef}
        className="input input-floating peer"
      />
      <label htmlFor="date" className="input-floating-label">
        Дедлайн
      </label>
    </div>
  );
}
