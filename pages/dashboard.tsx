import { getAssignment } from "lib/assignment";
import AuthGuard from "./_authguard";
import { useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { Modal, Card, Space, Button } from "antd";
import { API_KELAS, JOIN_CLASS } from "constant";
import { useCallback } from "react";

export default function Dashboard({ classes }) {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDosen && !studentClass) setVisible(true);
    return () => {};
  }, [loading]);

  return (
    <AuthGuard>
      <Modal
        visible={visible}
        closeIcon={null}
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
                  extra={<Button>Join</Button>}
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

export async function getStaticProps() {
  const classes = await (await fetch(API_KELAS)).json();
  return {
    props: {
      classes,
    },
  };
}
