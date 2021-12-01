import React from "react";
import { Button, Layout, Space, Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const { Header } = Layout;

export default function AppHeader() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <Header className="bg-white">
            <Space className="float-right" align="center">
                <Tooltip title="Logout">
                    <Button shape="circle" size="large" icon={<LogoutOutlined />} onClick={handleLogout}></Button>
                </Tooltip>
            </Space>
        </Header>
    );
}
