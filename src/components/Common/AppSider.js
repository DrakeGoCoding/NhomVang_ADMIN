import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { EditOutlined, FileOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TOGGLE_SIDER } from "../../constants/actionTypes";

const { Sider } = Layout;

export default function AppSider() {
    const dispatch = useDispatch();
    const common = useSelector(state => state.common);

    const menuItemList = [
        {
            label: "User",
            icon: <UserOutlined />,
            link: "/"
        },
        {
            label: "News",
            icon: <FileOutlined />,
            link: "/news"
        },
        {
            label: "Editor",
            icon: <EditOutlined />,
            link: "/editor"
        },
        {
            label: "Product",
            icon: <ShoppingOutlined />,
            link: "/product"
        }
    ];

    const onCollapse = () => {
        dispatch({ type: TOGGLE_SIDER });
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={common.isSiderCollapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            collapsedWidth="60"
        >
            <div className="logo text-white h-8 m-4 text-xl text-center">
                {common.isSiderCollapsed ? common.appNameMini : common.appName}
            </div>
            <Menu theme="dark" mode="inline">
                {menuItemList.map((item, index) => {
                    return (
                        <Menu.Item key={index} icon={item.icon}>
                            <Link to={item.link}>{item.label}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Sider>
    );
}
