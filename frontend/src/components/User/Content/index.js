import Slider from '~/components/User/Slider';
import Slick from '../Slick';
import styles from './Content.scss';
import classNames from 'classnames';
import axios from 'axios';
import Images from '~/assets/Images';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function Content() {
    let [databs, setDataBS] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7056/api/doctor/top10').then((data) => {
            setDataBS(data.data);
        });
    }, []);
    let [databv, setDataBV] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7056/api/hospitals/popular?page=1&pageSize=5&desc=true').then((data) => {
            setDataBV(data.data);
        });
    }, []);
    return (
        <div className={cx('container')}>
            <Slider />
            <Slick type={1} list={databs} />
            <Slick type={2} list={databv} />
        </div>
    );
}

export default Content;
