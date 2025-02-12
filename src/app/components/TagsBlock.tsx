import { useState } from "react";
import { ITag, ITask } from "../types";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import { v4 as uuid } from "uuid";
import Tag from "./uikit/UiTag";

type Props = {
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
  newTask: ITask
};

export default function TagsBlock({ setNewTask, newTask }: Props) {
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
        type="text"
        label="Теги"
        placeholder=""
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
          <Tag key={tag.id} tag={tag} deleteTag={deleteTag} />
        ))}
      </div>
    </div>
  );
}


