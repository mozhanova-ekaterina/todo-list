import { useState } from "react";
import { Tag, Task } from "../types";
import { IdUnique } from "@/utils/helpers";
import UiTextFiled from "./uikit/fields/UiTextFiled";

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

export default function TaskForm({ setTasks }: Props) {
  const [tag, setTag] = useState<Tag>();
  const [newTask, setNewTask] = useState<Task>({
    ...initialTask,
    id: IdUnique(),
  } as Task);

  const tags = newTask.tags.map((tag) => `#${tag.name} `);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks((prev) => [...prev, newTask]);
    setNewTask({ ...initialTask, id: IdUnique() } as Task);
  };

  return (
    <form
      onSubmit={(e) => addTask(e)}
      className="flex flex-col gap-3 p-5 border max-w-[400px]"
    >
      <h2>Добавить задачу</h2>
      <UiTextFiled
        value={newTask.title}
        placeholder="Введите название задачи"
        label="Название"
        type="text"
        required
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        helperText="Не более 50 символов"
        error={false}
      />

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
        <button className="border px-2" type="submit">
          Сохранить
        </button>
      </div>
    </form>
  );
}
