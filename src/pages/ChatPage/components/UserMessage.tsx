import { Avatar } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

type UserMessageProps = {
  rawMessage: string;
};

function UserMessage({ rawMessage }: UserMessageProps) {
  return (
    <div
      className={`flex flex-row-reverse items-center gap-4 rounded px-2 py-1`}
    >
      <Avatar
        style={{ backgroundColor: "#f56a00" }}
        // size={{ xs: 12, sm: 24, md: 28, lg: 30, xl: 32, xxl: 40 }}
      >
        User
      </Avatar>

      <Markdown
        className="prose  max-w-md rounded-lg border bg-slate-50 px-[10px] py-[8px]"
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {rawMessage}
      </Markdown>
    </div>
  );
}

export default UserMessage;
