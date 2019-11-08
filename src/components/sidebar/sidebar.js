import React from "react";
import { graphql } from "gatsby"
import Image from "gatsby-image"
import "./sidebar.css";
import propTypes from "prop-types"

class Sidebar extends React.Component{

  // Posts에서 Categories를 읽어옴
  getUniqueCategories(posts){
    let categories = [];
    posts.map( edge =>( categories.push(edge.node.frontmatter.category )))
    return Array.from(new Set(categories));
  }

  splitCategories = ( categories ) => {
    let newCategories = [];
    categories.map( category => 
      (category !== null 
        ? newCategories.push(category.split('/'))
        : 0
    ))
    return newCategories;
  }

  render(){
    const {posts} = this.props;
    const categories = this.getUniqueCategories(posts)
    const newCategories = this.splitCategories(categories);
    console.log("###side2",newCategories)
    const {avatar, author, description} = this.props;
    const profile = (
      <section id = "introduce">
      <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
      />
      <h2 className = "author">{author}</h2>
      <p>{description}</p>
    </section>
    );

    return(
      <section id = "sidebar">
        {profile}
        <section id = "categories">
          <h1>Categories</h1>
          {newCategories.map( category =>
            (
              <div>{category}</div>
            ))}
        </section>
        
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