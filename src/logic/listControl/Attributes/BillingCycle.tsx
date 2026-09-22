import React from "react";
import { Props } from "./props";
import { useLocalization } from "@/logic/localization";
import { Form, Select } from "antd";

interface BillingCycleProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const BillingCycle: React.FC<BillingCycleProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const { translate } = useLocalization();
  return (
    isFieldVisible("billing_cycle") && (
      <Form.Item
        name="billing_cycle"
        required
        className="mb-0 min-w-[100px]"
        initialValue={input["billing_cycle"]}
        rules={[
          {
            required: isFieldRequired("billing_cycle"),
            message: translate("Please fill this field"),
          },
        ]}
      >
        <Select
          defaultValue="Month"
          placeholder="Select"
          onChange={(value) => {
            onChange({ ...input, billing_cycle: value });
          }}
          value={input["billing_cycle"] || undefined}
          style={{ borderRadius: "0" }}
        >
          <Select.Option value="Month">{translate("Month")}</Select.Option>
          <Select.Option value="Week">{translate("Week")}</Select.Option>
        </Select>
      </Form.Item>
    )
  );
};

export default BillingCycle;
