import { Avatar, Collapse, Space, Button } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { AppContext } from "context/ContextWrapper";
import { useFetcher } from "lib/useFetcher";
import Link from "next/link";
const { Panel } = Collapse;

const HeaderPanel = ({ avatar, name, correct, detail, last_push }) => (
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

export const Accordion = () => {
  const [session, loading] = useSession();
  const [data, setData] = useState([]);
  const { studentClass, isDosen } = useContext(AppContext);
  const { getFetch } = useFetcher();

  useEffect(() => {
    if (!loading) {
      getData(session.user);
    }
  }, [loading]);

  const getData = useCallback(async (user) => {
    getFetch("/assignment/" + user.id).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
        {data &&
          data.map((item, i) => (
            <Panel header={<HeaderPanel {...item} />} key={i}>
              <BodyPanel {...item} />
            </Panel>
          ))}
      </Collapse>
    </>
  );
};
