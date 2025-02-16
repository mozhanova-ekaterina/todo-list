import { observer } from "mobx-react-lite";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import TagsField from "./TagsField";
import { ITask } from "@/app/types";
import taskStore from "@/app/stores/taskStore";
import {
  UiButton,
  UiDateField,
  UiPriorityField,
  UiTextArea,
  UiTextFiled,
} from "../uikit";
import { AddIcon, ListIcon, MinusIcon } from "../uikit/icons";
import { Layout } from "./Layout";

const initialTask: ITask = {
  id: "",
  title: "",
  description: "",
  tags: [],
  dueDate: "",
  priority: "medium",
  isCompleted: false,
};

export default observer(function TaskForm() {
  const [newTask, setNewTask] = useState<ITask>(initialTask);

  const handleSubmit = () => {
    taskStore.addTask({ ...newTask, id: uuid() });
    setNewTask(initialTask);
  };

  return (
    <Layout
      formTitle="Добавить задачу"
      titleField={
        <UiTextFiled
          value={newTask.title}
          label="Введите название задачи"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          helperText="Не более 50 символов"
        />
      }
      descriptionField={
        <UiTextArea
          value={newTask.description}
          label="Описание"
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          helperText="Не более 200 символов"
        />
      }
      tagsField={
        <TagsField editable setNewTask={setNewTask} newTask={newTask} />
      }
      dueDateField={<UiDateField task={newTask} setTask={setNewTask} />}
      priorityField={
        <UiPriorityField
          newTask={newTask}
          setNewTask={setNewTask}
          label="Приоритет"
        />
      }
      actions={
        <>
          <UiButton
            className="collapse-toggle"
            id="form-collapse-button"
            data-collapse="#form-collapse"
          >
            Дополнительно
            <AddIcon className="collapse-open:hidden" />
            <MinusIcon className="hidden collapse-open:block" />
          </UiButton>

          <UiButton color="primary" onClick={handleSubmit} icon={<ListIcon />}>
            Добавить
          </UiButton>
        </>
      }
    ></Layout>
  );
});
