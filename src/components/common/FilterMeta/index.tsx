import { Button, Select, TreeSelect, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { RoomsEnum } from "@/logic/utils/rooms-enum";
import { useLocalization } from "@/logic/localization";
import { ListControlContext } from "@/ListControl";
import NumberInput from "./inputNumber";
import Image from "next/image";
import AdvancedFilters from "../AdvancedFilters";
import { TAdItem } from "@/dto/ad-item";
import { ComparisonOperator, TCondition } from "@/dto/condition-item";
import { RegionList } from "@/logic/utils/regionList";
import TabBar from "../TabBar";

const { SHOW_PARENT } = TreeSelect;
const Meta = () => {
  const context = useContext(ListControlContext);

  const [to, setTo] = React.useState<number>();
  const [rooms, setRooms] = React.useState<string>();
  const [search, setSearch] = React.useState<string>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { translate } = useLocalization();

  useEffect(() => {
    const roomsCond = context?.conditions?.find(
      (c) => c[0] === "number_of_rooms"
    );
    const toCond = context?.conditions?.find(
      (c) => c[0] === "price" && c[1] === "<="
    );
    setRooms(roomsCond ? (roomsCond[2] as string) : undefined);
    setTo(toCond ? (toCond[2] as number) : undefined);
  }, [context?.conditions]);

  useEffect(() => {
    context?.addFilter("city", "CONTAINS", search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
    context?.setConditions(conditions);
    setIsModalVisible(false);
  };

  if (!context) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full w-full mb-4 md:mb-0 self-center">
      <AdvancedFilters
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onFinish={onFinish}
      />

      <div className="flex flex-col md:flex-row w-full gap-2">
        <div className="flex flex-col gap-2 flex-[1]">
          <Typography.Text>{translate("Region")}</Typography.Text>
          <TreeSelect
            treeData={Object.keys(RegionList).map((key) => ({
              title: translate(
                RegionList[key as keyof typeof RegionList].title
              ),
              value: key,
              children: RegionList[key as keyof typeof RegionList].children.map(
                (item) => ({ title: item, value: item })
              ),
            }))}
            onSelect={(value) => setSearch(value)}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            placeholder="Please select"
            style={{ width: "100%" }}
          />
        </div>
        <div className="flex flex-col gap-2 flex-[1]">
          <Typography.Text>{translate("Rooms min")}</Typography.Text>
          <Select
            placeholder={translate("Select")}
            className=""
            allowClear
            value={rooms}
            onChange={(value) =>
              context.addFilter("number_of_rooms", ">=", value)
            }
          >
            {Object.keys(RoomsEnum).map((key) => (
              <Select.Option key={key} value={key}>
                {RoomsEnum[key as keyof typeof RoomsEnum]}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex gap-2 flex-[1]">
          <NumberInput
            label={translate("Price max")}
            placeholder={translate("Enter price")}
            onChange={(value) => context.addFilter("price", "<=", value)}
            value={to}
          />
        </div>
      </div>
      {/* </Col> */}
      <Button
        className="self-end !w-full md:!w-fit min-w-[32px]"
        icon={
          <Image src="/immo/filters.svg" width={22} height={22} alt="filter" />
        }
        onClick={() => setIsModalVisible(true)}
      />

      <Button
        className="self-end !w-full md:!w-fit"
        onClick={() => context.setConditions([])}
      >
        {translate("Reset")}
      </Button>
      <TabBar />
    </div>
  );
};

export default Meta;
