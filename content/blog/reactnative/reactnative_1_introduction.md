---
title: "[ReactNative]0.개요" 
category: "ReactNative"
date: "2019-11-09"
description: ""
---


안녕하세요. PSYda 입니다.

# 1.Requirements
1) node.js(v 10.0 이상)
2) npm(v 6.0 이상)
3) Simulator
    - Xcode : ios에서 App을 확인할 때 필요(MAC에서 설치)
    - android studio : android를 확인할 때 필요(Window에서 설치)
    - <strong>expo(android) or expo client(ios) 를 휴대폰에 설치</strong>

4) expo-cli 설치
```cmd
npm install -g expo-cli
```

# 2.Expo vs RN CLI
[React Native 공식 홈페이지](https://facebook.github.io/react-native/docs/getting-started)를 참고하면, 두 가지 방법(Expo CLI와 React Native CLI)으로 React Native를 시작할 수 있습니다.
# 2.1 Expo CLI
1) ios/android에서 실행 가능하도록 기본 Setting된 상태로 Project를 생성해주는 도구
2) native files을 제어하지 못함
    - expo에서 native files을 대신 관리
3) 효과적인 Test환경
    - 휴대폰에서 Simulation 및 Test 가능함
    - ios / andorid 앱을 Build 해줌
4) Expo에 의존적
    - expo에서 제공하는 기능들만 사용 가능함
5) 방대한 라이브러리
    - React Native에서 제공하는 라이브러리 보다 더 많은 라이브러리 제공

# 2.2 React Native CLI
1) React Native를 수동으로 작업하고 싶을 때 사용하는 도구(CLI)
2) native files을 더 많이 컨트롤 하고 싶을 때 사용
3) native 개발과 병행하여 개발 가능함
4) Setting 과정이 복잡함
5) 빌드환경 필요함
- ios를 빌드하기 위해서는 Mac 이 1필요함

# 3.Create the Project(using Expo)
# 3.1 React Native App Project 만들기
1) 터미널에서 expo init [프로젝트명] 입력
```cmd
expo init fokin-weather
```
2) 프로젝트 템플릿 선택
    - blank, blank(TypeScript), tabs 중에 선택
![Template 설정](./img/1_1.png)

3) 프로젝트 이름 설정
    - "name" 항목에 Project 이름 입력 후 엔터
![Project Name 설정](./img/1_2.png)

4) yarn 사용 여부 설정(y or n)
![yarn 사용 여부](./img/1_3.png)

5) 프로젝트 실행
    - 프로젝트 폴더로 이동
    - yarn start 입력

# 3.2 Project 구성
![Project 구성](./img/1_4.png)
1) package.json
2) babel.config.js
3) app.json
    - Expo가 읽게 될 application 설정 파일
4) App.js
    - React Component

# 3.3 휴대폰에서 App Test 하기
1) Android
    - Android 휴대폰에서 Expo app 실행
    - 실행된 Metro Bundler의 좌측 QR코드를 Expo app을 이용해 읽기

2) ios
    - ios 휴대폰에서 Expo app 로그인
    - 터미널에서 expo login 실행

# 4.Getting to know Expo

# 5.How does React Native Work?

감사합니다.