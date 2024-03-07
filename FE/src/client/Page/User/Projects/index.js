import classNames from "classnames/bind";
import styles from './Projects.module.scss'
import { DateIcon, UserIcon, EyeIcon, DowIcon, SearchIcon } from "../../../Icon";
import postImg from '../../../Image/post.jpg'
import { Link, useParams } from "react-router-dom";
import ProjectNewsRight from '../ProjectNewsRight'
import * as ServiceProjectListApi from './../../../apiServieces/ProjectListApi'
import { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { useContext } from "react";
import { MyContext } from "../../../../App";

const cx = classNames.bind(styles)
const itemsPerPage = 5;

function Projects() {
    const type = useContext(MyContext)
    const {urlDepartmentId, departmentName} = useParams()
    const [dataProjects, setDataProject] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const inputSearchRef = useRef('')
    const [checkActiveNewsRight, setCheckActiveNewsRight] = useState(true)
    useEffect(() => {
        if(type === 'projectsByDeparmentId') {
            fecthProjectByDeparmentId(urlDepartmentId)
        }else {
           
            fecthProjectGetAll()
        }
    }, [type,urlDepartmentId])

    const fecthProjectGetAll = async () => {
        const rs = await ServiceProjectListApi.GetAll()
        inputSearchRef.current.value = ''
        setCheckActiveNewsRight(false)
        setDataProject(rs)
       
    }
    const fecthDeparmentgetDataByNameAndKhoaId  = async (projectName, deparmentId) => {
        const rs = await ServiceProjectListApi.GetDataByNameAndKhoaId(projectName, deparmentId)
        
        setDataProject(rs)
    }
    const fecthProjectByDeparmentId = async (deparmentId)  => {
        const rs = await ServiceProjectListApi.GetByDepartmentId(deparmentId)
        inputSearchRef.current.value = ''
        setCheckActiveNewsRight(true)
        setDataProject(rs)
    }
    const fecthProjectGetByName = async (name) => {
        const rs = await ServiceProjectListApi.GetByName(name)
        if(rs) {
            setDataProject(rs)
        }else {
            setDataProject(null)
        }
    }
    const handlePageChange = ( page ) =>{
        setCurrentPage(page.selected + 1);
    }
    const renderProject = (item, index) => (
        <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} key={index} className={cx('content-project')}>
            <span className={cx("project-lable")}>{item.Name}</span>
            <div className={cx("comment-dateUser")}>
                <div className={cx("comment-date")}><DateIcon  classsName={cx('comment-icon')} /><span >{new Date(item.CreatedDate).toLocaleDateString()}</span></div>
                <div className={cx('comment-user')} ><UserIcon classsName={cx('comment-icon')} /><span>{item.UserName}</span></div>
                <div className={cx('comment-user')} ><EyeIcon classsName={cx('comment-icon')} /><span>{item?.Watched || 0}</span></div>
                <div className={cx('comment-user')} ><DowIcon classsName={cx('comment-icon')} /><span>{item?.Download || 0}</span></div>
            </div>
            <div className={cx('project-post')}>
                <img src={postImg} alt="img" />
                <div className={cx('post')}>
                    <div className={cx('post-text')} dangerouslySetInnerHTML={{ __html: item.Discriptions }} />
                    {/* <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} className={cx('post-button')}>ĐỌC THÊM</Link> */}
                </div>
            </div>
        </Link>
    );
    const totalPages = Math.ceil(dataProjects?.length / itemsPerPage) || 0;
    const handleSearch = async () => {
        if(inputSearchRef.current.value === '') {
          NotificationManager.warning("Hãy nhập tên tìm kiếm", 'Cảnh báo', 1000);
          return
        }
        if(type === 'projectsByDeparmentId') {
            fecthDeparmentgetDataByNameAndKhoaId(inputSearchRef.current.value, urlDepartmentId)
        }else {
            await fecthProjectGetByName(inputSearchRef.current.value)
        }
       
    }
    return (
        <div className={cx('wrapper')}>
            <NotificationContainer/>
            <div style={{width:'80%'}}>
                <div className={cx('app')}>
                    <div className={cx('app-lable')}>
                        {type === 'projectsByDeparmentId'  &&
                            departmentName
                        }
                    </div>
                    <div className={cx('nav-search')}>
                        <input ref={inputSearchRef} type="text" placeholder="Search..." />
                        <button onClick={handleSearch} className={cx('nav-buttonSearch')}><SearchIcon/></button>
                    </div>
                </div>
                <div className={cx('content-left')}>
                    {dataProjects && dataProjects?.length > 0 && 
                    dataProjects
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(renderProject)}
                    {
                        dataProjects.length !== 0 && 
                        <div className={cx('pagination')}>
                            <ReactPaginate
                                pageCount={totalPages}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={1}
                                onPageChange={handlePageChange}
                                previousLabel="<<"
                                nextLabel=">>"
                                breakLabel="..."
                                containerClassName={cx('pagination')}
                                pageClassName={cx('page-item')}
                                pageLinkClassName={cx('page-link')}
                                previousClassName={cx('page-item')}
                                previousLinkClassName={cx('page-link')}
                                nextClassName={cx('page-item')}
                                nextLinkClassName={cx('page-link')}
                                breakClassName={cx('page-item')}
                                breakLinkClassName={cx('page-link')}
                                activeClassName={cx('active')}
                            />
                        </div>
                    }
                </div>
                {dataProjects.length === 0 && <div className={cx('showInfoNoData')}>Không có dữ liệu</div> }
            </div>
           
            <ProjectNewsRight checkActiveNewsRight= {checkActiveNewsRight}  />
        </div>
    );
}

export default Projects;
