import { ITag, TFilter } from "../types";
import SearchInput from "./SearchInput";
import UiButton from "./uikit/UiButton";
import taskStore from "../stores/taskStore";
import Tag from "./uikit/UiTag";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export default observer(function TaskFilters() {
  const filters: TFilter[] = ["all", "today", "active", "completed", "overdue"];
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  useEffect(() => {
    taskStore.setSelectedTags(selectedTags);
  }, [selectedTags]);

  return (
    <>
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
      <div className="flex gap-2">
        {taskStore.tasks
          .map((task) => task.tags)
          .flat()
          .map((tag) => (
            <Tag
              className="cursor-pointer"
              key={tag.id}
              tag={tag}
              onClick={() => setSelectedTags([...selectedTags, tag])}
            />
          ))}
          <UiButton size="xs" variant="soft" color="default" onClick={() => setSelectedTags([])}>Сбросить теги</UiButton>
      </div>
    </>
  );
});

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
