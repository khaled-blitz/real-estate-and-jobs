/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import { AllowedFieldsWithLabels } from "@/logic/listControl/AllowedFields";

const EditEnum = ({ item, input, onChange }: Props) => {
  const form = Form.useFormInstance();
  const { translate } = useLocalization();
  if (!item.options) return null;
  let options = item.options;
  const field = AllowedFieldsWithLabels[item.key];
  if (field?.onlyAllow && field.onlyAllow.length > 0) {
    options = options.filter((option: any) =>
      field.onlyAllow?.includes(option)
    );
  }
  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={input[item.key]}
      className="mb-0"
      rules={[
        {
          required: item.required,
          message: translate("Please fill this field"),
        },
      ]}
    >
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        <Select
          style={{ width: "100%" }}
          options={options.map((option: any) => ({
            value: option,
            label: translate(option),
          }))}
          value={input[item.key] || undefined}
          placeholder={item.label}
          onChange={(value) => {
            onChange({ ...input, [item.key]: value || "" });
            form.setFieldsValue({ [item.key]: value || "" });
          }}
          allowClear
        />
      </div>
    </Form.Item>
  );
};

export default EditEnum;
