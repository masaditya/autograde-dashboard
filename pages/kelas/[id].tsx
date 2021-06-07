import { Tag, Popconfirm, Button, Table, Space } from "antd";
import { EXT_API } from "constant";
import { useCallback, useMemo } from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import { useFetcher } from "lib/useFetcher";
export default function MhsKelas({ kelas }) {
  const { deleteFetch } = useFetcher();
  const te = useMemo(() => {
    return kelas[0].student;
  }, [kelas]);

  const onSubmitDeleteMhs = useCallback((record) => {
    console.log({ kelas: kelas[0], student: record });
    deleteFetch("/user", { kelas: kelas[0], student: record })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link href={`/mahasiswa/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text || "-"}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title={`Apakah anda akan menghapus ${record.name} dari kelas ${kelas[0].class}-${kelas[0].matkul}`}
          onConfirm={() => onSubmitDeleteMhs(record)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Text type="danger">
            <DeleteOutlined /> Delete
          </Text>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={te} rowKey="_id" />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${EXT_API}/class`);
  const kelases = await res.json();
  const paths = kelases.map((kelas) => ({
    params: { id: kelas.class },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${EXT_API}/class/${params.id}`);
  const kelas = await res.json();
  return { props: { kelas } };
}
