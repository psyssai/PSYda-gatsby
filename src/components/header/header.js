import React from "react"
import { Link } from "gatsby"
import "./header.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

class Header extends React.Component {
  render() {
    console.log(this.props)
    const title = (
      <h1>
        <Link to={`/`}> {this.props.title} </Link>
      </h1>
    )
    const nav = (
      <nav id="headerNav">
        <ul>
          <li className="home">
            {" "}
            <Link to={`/`}> Home </Link>
          </li>
          <li className="categories">
            {" "}
            <Link to={`/categorypage`}> Categories </Link>{" "}
          </li>
          <li className="memo">
            {" "}
            <Link to={`/memo`}> Memo </Link>{" "}
          </li>
        </ul>
      </nav>
    )
    return (
      <header id="header">
        <span className="sidebarClick">
          <Link to={`/categorypage`}>
            <FontAwesomeIcon icon={faBars} />
          </Link>
        </span>

        {title}
        {nav}
      </header>
    )
  }
}

Header.propTypes = {
  title: propTypes.string.isRequired,
}

export default Header
