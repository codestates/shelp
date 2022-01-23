import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
const axios = require("axios").default;

function Mypage({ userinfo, setUserinfo }) {
  const [userInfo, setUserInfo] = useState(userinfo);

  // const [tempUserInfo, setTempUserInfo] = useState(userinfo);
  const [button, setButton] = useState(true);
  const handleChange = (e, key) => {
    setUserInfo({...userInfo, [key]: e.target.value});
  }

  const handleButtonEdit = () => {
    setButton(!button);
  }
  const handleButtonSave = () => {
    setUserinfo(userInfo)
    // axios({
    //   method: "put",
    //   url: "",
    //   data: userinfo
    // })
    setButton(!button);
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
            {
              button ?
              <h3>{userinfo.name}</h3>:
              <input
              placeholder={userinfo.name}
              onChange={(e)=>{handleChange(e, 'name')}}
              ></input>
            }
          </div>
          <div>
            {
              button ?
              <h3>{userinfo.email}</h3>:
              <input
              placeholder={userinfo.email}
              onChange={(e)=>{handleChange(e, 'email')}}
              ></input>
            }
          </div>
          <div>
            {
              button ?
              <h3>{userinfo.desc}</h3>:
              <input
              placeholder={userinfo.desc}
              onChange={(e)=>{handleChange(e, 'desc')}}
              ></input>
            }
          </div>
        </div>
      </section>
      <setting>
        <div className="option1">
          <button className={userinfo.period==='1d'? 'chosen': '1d-option'} type="radio" name="setalrm" value="1d" onClick={(e)=>{handleChange(e, 'period')}}>
            1d
          </button>
          <button className={userinfo.period==='3d'? 'chosen': '3d-option'} type="radio" name="setalrm" value="3d" onClick={(e)=>{handleChange(e, 'period')}}>
            3d
          </button>
          <button className={userinfo.period==='5d'? 'chosen': '5d-option'} type="radio" name="setalrm" value="5d" onClick={(e)=>{handleChange(e, 'period')}}>
            5d
          </button>
        </div>
        <div>option2</div>
        <div>option3</div>
      </setting>
      <div>
        {
          button? 
          <button onClick={handleButtonEdit}>edit</button>:
          <button onClick={handleButtonSave}>save</button>
        }
      </div>
    </div>
  );
}
export default Mypage;
