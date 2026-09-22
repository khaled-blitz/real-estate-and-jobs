import React from "react";
import { Props } from "./props";
import EditAutoComplete from "@/components/common/GenericFormFields/EditAutoComplete";
import { RegionList } from "@/logic/utils/regionList";
import { Form } from "antd";

interface CityProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const City: React.FC<CityProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const form = Form.useFormInstance();
  return (
    <>
      {isFieldVisible("city") && (
        <EditAutoComplete
          item={{
            key: "city",
            label: "Ort",
            required: isFieldRequired("city"),
            options: Object.values(RegionList).flatMap((region) =>
              region.children.map((city) => ({ value: city }))
            ),
          }}
          input={input}
          onChange={onChange}
          onSelect={(value) => {
            const zipcode = value.city.toString().split(" ")[0];
            form.setFieldsValue({ zipcode, city: value.city });
            onChange({ ...input, city: value.city, zipcode });
          }}
        />
      )}
    </>
  );
};

export default City;
