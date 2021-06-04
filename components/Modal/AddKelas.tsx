import { Form, Modal, Input, Button } from "antd";
import { useCallback } from "react";

export const AddKelas = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }, [form, onCreate]);

  return (
    <Modal
      visible={visible}
      title="Buat Kelas Baru"
      onCancel={onCancel}
      onOk={onSubmit}
      footer={[
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          Submit
        </Button>,
      ]}
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
        <Form.Item
          name="code"
          label="Kode Mata Kuliah"
          rules={[
            {
              required: true,
              message: "Masukan Kode Mata Kuliah",
            },
          ]}
        >
          <Input placeholder="contoh. PWL, ProgWeb" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
