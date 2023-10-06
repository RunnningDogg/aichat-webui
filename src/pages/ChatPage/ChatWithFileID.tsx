import React from "react";
// import { theme } from "antd";
// 引入axios以及react query
import myAxios from "../../services/axios";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router-dom";
import MessageContainer from "./components/MessageContainer";
import { Col, Row } from "antd";
import { useFileData } from "./Chat";
import PdfFile from "../../components/PdfViewer";

type ChatDataProps = {
  session_id: string;
  message: string;
  user_id: number;
  create_time: string;
  chat_role: number;
  chat_id: string;
  update_time: string;
};

const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  // console.log(colorBgContainer);

  // 获取Outlet的参数
  const { fileData } = useFileData();
  console.log(fileData);

  const { file_id } = useParams();

  // 根据file_id 过滤得到file_url
  const file_url = fileData?.filter((item) => item.file_id === file_id)[0]
    ?.file_url;

  const { data, isLoading, error } = useQuery<ChatDataProps[]>(
    ["chat", file_id],
    async () => {
      console.log("file_id", file_id);
      const res = await myAxios.get(`/api/file/history?file_id=${file_id}`);
      return res.data?.data;
    },
  );

  // if (isLoading) {
  //   return <div>loading</div>;
  // }
  if (error) {
    return <div>error</div>;
  }

  return (
    <Row>
      <Col span={12}>
        <PdfFile file_url={file_url} />
      </Col>
      <Col span={12}>
        <MessageContainer loading={isLoading} arr={data} />
      </Col>
    </Row>
  );
};

export default App;
