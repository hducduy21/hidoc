import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Images from '~/assets/Images';
import Search from '~/components/User/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Header.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header() {
    let [list, setList] = useState([]);
    let [Account, setAccount] = useState({ name: '', email: '', id: '' });
    useEffect(() => {
        let t = Cookies.get('hidocaccesstoken');
        if (t) {
            axios
                .get('https://localhost:7056/api/auth/login', {
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t },
                })
                .then((data) => {
                    if (data.status == 200) {
                        setAccount({ name: data.data.data.name, email: data.data.data.email, id: data.data.data.id });
                    } else {
                        setAccount({ name: '', email: '', id: '' });
                    }
                })
                .catch((err) => {
                    setAccount({ name: '', email: '', id: '' });
                });
        }
    }, []);
    useEffect(() => {
        axios.get('https://localhost:7056/api/Department').then((data) => {
            setList(data.data);
        });
    }, []);
    return (
        <Navbar expand="lg" className={cx('wrapper_header')} fixed="top">
            <Container className={cx('container')}>
                <Navbar.Brand href="/home" className={cx('brand')}>
                    <img src={Images.logo} alt="img" className={cx('logo')}></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Search />
                    </Nav>
                    <Nav>
                        <Nav.Link href="#home">Bác sỹ</Nav.Link>
                        <Nav.Link href="#home">Bệnh viện/phòng khám</Nav.Link>

                        <NavDropdown title="Chuyên khoa" id="dropdown-menu-align-end">
                            {list &&
                                list.map((e, id) => {
                                    console.log(e.name);
                                    return (
                                        <NavDropdown.Item href="#action/3.1" key={id}>
                                            {e.name}
                                        </NavDropdown.Item>
                                    );
                                })}
                        </NavDropdown>
                        <NavDropdown title="Khác" id="dropdown-menu-align-end">
                            <NavDropdown.Item href="#action/3.1">Đăng ký đối tác</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Cho tổ chức</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Hỗ trợ</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <Nav.Link href={Account.id === '' ? '/login' : '/profile'} className={cx('login')}>
                            <span>
                                {Account.name === ''
                                    ? 'Đăng nhập'
                                    : Account.name.split(' ')[Account.name.split(' ').length - 1]}
                            </span>
                            {Account.id === '' ? '' : <FontAwesomeIcon icon={faUser} style={{ marginLeft: '8px' }} />}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
