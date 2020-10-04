---
title: "[Effective C++] 10. 대입 연산자는 *this의 참조자를 반환하게 하자"
category: "C++/EffectiveC++"
date: "2020-08-27"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 대입 연산자는 \*this 참조자를 반환!

# 1. C++ 기본 자료형의 대입 예시

1. x = y = z = 15
   - (z = 15) => z에 15가 대입
   - y = z => y에 z(15)가 대입
   - x = y => x에 y(15)가 대입
   - 결론적으로 x,y,z에 모두 15가 대입된다.

# 2. 사용자 정의 타입도 위의 예시가 가능하게 하자!

1. 대입 관련 연산자(=, +=, -=, \*=)
   - \*this를 return
   - 객체의 참조자를 반환

```cpp
class Widget{
public:
   Widget& operator=(const Widget& rhs){
      ...
      return *this;
   }
}

Widget a,b,c;
a = b = c; // (O) 가능함
```

# 참고

1. Effective C++
