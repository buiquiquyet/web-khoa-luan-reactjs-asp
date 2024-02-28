import classNames from "classnames/bind";
import styles from './Header.module.scss';
import NavMenu from "./NavMenu";
import Image from '../../../../../Image/logo.png'
import { UserIcon } from "../../../../../Icon";
import { useRef } from "react";
import * as ServiceUser from './../../../../../apiServieces/UserApi'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { SignOutIcon } from "../../../../../Icon";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function Header() {
    const model = useRef()
    const userNameRef = useRef()
    const passRef = useRef()
    const handleModel = () => {
        model.current.style.display = 'block'
        userNameRef.current.focus()
    }
    const handleModelClose = () => {
        model.current.style.display = 'none'
    }
    const handleLogOut = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('name')
        localStorage.removeItem('userId');
        localStorage.removeItem('statusLogin')
        localStorage.removeItem('UserGroup')
        localStorage.removeItem('email')
        userNameRef.current.value = ''
        passRef.current.value = ''
        window.location.reload()
    }
    const handleLogin = async () => {
       
        const rs = await ServiceUser.GetByUserName(userNameRef.current.value, passRef.current.value)
        if(rs) {
            localStorage.setItem('statusLogin', 'login')
            localStorage.setItem('name', rs.Name);
            localStorage.setItem('userId', rs.UserId);
            localStorage.setItem('UserGroup', rs.UserGroup);
            localStorage.setItem('email', rs.Email);
            NotificationManager.success('Đăng nhập thành công', 'Thành công', 1000);
            model.current.style.display = 'none'
            window.location.reload()
        }else {
            NotificationManager.error("Sai tên đăng nhập hoặc mật khẩu", 'Lỗi', 1000);
        }
    }
    return (
        <>
        <div className={cx('modal')} ref={model} >
            <div onClick={handleModelClose} className={cx('overflow')} id="overflow"></div>
            <div   className={cx('modal-login')}>
                <div className={cx('login-text')}>Đăng nhập</div>
                <div className={cx('login-input')}>
                    <label >Tên đăng nhập</label>
                    <input ref={userNameRef} required type="text" />
                </div>
                <div className={cx('login-input')}>
                    <label >Mật khẩu</label>
                    <input  ref={passRef}  required type="text" />
                </div>
                <div className={cx('login-button')}>
                    <button onClick={handleLogin}>Đăng nhập</button>
                </div>
            </div>
        </div> 
        <header className={cx('header')}>
            <NotificationContainer/>
            <div className={cx('row')}>
                <Link to={'/'} className={cx('header-content')}>
                    <img src={Image} className={cx('header-logo')} alt="img"/>
                    <div className={cx('header-text')}>
                        <span className={cx('header-textMain')}>CỔNG TRAO ĐỔI KHÓA LUẬN TỐT NGHIỆP</span>
                        <span className={cx('header-textSm')}>Trường đại học Sao Đỏ</span>
                    </div>
                </Link>
                <div className={cx('header-login')}  >
                    {localStorage.getItem('statusLogin') === 'login' ? 
                    <div className={cx('log-out')}>
                        <Link to={'/userInfo'}  className={cx('user')}><UserIcon/>{localStorage.getItem('name')}</Link> 
                        <div className={cx('logOut-div')} onClick= {handleLogOut}>
                            <SignOutIcon  classsName={cx('log-icon')}/>
                        </div>
                    </div>
                    : <div onClick= {handleModel} >
                        <UserIcon classsName={cx('header-login--button')}/>    
                    </div>}
                </div>
            </div>
            <NavMenu  />
        </header>
        </>
        );
}

export default Header;