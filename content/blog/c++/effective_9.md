---
title: "[Effective C++] 9. 객체 생성 및 소멸 과정 중에는 절대로 가상 함수를 호출하지 말자"
category: "C++/EffectiveC++"
date: "2020-08-25"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 생성 소멸 과정 중에는 가상 함수를 호출 하지 말자!

# 1. 생성/소멸 중 가상 함수를 호출하면 안되는 이유

1. BuyTransaction 객체 생성 시 생성자 호출 순서
   - 기본 클래스 생성자 호출 => 파생 클래스 생성자 호출
2. 기본 클래스 생성자 호출 시점에 객체 타입은 기본 클래스!
   - 호출 되는 가상 함수는 모두 기본 클래스 타입으로 결정됨
   - 런타임 타입 정보 사용 요소(dynamic_cast, typeid 등) 사용 시에도 기본 클래스 타입으로 취급
3. 마찬가지로 소멸자에 대해
   - 파생 클래스 소멸자 호출 => 기본 클래스 소멸자 호출
   - 기본 클래스 소멸자 호출 시점에 객체 타입은 기본 클래스
4. 기본 클래스 타입인 이유
   - 기본 클래스가 생성되는 시점에 파생 클래스 데이터는 미초기화 된 상태
   - 만약 기본 클래스에서 파생 클래스 함수를 호출 할 수 있다면, 미초기화된 데이터 사용 가능함
   - 따라서 C++에서 이런 실수를 하지 못하도록 막음
5. 결론적으로
   - Transaction 생성자에서 호출되는 logTransaction 함수는 BuyTransaction 것이 아니라, Transaction의 것이 호출됨

```cpp
// 주식 거래 기본 클래스
class Transaction{
public:
   Transaction();
   // 로그 타입에 따라 달라지는 로그 기록을 만들기 위해 virtual 함수 정의
   virtual void logTransaction() const = 0;
}

Transaction::Transaction(){
   logTransaction(); // 로깅하기 시작함
}

// 주식 거래 매수 클래스
class BuyTransaction : public Transaction{
public:
   virtual void logTransaction() const;
}

// 주식 거래 매도 클래스
class SellTransaction : public Transaction{
public:
   virtual void logTransaction() const;
}

// 사용
BuyTransaction b;
```

6. 위의 예시는 상대적으로 발견 쉬움

   - 소멸자에 가상함수가 있는 경우 경고 메시지를 주는 컴파일러도 있음
   - Transaction의 logtTransaction함수가 순수가상 함수이기 때문에 링킹 에러 발생

7. 아래와 같은 형태면 발견 어려움
   - 만약 여러 생성자로 인해 공통 작업을 별도 함수로 정의
   - 해당 함수에서 가상함수 호출
   - 컴파일러에서 오류를 알 수 없음

```cpp
class Transaction {
public:
   Transaction(){
      init();
   }
   virtual void logTransaction() const = 0;
private:
   void init(){
      logTransaction();
   }
}
```

# 2. 해결 방법

1. 가상 함수를 비가상함수로 변환
   - 가상 함수이면, 각 객체에 맞게 정보를 알 수 있다.
   - 하지만 비가상함수로 변경되면서 필요한 정보를 전달 받아야함
2. 파생 클래스 생성자로부터 필요한 정보를 기본 클래스 생성자가 전달받아야 함
   - logInfo 정보를 전달 받아 각 타입에 맞게 logTransaction 함수를 수행함
3. logInfo를 만들어 주는 createLogString static 함수 생성
   - 기본 클래스 생성자 쪽으로 넘길 값을 생성하는 용도
   - 멤버 초기화 리스트가 많은 경우 편리함
   - static 멤버이기 때문에 미초기화된 BuyTransaction 데이터를 건드릴 위험이 없다.

```cpp
class Transaction {
public:
   explicit Transaction(const std::string& logInfo);
   void logTransaction(const std::string& logInfo) const;
}

Transaction::Transaction(const std::string& logInfo){
   logTransaction(logInfo);
};

class BuyTransaction: public Transaction{
public:
   BuyTransaction( params )
      : Transaction(CreateLogString(params)) {}
private:
   static std::string createLogString(parmas);
};
```

# 참고

1. Effective C++
