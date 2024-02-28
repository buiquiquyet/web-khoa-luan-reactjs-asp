import classNames from 'classnames/bind';
import styles from './ProjectCreateEdit.module.scss';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import * as ServiceProjectListApi from './../../../apiServieces/ProjectListApi'
import { MyContext } from "../../../../App"; 
import * as ServiceSchoolYearApi from './../../../apiServieces/SchoolYear'
import { Button, Select } from 'antd';
import { useEffect,useContext,useRef,useState } from 'react';
import { format } from "date-fns";
const cx = classNames.bind(styles);
const {Option} = Select

function ProjectCreateEdit() {

    const type = useContext(MyContext)

    const [content, setContent] = useState('');
    
    const [schoolYear, setSchoolYear] = useState([])
    const [schoolYearSelect, setSchoolYearSelect] = useState([])
    const [fileSelect, setFileSelect] = useState('')
    const titleRef = useRef()
    let isEmptyField = false
    //tham số edit id
    const { projectId } = useParams();
    const handleChange = value => {
        setContent(value);
    }
    const fecthSchoolYearGetAll = async () => {
        const rs = await ServiceSchoolYearApi.GetAll()
        setSchoolYear(rs)
    }
    const handleChangeSchoolYear = (value) => {
        setSchoolYearSelect(value)
    }
    const fecthProjectListCreate = async (option) => {
        const rs = await ServiceProjectListApi.CreateProjectList(option)
        return rs
    }
    const fecthProjectUpdate = async (id, option) => {
        const rs = await ServiceProjectListApi.Update(id, option)
        return rs
    }
    const fecthProjectGetById = async (id) => {
        const rs = await ServiceProjectListApi.GetById(id)
        setContent(rs.Discriptions)
        setSchoolYearSelect(rs.SchoolYearId)
        titleRef.current.value = rs.Name
        // setFileSelect(rs.Image)

    }
    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('Name',titleRef.current.value)
        formData.append('UserId', localStorage.getItem('userId'))
        formData.append('Discriptions', content)
        formData.append('CreatedDate', format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"))
        formData.append('SchoolYearId', schoolYearSelect)
        formData.append('ImageFile', fileSelect)
        formData.append('CheckAdmin', 0)
        
        for (const [key, value] of formData.entries()) {
            if(type !== 'projectEditUser') {
                if (value === '' || (Array.isArray(value) && value.length === 0) || value === 'null') {
                    isEmptyField = true
                    
                }else {
                    if (value === '' || (Array.isArray(value) && value.length === 0) ) {
                        isEmptyField = true
                }

            }
            }
        }
        // for (const pair of formData.entries()) {
        //     console.log(pair[0] + ':', pair[1]);
        //   }
        if(isEmptyField) {
            NotificationManager.warning('Các trường không được để trống', 'Cảnh báo', 1000);
        }else {
            if(type === 'projectEditUser') {
                const rs = await fecthProjectUpdate(projectId, formData)
                if(rs !== null && rs !== undefined) {
                    NotificationManager.success(rs, 'Thành công', 1000);
                }else {
                    NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                }
            }else {
                const rs = await fecthProjectListCreate(formData)
                if(rs !== null && rs !== undefined) {
                    NotificationManager.success(rs, 'Thành công', 1000);
                }else {
                    NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                }
            }
        }
    }
    const handleChooseFile = (e) => {
        if(e.target.files && e.target.files[0]) {
            let imgFile = e.target.files[0]
            if (imgFile) {
                const isPDF = imgFile.name.toLowerCase().endsWith('.pdf');
                if (isPDF) {
                    setFileSelect(imgFile)
                } else {
                    NotificationManager.warning("Hãy chọn file pdf", 'Cảnh báo', 1000);
                }
              }
           
            
        }
    }
    useEffect(() => {
        titleRef.current.focus()
        if(type === 'projectEditUser') {
            fecthProjectGetById(projectId)
        }
        fecthSchoolYearGetAll()

    },[type,projectId])
    
    return ( 
        <div className={cx('wrapper')}>
        <NotificationContainer/>
        <div className={cx('form-create')}>
            <div className={cx('lable-box')}>
                <div onClick={handleSubmit} className={cx('form-button')}><Button type='primary'>Cập nhật</Button></div>
            </div>
            <div className={cx('form-submit')}>
                <div className={cx('form-input')}>
                    <textarea type='text' ref={titleRef}  placeholder="Tiêu Đề" rows={2} />
                </div>
                <ReactQuill
                    value={ content}
                    onChange={handleChange}
                    modules={{
                        toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'indent': '-1'}, {'indent': '+1'}],
                        ['link', 'image', 'video'],
                        ['clean'],
                        ['code-block'],
                        ['formula'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        
                        ],
                    }}
                    formats={[
                        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent', 'link', 'image', 'video', 'code-block', 'formula',
                        'color', 'background', 'align'
                    ]}
                    style={{fontSize: '16px', height: '480px', fontFamily: 'Arial, sans-serif', border: 'none' }}
                    placeholder="Nội dung viết ở đây"
                />
            </div>
           
        </div>
        <div className={cx('upload-select')} >
            <div className={cx('select-box')}>
                <span>Năm học:</span>
                <Select
                    className={cx('form-select')}
                    showSearch
                    value={  schoolYearSelect}
                    style={{ width: 200 }}
                    placeholder="Chọn năm học"
                    optionFilterProp="children"
                    onChange={handleChangeSchoolYear}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {  schoolYear.map((item, index) => (
                        <Option key={index} value={item.SchoolYearId}>{item.Name}</Option>
                    ))}
                    
                </Select>
            </div>
            <div className={cx('select-box')}>
                <span>Tải File:</span>
                <input onChange={handleChooseFile}  className={cx('upload-input')} type='file'/>
            </div>
        </div>
    </div>
     );
}

export default ProjectCreateEdit;