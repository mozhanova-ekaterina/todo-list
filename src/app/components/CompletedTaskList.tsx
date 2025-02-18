import taskStore from "../stores/taskStore"

export const CompletedTaskList = () => {
  return (
    <div>
      {taskStore.completedTasksList.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  )
}

