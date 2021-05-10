import { Collapse, Row, Col, Avatar } from "antd";
import { getAssignment } from "lib/assignment";
import { SettingOutlined } from "@ant-design/icons";
import Head from "next/head";

export async function getStaticProps() {
  const assignments = await getAssignment();
  return {
    props: {
      assignments,
    },
  };
}

export default function Home({ assignments }) {
  function callback(key) {
    console.log(key);
  }

  return (
    <>
      <Head>
        <title> Autograde System Dashboard </title>
      </Head>
      <Collapse defaultActiveKey={["1"]} onChange={callback}>
        {assignments.map((item, index) => {
          return (
            <Collapse.Panel
              style={{ backgroundColor: "#FFFFFF", borderColor: "#244282" }}
              header={<HeaderPanel data={item} />}
              key={index}
              extra={() => <SettingOutlined size={25} />}
            >
              {item.detail.map((text, i) => {
                return <p key={i}> {text} </p>;
              })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </>
  );
}

const HeaderPanel = ({ data }) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={6}>
        <Avatar src={data.avatar} />
      </Col>
      <Col className="gutter-row" span={6}>
        <p>Nama</p>
        <p> {data.name} </p>
      </Col>
      <Col className="gutter-row" span={6}>
        <p>Last Push</p>
        <p> {data.last_push} </p>
      </Col>
      <Col className="gutter-row" span={6}>
        <p>Grade</p>
        <p>{`${data.correct} / ${data.detail.length}`}</p>
      </Col>
    </Row>
  );
};
