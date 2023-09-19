import PageNav from "../components/PageNav";
import { Button } from "antd";
import { getFiles } from "../services/apiFiles";

import {
  DatabaseOutlined,
  SafetyOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const features = [
  {
    key: "1",
    title: "回答准确",
    description: "基于私有数据, 进行文档问答, 使得问答可信，可追溯",
    icon: <DatabaseOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "2",
    title: "隐私",
    description: "我们不会保存您的文档数据, 保证您的隐私",
    icon: <SafetyOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "3",
    title: "丰富",
    description: "可以与多种类型数据进行交互",
    icon: <FileSearchOutlined className="text-3xl text-geek-300" />,
  },
];

export default function Home() {
  useEffect(() => {
    async function call() {
      const data = await getFiles();
      console.log(data);
    }
    call();
  }, []);

  return (
    <main className="flex min-h-screen w-screen flex-col ">
      {/* navbar */}
      <PageNav />

      {/* main content */}
      <section className="flex flex-col gap-6 px-4 py-2">
        <h1 className="mt-24 text-center text-3xl font-bold">
          你的智能文档助手,充当您的第二大脑
        </h1>
        <p className="mt-2   text-center  text-slate-400  ">
          通过AI技术, 可以及时的和文档对话, 并且给出信息源, 使得问答可信，可追溯
        </p>

        <div className="flex justify-center gap-10 ">
          <Button size="large">Learn How it build</Button>
          <Button size="large" type="primary">
            和您的文档对话
          </Button>
        </div>

        {/*  feature */}
        <div className="mt-24 px-12">
          <div className="feature grid grid-cols-3 gap-6 ">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="flex flex-col gap-8 rounded  border px-8 py-4 hover:border-geek-400"
              >
                {feature.icon}
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 flex flex-col items-center gap-3 ">
        <div className="mx-auto w-2/5 border-t"></div>
        <p className="text-center">&copy; 2023 ChatRepos.com</p>
      </footer>
    </main>
  );
}
