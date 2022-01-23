import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import axios from "axios";
const serverUrl = "https://localhost:4000";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [userinfo, setUserinfo] = useState({
    email: "email-string",
    name: "name-string",
    desc: "desc-string",
    image: "image--blob-url",
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

  // const handleLogout = () => {
  //   axios.post(`${serverUrl}/signout`).then((res) => {
  //     setUserinfo(null);
  //     setIsLogin(false);
  //   });
  // };

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
              <Main />
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
