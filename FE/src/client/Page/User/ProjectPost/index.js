import classNames from "classnames/bind";
import styles from './ProjectPost.module.scss'
import ProjectNewsRight from '../ProjectNewsRight'
import DocViewerPost from "../../../components/Layout/User/components/DocViewer";
import CommentForm from "../../../components/Layout/User/components/CommentForm";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../../../App";
import * as ServiceProjectListApi from './../../../apiServieces/ProjectListApi'
import { useParams } from "react-router-dom";
import React from 'react';


const cx = classNames.bind(styles)
export const ProjectContext = React.createContext();


function ProjectPost() {
   
    const {projectId,userName} = useParams()
    const [dataProject , setDataProject] = useState(null)

    const type = useContext(MyContext)
    const viewCountRef = useRef(null)

    const fecthProjectGetById = async (id) => {
        const rs = await ServiceProjectListApi.GetById(id)
        if (rs) {
          setDataProject(rs);
        } 
    }
    const fecthProjectUpdateViewCount = async (id, option) => {
      await ServiceProjectListApi.Update(id, option)
    } 
    useEffect(() => {
      if (dataProject) {
        viewCountRef.current = dataProject.Watched + 1
        if(viewCountRef.current !== null) {
          const formData = new FormData()
          formData.append('Watched',viewCountRef.current)
          fecthProjectUpdateViewCount(projectId, formData)
        }
      }
    },[projectId,dataProject])
    useEffect(() => {
        fecthProjectGetById(projectId)
    }, [projectId])
    return (
        <div className={cx('wrapper','row container-fluid ')}>
          
            {dataProject && 
            <div className={cx('content-left col-12 col-lg-9 p-0 ')}>
                
                <div className={cx("project-lable")}>{dataProject.Name}</div>
                <div className={cx('post-text','p-4 pt-0 pb-0')} dangerouslySetInnerHTML={{ __html: dataProject.Discriptions }} />
                <div  >
                    <DocViewerPost url={dataProject.Image}  id={projectId}/>
                </div>
                <ProjectContext.Provider value={userName}>
                    <CommentForm  idForum = {projectId}  typePost={type}/>
                </ProjectContext.Provider >
            </div>
            }
            <div className="col-12 col-lg-3">
              <ProjectNewsRight/> 
            </div>
        </div>
     );
}

export default ProjectPost;