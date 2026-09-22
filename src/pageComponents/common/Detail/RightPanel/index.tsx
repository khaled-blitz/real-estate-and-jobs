import { TAdItem } from "@/dto/ad-item";
import Area from "./Area";
import Category from "./Category";
import Price from "./Price";
import Rooms from "./Rooms";
import Phone from "./Phone";
import Email from "./Email";
import Country from "./Country";
import Charges from "./Charges";
import ColdRent from "./ColdRent";
import classNames from "classnames";
import { Typography } from "antd";
import { useLocalization } from "@/logic/localization";
import MinTerm from "./MinTerm";

interface Props {
  ad: TAdItem;
}
export default function RightPanel({ ad }: Props) {
  const { translate } = useLocalization();
  const isRenting = ["TR", "STR"].includes(ad.subcategory ?? "");
  const hasColdRent =
    ad.price_cold_rent !== undefined &&
    ad.price_cold_rent !== null &&
    Number(ad.price_cold_rent) !== 0;
  const hasCharges =
    ad.price_charges !== undefined &&
    ad.price_charges !== null &&
    Number(ad.price_charges) !== 0;
  const hasPrice =
    ad.price !== undefined && ad.price !== null && Number(ad.price) !== 0;

  return (
    <div
      className="flex flex-col gap-4 bg-white rounded-xl p-[32px] max-w-full md:max-w-[396px] w-full"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 30px",
      }}
    >
      <div className="flex flex-col gap-[24px] w-full">
        <Area ad={ad} />
        <Category ad={ad} />
        {isRenting && (hasCharges || hasColdRent) && (
          <>
            <Charges ad={ad} />
            <div className={"mt-[-18px]"}>
              <ColdRent ad={ad} showIcon={!hasCharges} />
            </div>
          </>
        )}
        {hasPrice && (
          <div
            className={classNames({
              "mt-[-18px]": isRenting && (hasCharges || hasColdRent),
            })}
          >
            <Price ad={ad} showIcon={!hasColdRent && !hasCharges} />
          </div>
        )}
        <Rooms ad={ad} />
        <Phone ad={ad} />
        <Email ad={ad} />
        <Country ad={ad} />
        <MinTerm ad={ad} />
        {!ad.price ||
          (Number(ad.price) === 0 && (
            <div className="flex justify-center border border-[2px] border-[#D6D6D6] rounded-[30px] py-[1px] px-3">
              <Typography.Title level={4} className="!m-0 !text-[#444444]">
                {translate("Price on request")}
              </Typography.Title>
            </div>
          ))}
      </div>
    </div>
  );
}
