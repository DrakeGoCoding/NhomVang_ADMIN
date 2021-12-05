import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_USER, USER_SUBMITTED } from "../../constants/actionTypes";
import User from "../../api/user.api";

function SaveUserModal({ visible, mode, title, user, onOk, onCancel, loading }) {
    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    };

    return (
        <Modal
            centered
            visible={visible}
            title={title}
            onOk={onOk}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" form="userForm" type="primary" loading={loading} htmlType="submit">
                    Save
                </Button>
            ]}
        >
            <Form
                labelCol={{ span: 7 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                name="userForm"
                size="large"
                initialValues={user}
                autoComplete="off"
                onFinish={onOk}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className="w-full"
                    label="User Name"
                    name="username"
                    rules={[{ required: mode === "create", message: "Username is required" }]}
                >
                    <Input disabled={mode !== "create"} autoComplete="off" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    label="Password"
                    name="password"
                    rules={[{ required: mode === "create", message: "Password is required" }]}
                >
                    <Input.Password autoComplete="off" />
                </Form.Item>

                <Form.Item className="w-full" label="Display Name" name="displayname">
                    <Input />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    label="Email"
                    name="email"
                    rules={[{ type: "email", message: "Invalid email" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="w-full" label="Phone Number" name="phonenumber">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

function DeleteUserModal({ visible, title, user, onOk, onCancel, loading }) {
    if (user && user.username) {
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={() => onOk(user.username)}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" danger onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" danger loading={loading} onClick={() => onOk(user.username)}>
                        OK
                    </Button>
                ]}
            >
                Confirm to delete user "{user.username}" ?
            </Modal>
        );
    }
    return null;
}

export default function UserModal({ user, visible, mode, onCancel }) {
    const dispatch = useDispatch();
    const { inProgress } = useSelector(state => state.userList);

    const saveUser = user => {
        dispatch({
            type: USER_SUBMITTED,
            payload: mode === "create" ? User.create(user) : User.update(user)
        });
    };

    const deleteUser = username => {
        dispatch({
            type: DELETE_USER,
            payload: User.delete(username)
        });
    };

    const modeDictionary = {
        create: { title: "New Admin", onOk: saveUser },
        edit: { title: "Edit User", onOk: saveUser },
        delete: { title: "Delete User", onOk: deleteUser }
    };

    if (mode) {
        const { title, onOk } = modeDictionary[mode];
        switch (mode) {
            case "delete":
                return (
                    <DeleteUserModal
                        visible={visible}
                        title={title}
                        user={user}
                        onOk={onOk}
                        onCancel={onCancel}
                        loading={inProgress}
                    />
                );

            case "create":
            case "edit":
                return (
                    <SaveUserModal
                        visible={visible}
                        mode={mode}
                        title={title}
                        user={user}
                        onOk={onOk}
                        onCancel={onCancel}
                        loading={inProgress}
                    />
                );

            default:
                return null;
        }
    }

    return null;
}
