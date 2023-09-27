import React from "react";

import { Col, Layout, Row, theme } from "antd";
import PdfFile from "../../components/PdfViewer";
import PageNav from "../../components/PageNav";
import MessageSideBar from "./components/MessageSideBarProp";

// 引入axios以及react query
import myAxios from "../../services/axios";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  // console.log(colorBgContainer);

  /**
   * 状态提升, sidebar数据的获取，以及聊天记录数据的获取
   * 在渲染的时候, 需要先获取
   * 1. 用户的文件id(展示在sidebar)
   * 2. 用户对应文件id的聊天记录(只渲染特定文件id的)
   * 具体哪个文件应该是active的，应该是父组件传递给子组件，并且父组件传递activeIndex,和set的函数下去
   */

  const { error, data, isLoading } = useQuery(["sidebar"], () =>
    myAxios.get("/api/file/query").then((res) => res.data?.data),
  );

  if (error) {
    console.log("react query error");
    return <div>error</div>;
  }
  if (data) {
    console.log("react query data ", data);
  }

  if (isLoading) {
    console.log("react query loading");
    return <div>loading</div>;
  }

  return (
    <Layout>
      <PageNav />
      <Layout hasSider>
        <MessageSideBar chatfile={data} menuActiveIdx="" />
        <Layout>
          <Row>
            <Col span={12}>
              <PdfFile />
            </Col>

            <Col span={12}>
              {/* <MessageContainer /> */}
              <Outlet />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
