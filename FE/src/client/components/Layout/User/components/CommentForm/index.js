import classNames from "classnames/bind";
import styles from "./CommentForm.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import * as ServiceCommentApi from "./../../../../../apiServieces/CommentApi";
import * as ServiceUserApi from "./../../../../../apiServieces/UserApi";
import CommentItem from "./CommentItem";
import { SendIcon } from "../../../../../Icon";
const cx = classNames.bind(styles);
function CommentForm({ idForum, typePost }) {
  // const [dataUser, setDataUser] = useState(localStorage.getItem('statusLogin')? { name: localStorage.getItem('name'),
  //                                                                                 email: localStorage.getItem('email')
  //                                                                                 } : {name : "",
  //                                                                                     email : ""})
  const [commentTextArea, setCommentTextarea] = useState("");

  const [dataComment, setDataComment] = useState(null);
  const [checkCommentUser, setCheckCommentUser] = useState(false);
  const [dataCommentEdit, setDataCommentEdit] = useState(null);
  const [dataEditComment, setDataEditComment] = useState(null);
  const [visibleItems, setVisibleItems] = useState(2);
  const modalRef = useRef();
  const hideCommentRef = useRef();
  const contentEditableRef = useRef(null);

  const handleChangeDivEdit = (event) => {
    const inputValue = event.target.innerText;
    setDataCommentEdit(inputValue);
    // if (inputValue !== dataEditComment.Discriptions) {
    //   setDataEditComment((prev) => ({
    //     ...prev,
    //     Discriptions: inputValue,
    //   }));
    // }
  };
  //lấy checkComment
  const fecthUserApiCheckComment = async (userId) => {
    try {
      const rs = await ServiceUserApi.GetUserIdCheckComment(userId);

      if (rs) {
        setCheckCommentUser(true);
        return;
      }
      setCheckCommentUser(false);
    } catch (error) {
      throw error;
    }
  };
  const fecthCommentApiCreate = async (obj) => {
    try {
      const rs = await ServiceCommentApi.CreateComment(JSON.stringify(obj));
      return rs;
    } catch (error) {
      throw error;
    }
  };
  const fecthCommentApiEdit = async (id, option) => {
    try {
      const rs = await ServiceCommentApi.Update(id, option);
      return rs;
    } catch (error) {
      throw error;
    }
  };
  const fecthCommentApiGetTypePost = async (commentType, postId) => {
    try {
      const rs = await ServiceCommentApi.GetByTypePost(commentType, postId);
      setDataComment(rs);
    } catch (error) {
      throw error;
    }
  };
  const handleChangeDiv = (e) => {
    setCommentTextarea(e.target.innerText);
  };

  const handleSubmit = async () => {
    if (localStorage.getItem("name")) {
      let obj = {};
      if (commentTextArea === "") {
        NotificationManager.warning(
          "Nhập đầy đủ các thông tin",
          "Cảnh báo",
          1000
        );
        return;
      }
      obj.UserId = localStorage.getItem("userId");
      obj.FullName = localStorage.getItem("name");
      obj.Email = "";
      obj.CommentDate = new Date();
      obj.Discriptions = commentTextArea;
      obj.CommentType = typePost;
      obj.PostId = idForum;
      const rs = await fecthCommentApiCreate(obj);
      if (rs) {
        if (contentEditableRef.current) {
          contentEditableRef.current.textContent = "";
        }
        await fecthCommentApiGetTypePost(typePost, idForum);
        NotificationManager.success(
          "Gửi bình luận thành công",
          "Thành công",
          1000
        );
      } else {
        NotificationManager.error("Đã xảy ra lỗi", "Lỗi", 1000);
      }
    } else {
      NotificationManager.error("Hãy đăng nhập để bình luận", "Cảnh báo", 1000);
    }
  };
  const handleEditComment = useCallback((item) => {
    setDataEditComment(item);
    modalRef.current.style.display = "block";
  }, []);

  const handleSubmitEditComment = async () => {
    const value = dataEditComment.Discriptions;
    dataEditComment.Discriptions = dataCommentEdit;
    if (dataCommentEdit === null) {
      dataEditComment.Discriptions = value;
    }
    if (dataCommentEdit === "") {
      NotificationManager.warning(
        "Nhập đầy đủ các thông tin",
        "Cảnh báo",
        1000
      );
      return;
    }
    const rs = await fecthCommentApiEdit(
      dataEditComment.CommentId,
      dataEditComment
    );
    if (rs) {
      fecthCommentApiGetTypePost(typePost, idForum);
      modalRef.current.style.display = "none";
      NotificationManager.success(
        "Gửi bình luận thành công",
        "Thành công",
        1000
      );
    } else {
      NotificationManager.error("Đã xảy ra lỗi", "Lỗi", 1000);
    }
  };
  const handleHideModal = () => {
    modalRef.current.style.display = "none";
  };
  //show and hide comment
  const handleShowMoreComment = () => {
    if (visibleItems < dataComment.length) {
      hideCommentRef.current.style.display = "block";
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    }
  };
  const handleShowAllComment = () => {
    if (visibleItems < dataComment.length) {
      hideCommentRef.current.style.display = "block";
      setVisibleItems(dataComment.length);
    }
  };
  const handleHideCommemt = () => {
    hideCommentRef.current.style.display = "none";
    setVisibleItems(2);
  };
  useEffect(() => {
    fecthCommentApiGetTypePost(typePost, idForum);
    fecthUserApiCheckComment(JSON.parse(localStorage.getItem("userId")));
  }, [typePost, idForum]);
  return (
    <div className={cx("wrapper")}>
      <div ref={modalRef} className={cx("modal")}>
        <div onClick={handleHideModal} className={cx("overFlow")}></div>
        <div className={cx("modal-content")}>
          <div className={cx("comment-input")}>
            <div
              className={cx("comment-box")}
              contentEditable="true"
              onInput={handleChangeDivEdit}
              suppressContentEditableWarning={true}
              dangerouslySetInnerHTML={{
                __html: dataEditComment ? dataEditComment.Discriptions : "",
              }}
            ></div>
            <button
              onClick={handleSubmitEditComment}
              className={cx("comment-button")}
            >
              <SendIcon className={cx("commment-iconSend")} />
            </button>
          </div>
        </div>
      </div>
      <NotificationContainer />

      <div className={cx("comment-import")}>
        <div className={cx("comment-form")}>
          {!checkCommentUser ? (
            <>
              <label>Viết bình luận</label>
              <div className={cx("comment-input")}>
                <div
                  ref={contentEditableRef}
                  className={cx("comment-box")}
                  contentEditable="true"
                  onInput={handleChangeDiv}
                  //   onBlur={handleChangeInputDiv}
                ></div>
                <button onClick={handleSubmit} className={cx("comment-button")}>
                  <SendIcon classsName={cx("commment-iconSend")} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: "red" }}>Bạn đã bị cấm chat</div>
          )}
        </div>
      </div>

      {dataComment && dataComment.length > 0 && (
        <div className={cx("comment-show")}>
          <CommentItem
            onEditComment={handleEditComment}
            dataComment={dataComment}
            visibleItems={visibleItems}
            fecthCommentApiGetTypePost={fecthCommentApiGetTypePost}
            typePost={typePost}
            idForum={idForum}
          />
          {dataComment && dataComment.length > 2 && (
            <div className={cx("comment-loadMore")}>
              <span onClick={handleShowMoreComment}>Xem thêm bình luận</span>
              <span onClick={handleShowAllComment}>Hiển thị tất cả</span>
              <span
                ref={hideCommentRef}
                onClick={handleHideCommemt}
                className={cx("hide-less")}
              >
                Ẩn bớt
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentForm;
