import { Button, Table, Typography, theme, Dropdown, Space, Tooltip, Drawer, Modal, Form } from "antd";
import { DownOutlined, EllipsisOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import getData from "../hooks/getData";
import { useContext, useEffect, useState } from "react";
import mutateData from "../hooks/mutateData";
import CreateEmployeeDrawer from "../drawers/CreateEmployeeDrawer";
import { DrawerContext } from "../context/DrawerProvider";

const { Title, Text, Paragraph } = Typography;

const Employee = () => {
  const { data, loading, error, fetchData } = getData("employeer");
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
      `employeer/${clickedId}`, 
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
      title: "Soyad",
      dataIndex: "soyadi",
      key: 2,
    },
    {
      title: "Maaş",
      dataIndex: "maas",
      key: 3,
      render: (maas) => {
        return <Text>{maas}₺</Text>;
      },
    },
    {
      title: "Medeni Durum",
      dataIndex: "medeni_durum",
      key: 4,
      width: 120,
    },
    {
      title: "Adres",
      dataIndex: "adres",
      key: 5,
    },
    {
      title: "Tel",
      dataIndex: "tel_no",
      key: 6,
    },
    {
      title: "Action",
      key: 7,
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
      <Tooltip title="Yeni Çalışan Ekle" mouseEnterDelay={0.3}>
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
      <CreateEmployeeDrawer employeeData={selectedRow} onClose={onClose} open={openDrawer} />
    </div>
  );
};

export default Employee;
