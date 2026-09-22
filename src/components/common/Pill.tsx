import { Typography } from "antd";

const Pill = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 bg-[#fff] rounded-full py-[2px] px-2 border border-[#000]">
      <Typography.Text className="text-[16px] flex items-center text-[#444444]">
        {label}
      </Typography.Text>
    </div>
  );
};

export default Pill;
