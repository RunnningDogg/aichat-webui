import PageNav from "../../components/PageNav";
import FileTable from "./components/FileTable";
import UploadDragger from "./components/UploadDragger";
import { Layout } from "antd";

const { Content } = Layout;
function Page() {
  return (
    <Layout>
      <PageNav />
      <Content className="h-[95vh]">
        <div className="flex flex-col gap-6  ">
          <h1 className="mt-24 text-center text-3xl font-bold">上传文档</h1>
          <p className="  text-md text-center text-slate-300">
            上传您的文档, 开始对话
          </p>
          <div className="mx-auto">
            <UploadDragger />
          </div>
          <div className="mx-auto mt-10 ">
            <FileTable />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Page;
