import classNames from "classnames/bind";
import styles from './NavMenu.module.scss';
import { Link } from "react-router-dom";
// import { SearchIcon } from "../../../../../../Icon";
import { useEffect, useState, useContext } from "react";
import * as ServiceUserApi from './../../../../../../apiServieces/UserApi'
import { MyContext } from "../../../../../../../App";
const cx = classNames.bind(styles)
function NavMenu() {
    const type = useContext(MyContext)
    const [dataUser, setDataUser] = useState(null)
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
                <ul className={cx('nav-list')} >
                    <Link to={'/'}    className={cx('nav-item', {'selected':  type.includes('homeUser')})}>TRANG CHỦ</Link>
                    {localStorage.getItem('statusLogin') === 'login' && (dataUser && dataUser.UserGroup === 'GV')  &&
                    <Link to={'/projectsManager'}    className={cx('nav-item', {'selected': ('projectsManager' === type || type === 'projectEditUser' || type === 'projectCreateUser')})}>QUẢN LÍ KHÓA LUẬN</Link>
                    }
                    <Link to={'/projects'}   className={cx('nav-item', {'selected':  type === 'projects' || 'projectPost' === type || type === 'projectsByDeparmentId' })}>DANH SÁCH KHÓA LUẬN</Link>
                    <Link to={'/forum'}   className={cx('nav-item', {'selected':  type.includes('forum')})}>DIỄN ĐÀN</Link>
                </ul>
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