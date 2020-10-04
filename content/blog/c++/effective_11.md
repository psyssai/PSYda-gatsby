---
title: "[Effective C++] 11. operator=에서는 자기대입에 대한 처리가 빠지지 않도록 하자"
category: "C++/EffectiveC++"
date: "2020-08-29"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. operator= 에서 자기대입에 대한 처리를 반드시 하자
   - 일치성 검사를 통해 자기대입일 경우 처리하지 않도록 하는 방법
   - 본래의 사본을 만들어 할당받는 방법
   - 사본을 swap하는 방법

# 1. 자기 대입의 예시

1. 자기 대입이란?
   - 어떤 객체가 자기 자신에 대해 대입연산자를 적용하는 것

```cpp
class widget{...};
Widget w;
w = w;
```

2. 배열 또는 컨테이너 순환 중 자기 대입

   - i와 j가 같다면 자기 대입

```cpp
a[i] = a[j];
```

3. 중복 참조로 인해 자기 대입 발생
   - 중복 참조 : 여러 곳에서 하나의 객체를 참조하는 상태
   - px와 py가 가리키는 대상이 같으면 자기 대입

```cpp
*px = *py;
```

# 2. 자기 대입 문제

1. 정상적인 경우
   - 대입 연산 시 기존의 pb 포인터 삭제
   - rhs의 pb포인터 값을 재할당 및 복사함
2. 자기 대입일 경우
   - 대입 연산시 기존의 pb포인터 삭제
   - rhs의 pb포인터도 삭제되어 버림
   - 대입 후에 비어 있는 Bitmap이 할당됨

```cpp
class Bitmap{...};
class Widget{
public:
   Widget& operator=(const Widget& rhs);
private:
   Bitmap *pb;
};
Widget& Widget::operator=(const Widget& rhs){
   delete pb;
   pb = new Bitmap(*rhs.pb);
   return *this;
}
```

# 3. 해결 방법

1. 대입 연산자에서 일치성 검사 수행
   - 자기 대입이 일어나는 경우는 극히 적음
   - 하지만 대입할 때 마다 일치성 검사를 하므로 효율 떨어짐
   - 또한 new 단계에서 예외 발생 시 삭제된 pb만 남음

```cpp
Widget& Widget::operator=(const Widget& rhs){
   if (this == &rhs) return *this; // 일치성 검사 수행
   // 이후 과정 동일
   delete pb;
   pb = new Bitmap(*rhs.pb);
   return *this;
}
```

2. 삭제 전에 본래의 pb를 복제
   - new 단계에서 예외 발생해도 pb 유지 가능
   - 복제를 통해 자기 대입에 대한 방어도 가능함

```cpp
Widget& Widget::operator=(const Widget& rhs){
   Bitmap *pOrig = pb; // 원래 pb를 복제
   pb = new Bitmap(*rhs.pb);  // rhs의 pb를 대입
   delete pOrig;  // 원래 pb를 삭제
   return *this;
}
```

3. 복사 후 바꾸기 방법(copy and swap)
   - 예외 안정성과 자기대입 안정성을 동시에 가진 operator= 구현 방법
   - [29 항목](../effective_29)에서 확인
   - 방법 1과 같이 rhs 사본을 만들어 swap하는 방법
   - 방법 2와 같이 값에 의한 전달 시 사본이 만들어지는 특징을 살려 바로 swap하는 방법

```cpp
class Widget{
   void swap(Widget& rhs);
};

// 방법 1.
Widget& Widget::operator=(const Widget& rhs){
   Widget temp(rhs); // rhs 사본 만듬
   swap(temp); // *this를 사본과 맞바꿈
   return *this;
}

// 방법 2. 항목 20 참고
Widget& Widget::operator=(Widget rhs){
   swap(rhs);
   return *this;
}
```

# 참고

1. Effective C++
