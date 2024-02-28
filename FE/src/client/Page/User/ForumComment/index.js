import {  useParams } from "react-router-dom";
import styles from './ForumComment.module.scss'
import classNames from "classnames/bind";
import { DateIcon, UserIcon } from "../../../Icon";
import CommentForm from "../../../components/Layout/User/components/CommentForm";
import { useEffect, useState, useContext } from 'react';
import * as ServiceForumApi from './../../../apiServieces/ForumApi'
import { MyContext } from "../../../../App";
const cx = classNames.bind(styles)
function ForumComment() {
    const type = useContext(MyContext)
    const {idForum} = useParams()
    const [dataForum, setDataForum] = useState(null);
   const fetchApiGetAllForum = async (id) => {
      const rs = await ServiceForumApi.GetById(id)  
      setDataForum(rs)    
  }
   useEffect(() => {
      fetchApiGetAllForum(idForum)
      
   }, [idForum])
    return ( 
        <div className={cx("content-menu")}>
            <div className={cx("comment-infor")}>
                <h2 className={cx("comment-lable")}>{dataForum && dataForum.Title}</h2>
                <div className={cx("comment-dateUser")}>
                    <div className={cx("comment-date")}><DateIcon classsName={cx('comment-icon')}/><span>{dataForum &&  new Date(dataForum.CreatedDate).toLocaleDateString()}</span></div>
                    <div className={cx('comment-user')} ><UserIcon classsName={cx('comment-icon')}/><span>Quản trị viên</span></div>
                </div>
                <div className={cx("commnet-post")}>
                    {dataForum && (
                            <div dangerouslySetInnerHTML={{ __html: dataForum.Discriptions }} />
                    )}
                    {/* <div className={cx("comment-dowload")}>Dowload: <Link to={''}><i> Bạn cần đăng nhập để tải tài liệu</i></Link></div> */}
                </div>
               
            </div>
           <CommentForm idForum = {idForum} typePost = {type} />

        </div>
     );
}

export default ForumComment;