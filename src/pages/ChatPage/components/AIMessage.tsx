import { Avatar } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

type AIMessageProps = {
  rawMessage: string;
};

function AIMessage({ rawMessage }: AIMessageProps) {
  return (
    <div className={`flex items-start gap-4 rounded px-2 py-1`}>
      <Avatar
        // size="default"
        // size={{ xs: 12, sm: 24, md: 28, lg: 30, xl: 32, xxl: 40 }}
        style={{ backgroundColor: "#b37feb" }}
      >
        AI
      </Avatar>

      <Markdown
        className="prose  max-w-sm rounded-lg border bg-slate-50 px-[10px] py-[8px]"
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {rawMessage}
      </Markdown>
    </div>
  );
}

export default AIMessage;
