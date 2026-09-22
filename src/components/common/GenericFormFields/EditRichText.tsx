import { Form } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditRichText = ({ input, item, onChange }: Props) => {
  const { translate } = useLocalization();
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Form.Item
      label={item.label}
      name={item.key}
      initialValue={input[item.key]}
      className="mb-0"
      rules={[
        {
          required: item.required,
          message: translate("Please fill this field"),
        },
      ]}
    >
      <div className="w-full rounded-xl" onClick={(e) => e.stopPropagation()}>
        {isClient ? (
          <ReactQuill
            theme="snow"
            value={input[item.key] || ""}
            onChange={(value) => {
              onChange({ ...input, [item.key]: value });
            }}
            modules={{
              toolbar: [
                ["bold", "italic", { list: "ordered" }, { list: "bullet" }],
              ],
            }}
          />
        ) : (
          <div>Loading editor...</div> // Fallback for SSR
        )}
      </div>
    </Form.Item>
  );
};

export default EditRichText;
