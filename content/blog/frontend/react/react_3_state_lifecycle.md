---
title: "[React]3.State & Component Life Cycle" 
category: "FrontEnd/React"
date: "2019-10-11"
tags: ["React","FrontEnd","노마드코더","스테이트", "클래스 컴포넌트", "컴포넌트 라이프싸이클"]  
---

안녕하세요. PSYda 입니다.

본 포스팅은 [Nomad Coders 의 "React JS로 웹서비스 만들기"](https://academy.nomadcoders.co/courses/)를 통해 학습한 내용을 정리한 것입니다.

이번 포스팅에서 알아볼 내용은 아래와 같습니다.

<div id = "summary">
<br>
<ol>
<strong>
<li>Class Component</li>
<li>State</li>
<li>Component LifeCycle</li>
</strong>
</ol>
</div>


# 1. Class Component
Component는 함수 Component와 Class Component과 있으며, [이전 포스팅](/frontend/react/react_2_component_jsx)에 이어 이번에는 Class Component에 대해 알아보겠습니다.
## 1.1 Class Component 생성
```js
//App.js
import React from 'react';

class App extends React.Component{
  render(){ return <div>Hello</div> }
}

export default App;

```

<strong>1) react import </strong>
```js
import React from 'react';
```
<strong>2) React.Component Class로 부터 상속받은 App Class(Component) 생성 </strong>
```js
class App extends React.Component{}
```
<strong>3) render 함수의 return에 rendering 할 내용을 JSX로 작성</strong>
```js
render(){ return <div>Hello</div> }
```

<strong>4) Component export</strong>
```js
export defualt App;
```

# 2.State
- State = Object
- Component 내부에서 동적인 데이터를 다루고 싶을 때 사용
- State가 변경되면 자동으로 render 함수 수행

## 2.1 State 생성 및 사용
```js
//App Class
class App extends React.Component{
    state = { count : 0 } ;
    render(){ return <div>The number is {this.state.count}</div> }
}
```
<strong>1) State 만들기</strong>

- Class 내부에 {{<em "state = { 변수 : 값 }">}} 형태로 생성
- 미래에 사용할 모든 변수를 정의할 필요는 없음. 계획단계의 변수만 정의

<strong>2) State 사용</strong>

- {{<em "{this.state.변수명}">}} 형태로 사용
- 또는 {{<em "const {변수명} = this.state">}} 로 정의하고, {{<em "변수명">}} 을 대신 사용

## 2.2 State 의 값 변경
- this.state.count = 1 과 같은 형태로 직접 state를 변경할 수 없음
- State의 값을 변경하기 위해서는 {{< em "setState()" >}} 함수를 반드시 사용!
- setState를 통해 State의 값이 변경되면 {{< em "render() 함수를 자동으로 실행" >}}
- Virtual DOM 을 통해 {{< em "변경된 부분(State가 변한 부분) 만 다시 Rendering" >}} 함

예제 코드 입니다.
```js
//App Class
class App extends React.Component{
  state = {
    count: 0
  };

  // add, minus 함수
  add = () => {
    this.setState({count: this.state.count + 1});
  };
  minus = () => {
    this.setState({count: this.state.count - 1});
  };

  // render 함수
  render(){
    return (
      <div>
        <h1>The number is : {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    )
  }
}
```
위의 예제는 두 개의 Button(Add, Minus)을 생성합니다. Add Button을 누르면 State의 Count가 +1, Minus Button을 누르면 State의 Count가 -1 이 됩니다. State가 Undate되면서 render() 함수에 있는 내용이 자동으로 rendering 되어 브라우저에서 변경된 내용을 바로 볼 수 있습니다. 세부적으로 알아보겠습니다.

<strong>1) render 함수에 Button 생성</strong>
```html
<button onClick={this.add}>Add</button>
<button onClick={this.minus}>Minus</button>
```

- Add/Minus Button을 클릭(onClick) 하면 add/minus 함수 호출
- 이벤트 이름 설정시 반드시 camelCase로 작성(onClick, onChange 등)
- 이벤트에 전달해주는 값은 반드시 함수(함수를 호출 하면 안됨, ex Add())

<strong>2) add, minus 함수 생성</strong>
```js
  add = () => {
    this.setState({count: this.state.count + 1});
  };
```

- setState를 통해 state의 count 값을 update를 하고 rendering 수행

<strong>3) 동작 확인</strong>
{{< img-post "/img/react/3" "3_1.png" "" "center" >}}

<strong>4) 기타 사항 </strong>  
2) 에서 setState를 통해 state를 변경 할 때 예제와 같이 this.state.count 형태로 사용할 경우 this.state를 한번 더 조회해야 하는 문제를 가지고 있습니다. 그래서 아래와 같이 함수형태로 바꿔서 사용합니다.
```js
  add = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };
```

# 3. Component Life Cycle
React Component 생성(Mounting), 업데이트(Updating), 파괴(Unmounting) 될 수 있습니다. 
그 과정에서 호출되는 함수들이 있으며, 호출 시점에 따라 필요한 사용자 코드를 추가할 수 있습니다.

# 3.1 Mounting
Component가 Mounting 될 때 호출 되는 함수 및 호출 순서는 아래와 같습니다. 

1) <strong>cunstructor()</strong> : Component 생성자로 가장 먼저 호출

2) static getDerivedStateFromProps() : 지금 수준에서 몰라도 됨

3) <strong>render()</strong> : Rendering 하는 내용 작성

4) <strong>componentDidMount()</strong> : Rendering 후에 필요한 내용을 작성

# 3.2 updating
Component가 변경 될 때 호출 되는 함수 및 호출 순서

1) static getDerivedStateFromProps() : 지금 수준에서 몰라도 됨

2) shouldComponentUpdate() : Component 최적화내용 작성

3) <strong>render()</strong> : Rendering 하는 내용 작성

4) getSnapshotBeforeUpdate() : DOM 업데이트 하기 직전에 해야할 내용을 작성

5) <strong>componentDidUpdate()</strong> : Redering 후에 필요한 내용을 작성

# 3.3 unmounting
Component가 unmounting 될 떄 호출 되는 함수 및 호출 순서

1) <strong>componentWillUnmount()</strong> : 이벤트 제거 및 기타 사용자 코드 제거 내용 작성


# 3.4 (Mounting)Life Cycle을 사용한 예제
```js
//App Class
class App extends React.Component{
  state = {
    isLoading: true
  }
  componentDidMount(){
    setTimeout( () => {
      this.setState({isLoading:false});
    }, 6000)
  }
  render(){
    const { isLoading } = this.state;
    return <div>{ isLoading ? "Loading..." : "We are ready" }</div>;
  }
}
```

<strong>1) isLoading 은 true</strong>
```js
  state = { isLoading: true }
```
<strong>2) render함수에서 isLoading에 따라 화면 표시</strong>
```js
  render(){
    const { isLoading } = this.state;
    return <div>{ isLoading ? "Loading..." : "We are ready" }</div>;
  }
```

- isLoading 이 True 이면 "Loading..." 출력
- isLoading 이 false이면 "We are ready" 출력

<strong>3) componentDidMount() 함수를 이용한 rendering 이후 처리</strong>
```js
  componentDidMount(){
    setTimeout( () => {
      this.setState({isLoading:false});
    }, 6000)
  }
```

- componentDidMount() 는 render() 함수 이후에 실행됨
- 6초(6000ms) 후에 state의 isLoading을 false로 변경

<strong>4) setState가 실행되어 render() 가 다시 실행</strong>

- isLoading이 false로 변경되었기 때문에 "We are ready" 출력

<strong>5) 동작확인 </strong>
{{< img-post "/img/react/3/3_2.png" "" "center" >}}


감사합니다.