import styles from './Footer.module.scss'
import classNames from "classnames/bind";
import facebook from '../../../../../Image/facebook.png'
import youtube from '../../../../../Image/youtube.png'
import { LocationIcon, PhoneIcon, WorldIcon,EmailIcon, FaxIcon } from '../../../../../Icon';
const cx = classNames.bind(styles)
function Footer() {
    return ( 
        <footer className={cx('footer','container-fluid row')} style={{padding:'20px 40px'}}>
            <div className={cx('footer-content','col-12 col-lg-9')}>
                <span className={cx('footer-text')}>
                    TRƯỜNG ĐẠI HỌC SAO ĐỎ
                </span>
                <span className={cx('footer-infor')}>
                   <LocationIcon classsName={cx('footer-icon')}/> Địa chỉ: Số 76, Nguyễn Thị Duệ, Thái Học 2, P. Sao Đỏ, TP. Chí Linh, tỉnh Hải Dương.
                </span>
                <span className={cx('footer-infor')}>
                   <PhoneIcon classsName={cx('footer-icon')}/> Điện thoại: (0220) 3882 269
                </span>
                <span className={cx('footer-infor')}>
                   <FaxIcon classsName={cx('footer-icon')}/> Fax: (0220) 3882 921
                </span>
                <span className={cx('footer-infor')}>
                  <EmailIcon classsName={cx('footer-icon')}/>  Email: info@saodo.edu.vn
                </span>
                <span className={cx('footer-infor')}>

                  <WorldIcon classsName={cx('footer-icon')}/>  Website: http://saodo.edu.vn
                </span>
            </div>
            <div className={cx('footer-social','col-12 col-lg-3')}>
                <span>MẠNG XÃ HỘI</span>
                <div className={cx('socaial-item')}>
                    <a href="https://www.facebook.com/TruongDHSaoDo"><img src={facebook} alt=""/></a>
                    <a href="https://www.youtube.com/watch?v=D2siV-h18KI"> <img src={youtube} alt=""/></a> 
                </div>
            </div>
        </footer>
     );
}

export default Footer;