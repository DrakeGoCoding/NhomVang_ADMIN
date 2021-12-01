import { Button, Input, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../api/user.api";
import {
    FILTER_USERLIST,
    SET_USERLIST_REGEX,
    SET_USERLIST_ROLE,
    USER_PAGE_LOADED,
    USER_PAGE_UNLOADED
} from "../../constants/actionTypes";
import { store } from "../../store";
import "../../style/user.css";
import UserModal from "./UserModal";
import UserTable from "./UserTable";

export default function UserPage() {
    const { role, regex, pager, reload } = useSelector(state => state.userList);
    const pageSize = 10;

    const [isUserModalVisible, setUserModalVisible] = useState(false);
    const [mode, setMode] = useState("");
    const [user, setUser] = useState(null);

    const showCreateUserModal = () => {
        setMode("create");
        setUserModalVisible(true);
    };
    const showEditUserModal = user => {
        setMode("edit");
        setUser(user);
        setUserModalVisible(true);
    };
    const showDeleteUserModal = user => {
        setMode("delete");
        setUser(user);
        setUserModalVisible(true);
    };
    const closeUserModal = () => {
        setMode("");
        setUser(null);
        setUserModalVisible(false);
    };

    const changeRole = e => {
        store.dispatch({
            type: SET_USERLIST_ROLE,
            page: 0,
            role: e.target.value,
            payload: pager(0, e.target.value, regex)
        });
    };

    const changeRegex = e => {
        store.dispatch({ type: SET_USERLIST_REGEX, regex: e.target.value });
    };

    const filterUserList = () => {
        store.dispatch({
            type: FILTER_USERLIST,
            payload: pager(0, role, regex)
        });
    };

    const onLoad = () => {
        const pager = (page, role, regex) => User.getAll(pageSize, page, role, regex);
        store.dispatch({
            type: USER_PAGE_LOADED,
            pager,
            payload: User.getAll(pageSize)
        });
    };

    const onUnload = () => {
        store.dispatch({ type: USER_PAGE_UNLOADED });
    };

    useEffect(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, []);

    useEffect(() => {
        if (reload) {
            onLoad();
        }
    }, [reload]);

    return (
        <Space className="user-page max-w-full" direction="vertical" size="large">
            <div className="flex justify-between">
                <Space className="mr-4" size="middle">
                    <Button type="primary" size="large" onClick={showCreateUserModal}>
                        New Admin
                    </Button>
                </Space>
                <Space size="middle">
                    <Radio.Group size="small" value={role} name="role" onChange={changeRole}>
                        <Radio value="">Any</Radio>
                        <Radio value="admin">Admin</Radio>
                        <Radio value="user">User</Radio>
                    </Radio.Group>
                    <Input.Search
                        className="float-right box-border"
                        style={{ minWidth: "320px" }}
                        placeholder="Enter name, email or phonenumber"
                        allowClear
                        enterButton
                        maxLength={100}
                        size="middle"
                        value={regex}
                        onChange={changeRegex}
                        onSearch={filterUserList}
                    />
                </Space>
            </div>
            <UserTable showEditUserModal={showEditUserModal} showDeleteUserModal={showDeleteUserModal} />
            <UserModal visible={isUserModalVisible} mode={mode} user={user} onCancel={closeUserModal} />
        </Space>
    );
}
