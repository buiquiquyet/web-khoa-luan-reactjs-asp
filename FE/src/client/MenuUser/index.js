import classNames from "classnames/bind";
import styles from './MenuUser.module.scss'
import { Link } from "react-router-dom";
import {  SignOutIcon } from "./../Icon";

const cx = classNames.bind(styles)
function MenuUser() {
   
    return ( 
        <div to={''} className={cx('wrapper')} > 
            <div className={cx('content')}>
                <div className={cx('name')}>
                   <span></span>
                </div>
                <div className={cx('nickname')}>
                    <span></span>
                </div>
            </div>
            <div className={cx('user-item')}>
                {/* <Link to={'/adminAcount'} className={cx('item')} href="/">
                    <UserIcon/>
                    <span className={cx('item-text')}>Cá nhân</span>
                </Link> */}
                <Link to={'/adminLogin'} className={cx('item')} href="/">
                    <SignOutIcon classsName={'icon'}/>
                    <span  className={cx('item-text')}>Thoát</span>
                </Link>
            </div>
            
        </div>
     );
}

export default MenuUser;