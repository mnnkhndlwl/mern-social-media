import Home from "./pages/home/Home";
import Login from "./pages/login/Lgoin"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div >
     <Router>
     <Switch>
     <Route exact path="/">
          <Home /> 
        </Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register">
           <Register />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        </Switch>
     </Router>
    </div>
  );
}

export default App;
