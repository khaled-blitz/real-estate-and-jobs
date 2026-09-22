import { Form, Input } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";

const EditVarchar = ({ input, item, onChange }: Props) => {
  const { translate } = useLocalization();
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
      <div className="w-full rounded-xl" onClick={(e) => e.stopPropagation()}>
        <Input
          value={input[item.key]}
          placeholder={`${item.label}`}
          maxLength={item.maxLength}
          onChange={(e) => {
            onChange({ ...input, [item.key]: e.target.value });
          }}
        />
      </div>
    </Form.Item>
  );
};

export default EditVarchar;
