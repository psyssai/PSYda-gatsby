import React from "react";
import { Link } from "gatsby"
import "./header.css"
import propTypes from "prop-types"

class Header extends React.Component{
  constructor(props){
    super(props);
    this.header = (
      <h1>
        <Link to={`/`}> {this.props.title} </Link>
      </h1>

    );
    
    this.nav = (
      <nav id = "headerNav">
        <ul>
          <li> <Link to = {`/`}> Home </Link></li>
          <li> <Link to = {`/categories`}> Categories </Link> </li>
          <li> <Link to ={`/memo`}> Memo </Link> </li>
        </ul>
      </nav>
    )
  }
  
  render() {
    return(
      <header id = "header">
        {this.header}
        {this.nav}
      </header>
  );
  }
}
Header.propTypes = {
  title:propTypes.string.isRequired
}

export default Header;