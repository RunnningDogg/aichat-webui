import { Avatar } from "antd";
import { marked } from "marked";

type AIMessageProps = {
  key: string;
  rawMessage: string;
};

function AIMessage({ key, rawMessage }: AIMessageProps) {
  const renderHtml = marked(rawMessage);

  return (
    <div key={key} className={`flex   items-start gap-4 rounded px-2 py-1`}>
      <Avatar style={{ backgroundColor: "#b37feb" }}>AI</Avatar>

      <div
        className="prose  max-w-md   rounded-lg border bg-slate-50 px-[10px] py-[8px]"
        dangerouslySetInnerHTML={{ __html: renderHtml }}
      ></div>
    </div>
  );
}

export default AIMessage;
