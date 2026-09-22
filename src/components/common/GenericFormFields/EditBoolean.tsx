import { Props } from "@/logic/listControl/Attributes/props";
import { Switch, Typography } from "antd";

interface EditBooleanProps extends Props {
  listName?: string; // New prop to handle list name
  justifyBetween?: boolean;
}

const EditBoolean = ({
  input,
  item,
  onChange,
  listName,
  justifyBetween,
}: EditBooleanProps) => {
  const featuresArray = input[listName ?? ""] || []; // Get existing array or empty

  const isChecked = featuresArray.includes(item.key); // Check if feature is in array

  return (
    <div
      className="rounded-xl overflow-hidden flex gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Typography.Text>{item.label}:</Typography.Text>
      <Switch
        checked={isChecked}
        onClick={() => {
          const updatedFeatures = isChecked
            ? featuresArray.filter((feature: string) => feature !== item.key) // Remove if exists
            : [...featuresArray, item.key]; // Add if not exists

          onChange({
            ...input,
            [listName ?? item.key]: updatedFeatures, // Update as array
          });
        }}
        style={{ marginLeft: justifyBetween ? "auto" : "0" }}
      />
    </div>
  );
};

export default EditBoolean;
