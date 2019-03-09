import React from "react";
import "./style.css";

function Nav(props) {
  return (
    <nav>
        <div className="nav-wrapper #0091ea light-blue accent-4">
        <a href="/" className="brand-logo spacing-left">Google Books</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/mybooks">My Books</a></li>
            <li><a href="/">Search</a></li>
        </ul>
        </div>
    </nav>
  );
}

export default Nav;
