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
      // getFetch(`/assignment/dosen/${code || session.user.code_dosen}`).then(
      getFetch(`/class/dosen/${code || session.user.id}`).then((res) => {
        setData(res[0].student);
        let arr = [];
        res.forEach((item) => {
          arr.push({ text: item.class, value: item.class });
          // let tmp = item.repo_name.split("-");
          // var index = arr.findIndex((x) => x.text == tmp[1]);
          // index === -1 && arr.push({ text: tmp[1], value: tmp[1] });
        });
        setRepoFilter(arr);
      });
  };

  const submitCodeDosen = (ev: any) => {
    // console.log(ev);
    // @ts-ignore
    putFetch("/user/dosen/" + session.user.id, { code_dosen: ev }).then(
      (res) => {
        getData(ev);
        setShowAlert(false);
      }
    );
  };

  const get_random = (list: number[]) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
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
      // fixed: "left",
      // width: 200,
    },
    {
      title: "Layouting",
      dataIndex: "tugas",
      key: "tugas",
      render: (tugas: any[], record) => {
        // console.log(tugas);
        let val = 0;
        let layoutingTugas = tugas.find(
          (item) =>
            item.repo_name.includes("layouting") &&
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        // console.log(layoutingTugas);
        if (layoutingTugas) {
          let total = layoutingTugas.correct + layoutingTugas.incorrect;
          val = (layoutingTugas.correct / total) * 100;
        }
        return <> {val ? val : 0} </>;
      },
      // sorter: (a, b) => a.incorrect - b.incorrect,
    },
    {
      title: "Routing",
      dataIndex: "tugas",
      key: "tugas",
      render: (tugas: any[], record) => {
        // console.log(tugas);
        let val = 0;
        let layoutingTugas = tugas.find(
          (item) =>
            item.repo_name.includes("routing") &&
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        // console.log(layoutingTugas);
        if (layoutingTugas) {
          let total = layoutingTugas.correct + layoutingTugas.incorrect;
          val = (layoutingTugas.correct / total) * 100;
        }
        return <> {val ? val : 0} </>;
      },
      // sorter: (a, b) => a.incorrect - b.incorrect,
    },
    {
      title: "Data Binding",
      dataIndex: "tugas",
      key: "tugas",
      render: (tugas: any[], record) => {
        // console.log(tugas);
        let val = 0;
        let bindingTugas = tugas.find(
          (item) =>
            item.repo_name.includes("binding") &&
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        // console.log(bindingTugas);
        if (bindingTugas) {
          let total = bindingTugas.correct + bindingTugas.incorrect;
          val = (bindingTugas.correct / total) * 100;
        }
        return <> {val ? val : 0} </>;
      },
      // sorter: (a, b) => a.incorrect - b.incorrect,
    },
    {
      title: "Nilai",
      dataIndex: "tugas",
      key: "tugas",
      render: (text, record) => {
        let correct = 0;
        let total = 0;
        let val = 0;
        let nilai = text.filter(
          (item) =>
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        if (nilai) {
          nilai.forEach((item) => {
            let t = item.correct + item.incorrect;
            let tmp = item.correct / t;
            val = val + tmp;
          });
        }

        return <> {val ? ((val / 3) * 100).toFixed(2) : 0} </>;
      },
      sorter: (a, b) => {
        let aval = 0
        let bval = 0
        console.log("a b", a, b);
        let nilaia = a.tugas.filter(
          (item) =>
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        if (nilaia) {
          nilaia.forEach((item) => {
            let t = item.correct + item.incorrect;
            let tmp = item.correct / t;
            aval = aval + tmp;
          });
        }
        let nilaib = b.tugas.filter(
          (item) =>
            // @ts-ignore
            item.code_dosen === session.user.code_dosen
        );
        if (nilaib) {
          nilaib.forEach((item) => {
            let t = item.correct + item.incorrect;
            let tmp = item.correct / t;
            bval = bval + tmp;
          });
        }
        return a-b;
      },
    },
    // {
    //   title: "Tugas",
    //   dataIndex: "repo_name",
    //   key: "repo_name",
    //   render: (text: string) => {
    //     let a = text.split("-");
    //     a.pop();
    //     return <>{a.join("-")}</>;
    //   },
    //   filters: [...repoFilter],
    //   filteredValue: filteredTugas || null,
    //   onFilter: (value, record) => record.repo_name.includes(value),
    //   ellipsis: true,
    // },
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
        // scroll={{ x: 1300 }}
        dataSource={data}
        rowKey="_id"
        onChange={handleChange}
      />
    </div>
  );
};

export default RecapTable;
