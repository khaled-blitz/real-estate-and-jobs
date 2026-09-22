import { useLocalization } from "@/logic/localization";
import { PREMIUM_PLAN } from "@/logic/utils/constants";
import { Button } from "antd";
import classNames from "classnames";
import React from "react";
import { useModal } from "../providers/ModalContext";

const TabBar = ({ stick }: { stick?: boolean }) => {
  const { translate } = useLocalization();
  const { openModal } = useModal();
  return (
    <div className="flex mt-0 md:mt-4 self-end !w-full md:!w-fit">
      {PREMIUM_PLAN && (
        <div
          className={classNames(
            "flex md:absolute top-8 right-0 left-0 justify-center px-4 w-full",
            {
              "!top-[-40px] md:!top-[-24px]": stick,
            }
          )}
        >
          <div className="rounded-[8px] font-bold rounded-r-none w-full max-w-[200px] bg-[#FFBE06] text-white flex items-center justify-center">
            {translate("Search")}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal();
            }}
            className="rounded-l-none w-full max-w-[200px]"
            type="default"
          >
            {translate("Add item")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TabBar;
