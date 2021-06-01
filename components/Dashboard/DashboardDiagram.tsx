import { Card, Col, Row, Space, Progress, Statistic, Layout } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Title from "antd/lib/typography/Title";

export const DashboardDiagram = ({ tugas = [] }) => {
  const [total, setTotal] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, settotalIncorrect] = useState(0);
  console.log(tugas);
  useEffect(() => {
    tugas.forEach((item) => {
      console.log(item);
      setTotalCorrect(totalCorrect + item.correct);
      settotalIncorrect(totalIncorrect + item.incorrect);
    });
    return () => {};
  }, [tugas]);

  return (
    <>
      <Layout>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <Progress type="circle" percent={75} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Progress type="circle" percent={70} status="exception" />
              <Title> Jawaban salah : {totalIncorrect} </Title>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Progress type="circle" percent={100} />
              <Title> Jawaban benar : {totalCorrect} </Title>
            </Card>
          </Col>
        </Row>
      </Layout>
      <Layout>
        <Row gutter={24}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};
