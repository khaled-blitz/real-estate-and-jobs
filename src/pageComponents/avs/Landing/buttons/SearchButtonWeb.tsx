import { Button } from "antd";
import classNames from "classnames";

const SearchButtonWeb = ({ expanded }: { expanded?: boolean }) => {
  return (
    <div
      className={classNames("justify-end items-end flex w-full", {
        "!items-start mt-[30px]": expanded,
      })}
    >
      {/* Search button */}
      <Button type="primary" htmlType="submit" className="w-full font-bold">
        Inserate anzeigen
      </Button>
    </div>
  );
};

export default SearchButtonWeb;
