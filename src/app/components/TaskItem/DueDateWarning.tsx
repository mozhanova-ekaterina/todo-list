import { AlarmIcon } from "../uikit/icons/AlarmIcon";

type Props = {
  isDueToday: boolean;
  isOverdue: boolean;
};

export function DueDateWarning({ isDueToday, isOverdue }: Props) {
  if (!isDueToday && !isOverdue) return null;
  
  return (
    <div className="alert alert-error alert-soft p-1 flex gap-2 items-center">
      {isDueToday && "Срок истекает сегодня "}
      {isOverdue && "Срок истек "}
      <AlarmIcon />
    </div>
  );
}
