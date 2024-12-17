import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
  Typography,
} from "antd";
import {
  UserOutlined,
  DownOutlined,
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./layout.css";
import useScreenSize from "../hooks/useScreenSize";
import { DrawerContext } from "../context/DrawerProvider";
import Unauthorized from "../pages/401";
import getData from "../hooks/getData";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  //const {loggedUser} = useContext(DrawerContext);
  const screenSize = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [SideMenuOpen, setSideMenuOpen] = useState(false);
  let loggedUser = localStorage.getItem("usermail");
  const {
    token: {  colorBgContainer },
  } = theme.useToken();

  const showDrawer = () => {
    setOpenMobileMenu(true);
  };
  const onClose = () => {
    setOpenMobileMenu(false);
  }

  const token = localStorage.getItem("token");

  const headerStyle = {
    height: 80,
    width: "100vw",
    position: "relative",
    zIndex: 99,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const items = [
    {
      label: <a onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("usermail");
        navigate("/");
      }}>Çıkış Yap</a>,
      key: "0",
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: "/dashboard",
      label: "Ana sayfa",
      onClick: () => navigate("/dashboard"),
      icon: <HomeOutlined />,
    },
    {
      key: "/dashboard/employee",
      label: "Calısanlar",
      onClick: () => navigate("/dashboard/employee"),
      icon: <TeamOutlined />,
    },
    {
      key: "/dashboard/customers",
      onClick: () => navigate("/dashboard/customers"),
      label: "Musteriler",
      icon: <UserOutlined />,
    },
    {
      key: "/dashboard/inventory",
      label: "Urunler",
      onClick: () => navigate("/dashboard/inventory"),
      icon: <ShopOutlined />,
    },
    {
      key: "/dashboard/orders",
      label: "Siparisler",
      onClick: () => navigate("/dashboard/orders"),
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "/dashboard/order-items",
      label: "Siparis İcerik",
      onClick: () => navigate("/dashboard/order-items"),
      icon: <ShoppingOutlined />,
    },
    {
      key: "/dashboard/production",
      onClick: () => navigate("/dashboard/production"),
      label: "Uretim",
      icon: <ToolOutlined />,
    },
  ];
  if(!token){
    return (
      <Unauthorized/>
    );
  }
  return (
    <Layout>
      <Header style={{ ...headerStyle, backgroundColor: colorBgContainer }}>
        <div>
          <Button type="default" shape="default" onClick={() => {
            screenSize.width <= 992 ? showDrawer() : setSideMenuOpen((prev) => !prev);
          }} icon={<MenuOutlined />} />
        </div>
        <div></div>
        <div style={{}}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Avatar
                style={{
                  cursor: "pointer",
                }}
                size={32}
                icon={<UserOutlined />}
              />
              <Text
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  {loggedUser}
                  <DownOutlined />
                </Space>
              </Text>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider className="sidebar" theme="light" collapsed={SideMenuOpen} collapsedWidth={80} style={{}}>
          <Menu
            mode="inline"
            style={{ marginTop: 30, textAlign: "left" }}
            items={menuItems}
            selectedKeys={location.pathname}
          />
        </Sider>
        <Content style={{
          margin: '24px 16px',
          background: colorBgContainer,
          padding: 20,
          overflowY: "auto",
        }}>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Drawer 
      width={"50%"}
      title={"Menu"}
      placement="left"
      onClose={onClose}
      open={openMobileMenu}
      >
        <Menu 
        mode="inline"
        items={menuItems}
        />
      </Drawer>
    </Layout>
  );
};

export default DashboardLayout;