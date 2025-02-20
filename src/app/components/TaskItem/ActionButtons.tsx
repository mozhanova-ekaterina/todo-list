import { UiButton } from "../uikit";
import { DeleteIcon, EditIcon } from "../uikit/icons";

type Props = {
  editable: boolean;
  toggleEditable: () => void;
  onTaskDel: () => void;
  onTaskSave: () => void;
};

export function ActionButtons({
  editable,
  toggleEditable,
  onTaskDel,
  onTaskSave,
}: Props) {
  return (
    <div className="flex gap-2">
      {editable ? (
        <UiButton size="xs" variant="soft" color="primary" onClick={onTaskSave}>
          Сохранить
        </UiButton>
      ) : (
        <span
          onClick={toggleEditable}
          className="badge badge-primary size-6 p-0 cursor-pointer"
        >
          <EditIcon />
        </span>
      )}
      <span
        onClick={onTaskDel}
        className="badge badge-primary size-6 p-0 cursor-pointer"
      >
        <DeleteIcon />
      </span>
    </div>
  );
}
