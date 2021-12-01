import moment from "moment";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { DELETE_USER, USER_SUBMITTED } from "../../constants/actionTypes";
import User from "../../api/user.api";

function SaveUserModal({ visible, mode, title, user, onOk, onCancel }) {
    const disabledDate = current => {
        return current && current > moment().endOf("day");
    };

    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    };

    const initialValues = { ...user, dob: user ? (user.dob ? moment(user.dob) : undefined) : undefined };

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
                <Button key="submit" form="userForm" type="primary" htmlType="submit">
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
                initialValues={initialValues}
                autoComplete="off"
                onFinish={onOk}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item className="w-full" label="User Name" name="username">
                    <Input disabled={mode !== "create"} autoComplete="off" />
                </Form.Item>

                <Form.Item className="w-full" label="Password" name="password">
                    <Input.Password autoComplete="off" />
                </Form.Item>

                <Form.Item className="w-full" label="Display Name" name="displayname">
                    <Input />
                </Form.Item>

                <Form.Item className="w-full" label="Email" name="email">
                    <Input type="email" />
                </Form.Item>

                <Form.Item className="w-full" label="Phone Number" name="phonenumber">
                    <Input />
                </Form.Item>

                <Form.Item className="w-full" label="Date of birth" name="dob">
                    <DatePicker format="DD/MM/YYYY" disabledDate={disabledDate} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

function DeleteUserModal({ visible, title, user, onOk, onCancel }) {
    if (user && user.username) {
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={() => onOk(user.username)}
                onCancel={onCancel}
                okButtonProps={{ danger: true }}
                cancelButtonProps={{ danger: true }}
            >
                Confirm to delete user "{user.username}" ?
            </Modal>
        );
    }
}

export default function UserModal({ user, visible, mode, onCancel }) {
    const dispatch = useDispatch();

    const saveUser = user => {
        const dob = user.dob ? new Date(user.dob.format("L")) : undefined;
        user = { ...user, dob };
        dispatch({
            type: USER_SUBMITTED,
            payload: mode === "create" ? User.create(user) : User.update(user)
        });
        onCancel();
    };

    const deleteUser = username => {
        dispatch({
            type: DELETE_USER,
            payload: User.delete(username)
        });
        onCancel();
    };

    const modeDictionary = {
        create: { title: "New Admin", onOk: saveUser },
        edit: { title: "Edit User", onOk: saveUser },
        delete: { title: "Delete User", onOk: deleteUser }
    };

    if (mode) {
        const { title, onOk } = modeDictionary[mode];
        return mode === "delete" ? (
            <DeleteUserModal visible={visible} title={title} user={user} onOk={onOk} onCancel={onCancel} />
        ) : (
            <SaveUserModal visible={visible} mode={mode} title={title} user={user} onOk={onOk} onCancel={onCancel} />
        );
    }

    return null;
}
