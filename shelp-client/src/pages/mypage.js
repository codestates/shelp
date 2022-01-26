import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Navigationbar from "../components/navigationbar";
const axios = require("axios").default;
const serverUrl = "http://localhost:4000";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
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
  align-items: center;

  > img.profile-left {
    position: relative;
    width: auto;
    height: 70%;
    margin-left: 10vh;
    border-radius: 50%;
    padding-top: 1rem;
    overflow: hidden;
    background-color: white;
  }

  > div.profile-right {
    flex: 1 0 auto;
    top: 50%;
    height: 70%;
    margin: 10vh;
    display: flex;
    flex-direction: column;

    > div.profile-email {
      height: auto;

      font-size: 1.5em;
    }
    > div.profile-name {
      height: auto;
      display: flex;
      padding: 1em 0;

      > div.name {
        width: auto;
        padding-right: 0.5em;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 4em;
      }
      > div.welcome-message {
        margin-top: auto;
        margin-bottom: auto;
        font-size: 2em;
      }
    }
    > div.profile-desc {
      color: rgba(0, 0, 0, 0.4);
      height: auto;
      font-size: 1.5em;
    }
  }
`;

const Collection = styled.div`
  flex: 10 0 auto;
  background-color: white;
  margin: 0 2rem 2rem 2rem;
  box-shadow: 0em 0em 1em rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
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
    const formData = new FormData();
    formData.append("img", img);
    // const { name, password, image, desc } = userinfo;
    setUserinfo({ ...userinfo, image: formData });
    axios.put(`${serverUrl}/profile`, userinfo).then((res) => {
      console.log(res);
    });

    setButton(!button);
  };

  const deleteUser = () => {
    axios.delete(`${serverUrl}/profile`).then((res) => {
      console.log(res);
      window.localStorage.clear();
      window.location.replace("/");
    });
  };

  const loadFile = (e) => {
    // setUserinfo({...userinfo, image: e.target.files[0]});
    setImg(e.target.files[0]);
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
            <div className="profile-name">{userinfo.name}</div>
            <span>님 환영합니다.</span>
            <div className="profile-email">{userinfo.email}</div>
          </div>
        </Profile>
        <Collection>
          {/* <Setting>
            <div>
              {button ? (
                <button onClick={handleButtonEdit}>edit</button>
              ) : (
                <button onClick={handleButtonSave}>save</button>
              )}
              <button onClick={deleteUser}>회원탈퇴</button> 
            </div>
          </Setting> */}
        </Collection>
      </Section>
    </Container>
  );
}
export default Mypage;
