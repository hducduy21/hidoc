import styles from './Hospital.scss';
import classNames from 'classnames/bind';
import Images from '~/assets/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faHospital } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    AppstoreOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    FileOutlined,
    ApartmentOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
const cx = classNames.bind(styles);
let imgQT = Images.quytrinh;
let inf =
    'Bệnh viện Chợ Rẫy với lịch sử thành lập trên 100 năm, là bệnh viện hạng đặc biệt tuyến Trung ương lớn nhất cả nước với trên 1.800 giường và trên 3.000 kỹ thuật y tế được thực hiện. Hàng ngày Bệnh viện Chợ Rẫy tiếp nhận trung bình 6,000 -  8,000 bệnh nhân đến khám. Bệnh viện Chợ Rẫy là bệnh viện đa khoa hoàn chỉnh, xếp hạng đặc biệt, tuyến kỹ thuật sau cùng các tỉnh thành phía Nam, trực thuộc Bộ Y tế. Thế mạnh nổi bật tại Bệnh viện Chợ Rẫy là sự kết hợp giữa các chuyên khoa mang lại hiệu quả tốt nhất trong việc chẩn đoán và điều trị cho người bệnh.';
let type = 1;

const items = [
    getItem('Giới thiệu', '1', <FileOutlined />),
    getItem('Sơ đồ và quy trình khám', '2', <ApartmentOutlined />),
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
function Hospital() {
    const { id } = useParams();
    const [hospital, setHospital] = useState({});
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const [contentState, setContentState] = useState(1);
    const onClick = (e) => {
        console.log(e.key);
        if (e.key === '1') {
            setContentState(1);
        } else if (e.key === '2') {
            setContentState(2);
        }
    };
    useEffect(() => {
        axios.get('https://localhost:7056/api/hospitals/' + id).then((data) => {
            console.log(data.data.data);
            setHospital(data.data.data);
        });
    }, []);
    return (
        <div className={cx('container', 'HospitalContainer')}>
            <img
                src={hospital.img ? 'https://localhost:7056/static/' + hospital.img : Images.bvtest}
                alt="Hospital"
            ></img>
            <div className={cx('title')}>
                <table>
                    <tr>
                        <td rowSpan={2} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faHospital} className={cx('icon')} />
                        </td>
                        <td>
                            <span className={cx('name')}>{hospital && hospital.name}</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <span className={cx('address')}>
                                <FontAwesomeIcon icon={faLocationDot} className={cx('addressIcon')} />
                                {hospital && hospital.address}
                            </span>
                        </td>
                        <td style={{ width: '200px' }}>
                            <Button style={{ width: '100%' }} variant="success">
                                Đặt số khám
                            </Button>
                        </td>
                    </tr>
                </table>
            </div>
            <Row className={cx('content')}>
                <Col md={3}>
                    <Menu
                        style={{
                            width: '100%',
                        }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        mode="inline"
                        theme="light"
                        items={items}
                        onClick={onClick}
                    />
                </Col>
                <Col
                    md={9}
                    className={cx('content_content_1')}
                    style={{ display: contentState == 1 ? 'block' : 'none' }}
                >
                    <div className={cx('content_content_row')}>
                        Giới thiệu: <span>{hospital && hospital.description}</span>
                    </div>
                    <div className={cx('content_content_row')}>
                        Giờ làm việc: <span>{hospital && hospital.timework}</span>
                    </div>
                    <div className={cx('content_content_row')}>
                        Giá trung bình: <span>{hospital.xPrice ? hospital.xPrice.toLocaleString('en-US') : ''}đ</span>
                        <small>
                            {
                                '(Lưu ý: giá này chỉ dựa trên giá khám tổng quát trung bình  cơ bản, tùy thuộc vào từng loại bệnh khác mà chi phí khác nhau)'
                            }
                        </small>
                    </div>
                </Col>
                <Col
                    md={9}
                    className={cx('content_content_2')}
                    style={{ display: contentState == 2 ? 'block' : 'none' }}
                >
                    <img src={Images.sodotam} style={{ width: '100%' }} />
                </Col>
            </Row>
        </div>
    );
}

export default Hospital;
