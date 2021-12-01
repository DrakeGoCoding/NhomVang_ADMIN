import moment from "moment";
import { Button, DatePicker, Form, Input, Modal } from "antd";

export default function UserModal({ user, visible, mode, onCancel }) {
    const modeDictionary = {
        create: {
            title: "New Admin",
            onOk: values => {
                const user = { ...values, dob: new Date(values.dob.format("YYYY-MM-DD")) };
                console.log(user);
            }
        },
        edit: {
            title: "Edit User",
            onOk: values => {
                const user = { ...values, dob: new Date(values.dob.format("YYYY-MM-DD")) };
                console.log(user);
            }
        }
    };

    const disabledDate = current => {
        return current && current > moment().endOf("day");
    };

    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    };

    if (mode) {
        const { title, onOk } = modeDictionary[mode];
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
                    initialValues={user}
                    autoComplete="off"
                    onFinish={onOk}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className="w-full"
                        label="User Name"
                        name="username"
                        rules={[{ required: true, message: "Username is required" }]}
                    >
                        <Input autoComplete="off" />
                    </Form.Item>

                    <Form.Item
                        className="w-full"
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
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

    return null;
}
