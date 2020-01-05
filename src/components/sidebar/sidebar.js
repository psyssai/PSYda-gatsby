import React from "react"
import "./sidebar.css"
import Category from "./category"
import Profile from "./profile"

class Sidebar extends React.Component {
  render() {
    return (
      <section id="sidebar">
        <Profile />
        <Category />
      </section>
    )
  }
}

export default Sidebar
