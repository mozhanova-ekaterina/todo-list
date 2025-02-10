import { useState } from "react";
import { ITag, ITask } from "../types";
import UiTextFiled from "./uikit/fields/UiTextFiled";
import { IdUnique } from "@/utils/helpers";
import { DeleteIcon } from "./icons/DeleteIcon";
import clsx from "clsx";

type Props = {
  setNewTask: React.Dispatch<React.SetStateAction<ITask>>;
  newTask: ITask;
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
            id: IdUnique(),
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

function Tag({
  tag,
  deleteTag,
}: {
  tag: ITag;
  deleteTag: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      className="badge badge-soft badge-primary animate-slide-up relative"
      key={tag.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      #{tag.name}
      <div
        className={clsx([
          "absolute right-[-10px] bottom-[-10px] rounded-full bg-white p-1 border z-10 cursor-pointer transition-all",
          isHovered ? "opacity-100" : "opacity-0",
        ])}
      >
        <DeleteIcon
          className="text-gray-600"
          onClick={() => deleteTag(tag.id)}
        />
      </div>
    </span>
  );
}
