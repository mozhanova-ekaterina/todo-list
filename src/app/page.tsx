"use client";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Task } from "./types";

const data: Task[] = [
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

// /todo-app
//   /public
//     /icons
//       add.svg
//       delete.svg
//     /images
//       empty-state.png
//     favicon.ico
//   /src
//     /components
//       /TaskList
//         TaskList.tsx
//         TaskList.test.tsx
//       /TaskItem
//         TaskItem.tsx
//         TaskItem.test.tsx
//       /TaskForm
//         TaskForm.tsx
//         TaskForm.test.tsx
//       /Modal
//         Modal.tsx
//         Modal.test.tsx
//       /Header
//         Header.tsx
//         Header.test.tsx
//       /Footer
//         Footer.tsx
//         Footer.test.tsx
//     /pages
//       /api
//         tasks.ts
//       index.tsx
//       _app.tsx
//       _document.tsx
//     /stores
//       taskStore.ts
//       rootStore.ts
//     /hooks
//       useLocalStorage.ts
//     /utils
//       helpers.ts
//       constants.ts
//     /types
//       taskTypes.ts
//     /styles
//       globals.css
//     /layouts
//       MainLayout.tsx
//     /context
//       ThemeContext.tsx
//   /tailwind
//     tailwind.config.js
//   /tests
//     /components
//       TaskList.test.tsx
//       TaskItem.test.tsx
//     /stores
//       taskStore.test.ts
//   .eslintrc
//   .prettierrc
//   next.config.js
//   tsconfig.json
//   package.json
//   README.md


