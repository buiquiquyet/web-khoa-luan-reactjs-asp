import classNames from "classnames/bind";
import styles from './NavMenu.module.scss';
import { Link } from "react-router-dom";
// import { SearchIcon } from "../../../../../../Icon";
import { useEffect, useState, useContext } from "react";
import * as ServiceUserApi from './../../../../../../apiServieces/UserApi'
import { MyContext } from "../../../../../../../App";
import {  BarIcon1  } from "../../../../../../Icon";



const cx = classNames.bind(styles)
function NavMenu() {
    const type = useContext(MyContext)
    const [dataUser, setDataUser] = useState(null)
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const fecthUserGetByName = async (id) => {
        const rs = await ServiceUserApi.GetById(id)
        setDataUser(rs)
    }
   
    useEffect(() => {
        fecthUserGetByName(localStorage.getItem('userId'))
    },[])
    return ( 
        <div className={cx('header-menu')}>
            <nav className={cx('nav-menu')}>
                <div className={cx('nav-list')} >
                    <div className={cx('div-nav')} onClick={toggleMenu}>
                        <BarIcon1 classsName={cx('nav-bar')}/>
                    </div>
                    <div className={cx({'overFlow': showMenu}) } onClick={toggleMenu}></div>
                    <ul className={cx('nav-ul',"m-0 p-0", {'open': showMenu})}>
                        <Link to={'/'}   
                            onClick={toggleMenu}
                            className={cx('nav-item', {'selected':  type.includes('homeUser')})}
                        >
                            TRANG CHỦ
                        </Link>
                        {localStorage.getItem('statusLogin') === 'login' && (dataUser && dataUser.UserGroup === 'GV')  &&
                        <Link to={'/projectsManager'} 
                         onClick={toggleMenu}   
                            className={cx('nav-item', {'selected': ('projectsManager' === type || type === 'projectEditUser' || type === 'projectCreateUser')})}
                        >
                            QUẢN LÍ KHÓA LUẬN
                        </Link>
                        }
                        <Link to={'/projects'}  
                            onClick={toggleMenu} 
                            className={cx('nav-item', {'selected':  type === 'projects' || 'projectPost' === type || type === 'projectsByDeparmentId' })}
                        >
                            DANH SÁCH KHÓA LUẬN
                        </Link>
                        <Link to={'/forum'}  
                            onClick={toggleMenu} 
                            className={cx('nav-item', {'selected':  type.includes('forum')})}
                        >
                            DIỄN ĐÀN
                        </Link>
                        <Link to={'/quydinh'}  
                            onClick={toggleMenu} 
                            className={cx('nav-item', {'selected':  type.includes('quydinh')})}
                        >
                            QUY ĐỊNH
                        </Link>
                    </ul>

                </div>
                {/* { (type === 'projectsManager' || type === 'projects') &&
                    <div className={cx('nav-search')}>
                        <input ref={inputSearchRef} type="text" placeholder="Search..." />
                        <button onClick={handleSearch} className={cx('nav-buttonSearch')}><SearchIcon/></button>
                    </div>
                } */}
            </nav>
        </div>
     );
}

export default NavMenu;