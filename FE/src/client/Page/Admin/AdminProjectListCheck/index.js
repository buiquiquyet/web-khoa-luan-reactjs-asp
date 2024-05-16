import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminProjectListCheck.module.scss";
import * as ServiecesProject from "../../../apiServieces/ProjectListApi";
import { LinkIcon, SearchIcon } from "../../../Icon";
const cx = classNames.bind(styles);

function AdminProjectListCheck() {
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [selectId, setSelectId] = useState([]);
  const tableRef = useRef(null);
  const fetchApiGetAllProjectList = async () => {
    const rs = await ServiecesProject.GetAllAdmin();
    setDataSource(rs);
    // setPagination((prevPagination) => ({
    //   ...prevPagination,
    //   total: rs.length,
    // }));
  };

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
      title: "Tên khóa luận",
      dataIndex: "Name",
      key: "Name",
      width: "50%",
      ...getColumnSearchProps("Name"),
      render: (text) => <div className={cx("td-table")}>{text}</div>,
    },
    { title: "Họ tên ", dataIndex: "UserName", key: "UserName" },
    { title: "Khoa ", dataIndex: "DepartmentName", key: "DepartmentName" },
    {
      title: "File ",
      dataIndex: "Image",
      key: "Image",
      render: (text) => (
        <a
          href={`https://localhost:7225/StaticFiles/${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cx("linkFile-icon")}
        >
          <LinkIcon />
        </a>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "CheckAdmin",
      key: "NaCheckAdminme",
      filters: [
        {
          text: "Chờ duyệt",
          value: 0,
        },
        {
          text: "Đã duyệt",
          value: 1,
        },
        {
          text: "Không duyệt",
          value: 2,
        },
      ],
      onFilter: (value, record) => record.CheckAdmin === value,
      // sorter: (a, b) => a.CheckAdmin - b.CheckAdmin,
      render: (text) => (
        <div>
          {text === 1 ? (
            <span style={{ color: "green", fontWeight: "bold" }}>Đã duyệt</span>
          ) : text === 0 ? (
            <span style={{ color: "#999", fontWeight: "bold" }}>Chờ duyệt</span>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Không duyệt
            </span>
          )}
        </div>
      ),
    },
  ];
  const handleCheckAdminSubmit = async (checkAdmin) => {
    let formData = [];
    if (selectId.length > 0) {
      formData = selectId.map((item) => {
        return {
          ProjectListId: item,
          CheckAdmin: checkAdmin,
        };
      });

      const rs = await ServiecesProject.UpdateCheckAdmin(formData);
      if (rs) {
        setSelectId([]);
        await fetchApiGetAllProjectList();
      }
    }
  };
  
  const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
    setSelectId(selectedRowKeys);
    // console.log('Selected Rows:', selectedRows);
  };
  const rowSelection = {
    selectedRowKeys: selectId,
    onChange: handleCheckboxChange,
  };
  useEffect(() => {
    fetchApiGetAllProjectList();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("lable")}>Duyệt Khóa Luận</div>
      {/* {selectId.length > 0 && ( */}
        <div className={cx("box")} style={{visibility: selectId.length > 0 ? "" : "hidden"}}>
          <div className={cx("box-button")}>
            <Button
              onClick={() => handleCheckAdminSubmit("1")}
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "10px",
              }}
              type="primary"
            >
              Duyệt
            </Button>
            <Button
              onClick={() => handleCheckAdminSubmit("2")}
              style={{ backgroundColor: "red", color: "white",marginRight: "10px", }}
              type="error"
            >
              Không duyệt
            </Button>
            <Button
              onClick={() => handleCheckAdminSubmit("0")}
              style={{ backgroundColor: "gray", color: "white" }}
              type="info"
            >
              Chờ duyệt 
            </Button>
          </div>
        </div>
      <Table
        ref={tableRef}
        className={cx("table")}
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
