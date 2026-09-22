import { TAdItem } from "@/dto/ad-item";
import { useLocalization } from "@/logic/localization";
import { isValidPrice } from "@/logic/utils/helpers";
import { notification, Typography } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { useMemo } from "react";
import dayjs from "dayjs";
import { parse, isValid } from "date-fns";
import "dayjs/locale/de";

interface Props {
  ad: TAdItem;
}

const AdDetails = ({ ad }: Props) => {
  const isRenting = ["TR", "STR"].includes(ad.subcategory ?? "");
  const { translate } = useLocalization();

  const address = useMemo(() => {
    const shouldWriteZip =
      ad.zipcode && !ad.city?.includes(ad.zipcode.toString());
    return `${ad.street ? `${ad.street}, ` : ""}${
      shouldWriteZip ? `${ad.zipcode} ` : ""
    }${ad.city}`;
  }, [ad]);

  const copyCity = () => {
    navigator.clipboard.writeText(address);
    notification.success({
      message: "Copied to clipboard",
      duration: 5,
    });
  };

  // 2025-05-06 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-06/shows%20this%20when%20no%20avaivble%20from%20date%20is%20set/29ldcx--5r8ls0?proj=1s4dec-3ibnqe
  const isValidDateString = (dateStr: unknown): boolean => {
    const dateOnly = dateStr?.toString().split(" ")?.[0] ?? dateStr;
    if (typeof dateOnly !== "string") return false;

    try {
      const parsed = parse(dateOnly, "yyyy-MM-dd", new Date());
      return isValid(parsed);
    } catch {
      return false;
    }
  };

  const isPreviousDate = (date?: string) => {
    if (!date) return false;
    return isValidDateString(date) && dayjs(date).isBefore(dayjs());
  };

  return (
    <div className="flex bg-[#e3c29c] flex-col gap-12 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Number of rooms and area */}
        {(ad.number_of_rooms || (ad.area && Number(ad.area) > 0)) && (
          <div className="flex items-center">
            {ad.number_of_rooms && (
              <Typography.Text className="text-[22px] leading-[32px] md:text-[32px] font-bold flex items-center gap-2">
                {ad.number_of_rooms.toString().replace(".0", "")}{" "}
                {translate("rooms")}
              </Typography.Text>
            )}
            {ad.area && Number(ad.area) > 0 && (
              <Typography.Text className="text-[22px] leading-[32px] md:text-[32px] font-bold flex items-center gap-2">
                <div>
                  {ad.number_of_rooms && ","} {Number(ad.area)} m<sup>2</sup>
                </div>
              </Typography.Text>
            )}
          </div>
        )}

        {ad.title && (
          <Typography.Text className="text-[18px] leading-[24px]">
            {ad.title}
          </Typography.Text>
        )}

        {ad.city && (
          <div className="flex gap-2">
            <Typography.Text className="text-[18px] flex gap-2 font-bold">
              {address}
            </Typography.Text>
            <Image
              src="/immo/avs/icons/Icons_copy.svg"
              className="!text-white cursor-pointer"
              width={32}
              height={32}
              onClick={copyCity}
              alt="filter"
            />
          </div>
        )}
      </div>

      {/* Footer  */}
      <div className="flex justify-between items-start lg:items-end flex-col lg:flex-row flex-wrap">
        {/* Property type */}
        {ad.property_type && (
          <div className="flex gap-1 items-center">
            <Typography.Text className="text-[16px] leading-[24px]">
              {`${translate("Property type")}: `}
            </Typography.Text>
            <Typography.Text className="text-[16px] leading-[24px] font-bold flex">
              {translate(ad.property_type)}
            </Typography.Text>
          </div>
        )}
        {/* Available From */}

        <div className="flex gap-1 items-center">
          <Typography.Text className="text-[16px] leading-[24px]">
            Verfügbar ab: 
          </Typography.Text>
          <Typography.Text className="text-[16px] leading-[24px] font-bold flex">
            {isPreviousDate(ad.available_from)
              ? "Sofort"
              : ad.available_from && isValidDateString(ad.available_from)
              ? dayjs(ad.available_from).locale("de").format("D. MMMM YYYY")
              : "Nach Vereinbarung"}
          </Typography.Text>
        </div>

        {/* Price */}
        {isValidPrice(ad.price) ? (
          <div
            className={classNames(
              "items-start rounded-[30px] flex gap-1 items-center",
              {
                "!hidden": ["STR", "STS"].includes(ad.subcategory || ""),
              }
            )}
          >
            <Typography.Text
              className={classNames("text-[16px] leading-[18px]")}
            >
              {isRenting
                ? `Mietpreis/${translate(ad.billing_cycle || "Month")}: `
                : "Preis: "}
            </Typography.Text>
            <Typography.Text className="text-[16px] leading-[24px] font-bold flex !text-[#444444]">
              CHF {Number(ad.price).toLocaleString("de-CH")}
            </Typography.Text>
          </div>
        ) : (
          <div
            className={classNames("items-center rounded-[30px] flex", {
              "!hidden": ["STR", "STS"].includes(ad.subcategory || ""),
            })}
          >
            <Typography.Text className="text-[16px] leading-[24px] font-bold !text-[#444444] mt-4 md:mt-0">
              {translate("Price on request")}
            </Typography.Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdDetails;
