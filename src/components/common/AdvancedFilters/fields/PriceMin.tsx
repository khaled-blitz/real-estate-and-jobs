import { useLocalization } from "@/logic/localization";
import { Form, Input, Typography } from "antd";

const PriceMin = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex w-full items-end max-w-full">
      <div className="flex flex-col gap-2 w-full">
        <Typography.Text>{translate("Price min")}</Typography.Text>
        <Form.Item name="priceMin" label={null} className="!m-0">
          <Input type="number" placeholder="Fr." />
        </Form.Item>
      </div>
    </div>
  );
};

export default PriceMin;
