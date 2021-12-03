import { Button, Input, message, Radio, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../api/user.api";
import { FILTER_USERLIST, USER_PAGE_LOADED, USER_PAGE_UNLOADED } from "../../constants/actionTypes";
import { store } from "../../store";
import UserModal from "./UserModal";
import UserTable from "./UserTable";
import "../../style/user.css";

export default function UserPage() {
    const { userList, total, page, pager, error, reload } = useSelector(state => state.userList);
    const [userModal, setUserModal] = useState({
        user: null,
        mode: "",
        error: "",
        visible: false
    });
    const [filter, setFilter] = useState({ role: "", regex: "" });

    const onLoad = () => {
        const pager = (page, filter) => User.getAll(page, filter);
        store.dispatch({
            type: USER_PAGE_LOADED,
            pager,
            payload: User.getAll()
        });
    };
    const onUnload = () => store.dispatch({ type: USER_PAGE_UNLOADED });

    const showUserModal = (e, mode = "create", user = null) => {
        e.preventDefault();
        setUserModal({ user, mode, visible: true, message: "" });
    };
    const closeUserModal = () => {
        setUserModal({ user: null, mode: "", visible: false });
    };

    const onFilter = () => store.dispatch({ type: FILTER_USERLIST, payload: pager(0, filter) });
    const resetFilter = () => setFilter({ role: "", regex: "" });
    const onReload = () => store.dispatch({ type: FILTER_USERLIST, payload: pager(page, filter) });
    const changeRegex = e => setFilter({ ...filter, regex: e.target.value });
    const changeRole = e => {
        setFilter({ ...filter, role: e.target.value });
        store.dispatch({
            type: FILTER_USERLIST,
            payload: pager(0, { ...filter, role: e.target.value })
        });
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
            resetFilter();
            closeUserModal();
        } else if (error) {
            message.error({ content: error });
        }
    }, [reload, error]);

    return (
        <Space className="user-page max-w-full" direction="vertical" size="large">
            <div className="flex justify-between">
                <Space className="mr-4" size="middle">
                    <Button type="primary" size="large" onClick={showUserModal}>
                        New Admin
                    </Button>
                    <Button size="large" icon={<ReloadOutlined />} onClick={onReload} />
                </Space>
                <Space size="middle">
                    <Radio.Group size="small" value={filter.role} name="role" onChange={changeRole}>
                        <Radio value="">Any</Radio>
                        <Radio value="admin">Admin</Radio>
                        <Radio value="user">User</Radio>
                    </Radio.Group>
                    <Input.Search
                        className="float-right box-border"
                        style={{ minWidth: "320px" }}
                        placeholder="Enter name, email or phonenumber"
                        enterButton
                        maxLength={100}
                        size="middle"
                        value={filter.regex}
                        onChange={changeRegex}
                        onSearch={onFilter}
                    />
                </Space>
            </div>
            <UserTable
                userList={userList}
                pageSize={User.pageSize}
                total={total}
                currentPage={page + 1}
                pager={pager}
                filter={filter}
                showUserModal={showUserModal}
            />
            <UserModal
                visible={userModal.visible}
                mode={userModal.mode}
                user={userModal.user}
                onCancel={closeUserModal}
            />
        </Space>
    );
}
