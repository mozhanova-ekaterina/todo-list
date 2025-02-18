type Props = {
  children?: React.ReactNode;
  aside?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Layout = ({ header, footer, children, aside }: Props) => {
  return (
    <div className="flex gap-4 h-[100vh]">
      <div className="basis-[70%] px-5">
        {header}
        {children}
        {footer}
      </div>
      <div className="grow max-w-[30%] border-l px-3 pt-5">{aside}</div>
    </div>
  );
};
