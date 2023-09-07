import classNames from 'classnames/bind';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Images from '~/assets/Images';
import CardComponent from '../CardComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import style from './Search.scss';
const port = 8080;

const cx = classNames.bind(style);

function SearchResult() {
    let [category, setCategory] = useState([]);
    let [keyword, setKeyWord] = useState('');
    let [pricerange, setpricerange] = useState(0);
    let [sort, setSort] = useState('');
    let [bookResult, setbookResult] = useState([]);
    let [categoryId, setCategoryId] = useState(0);
    useEffect(() => {
        // axios
        //     .get('http://localhost:' + port + '/api/categories?page=0&size=20', {
        //         headers: { 'Content-Type': 'application/json' },
        //     })
        //     .then((data) => {
        //         let t = data.data.categories.content.map((el) => {
        //             return { id: el.id, name: el.name };
        //         });
        //         setCategory(t);
        //     });
    }, []);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const keyword = params.get('keyword') || '';
        const sort = params.get('sort') || '';
        const pricerange = params.get('index') || '';
        const categoryId = params.get('categoryId') || '';
        // axios
        //     .get(
        //         'http://localhost:' +
        //             port +
        //             '/api/products/search?page=1&size=20&keyword=' +
        //             keyword +
        //             '&sort=price,' +
        //             sort +
        //             '&index=' +
        //             pricerange +
        //             '&categoryId=' +
        //             categoryId,
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //         },
        //     )
        //     .then((data) => {
        //         if (data.data) setbookResult(data.data.products);
        //     });
        setKeyWord(keyword);
        setSort(sort);
        setpricerange(pricerange);
        setCategoryId(categoryId);
    }, []);

    const context = useSelector((state) => state.Language);
    let [search_list, setList] = useState({ sortby: 1, priceRange: 0, type: 0 });
    const setSortBy = (n) => {
        setList((pre) => {
            return { ...pre, sortby: n };
        });
    };
    const setPriceRange = (n) => {
        setList((pre) => {
            return { ...pre, priceRange: n };
        });
    };
    const setType = (n) => {
        setList((pre) => {
            return { ...pre, type: n };
        });
    };
    return (
        <Row className={cx('search_wrapper')}>
            <h3 className={cx('search_title')}>Kết quả tìm kiếm: </h3>
            <Col xl={12} className={cx('search_wrapper_detail')}>
                <div className={cx('search_detail')}>
                    <div className={cx('search_detail_sortby')}>
                        <span>Khoa:</span>
                        <select
                            name="search_sortby"
                            id="search_sortby"
                            onChange={(e) => {
                                window.location.href =
                                    '/search?keyword=' +
                                    keyword +
                                    '&sort=' +
                                    e.target.value +
                                    '&index=' +
                                    pricerange +
                                    '&categoryId=' +
                                    categoryId;
                            }}
                            value={sort}
                        >
                            <option value=""></option>
                            <option value="">Khoa Nội</option>
                            <option value="">Khoa Ngoại</option>
                            <option value="">Khoa Tai Mũi họng</option>
                        </select>
                    </div>
                    <div className={cx('search_detail_pricerange')}>
                        <span>Quận:</span>
                        <select name="search_pricerange" id="search_pricerange" value={pricerange}>
                            <option value=""></option>
                            <option value="1">Quận 1</option>
                            <option value="2">Quận 2</option>
                            <option value="3">Quận 3</option>
                            <option value="4">Quận 4</option>
                            <option value="5">Quận 5</option>
                            <option value="6">Quận 6</option>
                            <option value="7">Quận 7</option>
                            <option value="8">Quận 8</option>
                        </select>
                    </div>
                </div>
                <div className={cx('search_infor')}>
                    <div className={cx('search_infor_detail')}></div>
                </div>
            </Col>
            <Col xl={12} className={cx('search_wrapper_result')}>
                <div className={cx('search_result')}>
                    <CardComponent
                        type={1}
                        name={'Phạm Mai Hoa'}
                        descript={
                            'Chuyên gia trên 35 năm kinh nghiệm trong lĩnh vực bệnh lý Tiêu hóa, Chuyên gia đầu ngành trong lĩnh vực bệnh lý Tiêu hóa, Nguyên Giám đốc Bệnh viện Đại học Y Hà Nội'
                        }
                        level={3}
                        img={Images.bstest}
                        id={'2c10d6b1-ad21-42f4-8c3b-45c6252bd9e1'}
                        hid={2}
                        width={300}
                    />
                    <CardComponent
                        type={1}
                        name={'Nguyễn Hữu Thọ'}
                        descript={
                            'Chuyên gia trên 35 năm kinh nghiệm trong lĩnh vực bệnh lý Tiêu hóa, Chuyên gia đầu ngành trong lĩnh vực bệnh lý Tiêu hóa, Nguyên Giám đốc Bệnh viện Đại học Y Hà Nội'
                        }
                        level={2}
                        img={Images.bstest}
                        id={'2c10d6b1-ad21-42f4-8c3b-45c6252bd9e1'}
                        hid={2}
                        width={300}
                    />

                    {/* {bookResult.map((e, i) => {
                        return (
                            <BookCard
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                author={e.author.name}
                                price={e.price}
                                authorID={e.author.id}
                                img={Images.sachtemp}
                                width="true"
                            />
                        );
                    })} */}
                </div>
            </Col>
        </Row>
    );
}

export default SearchResult;
