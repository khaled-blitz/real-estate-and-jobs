import React from "react";
import { Props } from "./props";
import EditEnum from "@/components/common/GenericFormFields/EditEnum";

interface NumberOfRoomsProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
  optionsList: { [key: string]: string[] };
}

const NumberOfRooms: React.FC<NumberOfRoomsProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  optionsList,
  input,
}) => {
  return (
    <>
      {isFieldVisible("number_of_rooms") && (
        <EditEnum
          item={{
            key: "number_of_rooms",
            label: "Anzahl Zimmer",
            options: optionsList["number_of_rooms"] || [],
            required: isFieldRequired("number_of_rooms"),
          }}
          input={input}
          onChange={(value) => onChange(value)}
        />
      )}
    </>
  );
};

export default NumberOfRooms;
