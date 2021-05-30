import { Button, Card, Space } from "antd";
import { AddKelas } from "components/Modal/AddKelas";
import { useFetcher } from "lib/useFetcher";
import { useCallback, useEffect, useState } from "react";

export const KelasList = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { postFetch, getFetch } = useFetcher();
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    // setKelas(classes.classes);
    getData();
  }, []);

  const getData = useCallback(() => {
    getFetch("/class").then((res) => {
      setKelas(res);
    });
  }, []);

  const onCreate = useCallback(
    async (values) => {
      setLoading(true);
      postFetch("/class", values).then((res) => {
        setKelas([...kelas, res]);
        setLoading(false);
        setVisible(false);
      });
    },
    [kelas]
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
        loading={loading}
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
