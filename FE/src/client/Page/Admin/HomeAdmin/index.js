import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./HomdAdmin.module.scss";
import * as Servieces from "../../../apiServieces/UserApi";
import * as ServiecesComment from "../../../apiServieces/CommentApi";
import * as ServiecesEvaluate from "../../../apiServieces/Evaluate";
import { Link } from "react-router-dom";
import { EditIcon, SearchIcon } from "../../../Icon";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useRef } from "react";
import UserImg from "./../../../Image/user.png"
const cx = classNames.bind(styles);

function HomeAdmin() {
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });

  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [selectId, setSelectId] = useState([]);
  const fetchApiGetAllUser = async () => {
    const rs = await Servieces.GetAll();
    setDataSource(rs);
  };
  const fecthApiDeleteUser = async (option) => {
    await fecthCommentDelByUserId(option);
    await fecthEvaluateDelByUserId(option);
    const rs = await Servieces.Delete(option);
    if (rs !== null && rs !== undefined) {
      fetchApiGetAllUser();
      NotificationManager.success(rs, "Thành công", 1000);
    } else {
      NotificationManager.error("Đã xảy ra lỗi", "Lỗi", 1000);
    }
  };
  // const fechApiGetByNameUser = async (name) => {
  //   const rs = await Servieces.GetByName(name);
  //   if (rs) {
  //     setDataSource(rs);
  //   } else {
  //     setDataSource([]);
  //   }
  // };
  const fecthCommentDelByUserId = async (option) => {
    try {
      await ServiecesComment.DeleteByUserIdArr(option);
    } catch (error) {
      throw error;
    }
  };
  const fecthEvaluateDelByUserId = async (option) => {
    try {
      await ServiecesEvaluate.DeleteByUserIdArr(option);
    } catch (error) {
      throw error;
    }
  };

  const handleSearchName = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchName(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearchName(selectedKeys, confirm, dataIndex)}
            icon={<SearchIcon />}
            size="small"
            style={{ width: 90 }}
          >
            
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchIcon style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <span>{text}</span>
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "Image",
      key: "Image",
      width:"6%",
      render: (text, record) => (
        <img
          src={text ? `https://localhost:7225/StaticImages/` + text : UserImg}
          alt={`Hình ảnh`}
          className={cx("table-img")}
        />
      ),
    },
    { title: "Tài Khoản", dataIndex: "Username", key: "Username",width:"8%", },
    { title: "Mật Khẩu", dataIndex: "Password", key: "Password",width:"8%", },
    { title: "Chức vụ", dataIndex: "UserGroup", key: "UserGroup",width:"6%", },
    {
      title: "Họ Tên",
      dataIndex: "Name",
      key: "Name",
      width:"18%",
      ...getColumnSearchProps("Name"),
    },
    { title: "Lớp", dataIndex: "ClassName", key: "ClassName",width:"8%" },
    { title: "Khoa", dataIndex: "DepartmentName", key: "DepartmentName", width:"18%" },
    {
      title: "Chuyên ngành",
      dataIndex: "SpecializedName",
      width:"18%",
      key: "SpecializedName",
    },
    // { title: 'SĐT', dataIndex: 'PhoneNumber', key: 'PhoneNumber' },
    // { title: 'Email', dataIndex: 'Email', key: 'Email' },
    // { title: 'Địa Chỉ', dataIndex: 'Address', key: 'Address' },
    // { title: 'Giới tính', dataIndex: 'Sex', key: 'Sex' },
    // { title: 'Ngày Sinh', dataIndex: 'DateOfBirth', key: 'DateOfBirth',   render: (text) => new Date(text).toLocaleDateString(), },

    {
      title: "Chỉnh Sửa",
      dataIndex: "edit",
      key: "edit",
      width:"6%",
      render: (text, record) => (
        <span>
          <Link to={`/AdminCreateEditUser/${record.UserId}`}>
            <EditIcon />
          </Link>
        </span>
      ),
    },
  ];

  const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
    setSelectId(selectedRowKeys);
    // console.log('Selected Rows:', selectedRows);
  };
  const rowSelection = {
    onChange: handleCheckboxChange,
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm(
      "Bạn có chắc muốn xóa những người dùng này?"
    );
    if (userConfirmed) {
      fecthApiDeleteUser(selectId);
    }
  };
  // const handleSearch = () => {
  //   if (inputSearchRef.current.value === "") {
  //     NotificationManager.warning("Hãy nhập họ và tên", "Cảnh báo", 1000);
  //   } else {
  //     fechApiGetByNameUser(inputSearchRef.current.value);
  //   }
  // };
  useEffect(() => {
    fetchApiGetAllUser();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <NotificationContainer />
      <div className={cx("lable")}>Người Dùng</div>
      <div className={cx("box")}>
        <div className={cx("box-button")}>
          <Button
            onClick={handleDelete}
            disabled={!selectId.length > 0}
            className={cx("button")}
            style={{ backgroundColor: "red" }}
            type="primary"
          >
            Xóa
          </Button>
          <Link to={"/AdminCreateEditUser"}>
            <Button type="primary">Thêm</Button>
          </Link>
        </div>
        {/* <div className={cx("search")}>
          <input
            className={cx("input")}
            ref={inputSearchRef}
            type="text"
            placeholder="Nhập họ và tên..."
          />
          <button onClick={handleSearch} className={cx("search-button")}>
            <SearchIcon />
          </button>
        </div> */}
      </div>
      <Table
        className={cx("table")}
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
