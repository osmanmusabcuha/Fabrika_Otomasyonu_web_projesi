import {
  Button,
  Table,
  Typography,
  theme,
  Dropdown,
  Space,
  Tooltip,
  Drawer,
  Modal,
  Form,
  Badge,
  Tag,
} from "antd";
import {
  DownOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import getData from "../hooks/getData";
import { useContext, useEffect, useState } from "react";
import mutateData from "../hooks/mutateData";
import CreateOrderDrawer from "../drawers/CreateOrderDrawer";
import { DrawerContext } from "../context/DrawerProvider";

const { Title, Text, Paragraph } = Typography;

const Orders = () => {
  const { data, loading, error, fetchData } = getData("order");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedId, setClickedId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const { submited, toggleCreateButton, forEdit, setForEdit } =
    useContext(DrawerContext);
  const employeerData = getData("employeer");
  const customerData = getData("customer");

  let tableData = [];
  data.forEach((element) => {
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

  useEffect(() => {
    fetchData();
  }, [submited]);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await mutateData(`order/${clickedId}`, "delete", "application/json");
    fetchData();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      label: (
        <a
          onClick={() => {
            showModal();
          }}
        >
          Sil
        </a>
      ),
      key: 1,
      danger: true,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: 0,
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
    {
      title: "Action",
      key: 3,
      render: (data) => {
        return (
          <>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setClickedId(data.id);
                  setSelectedRow(data);
                }}
                ghost
              >
                <Space>
                  <EllipsisOutlined
                    style={{
                      color: colorPrimary,
                    }}
                  />
                </Space>
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Tooltip title="Yeni Siparis Ekle" mouseEnterDelay={0.3}>
        <Button
          style={{
            marginBottom: 10,
          }}
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            toggleCreateButton();
            showDrawer();
          }}
        />
      </Tooltip>
      <Table columns={columns} dataSource={tableData} loading={loading} />
      <Modal
        cancelText="Vazgeç"
        okText="Sil"
        okButtonProps={{
          danger: true,
        }}
        title="Silmek İstediğinizden Emin misiniz?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <CreateOrderDrawer
        orderData={selectedRow}
        onClose={onClose}
        open={openDrawer}
      />
    </div>
  );
};

export default Orders;
