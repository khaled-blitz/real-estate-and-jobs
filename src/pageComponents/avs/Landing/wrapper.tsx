import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
  small?: boolean;
}

export default function Wrapper({ children, small }: Props) {
  return (
    <div
      className={classNames(
        "flex flex-row justify-between",
        { "flex-[1]": small },
        { "flex-[2]": !small }
      )}
    >
      {children}
    </div>
  );
}
