import { useLocalization } from "@/logic/localization";
import { Form, Checkbox, Typography } from "antd";
import styled from "styled-components";

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(1.3);
  }
`;

const FEATURES_LIST = [
  "garage",
  "cable_tv",
  "outdoor_parking",
  "electric_car_charging_station",
  "balcony",
  "wheelchair_accessible",
  "seating_area",
  "child_friendly",
  "garden",
  "minergie_standard",
  "elevator",
  "new_construction",
  "cellar",
  "second_home",
  "attic",
  "pets_allowed",
  "furnished",
  "alpine_and_forecourt_hut",
];

const FeaturesChecklist = () => {
  const { translate } = useLocalization();

  return (
    <div className="flex flex-col gap-2">
      <Typography.Text>{translate("Features")}</Typography.Text>
      <Form.Item name="features_list" label={null} className="!m-0">
        <Checkbox.Group className="grid grid-cols-2 gap-2">
          {FEATURES_LIST.map((feature) => (
            <div key={feature} className="!m-0 px-2 py-1 rounded-[8px] w-full">
              <CustomCheckbox value={feature}>
                {translate(feature)}
              </CustomCheckbox>
            </div>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export default FeaturesChecklist;
