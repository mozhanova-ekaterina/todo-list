import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import TagsField from "./TagsField";
import { ITask } from "@/app/types";
import taskStore from "@/app/stores/taskStore";
import {
  UiButton,
  UiDateField,
  UiSelectField,
  UiTextArea,
  UiTextFiled,
} from "../uikit";
import { AddIcon, ListIcon, MinusIcon } from "../uikit/icons";
import { Layout } from "./Layout";
import { useState } from "react";
import { useValidation } from "@/app/hooks/useValidation";
import { selectPriorityOptions } from "@/constants/constants";

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
  const { validateForm, resetErrors, errors } = useValidation();

  const handleSubmit = (task: ITask) => {
    if (!validateForm(task)) return;

    taskStore.addTask({ ...task, id: uuid() });
    setNewTask(initialTask);
    resetErrors();
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
          error={errors.title}
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
          error={errors.description}
        />
      }
      tagsField={
        <TagsField editable setNewTask={setNewTask} newTask={newTask} />
      }
      dueDateField={<UiDateField task={newTask} setTask={setNewTask} />}
      priorityField={
        <UiSelectField
          value={newTask.priority}
          options={selectPriorityOptions}
          label="Приоритет"
          onChange={(value) => setNewTask({ ...newTask, priority: value })}
        />
      }
      actions={
        <>
          <UiButton
            className="collapse-toggle xl:btn-lg"
            id="form-collapse-button"
            data-collapse="#form-collapse"
            size="sm"
          >
            Дополнительно
            <AddIcon className="collapse-open:hidden" />
            <MinusIcon className="hidden collapse-open:block" />
          </UiButton>

          <UiButton
            className="xl:btn-lg"
            color="primary"
            onClick={() => handleSubmit(newTask)}
            icon={<ListIcon />}
            size="sm"
          >
            Добавить
          </UiButton>
        </>
      }
    ></Layout>
  );
});
