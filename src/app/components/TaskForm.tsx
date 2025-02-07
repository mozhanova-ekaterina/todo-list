import { useState } from "react";
import { ITask } from "../types";
import { IdUnique } from "@/utils/helpers";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import UiTextArea from "./uikit/fields/UiTextArea";
import TagsBlock from "./TagsBlock";
import UiDateField from "./uikit/fields/UiDateField";

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const initialTask = {
  title: "",
  description: "",
  tags: [
    { id: "1", name: "дом" },
    { id: "2", name: "работа" },
  ],
  dueDate: new Date(),
  isCompleted: false,
  priority: "low",
};

export default function TaskForm({ setTasks }: Props) {
  const [newTask, setNewTask] = useState<ITask>({
    ...initialTask,
    id: IdUnique(),
  } as ITask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prev) => [...prev, newTask]);
    setNewTask({ ...initialTask, id: IdUnique() } as ITask);
  };

  

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-3 p-5 border max-w-[400px]"
    >
      <h2>Добавить задачу</h2>
      <UiTextFiled
        value={newTask.title}
        placeholder=""
        label="Введите название задачи"
        required //работает если form onSubmit 
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        helperText="Не более 50 символов"
        // error="error"???:
      />

      <UiTextArea
        value={newTask.description}
        placeholder=""
        label="Описание"
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        helperText="Не более 200 символов"
      />
      <TagsBlock setNewTask={setNewTask} newTask={newTask} />

      <UiDateField newTask={newTask} setNewTask={setNewTask} />

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
        <button type="submit" className="border px-2">
          Сохранить
        </button>
      </div>
    </form>
  );
}
