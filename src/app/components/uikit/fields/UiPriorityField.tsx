import { ITask } from "@/app/types";

type Props = {
  newTask: ITask;
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
  label: string;
};

export function UiPriorityField({ newTask, setNewTask, label }: Props) {
  return (
    <div className="flex gap-2 flex-col relative mt-2">
      <select
        id="select-priority"
        className="select select-floating"
        value={newTask.priority}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            priority: e.target.value as "high" | "medium" | "low",
          })
        }
      >
        <option value="high">Высокий</option>
        <option value="medium">Средний</option>
        <option value="low">Низкий</option>
      </select>
      <label htmlFor="select-priority" className="select-floating-label">
        {label}
      </label>
    </div>
  );
}
