import { Button, Table, Typography, theme, Dropdown, Space, Tooltip, Drawer, Modal, Form } from "antd";
import { DownOutlined, EllipsisOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import getData from "../hooks/getData";
import { useContext, useEffect, useState } from "react";
import mutateData from "../hooks/mutateData";
import CreateProductionDrawer from "../drawers/CreateProductionDrawer";
import { DrawerContext } from "../context/DrawerProvider";

const { Title, Text, Paragraph } = Typography;

const Production = () => {
  const { data, loading, error, fetchData } = getData("production");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedId, setClickedId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const {submited, toggleCreateButton, forEdit, setForEdit} = useContext(DrawerContext);
  const employeerData = getData("employeer");
  const productData = getData("product");
  const rawMetarialData = getData("raw-metarial");

  let tableData = [];
  data.forEach((element) => {
    const findEmployee = employeerData.data.find((item) => item.id === element.calisan_id);
    const findProduct = productData.data.find((item) => item.id === element.urun_id);
    const findRawMetarial = rawMetarialData.data.find((item) => item.id === element.hammade_id)
    let newObj = {
        key: element.id,
        id: element.id,
        calisan_id: element.calisan_id,
        urun_id: element.urun_id,
        uretilen_miktar: element.uretilen_miktar,
        hammade_id: element.hammade_id,
    }
    if (findEmployee) {
        newObj.employeeName = findEmployee.adi;
        newObj.productName = findProduct.adi;
        newObj.rawMetarialName = findRawMetarial.adi;
    }
    tableData.push(newObj);
  })
 

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
      `production/${clickedId}`, 
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
      title: "Çalışan Adı",
      dataIndex: "employeeName",
      key: 1,
    },
    {
      title: "Hammadde",
      dataIndex: "rawMetarialName",
      key: 2,
    },
    {
      title: "Ürün",
      dataIndex: "productName",
      key: 3,
      width: 120,
    },
    {
      title: "Uretilen Miktar",
      dataIndex: "uretilen_miktar",
      key: 4,
    },
    {
      title: "Action",
      key: 5,
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
      <Tooltip title="Yeni Uretim Ekle" mouseEnterDelay={0.3}>
      <Button style={{
        marginBottom: 10,
      }} size="large" icon={<PlusOutlined  />} onClick={() => {
        toggleCreateButton();
        showDrawer();
      }} />
      </Tooltip>
      <Table columns={columns} dataSource={tableData} loading={loading} />
      <Modal cancelText="Vazgeç" okText="Sil" okButtonProps={{
        danger: true
      }} title="Silmek İstediğinizden Emin misiniz?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
      <CreateProductionDrawer productionData={selectedRow} onClose={onClose} open={openDrawer} />
    </div>
  );
};

export default Production;