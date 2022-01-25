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
  flex: 1 0 auto;
  background-color: white;
  margin: 1rem 1rem 0.5rem 1rem;
  box-shadow: 0em 0em 1em rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;

  > div.profile-image {
    flex: 1 0 auto;
    position: absolute;
    width: 10rem;
    height: 10rem;
    margin-left: 2rem;
    border-radius: 50%;
    overflow: hidden;
    color: grey;
  }

  > div.profile-container {
    position: absolute;
    left: 30rem;
    top: 3rem;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-items: center;

    > div.profile-email {
      flex: 1 0 auto;
      color: rgba(0, 0, 0, 0.4);
    }

    > div.profile-name {
      flex: 1 0 auto;
      font-size: 3rem;
    }
  }
`;

const Setting = styled.div`
  flex: 1 0 auto;
  background-color: grey;
  border: sold black 1px;
`;

const Collection = styled.div`
  flex: 2 0 auto;
  background-color: white;
  margin: 0.5rem 1rem 1rem 1rem;
  box-shadow: 0em 0em 1em rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

const AlarmSet = styled.div``;

function Mypage({ userinfo, setUserinfo }) {
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

  const handleLogOut = () => {
    axios
      .get(`${serverUrl}/user/signout`, {
        /* accesstoken첨부 */
      })
      .then((res) => {
        console.log(res);
      });
    localStorage.clear();
    window.location.replace("/");
    //인트로 페이지로 돌아가기
  };

  const loadFile = (e) => {
    // setUserinfo({...userinfo, image: e.target.files[0]});
    setImg(e.target.files[0]);
  };

  return (
    <Container>
      <Navigationbar />
      <Section>
        <Profile>
          <div className="profile-image">
            <img src="https://picsum.photos/300/300?random=1" />
          </div>
          <div className="profile-container">
            <div className="profile-name">김철수</div>
            <span>님 환영합니다.</span>
            <div className="profile-email">myshelp@gmail.com</div>
          </div>
          <Setting>
            <div>
              {button ? (
                <button onClick={handleButtonEdit}>edit</button>
              ) : (
                <button onClick={handleButtonSave}>save</button>
              )}
            </div>
          </Setting>
        </Profile>
        <Collection></Collection>
      </Section>
    </Container>
  );
}
export default Mypage;
