---
title: "[Effective C++] 17. new로 생성한 객체를 스마트 포인터에 저장하는 코드는 별도의 한 문장으로 만들자"
category: "C++/EffectiveC++"
date: "2020-09-09"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. new로 생성한 객체를 스마트포인터에 저장하는 코드를 별도의 한 문장으로 만들자
   - shared_ptr<xxx> pw(new xxx);
2. 이유
   - new 실행과 해당 자원을 스마트포인터 생성자로 전달하는 사이에 예외 발생시 자원 누수 발생!

# 1. 문제 사항

1. 가정
   - 처리 우선 순위를 알려주는 함수 존재
   - 동적 할당한 Widget 객체에 대해 어떤 우선순위에 따라 처리를 적요하는 함수 존재

```cpp
int priority();
void processWidget(std::shared_ptr<Widget> pw, int priority);

// processWidget을 사용
processWidget(new Widget, proiority());
```

2. 위의 processWidget() 함수가 동작할까?
   - shared_ptr의 생성자는 explicit로 선언되어 있음
   - new Widget으로 만들어진 포인터가 shared_ptr 타입으로 암시적 변환이 되지 않음!
   - 아래와 같이 명시적으로 생성 후 호출하도록 변경

```cpp
processWidget(std::shared_ptr<Widget>(new Widget), priority());
```

3. 하지만 위의 문장은 자원이 누수될 가능성이 존재!
   - 위의 한 문장을 수행전 매개 변수 인자를 평가하는 순서 가짐
   - 본 예시에서는 3가지 단계를 거침
   - "new Widget" 을 실행 => shared_ptr 생성자를 호출 => priority() 함수 호출
   - 문제는 3개의 단계의 순서가 컴파일러 마다 다름!
4. 만약 호출 순서가 아래와 같고, priority 에서 예외가 발생했다면?
   - "new Widget" 실행
   - priority() 실행
   - shared_ptr 생성자 호출
5. new Widget으로 할당된 메모리가 해제되지 않아 누수 발생!

# 2. 해결 방법

1. Widget를 생성해서 RAII에 저장하는 코드를 별도 한 문장으로 만들자!
2. 그리고, 나머지 문장을 실행하자!

```cpp
std::shared_ptr<Widget> pw(new Widget);
processWidget(pw, priority());
```

# 참고

1. Effective C++
