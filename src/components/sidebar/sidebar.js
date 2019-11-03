import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "./sidebar.css";

class Sidebar extends React.Component{
  constructor(props){
    super(props);
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
    console.log("###side2",this.props)
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
          
        </section>
        
      </section>
  );
  }
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