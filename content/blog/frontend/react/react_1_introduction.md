---
title: "[React]1.React 소개와 설치" 
category: "FrontEnd/React"
date: "2019-09-27"
tags: ["React","FrontEnd","노마드코더","node.js","npm","npx","react app 구조"]  
---

안녕하세요. PSYda 입니다.

오늘은 React에 대해 간략하게 소개하고, 설치하는 과정을 포스팅할 예정입니다.  
이전 시간에 말씀드린 것 처럼 [Nomad Coders 의 "React JS로 웹서비스 만들기"](https://academy.nomadcoders.co/courses/)를 통해 학습한 내용을 정리하였으며, 이번 포스팅에서 알아볼 내용은 아래와 같습니다.

<div id = "summary">
<br>
<ol>
    <li><strong>React에 대한 소개</strong></li>
    <li><strong>React Setup</strong></li>
    <li><strong>React App 구조 및 동작 원리</strong></li>
</ol>
</div>

# 1. React 소개
## 1.1 Why React?
<strong><u>1) 많은 회사들이 React를 사용</u></strong>

- React는 Facebook이 만들었고, 모든 Facebook은 React로 구현
- Airbnb, npm, Netflix 등 유명한 서비스들이 React로 구현

<strong><u>2) 많은 개발자가 React를 사용</u></strong>

- npm에서 react library 다운로드 정보를 살펴보면 500만건/1주 

[![React Library 주간 다운로드](./img/1/1_5.png)](https://www.npmjs.com/package/react)

- 2018년 프론트엔드 개발 생태계 설문조사에서 React가 압도적 1등

[![FrontEnd Ecosystem 설문조사](./img/1/1_6.png)](https://2018.stateofjs.com/front-end-frameworks/overview/?no-cache=1)

<strong><u>3) 활성화가 잘 된 커뮤니티</u></strong>

<strong><u>4) Javascript 기반의 언어(라이브러리)</u></strong>

- React가 사라지더라도 Javascript에 대한 Skill은 향상 가능
- Angular의 경우 자체적인 문법을 사용하기 때문에 배우기 어렵고, 망하면 남는게 없음  

5) 그 외 이유는 아래 그림 및 링크 참고
[![왜 React인가?](./img/1/1_7.png)](https://2018.stateofjs.com/front-end-frameworks/react/)

## 1.2 필요한 사전 지식
React를 배우기 전에 알고 있으면 좋은 Skill 들은 아래와 같습니다.

1) HTML  
2) CSS  
3) Javascript  
4) node.js  

## 1.3 설치할 프로그램들
1) <strong><span style="color:red">node.js</span></strong> : [node.js 공식 홈페이지](https://nodejs.org/ko/download/)에서 설치  

- 설치 후 cmd창(터미널)에서 <Strong><u>node -v</u></strong> 입력하여 version 확인  

```cmd
>node-v
v10.16.2
```

2) <strong><span style="color:red">npm</span></strong>: node.js를 설치하면 자동으로 설치

- 설치 후 cmd창(터미널)에서 <strong><u>npm -v</u></strong> 입력하여 version 확인

```cmd
>npm -v
6.10.3
```

3) <strong><span style="color:red">npx</span></strong> : npm을 통해서 설치

- cmd창(터미널)에서 <strong><u>npm install npx -g</u></strong> 명령어 입력하여 설치

```cmd
>npm install npx -g
```

4) <strong><span style="color:red">git</span></strong> : [git 공식 홈페이지](https://git-scm.com/download/win)에서 자신의 OS에 맞게 설치

- 설치 후 cmd창(터미널)에서 <strong><u>git --version</u></strong> 입력하여 version 확인

```cmd
>git --version
git version 20.22.0.windows.1
```

5) <strong><span style="color:red">vscode</span></strong> : 요즘 많이들 쓰는 IDE(코드 편집기)

- 원래 쓰는 IDE가 있으면 굳이 설치할 필요 없음

# 2.React Setup
## 2.1 React App 만들기  
React는 아름다운(?) Component를 만들 수 있는 언어이지만, Browser에서 React 코드를 이해하지 못하기 때문에, 못생긴(이해 가능한) 코드로 변경해줘야합니다. 이를 위해 Webpack, Babel을 다운로드 해야 하고 React 코드를 컴파일을 해야 하는 등 번거로운 작업들이 필요했었습니다. 하지만 2016년 이후부터는 <strong><span style="color:red">'create react app'</span></strong> 을 통해 간단하게 React Wep App을 만들 수 있습니다.

<strong><u>1) App 설치</u></strong>

- cmd(터미널)창에서 <strong><span style="color:red">npx create-react-app APP이름</span></strong> 을 입력
```cmd
>npx create-react-app movie_app_2019
npx: installed 91 in 9.768s
creating a new React app in path\moview_app_2019
installing packages. This might take a couple of minues.
```

<strong><u>2) VS code 열기</u></strong>

- cmd(터미널)창에서 <strong><span style="color:red">code moview_app_2019</span></strong> 입력
```cmd
>code movie_app_2019
```

<strong><u>3) APP 실행</u></strong>

- VS code 상의 Terminal에서 <strong><span style="color:red">npm start</span></strong> 입력
```cmd
movie_app_2019> npm start
```

<strong><u>4) APP 구동 확인</u></strong>

- <strong><span style="color:red">http://localhost:3000</span></strong> 에 접속하여 동작하는지 확인

## 2.2 Github Repository 만들기  
React App 을 <strong><span style="color:red">git</span></strong>으로 관리하며 원격 서버는 <strong><span style="color:red">Github</span></strong>를 이용할 예정입니다. 따라서 Github Repository를 만들어 git과 연동하는 방법을 설명합니다. Repository 생성을 위해서는 Github에 별도의 가입이 필요하며, 계정이 있다는 가정하에 진행합니다.

1) Gitgub 사이트에서 <strong><u>새로운 Repository 생성</u></strong>
![새로운 Repository 생성](./img/1/1_11.png)

2) <strong><u>git 저장소 생성</u></strong>  
생성된 React App 폴더에 git 저장소를 생성합니다.

- cmd창(터미널)에서 <strong><span style="color:red">git init</span></strong> 입력
```cmd
movie_app_2019> git init
initialized empty Git repository in movie_app_2019/.git/
```

3) <strong><u>git에게 원격 서버 알려주기</u></strong>  
1번에서 생성한 Repository 주소를 입력합니다.

- cmd창(터미널)에서 <strong><span style="color:red">git remote add origin 원격서버주소</span></strong> 입력

```cmd
movie_app_2019>git remote add origin https://github.com/psyssai/movie_app_2019.git
```

<strong><u>4) 원격 서버에 프로젝트 저장</u></strong>

- cmd창(터미널)에서 아래와 같이 순서대로 입력
- <strong><span style="color:red">git add.</span></strong>
- <strong><span style="color:red">git commit -m '입력할 메시지'</span></strong>
- <strong><span style="color:red">git push origin master</span></strong>  

```cmd
movie_app_2019>git add.
movie_app_2019>git commit -m "#1.0 Creating Your React App"
movie_app_2019>git push origin master
```

<strong><u>5) 원격저장소 확인</u></strong>  
Github 사이트로 이동하여 원격 저장소에 잘 발행되었는지 확인합니다.

[![Github 사이트 이동](./img/1/1_17.png)](https://github.com/psyssai/movie_app_2019)


# 3. React App 구조 및 동작 원리
## 3.1 React App Project 구조
![React App 구조](./img/1/1_18.png)

위의 그림과 같이 React App Project는 3개의 폴더를 가집니다.  
<strong><span style="color:red">1) node_modules</span></strong>  
<strong><span style="color:red">2) public</span></strong>

- <strong><u>favicon.ico</u></strong> : Browser Tab에 나오는 아이콘
![아이콘](./img/1/1_21.png)
- <strong><u>index.html</u></strong> : index만 가지고 있는 html
- <strong><u>manifest.json</u></strong> : (추후 설명)

<strong><span style="color:red">3) src</span></strong> : 각종 소스가 모여 있는 폴더

- App.js와 Index.js를 제외하고 모두 삭제(처음부터 새로 만들기 위해)
- <strong><u>App.js</u></strong> : 컴포넌트에 해당하는 부분
- <strong><u>index.js</u></strong> : 컴포넌트를 그려주는 부분

## 3.2 React의 특징

<strong><u>1) 실시간 적용</u></strong>  

- App.js 를 수정하면 그 결과가 바로 적용되어 확인 가능

<strong><u>2) Virtual DOM</u></strong>  

- Application이 Load할 때 빈 html을 로드 하고, react가 HTML에 정보를 밀어 넣음

## 3.3 ReactApp 실행
- cmd창(터미널)에서 <strong><span style="color:red">npm start</span></strong> 입력

```cmd
movie_app_2019>npm start
Starting the development server...
complied successfully!
```

- 브라우저에서 [localhost:3000](http://localhost:3000/) 으로 이동하여 동작 확인

## 3.4 동작 원리
1) <strong><span style="color:red">App.js</span></strong>에 있는 <strong><span style="color:red">App 함수</span></strong>에서 <strong><u>생성하고 싶은 부분을 명시</u></strong>  
2) <strong><span style="color:red">index.js</span></strong> 에서 <strong><u>App을 불러오고 index.html에서 찾을 요소를 명시</u></strong>  
3) <strong><span style="color:red">index.html</span></strong> 에서 찾아진 요소 부분에 <strong><u>App에서 명시한 것이 생성</u></strong>  

아래와 같이 코드를 입력하고, 결과를 확인합니다.


```js
//App.js
import React from 'react';

function App() {
    return <div>Hello!!!!!</div>
}

export default App
```

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementByID('root'))
```
```html
<!-- index.html 의 body 부분 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
```

![React App 동작원리](./img/1/1_22.png)

- 실제로 <strong><span style="color:red">index.html은 비어 있지만</span></strong>, 아래와 같이 <strong><u>Browser에 표시됨</u></strong>
- F12(개발자 도구)를 눌러보면 Hello!!!! 가 id root에 생성되어 있음
![결과 확인](./img/1/1_23.png)


감사합니다.