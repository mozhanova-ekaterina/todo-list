import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function dateFormat(date: Date) {
  return format(date, "dd MMMM yyyy HH:mm", {
    locale: ru,
  });
}
