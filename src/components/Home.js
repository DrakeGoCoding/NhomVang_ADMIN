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
                    className="py-6 px-12"
                    style={{
                        maxWidth: "100%",
                        minWidth: "100%",
                        maxHeight: "calc(100% - 64px)",
                        minHeight: "calc(100% - 64px)"
                    }}
                >
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}
