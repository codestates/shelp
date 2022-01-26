import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const serverUrl = "http://localhost:4000";

const Navigator = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  min-height: 0.5rem;
  border-bottom: solid lightgrey 1px;
  background-color: ${(props) => (props.mypageColor ? "grey" : "white")};

  > a.logo {
    flex: 2 0 auto;
    margin-left: 2rem;
    > img {
      height: 2.4rem;
      width: auto;
    }
  }

  > div.blank {
    flex: 20 0 auto;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    color: grey;
  }

  > button.nav-button {
    flex: 1 0 auto;
    text-align: center;
  }
`;

export default function Navigationbar() {
  //const expireDate = new Date();/////////////////////////////////////////////////////////////
  const handleLogOut = () => {
    axios
      .get(`${serverUrl}/user/signout`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.localStorage.clear();
        //expireDate.setDate( expireDate.getDate() - 1 );/////////////////////////////////////////////////////////////////////////////////////////////
        //document.cookie = 'jwt' + "= " + "; expires=" + expireDate.toGMTString() + "; domain=.segye.com; path=/";//////////////////////////////////////////////////////////////////////////////////
        window.location.replace("/");
        //인트로 페이지로 돌아가기
      });
  };

  return (
    <div>
      <Navigator>
        <a href="/" className="logo">
          <img src="shelp-logo.png" />
        </a>

        <div className="blank"></div>
        {window.localStorage.userinfo ? (
          <div>
            <div href="/mypage">
              <i class="far fa-user"></i>
            </div>
            <span onClick={handleLogOut}>로그아웃</span>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="nav-button">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="nav-button">회원가입</button>
            </Link>
          </div>
        )}
      </Navigator>
    </div>
  );
}
