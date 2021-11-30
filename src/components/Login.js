import { Button, Form, Input, Typography } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "../api/auth.api";
import { LOGIN, LOGIN_PAGE_UNLOADED } from "../constants/actionTypes";
import { store } from "../store";
import "../style/login.css";

export default function Login() {
    const auth = useSelector(state => state.auth);

    const onFinish = values => {
        const { username, password } = values;
        const payload = Auth.login(username, password);
        store.dispatch({ type: LOGIN, payload });
    };

    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    };

    const onUnload = () => store.dispatch({ type: LOGIN_PAGE_UNLOADED });

    useEffect(() => {
        return () => {
            onUnload();
        };
    }, []);

    return (
        <div className="login-page flex justify-center items-center h-screen bg-gradient-to-r from-gray-600 to-blue-400">
            <div className="login-page-wrapper bg-white rounded-md p-5">
                <h2 className="text-center">Voucher Hunter</h2>
                <Form
                    className="login-form flex flex-col justify-center items-center mt-8 mb-4 px-3"
                    name="loginForm"
                    size="large"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className="w-full"
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className="w-full"
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {auth.error ? <Typography.Text type="danger">{auth.error}</Typography.Text> : null}

                    <Button className="mt-4" type="primary" htmlType="submit" disabled={auth.inProgress}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}
