import { Card, Typography } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BlitzData } from "blitzdata.ts";
import { AdFusionModelName } from "@/logic/utils/constants";
import { TAdItem } from "@/dto/ad-item";
import "mapbox-gl/dist/mapbox-gl.css";
import ImagePreview from "@/components/common/ImagePreview";
import CarouselComponent from "./Carousel";
import NavBackButton from "@/components/avs/NavBackButton";
import Layout from "@/components/avs/Layout";
import AdDetails from "./AdDetails";
import DescriptionAndLocation from "./DescriptionAndLocation";
import FeaturesAndContactInfo from "./FeaturesAndContactInfo";
import Image from "next/image";
import { initializeConnection, isValidUrl } from "@/logic/utils/helpers";
import { ListControlContext } from "@/ListControl";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const id = router.query.slug;
  const [ad, setAd] = useState<TAdItem>();
  const [visible, setVisible] = useState(false);
  const context = useContext(ListControlContext);
  const galleryImages = ad
    ? [ad.image_local, ...(Array.isArray(ad.gallery) ? ad.gallery : [])]
    : [];

  useEffect(() => {
    (async () => {
      // 2025-04-17 https://alpha.blitzdata.com/blitzpm/log/khaledblitz/2025-04-17/Address%20Email%20Comments/28mgby-xu1prl
      if (!id || context?.isLoading) {
        return;
      }
      await initializeConnection();
      const bd = await BlitzData._Model?.get(AdFusionModelName);
      const ad = await bd?.get({ blitzID: id as string, raw: true });
      if (!ad) {
        router.push("/");
      }
      setAd(ad as unknown as TAdItem);
    })();
  }, [id, router, context?.isLoading]);

  if (!ad) {
    return (
      <Layout>
        <Card
          loading
          style={{ height: "100vh", width: "100%" }}
          className="bg-transparent !border-none"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {visible && (
        <ImagePreview
          src={galleryImages[selectedImage]}
          isOpen={visible}
          onCancel={() => setVisible(false)}
        />
      )}
      <div className="p-0 md:p-4 md:ph-[0px] flex flex-col items-center w-full">
        <div className="flex flex-col w-full justify-center items-center h-full">
          {/* <Typography.Title level={2}>{ad.title}</Typography.Title> */}

          <div className="flex justify-center items-center w-full">
            <CarouselComponent
              selectedImage={selectedImage}
              galleryImages={galleryImages}
              onImageClick={() => setVisible(true)}
              onChange={setSelectedImage}
              ad={ad}
            />
          </div>

          <div className="flex flex-col w-full md:w-[80%] gap-2">
            {ad.insert_internet_link && isValidUrl(ad.insert_internet_link) && (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => window.open(ad.insert_internet_link, "_blank")}
              >
                <Image
                  src="/immo/avs/icons/Icons_Links.svg"
                  className="!text-white cursor-pointer"
                  width={36}
                  height={36}
                  alt="filter"
                />
                <Typography.Text>
                  {ad.insert_link_name || "Link"}
                </Typography.Text>
              </div>
            )}
            <AdDetails ad={ad} />
            <NavBackButton />
            <FeaturesAndContactInfo ad={ad} />
            <DescriptionAndLocation ad={ad} />
            <NavBackButton />
          </div>
        </div>
      </div>
    </Layout>
  );
}
