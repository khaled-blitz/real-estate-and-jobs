/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAdItem } from "@/dto/ad-item";
import { ComparisonOperator, TCondition } from "@/dto/condition-item";
import { ListControlContext } from "@/ListControl";
import { Card, Form, Typography } from "antd";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CategoryItem from "./fields/CategoryItem";
import PropertyType from "./fields/PropertyType";
import MoreFilters from "./buttons/MoreFilters";
import Wrapper from "./wrapper";
import AdvancedFilters from "@/components/common/AdvancedFilters";
import { RegionList } from "@/logic/utils/regionList";
import RegionItem from "./fields/RegionItem";
import SearchButtonWeb from "./buttons/SearchButtonWeb";
import SortComponent from "./components/SortComponent";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Layout from "@/components/avs/Layout";

const INITIAL_VALUES = {
  subcategory: undefined,
  region: undefined,
  property_type: "All",
  priceMin: undefined,
  priceMax: undefined,
  number_of_rooms: undefined,
  surface: undefined,
  sort: "_blitzstamp",
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
    context.setSortingKey(values.sort);
    context.setConditions(conditions);
    router.push({ pathname: "/immobilien" });
  };

  return (
    <Layout>
      <div className="flex flex-col mt-10 self-start">
        <Typography.Text className="!text-white text-lg mb-4">
          SIMMENTAL. SAANENLAND. ALPES VAUDOISES.
        </Typography.Text>
        <Typography.Text className="!text-[#3a3944] text-2xl md:text-5xl font-bold">
          <span className="!text-white">Immobilien</span> auf einen Klick.
        </Typography.Text>
        <Typography.Text className="!text-[#3a3944] text-2xl md:text-5xl font-bold">
          Regional. Genial.
          <img
            src="/immo/avs/icons/Pfeil.svg"
            alt={"logo"}
            style={{
              display: "inline",
              maxWidth: "30px",
              marginLeft: "10px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Typography.Text>
      </div>
      <Card className="shadow-lg w-full max-w-[680px] bg-[#ebd2b6] mt-10">
        <Form
          layout="inline"
          onFinish={onFinish}
          initialValues={INITIAL_VALUES}
          form={form}
        >
          <div className="flex flex-col gap-4 w-full">
            {/* Mobile */}
            <div className="flex flex-col gap-2 w-full hidden">
              <Header />
              <div className="flex flex-col gap-2">
                <CategoryItem />
                <PropertyType />
              </div>
              <MoreFilters onClick={() => setIsModalVisible(true)} />
              <SearchButtonWeb />
            </div>

            {/* Web */}
            <div className="flex flex-col gap-4 w-full">
              <Header />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 flex-col md:flex-row">
                  <CategoryItem expanded={false} />
                  <SortComponent />
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                  <PropertyType />
                  <RegionItem />
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                  <Wrapper>
                    <MoreFilters
                      onClick={() => setIsModalVisible(!isModalVisible)}
                    />
                  </Wrapper>
                  <Wrapper>
                    <div className="flex gap-1 w-full">
                      <SearchButtonWeb />
                    </div>
                  </Wrapper>
                </div>
              </div>
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
      <div className="flex mb-10">
        <Banner />
      </div>
    </Layout>
  );
}
