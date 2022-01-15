import React, { useMemo } from "react";
import {
  Badge,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography
} from "antd";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LOGOUT, VIEW_NOTIFICATION } from "../../store/actions";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Notification from "../../api/notification.api";

const { Header } = Layout;
const { Text } = Typography;

export default function AppHeader() {
  const dispatch = useDispatch();
  const { notificationList } = useSelector(state => state.common);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const menu = useMemo(() => {
    const handleClickNotification = notificationId => {
      dispatch({
        type: VIEW_NOTIFICATION,
        payload: Notification.view(notificationId)
      });
    };
    const handleClickViewAll = () => {
      dispatch({
        type: VIEW_NOTIFICATION,
        payload: Notification.viewAll()
      });
    };

    if (notificationList.length === 0) {
      return (
        <Menu>
          <Menu.Item key="empty">No notifications.</Menu.Item>
        </Menu>
      );
    }

    return notificationList.length > 0 ? (
      <Menu>
        {notificationList.map(notification => (
          <Menu.Item key={notification._id} style={{ width: "inherit" }}>
            <Link
              to={notification.link}
              onClick={() => handleClickNotification(notification._id)}
            >
              <div>
                <Text strong>{notification.user.displayname}</Text>{" "}
                {notification.action}
              </div>
              <Text style={{ color: "#1876f2" }}>
                {moment(new Date(notification.timestamp)).fromNow()}
              </Text>
            </Link>
          </Menu.Item>
        ))}
        <Menu.Item
          key="view-all"
          style={{ textAlign: "center" }}
          onClick={handleClickViewAll}
        >
          <Text type="danger">Mark all as viewed</Text>
        </Menu.Item>
      </Menu>
    ) : null;
  }, [notificationList, dispatch]);

  return (
    <Header className="bg-white sticky top-0 shadow-md z-50 px-7 sm:px-8 md:px-12">
      <Space className="float-right" align="center">
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Badge
            count={notificationList.length}
            overflowCount={10}
            offset={[-10, 10]}
          >
            <Button
              style={{ border: "none" }}
              shape="circle"
              size="large"
              icon={<BellOutlined />}
            />
          </Badge>
        </Dropdown>
        <Tooltip title="Logout">
          <Button
            shape="circle"
            size="large"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          ></Button>
        </Tooltip>
      </Space>
    </Header>
  );
}
