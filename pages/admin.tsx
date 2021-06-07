import { Table, Modal, Tag, Form, Input, Button, Popconfirm } from "antd";
import Title from "antd/lib/typography/Title";
import { EXT_API } from "constant";
import { useFetcher } from "lib/useFetcher";
import { useCallback, useEffect, useMemo, useState } from "react";

const Admin = ({ users }) => {
  const {putFetch} = useFetcher()
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const st = useMemo(
    () => users.filter((item) => item.role === "student"),
    users
  );
  const te = useMemo(
    () => users.filter((item) => item.role !== "student"),
    users
  );

  const submitChangeRole = useCallback(async(record : any) => {
    putFetch("/user", {...record, role : "dosen"}).then(res => {
    })
  }, []);

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text || "-"}</a>,
    },
    {
      title: "Kelas",
      key: "kelas",
      dataIndex: "kelas",
      render: (cl: any[]) => {
        return (
          <>
            {cl.map((item, i) => {
            return (
              <Tag color={"green"} key={i}>
                {item.class}
              </Tag>
            );
          })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title={`Apakah anda akan menjadikan ${record.name} sebagai ${
            record.role === "student" ? "dosen" : "mahasiswa"
          }`}
          onConfirm={() => submitChangeRole(record)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button>Change Role</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Dosen</Title>
      <Table columns={columns} dataSource={te} rowKey="_id" />
      <Title level={3}>Mahasiswa</Title>
      <Table columns={columns} dataSource={st} rowKey="_id" />

      <Modal
        visible={visible}
        title="Buat Kelas Baru"
        okText="Tambah"
        cancelText="Batal"
        onCancel={() => setVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              // onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_add_kelas">
          <Form.Item
            name="class"
            label="Kelas"
            rules={[
              {
                required: true,
                message: "Masukan Nama Kelas",
              },
            ]}
          >
            <Input placeholder="contoh. TI4A" />
          </Form.Item>
          <Form.Item
            name="matkul"
            label="Mata Kuliah"
            rules={[
              {
                required: true,
                message: "Masukan Mata Kuliah",
              },
            ]}
          >
            <Input placeholder="contoh. Pemrograman Berbasis Framework" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;

export async function getStaticProps() {
  const res = await (await fetch(EXT_API + "/user")).json();
  return {
    props: {
      users: res,
    },
  };
}
