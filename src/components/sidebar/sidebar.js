import React from "react"
import "./sidebar.css"
import Category from "./category"
import Profile from "./profile"

class Sidebar extends React.Component {
  render() {
    return (
      <section id="sidebar">
        <Profile />
        <Category
          isVisible={this.props.isVisible}
          convertClickState={this.props.convertClickState}
        />
      </section>
    )
  }
}

export default Sidebar
