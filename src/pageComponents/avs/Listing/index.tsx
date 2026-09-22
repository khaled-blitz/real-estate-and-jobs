/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Card } from "antd";
import AdsPage from "@/pageComponents/avs/AdsPage";
import { ListControlContext } from "@/ListControl";
import Layout from "@/components/avs/Layout";

export default function ListingPage() {
  const context = useContext(ListControlContext);

  if (!context) {
    return null;
  }

  return (
    <div className="flex min-h-[100vh]">
      <Layout>
        <div className="flex flex-col items-center w-full overflow-hidden h-full">
          <Card
            loading={context.pendingInitialization}
            bordered={false}
            styles={{
              body: {
                padding: context.pendingInitialization ? "60px 20px" : "0",
                width: "100%",
                maxWidth: context.pendingInitialization ? "1000px" : "100%",
                justifyItems: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
              },
            }}
            className="w-full border-0 h-full flex justify-center bg-transparent"
          >
            <div className="p-0 w-full flex justify-center">
              <AdsPage />
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
