import { TAdItem } from "@/dto/ad-item";
import { Typography } from "antd";
import Image from "next/image";
import { useLocalization } from "@/logic/localization";
import classNames from "classnames";
import { isValidPrice } from "@/logic/utils/helpers";

interface Props {
  ad: TAdItem;
}

const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const RenderContent = ({ content }: { content: string }) => {
  return isHTML(content) ? (
    <div className="text-[16px] md:text-[18px] text-[#444444] line-clamp-10 my-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  ) : (
    <Typography.Text className="text-[16px] md:text-[18px] text-[#444444] line-clamp-5 my-auto">
      {content}
    </Typography.Text>
  );
};

export default function Header({ ad }: Props) {
  const { translate } = useLocalization();
  return (
    <div className="flex flex-col gap-3 md:gap-2 p-4 pt-2 w-full justify-start h-full">
      {/* Number of rooms and price */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {ad.number_of_rooms && (
            <Typography.Text className="text-[16px] md:text-[18px] flex items-center gap-2 text-[#444444]">
              <Image src="/immo/Rooms.svg" width={26} height={26} alt="rooms" />
              {ad.number_of_rooms.toString().replace(".0", "")}{" "}
              {translate("rooms")}
            </Typography.Text>
          )}
          {ad.property_type && (
            <Typography.Text className="block md:hidden text-[16px] font-bold">
              {translate(ad.property_type)}
            </Typography.Text>
          )}
        </div>
        {isValidPrice(ad.price) ? (
          <div
            className={classNames(
              "absolute right-2 top-4 items-center border border-[2px] border-[#D6D6D6] rounded-[30px] py-[1px] px-3 hidden md:flex",
              { "!hidden": ["STR", "STS"].includes(ad.subcategory || "") }
            )}
          >
            <Typography.Title
              level={3}
              className="!m-0 !leading-[34px] !text-[#444444]"
            >
              Fr. {Number(ad.price).toLocaleString("de-CH")}
            </Typography.Title>
          </div>
        ) : (
          <div
            className={classNames(
              "absolute right-2 top-2 items-center border border-[2px] border-[#D6D6D6] rounded-[30px] py-[1px] px-3 hidden md:flex",
              { "!hidden": ["STR", "STS"].includes(ad.subcategory || "") }
            )}
          >
            <Typography.Title level={4} className="!m-0 !text-[#444444]">
              {translate("Price on request")}
            </Typography.Title>
          </div>
        )}
      </div>

      {ad.property_type && (
        <Typography.Text className="hidden md:block text-[24px] font-bold max-w-[calc(100%-200px)]">
          {translate(ad.property_type)}
        </Typography.Text>
      )}

      <Typography.Text
        className={classNames("text-[20px] text-[24px] font-bold", {
          "md:mt-2": !ad.property_type || !ad.number_of_rooms,
          "md:!mt-8": !ad.property_type && !ad.number_of_rooms,
        })}
      >
        {ad.title}
      </Typography.Text>

      {ad.price && (
        <Typography.Title
          level={4}
          className="!m-0  block md:hidden !text-[#444444] text-[20px]"
        >
          Fr. {Number(ad.price).toLocaleString("de-CH")}
        </Typography.Title>
      )}

      {ad.description && <RenderContent content={ad.description} />}
    </div>
  );
}
