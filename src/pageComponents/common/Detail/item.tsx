import { TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { Tooltip, Typography } from "antd";
import React from "react";

const Item = ({
  itemKey,
  label,
  split,
  ad,
  value,
  icon,
  showLabel,
}: {
  itemKey: keyof TAdItem;
  label: string;
  split?: boolean;
  value?: string | React.ReactNode;
  ad: TAdItem;
  icon?: React.ReactNode;
  showLabel?: boolean;
}) => {
  const { translate } = useLocalization();
  let val = ad?.[itemKey as keyof typeof ad];
  if (split && typeof val === "string") {
    val = val?.split(" ")[0];
  }
  const display = typeof value === "string" ? translate(value) : value;
  if (typeof val !== "string") return;
  return (
    val && (
      <div className="inline-flex gap-8 w-full">
        {icon ? (
          <div className="flex items-center text-[#000]">{icon} </div>
        ) : (
          <Typography.Text className="text-[#8c8c8c] text-[18px]">
            {translate(label)}
          </Typography.Text>
        )}
        {typeof value === "string" || typeof val === "string" ? (
          <Typography.Text ellipsis={false} className="text-[18px] w-full">
            {showLabel && (
              <Typography.Text className="text-[#8c8c8c] text-[18px] mr-2">
                {translate(label)}
              </Typography.Text>
            )}
            <Tooltip title={display ?? translate(val)}>
              {display ?? translate(val)}
            </Tooltip>
          </Typography.Text>
        ) : (
          value
        )}
      </div>
    )
  );
};

export default Item;
