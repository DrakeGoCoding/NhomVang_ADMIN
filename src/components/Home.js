import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Common/AppHeader";
import AppSider from "./Common/AppSider";

export default function Home() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppSider />
            <Layout>
                <AppHeader />
                <Layout.Content
                    className="px-7 py-6 sm:px-8 md:px-12"
                    style={{
                        maxWidth: "100%",
                        minWidth: "100%"
                    }}
                >
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
