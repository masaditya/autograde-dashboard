import { Accordion } from "components/Dashboard/Accordion";
import { useRouter } from "next/router";
import { useFetcher } from "lib/useFetcher";
import { useEffect, useState } from "react";
import { Spin } from "antd";
export default function MhsDetail(props) {
  const { query } = useRouter();
  const { getFetch } = useFetcher();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFetch("/assignment/" + query.id).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, [query.id]);

  return <>{!isLoading ? <Accordion data={data} /> : <Spin size="large" />}</>;
}
