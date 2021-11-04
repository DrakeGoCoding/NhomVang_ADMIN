import '../../style/login.css'
import {
      BrowserRouter as Router,
      Switch,
      Routes,
      Route,
} from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal, Spin } from 'antd';
import { Fragment, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 18, color: 'white' }} spin />;
const layout = {
      labelCol: {
            span: 6,
      },
      wrapperCol: {
            span: 14,
      },
}
const tailLayout = {
      wrapperCol: {
            offset: 6,
            span: 16,
      },
}
const Login = () => {
      const [load, setLoad] = useState(false)
      const onFinish = (values) => {
            setLoad(true)
            console.log('Success:', values);
      };

      const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
      };

      return (
            <Fragment>
                        <div className="form-container login mb-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Form
                                                {...layout}
                                                name="basic"
                                                initialValues={{ remember: true }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}
                                                style={{ boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', width: '700px', padding: '20px 10px', background: 'white', borderRadius: '8px' }}
                                                className="login mt-5"
                                          >
                                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                      <p style={{ fontSize: '25px', fontWeight: 'bold', letterSpacing: '1px' }}>Đăng nhập</p>
                                                </div>
                                                <Form.Item
                                                      label="User"
                                                      name="email"
                                                      rules={[{ required: true, message: 'Please input your username!' }]}
                                                      className="field"
                                                >
                                                      <Input />
                                                </Form.Item>

                                                <Form.Item
                                                      label="Password"
                                                      name="password"
                                                      rules={[{ required: true, message: 'Please input your password!' }]}
                                                      className="field"
                                                >
                                                      <Input.Password />
                                                </Form.Item>
                                                {/* facebook login  */}

                                                <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                                                      <Checkbox style={{ color: 'black', display: 'flex' }}>Remember me</Checkbox>
                                                      <Button style={{ background: 'black', width: '200px' }} htmlType="submit" className=" text-white mt-2 text-center">
                                                            {load == true ? <Spin style={{ transform: 'translateX(-20px)translateY(-4px)' }} indicator={antIcon} /> : <span></span>}
                                                            Đăng nhập
                                                      </Button>
                                                </Form.Item>
                                          </Form>

                        </div>
            </Fragment>
      )
};
export default Login