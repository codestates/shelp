import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import axios from "axios";
const serverUrl = "http://localhost:4000";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const [setting, setSetting] = useState();

  const [userinfo, setUserinfo] = useState({
    id: 0,
    email: "new",
    name: "hi",
    desc: "",
    // image: { type: "Buffer", data: [] },
    image: "testImage",
    password: "1234",
    createdAt: "",
    updatedAt: "",
  });

  const isAuthenticated = () => {
    if (userinfo.name !== "") {
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
    handleResponseSuccess(userinfo);
  });

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !isLogin ? (
              <Intro handleResponseSuccess={handleResponseSuccess} />
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
