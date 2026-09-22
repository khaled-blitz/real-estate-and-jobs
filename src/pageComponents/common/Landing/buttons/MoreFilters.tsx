import { useLocalization } from "@/logic/localization";
import { Button } from "antd";
import classNames from "classnames";
import Image from "next/image";

const MoreFilters = ({ onClick }: { onClick: () => void }) => {
  const { translate } = useLocalization();

  return (
    <Button
      className={classNames(
        "w-full justify-center items-center min-w-[120px] flex mt-[30px]"
      )}
      icon={
        <Image src={"/immo/filters.svg"} alt="filters" width={14} height={14} />
      }
      onClick={onClick}
    >
      {translate("More filters")}
    </Button>
  );
};

export default MoreFilters;
