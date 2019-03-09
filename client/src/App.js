import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./components/pages/Search";
import Saved from "./components/pages/Saved";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav/>
          <Route exact path="/" component={Search} />
          <Route exact path="/mybooks" component={Saved} />
        </div>
      </Router>   
    );
  }
}

export default App;
