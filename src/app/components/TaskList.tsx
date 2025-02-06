import { ChangeEvent } from "react";
import { Task } from "../types";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList({ tasks, setTasks }: Props) {

  const switchTaskComplete = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isCompleted: true } : task
        )
      );
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isCompleted: false } : task
        )
      );
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string) => {
    
  }

  const taskList = tasks.map((task) => (
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
  ));

  return <div className="flex flex-col gap-3 px-5">{taskList}</div>;
}
