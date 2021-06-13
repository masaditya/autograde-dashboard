import {
  Card,
  Col,
  Row,
  Space,
  Progress,
  Skeleton,
  Layout,
  Image,
  Divider,
  Alert,
  Button
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import Title from "antd/lib/typography/Title";
import { useSession } from "next-auth/client";
import { useFetcher } from "lib/useFetcher";
import Link from "next/link";

export const DashboardDiagram = () => {
  const [session, loading] = useSession();
  const [tugas, setTugas] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const { getFetch } = useFetcher();

  useEffect(() => {
    if (!loading) {
      setUser(session.user);
      // @ts-ignore
      getFetch("/assignment/" + session.user.id).then((res) => {
        console.log(res);
        setTugas(res);
      });
    }
  }, [loading]);

  const benar = useMemo(() => {
    let temp = 0;
    tugas.forEach((item) => {
      temp = temp + item.correct;
    });
    return temp;
  }, [tugas]);

  const salah = useMemo(() => {
    let temp = 0;
    tugas.forEach((item) => {
      temp = temp + item.incorrect;
    });
    return temp;
  }, [tugas]);

  const total = useMemo(() => {
    let temp = 0;
    tugas.forEach((item) => {
      temp = temp + item.detail.length;
    });
    return temp;
  }, [tugas]);

  return (
    <>
      <Layout>
        {!loading && user &&
          // @ts-ignore
          !user.kelas.length > 0 && (
            <Alert
              message="Bergabung Kelas Baru"
              description={ <p> Klik <Link href="/mhs/kelas">disini</Link> untuk melanjutkan ke kelas  </p> }
              type="info"
              showIcon
            />
          )}
        <Divider orientation="left">Statistik</Divider>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              {!loading && tugas.length > 0 ? (
                <Space size="large" wrap>
                  <Progress type="circle" percent={100} status="success" />
                  <Title level={4}>Tugas Terkumpul : {tugas.length}</Title>
                </Space>
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {!loading && user ? (
                <Space size="large" wrap>
                  <Progress
                    type="circle"
                    percent={(salah / total) * 100}
                    status="exception"
                  />
                  <Title level={4}> Jawaban Salah : {salah} </Title>
                </Space>
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {!loading && user ? (
                <Space size="large" wrap>
                  <Progress type="circle" percent={(benar / total) * 100} />
                  <Title level={4}> Jawaban Benar : {benar} </Title>
                </Space>
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
        </Row>
      </Layout>
      <Layout>
        <Divider orientation="left">Informasi Pengguna</Divider>
        <Row gutter={24} justify="space-around" align="middle">
          <Col span={16}>
            <Card>
              {!loading && user ? (
                <>
                  <Space direction="vertical">
                    <Space> Nama : {user.name || ""} </Space>
                    <Space> Username : {user.username || ""} </Space>
                    <Space> Email : {user.email || ""} </Space>
                  </Space>
                </>
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {!loading && user ? (
                <Image width={200} src={user.image} />
              ) : (
                <Skeleton.Image />
              )}
            </Card>
          </Col>
        </Row>
      </Layout>
      <Divider orientation="left">Kelas yang di ikuti</Divider>
      <Space size={[8, 16]} wrap>
        {!loading &&
          user &&
          // @ts-ignore
          session.user.kelas.map((item, i) => {
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
    </>
  );
};
