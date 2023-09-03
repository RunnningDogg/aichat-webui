import { Avatar, Button, Dropdown, Layout, Menu } from "antd";

const { Header } = Layout;
import { Link, NavLink, useNavigate } from "react-router-dom";
import { theme } from "antd";
import type { MenuProps } from "antd";
import { useAuth } from "../context/AuthContext";

function PageNav() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user, isAuthenticated, logout } = useAuth();
  // console.log(user, isAuthenticated);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={logout}>登出</a>,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorBgContainer,
        height: "4rem",
      }}
    >
      {/* <div className="demo-logo" /> */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          height="32"
          width="32"
          alt="logo"
        />
        <span className=" text-black font-semibold  text-xl ">ChatRepo</span>
      </Link>

      <div className="flex items-center gap-2">
        <Menu
          // style={{ width: "30%" }}
          theme="light"
          mode="horizontal"
          className="mr-10"
          // defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="1">
            <NavLink to="/knowledge">知识集市</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/c">对话</NavLink>
          </Menu.Item>
        </Menu>
        {/* // 如果用户未登录，显示登录按钮 */}
        {isAuthenticated ? (
          <Dropdown menu={{ items }} placement="bottom">
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size="large"
            >
              {user?.name}
            </Avatar>
          </Dropdown>
        ) : (
          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/login")}
          >
            登录
          </Button>
        )}
      </div>
    </Header>
  );
}

export default PageNav;
