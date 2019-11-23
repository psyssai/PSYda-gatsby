
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const getUniqueCategories = (posts) =>
{
    let categories = [];
    posts.map( edge =>( categories.push(edge.node.frontmatter.category )))
    return Array.from(new Set(categories));
}

const splitCategories = ( categories ) => 
{
    let newCategories = [];
    let prevLevelOne = 0;
    let levelIndex = -1;
    let currLevelOne;

    for(let i = 0; i <categories.length; i++ ){
        const category = categories[i];
        if( category === null) continue;
        else{ // category 가 null 이 아닐 때
        let categoryList = category.split('/');
        currLevelOne = categoryList[0];
        if (currLevelOne === prevLevelOne){
            newCategories[levelIndex].level2.push(categoryList[1]);
        }
        else{
            newCategories.push({level1 : categoryList[0], level2 : [categoryList[1]]});
            levelIndex++;
        }
        prevLevelOne = currLevelOne;
        }
    }
    return newCategories;
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
    const newCategories = splitCategories(categories);
    return (
        <section id = "categories">
        <h1>Categories</h1>
        {newCategories.map( category =>
            (
            <ul key = {category.level1} className = "categoryLevel1">{category.level1}
            {category.level2.map( level2 => (
                level2 === undefined ? '':
                <li key = {level2} className = "categoryLevel2">{level2}</li>  
            ))}</ul>
            ))}
        </section>
    )
    
}

export default Category;
