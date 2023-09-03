import React, { useRef, useState } from "react";
import {
  UploadOutlined,
  PlusOutlined,
  MessageOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Col,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Popconfirm,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PdfFile from "../components/PdfViewer";

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
  const { id } = useParams();

  // console.log(colorBgContainer);
  console.log(menuItems);
  return (
    <Layout>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            boxSizing: "border-box",
            padding: "3px 6px",
            borderRadius: "3px",
            // background: colorBgContainer,
          }}
        >
          <div className="p-2 flex justify-center">
            <Button icon={<PlusOutlined />} block={true} size="large">
              Create Chat
            </Button>
          </div>
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
                          ref={menuInput}
                          value={menuTitle}
                          onChange={(e) => {
                            setMenuTitle(e.target.value);
                          }}
                        />
                        {item.key === menuActiveIdx && (
                          <div className="  flex">
                            <Button
                              icon={<CheckOutlined />}
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
                              icon={<CloseOutlined />}
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
                        <span>{item.label}</span>
                        {item.key === menuActiveIdx && (
                          <div className=" flex">
                            <Button
                              icon={<EditOutlined />}
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
                                  (item) => item.key !== menuActiveIdx
                                );
                                setMenuItems(newMenuItems);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                icon={<DeleteOutlined />}
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

        <Layout style={{ marginLeft: 200 }}>
          <Row>
            {/* gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} */}
            <Col span={12}>
              <PdfFile />
            </Col>

            <Col span={12}>
              <Content
                style={{
                  overflow: "auto",
                  height: "100vh",
                  width: "100%",
                  position: "relative",
                  padding: "1rem",
                }}
                // margin: "24px 16px 0",
              >
                <div
                  style={{
                    // padding: 24,
                    textAlign: "center",
                    background: colorBgContainer,
                    height: "95%",
                    overflow: "auto",
                  }}
                >
                  <p>long content</p>
                  {
                    // indicates very long content
                    Array.from({ length: 100 }, (_, index) => (
                      <React.Fragment key={index}>
                        {index % 20 === 0 && index ? "more" : `${id}`}
                        <br />
                      </React.Fragment>
                    ))
                  }
                </div>
                <Input
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    width: "85%",
                    marginLeft: "1.5rem",
                  }}
                  suffix={<SendOutlined />}
                />
              </Content>
            </Col>
          </Row>

          {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
