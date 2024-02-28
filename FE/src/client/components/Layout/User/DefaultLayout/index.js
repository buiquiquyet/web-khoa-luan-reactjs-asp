import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from './DefaultLayout.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function DefaultLayout({children}) {
    return ( 
       
        <div className={cx('wrapper')}>
            <Header/>
            {children}
            <Footer/>
        </div>
        
       
     );
}

export default DefaultLayout;