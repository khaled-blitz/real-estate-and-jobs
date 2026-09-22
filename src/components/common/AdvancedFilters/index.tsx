/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import React, { useContext, useEffect } from "react";

import CategoryItem from "./fields/CategoryItem";
import PropertyType from "./fields/PropertyType";
import PriceMax from "./fields/PriceMax";
import PriceMin from "./fields/PriceMin";
import RoomsMin from "./fields/RoomsMin";
import RoomsMax from "./fields/RoomsMax";
import AreaMax from "./fields/AreaMax";
import Region from "./fields/Region";
import AreaMin from "./fields/AreaMin";
import Attributes from "./fields/Features";
import { useLocalization } from "@/logic/localization";
import SearchButtonMobile from "./buttons/SearchButtonMobile";
import { ListControlContext } from "@/ListControl";

const INITIAL_VALUES = {
  subcategory: undefined,
  region: undefined,
  property_type: undefined,
  priceMin: undefined,
  priceMax: undefined,
  roomsMin: undefined,
  roomsMax: undefined,
  surface: undefined,
};

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (values: Record<string, any>) => void;
}
const AdvancedFilters = ({
  isModalVisible,
  setIsModalVisible,
  onFinish,
}: Props) => {
  const [form] = Form.useForm();
  const { translate } = useLocalization();
  const context = useContext(ListControlContext);

  useEffect(() => {
    const subcategoryCond = context?.conditions?.find(
      (c) => c[0] === "subcategory"
    );
    const propertyTypeCond = context?.conditions?.find(
      (c) => c[0] === "property_type"
    );
    const featuresCond = [];
    if (context?.conditions?.find((c) => c[0] === "garden")) {
      featuresCond.push("garden");
    }
    if (context?.conditions?.find((c) => c[0] === "balcony")) {
      featuresCond.push("balcony");
    }
    if (context?.conditions?.find((c) => c[0] === "furnished")) {
      featuresCond.push("furnished");
    }
    if (context?.conditions?.find((c) => c[0] === "garage")) {
      featuresCond.push("garage");
    }
    if (context?.conditions?.find((c) => c[0] === "outdoor_parking")) {
      featuresCond.push("outdoor_parking");
    }
    if (context?.conditions?.find((c) => c[0] === "pets_allowed")) {
      featuresCond.push("pets_allowed");
    }
    const formValues: Record<string, any> = {
      subcategory: subcategoryCond ? (subcategoryCond[2] as string) : undefined,
      property_type: propertyTypeCond
        ? (propertyTypeCond[2] as string)
        : undefined,
      region: context?.conditions?.find((c: any) => c[0] === "region")?.[2],
      roomsMin: context?.conditions?.find(
        (c) => c[0] === "number_of_rooms" && c[1] === ">="
      )?.[2],
      roomsMax: context?.conditions?.find(
        (c) => c[0] === "number_of_rooms" && c[1] === "<="
      )?.[2],
      areaMin: context?.conditions?.find(
        (c) => c[0] === "area" && c[1] === ">="
      )?.[2],
      areaMax: context?.conditions?.find(
        (c) => c[0] === "area" && c[1] === "<="
      )?.[2],
      priceMin: context?.conditions?.find(
        (c) => c[0] === "price" && c[1] === ">="
      )?.[2],
      priceMax: context?.conditions?.find(
        (c) => c[0] === "price" && c[1] === "<="
      )?.[2],
    };
    if (featuresCond.length) {
      formValues.features = featuresCond;
    }
    form.setFieldsValue(formValues);
  }, [context?.conditions, form]);

  return (
    <Modal
      open={isModalVisible}
      title={translate("Filter ads")}
      closable={true}
      onCancel={() => setIsModalVisible(false)}
      styles={{
        header: { textAlign: "center" },
      }}
      footer={null}
    >
      <Form
        layout="inline"
        onFinish={onFinish}
        initialValues={INITIAL_VALUES}
        form={form}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <CategoryItem expanded />
            <Region />
            <PropertyType />
            <div className="flex justify-between items-center gap-2 w-full">
              <RoomsMin />
              <RoomsMax />
            </div>
            <div className="flex gap-2 w-full">
              <PriceMin />
              <PriceMax />
            </div>
            <div className="flex gap-2 w-full">
              <AreaMin />
              <AreaMax />
            </div>
            <Attributes />
          </div>

          {/* <MoreFilters onClick={() => setIsModalVisible(false)} /> */}
          <SearchButtonMobile />
        </div>
      </Form>
    </Modal>
  );
};

export default AdvancedFilters;
