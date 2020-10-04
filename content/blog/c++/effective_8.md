---
title: "[Effective C++] 8. 예외가 소멸자를 떠나지 못하도록 붙들어 놓자"
category: "C++/EffectiveC++"
date: "2020-08-23"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 소멸자에서 예외가 발생하지 않도록 하자!
   - 예외는 소멸자가 아닌 함수에서 처리하도록 하자!
2. 소멸자에서 호출되는 함수가 예외 가능성이 있다면..
   - 소멸자에서 삼켜버리던지, 프로그램을 종료하던지 처리 필요

# 1. 소멸자에 예외가 있으면 안되는 이유

1. Widget 객체를 담는 10 크기를 갖는 벡터 v 예시
   - 함수 사용 후 10개 만큼 메모리가 해제됨
   - 만약 1번째 Widget에서 예외가 발생했다면??
   - 2~10번째 Widget의 메모리가 누수됨!

```cpp
void doSomething(){
   std::vector<Widget> v;
} // 여기서 v는 메모리가 삭제됨
```

2. DBConnection 객체 예시
   - DBConnection은 create 함수와 close 함수를 제공
   - DBConn은 소멸자에서 DBConnection의 close 함수 호출
   - 만약 close하면서 예외가 발생했다면???
   - 예외가 전판되어 소멸자에서 예외가 나가도록 내버려 두게됨!

```cpp
// DB 연결을 담당하는 클래스
class DBConnection{
public:
   static DBConnection create();
   void close();
}

// DBConnection 객체를 관리하는 클래스
class DBConn{
public:
   ~DBConn(){
      db.close(); // DBConnection 객체 db의 close함수 호출
   }
private:
   DBConnection db;
}

void doSomeThing{
   vector<DBConn> vecDbc;
   vecDbc.push(DBConnection::create());
   vecDbc.push(DBConnection::create());
}// vecDbc 메모리가 해제됨
```

# 2. 해결 방법

1. close에서 예외가 발생하면 프로그램을 바로 끝내라
   - 에러 발생 후에 프로그램 지속이 어려운 경우 괜찮은 선택

```cpp
DBConn::~DBConn(){
   try{
      db.close();
   } catch(...) {
      //close 호출 실패 로그 작성
      std::abort();
   }
}
```

2. close를 호출한 곳에서 일어난 예외를 삼켜라!(무시하라)
   - 예외를 무시한 뒤라도 프로그램이 신뢰성 있게 실행 될 수 있어야 함

```cpp
DBConn::~DBConn(){
   try{
      db.close();
   } catch(...){
      //close 호출 실패 로그만 작성
   }
}
```

3. close 호출 책임을 소멸자에서 사용자로 넘겨라!
   - DBConn에서 close 함수를 제공하여 예외 발생 시 사용자가 예외에 대해 대응!
   - 만약 닫히지 않았으면 소멸자에서 한번 더 닫을 수 있음
   - 소멸자에서 호출하는 close 마저 실패하면 '끝내거나, 삼키거나'를 선택해야함

```cpp
class DBConn {
public:
   void close(){
      db.close();
      closed = true;
   }
   ~DBConn(){
      if(!closed){
         try{
            db.close();
         } catch(...){
            //close 호출 실패 로그 작성
         }
      }
   }
private:
   DBConnection db;
   bool closed;
}
```

# 3. 해결 포인트

1. 예외는 소멸자가 아닌 다른 함수에서 비롯된 것이어야 한다!
   - 소멸자에 있다면 사용자는 예외에 대처할 기회가 없다.

# 참고

1. Effective C++
