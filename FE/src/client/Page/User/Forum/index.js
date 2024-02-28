import { Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import styles from './Forum.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { MailIcon, BookMark } from '../../../Icon';
import * as ServiceForumApi from './../../../apiServieces/ForumApi'
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles)
function Forum() {
   const [dataForum, setDataForum] = useState(null);
   const [firstPartData, setFirstPartData] = useState([])
   const [secondPartData, setSecondPartData] = useState([])
   const [thirdPartData, setThirdPartData] = useState([])
   const fetchApiGetAllForum = async () => {
      const rs = await ServiceForumApi.GetAll()  
      setDataForum(rs)    
  }
  

   useEffect(() => {
      fetchApiGetAllForum()
      
   }, [])
   useEffect(() => {
      if(dataForum) {
         const length = dataForum.length;
         const partSize = Math.floor(length / 3);
         let firstPart;
         let secondPart;
         let thirdPart;
         if (length % 3 === 0) {
          
            firstPart = dataForum.slice(0, partSize );
            secondPart = dataForum.slice(partSize, 2 * partSize);
            thirdPart = dataForum.slice(2 * partSize);
          } else {
            if(length < 3) {
               firstPart = dataForum.slice(0, partSize + 1 );
               secondPart = dataForum.slice(2 * partSize + 1 , 2 * partSize + 2 );
               thirdPart = dataForum.slice(2 * partSize + 2);
            }
            else if(length % 2 === 0) {
               firstPart = dataForum.slice(0, partSize + 1 );
               secondPart = dataForum.slice(partSize + 1, 2 * partSize + 1 );
               thirdPart = dataForum.slice(2 * partSize + 1);
            }else {
               firstPart = dataForum.slice(0, partSize + 1 );
               secondPart = dataForum.slice(partSize + 1, 2 * partSize + 2 );
               thirdPart = dataForum.slice(2 * partSize + 2);
            }
          }
         setFirstPartData(firstPart)
         setSecondPartData(secondPart)
         setThirdPartData(thirdPart)
      }
   },[dataForum])
    return ( 
        <div className={cx("content-menu")}>
            <div   className={cx('contentNews')}>Tin Tức</div>
            <Menu  
               menuItemStyles={{
                button: ({ level }) => {
                  if (level === 0) {
                    return {
                      "&:hover": {
                         backgroundColor: "#335B8C !important",
                         color: "white !important",
                         fontWeight: "bold !important" }, }; }},}}
             >
                <SubMenu className={cx("dropdown-lable")} icon={<BookMark/>}   label={'Trao đổi khóa luận'} >
                    { firstPartData.length > 0 && firstPartData.map((item, index) => (
                     <MenuItem key={index} className={cx('dropdown-infor')} component={<Link to={`/forumComment/${item.ForumId}`}/>}>
                        <MailIcon classsName={cx('dropdown-icon')}/>
                        {item.Title}
                     </MenuItem>
                  
                    ))}
                </SubMenu>
            </Menu>
            <Menu 
                 menuItemStyles={{
                    button: ({ level }) => {
                      if (level === 0) {
                        return { 
                          "&:hover": {
                             backgroundColor: "#335B8C !important",
                             color: "white !important",
                              }, }; }}, }}
            >
                <SubMenu className={cx("dropdown-lable")} icon={<BookMark/>}  label={' Chia sẻ kinh nghiệm'} >
                  {  secondPartData.length > 0 && secondPartData.map((item, index) => (
                        <MenuItem key={index} className={cx('dropdown-infor')} component={<Link to={`/forumComment/${item.ForumId}`}/>}>
                           <MailIcon classsName={cx('dropdown-icon')}/>
                           {item.Title}
                        </MenuItem>
                     
                  ))}
                </SubMenu>
            </Menu>
            <Menu 
                 menuItemStyles={{
                    button: ({ level }) => {
                      if (level === 0) {
                        return { 
                          "&:hover": {
                             backgroundColor: "#335B8C !important",
                             color: "white !important",
                              }, }; }}, }}
            >
                <SubMenu className={cx("dropdown-lable")} icon={<BookMark/>}  label={'Định hướng nghiên cứu'} >
                  {  thirdPartData.length > 0 && thirdPartData.map((item, index) => (
                        <MenuItem key={index} className={cx('dropdown-infor')} component={<Link to={`/forumComment/${item.ForumId}`}/>}>
                           <MailIcon classsName={cx('dropdown-icon')}/>
                           {item.Title}
                        </MenuItem>
                     
                  ))}
                </SubMenu>
            </Menu>
        </div>
     );
}

export default Forum;