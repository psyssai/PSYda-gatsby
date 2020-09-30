import React from "react"
import { Link } from "gatsby"
import "./header.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

class Header extends React.Component {
  render() {
    const { title, convertClickState } = this.props
    const titleH1 = (
      <h1>
        <Link to="/"> {title} </Link>
      </h1>
    )
    const nav = (
      <nav id="headerNav">
        <ul>
          <li className="home">
            {" "}
            <Link to="/"> Home </Link>
          </li>
          <li className="categories">
            {" "}
            <Link to="/categorypage"> Categories </Link>{" "}
          </li>
          <li className="memo">
            {" "}
            <Link to="/memo"> Memo </Link>{" "}
          </li>
        </ul>
      </nav>
    )
    return (
      <header id="header">
        <span className="sidebarClick">
          <FontAwesomeIcon icon={faBars} onClick={convertClickState} />
        </span>
        {titleH1}
        {nav}
      </header>
    )
  }
}

Header.propTypes = {
  title: propTypes.string.isRequired,
}

export default Header
