import { useLocalization } from "@/logic/localization";
import { Form, Radio, Typography } from "antd";

const CategoryItem = ({ expanded }: { expanded?: boolean }) => {
  const { translate } = useLocalization();

  return (
    <div className="flex flex-col gap-2">
      <Typography.Text>{translate("Category")}</Typography.Text>
      <Form.Item name="subcategory" label={null} className="!m-0">
        <Radio.Group className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 rounded-[8px] w-full bg-white">
              <Radio value="TR">{translate("Rent")}</Radio>
            </div>
            <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 rounded-[8px] w-full bg-white">
              <Radio value="TS">{translate("Buy")}</Radio>
            </div>
          </div>
          {expanded && (
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 rounded-[8px] w-full bg-white">
                <Radio value="STR">{translate("Search To Rent")}</Radio>
              </div>
              <div className="!m-0 border border-1 border-[#d9d9d9] px-2 py-1 rounded-[8px] w-full bg-white">
                <Radio value="STS">{translate("Search To Buy")}</Radio>
              </div>
            </div>
          )}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default CategoryItem;
