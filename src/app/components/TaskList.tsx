import { ChangeEvent } from "react";
import { ITask } from "../types";
import TaskItem from "./TaskItem";

type Props = {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
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

  const editTask = (id: string) => {};

  const taskList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      editTask={editTask}
      switchTaskComplete={switchTaskComplete}
    />
  ));

  return <div className="flex flex-col gap-3 px-5">{taskList}</div>;
}
