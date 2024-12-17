import React from "react";
import DataCard from "../components/DataCard";
import getData from "../hooks/getData";
import {
  ShopOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Col, Row, Table, Tag, theme } from "antd";

const Home = () => {
  const employeerData = getData("employeer");
  const customerData = getData("customer");
  const orderData = getData("order");
  const {
    token: { blue6, orange6, purple6 },
  } = theme.useToken();

  let tableData = [];
  orderData.data.forEach((element) => {
    const findEmployee = employeerData.data.find(
      (item) => item.id === element.calisanlar_id
    );
    const findCustomer = customerData.data.find(
      (item) => item.id === element.musteri_id
    );

    let newObj = {
      key: element.id,
      id: element.id,
      calisan_id: element.calisanlar_id,
      musteri_id: element.musteri_id,
    };

    if (findEmployee) {
      newObj.employeeName = findEmployee.adi;
      newObj.customerName = findCustomer.adi;
      newObj.customerSurname = findCustomer.soyadi;
      newObj.customerCompany = findCustomer.firma_adi;
    }

    tableData.push(newObj);
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: 0,
      sorter: (a,b) => a.id - b.id,
      sortOrder: "descend"
    },
    {
      title: "Çalışan Adı",
      dataIndex: "employeeName",
      key: 1,
    },
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: 2,
    },
    {
      title: "Müşteri Soyadı",
      dataIndex: "customerSurname",
      key: 3,
    },
    {
      title: "Fabrika Adı",
      dataIndex: "customerCompany",
      key: 4,
      render: (customerCompany) => {
        return <Tag color="blue">{customerCompany}</Tag>;
      },
    },
  ];
  const statisticData = [
    {
      title: "Toplam Çalışan",
      value: employeerData.data.length,
      icon: UserOutlined,
      color: blue6,
    },
    {
      title: "Toplam Müşteri",
      value: customerData.data.length,
      icon: UsergroupAddOutlined,
      color: orange6,
    },
    {
      title: "Toplam Sipariş",
      value: orderData.data.length,
      icon: ShopOutlined,
      color: purple6,
    },
  ];

  return (
    <div>
      <Row gutter={[10, 10]}>
        {statisticData.map((item, key) => {
          return (
            <Col key={key} lg={8} xs={24}>
              <DataCard
                color={item.color}
                icon={item.icon}
                title={item.title}
                value={item.value}
              />
            </Col>
          );
        })}
      </Row>
      <Table style={{marginTop:10}} columns={columns} sortDirections={["descend"]} dataSource={tableData}/>
    </div>
  );
};

export default Home;
