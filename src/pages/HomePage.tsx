import PageNav from "../components/PageNav";
import { Button, Collapse, Form, Input, theme } from "antd";
import type { CollapseProps } from "antd";
import type { CSSProperties } from "react";
import {
  DatabaseOutlined,
  SafetyOutlined,
  FileSearchOutlined,
  DesktopOutlined,
  MailOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import FadeInComponent from "../components/FadeInComponent";

const features = [
  {
    key: "0",
    title: "基于AI大模型技术",
    description: "基于现有的大模型技术进行问答",

    icon: <DesktopOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "1",
    title: "回答准确",
    description: "基于私有数据，进行文档问答，使得问答可信，可追溯",
    icon: <DatabaseOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "2",
    title: "隐私",
    description: "我们不会保存您的文档数据，保证您的隐私",
    icon: <SafetyOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "3",
    title: "数据源丰富",
    description: "可以与多种类型数据进行交互",
    icon: <FileSearchOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "4",
    title: "完整功能",
    description: (
      <span>
        除了文档问答，我们还提供了文档的
        <a href="http://www.baidu.com" className="text-geek-400">
          摘要、
        </a>
        <span className="text-purple-300">搜索、</span>
        <span className="text-green-400">以及后端常见系统的功能</span>
      </span>
    ),
    icon: <ExperimentOutlined className="text-3xl text-geek-300" />,
  },
  {
    key: "5",
    title: "反馈",
    description: (
      <span>
        目前我们也处于密切功能迭代中，后续会有需求迭代，也欢迎您的
        <a href="http://www.baidu.com" className="text-geek-400">
          反馈
        </a>
      </span>
    ),
    icon: <MailOutlined className="text-3xl text-geek-300" />,
  },
];

const getFaqs: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle,
) => [
  {
    key: "q1",
    label: "上传文件有大小限制吗",
    children: (
      <p>
        这个由管理员来决定, 默认情况下用户可以上传x个文件,每个文件上限是10mb,
        但是会根据管理员设置的不同的权限,设置每个用户的
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "q2",
    label: "支持什么文件格式",
    children: (
      <p>
        目前支持的比较健全的格式是pdf, 以后会兼容 docx, doc, pptx, ppt
        但是目前pptx和ppt的识别精度有限, 导致效果可能不如pdf
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "q3",
    label: "数据是隐私的吗?",
    children: (
      <p>
        我们目前是用腾讯云OSS存储您上传的文件, 且对文件进行嵌入后的数据进行保存,
        但是我们不会保存您的原始文件, 保证您的隐私
      </p>
    ),
    style: panelStyle,
  },
];

export default function Home() {
  // faq style
  const { token } = theme.useToken();
  // FAQ
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  // form style
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };
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
        <FadeInComponent>
          <div className="mt-32 h-[65vh] px-12">
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
        </FadeInComponent>

        {/* faq */}
        <FadeInComponent>
          <div className="mx-auto mb-20 mt-10 flex w-full max-w-4xl flex-col gap-3 border border-geek-400 py-4">
            <h2 className="text-center text-xl font-medium">常见问题答疑</h2>
            <Collapse
              ghost
              bordered={false}
              size="large"
              items={getFaqs(panelStyle)}
            />
          </div>
        </FadeInComponent>

        {/* contact us */}
        <FadeInComponent>
          <div className="mx-auto mt-10 flex w-2/3 flex-col gap-8 border-t-4 border-geek-400 px-4 py-2 shadow-lg">
            <header>
              <h2 className="mt-4 flex justify-center gap-3 text-center text-3xl font-normal">
                <MailOutlined
                  style={{
                    color: "#597ef7",
                  }}
                />
                <p>联系我们 </p>{" "}
              </h2>
            </header>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              // style={{ maxWidth: 600,  }}
              className="w-full"
              validateMessages={validateMessages}
              colon={false}
            >
              <Form.Item
                name={["user", "name"]}
                label="姓名"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="邮箱"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name={["user", "introduction"]} label="介绍">
                <Input.TextArea placeholder="我们有什么可以帮助您的?" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 11 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </FadeInComponent>
      </section>

      <footer className="mb-20 mt-20 flex flex-col items-center gap-3 ">
        <div className="mx-auto w-2/5 border-t"></div>
        <p className="text-center">&copy; 2023 ChatRepos.com</p>
      </footer>
    </main>
  );
}
