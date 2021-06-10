import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "context/ContextWrapper";
import { useSession } from "next-auth/client";

const Sidebar = () => {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);
  return (
    <Layout.Sider
      style={{
        minHeight: "100vh",
        left: 0,
        background: "#234283",
      }}
    >
      <Image
        src="/images/jti.png"
        width="auto"
        height="auto"
        objectFit="scale-down"
      ></Image>
      {!loading && (
        <Menu
          style={{
            background: "#234283",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          {!isDosen && (
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link href="/mhs/tugas">Tugas</Link>
            </Menu.Item>
          )}
          {isDosen && (
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link href="/recap">Rekapitulasi</Link>
            </Menu.Item>
          )}
          {isDosen && (
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link href="/kelas">Kelas</Link>
            </Menu.Item>
          )}
          {!isDosen && (
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link href="/mhs/kelas">Kelas</Link>
            </Menu.Item>
          )}
        </Menu>
      )}
    </Layout.Sider>
  );
};

export default Sidebar;
