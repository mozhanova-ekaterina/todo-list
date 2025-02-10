type Props = {
  children?: React.ReactNode;
  aside?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Layout = ({ header, footer, children, aside }: Props) => {
  return (
    <>
      <div className="flex gap-4">
        <div className="basis-[70%] px-5">
          {header}
          {children}
          {footer}
        </div>
        <div className="pt-5 grow">{aside}</div>
      </div>
    </>
  );
};
