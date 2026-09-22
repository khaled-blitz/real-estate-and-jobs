import { DatePicker, Form } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import dayjs from "dayjs";
import { useLocalization } from "@/logic/localization";

const EditDate = ({ input, item, onChange }: Props) => {
  const { translate } = useLocalization();
  const form = Form.useFormInstance();
  const dateValue = input[item.key] ? dayjs(input[item.key]) : null;

  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={dateValue}
      className="mb-0"
      rules={[
        {
          required: item.required,
          message: translate("Please fill this field"),
        },
      ]}
    >
      <div
        className="w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <DatePicker
          value={dateValue}
          minDate={dayjs(Date.now())}
          placeholder={`Datum`}
          onChange={(date) => {
            onChange({
              ...input,
              [item.key]: date ? date.format("YYYY-MM-DD") : null,
            });

            // Log: https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-06-02/Gmail%3A%20Problem%20with%20%22Verf%C3%BCgbar%20ab%20Datum%20%22/2azagb--31xoko?proj=1s4dec-3ibnqe
            form.setFieldsValue({
              [item.key]: date ? date.format("YYYY-MM-DD") : null,
            });
          }}
          style={{ width: "100%" }}
          disabledDate={(current) => current && current < dayjs("1950-01-01")}
        />
      </div>
    </Form.Item>
  );
};

export default EditDate;
