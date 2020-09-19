import React, { useState, Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

const getUniqueCategories = posts => {
  let categories = []
  posts.map(edge => categories.push(edge.node.frontmatter.category))
  return categories.reduce((x, y) => {
    x[y] = ++x[y] || 1
    return x
  }, {})
}

const splitCategories = categories => {
  const newCategories = new Map()
  for (var category in categories) {
    if (category !== "null") {
      // category 가 null 이 아닐 때
      let categoryList = category.split("/")
      if (newCategories.has(categoryList[0])) {
        const preList = newCategories.get(categoryList[0])
        preList.push({ name: categoryList[1], num: categories[category] })
        newCategories.set(categoryList[0], preList)
      } else {
        newCategories.set(categoryList[0], [
          { name: categoryList[1], num: categories[category] },
        ])
      }
    }
  }
  return newCategories
}

const getUlClassName = status => {
  return status === 1 ? "isUlVisible" : "isUlUnVisible"
}

const CategoryUl = ({ data }) => {
  const level1 = data[0]
  const level2 = data[1]
  let totalNum = 0
  level2.map(({ name, num }) => (totalNum += num))
  const [status, setStatus] = useState(1)
  return (
    <Fragment>
      <div>
        <button
          className={`categoryLevel1 ${getUlClassName(status)}`}
          id={level1}
          onClick={() => setStatus(status === 0 ? 1 : 0)}
        ></button>
        {level1}({totalNum})
      </div>
      <ul>
        {level2.map(({ name, num }) =>
          name === undefined ? (
            ""
          ) : (
            <li
              key={name}
              className={`categoryLevel2 ${getUlClassName(status)}`}
            >
              <Link
                to={`/`}
                state={{
                  selectedCategory: name,
                }}
              >
                {name}({num})
              </Link>
            </li>
          )
        )}
      </ul>
    </Fragment>
  )
}

const Category = () => {
  const data = useStaticQuery(graphql`
    query Category {
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
  `)

  const posts = data.allMarkdownRemark.edges
  const categories = getUniqueCategories(posts)
  const newCategories = splitCategories(categories)
  const arrCateogories = Array.from(newCategories)
  return (
    <section id="categories">
      <h1>Categories</h1>
      {arrCateogories.map(value => (
        // value[0] => category level 1
        // value[1] => object {name : "category2", num:개수}
        <CategoryUl key={value[0]} data={value} />
      ))}
    </section>
  )
}

export default Category
