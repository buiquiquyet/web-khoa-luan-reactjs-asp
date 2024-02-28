import classNames from "classnames/bind";
import styles from './SidebarAdmin.module.scss'
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BarIcon, HomeIcon, RightIcon } from "../../../../../Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from '../../../../../Image/logo.png'
const cx  = classNames.bind(styles)
function SidebarAdmin() {
    const [backgroundItem, setBackgroundItem ] = useState('')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const handleChangLink = (item) => {
        setBackgroundItem(item)
    }
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar collapsed={sidebarCollapsed} >
                <span onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={cx('icon')}>
                    <BarIcon />
                </span>
                <Link to={'/admin'} onClick={() => handleChangLink('')} className={cx('title')}>
                    <img className={cx('imgLogo')} src={logoImg} alt="img"/>
                </Link>
                <Menu className={cx('menu')}
                    menuItemStyles={{
                        button: ({ level }) => {
                        if (level === 0) {
                            return {
                            "&:hover": {
                                backgroundColor: "#c15b3e !important",
                                color: "white !important",
                                fontWeight: "bold !important" }, }; }},}}
                >
                    <SubMenu className={cx('submenu')} icon={<HomeIcon/>} label="Quản lí" >
                         
                        <MenuItem onClick={() =>  handleChangLink('item1')}  component={<Link to="/admin" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item1'})}>
                            Người dùng
                        </MenuItem>
                    
                    
                        <MenuItem onClick={() => handleChangLink('item3')}  component={<Link to="/adminForum" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item3'})}>
                            Diễn đàn
                        </MenuItem>
                         <MenuItem onClick={() => handleChangLink('item2')}  component={<Link to="/adminDuyet" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item2'})}>
                            Duyệt khóa luận
                        </MenuItem>
                        {/* <MenuItem onClick={() => handleChangLink('item4')}  component={<Link to="/admin" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item4'})}>
                            Khoa
                        </MenuItem>
                        <MenuItem onClick={() => handleChangLink('item5')}  component={<Link to="/admin" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item5'})}>
                            Chuyên ngành
                        </MenuItem>
                        <MenuItem onClick={() => handleChangLink('item6')}  component={<Link to="/admin" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item6'})}>
                            Chức vụ
                        </MenuItem>
                        <MenuItem onClick={() => handleChangLink('item7')}  component={<Link to="/admin" />}  icon={<RightIcon/>} className={cx('menuItem', {'selected': backgroundItem === 'item7'})}>
                            Khóa học
                        </MenuItem>  */}
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
     );
}

export default SidebarAdmin;