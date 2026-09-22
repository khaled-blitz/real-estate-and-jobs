import { TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { isValidPrice } from "@/logic/utils/helpers";
import { Typography } from "antd";
import classNames from "classnames";

interface Props {
  ad: TAdItem;
}

const Price = ({ ad }: Props) => {
  const isRenting = ["TR", "STR"].includes(ad.subcategory ?? "");
  const searching = ["STS", "STR"].includes(ad.subcategory || "");
  const { translate } = useLocalization();
  return isValidPrice(ad.price) ? (
    <div
      className={classNames("items-start rounded-[30px] flex flex-col mt-2", {
        "!hidden": ["STR"].includes(ad.subcategory || ""),
      })}
    >
      <Typography.Text className={classNames("text-[16px] leading-[18px]")}>
        {isRenting
          ? `Mietpreis/${translate(ad.billing_cycle || "Month")}`
          : "Preis"}
      </Typography.Text>
      <Typography.Title
        level={3}
        className="!m-0 !leading-[34px] !text-[#444444]"
      >
        CHF {Number(ad.price).toLocaleString("de-CH")}
      </Typography.Title>
    </div>
  ) : (
    // 2025-05-06 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-06/Also%20Zu%20Kaufen%20gesucht%20should%20not%20show%20price%20on%20request%20when%200/29lbjj--uqyfkc2
    !searching && (
      <div
        className={classNames("items-center rounded-[30px] flex", {
          "!hidden": ["STR", "STS"].includes(ad.subcategory || ""),
        })}
      >
        <Typography.Title level={4} className="!m-0 !text-[#444444]">
          {translate("Price on request")}
        </Typography.Title>
      </div>
    )
  );
};

export default Price;
