import Sider from "antd/es/layout/Sider";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function MessageSideBar() {
  const navigate = useNavigate();

  // menu click handler
  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
    setMenuActiveIdx(key);
  };

  // menu items
  const [menuItems, setMenuItems] = useState([
    { key: "1", label: "nav1" },
    { key: "2", label: "nav2" },
    { key: "3", label: "nav3" },
    { key: "4", label: "nav4" },
    { key: "5", label: "nav5" },
  ]);

  const [menuActiveIdx, setMenuActiveIdx] = useState("");

  const [isMenuEdit, setIsMenuEdit] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const menuInput = useRef(null);
  const { file_id } = useParams();

  // console.log(colorBgContainer);
  // console.log(menuItems);

  const [collapsed, setCollapsed] = useState(false);
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
            color: "#4096ff",
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
      {!collapsed && (
        <div className="flex justify-center p-2">
          <Button icon={<PlusOutlined />} block={true} size="large">
            Create Chat
          </Button>
        </div>
      )}

      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["4"]}
        // items={items}
        onClick={handleMenuClick}
      >
        {menuItems.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <div className="flex items-center ">
                <MessageOutlined />

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
                            const newMenuItems = menuItems.map((item) => {
                              if (item.key === menuActiveIdx) {
                                console.log("click ", menuTitle);
                                return { ...item, label: menuTitle };
                              } else {
                                return item;
                              }
                            });
                            setMenuItems(newMenuItems);
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
                            const newMenuItems = menuItems.filter(
                              (item) => item.key !== menuActiveIdx,
                            );
                            setMenuItems(newMenuItems);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            icon={
                              <DeleteOutlined style={{ color: "#141414" }} />
                            }
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
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default MessageSideBar;
