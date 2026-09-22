import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ENV } from "@/logic/utils/constants";

const DynamicListing = () => {
  const router = useRouter();
  const client = router.query.client || ENV.CLIENT || "common"; // Get `client` from query param

  const Listing = useMemo(
    () =>
      dynamic(
        async () => {
          try {
            return await import(`@/pageComponents/${client}/Listing`);
          } catch {
            return await import(`@/pageComponents/common/Listing`);
          }
        },
        { ssr: false }
      ),
    [client] // Recreate the component when `client` changes
  );

  return <Listing />;
};

export default DynamicListing;
