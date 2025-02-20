import { ITask } from "../types";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import taskStore from "../stores/taskStore";
import { v4 as uuid } from "uuid";
import { format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { UiButton, UiDateField, UiTag, UiTextArea, UiTextFiled } from "./uikit";
import { AddIcon, ArrowDown, DeleteIcon, EditIcon } from "./uikit/icons";

type Props = {
  task: ITask;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
};

export default observer(function TaskItem({
  task,
  toggleTaskCompletion,
  deleteTask,
}: Props) {
  const [editable, setEditable] = useState(false);
  const [modifiedTask, setModifiedTask] = useState<ITask>(task);
  const [addingTag, setAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  const saveNewTask = () => {
    taskStore.updateTask(modifiedTask);
    setEditable(false);
  };

  const addNewTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setModifiedTask({
        ...modifiedTask,
        tags: [...modifiedTask.tags, { id: uuid(), name: newTag }],
      });
      setAddingTag(false);
    }
  };
  const deleteTag = (id: string) => {
    setModifiedTask({
      ...modifiedTask,
      tags: modifiedTask.tags.filter((tag) => tag.id !== id),
    });
  };

  const timeIsRunningOut = () => task.dueDate && isToday(task.dueDate);

  const defineDateMessage = () => {
    if (taskStore.overdueTaskList.includes(task)) {
      return "Срок истек!";
    }
    return "Срок истекает сегодня!";
  };

  return (
    <div key={task.id} className="card card-compact">
      {!task.isCompleted && timeIsRunningOut() && (
        <div className="alert alert-error alert-soft p-1">
          {defineDateMessage()}
        </div>
      )}
      <div
        className={clsx([
          "absolute mx-auto w-[20px] h-[100%] right-[-7px] top-0 rounded-md z-[-1]",
          task.priority === "high" && " bg-error/80",
          task.priority === "medium" && " bg-warning/80",
          task.priority === "low" && " bg-success/80",
        ])}
      ></div>
      <div className="card-body gap-3">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <input
              id={task.id}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task.id)}
              className="checkbox checkbox-primary"
            />
            {!editable ? (
              <label
                htmlFor={task.id}
                className={clsx([
                  "label label-text ",
                  task.isCompleted && "line-through",
                ])}
              >
                {task.title}
              </label>
            ) : (
              <UiTextFiled
                value={modifiedTask.title}
                size="xs"
                onChange={(e) =>
                  setModifiedTask({ ...task, title: e.target.value })
                }
              />
            )}
            {(task.description || editable) && (
              <UiButton
                type="button"
                variant="outline"
                size="xs"
                className="collapse-toggle btn btn-primary"
                id="basic-collapse"
                data-collapse={`#collapse-${task.id}`}
              >
                Описание
                <ArrowDown className="collapse-open:rotate-180" />
              </UiButton>
            )}
          </div>

          {editable ? (
            <div className="flex gap-2">
              <span>Дедлайн:</span>
              <UiDateField
                setTask={setModifiedTask}
                task={modifiedTask}
                size="xs"
              />
            </div>
          ) : (
            <div>
              {task.dueDate &&
                format(task.dueDate, "dd MMMM yyyy HH:mm", {
                  locale: ru,
                })}
            </div>
          )}
        </div>

        {
          <div
            id={`collapse-${task.id}`}
            className="collapse hidden w-full overflow-hidden transition-[height] duration-300"
          >
            <div className="bg-primary/20 rounded-md p-3 flex flex-col">
              {editable ? (
                <UiTextArea
                  value={modifiedTask.description ?? ""}
                  onChange={(e) =>
                    setModifiedTask({ ...task, description: e.target.value })
                  }
                />
              ) : (
                <p className="text-primary">{task.description}</p>
              )}
            </div>
          </div>
        }
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2">
            {modifiedTask.tags.map((tag) => (
              <UiTag
                tag={tag}
                key={tag.id}
                editable={editable}
                deleteTag={deleteTag}
              />
            ))}
            {editable && (
              <>
                {addingTag && (
                  <UiTextFiled
                    className="w-[100px] border-primary animate-spread"
                    size="xs"
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => addNewTag(e)}
                  />
                )}
                <UiButton
                  variant="soft"
                  color="primary"
                  size="xs"
                  icon={<AddIcon />}
                  onClick={() => setAddingTag(true)}
                />
              </>
            )}
          </div>

          <div className="flex gap-2">
            {editable ? (
              <UiButton
                size="xs"
                variant="soft"
                color="primary"
                onClick={saveNewTask}
              >
                Сохранить
              </UiButton>
            ) : (
              <span
                onClick={() => setEditable(!editable)}
                className="badge badge-primary size-6 p-0 cursor-pointer"
              >
                <EditIcon />
              </span>
            )}
            <span
              onClick={() => deleteTask(task.id)}
              className="badge badge-primary size-6 p-0 cursor-pointer"
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
