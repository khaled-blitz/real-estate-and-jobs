/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalization } from "@/logic/localization";
import { RegionList } from "@/logic/utils/regionList";
import { Form, TreeSelect, TreeSelectProps, Typography } from "antd";
import styled from "styled-components";

const CustomTreeSelect = styled(TreeSelect)`
  .ant-select-selection-placeholder {
    text-align: center !important;
  }
}`;

const { SHOW_PARENT } = TreeSelect;

interface Props {
  centerText?: boolean;
  hideLabel?: boolean;
}

const TreeComponent = ({
  isCustom,
  ...props
}: { isCustom: boolean } & TreeSelectProps) => {
  if (isCustom) {
    return <CustomTreeSelect {...props} />;
  }
  return <TreeSelect {...props} />;
};

const Region = ({ centerText = false, hideLabel = false }: Props) => {
  const { translate } = useLocalization();

  return (
    <div className="flex w-full items-end max-w-full">
      <div className="flex flex-col gap-2 w-full">
        {!hideLabel && <Typography.Text>{translate("Region")}</Typography.Text>}
        <Form.Item name="region" label={null} className="!m-0">
          <TreeComponent
            isCustom={centerText}
            treeData={Object.keys(RegionList).map((key) => ({
              title: translate(
                RegionList[key as keyof typeof RegionList].title
              ),
              value: key,
              children: RegionList[key as keyof typeof RegionList].children.map(
                (item) => ({ title: item, value: item })
              ),
            }))}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            placeholder={translate("All regions")}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default Region;
