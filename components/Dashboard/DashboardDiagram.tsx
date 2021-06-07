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
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import Title from "antd/lib/typography/Title";
import { useSession } from "next-auth/client";

export const DashboardDiagram = ({ tugas = [] }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (!loading) setUser(session.user);
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
        <Divider orientation="left">Statistik</Divider>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <Space>
                <Progress type="circle" percent={100} />
                {/* <Title level={3}> Kelas di ikuti : { !loading && user.kelas && "0"} </Title> */}
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Space>
                <Progress
                  type="circle"
                  percent={(salah / total) * 100}
                  status="exception"
                />
                <Title level={3}> Jawaban salah : {salah} </Title>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Space>
                <Progress type="circle" percent={(benar / total) * 100} />
                <Title level={3}> Jawaban benar : {benar} </Title>
              </Space>
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
