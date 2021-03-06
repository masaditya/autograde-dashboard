import {
  Layout,
  Divider,
  Row,
  Card,
  Col,
  Space,
  Image,
  Skeleton,
  Typography,
} from "antd";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";

const { Paragraph } = Typography;
export default function Profile() {
  const [session, loading] = useSession();
  const [tugas, setTugas] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const { getFetch } = useFetcher();
  const [kodeDosen, setKodeDosen] = useState("");

  useEffect(() => {
    if (!loading) {
      setUser(session.user);
      // @ts-ignore
      // getFetch("/assignment/" + session.user.id).then((res) => {
      //   console.log(res);
      //   setTugas(res);
      // });
    }
  }, [loading]);

  

  return (
    <>
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
                    <Space>
                      Kode Dosen :
                      <Paragraph editable={{ onChange: setKodeDosen }}>
                        {kodeDosen}
                      </Paragraph>
                    </Space>
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
    </>
  );
}
