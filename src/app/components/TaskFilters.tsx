import { TFilter } from "../types";
import SearchInput from "./SearchInput";
import UiButton from "./uikit/UiButton";
import taskStore from "../stores/taskStore";

export const TaskFilters = () => {
  const filters: TFilter[] = ["all", "today", "active", "completed", "overdue"];

  return (
    <div className="flex gap-2 py-2">
      <SearchInput />
      {filters.map((filter) => (
        <UiButton
          onClick={() => taskStore.setFilter(filter)}
          variant="outline"
          color={defineColor(filter)}
          size="sm"
          key={filter}
        >
          {filter === "all" && "Все"}
          {filter === "today" && "Сегодня"}
          {filter === "active" && "Активные"}
          {filter === "completed" && "Выполненные"}
          {filter === "overdue" && "Просроченные"}
        </UiButton>
      ))}
    </div>
  );
};

function defineColor(filter: string) {
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
