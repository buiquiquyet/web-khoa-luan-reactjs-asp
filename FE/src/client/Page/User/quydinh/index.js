import styles from './quydinh.module.scss'
import classNames from "classnames/bind";
import pdfFile from './../../../Image/pdf.pdf'
const cx = classNames.bind(styles)

function quydinh() {
    return ( 
        <div className={cx('wrapper')}>
             <div className={cx('postIframe')}>
                <iframe
                    src={pdfFile}
                    title="pdfFile" 
                />
             </div>
        </div>
     );
}

export default quydinh;