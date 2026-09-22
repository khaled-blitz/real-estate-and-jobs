import { Card, Layout, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlitzData } from "blitzdata.ts";
import { AdFusionModelName } from "@/logic/utils/constants";
import { TAdItem } from "@/dto/ad-item";
import "mapbox-gl/dist/mapbox-gl.css";
import ImagePreview from "@/components/common/ImagePreview";
import Map from "@/components/common/Map";
import Pills from "./Pills";
import CarouselComponent from "./Carousel";
import RightPanel from "./RightPanel";
import NavBackButton from "@/components/common/NavBackButton";
import { initializeConnection } from "@/logic/utils/helpers";

const isHTML = (str: string) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

const RenderContent = ({ content }: { content: string }) => {
  return isHTML(content) ? (
    <div className="text-[#000] text-[18px] mt-[32px] line-clamp-10 my-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  ) : (
    <Typography.Text className="text-[#000] text-[18px] mt-[32px]">
      {content}
    </Typography.Text>
  );
};

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 41.63345,
    longitude: -74.33165,
  });
  const router = useRouter();
  const id = router.query.slug;
  const [ad, setAd] = useState<TAdItem>();
  const [visible, setVisible] = useState(false);
  const galleryImages = ad
    ? [ad.image_local, ...(Array.isArray(ad.gallery) ? ad.gallery : [])]
    : [];

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }
      await initializeConnection();
      const bd = await BlitzData._Model?.get(AdFusionModelName);
      const ad = await bd?.get({ blitzID: id as string, raw: true });
      setAd(ad as unknown as TAdItem);
      if (!ad) {
        router.push("/");
      }
    })();
  }, [id, router]);

  useEffect(() => {
    (async () => {
      if (!ad || !ad.country || !ad.zipcode) return;
      const response = await fetch(
        `https://api.zippopotam.us/CH/${ad.zipcode}`
      );
      if (!response.ok) return;
      const data = await response.json();
      setCoordinates({
        latitude: Number(data.places[0].latitude),
        longitude: Number(data.places[0].longitude),
      });
      setCountry(data.country);
    })();
  }, [ad]);

  if (!ad) {
    return (
      <Layout>
        <Card loading style={{ height: "100vh" }} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div key={selectedImage}>
        <ImagePreview
          src={galleryImages[selectedImage]}
          isOpen={visible}
          onCancel={() => setVisible(false)}
        />
      </div>
      <div className="min-h-[100vh] p-[16px] md:p-[24px] md:ph-[0px] md:px-[80px] flex flex-col items-center">
        <NavBackButton />
        <div className="flex flex-col w-full justify-center items-center h-full mt-8 max-w-[100vw] md:max-w-[1000px]">
          <Typography.Title level={2}>{ad.title}</Typography.Title>

          <div className="flex flex-col md:flex-row justify-center items-center w-full h-full my-8 gap-6">
            <CarouselComponent
              selectedImage={selectedImage}
              galleryImages={galleryImages}
              onImageClick={() => setVisible(true)}
              onChange={setSelectedImage}
              ad={ad}
            />
            <RightPanel ad={ad} />
          </div>
          <Pills ad={ad} />
          {ad.description && <RenderContent content={ad.description} />}

          {country && (
            <div className="block relative w-full mt-8">
              <Map coordinates={coordinates} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
