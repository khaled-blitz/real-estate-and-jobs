interface Props {
  children: React.ReactNode;
  className?: string;
}

const FilterLayout = ({ children, className }: Props) => {
  return <div className={className ?? ""}>{children}</div>;
};

export default FilterLayout;
