import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Notification from "../api/notification.api";
import { store } from "../store";
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from "../store/actions";
import AppHeader from "./Common/AppHeader";
import AppSider from "./Common/AppSider";

export default function Home() {
  const onLoad = payload => {
    store.dispatch({ type: HOME_PAGE_LOADED, payload: Notification.getAll() });
  };

  const onUnload = () => {
    store.dispatch({ type: HOME_PAGE_UNLOADED });
  };

  useEffect(() => {
    onLoad();
    return () => onUnload();
  }, []);

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
