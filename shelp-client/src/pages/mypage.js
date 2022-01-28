import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Navigationbar from "../components/navigationbar";
const axios = require("axios").default;
const serverUrl = "http://localhost:4000";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
`;

const Section = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh - 3rem;
  position: relative;
  background-color: white;
`;

const Profile = styled.div`
  flex: 0.1 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div.profile-image {
    border-radius: 70%;
    overflow: hidden;
    height: 300px;
    margin-top: 30px;
  }
  > div.profile-container {
    margin-top: 30px;
  }
  > div.profile-email {
    height: auto;

    font-size: 1.5em;
  }
  > div.profile-name {
    height: auto;
    display: flex;
    padding: 1em 0;
    > span.name {
      width: auto;
      padding-right: 0.5em;
      margin-top: auto;
      margin-bottom: auto;
      font-size: 5em;
    }
  }

  > div.welcome-message {
    margin-top: auto;
    margin-bottom: auto;
    font-size: 2em;
  }
  > div.profile-desc {
    color: rgba(0, 0, 0, 0.4);
    height: auto;
    font-size: 1.5em;
  }
`;
const User = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-content: center;

  > div.periodButton {
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 200px;

    button {
      border: 3px solid gray;
      border-radius: 2em;
      font-size: 1.2em;
      padding: 0.5em 1em;
      margin: 0.3em;
    }
    > button.alarm {
      border-style: solid;
      border-color: red;
    }
  }
`;
const EditComp = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div {
    input {
      border-style: solid;
      border-radius: 10px;
      border-color: gray;
      height: 25px;
      width: 200px;
    }
  }

  > div.periodButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 200px;

    > button {
      border: 3px solid gray;
      border-radius: 10px;
    }

    > button.clicked {
      border-color: red;
    }
  }
`;
const Collection = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  height: 100px;
  flex: 10 0 auto;
  background-color: white;
  margin: 0 2rem 2rem 2rem;
  /* box-shadow: 0em 0em 1em rgba(0, 0, 0, 0.3); */
  border-radius: 0.5rem;
  margin-top: 70px;

  > div.buttonBox {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center; */

    button {
      width: 300px;
      height: 30px;
      margin-top: auto;
    }
  }
`;

const AlarmSet = styled.div``;

function Mypage({ isLogin, userinfo, setUserinfo }) {
  const [button, setButton] = useState(true);
  const [per, setPer] = useState(1);
  const [img, setImg] = useState();

  const handleChange = (e, key) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  const handleButtonEdit = () => {
    setButton(!button);
  };

  const handleButtonSave = () => {
    setUserinfo({ ...userinfo });
    axios.put(`${serverUrl}/profile`, userinfo).then((res) => {
      if (res.status === 200) {
        alert("저장되었습니다.");
      }
    });
    setButton(!button);
  };

  const deleteUser = () => {
    const message = window.confirm("정말 탈퇴하시겠습니까?");
    if (message) {
      axios.delete(`${serverUrl}/profile`).then((res) => {
        console.log(res);
        window.localStorage.clear();
        console.log("word");
        window.location.replace("/login"); //////////////////////////////////////////////////////////////////////////////////////////////////
      });
    } else {
    }
  };

  const temp = () => {
    console.log("hellof");
    console.log(userinfo.period);
    if (userinfo.period === "5") {
      console.log("clicked");
    }
  };

  return (
    <Container>
      <Navigationbar isLogin={isLogin} />
      <Section>
        <Profile>
          <div className="profile-image">
            <img src="https://picsum.photos/300/300?random=1" />
          </div>
          <div className="profile-container">
            {button ? (
              <User>
                <div className="profile-name">
                  <span className="name">{userinfo.name}</span>님 환영합니다.
                </div>
                {/* <span>님 환영합니다.</span> */}
                <div className="profile-email">{userinfo.email}</div>
                {/* <div>{userinfo.period}</div> */}
                <div className="periodButton">
                  <button className={userinfo.period === "1" ? "alarm" : ""}>
                    1d
                  </button>
                  <button className={userinfo.period === "3" ? "alarm" : ""}>
                    3d
                  </button>
                  <button className={userinfo.period === "5" ? "alarm" : ""}>
                    5d
                  </button>
                  {/* <div></div> */}
                </div>
                <div>{userinfo.desc}</div>
              </User>
            ) : (
              <EditComp className="editComp">
                <div>
                  <input
                    type="text"
                    placeholder={"name"}
                    onChange={(e) => handleChange(e, "name")}
                  />
                  로 변경
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={"password"}
                    onChange={(e) => handleChange(e, "password")}
                  />
                  로 변경
                </div>
                <div className="periodButton">
                  <button
                    onClick={(e) => {
                      handleChange(e, "period");
                    }}
                    value="1"
                  >
                    1d
                  </button>
                  <button
                    onClick={(e) => {
                      handleChange(e, "period");
                    }}
                    value="3"
                  >
                    3d
                  </button>
                  <button
                    onClick={(e) => {
                      handleChange(e, "period");
                    }}
                    value="5"
                  >
                    5d
                  </button>
                  <div></div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={"desc"}
                    onChange={(e) => handleChange(e, "desc")}
                  />
                  로 변경
                </div>
              </EditComp>
            )}
          </div>
        </Profile>
        {/* <Collection> */}
        <Collection>
          <div className="buttonBox">
            {button ? (
              <button onClick={handleButtonEdit}>edit</button>
            ) : (
              <button onClick={handleButtonSave}>save</button>
            )}
            <button onClick={deleteUser}>회원탈퇴</button>
          </div>
        </Collection>
        {/* </Collection> */}
      </Section>
    </Container>
  );
}
export default Mypage;
