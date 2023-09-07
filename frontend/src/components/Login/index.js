import styles from './Login.scss';
// import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useState, CSSProperties } from 'react';
import { HashLoader } from 'react-spinners';
import Cookies from 'js-cookie';

import axios from 'axios';
const cx = classNames.bind(styles);

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

function validateLogin(email, pass) {
    if (email.value.length === 0) {
        toast.error('Vui lòng nhập email!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        return false;
    } else if (pass.value.length === 0) {
        toast.error('Vui lòng nhập mật khẩu!');
        return false;
    } else if (pass.value.length < 5) {
        toast.error('Mật khẩu phải dài hơn hoặc bằng 5 ký tự!');
        return false;
    } else {
        return true;
    }
}

Modal.setAppElement('#root');
function Login() {
    // const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={cx('login_wrapper')}>
            <form>
                <h3 style={{ marginBottom: '25px' }}>Đăng nhập</h3>
                <table>
                    <tr>
                        <td>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </td>
                        <td className="widthInput">
                            <input type="text" placeholder="Email" style={{ width: '100%' }} id="email" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FontAwesomeIcon icon={faLock} />
                        </td>
                        <td>
                            <input type="password" placeholder="Mật khẩu" style={{ width: '100%' }} id="pass" />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <button
                                type="button"
                                className={cx('btn_log')}
                                onClick={() => {
                                    window.location.href = '/signup';
                                }}
                            >
                                Đăng ký
                            </button>
                            <button
                                type="button"
                                className={cx('btn_log')}
                                onClick={() => {
                                    let email = document.getElementById('email');
                                    let pass = document.getElementById('pass');
                                    if (validateLogin(email, pass)) {
                                        let request = { email: email.value, password: pass.value };
                                        openModal();
                                        axios
                                            .post('https://localhost:7056/api/auth/login', request)
                                            .then((data) => {
                                                if (data.status === 200) {
                                                    if (data.data.status) {
                                                        toast.success('Đăng nhập thành công');
                                                        Cookies.set('hidocaccesstoken', data.data.data.token, {
                                                            expires: 30,
                                                        });
                                                        setTimeout(() => {
                                                            window.location.href = '/';
                                                        }, 5000);
                                                    } else {
                                                        closeModal();
                                                        toast.warn('Tên đăng nhập hoặc mật khẩu không đúng');
                                                    }
                                                } else {
                                                    closeModal();
                                                    toast.error('Không thể đăng nhập(' + data.status + ')');
                                                }
                                            })
                                            .catch((e) => {
                                                closeModal();
                                                toast.error('Lỗi: ' + e);
                                            });
                                    }
                                }}
                            >
                                Đăng nhập
                            </button>
                        </td>
                    </tr>
                </table>
            </form>

            {/* <div>
                <img src="" />
            </div> */}
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
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

export default Login;
