import styles from "./SignUp.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey, faCakeCandles, faVenusMars, faLocationDot, faPhone,faBook } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash,faEye } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

const cx = classNames.bind(styles);


function handleValidate(name, email, pass, repass, birthday, phone,address){

    if(name.value.length === 0 ){
        toast.error("Vui lòng nhập mật khẩu");
        return false;
    }
    if(email.value.length === 0){
        toast.error("Vui lòng nhập email");
        return false;
    }
    if(pass.value.length === 0){
        toast.error("Vui lòng nhập mật khẩu");
        return false;
    }
    if(repass.value.length === 0){
        toast.error("Vui lòng nhập lại mật khẩu");
        return false;
    }
    if(pass.value !== repass.value ){
        toast.error("Mật khẩu không đúng, vui lòng nhập lại");
        return false;
    }
    if(birthday.value.length === 0){
        toast.error("Vui lòng nhập ngày sinh");
        return false;
    }
    if(phone.value.trim().length === 0){
        toast.error("Vui lòng nhập số điện thoại");
        return false;
    }
    if(phone.value.trim().length !== 10){
        toast.error("Vui lòng nhập đúng số điện thoại");
        return false;
    }
    for(let i = 0; i<phone.value.trim().length; i++){
        if(phone.value.trim().charCodeAt(i)<48||phone.value.trim().charCodeAt(i)>57){
            console.log(phone.value.trim().charCodeAt(i)+ "-")
            toast.error("Số điện thoại không bao gồm chữ và các ký tự đặc biệt");
            return false;
        }
    }
    
    if(address.value.length === 0){
        toast.error("Vui lòng nhập địa chỉ");
        return false;
    }
    return true;
}

function SignUp() {
    const [yPass, setYPass] = useState({
        icon: faEyeSlash,
        status: false
    })
    const [yPassF, setYPassF] = useState({
        icon: faEyeSlash,
        status: false
    })
    return ( 
        <div className={cx("signup_wrapper")}>
            
            <form>  
                <h3  style={{marginBottom: "25px"}}>Đăng ký</h3>
                <table>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser}/></td>
                        <td className="widthInput"><input type="text" placeholder="Họ tên" style={{width: "100%"}} id="name" name="name"/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEnvelope}/></td>
                        <td><input type="text" placeholder="Email" style={{width: "100%"}} id="email" name="email"/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faLock}/></td>
                        <td>
                            <input type="password" placeholder="Mật khẩu" style={{width: "90%"}} id="pass" name="pass"/>
                            <FontAwesomeIcon icon={yPass.icon} style={{width: "6%",paddingLeft: "2px"}} onClick={()=>{
                                if(yPass.status===false){
                                    setYPass({icon: faEye,status: true})
                                    document.getElementById("pass").setAttribute("type","text")
                                }else{
                                    setYPass({icon: faEyeSlash,status: false})
                                    document.getElementById("pass").setAttribute("type","password")
                                }
                                
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faKey}/></td>
                        <td>
                            <input type="password" placeholder="Nhập lại mật khẩu" style={{width: "90%"}} id="repass" name="repass" />
                            <FontAwesomeIcon icon={yPassF.icon} style={{width: "6%",paddingLeft: "2px"}} onClick={()=>{
                                if(yPassF.status===false){
                                    setYPassF({icon: faEye,status: true})
                                    document.getElementById("repass").setAttribute("type","text")
                                }else{
                                    setYPassF({icon: faEyeSlash,status: false})
                                    document.getElementById("repass").setAttribute("type","password")
                                }
                                
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faCakeCandles}/></td>
                        <td><input type="text" placeholder="Ngày sinh" id="birthday" name="birthday" style={{width: "100%"}}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faVenusMars}/></td>
                        <td>
                            <span><label for="male">Nam</label><input type="radio" id="male" name="gender" value="male" checked/></span>
                            <span className="pd"><label for="female">Nữ</label><input type="radio" id="female" name="gender" value="female"/></span>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faPhone}/></td>
                        <td><input type="text" placeholder="Số điện thoại" id="phone" name="phone"  style={{width: "100%"}}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faLocationDot}/></td>
                        <td><input type="text" placeholder="Địa chỉ" id="address" name="address" style={{width: "100%"}}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faBook}/></td>
                        <td><textarea value="Nhập lịch sử bệnh lý" id="h_history" name="h_history" style={{width: "100%"}}></textarea></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button className={cx('btn_log')} onClick={()=>{
                            let name  = document.getElementById("name")
                            let email  = document.getElementById("email")
                            let pass  = document.getElementById("pass")
                            let repass  = document.getElementById("repass")
                            let birthday  = document.getElementById("birthday")
                            let male  = document.getElementById("male")
                            let phone  = document.getElementById("phone")
                            let address  = document.getElementById("address")
                            let h_history  = document.getElementById("h_history")
                            
                            handleValidate(name, email, pass, repass, birthday, phone,address)
                        }} type="button">Đăng ký</button>
                        <button  className={cx('btn_log')} type="button" onClick={()=>{window.location.href="/login"}}>Đăng nhập</button></td>
                        
                    </tr>
                </table>
            </form>
            <ToastContainer />
        </div>
     );
}

export default SignUp;