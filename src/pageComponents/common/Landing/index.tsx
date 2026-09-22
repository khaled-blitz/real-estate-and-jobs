/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "@/components/common/Logo";
import { TAdItem } from "@/dto/ad-item";
import { ComparisonOperator, TCondition } from "@/dto/condition-item";
import { ListControlContext } from "@/ListControl";
import { Card, Form } from "antd";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CategoryItem from "./fields/CategoryItem";
import PropertyType from "./fields/PropertyType";
import MoreFilters from "./buttons/MoreFilters";
import TabBar from "@/components/common/TabBar";
import SearchButtonMobile from "./buttons/SearchButtonMobile";
import SearchButtonWeb from "./buttons/SearchButtonWeb";
import classNames from "classnames";
import Wrapper from "./wrapper";
import AdvancedFilters from "@/components/common/AdvancedFilters";
import { RegionList } from "@/logic/utils/regionList";

const INITIAL_VALUES = {
  subcategory: undefined,
  region: undefined,
  property_type: undefined,
  priceMin: undefined,
  priceMax: undefined,
  number_of_rooms: undefined,
  surface: undefined,
};

export default function Home() {
  const router = useRouter();
  const context = useContext(ListControlContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  if (!context) {
    return null;
  }

  const onFinish = (values: any) => {
    let regions: string[] = [];
    values.region?.forEach((item: string) => {
      const isMainRegion = Object.keys(RegionList).includes(item);
      if (isMainRegion && item !== "other")
        regions = [
          ...regions,
          ...RegionList[item as keyof typeof RegionList].children,
        ];
      else regions.push(item);
    });
    values.region = regions.length > 0 ? regions : undefined;

    const conditions: TCondition[] = [];
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== "") {
        if (key === "subcategory" && Array.isArray(values["subcategory"])) {
          values["subcategory"].forEach((item: any) => {
            conditions.push([item, "=", "1"]);
          });
          return;
        }
        if (key === "features_list" && Array.isArray(values["features_list"])) {
          values["features_list"].forEach((item: any) => {
            conditions.push([item, "=", "1"]);
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
    context.setConditions(conditions);
    router.push({ pathname: "/immobilien" });
  };

  return (
    <div
      className={classNames(
        "flex flex-col w-[100vw] h-[100vh] text-black justify-center items-center gap-2 px-4 overflow-y-scroll md:overflow-hidden"
      )}
    >
      <div
        className={classNames(
          "relative flex flex-col w-full justify-center items-center gap-2"
        )}
      >
        <TabBar stick />
        <Card className="shadow-lg w-full max-w-[900px] bg-[rgba(255,255,255,0.95)]">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <Form
            layout="inline"
            onFinish={onFinish}
            initialValues={INITIAL_VALUES}
            form={form}
          >
            <div className="flex flex-col gap-4 w-full">
              {/* Mobile */}
              <div className="flex flex-col gap-2 w-full md:hidden">
                <div className="flex flex-col gap-2">
                  <CategoryItem />
                  <PropertyType />
                </div>
                <MoreFilters onClick={() => setIsModalVisible(true)} />
                <SearchButtonMobile />
              </div>

              {/* Web */}
              <div className="hidden md:flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-2">
                  <Wrapper>
                    <CategoryItem expanded={false} />
                  </Wrapper>
                  <Wrapper>
                    <PropertyType />
                  </Wrapper>
                  <Wrapper small>
                    <MoreFilters
                      onClick={() => setIsModalVisible(!isModalVisible)}
                    />
                  </Wrapper>
                </div>
                <SearchButtonWeb />
              </div>
            </div>
          </Form>
          <AdvancedFilters
            isModalVisible={isModalVisible}
            setIsModalVisible={function (visible: boolean): void {
              setIsModalVisible(visible);
            }}
            onFinish={onFinish}
          />
        </Card>
      </div>
    </div>
  );
}
