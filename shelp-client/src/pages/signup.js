import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
const serverUrl = "https://randomdomain:4000";

const Container = styled.div`
  background-color: lightgrey;
  text-align: center;
  min-height: 40rem;

  > div.title {
    padding: 3rem;
  }

  > div.inputPlace {
    padding: 0.5rem;
  }

  > button.submit {
    margin: 2rem;
    background-color: salmon;
    color: grey;
  }
`;

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    username: "",
    password: "",
    desc: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const handlePasswordError = (checkPassword) => {
    if (checkPassword !== signupInfo.password) {
      return setErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

  const handleSignup = () => {
    if (errorMessage === "") {
      axios.post(`${serverUrl}/user/signup`, signupInfo);
    }
  };

  return (
    <Container>
      <div className="title">회원가입</div>
      <div className="inputPlace">
        이메일 <input onChange={(e) => handleInputValue("email")} />
        <button>확인</button>
      </div>
      <div className="inputPlace">
        이름 <input onChange={(e) => handleInputValue("username")} />
        <button>확인</button>
      </div>
      <div className="inputPlace">
        비밀번호 <input onChange={(e) => handleInputValue("password")} />
      </div>
      <div className="inputPlace">
        비밀번호 확인
        <input onChange={(e) => handlePasswordError(e.target.value)} />
      </div>
      <div>{errorMessage}</div>
      <Link to="/">회원가입</Link>
    </Container>
  );
}

export default Signup;
