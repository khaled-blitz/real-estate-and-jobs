/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, notification, Upload } from "antd";
import {
  DeleteOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Props } from "@/logic/listControl/Attributes/props";
import { useLocalization } from "@/logic/localization";
import { BlitzData } from "blitzdata.ts";

const EditImage = ({ input, item, onChange }: Props) => {
  const { translate } = useLocalization();

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
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        <Upload
          onChange={async (info) => {
            if (info.file.status !== "uploading") {
              const file = info.file.originFileObj;
              if (file) {
                try {
                  const fileUrl = await BlitzData.uploader(file);
                  if ((fileUrl as any)?.log) {
                    delete (fileUrl as any).log;
                  }
                  if (item.multiple) {
                    const updatedFiles = Array.isArray(input[item.key])
                      ? [...input[item.key], fileUrl]
                      : [fileUrl];
                    onChange({ ...input, [item.key]: updatedFiles });
                  } else {
                    onChange({ ...input, [item.key]: fileUrl });
                  }
                } catch (error) {
                  notification.error({
                    message: "Upload failed",
                    description:
                      (error as Error).message || "An error occurred",
                    duration: 5,
                  });
                }
              }
            }
          }}
          multiple={item.multiple}
          maxCount={item.multiple ? 6 : 1}
          accept=".jpg,.jpeg,.png"
          beforeUpload={async (file) => {
            const isValidType = ["image/jpeg", "image/png"].includes(file.type);
            if (!isValidType) {
              notification.warning({
                message: "Sie können nur JPG/PNG-Dateien hochladen!",
                duration: 5,
              });
              return Upload.LIST_IGNORE;
            }
            // Size check (in KB)

            const isValidSize =
              !item.maxSize || file.size <= item.maxSize * 1024;
            if (!isValidSize) {
              notification.warning({
                message: `Die Datei ist zu groß.`,
                description: `Maximal erlaubt: ${item.maxSize}KB`,
                duration: 5,
              });
              return Upload.LIST_IGNORE;
            }

            const isValidDimensions = await new Promise<boolean>((resolve) => {
              const img = new Image();
              img.src = URL.createObjectURL(file);
              img.onload = () => {
                const width = img.width;
                const height = img.height;

                const tooWide = item.maxWidth && width > item.maxWidth;
                const tooTall = item.maxHeight && height > item.maxHeight;

                if (tooWide || tooTall) {
                  notification.warning({
                    message: "Das Logo ist zu groß",
                    duration: 5,
                  });
                  resolve(false);
                } else {
                  resolve(true);
                }
              };
              img.onerror = () => {
                notification.error({
                  message: "Invalid image file",
                  duration: 5,
                });
                resolve(false);
              };
            });

            return isValidDimensions || Upload.LIST_IGNORE;
          }}
          itemRender={(originNode, file, tempFileList, { remove }) => (
            <div className="flex justify-between my-1 items-center">
              <div className="flex gap-2 items-center">
                <PaperClipOutlined className="text-green-500" size={16} />
                {/* Show File Name or URL */}
                <span className="text-green-500">
                  {typeof file.url === "string" ? file.url : file.name}
                </span>
              </div>
              {/* Actions */}
              <div>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (remove) remove();
                  }}
                />
              </div>
            </div>
          )}
        >
          <Button icon={<UploadOutlined />}>
            {translate("Click to Upload")}
          </Button>
        </Upload>
      </div>
    </Form.Item>
  );
};

export default EditImage;
