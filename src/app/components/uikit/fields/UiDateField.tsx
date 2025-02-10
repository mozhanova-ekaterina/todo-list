import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru";
import { useEffect, useRef } from "react";
import { ITask } from "@/app/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";


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
        defaultDate: undefined,
        locale: Russian,
        onChange: (selectedDates) => {
          setNewTask({
            ...newTask,
            dueDate: format(selectedDates[0], "dd MMMM yyyy HH:mm", {locale: ru}),
          });
        },
      });
    }
  }, [newTask, setNewTask]);
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


// import { differenceInDays, differenceInHours } from 'date-fns';

// const start = new Date(2023, 9, 1); // 1 октября 2023
// const end = new Date(2023, 9, 5); // 5 октября 2023

// console.log(differenceInDays(end, start)); // 4 (дня)
// console.log(differenceInHours(end, start)); // 96 (часов)

// import { addDays, subHours } from 'date-fns';

// const today = new Date();
// const tomorrow = addDays(today, 1); // Завтра
// const twoHoursAgo = subHours(today, 2); // 2 часа назад


//!!!: РЕАЛИЗОВАТЬ
//убрать показ времени в таске, если онго не выбрано пользоветелем
// если до дедлайна остаётся мало времени, то таска подсвечивается
//так же показывается сколько времени осталось, с точностью до минуты
//добавить возможность отложить дедлайн до определённого времени
//настройка, за какое время до дедлайна начинает подсвечивается таска