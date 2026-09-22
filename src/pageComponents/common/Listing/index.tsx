/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Card, Layout } from "antd";
import Meta from "@/components/common/FilterMeta";
import AdsPage from "@/pageComponents/common/AdsPage";
import FilterLayout from "@/components/common/Layout/FilterLayout";
import { ListControlContext } from "@/ListControl";
import Logo from "@/components/common/Logo";

export default function ListingPage() {
  const context = useContext(ListControlContext);

  if (!context) {
    return null;
  }

  return (
    <div className="flex min-h-[100vh]">
      <Layout>
        <FilterLayout className="hidden md:flex text-[#000] justify-center desktop-meta px-4">
          <div className="py-4 flex flex-col items-center bg-white opacity-90 mb-[40px] mt-[80px] px-8 rounded-[15px] w-full max-w-[1000px]">
            <Logo />
            <Meta />
          </div>
        </FilterLayout>

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
              },
            }}
            className="w-full border-0 h-full flex justify-center"
          >
            <div className="flex flex-col items-center justify-center md:hidden w-full pt-[80px] pb-6 px-4 desktop-meta">
              <div className="flex flex-col items-center justify-center w-full bg-white opacity-95 p-4 rounded-[15px]">
                <Logo />
                <Meta />
              </div>
            </div>
            <div className="p-4 w-full flex justify-center">
              <AdsPage />
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
