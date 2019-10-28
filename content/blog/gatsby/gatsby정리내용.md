---
title: "[Gatsby]1.Plugin" 
category: "Gatsby"
date: "2019-09-26"
path: "/gatsby/1_setup"
---


# 1.gatsby-source-filesystem
Local File System에서 Gatsby Application의 데이터를 소싱하기 위한 플러그인

- 파일로부터 File 노드를 만듬
- transformer 플러그인은 File 노드를 다양한 유형의 데이터로 변환 가능
- EX1) gatsby-transformer-json은 JSON 파일을 JSON 데이터 노드로 변환
- EX2) gatsby-transformer-remark는 markdown 파일을 MarkdownRemark 노드로 변환하여 HTML 표현을 쿼리할 수 있음

# 1.1 설치
npm install --save gatsby-source-filesystem


# 1.2 사용 방법
gatsby-config.js 에 내용 추가
```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    // gatsby-source-filesystem 플러그인의 여러 인스턴스를 사용하여
    // 파일 시스템의 다른 위치에서 소스 노드를 읽을 수 있다.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ],
}
```

# 1.3 Options
