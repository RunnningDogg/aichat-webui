import { useQuery } from "@tanstack/react-query";
import PageNav from "../../components/PageNav";
import { useAuth } from "../../context/AuthContext";
import { Card, Col, Layout, Row, Table } from "antd";
import styles from "./AdminPage.module.css";
import myAxios from "../../services/axios";
// type Props = {};
const { Content } = Layout;
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import dayjs from "dayjs";

interface DataType {
  name: string;

  email: string;
  create_time: string;
  is_delete: number;
  user_role: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const userColumns: ColumnsType<DataType> = [
  {
    title: "姓名",
    dataIndex: "name",
    sorter: true,
    width: "20%",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    render: (text) => {
      return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "是否已删除",
    dataIndex: "is_delete",
  },
  {
    title: "用户权限",
    dataIndex: "user_role",
    // filters: [
    //   { text: "普通用户", value: 0 },
    //   { text: "管理员", value: 1 },
    // ],
    width: "20%",
  },
];

const docColumns: ColumnsType<DataType> = [
  {
    title: "文件名",
    dataIndex: "file_name",
    sorter: true,
    width: "20%",
  },
  {
    title: "文件url",
    dataIndex: "file_url",
    width: "20%",
    render: (text, record) => (
      <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        {text}
      </div>
    ),
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    render: (text) => {
      return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "文档状态",
    dataIndex: "file_status",
    // filters: [
    //   { text: "私有文档", value: 0 },
    //   { text: "公开", value: 1 },
    // ],
    width: "20%",
  },
];

export default function Admin() {
  const { user } = useAuth();

  // 用户表格参数
  const [userTableParams, setUserTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setUserTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  // 获取表格数据
  const {
    isLoading: tableLoading,
    data: tableData,
    error: tableError,
  } = useQuery(["user", userTableParams], async () => {
    const res = await myAxios.get("/api/users/");
    return res.data?.data;
  });

  // 文档表格
  const [docTableParams, setDocTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleDocTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setDocTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  // 获取表格数据
  const {
    isLoading: docLoading,
    data: docData,
    error: docError,
  } = useQuery(["docs", docTableParams], async () => {
    const res = await myAxios.get("/api/file/query/all");
    return res.data?.data;
  });

  if (tableError) {
    return <div>table error</div>;
  }

  return (
    <Layout>
      <PageNav />
      <Content className={styles.container}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
            <Card title="用户管理">
              <Table
                columns={userColumns}
                rowKey={(record) => record.email}
                dataSource={tableData}
                pagination={userTableParams.pagination}
                loading={tableLoading}
                onChange={handleTableChange}
              />
            </Card>
          </Col>

          <Col span={24}>
            <Card title="文档管理">
              <Table
                columns={docColumns}
                rowKey={(record) => record.file_id}
                dataSource={docData}
                pagination={docTableParams.pagination}
                loading={docLoading}
                onChange={handleDocTableChange}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
