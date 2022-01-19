import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Intro from './intro.js';
import Signup from './signup.js';
import Main from './main.js';
import Mypage from './mypage.js'; 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route>
          <Intro />
        </Route>
        <Route>
          <Signup />
        </Route>
        <Route>
          <Main />
        </Route>
        <Route>
          <Mypage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
