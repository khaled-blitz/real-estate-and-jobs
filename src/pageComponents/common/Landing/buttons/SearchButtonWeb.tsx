import { useLocalization } from "@/logic/localization";
import { Button } from "antd";
import classNames from "classnames";

const SearchButtonWeb = ({ expanded }: { expanded?: boolean }) => {
  const { translate } = useLocalization();

  return (
    <div
      className={classNames(
        "flex-[1] w-full justify-end items-end max-w-[200px] hidden md:flex self-center",
        { "!items-start mt-[30px]": expanded }
      )}
    >
      <Button type="primary" htmlType="submit" className="w-full font-bold">
        {translate("Search")}
      </Button>
    </div>
  );
};

export default SearchButtonWeb;
