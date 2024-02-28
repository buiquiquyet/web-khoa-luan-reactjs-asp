import React, { useEffect, useRef, useState } from 'react';
import { Button,Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './AdminProjectListCheck.module.scss';
import * as  ServiecesProject from '../../../apiServieces/ProjectListApi'
import { LinkIcon } from '../../../Icon';
const cx = classNames.bind(styles);

function AdminProjectListCheck() {
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [selectId, setSelectId] = useState([])
  const tableRef = useRef(null)
  const fetchApiGetAllProjectList = async () => {
      const rs = await ServiecesProject.GetAllAdmin()  
      setDataSource(rs)    
      // setPagination((prevPagination) => ({
      //   ...prevPagination,
      //   total: rs.length, 
      // }));
  }
  useEffect(() => {
      fetchApiGetAllProjectList()
  }, [])
  const columns = [
    { title: 'Tên khóa luận', dataIndex: 'Name', key: 'Name',
        render : text =>  <div className={cx('td-table')} >{ text }</div>  
    },
    { title: 'Họ tên ', dataIndex: 'UserName', key: 'UserName' }, 
    { title: 'File ', dataIndex: 'Image', key: 'Image',
        render : (text) =>  <a href={`https://localhost:7225/StaticFiles/${text}`} target="_blank" rel="noopener noreferrer" className={cx('linkFile-icon')}><LinkIcon/></a>   
    }, 
    { title: 'Thời gian', dataIndex: 'CreatedDate', key: 'CreatedDate',   render: (text) => new Date(text).toLocaleDateString(), },
    { title: 'Trạng thái', dataIndex: 'CheckAdmin', key: 'NaCheckAdminme',
        filters: [
          {
            text: 'Chờ duyệt',
            value: 0,
          },
          {
            text: 'Đã duyệt',
            value: 1,
          },
          {
            text: "Không duyệt",
            value: 2,
          },
         
        ],
        onFilter: (value, record) => record.CheckAdmin === value,
        // sorter: (a, b) => a.CheckAdmin - b.CheckAdmin,
        render : text =>  (
          <div >
            { text === 1 ?
              <span style={{color:"green", fontWeight:"bold"}}>Đã duyệt</span>
            : text === 0 ? <span style={{color:"#999", fontWeight:"bold"}}>Chờ duyệt</span> : <span style={{color:"red", fontWeight:"bold"}}>Không duyệt</span>}
          </div>
        )
        
    }
  ];
  const handleCheckAdminSubmit = async () => {
        let formData = []
        if(selectId.length > 0) {
            formData = selectId.map(item => {
                return {
                  ProjectListId : item, 
                  CheckAdmin : 1
                }
            })
            
            const rs = await ServiecesProject.UpdateCheckAdmin( formData)
            if(rs) {
              setSelectId([])
              await fetchApiGetAllProjectList()
              
            }
        }
  }
  const handleCheckAdminUnSubmit = async () => {
    
    let formData = []
    if(selectId.length > 0) {
        formData = selectId.map(item => {
            return {
              ProjectListId : item, 
              CheckAdmin : 2
            }
        })
        
        const rs = await ServiecesProject.UpdateCheckAdmin( formData)
        if(rs) {
          setSelectId([])
          await fetchApiGetAllProjectList()
          
        }
    }
  }
  const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
    
    setSelectId(selectedRowKeys)
    // console.log('Selected Rows:', selectedRows);
  };
  const rowSelection = {
    selectedRowKeys: selectId,
    onChange: handleCheckboxChange,
    
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('lable')}>Duyệt Khóa Luận</div>
            { selectId.length > 0 && 
            <div className={cx('box')} >
                <div className={cx('box-button')} >
                    <Button onClick={handleCheckAdminSubmit}  style={{backgroundColor:"green", color:"white", marginRight:"10px"}} type='primary'>Duyệt</Button>
                    <Button onClick={handleCheckAdminUnSubmit}  style={{backgroundColor:"red", color:"white"}} type='error'>Không duyệt</Button>
                </div>
            </div>
            }
            <Table
              ref={tableRef}
              className={cx('table')}
              rowKey={(record) => record.ProjectListId}
              rowSelection={rowSelection}
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              onChange={(pagination) => setPagination(pagination)}
            />
    </div>
  );
}

export default AdminProjectListCheck;
