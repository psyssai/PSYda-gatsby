import React from "react";
import "./sidebar.css";
import Category from "./category"
import Profile from "./profile"

class Sidebar extends React.Component{

  render(){
    const {posts} = this.props;
  
    return(
      <section id = "sidebar">
        <Profile />
        <Category posts = {posts} />
      </section>
  );
  }
}

export default Sidebar;