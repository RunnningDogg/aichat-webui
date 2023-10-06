import React, { CSSProperties, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import myAxios from "../../../services/axios";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

type UploadParamProps = {
  className?: string | undefined;
  style?: CSSProperties | undefined;
};

const App: React.FC<UploadParamProps> = ({
  className,
  style,
}: UploadParamProps) => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // const handleChange: UploadProps["onChange"] = (info) => {
  //   let newFileList = [...info.fileList];

  //   // 1. Limit the number of uploaded files
  //   // Only to show two recent uploaded files, and old ones will be replaced by the new
  //   newFileList = newFileList.slice(-1);

  //   // 2. Read from response and show file link
  //   newFileList = newFileList.map((file) => {
  //     if (file.response) {
  //       // Component will show file.url as link
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });

  //   setFileList(newFileList);
  // };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file as RcFile);
    });
    setUploading(true);
    console.log(fileList);
    console.log(formData);

    // You can use any AJAX library you like
    myAxios
      .post(
        // "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        "api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res.data)
      .then(() => {
        setFileList([]);
        message.success("upload successfully, 准备跳转到聊天页面");
        setTimeout(() => {
          navigate("/c");
        }, 2000);
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    // name: "file",
    multiple: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    // onChange: handleChange,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload(file) {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    maxCount: 1,
  };

  return (
    <div className="flex flex-col items-center">
      <Dragger className={className} {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint ">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <div>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    </div>
  );
};

export default App;
