import { useState } from "react";
import styled from "styled-components";

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
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [pwCheck, setPwCheck] = useState("비밀번호는 8자 이상이어야 합니다");

  return (
    <Container>
      <div className="title">회원가입</div>
      <div className="inputPlace">
        이메일 <input onChange={(e) => setEmail(e.target.value)} />{" "}
        <button>확인</button>
      </div>
      <div className="inputPlace">
        이름 <input onChange={(e) => setUserName(e.target.value)} />{" "}
        <button>확인</button>
      </div>
      <div className="inputPlace">
        비밀번호 <input onChange={(e) => setPassword(e.target.value)} />
        <div>{pwCheck}</div>
      </div>
      <div className="inputPlace">
        비밀번호 확인 <input onChange={(e) => setPassword(e.target.value)} />
        <div>확인</div>
      </div>
      <button className="submit">회원가입</button>
    </Container>
  );
}

export default Signup;
