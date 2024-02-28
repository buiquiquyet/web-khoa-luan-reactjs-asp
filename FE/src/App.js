import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { publicRouter } from "./client/router";
import React from 'react';

export const MyContext = React.createContext();

function App() {
  return (
    <Router>
      <Routes>
        {publicRouter.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout;
          return (
            <Route
              key={index}
              path={item.path}
              element={
                item.type === 'adminLogin' ? (
                  <Page />
                ) : (
                  <MyContext.Provider value={item.type}>
                    <Layout>
                      <Page />
                    </Layout>
                  </MyContext.Provider>
                )
              }
            />
          );
        })}
        {/* Nếu không có route nào khớp, chuyển hướng về trang chủ */}
        <Route
          path="*"
          element={<Navigate to="/" replace />} // Navigate to="/" để chuyển hướng, replace để thay thế lịch sử
        />
      </Routes>
    </Router>
  );
}

export default App;
