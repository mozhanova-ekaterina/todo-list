import { useState } from "react";
import { ITask } from "../types";
import { IdUnique } from "@/utils/helpers";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import UiTextArea from "./uikit/fields/UiTextArea";
import TagsBlock from "./TagsBlock";
import UiDateField from "./uikit/fields/UiDateField";
import UiPriorityField from "./uikit/fields/UiPriorityField";

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
  dueDate: undefined,
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
        error="Поле должно быть заполнено"
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

      <UiPriorityField newTask={newTask} setNewTask={setNewTask} />

      <div className="flex gap-2">
        <button type="submit" className="border px-2">
          Сохранить
        </button>
      </div>
    </form>
  );
}
