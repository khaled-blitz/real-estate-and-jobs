import { useLocalization } from "@/logic/localization";
import { Form, Input, Typography } from "antd";

const PriceMax = () => {
  const { translate } = useLocalization();
  const form = Form.useFormInstance();

  return (
    <div className="flex w-full items-end max-w-full">
      <Form.Item name="priceMax" label={null} className="!m-0 w-full">
        <div className="flex flex-col gap-2">
          <Typography.Text>{translate("Price max")}</Typography.Text>
          <Input
            type="number"
            placeholder="CHF"
            value={form.getFieldValue("areaMin")}
          />
        </div>
      </Form.Item>
    </div>
  );
};

export default PriceMax;
