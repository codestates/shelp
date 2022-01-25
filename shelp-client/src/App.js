import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./pages/intro";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import Login from "./pages/login";
import axios from "axios";
const serverUrl = "http://localhost:4000";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const [setting, setSetting] = useState();

  // const modalHandler = () => {
  //   SetIsModalOpen(!isModalOpen);
  // };

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

  const [userinfo, setUserinfo] = useState(
    null
    // () =>
    //   JSON.parse(window.localStorage.getItem("userinfo")) || {
    //     id: 0,
    //     email: "new",
    //     name: "hi",
    //     desc: "",
    //     // image: { type: "Buffer", data: [] },
    //     image:
    //       "https://www.freeiconspng.com/thumbs/pepe-png/pepe-png-free-download-16.png",
    //     password: "",
    //     createdAt: "",
    //     updatedAt: "",
    //   }
  );

  const isAuthenticated = () => {
    if (userinfo !== null) {
      setIsLogin(true);
    }
    // if (userinfo.password === "") {
    //   setIsLogin(false);
    // } else {
    //   setIsLogin(true);
    // }
  };

  const handleResponseSuccess = (data) => {
    setUserinfo(data);
    isAuthenticated();
  };

  // useEffect(() => {
  //   window.localStorage.setItem("userinfo", JSON.stringify(userinfo)); //state에 저장되는 userinfo를 localStorage에 저장
  // });

  // const handleLogout = () => {
  //   axios.post(`${serverUrl}/signout`).then((res) => {
  //     setUserinfo(null);
  //     setIsLogin(false);
  //   });
  // };

  // useEffect(() => {
  //   handleResponseSuccess(userinfo);
  //   console.log("changed!", userinfo);
  // }, [userinfo]);

  useEffect(() => {
    isAuthenticated();
    console.log("app.userinfo: ", userinfo);
    console.log("app.islogin: ", typeof isLogin, isLogin);
  });

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
          element={<Mypage userinfo={userinfo} setUserinfo={setUserinfo} />}
        />
      </Routes>
    </div>
  );
}
