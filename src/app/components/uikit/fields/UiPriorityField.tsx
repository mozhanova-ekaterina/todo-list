import { ITask } from "@/app/types";

type Props = {
  newTask: ITask;
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
  label: string;
};

export default function UiPriorityField({ newTask, setNewTask, label }: Props) {
  return (
    <div className="flex gap-2 flex-col relative mt-2">
      <select
        id="select-priority"
        className="select select-floating"
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
