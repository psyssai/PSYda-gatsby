---
title: "[Effective C++] 5. C++가 은근슬쩍 만들어 호출해 버리는 함수들에 촉각을 세우자"
category: "C++/EffectiveC++"
date: "2020-08-15"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 컴파일러는 기본 생성자, 복사 생성자, 복사 대입 연산자, 소멸자를 암시적으로 만들 수 있다.

# 1. 컴파일러가 알아서 선언하는 멤버 함수

1. 빈클래스가 선언되어 있으면 컴파일러는 아래 멤버 함수를 자동으로 생성한다.
   - 복사 생성자(copy constructor)
   - 복사 대입 연산자(copy assignment operator)
   - 소멸자(destructor)
   - 기본 생성자 : 생성자가 없을 때 생성됨
2. 자동 생성된 함수는 public, inline함수이다.

```cpp
class Empty{};
// 위와 같이 선언하면 아래와 같다.
class Empty{
public:
   Empty() {...}                            // 기본 생성자
   Empty(const Empty& rhs) {...}            // 복사 생성자
   ~Empty() {...}                           // 소멸자
   Empty& operator=(const Empty& rhs) {...} // 복사 대입 연산자
}
```

3. 위 함수가 만들어지는 조건

   - Empty e1; => 기본 생성자, 소멸자 호출
   - Empty e2(e1); => 복사 생성자 호출
   - e2 = e1 => 복사 대입 연산자 호출

4. 소멸자

   - 상속한 기본 클래스의 소멸자가 가상이 아니면 비가상으로 생성됨

5. 복사 생성자 자동 생성
   - 아래 예는 복사 생성자가 자동 생성됨
   - string은 자체 복사생성자가 있으므로, no2의 nameValue는 no1의 nameValue값을 가짐
   - int형 no2의 objectValue는 no1의 비트를 그대로 복사해옴

```cpp
template<typename T>
class NamedObject{
public:
   NamedObject(const char* name, const T& value);
   NamedObject(const std::string& name, const T& value);
private:
   std::string nameValue;
   T objectValue;
};

// 사용 부
NamedObject<int> no1("Smallest Prime Number", 2);
NmaedObject<int> no2(no1); // 복사 생성자 자동 생성됨
```

6. 복사 대입 연산자가 생성되지 않는 예
   - 최종 결과 코드가 적법하지 않거나 resonable하지 않으면 자동 생성하지 않음
   - 아래 예시에서 자동생성되지 않고 컴파일 거부됨.
   - 참조자를 데이터 멤버로 가지고 있으면, 직접 복사 대입 연산자 정의 필요!

```cpp
template<class T>
class NamedObject{
public:
   NamedObject(std::string& name, const T& value);
private:
   std::string& nameValue; // 참조자
   const T objectValue;    // 상수 멤버
};

// 사용 부
std::string newDog("Persephone");
std::string oldDog("Satch");

NamedObject<int> p(newDog, 2);
NamedObject<int> s(oldDog, 36);

p = s;   // 가능한가?
```

# 참고

1. Effective C++
