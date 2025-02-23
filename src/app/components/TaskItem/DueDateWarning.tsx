import { AlarmIcon } from "../uikit/icons/AlarmIcon";

type Props = {
  isDueToday: boolean;
  isOverdue: boolean;
  isCompleted: boolean;
};

export function DueDateWarning({ isDueToday, isOverdue, isCompleted }: Props) {
  if ((!isDueToday && !isOverdue) || isCompleted) return null;

  return (
    <div className="alert alert-error alert-soft p-1 flex gap-2 items-center">
      {isDueToday && !isOverdue && "Срок истекает сегодня "}
      {isOverdue && "Срок истек "}
      <AlarmIcon />
    </div>
  );
}

