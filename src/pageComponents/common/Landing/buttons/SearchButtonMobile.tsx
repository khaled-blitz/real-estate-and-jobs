import { useLocalization } from "@/logic/localization";
import { Button } from "antd";

const SearchButtonMobile = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex-[1] w-full justify-end items-end flex md:hidden self-center">
      <Button
        type="primary"
        htmlType="submit"
        className="w-full font-bold text-lg"
      >
        {translate("Search")}
      </Button>
    </div>
  );
};

export default SearchButtonMobile;
