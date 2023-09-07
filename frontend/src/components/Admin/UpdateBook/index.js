import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Upload, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const port = 8080;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function UpdateBook() {
    const { id } = useParams();
    let [data, setData] = useState(<></>);
    useEffect(() => {
        axios
            .get('http://localhost:' + port + '/api/products/' + id, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((data) => {
                let temp = data.data.product;
                console.log(temp);
                setData(
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
                        }}
                    >
                        <Form.Item label="Tên sách" name="name" initialValue={temp.name}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả ngắn"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả sách',
                                },
                            ]}
                        >
                            <TextArea rows={3} defaultValue={temp.title} />
                        </Form.Item>
                        <Form.Item label="Giá">
                            <InputNumber defaultValue={temp.price} />
                        </Form.Item>
                        <Form.Item label="Ngày sản xuất">
                            <Input defaultValue={temp.publicationDate} />
                        </Form.Item>
                        <Form.Item label="Nhà sản xuất">
                            <Input defaultValue={temp.publisher} />
                        </Form.Item>
                        <Form.Item label="Tải ảnh lên" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
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

                        <Form.Item shouldUpdate>
                            {() => (
                                <Button type="primary" htmlType="submit" onClick={showModal}>
                                    Hoàn tất
                                </Button>
                            )}
                        </Form.Item>
                    </Form>,
                );
            });
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [form] = Form.useForm();

    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    return <>{data}</>;
}

export default UpdateBook;
