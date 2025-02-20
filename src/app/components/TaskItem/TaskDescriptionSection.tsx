import { ITask } from "@/app/types";
import { UiTextArea } from "../uikit";

type Props = {
  task: ITask;
  editable: boolean;
  modifiedTask: ITask;
  setModifiedTask: React.Dispatch<React.SetStateAction<ITask>>;
}

export function TaskDescriptionSection({
  task,
  editable,
  modifiedTask,
  setModifiedTask,
}: Props) {
  return (
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
  );
}