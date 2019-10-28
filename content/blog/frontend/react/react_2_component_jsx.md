---
title: "[React]2.Component, JSX, Props" 
category: "FrontEnd/React"
date: "2019-10-08"
tags: ["React","FrontEnd","노마드코더","컴포넌트", "JSX", "PropTypes"]  
---

안녕하세요. PSYda 입니다.

본 포스팅은 [Nomad Coders 의 "React JS로 웹서비스 만들기"](https://academy.nomadcoders.co/courses/)를 통해 학습한 내용을 정리한 것입니다.

이번 포스팅에서는 Component와 JSX에 대해 알아볼 예정이며 목차는 아래와 같습니다.

<div id = "summary">
<br>
<ol>
<strong>
<li>(함수)Component</li>
<li>JSX & props</li>
<li>동적인 Component 사용(Map함수 이용)</li>
<li>유효한 Props 인지 Check하기</li>
</strong>
</ol>
</div>

# 1. Component
## 1.1 Component란?

- HTML을 반환해주는 함수 또는 클래스
- 함수 컴포넌트와 클래스 컴포넌트가 있음
- 독립적인 단위로서 재사용성이 높음

## 1.2 Component 만들기
별도의 Javascript 파일을 생성하여 아래와 같이 간단하게 Component를 만들 수 있습니다.
```js
//App.js
import React from 'react';
function App(){
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
}
export default App;
```

세부적으로 파헤쳐 보면 아래와 같습니다.

<strong>1) react import</strong>
```js
import react from 'react';
```

<strong>2) 함수(Component)를 생성하고 HTML을 return하도록 작성</strong>
```js
function App(){return (<div><h1>Hello</h1></div>)}
```

<strong>3) export할 Component명 명시</strong>
```js
export default App;
```



## 1.3 Component 사용하기
위에서 생성한 Component를 다른 javascript 파일에서 import하여 아래와 같이 사용할 수 있습니다.

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```
세부적으로 살펴보겠습니다.

<strong>1) import</strong>

- {{< em "react" >}} import
- rendering을 위한 {{< em "react-dom" >}} import
- {{< em "Component" >}}가 있는 Javascript import

<strong>2) ReactDOM.render 함수 호출</strong>

- 사용될 <strong>Component 명 명시</strong>({{< em "<App />" >}})
- rendering 할 <strong>DOM 선택</strong>({{< em "document.getElementById('root')" >}})    

<strong>3) index.html에서 rendering</strong>

- index.html의 dom에 해당하는 부분에 작성된 Component가 저장되어 표출

<strong>4) 동작 확인 </strong>

- 터미널에서 npm start
- [localhost:3000](localhost:3000) 접속

{{< img-post "/img/react/1" "1_23.png" "" "center" >}}

## 1.4 여러 개의 Component를 만들기
하나의 File에 여러 개의 Component를 만들어 사용 할 수 있습니다. 위의 App.js에 Food라는 Component를 하나 더 생성해보겠습니다.

```js
//App.js
import React from 'react';
//Food Component
function Food(){
  return (<h2>Apple</h2>)
}
//App Component
function App() {
  return (
    <div>
      <h1>Hello!!!!!</h1>
      <Food />  
    </div>
    );
}

export default App;
```

<strong>1) App.js 에 Food Component 추가</strong>
```js
function Food(){return (<h2>Apple</h2>)}
```

<strong>2) App Component에서 Food Component 사용</strong>
```js
function App(){ return ... <Food /> ... }
```
<strong>3) 동작 확인</strong>

{{< img-post "/img/react/2" "2_1.png" "" "center" >}}

# 2. JSX & Props
## 2.1 JSX(Javascript XML)란?
위에서 Component를 return 할 때 사용한 HTML과 비슷한 부분을 JSX라고 합니다. JSX는 HTML 뿐만 아니라 Javascript를 이용한 동적인 부분도 작성할 수 있습니다. 간단히 JSX를 알아보면 아래와 같습니다.

- XML과 유사한 {{< em "Javascript를 확장" >}}한 문법
- {{< em "Javascript와 HTML의 조합" >}}으로 작성
- React가 필요로하는 유일한 추가적인 개념(JSX 이외에는 Javascript 개념만 알면 됨)

## 2.2 Props(Properties)

- <u>Component에 Data를 전달하기 위한 방법</u>으로 {{< em "Component의 속성값" >}}을 의미
- {{< em "Component명({Props})" >}} 의 형태로 사용

예를 들어 App Component에서 Food Component로 특정 데이터를 보내고, Food Component에서 전달받은 데이터를 사용하는 예시를 알아보겠습니다.

```js
//App.js
import React from 'react';
function Food({name}){
  return (<h2>I like {name}</h2>)
}
function App() {
  return (<div>
      <Food name = "apple"/>
      <Food name = "banana"/>
    </div>);
}

export default App;
```
<strong>1)Food Component에서 props 설정</strong>
```js
function Food({name}){
  return (<h2>I like {name}</h2>)
}
```

- {{<em "name">}}이라는 값을 props로 설정
- {{<em "{name}">}}의 형태로 props 사용

<strong>2)App Component에서 Food Component에 props 전달</strong>
```js
//apple props을 가지는 Food Component
    <Food name = "apple"/>
//banana props을 가지는 Food Component
    <Food name = "banana"/>
```

<strong>3) 동작 확인</strong>

{{< img-post "/img/react/2" "2_2.png" "" "center" >}}

# 3. 동적인 Component 사용(Map함수 이용)
위의 예시에서 Component를 만들어 보았고, 만든 Component를 하나씩 입력하여 사용해보았습니다. 이런 경우에 만약 같은 Component를 5번 사용할 경우 5번을 입력해야할 것입니다.  
이런 경우 Map 함수를 이용하면 동적으로 Component를 사용 할 수 있습니다.

## 3.1 Map 함수란?
- Map 함수의 인자로 <strong>입력 된 함수</strong>를 Object의 <strong>각 요소에 적용</strong>하는 함수
- 사용방법 : {{< em "Ojbect.Map(func)" >}}

## 3.2 동적인 Component 사용 예시

```js
import React from 'react';

//Food Component
function Food({name, evaluation}){
  return (<h2>I like {name}. It is {evaluation}.</h2>)
}

//Object
const foodILike = [
  {
    name: "Pizza",
    evaluation: "Good"
  },
  {
    name:"Steak",
    evaluation:"Excellent"
  }
];

//food Render 함수
function foodRender(food)
{
  return (<Food name = {food.name} evaluation = {food.evaluation}/>);
}

//App Component
function App() {
  return (
    <div>
      {foodILike.map(foodRender)}
    </div>);
}

export default App;

```
세부적으로 살펴보겠습니다.

<strong>1) Javascript Object 생성</strong>

- foodILike Object를 생성(name, evaluation으로 구성)

<strong>2) food Component에서 2개 props 받기</strong>
```js
function Food({name, evaluation}){
  return (<h2>I like {name}. It is {evaluation}.</h2>)
}
```

- Object의 name 과 evaluation를 입력받아 h2 Tag로 출력

<strong>3) Component를 생성하는 함수 만들기</strong>
```js
function foodRender(food)
{
  return (<Food name = {food.name} evaluation = {food.evaluation}/>);
}
```

- food : foodILike Object 여러 요소 중 하나의 요소
- 함수 역할 : name 과 evaluation props를 가지는 Food Component 생성 

<strong>4) Object의 Map 함수를 이용해 Component 동적 생성</strong>
```js
{foodILike.map(foodRender)}
```

- foodILike : Map을 적용할 object명
- foodRender : foodILike Object의 각각의 요소에 적용할 함수
- map 함수 적용 결과 : 각 Ojbect의 name 과 evaluation props를 가지는 Food Component 생성

<strong>5) 동작 확인</strong>
{{< img-post "/img/react/2" "2_3.png" "" "center" >}}

<strong> 6) 기타 사항</strong>

브라우저를 실행시키면 위와 같이 동작하는 것을 확인 할 수 있지만, 개발자도구(F12)를 실행시켜서 콘솔창을 보면 아래와 같은 Warning Message를 확인 할 수 있습니다.
{{< img-post "/img/react/2" "2_4.png" "" "center" >}}

이는 Ojbect의 각각의 값에 id라는 props를 저장하고, Component를 사용할 때 이 id를 key값으로 설정해줌으로서 해결할 수 있습니다.

```js
//Ojbect
const foodILike = [
  {
    id: 1,
    name: "Pizza",
    evaluation: "Good"
  },
  {
    id: 2,
    name:"Steak",
    evaluation:"Excellent"
  }
];

//food Render 함수
function foodRender(food)
{
  return (<Food key = {food.id} name = {food.name} evaluation = {food.evaluation}/>);
}
```

- foodILike Object의 각각의 요소에 id값 저장
- Component에 key값으로 food.id값 사용

# 4. 유효한 Props 인지 Check하기
Component에서 전달받은 props는 우리의 의도와는 다른 props가 전달 될 수 있습니다. 
그러므로 우리는 전달받은 props가 유효한 props인지 확인해야합니다.
props types 라는 것을 통해 유효성을 check할 수 있습니다.

# 4.1 props types 설치하기
- cmd(터미널)에서 {{< em "npm i prop-types" >}} 입력
- package.json 의 "dependencies" 항목에서 설치 되었는지 확인

```cmd
movie_app_2019>nmp i prop-types
```

# 4.2 props types 사용하기

<strong>1) props types import</strong>
```js
import PropTypes from "prop-types";
```

<strong>2) 확인할 props와 유효성 체크항목 명시</strong>
```js
Food.PropTypes = {
  name: PropTypes.string.isRequired,
  evaluation : PropTypes.string.isRequired
}
```

<strong>3) 유효성이 어긋나는 경우 확인</strong>

위에서 작성한 유효성에 어긋날 경우 개발자 도구 -> 콘솔창에서 Warning을 확인 할 수 있습니다.

감사합니다.