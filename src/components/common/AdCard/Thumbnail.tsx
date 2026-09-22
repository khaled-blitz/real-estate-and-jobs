import { TAdItem } from "@/dto/ad-item";
import { getImageURL, isValidUrl } from "@/logic/utils/helpers";

interface Props {
  ad: TAdItem;
}

export default function Thumbnail({ ad }: Props) {
  if (!isValidUrl(getImageURL(ad.image_local))) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getImageURL(ad.image_local)}
      alt="thumbnail"
      className="md:w-fit md:max-w-[200px]"
      style={{
        objectFit: ad.source === "fusion" ? "contain" : "cover",
        width: "100%",
      }}
    />
  );
}
