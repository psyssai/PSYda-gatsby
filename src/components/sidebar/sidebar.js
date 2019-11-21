import React from "react";
import { graphql } from "gatsby"
import "./sidebar.css";
import propTypes from "prop-types"
import Category from "./category"
import Profile from "./profile"

class Sidebar extends React.Component{

  render(){
    const {posts} = this.props;
    const {avatar, author, description} = this.props;
  
    return(
      <section id = "sidebar">
        <Profile avatar = {avatar} author = {author} description = {description}/>
        <Category posts = {posts} />
      </section>
  );
  }
}

Sidebar.propTypes = {
  author:propTypes.string.isRequired,
  avatar:propTypes.object.isRequired,
  description:propTypes.string.isRequired,
  posts:propTypes.array.isRequired
}


export default Sidebar;

export const pageQuery = graphql`
    query {
      avatar: file(absolutePath: { regex: "/logo.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 50){
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          description
        }
      }
    }
  `