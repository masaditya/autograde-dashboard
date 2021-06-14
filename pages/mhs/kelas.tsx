// @ts-nocheck
import { Divider, Card, Space, notification, Result, Spin } from "antd";
import { EXT_API } from "constant";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SmileOutlined, CarryOutOutlined } from "@ant-design/icons";

export default function Kelasku() {
  const [session, loading] = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { putFetch, getFetch } = useFetcher();
  const [userKelas, setUserKelas] = useState<any[]>([]);
  const [kelas, setKelas] = useState<any[]>([]);
  const [availKelas, setavailKelas] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      setUserKelas(session.user.kelas);
      filterKelas(session.user.kelas);
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    getFetch("/class").then((res) => {
      setKelas(res);
    });
  }, []);

  const filterKelas = useCallback(
    (uk) => {
      let tmpId = uk.map((item) => item.id);
      let tmpKelas = [...kelas];
      let kelasFix = [];
      tmpKelas.forEach((el) => {
        if (!tmpId.includes(el["id"])) {
          kelasFix.push(el);
        }
      });
      setavailKelas(kelasFix);
    },
    [kelas]
  );

  const onJoin = useCallback(
    async (item) => {
      // console.log(item)
      setIsLoading(true);
      // setIsLoading(true);
      const response = await putFetch("/class", {
        student: session.user,
        kelas: item,
      });
      notification.open({
        message: "Sukses Bergabung Kelas",
        description: "Selamat datang di kelas " + item.class + " !",
      });
      filterKelas([...userKelas, item]);
      setIsLoading(false);
    },
    [session, loading]
  );

  return (
    <>
      <Divider orientation="left">Kelas yang diikuti</Divider>
      {!isLoading ? (
        <>
          {userKelas.length > 0 ? (
            <Space size={[8, 16]} wrap>
              {userKelas.map((item, i) => {
                return (
                  <Card
                    key={i}
                    size="small"
                    title={item.class}
                    style={{ width: 300 }}
                  >
                    <p>{item.matkul}</p>
                  </Card>
                );
              })}
            </Space>
          ) : (
            <Result
              icon={<CarryOutOutlined />}
              title="Belum Terdaftar dikelas, silahkan pilih kelas yang tersedia"
            />
          )}
        </>
      ) : (
        <Spin size="large" />
      )}
      <Divider orientation="left">Kelas tersedia</Divider>
      {!isLoading ? (
        <>
          {kelas.length > 0 ? (
            <Space size={[8, 16]} wrap>
              {kelas.map((item, i) => {
                return (
                  <Card
                    key={i}
                    size="small"
                    title={item.class}
                    extra={<a onClick={() => onJoin(item)}>Bergabung</a>}
                    style={{ width: 300 }}
                  >
                    <p>{item.matkul}</p>
                  </Card>
                );
              })}
            </Space>
          ) : (
            <Result
              icon={<CarryOutOutlined />}
              title="Tidak ada kelas tersedia saat ini."
            />
          )}
        </>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
}

// export async function getStaticProps() {
//   const res = await (await fetch(EXT_API + "/class")).json();
//   return {
//     props: {
//       kelas: res,
//     },
//   };
// }
