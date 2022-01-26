import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import Login from "./pages/login";
// import axios from "axios";
const serverUrl = "http://localhost:4000";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  // const [setting, setSetting] = useState();

  // const modalHandler = () => {
  //   SetIsModalOpen(!isModalOpen);
  // };

  const [userinfo, setUserinfo] = useState(
    () => JSON.parse(window.localStorage.getItem("userinfo")) || null
  );

  const isAuthenticated = () => {
    if (userinfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const handleResponseSuccess = (data) => {
    setUserinfo(data);
    isAuthenticated();
  };

  // const handleLogout = () => {
  //   axios.post(`${serverUrl}/signout`).then((res) => {
  //     setUserinfo(null);
  //     setIsLogin(false);
  //   });
  // };

  useEffect(() => {
    window.localStorage.setItem("userinfo", JSON.stringify(userinfo)); //state에 저장되는 userinfo를 localStorage에 저장
  });

  useEffect(() => {
    handleResponseSuccess(userinfo);
  }, [userinfo]);

  // useEffect(() => {
  //   isAuthenticated();
  //   console.log("app.userinfo: ", userinfo);
  //   console.log("app.islogin: ", typeof isLogin, isLogin);
  // });

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Main isLogin={isLogin} /> : <Intro />}
        />
        {/* <Route
          path="/intro" // 새 컴포넌트 touchpoint 없는 intro
          element={<Intro handleResponseSuccess={handleResponseSuccess} />}
        /> */}
        <Route
          path="/login"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mypage"
          element={
            <Mypage
              isLogin={isLogin}
              userinfo={userinfo}
              setUserinfo={setUserinfo}
            />
          }
        />
      </Routes>
    </div>
  );
}
