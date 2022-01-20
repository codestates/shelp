
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// react-router-dom이 버전 6로 업그레이드되면서 (여기선 v6.2.1 사용중) Switch를 더이상 지원하지 않는다.
// Switch -> routes로 변경, Component -> element={<Component />}로 변경.
// https://velog.io/@kcdoggo/Switch-is-not-exported-from-react-router-dom-%EC%97%90%EB%9F%AC

import Intro from "./pages/intro";
import Main from "./pages/main";
// import Mypage from "./pages/mypage";
// import Signup from "./pages/signup";

import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isLogin ? <Intro setIsLogin={setIsLogin} /> : <Main />}
        />
      </Routes>
    </BrowserRouter>
  );
}
