import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    const mainHeader = (
      <article className = "metaData">
        <header className = "blogTitle">
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
        </header>
        <header className = "blogDate">
          <h5>{post.frontmatter.date}</h5>
        </header>
      </article>
    )

    const navPrevNext = (
      <nav className="link">
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  { previous.frontmatter.title.length > 35 ? 
                    "← " + previous.frontmatter.title.slice(0,34) + "..."
                    :"← " + previous.frontmatter.title
                  }
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  { next.frontmatter.title.length > 35 ? 
                    next.frontmatter.title.slice(0,34) + "... →"
                    :next.frontmatter.title + " →"
                  }
                </Link>
              )}
            </li>
          </ul>
        </nav>
    )

    return (
      <Layout title={siteTitle} >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        {mainHeader}
        <article className="contents">
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            <Bio />
          </footer>
        </article>
        {navPrevNext}
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
      }
    }
  }
  
`
