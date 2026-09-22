import { Form, Input } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";

const EditPhone = ({ input, item, onChange }: Props) => {
  const { translate } = useLocalization();
  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={input[item.key]}
      className="mb-0"
      extra={item.description}
      rules={[
        {
          required: item.required,
          message: translate("Please fill this field"),
        },
        {
          pattern: /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
          message: `Please enter a valid phone number.`,
        },
      ]}
    >
      <div className="w-full rounded-xl" onClick={(e) => e.stopPropagation()}>
        <Input
          value={input[item.key]}
          placeholder={`${item.label}`}
          onChange={(e) => {
            onChange({ ...input, [item.key]: e.target.value });
          }}
          style={{ borderRadius: "8px" }} // Adjust as necessary for desired style
        />
      </div>
    </Form.Item>
  );
};

export default EditPhone;
