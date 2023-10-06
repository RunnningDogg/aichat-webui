import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import myAxios from "../../../services/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface DataType {
  file_id: string;
  file_name: string;
  file_url: string;
  user_id: number;
  create_time: Date;
  file_status: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const App: React.FC = () => {
  const queryClient = useQueryClient();

  const [filesData, setFilesData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.info("取消公开文件");
  };

  const handlePublicFiles = async (file_id: string) => {
    const res = await myAxios.post(
      "/api/file/public",
      {
        file_id: file_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.status === 200) {
      message.success("文档公开成功!");
      queryClient.invalidateQueries(["publicknowledges"]);
    } else {
      message.error("文档公开失败");
    }
  };

  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "文件名",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "创建时间",
      dataIndex: "creat_time",
      key: "creat_time",
      render: (_, record) => {
        // console.log(record);
        // console.log(record.create_time);
        // console.log(dayjs(record.create_time).format("YYYY-MM-DD"));

        return <span>{dayjs(record.create_time).format("YYYY-MM-DD")}</span>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/c/${record.file_id}`)}>文档对话</a>
          <a>删除</a>
          {record.file_status === 0 ? (
            <Popconfirm
              onConfirm={() => handlePublicFiles(record.file_id)}
              onCancel={cancel}
              title="公开该问的那个"
              description="索引公开,方便用户进行文档问答, 但是不会公开聊天记录,确定吗?"
            >
              <Button>公开该文档</Button>
            </Popconfirm>
          ) : (
            <span>已经公开该文档</span>
          )}
        </Space>
      ),
    },
  ];

  // useQuery
  // console.log(data);
  // const { data } = useQuery({
  //   queryKey: ["filesapi"],
  //   queryFn: () =>
  //     fetch("http://localhost:8000/file/query", {
  //       headers: {

  //         Authorization:
  //           "Bearer " +
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b255IiwiZXhwIjoxNjk1MTQ1NTQwfQ.H93AEEoGVLdBOjvLehYmtdffbNG0uBsSUUKXVEOEcZ4",
  //       },
  //     }).then((res) => res.json()),
  // });

  // const { data: remoteFiles } = useQuery({
  //   queryKey: ["files"],
  //   queryFn: getFiles,
  // });

  // console.log(remoteFiles);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await myAxios.get("api/file/query?type=table", {});
      console.log(res.data.data);

      setFilesData(res.data.data);
      // console.log(res);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.data.length,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setFilesData([]);
    }
  };

  // console.log(filesData);
  // console.log(dayjs("2023-10-02T02:22:50").format("YYYY-MM-DD"));

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.file_id}
      dataSource={filesData}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      size="large"
      bordered
    />
  );
};

export default App;
