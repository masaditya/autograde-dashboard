import { Button, Card, Space } from "antd";
import { AddKelas } from "components/Modal/AddKelas";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { useCallback, useEffect, useState } from "react";

export const KelasList = ({ classes }) => {
  const [session, loading] = useSession();
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { postFetch, getFetch } = useFetcher();
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    !loading && getData();
    
  }, [loading]);

  const getData = useCallback(() => {
     // @ts-ignore
    // getFetch("/class/dosen/"+session.user.id).then((res) => {
    //   // setKelas(res);
    //   console.log(res);
    // });
    const filteredClass = classes.filter(item => item.teacher == session.user.id)
    setKelas(filteredClass)
  }, [loading, session]);

  const onCreate = useCallback(
    async (values) => {
      setLoading(true);
      // @ts-ignore
      postFetch("/class", {...values, teacher : session.user.id}).then((res) => {
        setKelas([...kelas, res]);
        setLoading(false);
        setVisible(false);
      });
    },
    [kelas, loading, session]
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Kelas Baru
      </Button>
      <AddKelas
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        loading={isLoading}
      />
      <br />
      <Space size={[8, 16]} wrap>
        {kelas &&
          kelas.map((item, i) => {
            return (
              <Card
                key={i}
                size="small"
                title={item.class}
                // extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p>{item.matkul}</p>
              </Card>
            );
          })}
      </Space>
    </div>
  );
};
