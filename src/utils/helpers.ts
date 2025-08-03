import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function dateFormat(date: Date) {
  return format(date, "dd MMMM yyyy HH:mm", {
    locale: ru,
  });
}

export function defineColor(filter: string) {
  switch (filter) {
    case "all":
      return "default";
    case "today":
      return "accent";
    case "active":
      return "warning";
    case "completed":
      return "success";
    case "overdue":
      return "error";
    default:
      return "default";
  }
}