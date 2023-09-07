import { Card, Button } from 'react-bootstrap';
import Images from '~/assets/Images';
import styles from './CardComponent.scss';
import classNames from 'classnames';
const cx = classNames.bind(styles);
const hocvi = { 1: 'Bác sỹ ', 2: 'Thạc sỹ ', 3: 'Tiến sỹ ', 4: 'Giáo sư ' };

function CardComponent({ type, name = '', img, descript = '', level = 1, id, hid = '', width = 'none' }) {
    let classWidth = width === 'none' ? {} : { width: width };
    if (type === 1)
        return (
            <div className={cx('wrapper_card_1')} style={classWidth}>
                <Card className={cx('wrapper_card')}>
                    <Card.Img variant="top" src={img || Images.logo} className={cx('img')} />
                    <Card.Body className={cx('body')}>
                        <Card.Title className={cx('title')}>
                            <p>{hocvi[level] + name}</p>
                        </Card.Title>
                        <Card.Text className={cx('desc')}>{descript}</Card.Text>
                        <Button
                            variant="success"
                            className={cx('btn_dat')}
                            onClick={() => {
                                window.location.href = '/doctor/' + id;
                            }}
                        >
                            Đặt khám ngay
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    else
        return (
            <div className={cx('wrapper_card_2')} style={classWidth}>
                <Card
                    className={cx('wrapper_card')}
                    border="light"
                    onClick={() => {
                        window.location.href = '/hospital/' + hid;
                    }}
                >
                    <Card.Img
                        variant="top"
                        src={img || Images.logo}
                        className={cx('img', 'rounded-0', 'hospital_img')}
                    />
                    <Card.Title className={cx('card_title')}>{name}</Card.Title>
                </Card>
            </div>
        );
}

export default CardComponent;
