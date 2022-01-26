import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigator = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  min-height: 0.5rem;
  border-bottom: solid lightgrey 1px;
  background-color: ${(props) => (props.mypageColor ? "grey" : "white")};

  > div.logo {
    flex: 2 0 auto;
    text-align: center;
    text-decoration-line: none;
  }

  > div.about {
    flex: 1 0 auto;
    text-align: center;
    text-decoration-line: none;
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

export default function Navigationbar({ isLogin }) {
  return (
    <div>
      <Navigator>
        <div className="logo">
          <Link to="/">Shelp</Link>
        </div>
        <div className="about">
          <Link to="/intro">{isLogin}</Link>
        </div>
        <div className="blank">--Blank--</div>
        {isLogin ? (
          <button className="nav-button">
            <Link to="/mypage">마이페이지</Link>
          </button>
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
