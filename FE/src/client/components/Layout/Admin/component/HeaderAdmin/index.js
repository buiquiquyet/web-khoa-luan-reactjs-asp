
import classNames from "classnames/bind";
import styles from './HeaderAdmin.module.scss'
import ActionNavItem from "./ActionNavItem";

const cx  = classNames.bind(styles)
function HeaderAdmin() {
    return ( 
        <div className={cx('wrapper')}>
            <div >
                {/* <input className={cx('input')} placeholder="Search for Result..."/>
                <button className={cx('search-button')}>
                <SearchIcon/>  
                </button> */}
            </div>  
            <ActionNavItem/>
        </div>
     );
}

export default HeaderAdmin;