import { useLocalization } from "@/logic/localization";
import { PropertyTypeEnum } from "@/logic/utils/rooms-enum";
import { Form, Select, Typography } from "antd";
const { Option } = Select;

const PropertyType = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex flex-col gap-2">
      <Typography.Text>{translate("Property type")}</Typography.Text>
      <Form.Item name="property_type" label={null} className="w-full !m-0">
        <Select placeholder={translate("Choose")}>
          {Object.keys(PropertyTypeEnum).map((key) => (
            <Option key={key} value={key}>
              {translate(
                PropertyTypeEnum[key as keyof typeof PropertyTypeEnum]
              )}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default PropertyType;
