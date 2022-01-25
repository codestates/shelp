import { Link } from "react-router-dom";
import Navigationbar from "../components/navigationbar";
import { useState } from "react";
import styled from "styled-components";

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

function Mypage({ profile, setProfile }) {
  const [tempProfile, setTempProfile] = useState(Profile);
  const [button, setButton] = useState(true);

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
          <Setting />
        </Profile>
        <Collection></Collection>
      </Section>
    </Container>
  );
}
export default Mypage;
