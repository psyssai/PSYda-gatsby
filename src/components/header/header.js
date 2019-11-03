import React from "react";
import { Link } from "gatsby"
import "./header.css"

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

export default Header;