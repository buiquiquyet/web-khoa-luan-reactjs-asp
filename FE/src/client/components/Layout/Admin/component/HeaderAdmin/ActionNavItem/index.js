import classNames from "classnames/bind";
import style from './ActionNavItem.module.scss'
import MessageUser from "./MessageUser";
import DayOfWeek from "./Date";
import logoImg from './../../../../../../Image/logo.png'
const cx = classNames.bind(style)

function ActionNavItem() {
    return ( 
        <div className={cx('action')}>
            <DayOfWeek/>
            <MessageUser >
                <div className={cx('button-bell')}>
                   <img alt="Img" className={cx('user')} src={logoImg}/>
                </div>
            </MessageUser>
        </div>
     );
}

export default ActionNavItem;