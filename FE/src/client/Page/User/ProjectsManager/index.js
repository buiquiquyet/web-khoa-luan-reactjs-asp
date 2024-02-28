import classNames from "classnames/bind";
import styles from './ProjectsManager.modules.scss'
import { DateIcon, UserIcon, EyeIcon, DowIcon, EditIcon, SearchIcon } from "../../../Icon";
import LogoImg from '../../../Image/logo.png'
import { Link } from "react-router-dom";
import { Button, Checkbox } from "antd";
import { useState,useRef } from "react";
import * as ServiceProjectApi from './../../../apiServieces/ProjectListApi'
import { useEffect } from "react";
import { NotificationManager, NotificationContainer } from 'react-notifications';
import * as ServiceCommentApi from './../../../apiServieces/CommentApi'
import * as ServiceEvaluateApi from './../../../apiServieces/Evaluate'
import { CheckIcon } from "../../../Icon";
const cx = classNames.bind(styles)

function Projects() {
  const inputSearchRef = useRef()
    const [checklist, setCheckList] = useState([])
    const [dataProject, setDataProject] = useState([])
    const [commentIdArr, setCommentIdArr] = useState(null)
    const handleChecked = (item) => {
      setCheckList(prev => {
        const isChecked = prev.includes(item)
        return isChecked ? prev.filter(value => value !== item) : [...prev, item]
      })
    }
    const handleCheckedAll = () => {
      if(dataProject.length !== 0) {
        setCheckList(prev => {
          const isChecked = prev.length === dataProject.length
          const dataId = dataProject.map(item => item.ProjectListId)
          return isChecked ? [] : [...dataId]
        })
      }
      return
    }
    const handleDelProject =  async () => {
      const userConfirmed = window.confirm('Bạn có chắc muốn xóa những diễn đàn này?');
      if (userConfirmed) {
        await fecthCommentDelByPostTypeAndIdArr(checklist, "projectPost")
        const rs = await fecthProjectDel(checklist)

        if(rs) {
          NotificationManager.success(rs, 'Thành công', 1000);
        }else {
          NotificationManager.error("Đã xảy ra lỗi", 'Thất bại', 1000);
        }
        await fecthProjectGetAll(localStorage.getItem('userId'))
      }
    }
    const fecthProjectGetByUserIdAndName = async (useId, name) => {
      const rs = await ServiceProjectApi.GetByUserIdAndName(useId, name)
      setDataProject(rs)
    }
    const fecthProjectDel = async (option) => {
     
      const rs = await ServiceProjectApi.Delete(option)
     
      return rs
    }
    const fecthCommentDelByPostTypeAndIdArr = async (option, type) => {
      const rs = await ServiceCommentApi.DeleteByPostTypeAndIdArr(option, type)
      if(rs.length > 0) {
        setCommentIdArr(() => {
          return rs.map(item => item.CommentId)
        }) 
      }
    }
    const fecthEvaluateDelByCommentIdArr = async (option) => {
      await ServiceEvaluateApi.DeleteByCommentIdArr(option)
     
    }
    const fecthProjectGetAll = async (id) => {
      const rs = await ServiceProjectApi.GetByUserId(id)
      setDataProject(rs)
    }
    useEffect(() => {
      fecthProjectGetAll(localStorage.getItem('userId'))
    },[])
    useEffect(() => {
      if(commentIdArr) {
        fecthEvaluateDelByCommentIdArr(commentIdArr)
      }
    },[commentIdArr])
    const handleSearch = async () => {
      if(inputSearchRef.current.value === '') {
        NotificationManager.warning("Hãy nhập tên tìm kiếm", 'Cảnh báo', 1000);
        return
      }
      await fecthProjectGetByUserIdAndName(localStorage.getItem('userId'),inputSearchRef.current.value)
     
  }
    return ( 
        <div className={cx('wrapper')}>
          <NotificationContainer/>
            <div className={cx('content')}>
                <div className={cx('function')} >
                    <Button onClick={handleDelProject} className={cx('function-button')} type="primary" disabled={checklist && !checklist.length > 0} style={{backgroundColor:'red'}} >Xóa</Button>
                    <Link to={'/projectCreateEdit'}><Button className={cx('function-button')} type="primary">Thêm mới</Button></Link>
                    <div className={cx('app')}>
                    <div className={cx('nav-search')}>
                        <input ref={inputSearchRef} type="text" placeholder="Search..." />
                        <button onClick={handleSearch} className={cx('nav-buttonSearch')}><SearchIcon/></button>
                    </div>
                </div>
                </div>
                <div>
                  <Checkbox className={cx('check-icon check-all')}
                    checked= {Array.isArray(checklist)  && Array.isArray(dataProject) && checklist.length === dataProject.length && checklist.length > 0}
                    onChange={handleCheckedAll}
                  />
                  <span> Chọn tất cả</span>
                </div>
                {dataProject && dataProject.length > 0 && dataProject.map((item, index) => (
                  <div className={cx('form-project')} key={index}>
                    <div className={cx('form-left')}>
                      <Checkbox className={cx('check-icon')}  
                        onChange={()=> handleChecked(item.ProjectListId)}
                        checked={checklist && checklist.includes(item.ProjectListId)}
                      />
                      <Link to={`/projectCreateEdit/${item.ProjectListId}`} className={cx('content-project')}>
                        <span className={cx("project-lable")}>{item.Name}</span>
                        <div className={cx("comment-dateUser")}>
                            <div className={cx("comment-date")}><DateIcon classsName={cx('comment-icon')}/><span>{new Date(item.CreatedDate).toLocaleDateString()}</span></div>
                            <div className={cx('comment-user')} ><UserIcon classsName={cx('comment-icon')}/><span>{localStorage.getItem('name')}</span></div>
                            <div className={cx('comment-user')} ><EyeIcon classsName={cx('comment-icon')}/><span>{item.Watched}</span></div>
                            <div className={cx('comment-user')} ><DowIcon classsName={cx('comment-icon')}/><span>{item.Download}</span></div>
                            <div className={cx('comment-checkAdmin')}>
                                {item.CheckAdmin === 0 ? <span>Chờ duyệt</span>
                                : item.CheckAdmin === 1 ? <div className={cx('checkAdmin-comfirm')} style={{color:"green"}}><CheckIcon width="1.5rem" /> <span style={{marginLeft:"3px"}}>Đã duyệt</span></div>
                                  : <span style={{color:"red"}}>Không duyệt</span>
                                }
                            </div>
                        </div>
                        <div className={cx('project-post')}>
                            <img src={LogoImg} alt="img"/>
                            <div className={cx('post')}>
                                <div className={cx('post-text')}  dangerouslySetInnerHTML={{ __html: item.Discriptions }} />
                            </div>
                        </div> 
                      </Link>
                    </div>
                    <div className={cx('icon-edit')}>
                      <Link to={`/projectCreateEdit/${item.ProjectListId}`}> <EditIcon /></Link>
                    </div>
                  </div>
                ))}
                {dataProject.length === 0 && <div className={cx('showInfoNoData')}>Không có dữ liệu</div> }
            </div>
            
        </div>
     );
}

export default Projects;