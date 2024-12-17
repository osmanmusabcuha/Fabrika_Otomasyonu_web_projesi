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
import CreateOrderItemDrawer from "../drawers/CreateOrderItemDrawer";
import { DrawerContext } from "../context/DrawerProvider";

const { Title, Text, Paragraph } = Typography;

const OrderItems = () => {
  const { data, loading, error, fetchData } = getData("order-item");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedId, setClickedId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const { submited, toggleCreateButton, forEdit, setForEdit } =
    useContext(DrawerContext);
  const productData = getData("product");

  let tableData = [];
  data.forEach((element) => {
    const findProduct = productData.data.find(
      (item) => item.id === element.urun_id
    );

    let newObj = {
      key: element.id,
      id: element.id,
      siparis_id: element.siparis_id,
      urun_id: element.urun_id,
      siparis_miktar: element.siparis_miktar,
    };

    if (findProduct) {
      newObj.productName = findProduct.adi;
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
    await mutateData(`order-item/${clickedId}`, "delete", "application/json");
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
      title: "Siparis ID",
      dataIndex: "siparis_id",
      key: 1,
    },
    {
      title: "Ürün",
      dataIndex: "productName",
      key: 4,
    },
    {
      title: "Siparis Miktarı",
      dataIndex: "siparis_miktar",
      key: 5,
    },
    {
      title: "Action",
      key: 6,
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
      <Tooltip title="Yeni Siparis İçerik Ekle" mouseEnterDelay={0.3}>
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
      <CreateOrderItemDrawer
        orderItemData={selectedRow}
        onClose={onClose}
        open={openDrawer}
      />
    </div>
  );
};

export default OrderItems;
