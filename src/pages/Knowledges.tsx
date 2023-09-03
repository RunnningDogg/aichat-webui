import React, { useState } from "react";
import { Card, Col, Layout, Row, theme, Input } from "antd";
import PageNav from "../components/PageNav";

const { Content } = Layout;
const { Search } = Input;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [searchBarLoading, setSearchBarLoading] = useState(false);

  const onSearch = (value: string) => {
    console.log(value);
    setSearchBarLoading(true);
    setTimeout(() => {
      setSearchBarLoading(false);
    }, 2000);
  };

  return (
    <Layout className="layout">
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
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <Col span={8}>
                    <Card
                      title="文档1"
                      bordered={false}
                      extra={<a href="#">Chat {index}</a>}
                      hoverable={true}
                    >
                      Card {item}
                    </Card>
                  </Col>
                );
              })}
              <Col span={8}>
                <Card
                  title="文档1"
                  bordered={false}
                  extra={<a href="#">Chat</a>}
                  hoverable={true}
                >
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="文档2"
                  bordered={false}
                  extra={<a href="#">Chat</a>}
                  hoverable={true}
                >
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="文档3"
                  bordered={false}
                  extra={<a href="#">Chat</a>}
                  hoverable={true}
                >
                  Card content
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
