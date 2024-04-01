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
    const [inputSearch, setInputSearch] = useState('')
    const totalPages = Math.ceil(dataProjects?.length / itemsPerPage) || 0;

    const fecthProjectGetAll = async () => {
        const rs = await ServiceProjectListApi.GetAll()
        inputSearchRef.current.value = ''
        setCheckActiveNewsRight(false)
        setDataProject(rs)
    }
    const fecthDeparmentgetDataByNameAndKhoaId  = async (projectName, deparmentId) => {
        // const rs = await ServiceProjectListApi.GetDataByNameAndKhoaId(projectName, deparmentId)
        
        // setDataProject(rs)
    }
    const fecthProjectByDeparmentId = async (deparmentId)  => {
        const rs = await ServiceProjectListApi.GetByDepartmentId(deparmentId)
        inputSearchRef.current.value = ''
        setCheckActiveNewsRight(true)
        setDataProject(rs)
    }
    console.log(dataProjects);
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
            <div className={cx("comment-dateUser",'row')}>
                <div  className="row col-12 col-md-4">
                    <div className={cx("comment-date",'col-4')}><DateIcon  classsName={cx('comment-icon')} /><span style={{marginTop: '3px'}} >{new Date(item.CreatedDate).toLocaleDateString()}</span></div>
                    <div className={cx('comment-user','col-8')} ><UserIcon classsName={cx('comment-icon')} /><span style={{marginTop: '3px'}}>{item.UserName}</span></div>
                </div>
                <div className="row col-12 col-md-4">
                    <div className={cx('comment-user','col-2')} ><EyeIcon classsName={cx('comment-icon')} /><span style={{marginTop: '3px'}}>{item?.Watched || 0}</span></div>
                    <div className={cx('comment-user','col-8')} ><DowIcon classsName={cx('comment-icon')} /><span style={{marginTop: '3px'}}>{item?.Download || 0}</span></div>
                </div>
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
    const handleChangeInputSearch =  e => {

    }
    useEffect(() => {
        if(type === 'projectsByDeparmentId') {
            fecthProjectByDeparmentId(urlDepartmentId)
        }else {
           
            fecthProjectGetAll()
        }
    }, [type,urlDepartmentId])
    return (
        <div className={cx('wrapper','row')} style={{margin:'30px 0'}}>
            <NotificationContainer/>
            <div  className={cx('nav','row col-12 col-md-9')}>
                <div className={cx('app','row')}>
                    <div className={cx('app-lable','col-12 p-0 col-lg-5')}>
                        {type === 'projectsByDeparmentId'  &&
                            departmentName
                        }
                    </div>
                    <div className={cx('nav-search','col-12 col-md-4 p-0')} style={{width:'324px'}}>
                        <input 
                            ref={inputSearchRef}
                            value={inputSearch} 
                            type="text" placeholder="Search..."
                            onChange={handleChangeInputSearch}
                        />
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
                {dataProjects.length === 0 && <div className={cx('showInfoNoData')}>Không có dữ liệu khóa luận {departmentName}!</div> }
            </div>
           
            <div className="col-12 col-md-3 p-0 mt-4">
                <ProjectNewsRight checkActiveNewsRight= {checkActiveNewsRight}  />
            </div>
        </div>
    );
}

export default Projects;
