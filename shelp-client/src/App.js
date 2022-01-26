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
  const [userinfo, setUserinfo] = useState(null);
  const [items, setItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const acceesKey = "uxmm1xvDu4mSm0HHtTye0IqpuDDRXXxg90oagPde1XA";

  const getBackgroundImage = () => {
    axios
      .get(`https://unsplash.com/oauth/authorize`, {
        params: {
          client_id: acceesKey,
          redirect_uri: "localhost:3000",
          response_type: "json",
          scope: "public+read_user",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getBackgroundImage();

  const isAuthenticated = () => {
    if (userinfo !== null) {
      setIsLogin(true);
    }
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  // const handleLogout = () => {
  //   axios.post(`${serverUrl}/user/signout`).then((res) => {
  //     setUserinfo(null);
  //     setIsLogin(false);
  //   });
  // };

  const getItems = () => {
    axios
      .get(`${serverUrl}/items`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isAuthenticated();
    getItems();
  }, [userinfo]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Main isLogin={isLogin} items={items} setItems={setItems} />
            ) : (
              <Intro />
            )
          }
        />
        {/* <Route
          path="/intro" // 새 컴포넌트 touchpoint 없는 intro
          element={<Intro handleResponseSuccess={handleResponseSuccess} />}
        /> */}
        <Route
          path="/login"
          element={
            <Login
              handleResponseSuccess={handleResponseSuccess}
              setUserinfo={setUserinfo}
            />
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
