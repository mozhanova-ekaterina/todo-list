import { ITask } from "@/app/types";
import { UiTextArea } from "../uikit";

type Props = {
  task: ITask;
  editable: boolean;
  modifiedTask: ITask;
  setModifiedTask: React.Dispatch<React.SetStateAction<ITask>>;
};

export function TaskDescriptionSection({
  task,
  editable,
  modifiedTask,
  setModifiedTask,
}: Props) {
  if(!task.description && !editable) return null
  return (
    <div className="bg-primary/20 rounded-md p-3 flex flex-col">
      {editable ? (
        <UiTextArea
          value={modifiedTask.description || ""}
          onChange={(e) =>
            setModifiedTask({ ...task, description: e.target.value })
          }
        />
      ) : (
        <p className="text-primary">{task.description}</p>
      )}
    </div>
  );
}
