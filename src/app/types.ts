export interface ITag {
  id: string;
  name: string;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  tags: ITag[];
  dueDate: Date | "";
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
}

export type TSortKey = "priority" | "dueDate" | "none";
export type TSortOrder = "asc" | "desc";
export type TFilter = "all" | "active" | "completed" | "today" | "overdue";
export type TPriority = "low" | "medium" | "high";
export type TTheme = "light" | "dark";


// export type TInitialTask = Omit<ITask, "id" | "isCompleted">;
// export interface InitialTask extends Omit<ITask, "id" | "isCompleted"> {}
