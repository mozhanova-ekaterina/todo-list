import { ITag, TFilter, TSortKey } from "../types";
import SearchInput from "./SearchInput";
import taskStore from "../stores/taskStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { UiButton, UiTag } from "./uikit";
import { SortAscIcon } from "./uikit/icons/SortAscIcon";
import { SortDscIcon } from "./uikit/icons/SortDscIcon";
import { defineColor } from "@/utils/helpers";

export default observer(function TaskFilters() {
  const filters: TFilter[] = ["all", "today", "active", "completed", "overdue"];
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const sortOptions = [
    { value: "none", label: "Без сортировки" },
    { value: "priority", label: "По приоритету" },
    { value: "dueDate", label: "По дате" },
  ];

  useEffect(() => {
    taskStore.setSelectedTags(selectedTags);
  }, [selectedTags]);

  return (
    <>
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-wrap xl:flex-nowrap gap-2">
          <SearchInput />
          <div className="flex gap-2">
            {filters.map((filter) => (
              <UiButton
                onClick={() => taskStore.setFilter(filter)}
                variant={
                  taskStore.currentFilter === filter ? "solid" : "outline"
                }
                color={defineColor(filter)}
                size="xs"
                key={filter}
                className="xl:btn-sm"
              >
                {filter === "all" && "Все"}
                {filter === "today" && "Сегодня"}
                {filter === "active" && "Активные"}
                {filter === "completed" && "Выполненные"}
                {filter === "overdue" && "Просроченные"}
              </UiButton>
            ))}
          </div>
        </div>
        <div className="relative flex gap-2">
          <select
            id="sort-priority"
            className="select select-sm select-floating w-[150px] xl:w-[200px] outline-none"
            onChange={(e) => taskStore.setSorting(e.target.value as TSortKey)}
            value={taskStore.sortKey}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label htmlFor="sort-priority" className="select-floating-label">
            Сортировать по :
          </label>
          {taskStore.sortKey !== "none" && (
            <UiButton
              onClick={() => taskStore.setSorting(taskStore.sortKey)}
              variant="outline"
              color="primary"
              size="sm"
              icon={
                taskStore.sortOrder === "asc" ? (
                  <SortAscIcon />
                ) : (
                  <SortDscIcon />
                )
              }
            ></UiButton>
          )}
        </div>
      </div>

      <div className="flex gap-2 py-2">
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
