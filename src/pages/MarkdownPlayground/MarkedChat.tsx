import { useRef, useState } from "react";
import AIMessage from "../ChatPage/components/AIMessage";
import UserMessage from "../ChatPage/components/UserMessage";
import { Button, Input, Tooltip, message } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function MarkedChat() {
  const rawMessage = `## hi 
  this is jiongxinliang 需要提升父组件这里来管理这个状态，然后用prop传递给子组件渲染
  - h1
  - h2
  ## h3
  `;
  const [messageApi, contextHolder] = message.useMessage();

  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setInputText((prevText) => prevText + "\n");
      messageApi.success("shift enter");

      // 获取光标位置和行号
      // inputRef.current?.focus();
      // const area = inputRef.current!;
      // area.scrollTop = area.scrollHeight;
    } else if (e.key === "Enter") {
      e.preventDefault();
      messageApi.success("enter 准备发送");
      setInputText("");
      // console.log("enter");
      // messageApi.success("enter 准备发送");
    }
  };

  return (
    <div className="relative mx-auto flex h-screen flex-col gap-3 overflow-y-auto bg-slate-100 px-2 py-1 lg:max-w-5xl">
      {contextHolder}
      <div className="h-[90%] overflow-auto border-b">
        <UserMessage key="chat1" rawMessage={rawMessage} />
        <AIMessage key="chat2" rawMessage={rawMessage} />
        <UserMessage key="chat3" rawMessage={rawMessage} />
        <AIMessage key="chat4" rawMessage={rawMessage} />
      </div>

      <div className="">
        {/* absolute inset-x-0 bottom-2 right-0 -translate-y-1/2   */}
        <div className="mx-auto flex items-center gap-3 lg:max-w-xl">
          {/* rounded-xl border border-black/10 */}
          {/* <textarea
            className=" w-full resize-none overflow-hidden border-0 bg-transparent py-3 pl-3 outline-0 focus:ring-0 focus-visible:ring-0"
            style={{
              maxHeight: "56px",
              height: "100px",
              overflowY: "hidden",
            }}
            placeholder="input question"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          /> */}
          <TextArea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            allowClear
            autoSize
            // onPressEnter={() => {
            //   messageApi.success("enter 准备发送");
            //   setInputText("");
            // }}
            onKeyDown={handleKeyDown}
          />
          <Button type="primary" icon={<SendOutlined />}>
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MarkedChat;
