import React, { useState } from "react";
import { Card, Col, Layout, Row, theme, Input, message, Button } from "antd";
import PageNav from "../components/PageNav";
import myAxios from "../services/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Search } = Input;

const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    ["publicknowledges"],
    async () => {
      const res = await myAxios.get("/api/file/public");
      console.log(res);
      return res.data?.data;
    },
  );
  // console.log(data);

  // console.log(isLoading);
  // console.log(error);

  // 从登录的用户那里拿到useAccess的数据
  const { accessToken, user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  if (!user || !accessToken) {
    messageApi.error("未登录状态, 即将跳转到登录页面");
    setTimeout(() => {
      nav("/login", { replace: true });
    }, 2000);
  }

  const [searchBarLoading, setSearchBarLoading] = useState(false);

  const onSearch = (value: string) => {
    console.log(value);
    setSearchBarLoading(true);
    setTimeout(() => {
      setSearchBarLoading(false);
    }, 2000);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Layout className="layout">
      {contextHolder}
      <PageNav />
      <Content style={{ height: "100vh" }}>
        <div
          // background: colorBgContainer,
          style={{ padding: "2rem" }}
        >
          <Card
            title="知识库文档"
            extra={
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                loading={searchBarLoading}
              />
            }
          >
            <Row gutter={[16, 24]}>
              {data.map((item, index) => {
                return (
                  <Col span={8}>
                    <Card
                      title="文档"
                      bordered={false}
                      extra={
                        <Button
                          onClick={async () => {
                            const res = await myAxios.post(
                              "/api/file/public/chat",
                              {
                                file_id: item.file_id,
                              },
                              {
                                headers: {
                                  ContentType: "application/json",
                                },
                              },
                            );
                            if (res.status === 200) {
                              messageApi.success("获取知识库文档成功,准备跳转");
                              queryClient.invalidateQueries();
                              setTimeout(() => {
                                // nav(`/c/${item.file_id}`);
                                nav(`/c/`);
                              }, 2000);
                            }
                          }}
                        >
                          Chat
                        </Button>
                      }
                      hoverable={true}
                      key={index}
                    >
                      {item.file_name}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
