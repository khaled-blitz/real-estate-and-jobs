import { Button } from "antd";
import classNames from "classnames";
import { useLocalization } from "@/logic/localization";
import { useModal } from "@/components/providers/ModalContext";

const Header = () => {
  const { translate } = useLocalization();
  const { openModal } = useModal();

  return (
    <div className="flex w-full justify-center mb-4">
      <div
        className={classNames(
          "flex w-full font-bold bg-[#3a3944] text-white items-center justify-center"
        )}
      >
        {translate("Search")}
      </div>
      <div
        className={classNames(
          "flex w-full justify-end items-end flex self-center"
        )}
      >
        <Button
          className="w-full font-bold bg-[#d6a975] text-white"
          type="text"
          onClick={openModal}
        >
          Inserieren
        </Button>
      </div>
    </div>
  );
};

export default Header;
