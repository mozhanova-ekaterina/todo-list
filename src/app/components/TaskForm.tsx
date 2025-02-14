import UiTextFiled from "./uikit/fields/UiTextFiled";
import UiTextArea from "./uikit/fields/UiTextArea";
import TagsBlock from "./TagsBlock";
import UiDateField from "./uikit/fields/UiDateField";
import UiPriorityField from "./uikit/fields/UiPriorityField";
import UiButton from "./uikit/UiButton";
import { ListIcon } from "./icons/ListIcon";
import taskStore from "../stores/taskStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ITask } from "../types";
import { v4 as uuid } from "uuid";

const initialTask: ITask = {
  id: '',
  title: "",
  description: "",
  tags: [],
  dueDate: '',
  priority: "medium",
  isCompleted: false,
};

export default observer(function TaskForm() {
  const [newTask, setNewTask] = useState<ITask>(initialTask);

  const handleSubmit = () => {
    taskStore.addTask({...newTask, id: uuid()});
    setNewTask(initialTask);
  };

  return (
    <form className="flex flex-col gap-3 p-5 border relative animate-slide-left">
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

      <UiDateField task={newTask} setTask={setNewTask} />

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
});
