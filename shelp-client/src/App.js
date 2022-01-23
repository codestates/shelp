import { useState, useEffect } from "react";
import { Routes, Route, Link, Redirect } from "react-router-dom";
import Intro from "./pages/intro";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import axios from "axios";
import "./App.css";
import Signup from "./pages/signup";
// react-router-dom이 버전 6로 업그레이드되면서 (여기선 v6.2.1 사용중) Switch를 더이상 지원하지 않는다.
// Switch -> routes로 변경, Component -> element={<Component />}로 변경.
// https://velog.io/@kcdoggo/Switch-is-not-exported-from-react-router-dom-%EC%97%90%EB%9F%AC
// import Signup from "./pages/signup";
const serverUrl = "https://localhost:4000";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [userinfo, setUserinfo] = useState({
    name: "pepe",
    email: "pepe@gmail.com",
    desc: "hellp i am pepe",
  });

  const isAuthenticated = () => {
    if (userinfo !== null) {
      setIsLogin(true);
    }
  };

  const handleResponseSuccess = (data) => {
    setUserinfo(data);
    isAuthenticated();
  };

  const handleLogout = () => {
    axios.post(`${serverUrl}/signout`).then((res) => {
      setUserinfo(null);
      setIsLogin(false);
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !isLogin ? (
              <Intro
                setIsLogin={setIsLogin}
                handleResponseSuccess={handleResponseSuccess}
              />
            ) : (
              <Main/>
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mypage"
          element={<Mypage userinfo={userinfo} setUserinfo={setUserinfo} />}
        />
      </Routes>
    </div>
  );
}

{
  /* <Routes>
      <Route
        path="/"
        element={isLogin ? <Intro setIsLogin={setIsLogin} /> : <Main />}
      />
      <Route path="/signup" element={<Signup />} />
    </Routes> */
}
