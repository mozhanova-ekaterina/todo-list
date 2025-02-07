import { ChangeEvent } from "react";
import { ITask } from "../types";

type Props = {
  task: ITask;
  switchTaskComplete: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string) => void;
};

export default function TaskItem({ task, switchTaskComplete, deleteTask, editTask }: Props) {
  return (
    <div key={task.id} className="flex gap-3">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={(e) => switchTaskComplete(e, task.id)}
      />
      <span>{task.title} </span>
      <span>{task.tags.map((tag) => `#${tag.name} `)}</span>
      <span>{task.dueDate?.toLocaleString()}</span>
      <div>
        <button onClick={() => editTask(task.id)}>✏️</button>
        <button onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </div>
  );
}
