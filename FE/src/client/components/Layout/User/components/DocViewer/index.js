
import classNames from "classnames/bind";
import styles from './DocViewer.modules.scss'
import downloadImg from './../../../../../Image/download.gif'
import axios from 'axios';
import * as ServiceProjectApi from './../../../../../apiServieces/ProjectListApi'
import { useState, useEffect, useRef } from "react";
const cx = classNames.bind(styles)
function DocViewerPost({id, url}) {
    const pdfUrl = `https://localhost:7225/StaticFiles/${url}`;
    
    const [dataProject, setDataProject] = useState(null)
    const fecthProjectGetById = async (id) => {
        const rs = await ServiceProjectApi.GetById(id)
        if (rs) {
          setDataProject(rs);
        } 
    }
    const fecthProjectApiUpdateCountDownload = async (id, option) => {
        await ServiceProjectApi.Update(id, option)
    }
    useEffect(() => {
       
        fecthProjectGetById(id)
    }, [id])
    const handleDownload = async (url) => {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
    
            const blobURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileName = url.split("/").pop();
    
            const aTag = document.createElement("a");
            aTag.href = blobURL;
            aTag.setAttribute("download", fileName);
    
            const handleClick = async () => {
                if (dataProject) {
                    const formData = new FormData();
                    formData.append('Download', dataProject.Download + 1);
                    await fecthProjectApiUpdateCountDownload(id, formData);
                }
    
                aTag.removeEventListener('click', handleClick);
            };
    
            aTag.addEventListener('click', handleClick);
    
            document.body.appendChild(aTag);
            aTag.click();
    
            document.body.removeChild(aTag);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const iframeRef = useRef()
   
    return ( 
     <div className={cx('wrapper')}>
        <div className={cx('postIframe')}>
            <iframe 
                src={`${pdfUrl}#toolbar=0`}
                title="pdfFile" 
                ref={iframeRef}
                download="" 
                allowdownload="false"
                style={{border: 0}}
            />
            
        </div>
        <div className={cx('download')}>   
            <button className={cx('btn-download')} onClick={() => handleDownload(pdfUrl)}>
                <img src={downloadImg} alt="img" />
            </button>    
         </div>
     </div>
          
     );
}

export default DocViewerPost;