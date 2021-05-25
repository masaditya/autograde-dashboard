import { getAssignment } from "lib/assignment";
import AuthGuard from "./_authguard";
import { Wrapper } from "components/Layout/wrapper";
import { useSession } from "next-auth/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { Modal, Card, Space, Button } from "antd";
import { API_KELAS, JOIN_CLASS } from "constant";

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

  useEffect(() => {
    (!loading && !isDosen && studentClass == "") ? setVisible(true) : setVisible(false);
    // if (true && false) setVisible(true);
    return () => {};
  }, [loading]);

  const onJoin = useCallback(
    async (item) => {
      console.log({ ...session.user, class: item.class });
      const response = await fetch(JOIN_CLASS, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...session.user, class: item.class }),
      });
      let res = await response.json();
    },
    [session, loading]
  );

  return (
    <AuthGuard>
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
                  extra={<Button onClick={() => onJoin(item)}>Join</Button>}
                  style={{ width: 200 }}
                >
                  <p>{item.matkul}</p>
                </Card>
              );
            })}
        </Space>
      </Modal>
    </AuthGuard>
  );
}
