import { TAdItem } from "@/dto/ad-item";
import { Typography } from "antd";
import { useLocalization } from "@/logic/localization";
import classNames from "classnames";
import Price from "./fields/Price";
import Logo from "./fields/Logo";
import { CategorySearchingMap } from "@/logic/utils/helpers";

interface Props {
  ad: TAdItem;
  isTop?: boolean;
}

const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const RenderContent = ({ content }: { content: string }) => {
  return isHTML(content) ? (
    <div className="text-[16px] md:text-[16px] text-[#444444] line-clamp-2 my-auto leading-[22px]">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  ) : (
    <Typography.Text className="text-[16px] md:text-[16px] text-[#444444] line-clamp-2 my-auto leading-[22px]">
      {content}
    </Typography.Text>
  );
};

export default function Header({ ad, isTop = false }: Props) {
  const { translate } = useLocalization();
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 px-4 py-3 w-full justify-start h-full relative",
        { "min-h-[240px]": ad.logo }
      )}
    >
      {/* In the flow, not over it: the subcategory badge owns the top right,
          and an absolute badge here would cover the property type. */}
      {isTop && (
        <span className="self-start bg-[#444444] text-white text-md md:text-lg px-2 py-1 leading-none">
          Top
        </span>
      )}
      {ad.subcategory && (
        <div className="absolute top-4 right-0 bg-[#444444] text-white text-md md:text-lg px-2 py-1">
          {CategorySearchingMap[
            ad.subcategory as keyof typeof CategorySearchingMap
          ] || translate(ad.subcategory)}
        </div>
      )}
      {ad.property_type && (
        <Typography.Text className="text-[18px] max-w-[calc(100%-200px)] leading-[18px]">
          {translate(ad.property_type)}
        </Typography.Text>
      )}
      {/* Number of rooms and area */}
      {(ad.number_of_rooms || (ad.area && Number(ad.area) > 0)) && (
        <div className="flex items-center">
          {ad.number_of_rooms && (
            <Typography.Text className="text-[16px] leading-[32px] md:text-[32px] font-bold flex items-center gap-2 text-[#444444]">
              {ad.number_of_rooms.toString().replace(".0", "")}{" "}
              {translate("rooms")}
            </Typography.Text>
          )}
          {ad.area && Number(ad.area) > 0 && (
            <Typography.Text className="text-[16px] leading-[32px] md:text-[32px] font-bold flex items-center gap-2 text-[#444444]">
              <div>
                {ad.number_of_rooms && ","}{" "}
                {Number(ad.area).toFixed(0).toString()} m<sup>2</sup>
              </div>
            </Typography.Text>
          )}
        </div>
      )}
      {/* 2025-04-18 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-04-18/Address%20Email%20Comments/28nxc6-9wote3?proj=1s4dec-3ibnqe */}
      {/* 2025-05-06 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-05-06/Also%20Zu%20Kaufen%20gesucht%20should%20not%20show%20price%20on%20request%20when%200/29lbjj--uqyfkc */}
      <div
        className={classNames("max-w-full", {
          "md:max-w-[calc(100%-178px)]": ["STS", "STR"].includes(
            ad.subcategory || ""
          ),
          "md:max-w-[calc(100%-100px)]": ["TS", "TR"].includes(
            ad.subcategory || ""
          ),
        })}
      >
        {ad.title && (
          <Typography.Text className={classNames("text-[18px] leading-[24px]")}>
            {ad.title}
          </Typography.Text>
        )}
        {ad.city && (
          <Typography.Text className="text-[18px] text-[#444444] flex gap-2 font-bold">
            {ad.city}
          </Typography.Text>
        )}
        {ad.description && <RenderContent content={ad.description} />}
      </div>
      <div className="flex mt-auto pt-2 justify-between items-end">
        <Price ad={ad} />
        <Logo ad={ad} isAbsolute />
      </div>
    </div>
  );
}
