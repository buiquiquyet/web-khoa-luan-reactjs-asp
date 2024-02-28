import classNames from 'classnames/bind';
import styles from './AdminCreateEditUser.module.scss';
import { Select, Button, Radio } from 'antd';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as ServiceApiDeparment from './../../../apiServieces/Deparment'
import { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from "../../../../App"; 
import * as ServiceApiClass from './../../../apiServieces/ClassApi'
import * as ServiceApiSpecialized from './../../../apiServieces/Specialized'
import * as ServiceApiUser from './../../../apiServieces/UserApi'
import { useParams } from 'react-router-dom';
import UserImg from '../../../Image/user.png'
const cx = classNames.bind(styles)
const { Option } = Select;
function AdminCreateEditUser() {
    const type = useContext(MyContext)
    const { idUser } = useParams()
    const [infoEdit, setInfoEdit] = useState([]);
    const [imgUrl, setimgUrl] = useState({
        imgFile: '',
        imgSrc: UserImg,
    });
    const [deparment, setDeparment] = useState([]);
    const [classes, setClasses] = useState([]);
    const [speciolized, setSpeciolized] = useState([]);
    const [deparmentSelect, setDeparmentSelect] = useState([]);
    const [sex, setSex] = useState(null)
    const [chucvu, setChucvu] = useState(null)
    const [classesSelect, setClassesSelect] = useState([]);
    const [speciolizedSelect, setSpeciolizedSelect] = useState([]);
    const fullnameRef = useRef(null)
    const phoneRef = useRef(null)
    const emailRef = useRef(null)
    const addressRef = useRef(null)
    const birthRef = useRef(null)
    const usenameRef = useRef(null)
    const passwordRef = useRef(null) 
    let isEmptyField = false;
    useEffect( () => {
       if(type === 'AdminEditUser' && Object.keys(infoEdit).length > 0) {
        fullnameRef.current.value = infoEdit?.Name;
        phoneRef.current.value = infoEdit?.PhoneNumber;
        emailRef.current.value = infoEdit?.Email;
        addressRef.current.value = infoEdit?.Address;
        birthRef.current.value = ConvertDate();
        phoneRef.current.value = infoEdit?.PhoneNumber;
        setSex(infoEdit?.Sex)
        setChucvu(infoEdit?.UserGroup)
        setDeparmentSelect(infoEdit?.DepartmentId)
        handleSelectClassSpecialized(infoEdit.DepartmentId, infoEdit.ClassId)
        setSpeciolizedSelect(infoEdit.SpecializedId)
        setClassesSelect(infoEdit.ClassId)
        usenameRef.current.value = infoEdit?.Username;
        passwordRef.current.value = infoEdit?.Password;
        setimgUrl(prev => ({
            ...prev,
            imgSrc: infoEdit?.Image ? `https://localhost:7225/StaticImages/${infoEdit?.Image}` : UserImg
        }) )
       }
    }, [infoEdit]);
    useEffect(() => {
       if(type === 'AdminEditUser') {
            fectApiEditGetUser(idUser)   
       } 
        fetchApiDeparment()
    }, [type])
    const ConvertDate = () => {
        const dateOfBirth = infoEdit?.DateOfBirth ? new Date(infoEdit.DateOfBirth) : null;
        const formattedDateOfBirth = dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '';
        return formattedDateOfBirth
    }
    //get only username
    const fecthApiGetOnlyByNameUser = async (name) => {
        try {
            const rs = await ServiceApiUser.GetOnlyByName(name)
            return rs
        } catch (error) {
            throw error
        }
    }
    //edit getId
    const fectApiEditGetUser = async (option) => {
        try {
            const result = await ServiceApiUser.GetById(option)
            setInfoEdit(result)
            
            // setimgUrl({
            //     imgFile: result.Image,
            //     imgSrc: UserImg, // Nếu không có đường dẫn từ SQL, sử dụng đường dẫn mặc định
            // });
        } catch (error) {
            throw Error
        }
    }
    console.log(imgUrl);
    //edit Update 
    const fectApiEditUpdateUser = async (idUser, option) => {
        try {
            const result = await ServiceApiUser.Update(idUser,option)
            return result
        } catch (error) {
            throw Error
        }
    }
    //deparment
    const fetchApiDeparment = async () => {
        try {
            const result = await ServiceApiDeparment.GetAll()
            setDeparment(result)
        } catch (error) {
            throw Error;
        } 
    }
    //class
    const fetchApiClassgetSpecializedId = async (value) => {
        try {
            const result = await ServiceApiClass.getSpecializedId(value)
            return result
        } catch (error) {
            throw Error;
        } 
    }
    const fetchApiClassId = async (value) => {
        try {
            const result = await ServiceApiClass.getById(value)
            return result
        } catch (error) {
            throw Error;
        } 
    }
    //specialized
    const fetchApiSpecialized = async (value) => {
        try {
            const result = await ServiceApiSpecialized.getByDeparmentId(value)
            return result
            
        } catch (error) {
            throw Error;
        } 
    }
    //CreateUserPost
    const fetchApiCreateUser = async (option) => {
        try {
            const result = await ServiceApiUser.CreateUser(option)
            return result
        } catch (error) {
            throw Error
        }
    }
    //handle setSelect class and specizlized
    const handleSelectClassSpecialized = async ( deparmentId, classIesd) => {
        try {
            const Specialized = await fetchApiSpecialized(deparmentId); 
            const resultClass = await fetchApiClassId(classIesd); 
            if (!Specialized || Specialized.length === 0) {  
                return; 
            }
            if (!resultClass ) {
                return; 
            }
            setClasses([resultClass]);
            setSpeciolized(Specialized);
        } catch (error) {
            console.error(error);
        } finally {
           
        }
    }
  
    //handle specizlized and class by Deparment
    const handleSpecializedClass = async (value) => {
        setClassesSelect([]);
        try {
            const Specialized = await fetchApiSpecialized(value); 
            if (!Specialized || Specialized.length === 0) {
                setSpeciolized([])
                setSpeciolizedSelect([]);
                return; 
            }
            const resultClass = await fetchApiClassgetSpecializedId(Specialized[0].SpecializedId); 
            if (!resultClass ) {
                return; 
            }

            setClasses([resultClass]);
            setSpeciolized(Specialized);
            setClassesSelect(resultClass.ClassId);
            setSpeciolizedSelect(Specialized.length > 0 && Specialized[0].SpecializedId);

        } catch (error) {
            console.error(error);
        } finally {
            setDeparmentSelect(value);
        }
        
    };
    const handleChangeDeparment = async (value) => {
        handleSpecializedClass(value)
    }
    const handleChangeSpecialized = async value => {
        
        try {
            const result = await fetchApiClassgetSpecializedId(value)
            setClasses( [result])
            setClassesSelect(result.ClassId)
    
            setSpeciolizedSelect(value) 
        } catch (error) {
            
        }
        
    }
    const handleChangeClass = value => {
        setClassesSelect(value)
    }
   
    const handleRadioChange = e => {
        setSex(e.target.value)
    }
    const handleChangeChucVu = value => {
        setChucvu(value)
    }
    const handleButtonSubmit = async () => {
        
        const formData = new FormData()
        formData.append('Name', fullnameRef.current?.value)
        formData.append('Password', passwordRef.current?.value)
        formData.append('PhoneNumber', phoneRef.current?.value)
        formData.append('Email', emailRef.current?.value)
        formData.append('Username', usenameRef.current?.value)
        formData.append('Address', addressRef.current?.value)
        formData.append('DateOfBirth', birthRef.current?.value)
        formData.append('DepartmentId', deparmentSelect)
        formData.append('ClassId', classesSelect)
        formData.append('SpecializedId', speciolizedSelect)
        formData.append('UserGroup', chucvu)
        formData.append('Sex', sex)
        formData.append('ImageFile', imgUrl.imgFile)
        for (let pair of formData.entries()) {
            const [ value] = pair;
            if (value === '' || value === UserImg || (Array.isArray(value) && value.length === 0) || value === 'null') {
                isEmptyField = true;
            }
        }
        if (isEmptyField) {
        NotificationManager.warning('Các trường không được để trống', 'Cảnh báo', 1000);
        } else {
            if(type === 'AdminEditUser') {
                const rs = await fectApiEditUpdateUser(idUser,formData)
                if(rs !== null && rs !== undefined) {
                    NotificationManager.success(rs, 'Thành công', 1000);
                }else {
                    NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                } 
            }else {
                const rs = await fecthApiGetOnlyByNameUser(usenameRef.current?.value)
                if(rs) {
                    NotificationManager.warning("Tài khoản đã tồn tại", 'Cảnh báo', 1000);
                }else {
                    const rs = await fetchApiCreateUser(formData)
                    if(rs !== null && rs !== undefined) {
                        NotificationManager.success(rs, 'Thành công', 1000);
                        fullnameRef.current.value = ''
                        passwordRef.current.value = ''
                        phoneRef.current.value = ''
                        emailRef.current.value = ''
                        usenameRef.current.value = ''
                        addressRef.current.value = ''
                        birthRef.current.value = ''
                        fullnameRef.current.focus()
                        setChucvu('')
                        setDeparmentSelect('')
                        setClassesSelect('')
                        setSpeciolizedSelect('')
                        setSex('')
                        setimgUrl(prev => ({
                            ...prev,
                            imgSrc: UserImg
                        }))
                    }else {
                        NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                    }
                }
            }
        }
    }
    const handleImg = e => {
        if(e.target.files && e.target.files[0]) {
            let imgFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setimgUrl({
                    imgFile,
                    imgSrc:  x.target.result
                })
            }
            reader.readAsDataURL(imgFile)
        }else {
            if(type === 'AdminEditUser') {
                setimgUrl({
                    imgFile: null,
                    imgSrc: infoEdit?.Image
                })
            }else {
                setimgUrl({
                    imgFile: null,
                    imgSrc: UserImg
                })
            }
        }
      };
    return ( 
        <div className={cx('app')}>
            <NotificationContainer/>
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
                        <input type='text' ref={fullnameRef} />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Số điện thoại
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' ref={phoneRef} />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Email
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' ref={emailRef} />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Địa chỉ
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' ref={addressRef} />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Năm sinh
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='date' ref={birthRef} />
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
                        <Radio.Group onChange={handleRadioChange} value={sex} className={cx('radio')}>
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>
                        </Radio.Group>
                        </div>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                        <div>
                            Chức vụ
                            <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <Select
                            className={cx('form-select')}
                            showSearch 
                            value={chucvu} 
                            style={{ width: 200 }}
                            placeholder="Chọn Chức Vụ"
                            optionFilterProp="children"
                            onChange={handleChangeChucVu}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option  value='SV'>Sinh Viên</Option>
                            <Option  value='GV'>Giáo Viên</Option>
                            <Option  value='ADMIN'>ADMIN</Option>
                        </Select>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                        <div>
                                Khoa
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <Select
                            className={cx('form-select')}
                            value={deparment.length > 0 && deparmentSelect}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn Khoa"
                            optionFilterProp="children"
                            onChange={handleChangeDeparment}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            { deparment.length > 0 &&  deparment.map((item, index) => (
                                <Option key={index} value={item.DepartmentId}>{item.Name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                        <div>
                            Chuyên ngành
                            <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <Select
                            className={cx('form-select')}
                            showSearch  
                            value={type === 'AdminEditUser' ? speciolizedSelect : speciolized.length > 0 && speciolizedSelect}
                            style={{ width: 200 }}
                            placeholder="Chọn Chuyên Ngành"
                            optionFilterProp="children"
                            onChange={handleChangeSpecialized}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                             {  speciolized.map((item, index) => (
                                <Option key={index} value={item.SpecializedId}>{item.Name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                        <div>
                                Lớp
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <Select
                            className={cx('form-select')}
                            showSearch
                            style={{ width: 200 }}
                            value={type === 'AdminEditUser'? classesSelect : speciolized.length > 0 && classes.length > 0 && classesSelect}
                            placeholder="Chọn Lớp"
                            optionFilterProp="children"
                            onChange={handleChangeClass}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {  classes.map((item, index) => (
                                <Option key={index} value={item.ClassId}>{item.Name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')} >
                            <div>
                                Hình ảnh
                                <span className={cx('require')}>*</span>
                            </div>
                            <span>:</span>
                        </span>
                        <div className={cx('form-img')}>
                            <img src={imgUrl.imgSrc ? imgUrl.imgSrc : UserImg} alt={imgUrl.imgSrc } />
                            <input onChange={handleImg}   type="file" alt="Img" />
                        </div>
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Tài khoản
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' ref={usenameRef} />
                    </div>
                    <div className={cx('form-input')}>
                        <span className={cx('form-lable')}>
                            <div>
                                Mật khẩu
                                <span className={cx('require')}>*</span>
                        </div>
                            <span>:</span>
                        </span>
                        <input type='text' ref={passwordRef} />
                    </div>
                    <div onClick={handleButtonSubmit} className={cx('form-button')}><Button type='primary'>Cập nhật</Button></div>
                </div>
            </div>
        </div>
     );
}

export default AdminCreateEditUser;