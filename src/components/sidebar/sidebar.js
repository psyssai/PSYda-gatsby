import React, { Fragment } from "react";
import { graphql } from "gatsby"
import Image from "gatsby-image"
import "./sidebar.css";
import propTypes from "prop-types"

class Sidebar extends React.Component{

  // Posts에서 Categories를 읽어옴
  getUniqueCategories(posts){
    let categories = [];
    posts.map( edge =>( categories.push(edge.node.frontmatter.category )))
    return Array.from(new Set(categories));
  }

  splitCategories = ( categories ) => {
    let newCategories = [];
    console.log("###splitCategories",categories)
    let preCategory = 0;
    let levelIndex = -1;
    let newCategories2 = [["frontEnd",["js","react"]],["gatby"]];
    console.log("####test",newCategories2);
      
    for(let i = 0; i <categories.length; i++ ){
      let category = categories[i];
      if( category === null) continue;
      else{
        let categoryList = category.split('/');
        
        let levelOne = categoryList[0];
        console.log("###splitCategories2", categoryList, categoryList[0], preCategory)
        if (categoryList[0] === preCategory){
          console.log("###test",newCategories[levelIndex]);
          //newCategories[levelIndex].push([categoryList[1]]);
          console.log("###splitCategories3", preCategory, newCategories[levelIndex], levelIndex)
        }
        else{
          newCategories.push([categoryList[0], [categoryList[1]]]);
          levelIndex++;
        }
        preCategory = categoryList[0];
        console.log("###splitCategories4",preCategory);
      }
    }
    console.log("###splitCategories5", newCategories)
    return newCategories;
  }

  render(){
    const {posts} = this.props;
    const categories = this.getUniqueCategories(posts)
    const newCategories = this.splitCategories(categories);
    console.log("###side2",newCategories)
    const {avatar, author, description} = this.props;
    const profile = (
      <section id = "introduce">
      <Image
          fixed={avatar.childImageSharp.fixed}
          alt={author}
      />
      <h2 className = "author">{author}</h2>
      <p>{description}</p>
    </section>
    );
      console.log("###newCategories",newCategories)
    return(
      <section id = "sidebar">
        {profile}
        <section id = "categories">
          <h1>Categories</h1>
          {newCategories.map( category =>
            (
              <Fragment>
              <ul className = "categoryLevel1">{category[0]}
              <li className = "categoryLevel2">{category[1]}</li></ul>
              </Fragment>
            ))}
        </section>
        
      </section>
  );
  }
}

Sidebar.propTypes = {
  author:propTypes.string.isRequired,
  avatar:propTypes.object.isRequired,
  description:propTypes.string.isRequired,
  posts:propTypes.array.isRequired
}


export default Sidebar;

export const pageQuery = graphql`
    query {
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
  `