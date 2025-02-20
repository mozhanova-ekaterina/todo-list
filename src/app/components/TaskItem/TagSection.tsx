import { useState } from "react";
import { UiButton, UiTag, UiTextFiled } from "../uikit";
import { AddIcon } from "../uikit/icons";
import { ITask } from "@/app/types";

type Props = {
  editable: boolean;
  modifiedTask: ITask;
  onTagAdd: (tag: string) => void;
  onTagDelete: (id: string) => void;
};

export function TagSection({
  editable,
  modifiedTask,
  onTagAdd,
  onTagDelete,
}: Props) {
  const [newTag, setNewTag] = useState("");
  const [addingTag, setAddingTag] = useState(false);
  const handleTagAdd = (e: React.KeyboardEvent, newTag: string) => {
    if (e.key === "Enter") {
      onTagAdd(newTag);
      setAddingTag(false);
    }
  };

  return (
    <div className="flex gap-2">
      {modifiedTask.tags.map((tag) => (
        <UiTag
          tag={tag}
          key={tag.id}
          editable={editable}
          deleteTag={onTagDelete}
        />
      ))}
      {editable && (
        <>
          {addingTag && (
            <UiTextFiled
              className="w-[100px] border-primary animate-spread"
              size="xs"
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => handleTagAdd(e, newTag)}
            />
          )}
          <UiButton
            variant="soft"
            color="primary"
            size="xs"
            icon={<AddIcon />}
            onClick={() => setAddingTag(true)}
          />
        </>
      )}
    </div>
  );
}
