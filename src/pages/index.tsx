import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ENV } from "@/logic/utils/constants";

const DynamicHome = () => {
  const router = useRouter();
  const client = router.query.client || ENV.CLIENT || "common"; // Get `client` from query param

  const Home = useMemo(
    () =>
      dynamic(
        async () => {
          try {
            return await import(`@/pageComponents/${client}/Landing`);
          } catch {
            return await import(`@/pageComponents/common/Landing`);
          }
        },
        { ssr: false }
      ),
    [client] // Recreate the component when `client` changes
  );

  return <Home />;
};

export default DynamicHome;
