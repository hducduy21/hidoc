import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Upload, Modal, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const port = 8080;
function convertToString(number) {
    if (number < 10) {
        return '0' + number.toString();
    } else {
        return number.toString();
    }
}

function AddHospital() {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const token = Cookies.get('bookmatetoken');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const values = form.getFieldsValue();

        let bodySent = {
            ...values,
            publicationDate:
                convertToString(values.publicationDate.$D) +
                '/' +
                convertToString(values.publicationDate.$M + 1) +
                '/' +
                values.publicationDate.$y,
            // file: values.file[0],
            file: null,
            typeId: '3',
        };
        console.log(bodySent);
        await axios
            .post('http://localhost:' + port + '/api/products', bodySent, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((data) => {
                toast.success('Thêm thành công');
                handleReset();
                console.log(data.data);
            })
            .catch((error) => {
                toast.error('Thêm sản phẩm thất bại');
            });
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);
    // const [authors, setAuthors] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:' + port + '/api/authors?page=0&size=1000', {
    //             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    //         })
    //         .then((data) => {
    //             let t = data.data.authors.content.map((el) => {
    //                 return {
    //                     id: el.id,
    //                     name: el.name,
    //                 };
    //             });
    //             console.log(t);
    //             setAuthors(t);
    //         });
    // }, []);
    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:' + port + '/api/categories?page=0&size=1000', {
    //             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    //         })
    //         .then((data) => {
    //             let t = data.data.categories.content.map((el) => {
    //                 return {
    //                     id: el.id,
    //                     name: el.name,
    //                 };
    //             });
    //             console.log(t);
    //             setCategories(t);
    //         });
    // }, []);
    const beforeUpload = (file) => {
        if (fileList.length === 0) {
            setFileList([file]);
            return true;
        }
        message.error('Chỉ được tải lên một tệp tin!');
        return false;
    };
    const handleReset = () => {
        form.resetFields();
    };
    return (
        <>
            <ToastContainer></ToastContainer>
            <Form
                form={form}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    width: '100%',
                    padding: '30px 20px',
                }}
            >
                <Form.Item
                    label="Tên bệnh viện/phòng khám"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên bệnh viện / phòng khám',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giờ làm việc"
                    name="timework"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giờ hoạt động ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá khám trung bình"
                    name="examined"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá khám trung bình ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item label="Chọn tác giả" name="authorId">
                    <Select>
                        {authors.map((el, ide) => {
                            return (
                                <Select.Option key={ide} value={el.id}>
                                    {el.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Chọn thể loại" name="categoryId">
                    <Select>
                        {categories.map((el, ide) => {
                            return (
                                <Select.Option key={ide} value={el.id}>
                                    {el.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item> */}
                <Form.Item
                    label="Mô tả ngắn"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả cơ sở y tế',
                        },
                    ]}
                >
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Tải ảnh bìa" valuePropName="fileList" getValueFromEvent={normFile} name="img">
                    <Upload
                        style={{ float: 'left' }}
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        fileList={fileList}
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Chọn ảnh
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Tải ảnh sơ đồ bệnh viện"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name="diagram"
                >
                    <Upload listType="picture-card" beforeUpload={beforeUpload} maxCount={1} fileList={fileList}>
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Chọn ảnh
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item shouldUpdate style={{ marginRight: 200, float: 'right' }}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                            onClick={showModal}
                        >
                            Hoàn tất
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <Modal title="Xác nhận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn thêm sản phẩm!</p>
            </Modal>
        </>
    );
}

export default AddHospital;
