export interface Tag {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  tags: Tag[];
  dueDate?: Date;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
}
