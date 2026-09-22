import { useEffect, useState } from "react";
import Image from "next/image";
import { TAdItem } from "@/dto/ad-item";
import { getImageURL } from "@/logic/utils/helpers";
import classNames from "classnames";

interface Props {
  ad: TAdItem;
  isAbsolute?: boolean;
}

//2025-04-18 KH https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-04-18/Address%20Email%20Comments/28nxc6-9wote3?proj=1s4dec-3ibnqe
const Logo = ({ ad, isAbsolute }: Props) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!ad.logo) return;

    const img = new window.Image();
    img.src = getImageURL(ad.logo);

    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
  }, [ad.logo]);

  if (!ad.logo || !dimensions) return null;

  return (
    <div
      className={classNames({
        " absolute bottom-4 right-4": isAbsolute,
        "": !isAbsolute,
      })}
    >
      <Image
        src={getImageURL(ad.logo)}
        alt="logo"
        width={dimensions.width}
        className="max-w-[100px] max-h-[50px] md:max-w-[150px] w-full h-full md:max-h-[80px]"
        // style={{ maxWidth: 200, maxHeight: 200 }}
        height={dimensions.height}
        unoptimized
      />
    </div>
  );
};

export default Logo;
