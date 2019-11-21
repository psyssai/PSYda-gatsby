import React, { Fragment } from "react"

const getUniqueCategories = (posts) =>
{
    let categories = [];
    posts.map( edge =>( categories.push(edge.node.frontmatter.category )))
    return Array.from(new Set(categories));
}
 
const splitCategories = ( categories ) => 
{
    let newCategories = Array();
    let preCategory = 0;
    let levelIndex = -1;
    let levelOne;

    for(let i = 0; i <categories.length; i++ ){
        const category = categories[i];
        if( category === null) continue;
        else{ // category 가 null 이 아닐 때
        let categoryList = category.split('/');
        levelOne = categoryList[0];
        console.log("###for", i, levelIndex, levelOne, preCategory);
        if (levelOne === preCategory){
            newCategories[levelIndex].level2.push(categoryList[1]);
        }
        else{
            newCategories.push({level1 : categoryList[0], level2 : [categoryList[1]]});
            levelIndex++;
        }
        preCategory = categoryList[0];
        }
    }
    return newCategories;
}

const Category = ({posts}) => {
    const categories = getUniqueCategories(posts)
    const newCategories = splitCategories(categories);
    return (
        <section id = "categories">
        <h1>Categories</h1>
        {newCategories.map( category =>
            (
            <Fragment>
            <ul className = "categoryLevel1">{category.level1}
            {category.level2.map( level2 => (
                level2 === undefined ? '':
                <li className = "categoryLevel2">{level2}</li>  
            ))}</ul>
            </Fragment>
            ))}
        </section>
    )
}

export default Category;