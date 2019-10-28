import React from "react";
import { Link } from "gatsby"
import "./header.css"

const Header = ({ location, title }) =>{
  const header = (
    <h1>
      <Link to={`/`}>
        {title}
      </Link>
    </h1>
  );
  const nav = (
    <nav id = "headerNav">
      <ul>
        <li>
          <Link to = {`/`}>
            Home
          </Link></li>
        <li>
          <Link to = {`/categories`}>
            Categories
          </Link>
        </li>
        <li>
          <Link to ={`/memo`}>
            Memo
          </Link>
        </li>
      </ul>
    </nav>
  )
    return(
        <header id = "header">
          {header}
          {nav}

        </header>
    );
}

export default Header;