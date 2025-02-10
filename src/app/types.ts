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
  dueDate?: string | Date | undefined;
  isCompleted: boolean;
  priority: string;
  // priority: "low" | "medium" | "high";
}
