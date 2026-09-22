/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageType, TAdItem } from "@/dto/ad-item";
import { getImageURL, isValidUrl } from "@/logic/utils/helpers";
import { PlayCircleFilled } from "@ant-design/icons";
import { Carousel } from "antd";
import classNames from "classnames";
import { useRef } from "react";

interface Props {
  selectedImage: number;
  galleryImages: (ImageType | undefined)[];
  onChange: (index: number) => void;
  ad?: TAdItem;
  onImageClick?: () => void;
}

export default function CarouselComponent({
  selectedImage,
  galleryImages,
  ad,
  onChange,
  onImageClick,
}: Props) {
  const ref = useRef(null);

  const nextImage = () => {
    (ref.current as any)?.next();
  };

  const prevImage = () => {
    (ref.current as any)?.prev();
  };

  if (!Array.isArray(galleryImages)) return null;
  return (
    <div className="w-full max-w-[100vw] md:max-w-[600px] max-h-[400px] overflow-hidden rounded-xl my-4 relative">
      <div
        className="absolute top-1/2 left-[20px] md:left-[40px] z-10 cursor-pointer"
        onClick={prevImage}
        onMouseDown={(e) => e.preventDefault()} // Prevent selection when clicking the button
      >
        <PlayCircleFilled
          className={classNames("play-icon prev", {
            "bg-[#444444]": selectedImage !== 0,
            "bg-[#EBEBEB]": selectedImage === 0,
          })}
          style={{ fontSize: "30px" }}
        />
      </div>
      <div
        className="absolute bottom-[20px] right-[20px] md:bottom-[40px] md:right-[40px] z-10 bg-[#fff] rounded-full p-[5px] text-[#444444] border border-[#000]"
        onMouseDown={(e) => e.preventDefault()} // Prevent selection when clicking the button
      >
        {selectedImage + 1}/{galleryImages.length}
      </div>
      <div
        className={classNames({
          "absolute top-1/2 right-[20px] md:right-[40px] z-10 cursor-pointer":
            true,
        })}
        onClick={nextImage}
        onMouseDown={(e) => e.preventDefault()} // Prevent selection when clicking the button
      >
        <PlayCircleFilled
          className={classNames("play-icon", {
            "bg-[#444444]": selectedImage !== galleryImages.length - 1,
            "bg-[#EBEBEB]": selectedImage === galleryImages.length - 1,
          })}
          style={{ fontSize: "30px" }}
        />
      </div>
      <Carousel
        infinite={false}
        swipe
        ref={ref}
        dots={false}
        beforeChange={(_, next) => onChange(next)}
        className="relative"
        style={{ position: "relative" }}
      >
        {galleryImages?.map((image, index) => {
          const url = getImageURL(image);
          if (!isValidUrl(url)) return null;
          return (
            <div
              key={index}
              className="w-full max-w-[100vw] md:max-w-[600px] max-h-[400px] h-[100vh] !flex justify-center relative"
              onClick={(e) => e.preventDefault()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`thumbnail-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  onImageClick?.();
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: ad && ad.source === "fusion" ? "contain" : "cover",
                  margin: "0 auto",
                  borderRadius: "15px",
                }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
