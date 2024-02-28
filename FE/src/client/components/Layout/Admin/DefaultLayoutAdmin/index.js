
import classNames from "classnames/bind";
import styles from './DefaultLayoutAdmin.module.scss'
import SidebarAdmin from "../component/SidebarAdmin";
import HeaderAdmin from "../component/HeaderAdmin";
const cx = classNames.bind(styles)
function DefaultLayoutAdmin({children}) {
    
    return ( 
        <div className={cx('wrapper')}>
            <SidebarAdmin/>
            <div className={cx('container')}>
                <HeaderAdmin/>   
                <div className={cx('content')}>
                    { children }
                </div>
            </div>
        </div>
     );
}

export default DefaultLayoutAdmin;