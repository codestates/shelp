import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
const axios = require("axios").default;

function Mypage({ userinfo, setUserinfo }) {
  //   const [userInfo, setUserInfo] = useState({
  //       name: "",
  //       email: "",
  //       desc: "",
  //       alrm: "",

  //   });
  const [userName, setUserName] = useState(null); // 유저 이름
  const [userEmail, setUserEmail] = useState(null); // 유저 이메일
  const [userDesc, setUserDesc] = useState(null); // 유저 설명
  const [alrm, setAlrm] = useState(null); // 유저 알림 설정
  const [editBox, setEditBox] = useState(true);
  const [editBox2, setEditBox2] = useState(true);
  const [editBox3, setEditBox3] = useState(true);

  const nameModal = (e) => {
    if (e.target.value) {
      console.log("noting");
    } else {
      console.log("something");
    }
    setEditBox(!editBox);
    // console.log(e.target.value);
    // axios({
    //     method: 'put',
    //     url: '',
    //     data: {
    //         "username":
    //     }
    // })
  };
  const emailModal = (e) => {
    setEditBox2(!editBox2);
  };
  const descModal = (e) => {
    setEditBox3(!editBox3);
  };

    const handleChangeName = (e) => {
        setUserName(e.target.value);
        console.log(userName)
    }
    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value);
    }
    const handleChangeDesc = (e) => {
        setUserDesc(e.target.value);
    }
    const handleRadio = (e) => {    
        setAlrm(e.target.value);
        console.log(alrm)
    }

  return (
    <div>
      <navbar className="mainpage-navbar">
        <nav></nav>
        <logo className="shelfLogo">
          <Link to="/">shelf</Link>
        </logo>
        <Link to="/mypage">mypage</Link>
      </navbar>
      <section>
        <div>
          <input
            type="image"
            src="https://www.freeiconspng.com/thumbs/pepe-png/pepe-png-free-download-16.png"
          />
        </div>
        <div>
          <div>
            <input
              placeholder={userinfo.name}
              onChange={(e) => setUserinfo(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder={userinfo.email}
              onChange={(e) => setUserinfo(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder={userinfo.desc}
              onChange={(e) => setUserinfo(e.target.value)}
            ></input>
          </div>
        </div>
      </section>
      <setting>
        <div className="option1">
          <button type="radio" name="setalrm" value="1d" onClick={handleRadio}>
            1d
          </button>
          <button type="radio" name="setalrm" value="3d" onClick={handleRadio}>
            3d
          </button>
          <button type="radio" name="setalrm" value="5d" onClick={handleRadio}>
            5d
          </button>
        </div>
        <div>option2</div>
        <div>option3</div>
      </setting>
      <div>
        <button>save</button>
      </div>
    </div>
  );
}
export default Mypage;
