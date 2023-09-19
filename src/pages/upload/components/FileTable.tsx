import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
// import axios from "axios";
import myAxios from "../../../services/axios";
import dayjs from "dayjs";

interface DataType {
  id: string;
  file_name: string;
  file_url: string;
  user_id: number;
  created_at: Date;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
  {
    title: "文件名",
    dataIndex: "file_name",
    key: "file_name",
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    render: (text: string) => <span>{dayjs(text).format("YYYY-MM-DD")}</span>,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>文档对话</a>
        <a>Delete {record.file_name}</a>
      </Space>
    ),
  },
];

const App: React.FC = () => {
  const { accessToken } = useAuth();
  const [filesData, setFilesData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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
      const res = await myAxios.get("api/file/query", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFilesData(res.data.data);
      console.log(res);

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

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
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
