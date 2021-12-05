import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { FileOutlined, HomeOutlined, ShoppingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { TOGGLE_SIDER } from "../../constants/actionTypes";
import { useEffect, useState } from "react";

const { Sider } = Layout;

export default function AppSider() {
    const dispatch = useDispatch();
    const location = useLocation();
    const common = useSelector(state => state.common);

    const [current, setCurrent] = useState("home");

    const menuItemList = [
        {
            label: "Dashboard",
            icon: <HomeOutlined />,
            link: "/",
            key: ""
        },
        {
            label: "User",
            icon: <UserOutlined />,
            link: "/user",
            key: "user"
        },
        {
            label: "News",
            icon: <FileOutlined />,
            link: "/news",
            key: "news"
        },
        {
            label: "Product",
            icon: <ShoppingOutlined />,
            link: "/product",
            key: "product"
        },
        {
            label: "Order",
            icon: <ShoppingCartOutlined />,
            link: "/order",
            key: "order"
        }
    ];

    const onCollapse = () => {
        dispatch({ type: TOGGLE_SIDER });
    };

    useEffect(() => {
        setCurrent(location.pathname.split("/")[1]);
    }, [location.pathname]);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={common.isSiderCollapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            collapsedWidth="60"
        >
            <div className="logo h-8 m-4 text-white text-xl text-center">
                {common.isSiderCollapsed ? common.appNameMini : common.appName}
            </div>
            <Menu selectedKeys={[current]} theme="dark" mode="inline">
                {menuItemList.map(item => {
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.link}>{item.label}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Sider>
    );
}
