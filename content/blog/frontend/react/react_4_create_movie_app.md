---
title: "[React]4.영화 App 만들기" 
category: "FrontEnd/React"
date: "2019-10-12"
tags: ["React","FrontEnd","노마드코더","React App"]   
---

안녕하세요. PSYda 입니다.

본 포스팅은 [Nomad Coders 의 "React JS로 웹서비스 만들기"](https://academy.nomadcoders.co/courses/)를 통해 학습한 내용을 정리한 것입니다.

이번 포스팅에서는 지금까지 배운 내용을 바탕으로 실제 [여기](https://dribbble.com/shots/2442798-Movie-Application/attachments/475341) 형태를 가지는 Movie App을 만들어 볼 예정입니다. 세부적으로 알아볼 내용은 아래와 같습니다.

<div id = "summary">
<br>
<ol>
<strong>
<li><strong><span style= "color:red">API</span></strong>로 부터 Movie <strong><span style= "color:red">데이터 가져오기</span></strong></li>
<li>Movies App <strong><span style= "color:red">화면에 띄우기</span></strong></li>
<li>Movies App에 <strong><span style= "color:red">스타일 입히기</span></strong></li>
<li><strong><span style= "color:red">Github page에 Movie App 표시</span></strong></li>
</strong>
</ol>
</div>


# 1. API로 부터 Movie 데이터 가져오기
Javascript를 이용해 외부의 데이터를 가지고 오는 방법에는 <strong>jquery, fetch, Axios</strong> 등의 방법이 있는데, 그 중 <strong><span style= "color:red">Axios</span></strong>를 이용하겠습니다.  

# 1.1 Axios
<strong>1) Axios 설치</strong>

- cmd(터미널) 창에서 <strong><span style= "color:red">npm i axios 입력</span></strong>

```cmd
movie_app_2019>npm i axios
```

<strong>2) Axios import</strong>
```js
import axios from "axios";
```

# 1.2 API(yts) 사용하기

<strong>1) Data를 가져올 API URL 정보</strong>

- https://yts-proxy.now.sh/list_movies.json

<strong>2) Axios를 이용해 Data 가져오기</strong>
```js
//App class
  getMovies = async () => {
    const { data: { data: { movies }}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");list_movies.json");
  }
  componentDidMount(){
    this.getMovies();
  }
```

- getMovies 라는 함수를 <strong><span style= "color:red">비동기 방식(async, await)</span></strong>으로 생성
- getMovies 함수에서 movies라는 변수에 가져온 영화 데이터 저장
- movies 라는 데이터는 data 안의 data 안에 있음.
- rending 후에(componentDidMount함수에서) getMovies 함수 실행

# 2. Movies Rendering
## 2.1 Movie Component 생성
Movie 데이터를 rendering 하기 위한 Component를 생성합니다.
```js
//Movie.js
import React from "react";
import PropTypes from "prop-types";

function Movie({id, year, title, summary, poster, genres}){
    return <h5>{title}</h5>
}

Movie.propTypes = {
    id:PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;
```

<strong>1) props 설정</strong>
```js
function Movie({id, year, title, summary, poster, genres})
```

- id, year, title, summary, poster 를 props로 받음

<strong>2) title을 rendering</strong>
```js
return <h5>{title}</h5>
```

<strong>3) PropTypes를 이용해 props의 type check</strong>
```js
Movie.propTypes = {
    id:PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};
```

- id, year 는 숫자형
- title, summary, poster 는 string 형
- genres는 array형

## 2.2 state 사용
가져온 movies 데이터를 state에 저장합니다.

<strong>1) state 생성</strong>
```js
//App Class
  state = {
    isLoading: true,
    movies: []
  }
```

- movies : [] 라는 state Object 정의

<strong>2) state 저장</strong>

```js
//App class
  getMovies = async () => {
    const { data: { data: { movies }}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading:false })
  };
```

- 가져온 데이터(movies) 를 State에 저장
- <strong><u>movies : movies</u></strong> 를 써야하나 위와 같이 <strong><span style= "color:red">movies</span></strong> 형태로 사용 가능

## 2.3 Rendering
state에 값이 저장되면 rendering 을 시작합니다.
```js
//App class
  render(){
    const { isLoading, movies } = this.state;
    return (
    <div>
      { isLoading ? "Loading..." : movies.map( movie => (
        <Movie 
          key={movie.id} 
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary} 
          poster={movie.medium_cover_image}
          genres = {movie.genres} />
    )) }</div>);
```


<strong>1) 최초 rendering </strong>

- isLoading 은 True 이기 때문에 <strong>"Loading..."</strong> 을 출력

<strong>2)State에 저장 </strong>

- isLoading 이 False 로 변경됨
- 조건문에 따라 movies.map() 함수가 실행

<strong>3) Movie Component를 사용</strong>

## 2.4 동작 확인
{{< img-post "/img/react/4" "4_1.png" "" "center">}}

# 3. Movie App Styling
# 3.1 Movie App 의 구조화
위에서 작성한 Movie App은 단순히 데이터만 들어가 있기 때문에 Style을 입히기 힘듭니다. HTML Tag와 Class를 이용해 구조화 해줌으로서 CSS 파일을 이용해 Styling 할 수 있습니다. 여기서 HTML 의 class 를 JSX에서 사용할 때는 <strong><span style= "color:red">className</span></strong> 을 써야합니다.

위의 Component의 return 부분을 수정하여 구조화 된 형태로 변경하겠습니다. 

<strong>1) Movie Component의 return 변경</strong>
```js
//Movie Component
function Movie({id, year, title, summary, poster}){
    return (
    <div className="movie">
        <img src={poster} alt={title} title={title}/>
        <div className="movie__data">
            <h3 className ="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <ul className = "genres">
                {genres.map((genre, index) => (
                <li key = {index} className ="genres__genre">{genre}</li>
                ))}
            </ul>
            <p className="movie__summary">{summary}</p>
        </div>
    </div>
    )
}
```

- genres는 array형태 이기 때문에 map 함수를 이용해 li 태그 생성

<strong>2) App Component render함수의 return 변경</strong>
```js
//App Component render 함수
 render(){
    const { isLoading, movies } = this.state;
    return (
    <section className ="container">
      { isLoading 
      ? <div className = "loader">
        <span className="loader__text">Loading...</span>
        </div>
      :(
        <div className = "movies">
          {movies.map(movie => 
          (
            <Movie
              key = {movie.id}
              id = {movie.id}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />
          )
          )
          }
        </div>
      )}
      </section>);
  }
```

<strong>3) 동작 확인</strong>
{{< img-post "/img/react/4" "4_2.png" "" "center">}}

## 3.2 css 파일로 Movie App Styling

<strong>1) css 파일 생성</strong>

- Movie.css 파일 생성
- App.css 파일 생성

<strong>2) css 파일 import</strong>

- Movie.js 에서 상단에 <strong><span style="color:red">import "./Movie.css"</span></strong> 입력
- App.js 에서 상단에 <strong><span style="color:red">import "./App.css"</span></strong> 입력

<strong>3) css 파일에 Style 내용 입력</strong>
입력한 css 내용은 아래 github 에서 참고하실 수 있습니다.

- [App.css](https://github.com/nomadcoders/movie_app_2019/blob/master/src/App.css)
- [Movie.css](https://github.com/nomadcoders/movie_app_2019/blob/master/src/Movie.css)

## 3.3 동작 확인
{{< img-post "/img/react/4" "4_3.png" "" "center">}}

## 3.4 기타 작업
위의 결과물을 확인해보면 summary 글자 수의 차이에 따라 영화 소개 박스의 크기가 차이 나는 것을 확인 할 수 있습니다. 이는 <strong><span style= "color:red">slice</span></strong> 라는 함수를 통해 summary 의 글자 수를 고정함으로서 해결할 수 있습니다. 

<strong>1) slice를 통한 string 의 글자수 고정</strong>
```html
//Movie function(component)의 return
<p className="movie__summary">{summary.slice(0, 140)}</p>
```

<strong>2) 최종 결과물 확인</strong>
{{< img-post "/img/react/4" "4_4.png" "" "center">}}

# 4. Github page 에 Movie App 표시
Github에서 우리가 만든 Movie App을 화면에 표시할 수 있습니다. 이는 온라인 상에서 다른 사람이 우리가 만든 결과물을 볼 수 있음을 의미합니다. 그 방법에 대해 알아보겠습니다.

# 4.1 gh-pages 설치
Github page 에 표시하기 위해서는 <strong><u>gh-pages</u></strong>를 설치해야합니다.

- cmd(터미널)에서 <strong><span style= "color:red">npm i gh-pages</span></strong>
```cmd
movie_app_2019>npm i gh-pages
```

# 4.2 package.json 수정

<strong>1) homepage 설정</strong>

```js
//package.json
"homepage":"https://psyssai.github.io/movie_app_2019"
```

- psyssai 대신 본인의 github ID 입력
- movie_app_2019 대신 본인의 react project 명 입력

<strong>2) scripts에 내용 추가</strong>

```js
//package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  }
```

- deploy 와 predeploy 내용 추가

<strong>3) movie_app 빌드</strong>

- cmd(터미널)에서 <strong><span style= "color:red">npm run build</span></strong> 입력
```cmd
movie_app_2019>npm run build
```

<strong>4) movie_app을 github page에 발행</strong>

- cmd(터미널)에서 <strong><span style= "color:red">npm run deploy"</span></strong> 입력
```cmd
movie_app_2019>npm run deploy
```

- scripts에 따라 <strong><span style= "color:red">predeploy(npm run build)</span></strong> 가 먼저 실행됨
- 그 후에 script의 <strong><span style= "color:red">deploy(gh-pages -d build)</span></strong> 가 실행

<strong>5) github사이트에서 결과물 확인</strong>  

- [github 사이트](https://psyssai.github.io/movie_app_2019) 접속

감사합니다.