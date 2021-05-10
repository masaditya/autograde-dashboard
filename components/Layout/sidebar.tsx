import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <Layout.Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Image
        src="/images/jti.png"
        width="auto"
        height="auto"
        objectFit="scale-down"
      ></Image>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link href="/">Assignments</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link href="/recap">Recap</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
