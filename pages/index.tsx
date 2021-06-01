import { useSession } from "next-auth/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { Modal, Card, Space, Button, notification } from "antd";
import { API_KELAS, EXT_API, JOIN_CLASS } from "constant";
import { Accordion } from "components/Dashboard/Accordion";

export async function getStaticProps() {
  const classes = await (await fetch(API_KELAS)).json();
  return {
    props: {
      classes,
    },
  };
}

export default function Home({ classes }) {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !loading && !isDosen && !studentClass
      ? setVisible(true)
      : setVisible(false);
    console.log(!loading, !isDosen, studentClass);
  }, [loading]);

  const onJoin = useCallback(
    async (item) => {
      setIsLoading(true);
      // @ts-ignore
      const response = await fetch(EXT_API + "/user/" + session.user.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...session.user, class: item.class }),
      });
      let res = await response.json();
      console.log(res);
      notification.open({
        message: "Sukses Bergabung Kelas",
        description: "Selamat datang di kelas " + res.class,
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
      <Accordion />
    </>
  );
}
