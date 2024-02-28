import classNames from "classnames/bind";
import styles from './AdminCreateEditForum.module.scss';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Button } from "antd";
import { useEffect, useState, useRef, useContext} from "react";
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as ServiceForumApi from './../../../apiServieces/ForumApi'
import { MyContext } from "../../../../App"; 
const cx = classNames.bind(styles)


function AdminCreateEditForum() {
    const type = useContext(MyContext)
    const { idForum } = useParams()
    const titleRef = useRef()
    const [content, setContent] = useState('');
    let isEmptyField = false;
    const handleChange = (value) => {
        setContent(value);

    };
    const fecthForumCreate = async (value) => {
       try {
            const rs = await ServiceForumApi.CreateForum(JSON.stringify(value))
        return rs
       } catch (error) {
            throw Error
       }
    }
    const fecthForumEdit = async (id, value) => {
        try {
            const rs = await ServiceForumApi.Update(id,JSON.stringify(value))
            return rs
        } catch (error) {
            throw Error
        }
    }
    
    const handleSubmit = async () => {
        
        let obj = {}
        obj.Title = titleRef.current.value
        obj.Discriptions = content
        obj.CreatedDate = new Date() 
        Object.keys(obj).forEach(key => {
            if (obj[key] === '' ) {
                isEmptyField = true;
            }
          });
        if(isEmptyField) {
            NotificationManager.warning('Thông tin không được để trống', 'Cảnh báo', 1000);
        }else {
            if(type === 'AdminEditForum') {
                const rs = await fecthForumEdit(idForum, obj)
                if(rs !== null && rs !== undefined) {
                    NotificationManager.success(rs, 'Thành công', 1000, );
                }else {
                    NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                }
            }else {
                const rs = await fecthForumCreate(obj)
                if(rs !== null && rs !== undefined) {
                    NotificationManager.success(rs, 'Thành công', 1000);
                }else {
                    NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
                }
            }
        }
    }
    
    useEffect(() => {
        titleRef.current.focus()
        if(type === 'AdminEditForum') {
            const fecthForumGetById = async (value) => {
                const rs = await ServiceForumApi.GetById(value)
                setContent(rs.Discriptions);
                titleRef.current.value = rs.Title
            }
            fecthForumGetById(idForum)
        }
    },[type,idForum])
    return ( 
        <div className={cx('wrapper')}>
            <NotificationContainer/>
            <div className={cx('form-create')}>
                <div className={cx('lable-box')}>
                    {/* <div className={cx('lable')}>Thông tin diễn đàn</div> */}
                    <div onClick={handleSubmit} className={cx('form-button')}><Button type='primary'>Cập nhật</Button></div>
                </div>
                <div className={cx('form-submit')}>
                    <div className={cx('form-input')}>
                        <textarea type='text' ref={titleRef} placeholder="Tiêu Đề" rows={2} />
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
        </div>
     );
}

export default AdminCreateEditForum;