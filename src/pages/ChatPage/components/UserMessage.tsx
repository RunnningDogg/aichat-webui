import { Avatar } from "antd";
import { marked } from "marked";

type UserMessageProps = {
  key: string;
  rawMessage: string;
};

function UserMessage({ key, rawMessage }: UserMessageProps) {
  const renderHtml = marked(rawMessage);

  return (
    <div
      key={key}
      className={`flex flex-row-reverse items-center gap-4 rounded px-2 py-1`}
    >
      <Avatar style={{ backgroundColor: "#f56a00" }}>User</Avatar>

      <div
        className=" prose   rounded-lg border bg-slate-50 px-[10px] py-[8px]"
        dangerouslySetInnerHTML={{ __html: renderHtml }}
      ></div>
    </div>
  );
}

export default UserMessage;
