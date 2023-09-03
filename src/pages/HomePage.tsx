import { Button, Space } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";

const { Content, Sider } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  // console.log(colorBgContainer);

  return (
    <Layout>
      <PageNav />

      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          style={{
            background: colorBgContainer,
            height: "calc(100vh - 4rem)",
            position: "fixed",
            left: 0,
            top: "4.5rem",
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              borderRight: 0,
              position: "relative",
            }}
            items={items2}
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: "100%",
              height: 64,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            marginLeft: 200,
            // marginTop: "5rem",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            <Space>
              <Button type="primary">Click Me</Button>
              <Button>Click Me</Button>
              <a href="http://www.baidu.com">BaiduYiXia</a>
            </Space>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
