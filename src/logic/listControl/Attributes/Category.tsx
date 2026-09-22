import React from "react";
import { Props } from "./props";
import { useLocalization } from "../../localization";
import { Form, Radio } from "antd";

interface CategoryProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
  optionsList: { [key: string]: string[] };
}

const Category: React.FC<CategoryProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  optionsList,
  input,
}) => {
  const { translate } = useLocalization();
  const form = Form.useFormInstance();
  const item = {
    key: "subcategory",
    label: translate("Category"),
    options: optionsList["subcategory"] || [],
    required: isFieldRequired("subcategory"),
  };

  return (
    <>
      {isFieldVisible("subcategory") && (
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
          required
        >
          <Radio.Group
            className="flex flex-col gap-2"
            onChange={(value) => {
              onChange({ ...input, [item.key]: value.target.value || "" });
              form.setFieldsValue({ [item.key]: value.target.value || "" });
            }}
          >
            <div className="flex gap-2">
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 w-full bg-white">
                <Radio value="TR">Vermieten</Radio>
              </div>
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 w-full bg-white">
                <Radio value="TS">Verkaufen</Radio>
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 w-full bg-white">
                <Radio value="STR">Mietobjekt suchen</Radio>
              </div>
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 w-full bg-white">
                <Radio value="STS">Kaufobjekt suchen</Radio>
              </div>
            </div>
          </Radio.Group>
        </Form.Item>
      )}
    </>
  );
};

export default Category;
