import React from "react";
import { Props } from "./props";
import EditVarchar from "@/components/common/GenericFormFields/EditVarchar";

interface ZipcodeProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const Zipcode: React.FC<ZipcodeProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  return (
    <>
      {isFieldVisible("zipcode") && (
        <EditVarchar
          item={{
            key: "zipcode",
            label: "PLZ",
            required: isFieldRequired("zipcode"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Zipcode;
