import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "./sidebar.css";

const Sidebar = () =>{
    const data = useStaticQuery(graphql`
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
  

  const { author } = data.site.siteMetadata
  const { description } = data.site.siteMetadata
  console.log()
    return(
        <section id = "sidebar">
          <section id = "introduce">
            <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
            />
            <h2 className = "author">{author}</h2>
            <p>{description}</p>
          </section>
          <section id = "categories">
            
          </section>
          
        </section>
    );
}

export default Sidebar;

