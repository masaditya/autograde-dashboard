import { Divider, Card, Space, notification, Result } from "antd";
import { EXT_API } from "constant";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SmileOutlined, CarryOutOutlined } from "@ant-design/icons";

export default function Kelasku({ kelas }) {
  const [session, loading] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { putFetch } = useFetcher();
  const [userKelas, setUserKelas] = useState<any[]>([]);

  useEffect(() => {
    // @ts-ignore
    !loading && setUserKelas(session.user.kelas);
  }, [loading]);

  const te = useMemo(() => {
    let tmpId = userKelas.map((item) => item._id);
    let tempKelas = kelas.slice(0);
    return tempKelas.forEach((element) => {
      if (tmpId.includes(element["_id"])) {
        let removeIndex = kelas
          .map((item) => item["_id"])
          .indexOf(element["_id"]);
        kelas.splice(removeIndex, 1);
      }
    });
  }, [userKelas, loading, kelas]);

  const onJoin = useCallback(
    async (item) => {
      setIsLoading(true);
      const response = await putFetch("/class", {
        student: session.user,
        kelas: item,
      });
      notification.open({
        message: "Sukses Bergabung Kelas",
        description: "Selamat datang di kelas !" + response.class,
      });
      setIsLoading(false);
    },
    [session, loading]
  );

  return (
    <>
      <Divider orientation="left">Kelas yang diikuti</Divider>
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
      <Divider orientation="left">Kelas tersedia</Divider>
      {kelas.length > 0 ? (
        <Space size={[8, 16]} wrap>
          {kelas.map((item, i) => {
            return (
              <Card
                key={i}
                size="small"
                title={"TI4A"}
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
  );
}

export async function getStaticProps() {
  const res = await (await fetch(EXT_API + "/class")).json();
  return {
    props: {
      kelas: res,
    },
  };
}
