import { TAdItem } from "@/dto/ad-item";
import { ListControlContext } from "@/ListControl";
import { useLocalization } from "@/logic/localization";
import { Button, Card, Divider } from "antd";
import { useContext } from "react";
import Thumbnail from "./Thumbnail";
import Footer from "./Footer";
import Header from "./Header";
import classNames from "classnames";

const AdCard = ({ ad, isAdmin = false }: { ad: TAdItem; isAdmin: boolean }) => {
  const { translate } = useLocalization();
  const context = useContext(ListControlContext);

  if (!context) {
    return null;
  }

  const deleteObj = async () => {
    const obj = await context.model?.get(ad._blitzID ?? "");
    await obj?.delete();
    //TODO: reload list instead
    window.location.reload();
  };

  return (
    <div className="w-full">
      <Card
        className={classNames(
          "overflow-hidden w-full border-0 outline-2 outline-[#EBEBEB] outline rounded-[15px]",
          {
            "rounded-t-none md:rounded-[15px] md:rounded-l-none":
              ad.source === "fusion",
          }
        )}
        styles={{
          body: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0",
          },
        }}
        style={{
          marginBottom: "20px",
        }}
      >
        <div className="flex flex-col md:flex-row gsap-2 w-full">
          <Thumbnail ad={ad} />
          <div className="flex flex-col w-full justify-start">
            <Header ad={ad} />
            <Footer ad={ad} />
          </div>
        </div>
        {isAdmin && (
          <>
            <Divider className="mt-0 mb-0 bg-gray-300 self-center w-full" />
            <div className="w-full flex gap-4 self-end p-4 mt-auto">
              {/* {ad._blitzID} */}
              <Button className="w-full " onClick={deleteObj} type="link">
                {translate("Delete")}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AdCard;
