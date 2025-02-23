import { ITask } from "@/app/types";
import { UiDateField, UiSelectField, UiTextFiled } from "../uikit";
import { PriorityHighIcon } from "../uikit/icons";
import { UiCheckbox } from "../uikit/index";
import { selectPriorityOptions } from "@/constants/constants";
import { dateFormat } from "@/utils/helpers";
import clsx from "clsx";

type Props = {
  task: ITask;
  editable: boolean;
  modifiedTask: ITask;
  setModifiedTask: React.Dispatch<React.SetStateAction<ITask>>;
  onPriorityChange: (priority: "high" | "medium" | "low") => void;
  onToggleComplete: (id: string) => void;
};

export function HeaderSection({
  task,
  editable,
  modifiedTask,
  setModifiedTask,
  onPriorityChange,
  onToggleComplete,
}: Props) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        {editable ? (
          <UiTextFiled
            value={modifiedTask.title}
            size="xs"
            onChange={(e) =>
              setModifiedTask({ ...task, title: e.target.value })
            }
          />
        ) : (
          <UiCheckbox
            id={task.id}
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id)}
            label={task.title}
          />
        )}
        {editable && (
          <UiSelectField
            size="xs"
            value={modifiedTask.priority}
            onChange={onPriorityChange}
            options={selectPriorityOptions}
            className="w-[120px]"
          />
        )}
        <span
          className={clsx({
            "text-error": modifiedTask.priority === "high",
            "text-accent": modifiedTask.priority === "medium",
            "text-success": modifiedTask.priority === "low",
          })}
        >
          <PriorityHighIcon />
        </span>
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
        task.dueDate && <div>{dateFormat(task.dueDate)}</div>
      )}
    </div>
  );
}
