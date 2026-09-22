import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ENV } from "@/logic/utils/constants";

const Detail = () => {
  const router = useRouter();
  const client = router.query.client || ENV.CLIENT || "common" || "common"; // Get `client` from query param

  const DetailComponent = useMemo(
    () =>
      dynamic(
        async () => {
          try {
            return await import(`@/pageComponents/${client}/Detail`);
          } catch {
            return await import(`@/pageComponents/common/Detail`);
          }
        },
        { ssr: false }
      ),
    [client] // Recreate the component when `client` changes
  );

  return <DetailComponent />;
};

export default Detail;
