import { Button, Table, Typography, theme, Dropdown, Space, Tooltip, Drawer, Modal, Form } from "antd";
import { DownOutlined, EllipsisOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import getData from "../hooks/getData";
import { useContext, useEffect, useState } from "react";
import mutateData from "../hooks/mutateData";
import CreateProductDrawer from "../drawers/CreateProductDrawer";
import { DrawerContext } from "../context/DrawerProvider";

const { Title, Text, Paragraph } = Typography;

const Inventory = () => {
  const { data, loading, error, fetchData } = getData("product");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedId, setClickedId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const {submited, toggleCreateButton, forEdit, setForEdit} = useContext(DrawerContext);

  useEffect(() => {
    fetchData();
  }, [submited])

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const showDrawer = () => {
    setOpenDrawer(true)
  }
  const onClose = () => {
    setOpenDrawer(false)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await mutateData(
      `product/${clickedId}`, 
      "delete", 
      "application/json")
      fetchData();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      label: <a onClick={() => {
        setForEdit(true);
        showDrawer(true);
      }}>Düzenle</a>,
      key: 0,
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={() => {
       showModal();
        }}>Sil</a>,
      key: 1,
      danger: true
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: 0,
    },
    {
      title: "Ad",
      dataIndex: "adi",
      key: 1,
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: 2,
    },
    {
      title: "Miktar",
      dataIndex: "miktar",
      key: 3,
    },
    {
      title: "Action",
      key: 4,
      render: (data) => {
        return (
          <>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            > 
                <Button onClick={(e) => {e.preventDefault()
                setClickedId(data.id)
                setSelectedRow(data)
                }} ghost>
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
      <Tooltip title="Yeni Ürün Ekle" mouseEnterDelay={0.3}>
      <Button style={{
        marginBottom: 10,
      }} size="large" icon={<PlusOutlined  />} onClick={() => {
        toggleCreateButton();
        showDrawer();
      }} />
      </Tooltip>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Modal cancelText="Vazgeç" okText="Sil" okButtonProps={{
        danger: true
      }} title="Silmek İstediğinizden Emin misiniz?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
      <CreateProductDrawer productData={selectedRow} onClose={onClose} open={openDrawer} />
    </div>
  );
};

export default Inventory;
