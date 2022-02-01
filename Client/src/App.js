import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./Component/Post";
import NavBar from "./Component/NavBar";
import Login from "./Component/LoginForm";
import { useState } from "react";
import Logout from "./Component/LogOut";

function App() {
  const [current, setCurrent] = useState("Home");
  const [userAuth, setUserAuth] = useState();
  if (!userAuth && !localStorage.getItem("jwt")) {
    return (
      <div className="App-header">
        <Login setUserAuth={setUserAuth}/>
      </div>
    );
  } else {
    return (
      <div className="App-header">
        <Router>
          <NavBar text={current} handelCurrent={setCurrent} />
          <Routes>
            <Route path="/posts" element={<Post />} />
            <Route
              path="/logout"
              element={<Logout setUserAuth={setUserAuth} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
