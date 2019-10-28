import React from "react"
import Sidebar from "./sidebar/sidebar"
import Header from "./header/header"
import "./layout.css"
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    return (
      <div id = "wrapper">
        <Header location = {location} title = {title}/>
        <div id ="container">
          <Sidebar />
          <main id = "main">
            {children}
          </main>
        </div>
      </div>
    )
  }
}

export default Layout
