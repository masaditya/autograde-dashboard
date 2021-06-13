import { Space, Table, Button, Alert, Input, Divider } from "antd";
import { useFetcher } from "lib/useFetcher";
import { useSession } from "next-auth/client";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const RecapTable = () => {
  const [filteredClass, setFilteredClass] = useState();
  const [filteredTugas, setFilteredTugas] = useState();
  const [session, loading] = useSession();
  const [data, setData] = useState([]);
  const { getFetch, putFetch } = useFetcher();
  const [repoFilter, setRepoFilter] = useState([]);
  const [classFilter, setClassFilter] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      if (session.user.code_dosen) getData();
      else setShowAlert(true);
    }
    // getClass();
    // getRepo();
  }, [loading]);

  const getData = (code?: string) => {
    !loading &&
      // @ts-ignore
      getFetch(`/assignment/dosen/${code || session.user.code_dosen}`).then(
        (res) => {
          setData(res);
          console.log(res);
          let arr = [];
          res.forEach((item) => {
            let tmp = item.repo_name.split("-");
            var index = arr.findIndex((x) => x.text == tmp[1]);
            index === -1 && arr.push({ text: tmp[1], value: tmp[1] });
          });
          setRepoFilter(arr);
        }
      );
  };

  const submitCodeDosen = (ev: any) => {
    console.log(ev);
    // @ts-ignore
    putFetch("/user/dosen/" + session.user.id, { code_dosen: ev }).then(
      (res) => {
        getData(ev);
        setShowAlert(false);
      }
    );
  };

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
      title: "Nilai",
      dataIndex: "correct",
      key: "correct",
      render: (text, record) => {
        let total = record.correct + record.incorrect;
        let val = (record.correct / total) * 100;
        return <> {val} </>;
      },
      // sorter: (a, b) => a.incorrect - b.incorrect,
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
      {!loading &&
        // @ts-ignore
        showAlert && (
          <Alert
            message="Setup Kode Dosen"
            description={
              <p>
                Silahkan input kode dosen pada informasi user yang telah
                disediakan{" "}
                <Input
                  // @ts-ignore
                  onPressEnter={(val) => submitCodeDosen(val.target.value)}
                  prefix={<UserOutlined />}
                />
              </p>
            }
            type="error"
            showIcon
          />
        )}
      <Divider orientation="left">Rekapitulasi Nilai</Divider>
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
