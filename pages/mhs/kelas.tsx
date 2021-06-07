import { Divider, Card, Space } from "antd";
import { EXT_API } from "constant";

export default function Kelasku({ kelas }) {
  console.log(kelas);
  return (
    <>
      <Divider orientation="left">Kelas yang diikuti</Divider>
      <Space size={[8, 16]} wrap>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
      </Space>
      {/* <DashboardDiagram tugas={tugas} /> */}
      {/* <Accordion /> */}
      <Divider orientation="left">Kelas tersedia</Divider>
      <Space size={[8, 16]} wrap>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
        <Card
          size="small"
          title={"TI4A"}
          // extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>{"Pemrograman Mobile"}</p>
        </Card>
      </Space>
    </>
  );
}

export async function getStaticProps() {
  const res = await (await fetch(EXT_API + "/class")).json();
  return {
    props: {
      kelas: res,
    },
  };
}
