import { Tag, Popconfirm, Button, Table, Space } from "antd";
import { EXT_API } from "constant";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import { useFetcher } from "lib/useFetcher";
import { useRouter } from "next/router";

export default function MhsKelas() {
  const { query } = useRouter();
  const [student, setStudent] = useState([]);
  const [kelas, setKelas] = useState<any>();
  const { deleteFetch, getFetch } = useFetcher();

  useEffect(() => {
    query.id &&
      getFetch("/class/" + query.id).then((res) => {
        setStudent(res.student);
        console.log(res);
        setKelas(res);
      });
  }, [query]);

  // const te = useMemo(() => {
  //   return kelas.student;
  // }, [kelas]);

  const onSubmitDeleteMhs = useCallback(
    (record) => {
      console.log({ kelas: kelas, student: record });
      deleteFetch("/user", { kelas: kelas, student: record })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [kelas]
  );

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
          title={`Apakah anda akan menghapus ${record.name} dari kelas ?`}
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
      <Table columns={columns} dataSource={student} rowKey="_id" />
    </>
  );
}
