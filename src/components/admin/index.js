import { Fragment } from "react";
import Dashboard from "./dashboard";
import { Layout, Dropdown } from "antd";
import { FaUserCircle } from "react-icons/fa";
import "../../style/admin.css";
const { Content } = Layout;

const Admin = ({ com }) => {
    const user = () => {
        return (
            <div className="sub-menu bg-gray-200 shadow-md p-2  ">
                <p className="option pointer text-lg">Đổi mật khẩu</p>
                <div className="bg-black h-0.5 mx-1 my-2 "></div>
                <p onClick={() => console.log("logout")} className="pl-2 text-lg pointer">
                    Đăng xuất
                </p>
            </div>
        );
    };
    return (
        <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <Dashboard />
                <Layout className="site-layout bg-white ">
                    <div className="bg-white h-12 px-6 flex pt-2 shadow-md">
                        <div className="flex-1">
                            <h4 className="text-3xl text-red-400">Admin Dashboard </h4>
                        </div>
                        <div className="flex-none text-3xl  float-right">
                            <Dropdown overlay={user} placement="bottomRight" arrow>
                                <FaUserCircle className="pb-2 text-4xl pointer-events-auto pointer" />
                            </Dropdown>
                        </div>
                    </div>
                    <Content style={{ margin: "0 16px" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {com}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
};
export default Admin;
