import { ChangeEvent } from "react";
import { ITask } from "../types";
import UiButton from "./uikit/UiButton";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { ArrowDown } from "./icons/ArrowDown";
import clsx from "clsx";

type Props = {
  task: ITask;
  isTimerRunningOut?: boolean;
  switchTaskComplete: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string) => void;
};

export default function TaskItem({
  task,
  switchTaskComplete,
  deleteTask,
  editTask,
  isTimerRunningOut = true,
}: Props) {
  return (
    <div key={task.id} className="card card-compact">
      {isTimerRunningOut && (
        <div className="alert alert-error alert-soft p-1">Осталось 2ч</div>
      )}
      <div className="card-body gap-3">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <input
              id={task.id}
              type="checkbox"
              checked={task.isCompleted}
              onChange={(e) => switchTaskComplete(e, task.id)}
              className="checkbox checkbox-primary"
            />
            <label
              htmlFor={task.id}
              className={clsx([
                "label label-text ",
                task.isCompleted && "line-through",
              ])}
            >
              {task.title}
            </label>
            {task.description && (
              <UiButton
                type="button"
                variant="outline"
                size="xs"
                className="collapse-toggle btn btn-primary"
                id="basic-collapse"
                aria-expanded="false"
                aria-controls="basic-collapse-heading"
                data-collapse="#basic-collapse-heading"
              >
                Описание
                <ArrowDown className="collapse-open:rotate-180" />
              </UiButton>
            )}
          </div>
          <div>{task.dueDate?.toLocaleString()}</div>
        </div>
        {task.description && (
          <div>
            <div
              id="basic-collapse-heading"
              className="collapse hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="basic-collapse"
            >
              <div className="bg-primary/20 rounded-md p-3">
                <p className="text-primary">{task.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2">
            {task.tags.map((tag) => (
              <span className="badge badge-soft badge-primary" key={tag.id}>
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <span
              onClick={() => editTask(task.id)}
              className="badge badge-primary size-6 p-0 cursor-pointer"
            >
              <EditIcon />
            </span>
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
}
