---
title: "[Effective C++] 2. #define을 쓰려거든 const, enum, inline을 떠올리자"
category: "C++/EffectiveC++"
date: "2020-08-05"
tags: ["C++", "Effective C++"]
---

# 0. 제목의 뜻

1. 가급적 선행 처리자보다 컴파일러를 더 가까이 하자!

# 1. #difine을 쓰면 안되는 이유

```cpp
#define ASPECT_RATIO 1.653
```

1. ASPECT_RATIO는 컴파일 되기 전에 1.653이라는 숫자로 변경됨
2. 따라서 컴파일러는 ASPECT_RATIO를 모름
   - 컴파일러가 쓰는 기호 테이블에 포함안됨
3. 매크로 변경 지점에서 컴파일 에러 발생 시 디버깅 어려움
4. 클래스 상수를 #define으로 만들 수 없다.
   - 캡슐화가 안되고, private 성격의 #define은 없다.

# 2. 상수를 써서 해결 하라!

```cpp
const double AspectRatio = 1.653;
```

1. AspectRatio는 컴파일러가 알고 있음
2. 컴파일을 거친 최종 코드 크기가 #define 썻을 때 보다 작음
   - 상수가 부동소수점 실수 타입일 경우
   - 매크로를 쓰면 ASPECT_RATIO가 모두 1.653으로 변경되지만
   - 상수 AspectRatio는 사본이 한개만 존재

# 3. #define을 상수로 교체할 때 주의할 점

1. 상수 포인터를 정의하는 경우
   - 상수 정의는 헤더 파일에 넣는 것이 상례
   - 포인터와 가리키는 대상 모두 const로 선언

```cpp
// 문자열 포인터로 정의하는 경우
const char* const authorName = "Scott Meyers";
// string으로 정의하는 경우
const std::string authorName("Scott Meyers");
```

2. 클래스 멤버로 상수(클래스 상수)를 정의하는 경우
   - 정적 멤버(static)로 생성

```cpp
class GamePlayer {
private:
    static const int NumTurns = 5;
    int scores[NumTurns];
};

//1. 여기서 NumTurns는 '선언' 된것이다. '정의'가 아님에 주의
//2. 만약 별도의 정의가 필요할 경우 정의 제공 필요
const int GamePlayer::Numturns;
//3. 클래스 상수 정의는 헤더파일에 두지 않고 구현파일에 둔다.
//    - 클래스 상수의 초기값은 선언 시점에서 주어지기 때문
```

3. 컴파일이 위의 문법을 허용하지 않을 때
   - 오래된 컴파일러에서 발생
   - 정적 클래스 멤버가 선언될 때 초기값 설정 허용 안함
   - 이 경우 초기값을 상수 정의 시점에 준다.

```cpp
//헤더 파일에 둔다.
class CostEstimate {
private:
    static const double FudgeFactor; // 정의
};

//구현 파일에 둔다.
const double CostEstimate::FudgeFactor = 1.35; // 선언
```

4. 클래스를 컴파일 시 클래스 상수값이 필요한 경우
   - 예)GamePlayer::scores 배열 멤버 선언 필요 시
   - enum hack 기법 사용

```cpp
class gamePlayer{
private:
   enum { NumTurns = 5};
   int scores[NumTurns];
}

```

5. enum hack(나열자 둔갑술)
   - const보다는 #define에 가까움
   - const의 주소는 알 수 있지만, enum의 주소는 취할 수 없다.
   - 선언한 정수 상수의 주소를 다른 사람이 알 수 없게 하려면 enum을 써라!

# 4. 매크로 함수

1. 매크로 함수의 단점
   - 매크로 인자 마다 반드시 괄호를 씌워야함
   - 괄호가 있어도 예상 불가한 현상 발생 가능(아래 예시 참고)

```cpp
#define CALL_WITH_MAX(a,b) f((a) > (B) ? (a) : (b))

int a = 5, b = 0;
CALL_WITH_MAX(++a, b);
// a가 두번 증가함
// 비교할 때 (a)에서 한번, 참인 경우 (a)에서 한번
CALL_WITH_MAX(++a, b+10);
// a가 한번 증가함
```

2. inline 함수를 이용해 해결
   - 괄호를 매번 쓰지 않아도 되고, 인자가 여러번 평가되지 않음
   - callWithMax는 진짜 함수이기 때문에 유효 범위 및 접근 규칙을 그대로 따라감

```cpp
template<typename T>
inline void callWithMax(const T& a, const T& b){
   f(a > b ? a : b);
}
```

# 참고

1. Effective C++
