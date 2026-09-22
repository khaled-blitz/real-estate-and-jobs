import { Form, Input } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";

const EditEmail = ({ input, item, onChange }: Props) => {
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
          type: "email",
          message: translate("Please enter a valid email address"),
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
          type="email"
        />
      </div>
    </Form.Item>
  );
};

export default EditEmail;
