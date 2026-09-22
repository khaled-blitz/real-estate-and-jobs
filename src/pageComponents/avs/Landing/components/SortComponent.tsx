import { Form, Select } from "antd";
const { Option } = Select;
import styled from "styled-components";
import Image from "next/image";

const CustomSelect = styled(Select)`
  .ant-select-selector {
    text-align: center !important;
    padding: 0px !important;
  }
    .ant-select-selection-placeholder {
        text-align: center !important;
        padding-left: 16px !important;
    }
}`;

const SortComponent = () => {
  return (
    <div className="flex flex-col w-full">
      {/* <Typography.Text>{translate("Property type")}</Typography.Text> */}
      <Form.Item
        name="sort"
        label={null}
        className="w-full !m-0 items-center"
        initialValue={"_blitzstamp"}
      >
        <CustomSelect
          className="flex items-center"
          style={{
            alignItems: "center",
          }}
          value={"_blitzstamp"}
        >
          <Option value={"_blitzstamp"}>
            <div className="flex items-center justify-center">
              <Image
                src={"/immo/avs/icons/Icons_sortieren.svg"}
                alt="filters"
                width={22}
                height={22}
              />
              Neueste zuerst
            </div>
          </Option>
          <Option value={"price"}>
            <div className="flex items-center justify-center">
              <Image
                src={"/immo/avs/icons/Icons_sortieren.svg"}
                alt="filters"
                className="rotate-180"
                width={22}
                height={22}
              />
              Günstigste zuerst
            </div>
          </Option>
        </CustomSelect>
      </Form.Item>
    </div>
  );
};

export default SortComponent;
