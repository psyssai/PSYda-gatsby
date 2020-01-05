import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Profile = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/logo.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 50) {
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

  const { avatar, site } = data
  const { author, description } = site.siteMetadata
  return (
    <section id="introduce">
      <Image fixed={avatar.childImageSharp.fixed} alt={author} />
      <h2 className="author">{author}</h2>
      <p>{description}</p>
    </section>
  )
}
export default Profile
