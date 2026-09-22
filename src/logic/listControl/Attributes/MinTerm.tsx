import React from "react";
import { Props } from "./props";
import EditNumber from "@/components/common/GenericFormFields/EditNumber";

interface MinTermProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const MinTerm: React.FC<MinTermProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  if (!isFieldVisible("minimum_term")) {
    return null;
  }
  return (
    <div className="flex items-end gap-2 w-full">
      <EditNumber
        item={{
          key: "minimum_term",
          label: "Mindestmietdauer (in Monaten)",
          required: isFieldRequired("minimum_term"),
        }}
        input={input}
        onChange={onChange}
      />
    </div>
  );
};

export default MinTerm;
