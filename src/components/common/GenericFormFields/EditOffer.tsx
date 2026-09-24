/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import { InputType } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import { isPaidTopOffer } from "@/logic/utils/helpers";

interface Props {
  input: Record<string, any>;
  list: InputType[];
  onChange: (value: any) => void;
  value?: any;
}

const EditOffer = ({ input, list, onChange }: Props) => {
  const { translate } = useLocalization();
  const item = list.find((item) => item.key === "offer_fk");
  const form = Form.useFormInstance();

  if (!item?.options) return null;

  const filteredData = item.options.map((option) =>
    Object.fromEntries(
      Object.entries(option).filter(
        ([key, value]) =>
          key === "_blitzID" ||
          (!key.startsWith("_") &&
            !key.startsWith("@") &&
            value !== undefined &&
            value !== null)
      )
    )
  );

  return (
    <Form.Item
      label={item.label}
      name={item.key}
      rules={[
        {
          required: item.required,
          message: translate("Please fill this field"),
        },
      ]}
    >
      <div className="flex gap-4 flex-wrap">
        {filteredData
          .sort((a: any, b: any) => a.duration - b.duration)
          .map((option: any) => {
            const isSelected = input[item.key] === option._blitzID;
            const cardStyle = isSelected
              ? "border-2 border-yellow-500 bg-yellow-100"
              : "border border-gray-300 bg-white";

            return (
              <Button
                key={option._blitzID}
                className={`relative p-4 cursor-pointer text-center ${cardStyle} w-full max-w-[200px] h-[200px] items-center justify-center flex flex-col`}
                onClick={() => {
                  // Update the input and Form value
                  const updatedInput = {
                    ...input,
                    [item.key]: option._blitzID,
                  };
                  onChange(updatedInput); // Notify parent about the change
                  form.setFieldsValue({ [item.key]: option._blitzID });
                }}
              >
                {/* The buyer should see which offer is the one that leads the list. */}
                {isPaidTopOffer(option) && (
                  <span className="absolute top-0 left-0 bg-[#444444] text-white text-xs font-bold px-2 py-[2px] rounded-br-[8px]">
                    Top
                  </span>
                )}
                <div className="font-bold text-md">
                  {translate(option.name)}
                </div>
                <div className="text-sm mt-2 text-wrap">
                  {option.duration} Tage sichtbar{" "}
                  {option.auto_renew === "1" && <>automatisch verlängert</>}
                </div>
                {option.price && option.price > 0 && (
                  <div className="text-sm mt-2">{option.price} CHF</div>
                )}
              </Button>
            );
          })}
      </div>
    </Form.Item>
  );
};

export default EditOffer;
