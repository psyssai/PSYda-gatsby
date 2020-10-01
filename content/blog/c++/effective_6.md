---
title: "[Effective C++] 6. 컴파일러가 만들어낸 함수가 필요없으면 확실히 이들의 사용을 금해버리자."
category: "C++/EffectiveC++"
date: "2020-08-18"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 복사 생성자가 필요없으면 아래 방법을 사용하자
2. private로 복사 생성자 / 대입 연산자를 정의
3. 정의를 고의로 빼서 링킹 에러 발생
4. boost 의 noncopyable 클래스를 상속받아 구현

# 1. 소개

1. 부동산 클래스가 있다.

```cpp
class HomeForSale{...};
```

2. 모든 자산은 하나 밖에 없으니 객체 복사가 안되도록 하자

```cpp
HomeForSale h1;
HomeForSale h2;
HomeForSale h3(h1); // 이게 안되도록 하자!
h1 = h2; // 이것도 안되게 하자.
```

# 2. 객체 복사 막는 방법1(외부 호출 금지)

1. private로 복사 생성자/대입 연산자를 정의
   - 컴파일러가 자동생성을 하지 않는다.
   - 외부로부터 호출을 차단할 수 있다.
   - 하지만 그 클래스의 멤버 함수와 friend 함수가 호출 가능하다!

# 3. 객체 복사 막는 방법2(링킹 에러)

2. 정의를 안해버려서 링킹 에러를 발생 시키자
   - 사용자가 실수로 복사 생성자를 호출하면 링킹에러가 발생되어 방지 가능
   - c++의 iostream(ios_base, basic_ios, sentry)가 이렇게 구현됨

```cpp
class HomeForSale{
private:
   HomeForSale(const HomeForSale&)  // 선언만 있음
   HomeForSale& operator=(const HomeForSale&);
}
```

# 4. 객체 복사 막는 방법3(컴파일 에러)

3. 링킹에러도 싫다. 컴파일 에러를 발생하자!
   - 복사 생성자, 대입 연산자를 private로 하는 기본 클래스를 생성!
   - 기본 클래스를 private상속 받아 구현!
   - 복사를 시도하면 기본 클래스의 복사를 호출
   - 하지만 기본 클래스가 private이기 때문에 컴파일 에러 발생!
   - 부스트 라이브러리 noncopyable 클래스가 동일 내용!

```cpp
class Uncopyable{
protected:
   Uncopyable() {}
   ~Uncopyable(){}
private:
   Uncopyable(const Uncopyable&);
   Uncopyable& operator=(const Uncopyable&);
};

class HomeForSale: private Uncopable{...}
```

# 참고

1. Effective C++
