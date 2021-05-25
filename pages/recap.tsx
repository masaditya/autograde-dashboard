import { getAssignment } from "lib/assignment";
import { Table, Tag, Space } from "antd";
import AuthGuard from "pages/_authguard";
import { API_AUTOGRADE } from "constant";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Week",
    dataIndex: "week",
    key: "week",
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "Grade",
    key: "correct",
    dataIndex: "correct",
  },
];

export async function getStaticProps() {
  const assignments = await (await fetch(API_AUTOGRADE)).json();
  return {
    props: {
      assignments,
    },
  };
}

export default function Recap({ assignments }) {
  return (
    <AuthGuard>
      <div style={{ maxWidth: "100%" }}>
        <Table columns={columns} dataSource={assignments} rowKey="_id" />
      </div>
    </AuthGuard>
  );
}
