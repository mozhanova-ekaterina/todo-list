export interface ITag {
  id: string;
  name: string;
}

export type TFilter = "all" | "active" | "completed" | "today" | "overdue";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  tags: ITag[];
  dueDate: Date | '';
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
}

// export type TInitialTask = Omit<ITask, "id" | "isCompleted">;
// export interface InitialTask extends Omit<ITask, "id" | "isCompleted"> {}

