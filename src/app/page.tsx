"use client";
import Header from "./components/Header";
import Modal from "./components/Modal";
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
      <Modal setTasks={setTasks}  />
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

// [Header]
// | Logo |                  | [+] Добавить | [🌓] |

// [Filters]
// | [Все ▼] | [Поиск...] | [Сортировка: По дате ▼] |

// [Task List]
// - [ ] Важная задача              #работа 🔴 15 мая
//   Описание задачи... ✏️ 🗑️
// - [x] Купить продукты   #личное 🟢 14 мая ✏️ 🗑️

// [Modal]
// Добавить задачу
// Название     [_______________]
// Описание     [textarea]
// Тег          [● Работа ● Личное]
// Дедлайн      [📅 2024-05-20]
// Приоритет    [🔴 🟡 🔵]
// [Сохранить] [Отмена]

// /todo-app
//   /public
//     index.html
//     favicon.ico
//   /src
//     /components
//       /TaskList
//         TaskList.tsx
//         TaskList.module.css
//       /TaskItem
//         TaskItem.tsx
//         TaskItem.module.css
//       /TaskForm
//         TaskForm.tsx
//         TaskForm.module.css
//       /Modal
//         Modal.tsx
//         Modal.module.css
//       /Header
//         Header.tsx
//         Header.module.css
//       /Footer
//         Footer.tsx
//         Footer.module.css
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
//     /assets
//       /icons
//         add.svg
//         delete.svg
//       /images
//         empty-state.png
//     /styles
//       global.css
//       theme.css
//     App.tsx
//     index.tsx
//     react-app-env.d.ts
//   /config
//     webpack.config.js
//     tsconfig.json
//   /tests
//     /components
//       TaskList.test.tsx
//       TaskItem.test.tsx
//     /stores
//       taskStore.test.ts
//   .eslintrc
//   .prettierrc
//   package.json
//   README.md
