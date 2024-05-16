import Forum from "../Page/User/Forum";
import Home from "../Page/User/Home";
import Projects from "../Page/User/Projects";
import DefaultLayout from "../components/Layout/User/DefaultLayout";
import ForumComment from "../Page/User/ForumComment";
import ProjectPost from "../Page/User/ProjectPost";
import DefaultLayoutAdmin from "../components/Layout/Admin/DefaultLayoutAdmin";
import HomeAdmin from "../Page/Admin/HomeAdmin";
import ProjectsManager from "../Page/User/ProjectsManager";
import ProjectCreateEdit from "../Page/User/ProjectCreateEdit";
import AdminLogin from "../AdminLogin";
import AdminCreateEditUser from "../Page/Admin/AdminCreateEditUser";
import AdminForum from "../Page/Admin/AdminForum";
import AdminCreateEditForum from "../Page/Admin/AdminCreateEditForum";
import AdminProjectListCheck from "../Page/Admin/AdminProjectListCheck";
import quydinh from "../Page/User/quydinh";

const isLoggedIn = localStorage.getItem("statusLogin") === "login";
const checkUserGroup = localStorage.getItem("UserGroup") === "GV";
const checkAdmin = localStorage.getItem("adminLogin") === "login";

const basicRouter = [
  //user
  { path: "/", component: Home, layout: DefaultLayout, type: "homeUser" },
  {
    path: "/projects",
    component: Projects,
    layout: DefaultLayout,
    type: "projects",
  },
  {
    path: "/projects/:urlDepartmentId/:departmentName",
    component: Projects,
    layout: DefaultLayout,
    type: "projectsByDeparmentId",
  },
  { path: "/forum", component: Forum, layout: DefaultLayout, type: "forum" },
  {
    path: "/quydinh",
    component: quydinh,
    layout: DefaultLayout,
    type: "quydinh",
  },
  {
    path: "/forumComment/:idForum",
    component: ForumComment,
    layout: DefaultLayout,
    type: "forumComment",
  },
  {
    path: "/projectPost/:projectId/:userName",
    component: ProjectPost,
    layout: DefaultLayout,
    type: "projectPost",
  },
  { path: "/adminLogin", component: AdminLogin, type: "adminLogin" },
  // {path: '/projectPost', component: ProjectPost, layout: DefaultLayout, type: 'projectPost'},
  //admin
];
const loggedInRoutes =
  isLoggedIn && checkUserGroup
    ? [
        {
          path: "/projectsManager",
          component: ProjectsManager,
          layout: DefaultLayout,
          type: "projectsManager",
        },
        {
          path: "/projectCreateEdit",
          component: ProjectCreateEdit,
          layout: DefaultLayout,
          type: "projectCreateUser",
        },
        {
          path: "/projectCreateEdit/:projectId",
          component: ProjectCreateEdit,
          layout: DefaultLayout,
          type: "projectEditUser",
        },
      ]
    : [];
const adminRouter = checkAdmin
  ? [
      {
        path: "/admin",
        component: HomeAdmin,
        layout: DefaultLayoutAdmin,
        type: "admin",
      },
      {
        path: "/AdminCreateEditUser",
        component: AdminCreateEditUser,
        layout: DefaultLayoutAdmin,
        type: "AdminCreateUser",
      },
      {
        path: "/AdminCreateEditUser/:idUser",
        component: AdminCreateEditUser,
        layout: DefaultLayoutAdmin,
        type: "AdminEditUser",
      },

      {
        path: "/adminForum",
        component: AdminForum,
        layout: DefaultLayoutAdmin,
        type: "adminForum",
      },
      {
        path: "/AdminCreateEditForum",
        component: AdminCreateEditForum,
        layout: DefaultLayoutAdmin,
        type: "AdminCreateForum",
      },
      {
        path: "/AdminCreateEditForum/:idForum",
        component: AdminCreateEditForum,
        layout: DefaultLayoutAdmin,
        type: "AdminEditForum",
      },
      {
        path: "/adminDuyet",
        component: AdminProjectListCheck,
        layout: DefaultLayoutAdmin,
        type: "adminDuyet",
      },
    ]
  : [];
const publicRouter = [...basicRouter, ...loggedInRoutes, ...adminRouter];
// const privateRouter = [

// ]
export { publicRouter };
