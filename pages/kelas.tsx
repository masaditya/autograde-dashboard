import { Card, Input } from "antd";
import { Button, Modal, Form, Radio } from "antd";
import moduleName from "antd";
import { API_ADD_KELAS, API_KELAS } from "constant";
import { useCallback, useEffect, useState } from "react";
import AuthGuard from "./_authguard";
import { AddKelas } from "components/Modal/AddKelas";

export default function Kelas({ classes }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    setKelas(classes.classes);
  }, []);

  const onCreate = useCallback(async (values) => {
    setLoading(true);
    const res = await fetch(API_ADD_KELAS, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    setKelas([...kelas, { values }]);
    setLoading(false);
    setVisible(false);
  }, []);

  return (
    <AuthGuard>
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
      {classes &&
        kelas.map((item, i) => {
          return (
            <Card
              key={i}
              size="small"
              title={item.class}
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>{item.matkul}</p>
            </Card>
          );
        })}
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
