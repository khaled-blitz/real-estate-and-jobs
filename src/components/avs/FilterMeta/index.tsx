import { Button } from "antd";
import React, { useContext } from "react";
import { ListControlContext } from "@/ListControl";
import Image from "next/image";
import { TAdItem } from "@/dto/ad-item";
import { ComparisonOperator, TCondition } from "@/dto/condition-item";
import { RegionList } from "@/logic/utils/regionList";
import AdvancedFilters from "@/components/common/AdvancedFilters";

const Meta = () => {
  const context = useContext(ListControlContext);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    // return;
    if (
      Array.isArray(values.features_list) &&
      values.features_list.length === 0
    ) {
      values.features_list = undefined;
    }
    let regions: string[] = [];
    values.region?.forEach((item: string) => {
      const isMainRegion =
        Object.keys(RegionList).includes(item) && item !== "other";
      if (isMainRegion)
        regions = [
          ...regions,
          ...RegionList[item as keyof typeof RegionList].children,
        ];
      else regions.push(item);
    });
    values.region = regions;
    const conditions: TCondition[] = [];
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== "") {
        if (key === "subcategory" && Array.isArray(values["subcategory"])) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values["subcategory"].forEach((item: any) => {
            conditions.push([item, "=", "1"]);
          });
          return;
        }
        if (key === "features_list" && Array.isArray(values["features_list"])) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values["features_list"].forEach((item: any) => {
            conditions.push(["features_list", "CONTAINS", item]);
          });
          return;
        }
        let operator: ComparisonOperator;
        switch (key) {
          case "priceMin":
            operator = ">=";
            break;
          case "priceMax":
            operator = "<=";
            break;
          case "areaMax":
            operator = "<=";
            break;
          case "areaMin":
            operator = ">=";
            break;
          case "roomsMax":
            operator = "<=";
            break;
          case "roomsMin":
            operator = ">=";
            break;
          case "region":
            operator = "IN";
            break;
          default:
            operator = "=";
        }
        const isPrice = key === "priceMin" || key === "priceMax";
        const isArea = key === "areaMin" || key === "areaMax";
        const isNumber =
          key === "priceMin" ||
          key === "priceMax" ||
          key === "areaMin" ||
          key === "areaMax";
        conditions.push([
          (isPrice ? "price" : isArea ? "area" : key) as keyof TAdItem,
          operator,
          isNumber ? Number(values[key]) : values[key],
        ]);
      }
    });
    console.log("setting", conditions);
    context?.setConditions(conditions);
    setIsModalVisible(false);
  };

  if (!context) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full w-full mb-4 md:mb-0 self-center justify-end">
      <AdvancedFilters
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onFinish={onFinish}
      />
      {/* </Col> */}
      <Button
        className="self-end !w-full md:!w-fit min-w-[32px] text-white"
        type="primary"
        icon={
          <Image
            src="/immo/avs/icons/Icons_Filtern_white.svg"
            className="!text-white"
            width={24}
            height={24}
            alt="filter"
          />
        }
        onClick={() => setIsModalVisible(true)}
      >
        Auswahl verfeinern
      </Button>

      <Button
        className="self-end !w-full md:!w-fit"
        type="primary"
        icon={
          <Image
            src="/immo/avs/icons/Icons_Filter_loeschen_white.svg"
            className="!text-white"
            width={32}
            height={32}
            alt="filter"
          />
        }
        onClick={() => context.setConditions([])}
      >
        Filter zurücksetzen
      </Button>
    </div>
  );
};

export default Meta;
