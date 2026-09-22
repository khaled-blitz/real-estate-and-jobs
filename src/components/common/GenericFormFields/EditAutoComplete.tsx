import { Form, AutoComplete } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";

const EditAutoComplete = ({ input, item, onChange, onSelect }: Props) => {
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
        <AutoComplete
          options={item.options}
          value={input[item.key]}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          placeholder={`${item.label}`}
          onChange={(value) => {
            onChange({ ...input, [item.key]: value });
          }}
          onSelect={(value) => {
            onSelect?.({ ...input, [item.key]: value });
          }}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
    </Form.Item>
  );
};

export default EditAutoComplete;
