import PageNav from "../components/PageNav";
import { Button } from "antd";
import { Card, Col, Row } from "antd";

import {
  DatabaseOutlined,
  SafetyOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

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
  return (
    <main className="flex flex-col w-screen min-h-screen ">
      {/* navbar */}
      <PageNav />

      {/* main content */}
      <section className="px-4 py-2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mt-24 text-center">
          你的智能文档助手,充当您的第二大脑
        </h1>
        <p className="mt-2   text-slate-400  text-center  ">
          通过AI技术, 可以及时的和文档对话, 并且给出信息源, 使得问答可信，可追溯
        </p>

        <div className="cta flex justify-center gap-10">
          <Button size="large">Learn How it build</Button>
          <Button size="large" type="primary">
            和您的文档对话
          </Button>
        </div>

        {/*  feature */}
        <div className="px-12 mt-24">
          <div className="feature grid grid-cols-3 gap-6 ">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="border flex flex-col gap-8  hover:border-geek-400 py-4 px-8 rounded"
              >
                {feature.icon}
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 items-center flex flex-col gap-3 ">
        <div className="border-t w-2/5 mx-auto"></div>
        <p className="text-center">&copy; 2023 ChatRepos.com</p>
      </footer>
    </main>
  );
}
