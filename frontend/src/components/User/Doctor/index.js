import Images from '~/assets/Images';
import styles from './Doctor.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faHospital } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
const hocvi = { 1: 'Bác sỹ ', 2: 'Thạc sỹ ', 3: 'Tiến sỹ ', 4: 'Giáo sư ' };

function colorDensity(a, b) {
    if (a === b) return 'noDensity';
    if (a / b >= 0.8) return 'redDensity';
    if (a / b >= 0.5) return 'yellowDensity';
    if (a / b >= 0.3) return 'greenDensity';
    return 'whiteDensity';
}
function Doctor() {
    const [data, setData] = useState([]);
    const [itemTarger, setItemTarger] = useState([]);
    let [doctor, setDoctor] = useState({});
    const { id } = useParams();
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var year2 = tomorrow.getFullYear();
    var month2 = ('0' + (tomorrow.getMonth() + 1)).slice(-2);
    var day2 = ('0' + tomorrow.getDate()).slice(-2);
    var tomorrowString = year2 + '-' + month2 + '-' + day2;

    const token = Cookies.get('hidocaccesstoken');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('https://localhost:7056/api/doctor/' + id).then((data) => {
            console.log(data.data);
            setDoctor(data.data);
        });
    }, []);
    useEffect(() => {
        axios.get('https://localhost:7056/api/doctor/schedule?date=' + tomorrowString).then((data) => {
            setData(data.data);
        });
    }, []);

    const showModal = async (item) => {
        const date = new Date(item.sDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateString = `${year}-${month}-${day}`;
        setItemTarger({ ...item, sDate: dateString });
        setIsModalOpen(true);
        // window.location.href = '/login';
    };
    const handleOk = async () => {
        try {
            await axios
                .get('https://localhost:7056/api/auth/login', {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                })
                .then((data) => {
                    if (data.status == 200) {
                        console.log(data.data);
                        return true;
                    } else {
                        window.location.href = '/login';
                    }
                });
        } catch (err) {
            console.log(err);
            window.location.href = '/login';
        }
        try {
            await axios
                .post(
                    'https://localhost:7056/api/Schedule/sign',
                    { Id: itemTarger.id },
                    {
                        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                    },
                )
                .then((data) => {
                    if (data.data.status) {
                        toast.success(data.data.message);
                    } else {
                        toast.warning(data.data.message);
                    }
                });
        } catch (err) {
            toast.error('Không thể đăng ký lịch');
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('doctorContainer')}>
            <ToastContainer></ToastContainer>
            <div className="left">
                <img src={'https://localhost:7056/static/' + doctor.link} />
                <span className="title">{hocvi[doctor.level] + doctor.name}</span>
                <div className={cx('hospital')}>
                    <FontAwesomeIcon icon={faHospital} />
                    <span className={cx('hospital_name')}>Bệnh viện chợ rẫy</span>
                </div>
                <div className={cx('location')}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className={cx('location_name')}>{doctor.hAddress}</span>
                </div>

                <span className="desc">{doctor.descript}</span>
            </div>
            <div className="right">
                {data.map((item, id) => {
                    return (
                        <div key={id}>
                            <div>
                                <table>
                                    <tr>
                                        <td className={cx('day')} style={{ fontSize: 14 }}>
                                            {item.day}
                                        </td>
                                        <td className={cx('day')} style={{ fontSize: 14 }}>
                                            {item.date}
                                        </td>
                                    </tr>
                                </table>
                                {/* {item.day} ({item.date}) */}
                            </div>
                            <div className={cx('listSign')}>
                                {item.schedules.map((item, index) => (
                                    <div
                                        key={index}
                                        className={colorDensity(item.registered, item.maxNumber)}
                                        onClick={() => {
                                            showModal(item);
                                        }}
                                    >
                                        {item.timeS.slice(0, -3) +
                                            ' - ' +
                                            item.timeE.slice(0, -3) +
                                            '  ' +
                                            item.registered +
                                            '/' +
                                            item.maxNumber}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal
                title="Bạn có chắc chắn muốn đăng ký lịch khám?"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Đăng ký lịch khám'}
                cancelText={'Hủy'}
                onCancel={handleCancel}
                className="modal_schedule"
                width={350}
            >
                <h6>Chi tiết lịch khám</h6>
                <div>
                    Bác sĩ chỉ định: <span>{hocvi[doctor.level] + doctor.name}</span>
                </div>
                <div style={{ marginTop: 5 }}>
                    Địa chỉ: <span>{doctor.hAddress}</span>
                </div>
                <div style={{ marginTop: 5 }}>
                    Ngày khám: <span id="item_sign_date">{itemTarger && itemTarger.sDate}</span>
                </div>
                <div style={{ marginTop: 5 }}>
                    Thời gian khám:{' '}
                    <span id="item_sign_time">{itemTarger && itemTarger.timeS + ' - ' + itemTarger.timeE}</span>
                </div>
            </Modal>
        </div>
    );
}

export default Doctor;
