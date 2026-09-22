import { InputNumber, Typography } from "antd";

interface InputNumberProps {
  label: string;
  value?: number | null;
  placeholder?: string;
  onChange: (value: number | null) => void;
}

const NumberInput = ({
  label,
  placeholder,
  onChange,
  value,
}: InputNumberProps) => {
  const onChangeFn: InputNumberProps["onChange"] = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography.Text style={{ color: "inherit" }}>{label}</Typography.Text>
      <InputNumber
        // min={1}
        className="w-full"
        placeholder={placeholder || "Enter a number"}
        value={value}
        onChange={(value) => onChangeFn(value)}
      />
    </div>
  );
};

export default NumberInput;
