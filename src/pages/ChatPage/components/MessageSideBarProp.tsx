import Sider from "antd/es/layout/Sider";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Menu, Popconfirm } from "antd";

type Files = {
  file_id: string;
  file_name: string;
  // create_time: string; // 格式2023-09-19T03:46:51
  // user_id: number;
  // 还有file_url 但是不需要传过来了
};

type MessageSideBarProps = {
  // 父组件传递过来的数据
  chatfile: Files[]; // for 渲染具体的数据
  menuActiveIdx: string; // for 确定哪个是active的
  // setMenuActiveIdx: React.Dispatch<React.SetStateAction<string>> // 父组件的函数, 触发修改, 路由就可以设置了
};

import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItemProps = {
  item: {
    key: string;
    label: string;
  };
};

function MessageSideBar({ chatfile, menuActiveIdx }: MessageSideBarProps) {
  // 新增逻辑, 如果有useParams有file_id, 那么就设置为active

  console.log("activeIdx", menuActiveIdx);

  const navigate = useNavigate();

  // menu click handler
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key) {
      navigate(key);
    }
  };

  // menu items 从props转换成db
  const menuItems = chatfile.map((item) => {
    return { key: item.file_id, label: item.file_name };
  });

  console.log(menuItems);

  // 组件内状态
  const [isMenuEdit, setIsMenuEdit] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const menuInput = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  // menu item
  const MenuLabel = ({ item }: MenuItemProps) => {
    return (
      <div className="flex items-center ">
        {/* <MessageOutlined /> */}

        {isMenuEdit && item.key === menuActiveIdx ? (
          <>
            <Input
              className="flex-1"
              ref={menuInput}
              value={menuTitle}
              onChange={(e) => {
                setMenuTitle(e.target.value);
              }}
            />
            {item.key === menuActiveIdx && (
              <div className="  flex">
                <Button
                  icon={<CheckOutlined style={{ color: "#141414" }} />}
                  ghost
                  style={{ border: "none" }}
                  onClick={() => {
                    setIsMenuEdit(false);
                  }}
                />
                <Button
                  icon={<CloseOutlined style={{ color: "#141414" }} />}
                  ghost
                  style={{ border: "none" }}
                  onClick={() => {
                    setIsMenuEdit(false);
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <span className="flex-1">{item.label}</span>
            {item.key === menuActiveIdx && (
              <div className="flex">
                <Button
                  icon={<EditOutlined style={{ color: "#141414" }} />}
                  ghost
                  style={{ border: "none" }}
                  onClick={() => {
                    setIsMenuEdit(true);
                    setMenuTitle(item.label);
                  }}
                />
                <Popconfirm
                  placement="right"
                  title=""
                  description="确定删除记录吗"
                  onConfirm={() => {
                    console.log("delete");
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    icon={<DeleteOutlined style={{ color: "#141414" }} />}
                    ghost
                    style={{ border: "none" }}
                    onClick={() => {}}
                  />
                </Popconfirm>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const items = menuItems.map((item) =>
    getItem(<MenuLabel item={item} />, item.key, <MessageOutlined />),
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      style={{
        // overflow: "auto",
        height: "calc(100vh - 4rem)",
        position: "relative",
        left: 0,
        top: 0,
        bottom: 0,
        boxSizing: "border-box",
        padding: "3px 6px",
        borderRadius: "3px",
        // background: colorBgContainer,
      }}
    >
      {/* 自定义触发 */}
      <div onClick={() => setCollapsed(!collapsed)}>
        <RightCircleOutlined
          // className="text-white "
          style={{
            color: "#d9d9d9",
            fontSize: "1.5rem",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            transform:
              "translateY(-50%)" +
              (collapsed ? "rotate(0deg)" : "rotate(180deg)"),
            right: "-12px",
            zIndex: 100,
          }}
          // className={`collapsed ? "rotate-180" : "rotate-0"`}
        />
      </div>
      {/* 创建按钮 */}
      {/* {!collapsed && (
        <div className="flex justify-center p-2">
          <Button icon={<PlusOutlined />} block={true} size="large">
            Create Chat
          </Button>
        </div>
      )} */}

      {/* <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["4"]}
        // items={items}
        onClick={handleMenuClick}
      >
        {menuItems.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <MenuLabel item={item} />
            </Menu.Item>
          );
        })}
      </Menu> */}

      <Menu
        mode="inline"
        theme="dark"
        // defaultSelectedKeys={["4"]}
        onClick={handleMenuClick}
        items={items}
      ></Menu>
    </Sider>
  );
}

export default MessageSideBar;
