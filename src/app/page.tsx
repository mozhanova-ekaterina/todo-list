"use client";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ITask } from "./types";

const data: ITask[] = [
  {
    id: "1",
    title: "Важная задача",
    description: "Описание задачи...",
    tags: [{ id: "1", name: "работа" }],
    dueDate: new Date("2024-05-15"),
    isCompleted: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Купить продукты",
    description: "Описание задачи...",
    tags: [
      { id: "2", name: "личное" },
      { id: "3", name: "работа" },
    ],
    dueDate: new Date("2024-05-14"),
    isCompleted: true,
    priority: "low",
  },
  {
    id: "3",
    title: "Купить продукты",
    description: "Описание задачи...",
    tags: [{ id: "3", name: "личное" }],
    dueDate: new Date("2024-05-14"),
    isCompleted: true,
    priority: "low",
  },
];

export default function Home() {
  const [tasks, setTasks] = useLocalStorage("tasks", data);
  return (
    <div className="flex flex-col gap-5">
      <Header />
      <Filters />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <TaskForm setTasks={setTasks}  />
    </div>
  );
}

const Filters = () => {
  return (
    <div className="flex gap-3 px-5">
      <div>Все</div>
      <div>Поиск...</div>
      <div>Сортировка: По дате </div>
    </div>
  );
};


