import { Space, Table, Button } from "antd";
import { useFetcher } from "lib/useFetcher";
import { useCallback, useEffect, useState } from "react";

const RecapTable = () => {
  const [filteredClass, setFilteredClass] = useState();
  const [filteredTugas, setFilteredTugas] = useState();
  const [data, setData] = useState([]);
  const { getFetch } = useFetcher();
  const [repoFilter, setRepoFilter] = useState([]);
  const [classFilter, setClassFilter] = useState();

  useEffect(() => {
    getData();
    getClass();
    getRepo();
  }, []);

  const getData = () => {
    getFetch("/assignment").then((res) => {
      setData(res);
      let arr = [];
      res.forEach((item) => {
        let tmp = item.repo_name.split("-");
        var index = arr.findIndex((x) => x.text == tmp[1]);
        index === -1 && arr.push({ text: tmp[1], value: tmp[1] });
      });
      setRepoFilter(arr);
    });
  };

  const getRepo = useCallback(async () => {
    getFetch("/repo").then((res) => {
      setRepoFilter(res);
    });
  }, []);

  const getClass = useCallback(async () => {
    getFetch("/class").then((res) => {
      setClassFilter(res);
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
      filters: [...repoFilter],
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
