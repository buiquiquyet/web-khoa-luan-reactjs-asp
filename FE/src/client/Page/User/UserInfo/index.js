import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';
import { Upload, Button, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles)
function UserInfo() {
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('form-create')}>
                <div className={cx('lable')}>Thông tin người dùng</div>
                <div className={cx('form-submit')}>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Họ và tên
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' required/>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Số điện thoại
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' required/>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Email
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' required/>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Địa chỉ
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' required/>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Năm sinh
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='date' />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Giới tính
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <div>
                        <Radio.Group className={cx('radio')}>
                            <Radio value="option1">Nam</Radio>
                            <Radio value="option2">Nữ</Radio>
                        </Radio.Group>
                        </div>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')} >
                            <div>
                                Hình ảnh
                                <span className={cx('require')}>*</span>
                            </div>
                            <span>:</span>
                        </span>

                        <Upload action="/upload.do" listType="picture-card" className={cx('form-upload')}>
                            <div >
                                <PlusOutlined  />
                                <div style={{ marginTop: 8}}>Tải file</div>
                            </div>
                        </Upload>
                    </div>
                    
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Mật khẩu
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' required/>
                    </div>
                    <div className={cx('form-button')}><Button type='primary'>Cập nhật</Button></div>
                </div>
            </div>
        </div>
     );
}

export default UserInfo;