import React from "react";

import { Col, Layout, Row, theme } from "antd";
import PdfFile from "../../components/PdfViewer";
import PageNav from "../../components/PageNav";
import MessageSideBar from "./components/MessageSideBar";
import MessageContainer from "./components/MessageContainer";

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <PageNav />
      <Layout hasSider>
        <MessageSideBar />

        <Layout>
          <Row>
            <Col span={12}>
              <PdfFile />
            </Col>

            <Col span={12}>
              <MessageContainer />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
