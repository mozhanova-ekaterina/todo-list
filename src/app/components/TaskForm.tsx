import { useState } from "react";
import { ITask } from "../types";
import { IdUnique } from "@/utils/helpers";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import UiTextArea from "./uikit/fields/UiTextArea";
import TagsBlock from "./TagsBlock";
import UiDateField from "./uikit/fields/UiDateField";
import UiPriorityField from "./uikit/fields/UiPriorityField";
import UiButton from "./uikit/UiButton";
import { ListIcon } from "./icons/ListIcon";

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialTask = {
  title: "",
  description: "",
  tags: [
    // { id: "1", name: "дом" },
    // { id: "2", name: "работа" },
  ],
  dueDate: undefined,
  isCompleted: false,
  priority: "low",
};

export default function TaskForm({ setTasks, setIsAdding }: Props) {
  const [newTask, setNewTask] = useState<ITask>({
    ...initialTask,
    id: IdUnique(),
  } as ITask);

  const handleSubmit = () => {
    setTasks((prev) => [...prev, newTask]);
    setNewTask({ ...initialTask, id: IdUnique() } as ITask);
  };

  return (
    <form
      className="flex flex-col gap-3 p-5 border relative animate-slide-left"
    >
      {/* <UiButton
        className="absolute top-2 right-5"
        onClick={() => setIsAdding(false)}
        size="xs"
        variant="text"
      >
        Закрыть
      </UiButton> */}
      <h2>Добавить задачу</h2>

      <UiTextFiled
        value={newTask.title}
        placeholder=""
        label="Введите название задачи"
        required //работает если есть  form onSubmit
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        helperText="Не более 50 символов"
        // error="Поле должно быть заполнено"
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

      <UiPriorityField
        newTask={newTask}
        setNewTask={setNewTask}
        label="Приоритет"
      />
      <UiButton onClick={handleSubmit} icon={<ListIcon />}>
        Добавить
      </UiButton>
    </form>
  );
}
