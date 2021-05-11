import { Collapse, Row, Col, Avatar } from "antd";
import { getAssignment } from "lib/assignment";
import { SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export async function getStaticProps() {
  const assignments = await getAssignment();
  return {
    props: {
      assignments,
    },
  };
}

export default function Home({ assignments }) {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(session, loading);
  function callback(key) {
    console.log(key);
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <div>You can now access our super secret pages</div>
          <button>
            <Link href="/secret">To the secret</Link>
          </button>
          <button onClick={() => signOut()}>sign out</button>
        </>
      )}
    </>
  );

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

export const Page = () => {};
