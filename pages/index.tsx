import { useSession } from "next-auth/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { Modal, Card, Space, Button, notification } from "antd";
import { API_KELAS, EXT_API, JOIN_CLASS } from "constant";
import { Accordion } from "components/Dashboard/Accordion";
import { useFetcher } from "lib/useFetcher";
import { DashboardDiagram } from "components/Dashboard/DashboardDiagram";

export async function getStaticProps() {
  const classes = await (await fetch(API_KELAS)).json();
  const res = await (await fetch(EXT_API + "/assignment")).json();
  return {
    props: {
      classes,
      tugas: res,
    },
  };
}

export default function Home({ classes, tugas }) {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { putFetch } = useFetcher();

  useEffect(() => {
    !loading && !isDosen && !studentClass
      ? setVisible(true)
      : setVisible(false);
  }, [loading]);

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
      setVisible(false);
      setIsLoading(false);
    },
    [session, loading]
  );

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="Bergabung ke Kelas untuk melanjutkan"
      >
        <Space size={[8, 16]} wrap align="center">
          {classes &&
            classes.classes.map((item, i) => {
              return (
                <Card
                  key={i}
                  size="small"
                  title={item.class}
                  extra={
                    <Button
                      disabled={isLoading}
                      loading={isLoading}
                      onClick={() => onJoin(item)}
                    >
                      Join
                    </Button>
                  }
                  style={{ width: 200 }}
                >
                  <p>{item.matkul}</p>
                </Card>
              );
            })}
        </Space>
      </Modal>
      <DashboardDiagram tugas={tugas} />
    </>
  );
}
