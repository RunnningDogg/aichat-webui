import { Avatar, Input, Layout, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Content } = Layout;

const arr = Array.from({ length: 10 }, (_, i) => i + 1);

function MessageContainer() {
  // 模拟 fetch 后端数据
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

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
          <Spin tip="loading data" size="large" className="mx-auto" />
        ) : (
          <div className=" chat-container ml-auto flex  h-full flex-col   overflow-auto border-l-2 bg-slate-100 px-2 py-4">
            {arr.map((i) => {
              return (
                <div
                  key={i}
                  className={
                    `flex items-start gap-4 rounded px-2 py-3` +
                    ` ${i % 2 === 0 ? " flex-row-reverse  " : ""}`
                  }
                >
                  {i % 2 === 0 ? (
                    <Avatar style={{ backgroundColor: "#f56a00" }}>User</Avatar>
                  ) : (
                    <Avatar style={{ backgroundColor: "#b37feb" }}>AI</Avatar>
                  )}

                  <p className="max-w-sm  flex-1 rounded-lg border bg-slate-50 px-2 py-4">
                    Explain how to use the chat feature here. Explain how to use
                    the chat feature here. Explain how to use the chat feature
                    here. Explain how to use the chat feature here. Explain how
                    to use the chat
                  </p>
                </div>
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
