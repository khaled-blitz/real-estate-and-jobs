import { ImageType } from "@/dto/ad-item";
import { getImageURL } from "@/logic/utils/helpers";
import { Button } from "antd";
import Image from "next/image";

interface Props {
  src: ImageType | undefined;
  isOpen: boolean;
  onCancel: () => void;
}

const ImagePreview = ({ src, isOpen, onCancel }: Props) => {
  const url = getImageURL(src);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-[calc(100vw-20px)] h-[calc(100vh-20px)]">
        <Image src={url} alt="Full Image" fill className="object-contain" />
      </div>
      <Button
        onClick={onCancel}
        className="absolute top-4 right-4 text-2xl px-1"
      >
        ✕
      </Button>
    </div>
  );
};

export default ImagePreview;
