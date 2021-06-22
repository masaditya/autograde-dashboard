import { Avatar, Collapse, Space, Button, Result } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { AppContext } from "context/ContextWrapper";
import { useFetcher } from "lib/useFetcher";
import Link from "next/link";
const { Panel } = Collapse;

const HeaderPanel = ({ avatar, name, correct, detail, last_push,repo_name }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }}
  >
    <Avatar src={avatar} />
    <div>
      <small>Nama Mahasiswa</small>
      <p> {name} </p>
    </div>
    <div>
      <small>Nama Repository</small>
      <p> {repo_name} </p>
    </div>
    <div>
      <small>Push Terakhir</small>
      <p> {last_push} </p>
    </div>
    <div>
      <small>Nilai</small>
      <p> {(correct / detail.length) * 100}% </p>
    </div>
  </div>
);

const BodyPanel = ({ detail, repo_url }) => (
  <Space size="large">
    <div>
      {detail.map((item, i) => {
        if (item[0] === "✓") {
          return (
            <p key={i}>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              {item.substring(1)}
            </p>
          );
        } else {
          return (
            <p key={i}>
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
              {item.substring(1)}
            </p>
          );
        }
      })}
    </div>
    <Link href={repo_url}>
      <Button size="large">Go To Repository</Button>
    </Link>
  </Space>
);

export const Accordion = ({ data }) => {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  const { getFetch } = useFetcher();

  // useEffect(() => {
  //   if (!loading) {
  //     getData(session.user);
  //   }
  // }, [loading]);

  // const getData = useCallback(async (user) => {
  //   getFetch("/assignment/" + user.id).then((res) => {
  //     setData(res);
  //   });
  // }, []);

  return (
    <>
      {data.length > 0 ? (
        <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
          {data.map((item, i) => (
            <Panel header={<HeaderPanel {...item} />} key={i}>
              <BodyPanel {...item} />
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Data Kosong!"
          extra={<Button type="primary">Back Home</Button>}
        />
      )}
    </>
  );
};
