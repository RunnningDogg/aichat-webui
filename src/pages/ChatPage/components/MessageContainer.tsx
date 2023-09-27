import { Input, Layout, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
const { Content } = Layout;

// const arr = Array.from({ length: 10 }, (_, i) => i + 1);

type MessageContainerProps = {
  loading: boolean;
  arr:
    | {
        message: string;
        chat_role: number;
        create_time: string;
        chat_id: string;
      }[]
    | undefined;
};

function MessageContainer({ loading, arr }: MessageContainerProps) {
  // 模拟 fetch 后端数据
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // });

  return (
    <Content
      style={{
        height: "calc(100vh - 4rem)",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="h-[95%]">
        {loading ? (
          <Spin size="large" className="mx-auto" />
        ) : (
          <div className=" chat-container ml-auto flex  h-full flex-col   overflow-auto border-l-2 bg-slate-100 px-2 py-4">
            {arr.map((item) => {
              return item.chat_role === 0 ? (
                <UserMessage key={item.chat_id} rawMessage={item.message} />
              ) : (
                <AIMessage key={item.chat_id} rawMessage={item.message} />
              );
            })}
          </div>
        )}
      </div>

      <Input
        style={{
          position: "absolute",
          bottom: "1rem",
          width: "85%",
          marginLeft: "1.5rem",
        }}
        suffix={<SendOutlined />}
        disabled={loading}
      />
    </Content>
  );
}

export default MessageContainer;
