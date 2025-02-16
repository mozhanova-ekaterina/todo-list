import { ITag, ITask } from "@/app/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { UiTag, UiTextFiled } from "../uikit";

type Props = {
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
  newTask: ITask;
  editable?: boolean;
};

export default function TagsField({ setNewTask, newTask, editable }: Props) {
  const [tag, setTag] = useState<ITag>({
    id: "",
    name: "",
  });

  const deleteTag = (id: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags.filter((tag) => tag.id !== id),
    });
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, tag!],
      });
      setTag({ id: "", name: "" });
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      <UiTextFiled
        value={tag.name}
        label="Теги"
        onChange={(e) =>
          setTag({
            id: uuid(),
            name: e.target.value.trim(),
          })
        }
        onKeyPress={(e) => addTag(e)}
      />
      <div className="flex gap-2">
        {newTask.tags.map((tag) => (
          <UiTag
            key={tag.id}
            tag={tag}
            editable={editable}
            deleteTag={deleteTag}
          />
        ))}
      </div>
    </div>
  );
}
