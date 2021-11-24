import { Link } from "react-router-dom";
import { useState } from "react";
import { Layout, Menu } from "antd";
import "../../style/admin.css";
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        console.log("collapsed");
        setCollapsed(!collapsed);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(collapsed)}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="0">
                    <div>Dashboard admin</div>
                </Menu.Item>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to="/">User Management</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
export default Dashboard;
