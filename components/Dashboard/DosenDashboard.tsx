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

export default function DosenDashboard() {
  const [session, loading] = useSession();
  const [tugas, setTugas] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const { getFetch, putFetch } = useFetcher();
  const [kodeDosen, setKodeDosen] = useState("");
  const [repo, setRepo] = useState();

  useEffect(() => {
    if (!loading) {
      setUser(session.user);
      // @ts-ignore
      setKodeDosen(session.user.code_dosen);
      // @ts-ignore
      // getFetch("/assignment/" + session.user.id).then((res) => {
      //   console.log(res);
      //   setTugas(res);
      // });
      getFetch("/repo/" + session.user.code_dosen).then((res) => {
        console.log(res);
        setRepo(res);
      });
    }
  }, [loading]);

  const submitCodeDosen = (ev: any) => {
    putFetch("/user/dosen/" + user.id, { code_dosen: ev }).then((res) => {
      console.log(res);
    });
  };

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
                    <Space> Username : {user.username || ""} </Space>
                    <Space> Email : {user.email || ""} </Space>
                    <Space>
                      Kode Dosen :
                      {!kodeDosen ? (
                        <Paragraph
                          editable={{ onChange: (ev) => submitCodeDosen(ev) }}
                        >
                          {kodeDosen}
                        </Paragraph>
                      ) : (
                        user.code_dosen || ""
                      )}
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
        <Divider orientation="left">Informasi Tugas</Divider>
        <Space size={[8, 16]} wrap>
          {!loading &&
            repo &&
            // @ts-ignore
            repo.map((item, i) => {
              return (
                <Card
                  key={i}
                  size="small"
                  title={""}
                  // extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>{item.repo}</p>
                </Card>
              );
            })}
        </Space>
      </Layout>
    </>
  );
}
