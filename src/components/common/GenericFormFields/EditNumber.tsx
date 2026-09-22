import { Form, Input } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import { AllowedFieldsWithLabels } from "@/logic/listControl/AllowedFields";

const EditNumber = ({ input, item, onChange }: Props) => {
  const form = Form.useFormInstance();
  const propertyType = Form.useWatch("property_type", form);
  const { translate } = useLocalization();
  const required =
    item.required ||
    AllowedFieldsWithLabels[item.key].requiredForPropertyTypes?.includes(
      propertyType
    );

  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={input[item.key]}
      className="mb-0 w-full"
      extra={item.description}
      rules={[
        {
          required: required,
          message: translate("Please fill this field"),
        },
        {
          validator: (_, value) =>
            value === undefined || value === "" || !isNaN(Number(value))
              ? Promise.resolve()
              : Promise.reject(new Error(`Please enter a valid number.`)),
        },
      ]}
    >
      <div className="w-full rounded-xl" onClick={(e) => e.stopPropagation()}>
        <Input
          type="number"
          value={input[item.key]}
          placeholder={`Eingeben ${
            typeof item.label === "string" ? item.label : ""
          }`}
          inputMode="numeric"
          onChange={(e) => {
            onChange({ ...input, [item.key]: e.target.value });
          }}
        />
      </div>
    </Form.Item>
  );
};

export default EditNumber;
