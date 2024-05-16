import classNames from "classnames/bind";
import styles from "./AdminForum.module.scss";
import { Button, Input, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as Servieces from "../../../apiServieces/ForumApi";
import * as ServiecesCommentApi from "../../../apiServieces/CommentApi";
import * as ServiecesEvaluate from "../../../apiServieces/Evaluate";
import { EditIcon, SearchIcon } from "../../../Icon";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
const cx = classNames.bind(styles);
function AdminForum() {
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    current: 1,
    total: 0,
  });
  const [commentIdArr, setCommentIdArr] = useState(null);
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");

  const [selectId, setSelectId] = useState([]);
  const fetchApiGetAllForum = async () => {
    const rs = await Servieces.GetAll();
    setDataSource(rs);
  };
  // const inputSearchRef = useRef();
  const fecthApiDeleteForum = async (option) => {
    const rs = await Servieces.Delete(option);
    if (rs !== null && rs !== undefined) {
      fetchApiGetAllForum();
      NotificationManager.success(rs, "Thành công", 1000);
    } else {
      NotificationManager.error("Đã xảy ra lỗi", "Lỗi", 1000);
    }
  };
  const fecthCommentDelByPostTypeAndIdArr = async (option, type) => {
    const rs = await ServiecesCommentApi.DeleteByPostTypeAndIdArr(option, type);
    if (rs !== "underfined" && rs?.length > 0) {
      setCommentIdArr(() => {
        return rs.map((item) => item.CommentId);
      });
    }
  };
  const fecthEvaluateDelByCommentIdArr = async (option) => {
    await ServiecesEvaluate.DeleteByCommentIdArr(option);
  };
  // const fechApiGetByName = async (name) => {
  //   const rs = await Servieces.GetByName(name);
  //   setDataSource(rs);
  // };

  const handleSearchName = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearchName(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearchName(selectedKeys, confirm, dataIndex)}
            icon={<SearchIcon />}
            size="small"
            style={{ width: 90 }}
          ></Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? <span>{text}</span> : text,
  });
  const columns = [
    {
      title: "Tên diễn đàn",
      dataIndex: "Title",
      key: "Title",
      ...getColumnSearchProps("Title"),
      width: "30%",
      render: (text) => <div className={cx("td-table")} style={{width:"100%"}}>{text}</div>,
    },
    {
      title: "Nội dung",
      dataIndex: "Discriptions",
      key: "Discriptions",
      render: (text) => (
        <div
          className={cx("td-table")}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
    },
    {
      title: "Chỉnh Sửa",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => (
        <span>
          <Link to={`/AdminCreateEditForum/${record.ForumId}`}>
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
      "Bạn có chắc muốn xóa những diễn đàn này?"
    );
    if (userConfirmed) {
      fecthCommentDelByPostTypeAndIdArr(selectId, "forumComment");
      fecthApiDeleteForum(selectId);
    }
  };
  // const handleSearch = () => {
  //   if (inputSearchRef.current.value === "") {
  //     NotificationManager.warning(
  //       "Hãy nhập tiêu đề diễn đàn",
  //       "Cảnh báo",
  //       1000
  //     );
  //   } else {
  //     fechApiGetByName(inputSearchRef.current.value);
  //   }
  // };
  useEffect(() => {
    fetchApiGetAllForum();
  }, []);
  useEffect(() => {
    if (commentIdArr) {
      fecthEvaluateDelByCommentIdArr(commentIdArr);
    }
  }, [commentIdArr]);
  return (
    <div className={cx("wrapper")}>
      <NotificationContainer />
      <div className={cx("lable")}>Diễn đàn</div>
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
          <Link to={"/AdminCreateEditForum"}>
            <Button type="primary">Thêm</Button>
          </Link>
        </div>
        {/* <div className={cx("search")}>
          <input
            className={cx("input")}
            ref={inputSearchRef}
            type="text"
            placeholder="Nhập tiêu đề..."
          />
          <button onClick={handleSearch} className={cx("search-button")}>
            <SearchIcon />
          </button>
        </div> */}
      </div>
      <Table
        className={cx("table")}
        rowKey={(record) => record.ForumId}
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
      />
    </div>
  );
}

export default AdminForum;
