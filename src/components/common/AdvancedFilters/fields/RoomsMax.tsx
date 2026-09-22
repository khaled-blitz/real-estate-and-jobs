import { useLocalization } from "@/logic/localization";
import { Form, Select, Typography } from "antd";
const { Option } = Select;

const RoomsMax = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex w-full items-end max-w-full">
      <div className="flex flex-col gap-2 w-full">
        <Typography.Text>{translate("Rooms max")}</Typography.Text>
        <Form.Item name="roomsMax" label={null} className="!m-0">
          <Select placeholder={translate("Choose")}>
            <Option value="1.0">1</Option>
            <Option value="1.5">1.5</Option>
            <Option value="2.0">2</Option>
            <Option value="2.5">2.5</Option>
            <Option value="3.0">3</Option>
            <Option value="3.5">3.5</Option>
            <Option value="4.0">4</Option>
            <Option value="4.5">4.5</Option>
            <Option value="5.0">5</Option>
            <Option value="5.5">5.5</Option>
            <Option value="6.0">6</Option>
            <Option value="6.5">6.5</Option>
            <Option value="7.0">7</Option>
            <Option value="7.5">7.5</Option>
            <Option value="8.0">8</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default RoomsMax;
