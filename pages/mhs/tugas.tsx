import { Accordion } from "components/Dashboard/Accordion";
import { DashboardDiagram } from "components/Dashboard/DashboardDiagram";
import { EXT_API } from "constant";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Tugasku() {
  const [session, loading] = useSession();
  const { getFetch } = useFetcher();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !loading &&
      // @ts-ignore
      getFetch("/assignment/" + session.user.id).then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, [loading]);

  return (
    <>
      <Accordion data={data} />
    </>
  );
}
