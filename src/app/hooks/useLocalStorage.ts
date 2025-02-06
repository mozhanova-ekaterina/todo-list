import { useState, useEffect } from "react";
import { Task } from "../types";

export const useLocalStorage = (key: string, initialValue: Task[]) => {
  // Загрузка данных из localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Состояние для задач
  const [tasks, setTasks] = useState<Task[]>(initial);

  // Сохранение задач в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [key, tasks]);

  return [tasks, setTasks] as const;
};
