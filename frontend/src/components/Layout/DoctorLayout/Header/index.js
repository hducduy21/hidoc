import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Images from '~/assets/Images';
import Search from '~/components/User/Search';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
    const user = useSelector((state) => state.User);

    return (
        <Navbar expand="lg" className={cx('wrapper_header')} fixed="top">
            <Container className={cx('container')}>
                <Navbar.Brand href="/home" className={cx('brand')}>
                    <img src={Images.logo} alt="img" className={cx('logo')}></img>
                </Navbar.Brand>
                <span>Hi Doctor!</span>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="#home">Hoàng Đức Duy</Nav.Link>
                        <Nav.Link href="/">Trang chủ</Nav.Link>
                        <Nav.Link href="#home">Đăng xuất</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
