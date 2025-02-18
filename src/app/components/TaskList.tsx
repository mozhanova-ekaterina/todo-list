import TaskItem from "./TaskItem";
import { observer } from "mobx-react-lite";
import taskStore from "../stores/taskStore";

export default observer(function TaskList() {
  const taskList = taskStore.filteredTasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      deleteTask={taskStore.deleteTask}
      toggleTaskCompletion={taskStore.toggleTaskCompletion}
    />
  ));
  const completedTasksList = taskStore.completedTasksList.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      deleteTask={taskStore.deleteTask}
      toggleTaskCompletion={taskStore.toggleTaskCompletion}
    />
  ));

  return (
    <div className="flex flex-col gap-4 py-4">
      {taskList}
      {taskStore.completedTasksList.length > 0 && (
        <div className="divider divider-primary">Выполненные</div>
      )}
      {taskStore.currentFilter === "all" && completedTasksList}
    </div>
  );
});
