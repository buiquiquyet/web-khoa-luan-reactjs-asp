import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomdAdmin.module.scss';
import * as  Servieces from '../../../apiServieces/UserApi'
import * as  ServiecesComment from '../../../apiServieces/CommentApi'
import * as  ServiecesEvaluate from '../../../apiServieces/Evaluate'
import { Link } from 'react-router-dom';
import { EditIcon,SearchIcon } from '../../../Icon';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { useRef } from 'react';
const cx = classNames.bind(styles);

function HomeAdmin() {
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const inputSearchRef = useRef()
  const [selectId, setSelectId] = useState([])
  const fetchApiGetAllUser = async () => {
      const rs = await Servieces.GetAll()  
      setDataSource(rs)    
      // setPagination((prevPagination) => ({
      //   ...prevPagination,
      //   total: rs.length, 
      // }));
  }
  const fecthApiDeleteUser = async (option) => {
    await fecthCommentDelByUserId(option)
    await fecthEvaluateDelByUserId(option)
    const rs = await Servieces.Delete(option)
    if(rs !== null && rs !== undefined) { 
      fetchApiGetAllUser()
      NotificationManager.success(rs, 'Thành công', 1000);
    } else {
      NotificationManager.error("Đã xảy ra lỗi", 'Lỗi', 1000);
    }
  }
  const fechApiGetByNameUser = async (name) => {
    const rs = await Servieces.GetByName(name)
    if(rs) {
      setDataSource(rs)
    }else {
      setDataSource([])
    }
    
  }
  const fecthCommentDelByUserId = async (option) => {
    try {
      await ServiecesComment.DeleteByUserIdArr(option)
    } catch (error) {
      throw error
    }
  }
  const fecthEvaluateDelByUserId = async (option) => {
    try {
       await ServiecesEvaluate.DeleteByUserIdArr(option)
    } catch (error) {
      throw error
    }
  } 
  useEffect(() => {
      fetchApiGetAllUser()
  }, [])
  const columns = [
    { title: 'Hình ảnh', dataIndex: 'Image', key: 'Image', render: (text, record) => (
      <img src={`https://localhost:7225/StaticImages/` + text} alt={`Hình ảnh`} className={cx('table-img')} />
    ), },
    { title: 'Tài Khoản', dataIndex: 'Username', key: 'Username' },
    { title: 'Mật Khẩu', dataIndex: 'Password', key: 'Password' },
    { title: 'Chức vụ', dataIndex: 'UserGroup', key: 'UserGroup' },
    { title: 'Họ Tên', dataIndex: 'Name', key: 'Name' },
    { title: 'Lớp', dataIndex: 'ClassName', key: 'ClassName' },
    { title: 'Khoa', dataIndex: 'DepartmentName', key: 'DepartmentName' },
    { title: 'Chuyên ngành', dataIndex: 'SpecializedName', key: 'SpecializedName' },
    // { title: 'SĐT', dataIndex: 'PhoneNumber', key: 'PhoneNumber' },
    // { title: 'Email', dataIndex: 'Email', key: 'Email' },
    // { title: 'Địa Chỉ', dataIndex: 'Address', key: 'Address' },
    // { title: 'Giới tính', dataIndex: 'Sex', key: 'Sex' },
    // { title: 'Ngày Sinh', dataIndex: 'DateOfBirth', key: 'DateOfBirth',   render: (text) => new Date(text).toLocaleDateString(), },

    { 
      title: 'Chỉnh Sửa', 
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <span>
          <Link to={`/AdminCreateEditUser/${record.UserId}`}><EditIcon /></Link>
        </span>
      ),
    },
    
  ];
  const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
      setSelectId(selectedRowKeys)
    // console.log('Selected Rows:', selectedRows);
  };
  const rowSelection = {
    onChange: handleCheckboxChange,
    
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn xóa những người dùng này?');
    if (userConfirmed) {
      fecthApiDeleteUser(selectId)
    }
  }
  const handleSearch = () => {
    if(inputSearchRef.current.value === '') {
      NotificationManager.warning("Hãy nhập họ và tên", 'Cảnh báo', 1000);
    } else {
      fechApiGetByNameUser(inputSearchRef.current.value)
    }
  }
  return (
    <div className={cx('wrapper')}>
      <NotificationContainer/>
      <div className={cx('lable')}>Người Dùng</div>
            <div className={cx('box')}>
              <div className={cx('box-button')}>
                <Button onClick={handleDelete} disabled= {!selectId.length > 0 } className={cx('button')} style={{backgroundColor: 'red'}} type='primary'>Xóa</Button>
                <Link to={'/AdminCreateEditUser'}><Button type='primary'>Thêm</Button></Link>
              </div>
              <div className={cx('search')}>
                <input className={cx('input')} ref={inputSearchRef} type='text' placeholder='Nhập họ và tên...'/>
                <button onClick={handleSearch}  className={cx('search-button')} ><SearchIcon /></button>
              </div>
            </div>
            <Table
              className={cx('table')}
              rowKey={(record) => record.UserId}
              rowSelection={rowSelection}
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              onChange={(pagination) => setPagination(pagination)}
            />
    </div>
  );
}

export default HomeAdmin;
