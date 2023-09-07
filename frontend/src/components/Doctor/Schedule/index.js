import classNames from 'classnames';
import style from './Schedule.scss';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);
const override: CSSProperties = {
    display: 'block',
    margin: '30px auto',
    borderColor: '#009432',
    borderWidth: '5px',
};
const customStyles = {
    content: {
        width: '150px',
        height: '150px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'grba(0,0,0,0)',
        backgroundColor: 'rgba(209, 209, 209,0.0)',
        padding: 0,
        marginTop: '10px',
        border: 'none',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(209, 209, 209,0.4)',
    },
};

function colorDensity(a, b) {
    if (a === b) return 'noDensity';
    if (a / b >= 0.8) return 'redDensity';
    if (a / b >= 0.5) return 'yellowDensity';
    if (a / b >= 0.3) return 'greenDensity';
    return 'whiteDensity';
}
function convertToDoubleDigit(num) {
    return num < 10 ? `0${num}` : `${num}`;
}
function Schedule() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const modal = searchParams.get('modal') || false;
    console.log(modal);
    const [data, setData] = useState([]);
    const [errorMessage, setErorr] = useState(<></>);
    const [isModalOpen, setIsModalOpen] = useState(modal);
    const [update, setUpdate] = useState(false);

    var today = new Date();
    var year1 = today.getFullYear();
    var month1 = ('0' + (today.getMonth() + 1)).slice(-2);
    var day1 = ('0' + today.getDate()).slice(-2);
    let todayString = year1 + '-' + month1 + '-' + day1;

    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var year2 = tomorrow.getFullYear();
    var month2 = ('0' + (tomorrow.getMonth() + 1)).slice(-2);
    var day2 = ('0' + tomorrow.getDate()).slice(-2);
    var tomorrowString = year2 + '-' + month2 + '-' + day2;

    useEffect(() => {
        axios.get('https://localhost:7056/api/doctor/schedule?date=' + todayString).then((data) => {
            setData(data.data);
        });
    }, [update]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let date = document.getElementById('time_date');
        let hour_start = document.getElementById('time_start_hour');
        let min_start = document.getElementById('time_start_min');
        let hour_end = document.getElementById('time_end_hour');
        let min_end = document.getElementById('time_end_min');
        let quantity = document.getElementById('schedule_quantity');
        if (date.value && hour_start.value && hour_end.value && min_end.value && min_start.value) {
            setErorr(<></>);
            console.log(date.value);
            console.log(convertToDoubleDigit(hour_start.value) + ':' + convertToDoubleDigit(min_start.value) + ':00');
            console.log(quantity.value);
            openModalLoad();
            try {
                const response = await axios.post('https://localhost:7056/api/doctor/schedule', {
                    Username: '32b00ee1-ae52-4a16-9c86-a14c713d2562',
                    SDate: date.value,
                    TimeS: convertToDoubleDigit(hour_start.value) + ':' + convertToDoubleDigit(min_start.value) + ':00',
                    TimeE: convertToDoubleDigit(hour_end.value) + ':' + convertToDoubleDigit(min_end.value) + ':00',
                    MaxNumber: quantity.value,
                });
                console.log(response.data);
                closeModalLoad();
                setUpdate(!update);
                toast.success('Thêm thành công');
                setIsModalOpen(false);
            } catch (error) {
                closeModalLoad();
                toast.error('Lỗi: ' + error);
            }
        } else {
            setErorr(<span style={{ color: 'red', width: '100%' }}>Hãy nhập đầy đủ giá trị</span>);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [modalLoadIsOpen, setLoadIsOpen] = useState(false);

    function openModalLoad() {
        setLoadIsOpen(true);
    }

    function closeModalLoad() {
        setLoadIsOpen(false);
    }

    return (
        <div className={cx('Schedule_wrapper')}>
            <ToastContainer />
            <div className={cx('Schedule_day')}>
                <Table>
                    {data.map((e, ind) => {
                        let t = e.schedules.map((element, ind) => {
                            return (
                                <td key={ind}>
                                    <span className={cx(colorDensity(element.registered, element.number))}>
                                        {element.timeS.slice(0, -3) +
                                            ' - ' +
                                            element.timeE.slice(0, -3) +
                                            '  ' +
                                            element.registered +
                                            '/' +
                                            element.maxNumber}
                                    </span>
                                </td>
                            );
                        });
                        return (
                            <tr key={ind}>
                                <td className={cx('noneDestiny')}>
                                    {e.day} ({e.date})
                                </td>
                                {t}
                            </tr>
                        );
                    })}
                </Table>
            </div>
            <div className="Schedule_add" onClick={showModal}>
                <Button variant="success">Thêm lịch mới</Button>
            </div>
            <Modal
                title="Thêm lịch mới"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Thêm lịch khám'}
                cancelText={'Hủy'}
                onCancel={handleCancel}
                className="modal_schedule"
                width={350}
            >
                <form>
                    <div>
                        <label>Ngày:</label>
                        <input
                            type="date"
                            className="schedule_add_date"
                            style={{ marginLeft: 20 }}
                            min={tomorrowString}
                            id="time_date"
                        ></input>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <label>Giờ bắt đầu:</label>
                        <input
                            type="number"
                            id="time_start_hour"
                            min={5}
                            max={23}
                            style={{ width: 50, height: 25, marginLeft: 20 }}
                        ></input>
                        <span style={{ marginLeft: 5 }}>:</span>
                        <input
                            type="number"
                            id="time_start_min"
                            min={0}
                            max={59}
                            style={{ width: 50, height: 25, marginLeft: 5 }}
                        ></input>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Giờ kết thúc:</label>
                        <input
                            type="number"
                            id="time_end_hour"
                            min={5}
                            max={23}
                            style={{ width: 50, height: 25, marginLeft: 17 }}
                        ></input>
                        <span style={{ marginLeft: 5 }}>:</span>
                        <input
                            type="number"
                            id="time_end_min"
                            min={0}
                            max={59}
                            style={{ width: 50, height: 25, marginLeft: 5 }}
                        ></input>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Số lượng bệnh nhân tối đa:</label>
                        <input
                            type="number"
                            className="schedule_add_date"
                            min={5}
                            id="schedule_quantity"
                            style={{ width: 50, height: 25, marginLeft: 20 }}
                        ></input>
                    </div>
                    <div style={{ marginTop: 5 }} id="">
                        <i style={{ color: 'red', width: '100%' }}>
                            Lưu ý: Khi thêm mới lịch sẽ không thể thay đổi, hãy đảm bảo lịch trình khi thêm
                        </i>
                    </div>
                    <div style={{ marginTop: 5 }} id="">
                        {errorMessage}
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={modalLoadIsOpen}
                onRequestClose={closeModalLoad}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
            >
                <HashLoader
                    color={'#009432'}
                    loading={true}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Modal>
        </div>
    );
}

export default Schedule;
