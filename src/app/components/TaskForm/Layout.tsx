type Props = {
  formTitle: string;
  titleField: React.ReactNode;
  descriptionField: React.ReactNode;
  tagsField: React.ReactNode;
  dueDateField: React.ReactNode;
  priorityField: React.ReactNode;
  actions: React.ReactNode;
};

export const Layout = ({
  formTitle,
  titleField,
  descriptionField,
  tagsField,
  dueDateField,
  priorityField,
  actions,
}: Props) => {
  return (
    <form className="flex flex-col gap-3 p-5 border-l h-full relative animate-slide-left">
      <h2>{formTitle}</h2>

      {titleField}
      <div
        id="form-collapse"
        className="flex flex-col gap-3 collapse hidden overflow-hidden transition-[height] duration-300"
      >
        {descriptionField}
        {tagsField}
        {dueDateField}
        {priorityField}
      </div>

      <div className="flex gap-3">{actions}</div>
    </form>
  );
};
