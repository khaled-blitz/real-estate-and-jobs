import { useLocalization } from "@/logic/localization";
import { Form, Input, Typography } from "antd";

const AreaMin = () => {
  const { translate } = useLocalization();
  const form = Form.useFormInstance();

  return (
    <div className="flex w-full items-end max-w-full">
      <Form.Item name="areaMin" label={null} className="!m-0 w-full">
        <div className="flex flex-col gap-2">
          <Typography.Text>{translate("Minimum surface")}</Typography.Text>
          <Input
            type="number"
            placeholder="m²"
            value={form.getFieldValue("areaMin")}
          />
        </div>
      </Form.Item>
    </div>
  );
};

export default AreaMin;
