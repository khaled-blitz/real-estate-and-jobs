import AdsList from "@/components/avs/AdsList";
import React, { useContext } from "react";
import { Button } from "antd";
import { useLocalization } from "@/logic/localization";
import { ListControlContext } from "@/ListControl";

interface Props {
  isAdmin?: boolean;
}

const AdsPage = ({ isAdmin }: Props) => {
  const { translate } = useLocalization();

  const context = useContext(ListControlContext);

  if (!context) {
    return null;
  }

  return (
    <div className="flex flex-col self-center w-full relative">
      <div className="flex flex-col lg:flex-row self-center w-full relative gap-[0px] md:gap-[20px]">
        <AdsList isAdmin={isAdmin} />
        <iframe
          loading="lazy"
          data-src="https://fusion.localpoint.ch/widgets/c54e4ea6-6f63-4401-8f13-3a1814f1d8fe/rotator/"
          style={{
            height: "613px",
            border: "0px",
          }}
          height="613"
          src="https://fusion.localpoint.ch/widgets/c54e4ea6-6f63-4401-8f13-3a1814f1d8fe/rotator/"
          className="flex flex-col mb-[20px] mt-[0px] md:mt-[48px]"
        ></iframe>
      </div>
      {context.ads.length > 0 && context.showMore && (
        <div
          className="flex w-full items-center justify-center py-4"
          style={{ marginTop: "24px" }}
        >
          <Button
            onClick={context.showMore}
            size="large"
            type="primary"
            loading={context.isLoading}
          >
            {translate("Show more")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdsPage;
