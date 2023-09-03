import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type LoginParams = {
  name: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const messageInfo = () => {
    if (isAuthenticated) {
      messageApi.success("登录成功, 即将跳转到主页");
    } else {
      messageApi.error("登录失败, 请检查用户名和密码");
    }
  };

  // navigate 在 useEffect做
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values: LoginParams) => {
    setButtonLoading(true);
    console.log("Received values of form: ", values);
    login(values?.name, values?.password);
    setButtonLoading(false);
  };

  return (
    <Layout>
      <Content
        style={{
          height: "calc(100vh - 4rem)",
          marginTop: "10rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          className="flex items-center gap-3 mb-10"
          style={{ transform: "translate(0,-50%)" }}
        >
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            height="32"
            width="32"
            alt="logo"
          />
          <span className=" text-black font-semibold  text-xl ">ChatRepo</span>
          <Button
            onClick={() => {
              setButtonLoading(true);
              setTimeout(() => {
                setButtonLoading(false);
              }, 2000);
            }}
          >
            Click Me
          </Button>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{
            width: "300px",
          }}
          layout="horizontal"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              loading={buttonLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            {/* 注意要有这个才能正确显示message */}
            {contextHolder}
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default Login;
