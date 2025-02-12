import { ITag } from "@/app/types";
import clsx from "clsx";
import { useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";

export default function Tag({
  tag,
  deleteTag,
  editable
}: {
  tag: ITag;
  editable?: boolean;
  deleteTag?: (id: string) => void;
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
      {deleteTag && editable && (
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
      )}
    </span>
  );
}
