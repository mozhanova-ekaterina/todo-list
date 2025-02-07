import { ITask } from "@/app/types";

type Props = {
  newTask: ITask;
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
}

export default function UiPriorityField({newTask, setNewTask}: Props) {
  return (
    <div className="flex gap-2">
      Приоритет
      <select
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      >
        <option value="high">🔴</option>
        <option value="medium">🟡</option>
        <option value="low">🔵</option>
      </select>
    </div>
  );
}