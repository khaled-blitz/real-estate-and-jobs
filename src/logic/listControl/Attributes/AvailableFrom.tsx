import React from "react";
import { Select, Typography } from "antd";
import { Props } from "@/logic/listControl/Attributes/props";
import dayjs from "dayjs";
import { useState } from "react";
import EditDate from "@/components/common/GenericFormFields/EditDate";
const { Option } = Select;

interface AvialableFromProps extends Omit<Props, "item"> {
  isFieldVisible: (field: string) => boolean;
  isFieldRequired: (field: string) => boolean;
}

const AvialableFrom: React.FC<AvialableFromProps> = ({
  onChange,
  isFieldVisible,
  isFieldRequired,
  input,
}) => {
  const value = input["available_from"];

  const [mode, setMode] = useState<"sofort" | "vereinbarung" | "datum">(() => {
    if (!value) return "vereinbarung";
    if (dayjs(value).isSame(dayjs(), "day")) return "sofort";
    return "datum";
  });

  const handleModeChange = (selected: "sofort" | "vereinbarung" | "datum") => {
    setMode(selected);
    if (selected === "sofort") {
      onChange({ ...input, available_from: dayjs().format("YYYY-MM-DD") });
    } else {
      onChange({ ...input, available_from: null });
    }
  };

  if (!isFieldVisible("available_from")) return null;
  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <Typography.Text>Verfügbar ab</Typography.Text>
      <Select
        value={mode}
        onChange={handleModeChange}
        style={{ width: "100%" }}
      >
        <Option value="vereinbarung">Nach Vereinbarung</Option>
        <Option value="sofort">Sofort</Option>
        <Option value="datum">Datum</Option>
      </Select>

      {mode === "datum" && (
        <EditDate
          item={{
            key: "available_from",
            label: null,
            required: isFieldRequired("available_from"),
          }}
          input={input}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default AvialableFrom;
