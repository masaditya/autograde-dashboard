import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/client";

export const LoginForm = () => {
  return (
    <Button
      icon={<UserOutlined />}
      type="primary"
      className="login-form-button"
      onClick={() => signIn()}
    >
      Log in
    </Button>
  );
};
