import { Space, Table, Button } from "antd";
import { useFetcher } from "lib/useFetcher";
import { useCallback, useEffect, useState } from "react";

const RecapTable = () => {
  const [filteredClass, setFilteredClass] = useState();
  const [filteredTugas, setFilteredTugas] = useState();
  const [data, setData] = useState([]);
  const { getFetch } = useFetcher();

  useEffect(() => {
    getData();
    getClass();
    getRepo();
  }, []);

  const getData = useCallback(async () => {
    getFetch("/assignment").then((res) => {
      setData(res);
    });
  }, []);

  const getRepo = useCallback(async () => {
    getFetch("/repo").then((res) => {
      console.log(res);
    });
  }, []);

  const getClass = useCallback(async () => {
    getFetch("/class").then((res) => {
      console.log(res);
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredClass(filters.class);
    setFilteredTugas(filters.repo_name);
  };

  const clearFilters = () => {
    setFilteredClass(null);
  };

  const clearAll = () => {
    setFilteredClass(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      filters: [
        { text: "MI3B", value: "MI3B" },
        { text: "TI4A", value: "TI4A" },
      ],
      filteredValue: filteredClass || null,
      onFilter: (value, record) => record.class.includes(value),
      ellipsis: true,
    },
    {
      title: "Tugas",
      dataIndex: "repo_name",
      key: "repo_name",
      render: (text: string) => {
        let a = text.split("-");
        a.pop();
        return <>{a.join("-")}</>;
      },
      filters: [],
      filteredValue: filteredTugas || null,
      onFilter: (value, record) => record.repo_name.includes(value),
      ellipsis: true,
    },
  ];
  return (
    <div style={{ maxWidth: "100%" }}>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setAgeSort}>Sort age</Button> */}
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        onChange={handleChange}
      />
    </div>
  );
};

export default RecapTable;
