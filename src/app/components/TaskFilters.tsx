import { ITag, TFilter } from "../types";
import SearchInput from "./SearchInput";
import taskStore from "../stores/taskStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { UiButton, UiTag } from "./uikit";

export default observer(function TaskFilters() {
  const filters: TFilter[] = ["all", "today", "active", "completed", "overdue"];
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  useEffect(() => {
    taskStore.setSelectedTags(selectedTags);
  }, [selectedTags]);

  console.log(taskStore.tagsList[0]);
  

  return (
    <>
      <div className="flex gap-2 py-2">
        <SearchInput />
        {filters.map((filter) => (
          <UiButton
            onClick={() => taskStore.setFilter(filter)}
            variant={taskStore.currentFilter === filter ? "solid" : "outline"}
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
        {taskStore.tagsList.map((tag) => (
          <UiTag
            className="cursor-pointer"
            key={tag.id}
            tag={tag}
            variant={selectedTags.includes(tag) ? "soft" : "outline"}
            onClick={() =>
              selectedTags.includes(tag)
                ? setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
                : setSelectedTags([...selectedTags, tag])
            }
          />
        ))}
        {selectedTags.length > 0 && (
          <UiButton
            size="xs"
            variant="soft"
            onClick={() => setSelectedTags([])}
          >
            Сбросить
          </UiButton>
        )}
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
