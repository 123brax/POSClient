import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  //to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <nav class="navbar navbar-dark bg-primary navbarbg-custom">
      <div className="navheader-custom">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" onClick={()=>toggle()} data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      </div>
      <div class={`${collapsed?"collapse":""} navbar-collapse`} id="navbarNavAltMarkup">
         <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Cutomers</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
        
      
        </div>
        <Layout className="site-layout">
          {children}
      </Layout>
    </nav>
    // <Layout>
    //   {loading && <Spinner />}
    //   <Sider trigger={null} collapsible collapsed={collapsed}>
    //     <div className="logo">
    //       <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>
    //     </div>
    //     <Menu
    //       theme="dark"
    //       mode="inline"
    //       defaultSelectedKeys={window.location.pathname}
    //     >
    //       <Menu.Item key="/" icon={<HomeOutlined />}>
    //         <Link to="/">Home</Link>
    //       </Menu.Item>
    //       <Menu.Item key="/bills" icon={<CopyOutlined />}>
    //         <Link to="/bills">Bills</Link>
    //       </Menu.Item>
    //       <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
    //         <Link to="/items">Items</Link>
    //       </Menu.Item>
    //       <Menu.Item key="/customers" icon={<UserOutlined />}>
    //         <Link to="/customers">Cutomers</Link>
    //       </Menu.Item>
    //       <Menu.Item
    //         key="/logout"
    //         icon={<LogoutOutlined />}
    //         onClick={() => {
    //           localStorage.removeItem("auth");
    //           navigate("/login");
    //         }}
    //       >
    //         Logout
    //       </Menu.Item>
    //     </Menu>
    //   </Sider>
    //   <Layout className="site-layout">
    //     <Header className="site-layout-background" style={{ padding: 0 }}>
    //       {React.createElement(
    //         collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    //         {
    //           className: "trigger",
    //           onClick: toggle,
    //         }
    //       )}
    //       <div
    //         className="cart-item d-flex jusitfy-content-space-between flex-row"
    //         onClick={() => navigate("/cart")}
    //       >
    //         <p>{cartItems.length}</p>
    //         <ShoppingCartOutlined />
    //       </div>
    //     </Header>
    //     <Content
    //       className="site-layout-background"
    //       style={{
    //         margin: "24px 16px",
    //         padding: 24,
    //         minHeight: 280,
    //       }}
    //     >
    //       {children}
    //     </Content>
    //   </Layout>
    // </Layout>
  );
};

export default DefaultLayout;
