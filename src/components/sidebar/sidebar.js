import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "./sidebar.css";

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    /*
    this.profile = (
      <section id = "introduce">
      <Image
          fixed={this.data.avatar.childImageSharp.fixed}
          alt={author}
      />
      <h2 className = "author">{author}</h2>
      <p>{description}</p>
    </section>
    );
    */
    /*
    this.data = useStaticQuery(graphql`
    query BioQuery {
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
  `)
  */
  
  }

  render(){

  //const { author } = this.data.site.siteMetadata
  //const { description } = this.data.site.siteMetadata
    return(
      <section id = "sidebar">
        {this.profile}
        <section id = "categories">
          
        </section>
        
      </section>
  );
  }
}
export default Sidebar;

