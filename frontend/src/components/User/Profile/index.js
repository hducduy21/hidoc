import styles from './Profile.scss';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { Menu, Space, InputNumber } from 'antd';
import { Table } from 'react-bootstrap';
import Images from '~/assets/Images';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Thông tin cá nhân', '0'),
    getItem('Lịch sử khám bệnh và lịch khám', '1'),
    getItem('Đăng xuất', '2'),
];
const port = 7056;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Profile() {
    const token = Cookies.get('hidocaccesstoken');
    let [tabAcc, setTab] = useState(0);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // axios
        //     .put('http://localhost:' + port + '/api/users', values, {
        //         headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     });
    };

    //user detail
    const [user, setUser] = useState({});
    useEffect(() => {
        if (token) {
            axios
                .get('https://localhost:7056/api/user/profile', {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                })
                .then((data) => {
                    if (data.data && data.data.data) {
                        console.log(data.data.data);
                        setUser(data.data.data);
                    }
                });
        }
    }, []);

    //history exam
    const [history, setHistory] = useState([]);
    useEffect(() => {
        if (token) {
            axios
                .get('https://localhost:7056/api/schedule/history', {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                })
                .then((data) => {
                    if (data.status === 200) {
                        if (data.data && data.data.data) {
                            console.log(data.data.data);
                            setHistory(data.data.data);
                        }
                    }
                });
        }
    }, []);

    const onClick = (e) => {
        if (e.key === '0') {
            setTab(0);
        } else if (e.key === '1') {
            setTab(1);
        } else if (e.key === '2') {
            Cookies.set('bookmatetoken', 't', {
                expires: 0,
            });
            window.location.href = '/';
        }
    };

    return (
        <div className="profile_wrapper_outer">
            <Row className="profile_wrapper">
                <Col lg="3" md="4" className="profile_leftbar">
                    <div className="profile_content">
                        <h2 className="profile_title">Account</h2>
                        <div>
                            <Menu
                                onClick={onClick}
                                style={{
                                    width: '100%',
                                }}
                                defaultSelectedKeys={['0']}
                                defaultOpenKeys={['sub0']}
                                mode="inline"
                                items={items}
                            />
                        </div>
                    </div>
                </Col>
                <Col lg="9" md="8" className="profile_rightbar">
                    {tabAcc === 0 ? (
                        <div className="profile_content">
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="name"
                                    label="Họ tên"
                                    initialValue={user.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Bạn cần nhập thông tin họ tên của mình',
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input className="profile_input" />
                                </Form.Item>

                                <Form.Item name="email" initialValue={user.email} label="E-mail">
                                    <Input className="profile_input" disabled={true} />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    initialValue={user.phone}
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Bạn cần nhập số điện thoại',
                                        },
                                    ]}
                                >
                                    <Input className="profile_input" />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    initialValue={user.gender ? 'male' : 'female'}
                                    label="Giới tính"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Bạn cần chọn giới tính',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Giới tính" className="profile_input">
                                        <Option value="male">Nam</Option>
                                        <Option value="female">Nữ</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <div className="history_order">
                                <Table striped bordered className="history_order_list">
                                    <h6>Đơn hàng: #123321</h6>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <h5 className="history_order_price">Tổng tiền: 455.000đ</h5>
                                </Table>
                            </div>
                            <div className="history_order">
                                <Table striped bordered className="history_order_list">
                                    <h6>Đơn hàng: #123321</h6>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <h5 className="history_order_price">Tổng tiền: 455.000đ</h5>
                                </Table>
                            </div>
                            <div className="history_order">
                                <Table striped bordered className="history_order_list">
                                    <h6>Đơn hàng: #123321</h6>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="history_order_product">
                                            <div className="history_order_img">
                                                <img src={Images.sachtemp}></img>
                                            </div>

                                            <div>
                                                <h5>Cô gái đến từ hôm qua</h5>
                                                <span>Số lượng: </span>
                                            </div>
                                            <div className="history_order_product_price">Giá: 172.000đ</div>
                                        </td>
                                    </tr>
                                    <h5 className="history_order_price">Tổng tiền: 455.000đ</h5>
                                </Table>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
