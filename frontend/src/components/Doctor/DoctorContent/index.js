import Slider from '~/components/Doctor/Slider';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import styles from './DoctorContent.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseMedical, faCalendarDay, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function DoctorContent() {
    return (
        <div className={cx('DoctorContent')}>
            <Slider />
            <Container>
                <Row className="container">
                    <Col xl={8} className={cx('Doctor_row1')}>
                        <Row>
                            <Col xl={3} className="Doctor_box">
                                <Link to={'/d/exam'} className={cx('box_function', 'box_function--red')}>
                                    <FontAwesomeIcon
                                        className={cx('doctor_function_box_icon')}
                                        icon={faSuitcaseMedical}
                                    />
                                    <div>Khám ngay</div>
                                </Link>
                            </Col>
                            <Col xl={3} className="Doctor_box">
                                <Link to={'/d/schedule'} className={cx('box_function', 'box_function--green')}>
                                    <FontAwesomeIcon className={cx('doctor_function_box_icon')} icon={faCalendarDay} />
                                    <div>Lịch khám</div>
                                </Link>
                            </Col>
                            <Col xl={3} className="Doctor_box">
                                <Link className={cx('box_function', 'box_function--red')}>
                                    <FontAwesomeIcon className={cx('doctor_function_box_icon')} icon={faNewspaper} />
                                    <div>Tạo tin tức</div>
                                </Link>
                            </Col>
                            <Col xl={3} className="Doctor_box">
                                <Link
                                    to={'/d/schedule?modal=true'}
                                    className={cx('box_function', 'box_function--green')}
                                >
                                    <FontAwesomeIcon
                                        className={cx('doctor_function_box_icon')}
                                        icon={faSuitcaseMedical}
                                    />
                                    <div>Đăng ký lịch khám</div>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={4} className={cx('Doctor_row2')}>
                        <div className={cx('Doctor_row2_title')}>Thông báo</div>
                        <div className={cx('Doctor_row2_list', 'list_notif')}>
                            <div className={cx('doctor_notif')}>
                                <div className={cx('notif_title')}>
                                    Nguyễn Ngọc Toàn đã đăng ký khám vào ngày 3/4/2023
                                </div>
                                <div className={cx('notif_date')}>23/03/2023</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DoctorContent;
