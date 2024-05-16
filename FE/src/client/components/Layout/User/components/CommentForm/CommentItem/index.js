import classNames from "classnames/bind";
import styles from './CommentItem.module.scss'
import { SendIcon, LikeIcon, LikeIconLast } from "../../../../../../Icon";
import { useState, useEffect, memo } from "react";
import { NotificationManager, NotificationContainer } from 'react-notifications';
import * as ServiceEvaluateApi from './../../../../../../apiServieces/Evaluate'
import * as ServiceCommentApi from './../../../../../../apiServieces/CommentApi'
import * as ServiceUserApi from './../../../../../../apiServieces/UserApi'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { MenuHozi } from "../../../../../../Icon";
import MicImg from './../../../../../../Image/mic.png'
import { ProjectContext } from "../../../../../../Page/User/ProjectPost";
import { useContext } from "react";
const cx = classNames.bind(styles)
function CommentItem({  onEditComment, visibleItems, dataComment, fecthCommentApiGetTypePost, typePost, idForum}) {
    const UserName = useContext(ProjectContext)
    const [arrAllEvaluate, setArrAllEvaluate] = useState([])
    const [arrComentId, setarrCommentId] = useState([])
    const [jsxCount, setJsxCount] = useState([])
    const UserId = JSON.parse(localStorage.getItem('userId'))
    const [dataTippy, setDataTippy] = useState(null)
    const [checkTippy, setCheckTippy] = useState(null)
    //feedback
    const [dataCommentFeedback, setDataCommentFeedback] = useState(null)
    // const [countItemFeedMore, setCountItemFeebMore] = useState(0)
    const [dataCommentotherNull, setDataCommentotherNull] = useState(null)
    const [commnentFeedbackArr, setCommentFeedbackArr] = useState([])
    const [showcommnentFeedbackArr, setShowCommentFeedbackArr] = useState([])
    const [commentTextarea,setCommentTextarea] = useState(null)
    //like and dislike
    const handleChangIcon = async (commentId, type) => {
        if(!localStorage.getItem('userId')) {
            NotificationManager.error("Bạn chưa đăng nhập", 'Lỗi', 1000);
            return
        }
        if(type === 1) {
            const newResults = arrAllEvaluate.some((value) => (value.CommentId === commentId && value.UserId === UserId));
            if(!newResults) {
                setArrAllEvaluate(prev => (
                     [...prev, 
                        {
                            UserId ,
                            CommentId : commentId,    
                        }
                    ]
                ))
                await fecthAddEvalue({ 
                    "UserId": UserId,
                    "CommentId": commentId   
                })   
            }
        }else { 
            const newRs = arrAllEvaluate.filter(item => !(item.CommentId === commentId && item.UserId === UserId));
            setArrAllEvaluate([...newRs]);  
            await fecthDelEvalue(commentId, UserId)
        }
        setCheckTippy(null)
        await selectEvaluateByCommnetIdCount([commentId]);
    }
    //lấy commentId để tìm kiếm trong sql
    const handleSetCommentId =  (commentId) => {
        if(!arrComentId.includes(commentId)) {
            setarrCommentId(prev => [...prev,  commentId]) 
        }
    }
    //select count theo commentid
    const selectEvaluateByCommnetIdCount = async (option) => {
        try {
            const promises = option.map(async (value) => {
                const rs = await ServiceEvaluateApi.GetByCommentId(value);
                return {
                    commentId: value,
                    count: rs,
                };
            });
            const results = await Promise.all(promises);
            setJsxCount((prev) => [
                ...prev.filter((item) => !option.includes(item.commentId)),
                ...results,
              ]);
            
        } catch (error) {
            console.error(`Error fetching data for commentId `, error);
            throw error;
        }
      };
    const onDelComment = (value, typeDel) => {
        fecthEvaluateDelByCommentId(value, typeDel)
    }
    //xử lí like, dislike comment
    const handleRenderLikeCommnet = (commentId) => {
        const rs =arrAllEvaluate.some((value) => (value.CommentId === commentId && value.UserId === UserId ) )
        if(rs) {
             return <div onClick={() => handleChangIcon(commentId,2)}><LikeIconLast  classsName={cx('evaluate-iconLast')}  width="1.8rem"/></div> 
        }
        return <div  onClick={() => handleChangIcon(commentId,1)} ><LikeIcon  classsName={cx('evaluate-icon')} width="1.8rem"/></div> 

    }
    //delete comment api
    const fecthEvaluateDelByCommentId = async (idComment, typeDel) => {
        await ServiceEvaluateApi.DeleteByCommentId(idComment)
        await ServiceCommentApi.Delete(idComment) 
        if(typeDel === 'feedback') {
            setDataCommentFeedback(prev => prev.filter(item => item.CommentId !== idComment))
            fecthGetCommnetByTypePostCommentIdotherNull(typePost, idForum)
        }else { 
            const rs = await ServiceCommentApi.GetByByCommentId(idComment)
            if(rs) {
                await Promise.all(
                    rs.map(async (item) => {
                      await ServiceEvaluateApi.DeleteByCommentId(item.CommentId);
                    })
                  );
            }
            await fecthCommentApiGetTypePost(typePost,idForum)
            await ServiceCommentApi.DeleteBybyCommentId(idComment)
        }
       
    }
    //tippy show userName
    const handleMouseEnter = (value) => {
          fecthGetUserNameEvalue(value);
      }
    //show phan hoi comment
    const handleShowReComment = async (commentId) => {
        if(!commnentFeedbackArr.includes(commentId)) {
            setCommentFeedbackArr(prev => [...prev, commentId])
        }else {
            let obj = {}
            if(  localStorage.getItem("userId") === null || localStorage.getItem("name") === null) {
                NotificationManager.warning("Hãy đăng nhập để bình luận", 'Cảnh báo', 1000);
                return    
            }
            if(commentTextarea === null ) {
                return
            }
            
            obj.UserId = localStorage.getItem("userId")
            obj.FullName = localStorage.getItem("name")
            obj.Email = ""
            obj.CommentDate = new Date()
            obj.Discriptions = commentTextarea
            obj.CommentType = typePost
            obj.PostId = idForum
            obj.ByCommentId = commentId
            const rs = await fecthCommentApiCreate(obj)
            if(rs) {
                if( dataCommentFeedback && dataCommentFeedback.length > 0) {
                    const rs = await fecthGetCommnetByTypePostCommentId(typePost, idForum, commentId)
                    setDataCommentFeedback(prev => {
                        const existingValues = new Set(prev.map(item => item.CommentId));
                        const uniqueItems = rs.filter(item => !existingValues.has(item.CommentId));
                        return [ ...uniqueItems,...prev];
                        });
                 
                }else {
                    const rs = await fecthGetCommnetByTypePostCommentId(typePost, idForum, commentId)
                    setDataCommentFeedback(rs)
                }
                await fecthGetCommnetByTypePostCommentIdotherNull(typePost, idForum)
                setShowCommentFeedbackArr(prev => [...prev, commentId])
            }
            setCommentFeedbackArr(prev => prev.filter(item => item !== commentId ))
        }
    }
    const handleChangeDiv = (e) => {
        setCommentTextarea(e.target.innerText);
      };
    //check show see All
    const handleCheckShowSeeAll = (commentId) => {
        if(dataCommentotherNull) {
            return dataCommentotherNull.some((item) => item.ByCommentId === commentId)
            
        }
    }
    //show more feedback
    const handleShowmoreFeebBack = async (commentId) => {
        // handle show count commentfeedback and show(hide) text
        if(!showcommnentFeedbackArr.includes(commentId)) {
            if( dataCommentFeedback && dataCommentFeedback.length > 0) {
                const checkDataFeedback = dataCommentFeedback.some(item => item.ByCommentId === commentId)
                if(!checkDataFeedback) {
                    const rs = await fecthGetCommnetByTypePostCommentId(typePost, idForum, commentId)
                    setDataCommentFeedback(prev => [...prev, ...rs])
                }
            }else {
                const rs = await fecthGetCommnetByTypePostCommentId(typePost, idForum, commentId)
                setDataCommentFeedback(rs)
            }
            
            setShowCommentFeedbackArr(prev => [...prev, commentId])
            // setCountItemFeebMore(dataComment.length)
        }else {
            setShowCommentFeedbackArr(prev => prev.filter(item => item !==commentId ))
            setDataCommentFeedback(prev => prev.filter(item => item.ByCommentId !== commentId))
            
            // setCountItemFeebMore(0)
        }
    }
    //cam chat
    const handleCheckCommentUser = async (userId,checkComment) => {
        try {
            if(checkComment === 1) {
                const obj = {
                    checkComment: 0
                }
                const rs = await ServiceUserApi.UpdateCheckComment(userId, obj)
                if(rs) {
                    NotificationManager.success("Bỏ cấm chat thành công", 'Thành công', 1000);
                }
            } else {
                const obj = {
                    checkComment: 1
                }
                const rs = await ServiceUserApi.UpdateCheckComment(userId, obj)
                if(rs) {
                    NotificationManager.success("Cấm chat thành công", 'Thành công', 1000);
                }
            }
            await fecthCommentApiGetTypePost(typePost,idForum)
        } catch (error) {
            throw error
        }
    }
    //fecth
    const fecthGetUserNameEvalue = async (value) => {
            if(checkTippy !== value){
                const rs = await ServiceEvaluateApi.GetByCommentIdToUserName(value);
                setDataTippy(rs)
                setCheckTippy(value)
            }
    }
    const fecthCommentApiCreate = async (obj) => {
        try {
         const rs = await ServiceCommentApi.CreateComment(JSON.stringify(obj))
         return rs
        } catch (error) {
         throw error
        }
     }
    const fecthGetCommnetByTypePostCommentId = async (typePost, postId, commentId) => {
        try {
            const rs = await ServiceCommentApi.GetByTypePostCommentId(typePost, postId, commentId)
            return rs
        } catch (error) {
            throw error
        }
    }
    //get comment byCommemtID !== null
    const fecthGetCommnetByTypePostCommentIdotherNull = async (typePost, postId) => {
        try {
            const rs = await ServiceCommentApi.GetByTypePostCommentIdotherNull(typePost, postId)
            setDataCommentotherNull(rs)
        } catch (error) {
            throw error
        }
    }
    const fecthAddEvalue = async (option) => {
        await ServiceEvaluateApi.CreateEvaluate(JSON.stringify(option))

    }
    const fecthDelEvalue = async (commentId) => {
        await ServiceEvaluateApi.Delete(commentId, UserId)
    }
    const fecthAllEvaluate = async () => {
        const rs = await ServiceEvaluateApi.GetAll()
        const newArr = rs.map(({ UserId, CommentId }) => ({ UserId, CommentId }));
        setArrAllEvaluate(newArr)
    }
    useEffect(() => {
        selectEvaluateByCommnetIdCount(arrComentId)
    },[ arrComentId,arrAllEvaluate])
    useEffect(() => {
        fecthAllEvaluate()
        fecthGetCommnetByTypePostCommentIdotherNull(typePost, idForum)
    },[typePost, idForum])
    return ( 
      <div>
          {dataComment  && dataComment.slice(0, visibleItems).map((item, index) =>    
            (
               
                <div key={index} className={cx('comment-item')}>
                {handleSetCommentId(item.CommentId)}
                <NotificationContainer/>
               
                <div className={cx('comment-NameDis')}>
                    {item.FullName === UserName
                    &&  <div className={cx('comment-author')}>
                        <img src={MicImg} alt="img"/>
                        Tác giả
                    </div>}
                    <div className={cx('comment-lable')}>
                        <span className={cx('comment-user')}>
                            {item.FullName}
                            {item.UserGroup === 'GV' 
                            ?  <span>(Giáo viên)</span>
                            :  item.UserGroup === 'ADMIN' ? <span>(Admin)</span> :<span>{`(${item.ClassName})`}</span>} 
                        </span>
                        { (`${item.UserId}` === localStorage.getItem('userId') || `ADMIN` === localStorage.getItem('UserGroup'))
                        && <div className={cx('comment-choose')}>
                                {(item.checkComment !== 1 || `ADMIN` === localStorage.getItem('UserGroup') ) &&  <div className={cx('choose-icon')}><MenuHozi/></div>}
                                <div  className={cx('comment-edit-options')}>
                                    <div onClick={() => onEditComment(item)} className={cx('comment-edit')}>Chỉnh sửa</div>
                                    <div onClick={() => onDelComment(item.CommentId, 'comment')} className={cx('comment-edit')}>Xóa</div>
                                    {`ADMIN` === localStorage.getItem('UserGroup') 
                                        && <div onClick={() => handleCheckCommentUser(item.UserId, item.checkComment)} className={cx('comment-edit')}>
                                                {item.checkComment === 1 ? <span>Bỏ cấm</span> : <span>Cấm chat</span>}
                                            </div>}
                                </div>
                            </div>}
                    </div>
                    <span className={cx('comment-infor')}>{item.Discriptions}</span>
                </div>
                
                <div className={cx('comment-evaluate')}>
                    <div className={cx('comment-editIcon')}>
                        <div >{ new Date(item.CommentDate).toLocaleDateString()}</div>
                    </div>
                    <div className={cx('comment-like')}>
                        {handleRenderLikeCommnet(item.CommentId, item.UserId)}
                        {jsxCount && jsxCount.map((value, index) => (
                            <Tippy key={index} 
                                content={dataTippy && dataTippy.length > 0 ? dataTippy.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))
                                : 'None'}  
                            arrow={true}
                            >
                                <div className={cx('count-evaluate')} 
                                    onMouseEnter={() => handleMouseEnter(value.commentId)} 
                                >
                                {value.commentId === item.CommentId && `(${value.count})`} 
                                </div>
                            </Tippy>
                        ))}
                    </div>
                    {(item.checkComment !== 1 || `ADMIN` === localStorage.getItem('UserGroup')) && <div className={cx('re-comment')} onClick={() => handleShowReComment(item.CommentId)}><span>Phản hồi</span></div>}
                </div>
                
                { handleCheckShowSeeAll(item.CommentId) && !showcommnentFeedbackArr.includes(item.CommentId) &&
                    <div  className={cx('showMore-feedback')}>
                        <div className={cx('comment-sign')}>
                        </div>
                        <span onClick={() => handleShowmoreFeebBack(item.CommentId)}>Xem tất cả  phản hồi</span>
                    </div> 
                }
                {commnentFeedbackArr.includes(item.CommentId) &&
                    <div  className={cx("comment-input")}>     
                    <div className={cx('comment-box')}   
                        contentEditable="true" 
                        onInput={handleChangeDiv}
                        
                    >  
                    </div>
                    <button onClick={() => handleShowReComment(item.CommentId, item.UserId)}  className={cx("comment-button")} ><SendIcon classsName={cx('commment-iconSend')}/></button>
                    </div>  }
                   
                {dataCommentFeedback &&  dataCommentFeedback.map((value, index) => ( 
                    value.ByCommentId === item.CommentId && 
                    <div key={index}>
                        <div  className={cx('comment-NameDis')} style={{margin: '0px 0 0 50px'}}>
                            {handleSetCommentId(value.CommentId)}
                            {value.FullName === UserName
                            &&  <div className={cx('comment-author')}>
                                <img src={MicImg} alt="img"/>
                                Tác giả
                            </div>}
                            <div className={cx('comment-lable')}>
                                <span className={cx('comment-user')}>
                                    {value.FullName}
                                    {value.UserGroup === 'GV' 
                                     ?  <span>(Giáo viên)</span>
                                     :  value.UserGroup === 'ADMIN' ? <span>(Admin)</span> :<span>{`(${item.ClassName})`}</span>} 
                                </span>
                                { (`${item.UserId}` === localStorage.getItem('userId') || `ADMIN` === localStorage.getItem('UserGroup'))
                                && <div className={cx('comment-choose')}>
                                        {(item.checkComment !== 1 || `ADMIN` === localStorage.getItem('UserGroup') ) &&  <div className={cx('choose-icon')}><MenuHozi/></div>}
                                        <div  className={cx('comment-edit-options')}>
                                            <div onClick={() => onEditComment(value)} className={cx('comment-edit')}>Chỉnh sửa</div>
                                            <div onClick={() => onDelComment(value.CommentId,'feedback')} className={cx('comment-edit')}>Xóa</div>
                                            {`ADMIN` === localStorage.getItem('UserGroup') 
                                                && <div onClick={() => handleCheckCommentUser(value.UserId, value.checkComment)} className={cx('comment-edit')}>
                                                        {value.checkComment === 1 ? <span>Bỏ cấm</span> : <span>Cấm chat</span>}
                                                    </div>
                                            }
                                        </div>
                                    </div>}
                            </div>
                            <span className={cx('comment-infor')}>{value.Discriptions}</span>
                        </div> 
                        <div className={cx('comment-evaluate')} style={{marginLeft: ' 50px'}}>
                            <div className={cx('comment-editIcon')}>
                                <div >{ new Date(item.CommentDate).toLocaleDateString()}</div>
                            </div>
                            <div className={cx('comment-like')}>
                                {handleRenderLikeCommnet(value.CommentId, value.UserId)}
                                {jsxCount && jsxCount.map((data, index) => (
                                    <Tippy key={index} 
                                        content={dataTippy && dataTippy.length > 0 ? dataTippy.map((item, index) => (
                                            <div key={index}>
                                                {item}
                                            </div>
                                        ))
                                        : 'None'}  
                                    arrow={true}
                                    >
                                        <div className={cx('count-evaluate')} 
                                            onMouseEnter={() => handleMouseEnter(data.commentId)} 
                                        >
                                        {data.commentId === value.CommentId && `(${data.count})`} 
                                        </div>
                                    </Tippy>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {
                   handleCheckShowSeeAll(item.CommentId) && showcommnentFeedbackArr.includes(item.CommentId) &&
                    <div className={cx('commentFeecback-hide')} onClick={() => handleShowmoreFeebBack(item.CommentId)}>Ẩn bớt</div>
                }
            </div>
            )
        )}
      </div>
     )
}

export default memo(CommentItem);