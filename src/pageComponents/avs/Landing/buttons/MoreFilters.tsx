import { Button } from "antd";
import classNames from "classnames";
import Image from "next/image";

const MoreFilters = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      className={classNames(
        "w-full justify-center items-center min-w-[120px] flex"
      )}
      icon={
        <Image
          src={"/immo/avs/icons/Icons_Filtern.svg"}
          alt="filters"
          width={24}
          height={24}
        />
      }
      onClick={onClick}
    >
      Auswahl verfeinern
    </Button>
  );
};

export default MoreFilters;
