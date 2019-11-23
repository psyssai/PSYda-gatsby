import React from "react"
import Sidebar from "./sidebar/sidebar"
import Header from "./header/header"
import "./layout.css"
import propTypes from "prop-types";
class Layout extends React.Component {
  render() {
    const { title, children, posts } = this.props

    console.log("####Layout",this.props)
    return (
      <div id = "wrapper">
        <Header title = {title}/>
        <div id ="container">
        <Sidebar posts = {posts}/>
          <main id = "main">
            {children}
          </main>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  title:propTypes.string.isRequired,
  author:propTypes.string.isRequired,
  avatar:propTypes.object.isRequired,
  description:propTypes.string.isRequired,
  children:propTypes.array.isRequired,
  posts:propTypes.array.isRequired
}


export default Layout