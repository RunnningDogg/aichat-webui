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
      className={`flex flex-row-reverse items-start gap-4 rounded px-2 py-3`}
    >
      <Avatar style={{ backgroundColor: "#f56a00" }}>User</Avatar>

      <div
        className="prose   max-w-xl flex-1 rounded-lg border bg-slate-50 px-2 py-4"
        dangerouslySetInnerHTML={{ __html: renderHtml }}
      ></div>
    </div>
  );
}

export default UserMessage;
