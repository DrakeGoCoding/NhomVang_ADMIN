import { Fragment } from "react"
import { Form, Menu, Input, message } from 'antd';
import {
      AppstoreAddOutlined,
      DesktopOutlined,
      ContainerOutlined,
      EyeOutlined,
      PlusOutlined,
      CarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import axios from 'axios';
const { SubMenu } = Menu;
const layout = {
      labelCol: {
            span: 24,
      },
      wrapperCol: {
            span: 24,
      },
};
const Dashboard = ({ collapse }) => {
      const [visible, setVisible] = useState(false)
      const [form] = Form.useForm()
      
      return (
            <Fragment>
                  <Menu
                        defaultSelectedKeys={'1'}
                        defaultOpenKeys={['car']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapse}
                        collapsedWidth="400px"
                        style={{ height: '100%', minHeight: '100vh' }}
                  >
                        <Modal title="Thêm hãng xe mới" width={600} footer={false} visible={visible} onCancel={() => setVisible(false)}>
                              <Form
                                    name="basic"
                                    {...layout}
                                    // onFinish={}
                                    // form={}
                              >
                                    <Form.Item
                                          label="Tên hãng"
                                          name="name"
                                          rules={[
                                                {
                                                      required: true,
                                                      message: '*',
                                                },
                                          ]}
                                    >
                                          <Input size="large" />
                                    </Form.Item>
                                    <Form.Item>
                                          <button className="btn-add-manu" type="submit"> Thêm</button>
                                    </Form.Item>
                              </Form>
                        </Modal>
                        <Menu.Item key="0" className="bg-dark" disabled style={{ cursor: 'default', padding: '0 20px', margin: '0' }}>
                              <h5 style={{ margin: '0', height: '100%' }} className="text-light d-flex align-items-center">Dashboard</h5>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<DesktopOutlined />}>
                              <Link to="/admin">Trang chủ</Link>
                        </Menu.Item>
                        <Menu.Item onClick={() => setVisible(true)} key="3" icon={<PlusOutlined />}>
                              <span>Thêm</span>
                        </Menu.Item>
                        <SubMenu key="car" icon={<CarOutlined />} title="Quản lý xe">
                              <Menu.Item key="5" icon={<EyeOutlined />}> <Link to=""> Xem danh sách xe</Link></Menu.Item>
                              <Menu.Item key="6" icon={<AppstoreAddOutlined />}><Link to=""> Thêm xe mới</Link></Menu.Item>
                        </SubMenu>
                  </Menu>
            </Fragment>
      )
}
export default Dashboard