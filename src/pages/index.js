import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  getUniqueCategories(posts){
    let categories = [];
    posts.map( edge =>( categories.push(edge.node.frontmatter.category )))
    return Array.from(new Set(categories));
  }
  
  render() {
    console.log("###BLogIndex",this.props)
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const author = data.site.siteMetadata.author
    const description = data.site.siteMetadata.description
    const avatar = data.avatar;
    this.getUniqueCategories(posts)

    return (
      <Layout title={siteTitle} author = {author} description = {description} avatar = {avatar}>
        <SEO title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            
            <article className = "postList" key={node.fields.slug}>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
          }
        }
      }
    }
  }
`
