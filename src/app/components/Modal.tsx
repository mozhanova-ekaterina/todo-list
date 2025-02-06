import { useState } from "react";
import { Tag, Task } from "../types";
import { IdUnique } from "@/utils/helpers";

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const initialTask = {
  title: "",
  description: "",
  tags: [],
  dueDate: new Date(),
  isCompleted: false,
  priority: "low",
};

export default function Modal({ setTasks }: Props) {
  const [tag, setTag] = useState<Tag>();
  const [newTask, setNewTask] = useState<Task>({
    ...initialTask,
    id: IdUnique(),
  } as Task);

  const tags = newTask.tags.map((tag) => `#${tag.name} `);

  const addTask = () => {
    setTasks((prev) => [...prev, newTask]);
    setNewTask({ ...initialTask, id: IdUnique() } as Task);
  };

  return (
    <div className="flex flex-col gap-3 p-5 border max-w-[400px]">
      <h2>Добавить задачу</h2>
      <div className="flex gap-2">
        Название
        <input
          className="border"
          type="text"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          value={newTask.title}
        />
      </div>
      <div className="flex gap-2">
        Описание
        <textarea
          className="border"
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="flex gap-2">
        Тег
        <input
          className="border"
          type="text"
          onChange={(e) =>
            setTag({
              id: IdUnique(),
              name: e.target.value,
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNewTask({
                ...newTask,
                tags: [...newTask.tags, tag!],
              });
              e.currentTarget.value = "";
            }
          }}
        />
        <div className="flex gap-1">{tags}</div>
      </div>
      <div className="flex gap-2">
        Дедлайн
        <input
          type="date"
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
        />
        ;
      </div>
      <div className="flex gap-2">
        Приоритет
        <select
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="high">🔴</option>
          <option value="medium">🟡</option>
          <option value="low">🔵</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="border px-2" onClick={addTask}>
          Сохранить
        </button>
      </div>
    </div>
  );
}
