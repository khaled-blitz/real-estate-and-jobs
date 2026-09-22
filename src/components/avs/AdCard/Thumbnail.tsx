/* eslint-disable @next/next/no-img-element */
import { TAdItem } from "@/dto/ad-item";
import { getImageURL, isValidUrl } from "@/logic/utils/helpers";

interface Props {
  ad: TAdItem;
}

export default function Thumbnail({ ad }: Props) {
  if (!isValidUrl(getImageURL(ad.image_local))) return null;

  return (
    <div className="bg-[#f6eadc] flex w-full md:max-w-[200px] items-stretch ">
      <img
        src={getImageURL(ad.image_local)}
        alt="thumbnail"
        className="md:max-w-[200px] w-full md:max-h-[300px] "
        style={{
          objectFit: ad.source === "fusion" ? "contain" : "cover",
          width: "100%",
        }}
      />
    </div>
  );
}
