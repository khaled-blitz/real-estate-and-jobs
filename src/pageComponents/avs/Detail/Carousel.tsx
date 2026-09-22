/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageType, TAdItem } from "@/dto/ad-item";
import { useMediaQuery } from "@/logic/hooks/useMediaQuery";
import { getImageURL, isValidUrl } from "@/logic/utils/helpers";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
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
  const { isSmallScreen } = useMediaQuery();
  const ref = useRef(null);

  const nextImage = () => {
    (ref.current as any)?.next();
  };

  const prevImage = () => {
    (ref.current as any)?.prev();
  };

  if (!Array.isArray(galleryImages)) return null;

  return (
    <div className="w-full max-w-[100vw] mx-auto my-6">
      {/* Image Carousel Container */}
      <div className="flex relative w-full items-stretch gap-4">
        <div className="relative w-[calc(100%)] overflow-hidden">
          <Carousel
            infinite={false}
            swipe
            ref={ref}
            dots={false}
            beforeChange={(_, next) => onChange(next)}
            centerMode={!isSmallScreen}
            rootClassName="custom-carousel w-full md:w-[80%] mx-auto"
          >
            {galleryImages?.map((image, index) => {
              const url = getImageURL(image);
              if (!isValidUrl(url)) return null;
              return (
                <div
                  key={index}
                  className="relative w-full h-[400px] bg-transparent !flex gap-4 px-3"
                >
                  <img
                    src={url}
                    alt={`thumbnail-${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onImageClick?.();
                    }}
                    className="w-full h-full object-cover"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit:
                        ad && ad.source === "fusion" ? "contain" : "cover",
                      margin: "0 auto",
                    }}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        {/* Navigation Arrows */}
        {selectedImage !== 0 && (
          <button
            className="absolute top-1/2 left-[20px] md:left-[-20px] bg-gray-800 text-white rounded-full p-2 shadow-md flex"
            onClick={prevImage}
          >
            <LeftOutlined style={{ fontSize: "20px", color: "#d6a975" }} />
          </button>
        )}
        {selectedImage !== galleryImages.length - 1 && (
          <button
            className="absolute top-1/2 right-[20px] md:right-[-20px] bg-gray-800 text-white rounded-full p-2 shadow-md flex"
            onClick={nextImage}
          >
            <RightOutlined style={{ fontSize: "20px", color: "#d6a975" }} />
          </button>
        )}

        {/* Image Counter Overlay */}
        {galleryImages.length > 1 && (
          <div className="absolute m-auto left-0 right-0 bottom-4 bg-[#3a3944] text-white px-3 py-1 text-sm shadow-md w-fit">
            {selectedImage + 1}/{galleryImages.length}
          </div>
        )}
      </div>
    </div>
  );
}
