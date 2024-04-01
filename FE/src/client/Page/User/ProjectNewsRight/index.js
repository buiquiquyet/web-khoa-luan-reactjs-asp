
import styles from './ProjectNews.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {  UserIcon, EyeIcon, DowIcon } from "../../../Icon";
import * as ServiceProjectApi from './../../../apiServieces/ProjectListApi'
import { useState } from 'react';
import { useEffect } from 'react';
import * as ServiceDeparmentApi from './../../../apiServieces/Deparment'
const cx = classNames.bind(styles)
function ProjectNews({ checkActiveNewsRight }) {
    const [watchDataBig, setWatchDataBig] = useState(null)
    const [downloadDataBig, setdownloadDataBig] = useState(null)
    const [dataDeparment, setDataDeparment] = useState(null)
    const [selectedLink, setSelectedLink] = useState(null);

    const fecthProjectGetThreeDataBig = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBig()
        setWatchDataBig(rs)
    }
    const fecthProjectGetThreeDataBigDownload = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBigDownload()
        setdownloadDataBig(rs)
    }
    const fecthDeparmentGetAll = async () => {
        const rs = await ServiceDeparmentApi.GetAll()
        setDataDeparment(rs)
    }
    useEffect(() => {
        fecthProjectGetThreeDataBig()
        fecthDeparmentGetAll()
        fecthProjectGetThreeDataBigDownload()
    },[])
   

    const handleLinkClick = (index) => {
      setSelectedLink(index);
    };
    return ( 
        <div className={cx('content-right')}>
        <div className={cx('news-department')}>
            <div className={cx('news-lable')}>
                Khóa luận các khoa
            </div>
            <ul className={cx('news-nav','nav-department','p-0')}>
                {dataDeparment && dataDeparment.length > 0 &&
                dataDeparment.map((item, index) => (
                    <Link key={index} to={(`/projects/${item.DepartmentId}/${item.Name}`)} 
                            className={cx('nav-item', { selected: checkActiveNewsRight && selectedLink === index })}
                            onClick={() => handleLinkClick(index)}
                    >{item.Name}
                    </Link>
                ))
                }
                
            </ul>
        </div>
        <div  className={cx('news-department')}>
            <div className={cx('news-lable')}>Xem nhiều nhất</div>
            <ul className={cx('news-nav','p-0')}>
                {watchDataBig && watchDataBig.length > 0 &&  watchDataBig.map((item, index) => (
                    <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} key={index} className={cx('nav-item')}>
                        <div className={cx('commnet-title')}>{item.Name}</div>
                        <div className={cx("comment-dateUser")}>
                            <div className={cx('comment-user')} ><UserIcon classsName={cx('comment-icon')}/><span>{item.UserName}</span></div>
                            <div className={cx('comment-user')} ><EyeIcon classsName={cx('comment-icon')}/><span>{item.Watched}</span></div>
                            <div className={cx('comment-user')} ><DowIcon classsName={cx('comment-icon')}/><span>{item.Download}</span></div>
                        </div>
                    </Link>
                ))
                }
            </ul>
        </div>
        <div  className={cx('news-department')}>
            <div className={cx('news-lable')}>Tải nhiều nhất</div>
            <ul className={cx('news-nav','p-0')}>
                {downloadDataBig && downloadDataBig.length > 0 &&  downloadDataBig.map((item, index) => (
                    <Link to={`/projectPost/${item.ProjectListId}/${item.UserName}`} key={index} className={cx('nav-item')}>
                        <div className={cx('commnet-title')}>{item.Name}</div>
                        <div className={cx("comment-dateUser")}>
                            <div className={cx('comment-user')} ><UserIcon classsName={cx('comment-icon')}/><span>{item.UserName}</span></div>
                            <div className={cx('comment-user')} ><EyeIcon classsName={cx('comment-icon')}/><span>{item.Watched}</span></div>
                            <div className={cx('comment-user')} ><DowIcon classsName={cx('comment-icon')}/><span>{item.Download}</span></div>
                        </div>
                    </Link>
                ))
                }
            </ul>
        </div>
    </div>
     );
}

export default ProjectNews;