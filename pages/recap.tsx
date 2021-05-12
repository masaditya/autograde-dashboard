import { getAssignment } from "lib/assignment";
import { Table, Tag, Space } from "antd";
import AuthGuard from "pages/_authguard";

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
  const assignments = await getAssignment();
  return {
    props: {
      assignments,
    },
  };
}

export default function Recap({ assignments }) {
  return (
    <AuthGuard>
      <Table columns={columns} dataSource={assignments} />{" "}
    </AuthGuard>
  );
}
