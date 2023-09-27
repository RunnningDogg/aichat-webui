import React from "react";

import { theme } from "antd";

// 引入axios以及react query
import myAxios from "../../services/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import MessageContainer from "./components/MessageContainer";

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(colorBgContainer);

  const { file_id } = useParams();

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
    <div>
      {/* {data?.map((item) => <div>{item.message}</div>)} */}
      <MessageContainer loading={isLoading} arr={data} />
    </div>
  );
};

export default App;
