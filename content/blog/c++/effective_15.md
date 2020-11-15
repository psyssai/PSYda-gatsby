---
title: "[Effective C++] 15. 자원 관리 클래스에서 관리되는 자원은 외부에서 접근할 수 있도록 하자"
category: "C++/EffectiveC++"
date: "2020-09-06"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. RAII 클래스가 관리하는 실제 자원을 반환하는 방법을 고민하자!
2. 명시적으로 자원을 반환하자
   - 별도 함수 또는 연산자 오버로딩을 통해 자원을 반환
3. 암시적으로 자원을 반환하자
   - 형변환 연산자 오버로딩을 통해 자원을 반환

# 1. RAII클래스가 관리하는 실제 자원을 반환하는 방법 필요

1. 아래 예제에서 pInv는 shared_ptr 자료형이기 때문에 dayHeld에 인자로 사용 못함
2. pInv에서 관리하는 실제 자원을 반환해야 사용가능하다!

```cpp
int dayHeld(const Investment *pi); // 투자 이후 경과일 수
std::shared_ptr<Invesment> pInv(createInvestment()); // 자원 획득

int days = dayHeld(pInv) // => 실패!!
```

# 2. 자원을 반환하는 방법

1. 명시적 변환(explicit conversion) 방법
   - 별도 함수(get)을 통해 자원을 반환 하자!
   - operator 오버로딩(->, \* 등)을 통해 자원을 반환하자

```cpp
// 1. 함수를 통해 자원 반환
int days = dayHeld(pInv.get());

// 2. 연산자 오버로딩을 통해 자원 반환
class Invesment{
public:
  bool isTaxFree() const;
}

// 2.1 -> 연산자 오버로딩
Investment* createInvestment();
std::shared_ptr<Investment> pi1(createInvestment());
bool taxable1 = !(pi1->isTaxFree());

// 2.2 * 연산자 오버로딩
std::shared_ptr<Invetsment> pi2(createInvestment();
bool taxable2 = !((*pi2).isTaxFree());
```

2. 암시적 변환(implicit conversion) 방법
   - 암시적 형변환 oeprator를 통해 자원을 반환!

```cpp
// C-API
FontHandle getFont();
void releaseFont(FontHandle fh);

// RAII  클래스
class Font{
public:
  explicit Font(FontHandle fh) : f(fh) {}
  ~Font() { releaseFont(f)}; }

  // 암시적 변환 함수(형 변환)
  operator FontHandle() const { return f; }
private:
  FontHandle f;
};

// 함수
void changeFontSize(FontHandle f , int newSize);

// 암시적 변환 사용
Font f(getFont());
int newFontSize;
changeFontSize(f, newFontSize); // Font -> FontHandle로 암시적 변환 수행
```

# 참고

1. Effective C++
