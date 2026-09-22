import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";

interface AreaProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Area: React.FC<AreaProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  return (
    <>
      {isFieldVisible("area") && (
        <EditNumber
          item={{
            key: "area",
            label: (
              <div>
                Wohn-/Nutzfläche (m<sup>2</sup>)
              </div>
            ),
            required: isFieldRequired("area"),
          }}
          input={input}
          onChange={(value) => onChange(value)}
        />
      )}
    </>
  );
};

export default Area;
