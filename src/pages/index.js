import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  /*
  constructor() {
    this.state = { category: '' };
  }

  changeCategory = (category) => {
    this.setState({category: category});
  }
  */
  findCategory(basestr, fstr) {
    if (basestr === undefined || basestr === null) {
      return false
    } else {
      if (basestr.indexOf("/" + fstr) === -1) {
        return false
      } else {
        return true
      }
    }
  }

  render() {
    const { data, location } = this.props
    let selectedCategory = undefined
    if (location.state) {
      selectedCategory =
        location.state.selectedCategory === "undefined"
          ? undefined
          : location.state.selectedCategory
    }

    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const viewPosts = posts.filter(({ node }) => {
      // 찾는 category가 없으면 전체 리스트 출력
      if (selectedCategory === undefined) {
        return node.excerpt !== ""
      } else {
        // 선택된 category만 출력
        if (this.findCategory(node.frontmatter.category, selectedCategory)) {
          return node.excerpt !== ""
        } else {
          return false
        }
      }
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

export default BlogIndex

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
