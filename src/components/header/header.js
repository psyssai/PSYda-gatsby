import React from "react";
import { Link } from "gatsby"
import "./header.css"
import propTypes from "prop-types"

class Header extends React.Component{
  render() {
    const title = (<h1><Link to={`/`}> {this.props.title} </Link></h1>);
    const nav = (
      <nav id = "headerNav">
        <ul>
          <li className = "home"> <Link to = {`/`}> Home </Link></li>
          <li className = "categories"> <Link to = {`/categories`}> Categories </Link> </li>
          <li className = "memo"> <Link to ={`/memo`}> Memo </Link> </li>
        </ul>
      </nav>
    )
    return(
      <header id = "header">
        {title}
        {nav}
      </header>
  );
  }
}
Header.propTypes = {
  title:propTypes.string.isRequired
}

export default Header;