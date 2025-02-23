import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { ITag, ITask } from "@/app/types";
import { DueDateWarning } from "./DueDateWarning";
import { HeaderSection } from "./HeaderSection";
import { TaskDescriptionSection } from "./TaskDescriptionSection";
import { TagSection } from "./TagSection";
import { ActionButtons } from "./ActionButtons";
import taskStore from "@/app/stores/taskStore";
import { isToday } from "date-fns";

type Props = {
  task: ITask;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
};

export default observer(function TaskItem({
  task,
  toggleTaskCompletion,
  deleteTask,
}: Props) {
  const [editable, setEditable] = useState(false);
  const [modifiedTask, setModifiedTask] = useState<ITask>(task);

  const handleTaskSave = useCallback(() => {
    taskStore.updateTask(modifiedTask);
    setEditable(false);
  }, [modifiedTask]);

  const handleTaskDel = () => {
    deleteTask(task.id);
  };

  const handleTagAdd = (newTag: string) => {
    setModifiedTask((prev: ITask) => ({
      ...prev,
      tags: [...modifiedTask.tags, { id: uuid(), name: newTag }],
    }));
  };

  const handleTagDelete = (id: string) => {
    setModifiedTask((prev: ITask) => ({
      ...prev,
      tags: modifiedTask.tags.filter((tag: ITag) => tag.id !== id),
    }));
  };

  const handlePriorityChange = useCallback(
    (priority: "high" | "medium" | "low") => {
      setModifiedTask((prev: ITask) => ({ ...prev, priority }));
    },
    []
  );

  const isDueToday = task.dueDate && isToday(task.dueDate);
  const isOverdue = taskStore.overdueTaskList.includes(task);
  
  return (
    <div key={task.id} className="card card-compact">
      <DueDateWarning isDueToday={!!isDueToday} isOverdue={isOverdue} isCompleted={task.isCompleted} />

      <div className="card-body gap-3">
        <HeaderSection
          task={task}
          editable={editable}
          modifiedTask={modifiedTask}
          setModifiedTask={setModifiedTask}
          onPriorityChange={handlePriorityChange}
          onToggleComplete={toggleTaskCompletion}
        />
        <TaskDescriptionSection
          task={task}
          editable={editable}
          modifiedTask={modifiedTask}
          setModifiedTask={setModifiedTask}
        />

        <div className="flex gap-2 justify-between items-center">
          <TagSection
            editable={editable}
            modifiedTask={modifiedTask}
            onTagAdd={handleTagAdd}
            onTagDelete={handleTagDelete}
          />
          <ActionButtons
            editable={editable}
            toggleEditable={() => setEditable(!editable)}
            onTaskDel={handleTaskDel}
            onTaskSave={handleTaskSave}
          />
        </div>
      </div>
    </div>
  );
});
