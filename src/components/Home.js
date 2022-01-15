import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Common/AppHeader";
import AppSider from "./Common/AppSider";

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider />
      <Layout className="max-h-screen overflow-y-auto">
        <AppHeader />
        <Layout.Content
          className="p-4 sm:px-8 md:px-12 md:py-6"
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
