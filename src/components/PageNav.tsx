import { Avatar, Button, Dropdown, Layout, Menu } from "antd";

const { Header } = Layout;
import { Link, NavLink, useNavigate } from "react-router-dom";
import { theme } from "antd";
import type { MenuProps } from "antd";
import { useAuth } from "../context/AuthContext";

const NavItems = () => {
  return (
    <Menu
      // style={{ width: "30%" }}
      theme="light"
      mode="horizontal"
      className="mr-10"
    >
      <Menu.Item key="1">
        <NavLink
          to="/knowledge"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-geek-400" : ""
          }
        >
          知识集市
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink
          to="/c"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-geek-400" : ""
          }
        >
          对话
        </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink
          to="/upload"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-geek-400" : ""
          }
        >
          上传
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

function PageNav() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user, accessToken, setAccessToken, setCurrentUser } = useAuth();

  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            setAccessToken("");
            setCurrentUser(null);
            navigate("/login");
          }}
        >
          登出
        </a>
      ),
    },
  ];

  return (
    <Header
      style={{
        // position: "sticky",
        // top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorBgContainer,
        height: "4rem",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* <div className="demo-logo" /> */}
      <Link to="/" className="  flex items-center gap-2">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          height="32"
          width="32"
          alt="logo"
        />
        <span className=" text-xl font-semibold  text-black ">ChatRepo</span>
      </Link>

      <div className="flex items-center gap-2">
        <div
          // style={{ width: "30%" }}

          className="mr-10 flex gap-5"
        >
          <NavLink
            to="/knowledge"
            className={({ isActive }) =>
              isActive
                ? "active border-bottom border-b-2 border-b-geek-400 text-pink-100"
                : ""
            }
          >
            <span className="text-base">知识集市</span>
          </NavLink>

          <NavLink
            to="/c"
            className={({ isActive }) =>
              isActive
                ? "active border-bottom border-b-2 border-b-geek-400 text-geek-400"
                : ""
            }
          >
            <span className="text-base  ">对话</span>
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "active border-bottom border-b-2 border-b-geek-400 text-geek-400"
                : ""
            }
          >
            <span className="text-base">上传</span>
          </NavLink>
        </div>
        {/* // 如果用户未登录，显示登录按钮 */}
        {accessToken ? (
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
