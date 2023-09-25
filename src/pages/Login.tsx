import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import myAxios from "../services/axios";
import { setGlobalAccessToken } from "../utils/auth";

type LoginParams = {
  name: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const { setAccessToken, setCurrentUser } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginParams) => {
    try {
      setButtonLoading(true);
      const res = await myAxios.post(
        "api/users/token",
        {
          username: values.name,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 200) {
        setAccessToken(res.data.access_token);
        setGlobalAccessToken(res.data.access_token);
        const userRes = await myAxios.get("api/users/current", {
          // headers: {
          //   Authorization: `Bearer ${res.data.access_token}`,
          // },
        });
        setCurrentUser(userRes.data);
        messageApi.success("登录成功, 即将跳转到主页");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } else {
        console.log("error");
        messageApi.error("登录失败");
      }
    } catch (error) {
      console.log(error);
      messageApi.error("登录失败");
    } finally {
      setButtonLoading(false);
    }
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
          className="mb-10 flex items-center gap-3"
          style={{ transform: "translate(0,-50%)" }}
        >
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            height="32"
            width="32"
            alt="logo"
          />
          <span className=" text-xl font-semibold  text-black ">ChatRepo</span>
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
              size="large"
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
              size="large"
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
