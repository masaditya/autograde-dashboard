import { Form, Modal, Input } from "antd";

export const AddKelas = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Buat Kelas Baru"
      okText="Tambah"
      cancelText="Batal"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
  );
};
