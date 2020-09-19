import React from "react"
import Bio from "../components/bio"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class CategoryPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const viewPosts = posts.filter(({ node }) => {
      return node.excerpt !== ""
    })
    return (
      <Layout title={siteTitle}>
        <SEO title={siteTitle} />
        <Bio />

        {viewPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article className="postList" key={node.fields.slug}>
              <header className="postHeader">
                <small className="date">{node.frontmatter.date}</small>
                <h3 className="title">
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
              </header>
              <section className="postContents">
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

export default CategoryPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
