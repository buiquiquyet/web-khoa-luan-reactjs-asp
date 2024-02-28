
import classNames from "classnames/bind";
import styles from './AdminLogin.module.scss'
import {  useRef } from "react";
import * as ServiceUser from './../apiServieces/UserApi'
const cx = classNames.bind(styles)
function AdminLogin() {
    
    const inputUser = useRef()
    const inputPass = useRef()
    const warning = useRef()
    
    const handleLogin = async () => {
       
        if(inputUser.current.value ==='' || inputPass.current.value === '') {
            warning.current.innerHTML = 'Vui lòng nhập đẩy đủ thông tin trước khi đăng nhập'
            warning.current.style.display = 'block'
        } else {
            const rs = await ServiceUser.GetByUserName(inputUser.current.value, inputPass.current.value)
                if(rs) {
                    if(rs.UserGroup === 'ADMIN'){
                        window.location.href = '/admin';
                    }else {
                        warning.current.innerHTML = 'Tên truy cập hoặc mật khẩu không chính xác'
                        warning.current.style.display = 'block'
                    }
                }else {
                    warning.current.innerHTML = 'Tên truy cập hoặc mật khẩu không chính xác'
                    warning.current.style.display = 'block'
                }
            }
           
        }

    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('form')}>
            <img className={cx('form-img')} alt="img" src="	http://esdu.saodo.edu.vn//templates/saodo/images/logo.png"/>
            <span className={cx('fomr-title')}>ĐĂNG NHẬP HỆ THỐNG</span>
            <div className={cx('form-info')}>
                <div className={cx('user-box')}>
                    <input ref={inputUser} required className={cx('form-input')} type="text" />
                    <label>Tên đăng nhập</label>
                </div>
                <div className={cx('user-box')}>
                    <input ref={inputPass}  required className={cx('form-input')} type="password" />
                    <label>Mật khẩu</label>
                </div>

            </div>
            <div ref={warning} className={cx('warning')}></div>
            <div className={cx('form-button')}>
                <button onClick={handleLogin} className={cx('button')}>ĐĂNG NHẬP</button>
            </div>
        </div>
    </div>
     );
}

export default AdminLogin;