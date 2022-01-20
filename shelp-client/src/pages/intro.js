import axios from "axios";
import styled from "styled-components";

const Wallpaper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300%;
  background: linear-gradient(
      to bottom,
      rgba(232, 232, 232, 0.3),
      rgba(191, 191, 191, 1)
    ),
    url("background-food-1.jpeg"); // 이미지 상대경로 기준: index.html
  background-size: cover; // cover;
  background-repeat: no-repeat;
`;

const TouchPoint = styled.div`
  flex-direction: column;
  position: absolute;
  bottom: 200px;
  right: 200px;
  background-color: aquamarine;
  padding: 100px;
`;

function Intro({ setIsLogin }) {
  const logInHandler = () => {
    // axios
    //   .post("localhost:4000/user/signin", {
    //     user_email: "test_email",
    //     user_password: "test_password",
    //   })
    //   .then((res) => {
    //     if (res.body.message === "ok") {
    //       setIsLogin(true);
    //     } else {
    //       console.log()
    //     }
    //   });
    setIsLogin(true);
  };

  return (
    <Wallpaper>
      <TouchPoint>
        this is touch point, you can login by the button below
        <div>
          <button onClick={logInHandler}>login</button>
        </div>
      </TouchPoint>
    </Wallpaper>
  );
}

export default Intro;

// import styled from "styled-components";

// function Intro() {
//   return <Container>hello~!</Container>;
// }

// const Container = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: url(https://source.unsplash.com/random/1920x1080);
//   background-size: cover;
// `;

// export default Intro;
