import { useLocalization } from "@/logic/localization";
import { PropertyTypeEnum } from "@/logic/utils/rooms-enum";
import { Form, Select } from "antd";
const { Option } = Select;
import styled from "styled-components";

const CustomSelect = styled(Select)`
  .ant-select-selector {
    display: flex !important;
    text-align: center !important;
  }
}`;

const PropertyType = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* <Typography.Text>{translate("Property type")}</Typography.Text> */}
      <Form.Item
        name="property_type"
        label={null}
        className="w-full !m-0 items-center"
      >
        <CustomSelect
          placeholder={translate("Property type")}
          className="flex items-center"
          style={{
            alignItems: "center",
          }}
          allowClear
        >
          <Option key="All" value="All">
            {translate("All")}
          </Option>
          {Object.keys(PropertyTypeEnum).map((key) => (
            <Option key={key} value={key}>
              {translate(
                PropertyTypeEnum[key as keyof typeof PropertyTypeEnum]
              )}
            </Option>
          ))}
        </CustomSelect>
      </Form.Item>
    </div>
  );
};

export default PropertyType;
