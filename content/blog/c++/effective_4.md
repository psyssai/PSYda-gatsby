---
title: "[Effective C++] 4. 객체를 사용하기 전에 반드시 그 객체를 초기화하자"
category: "C++/EffectiveC++"
date: "2020-08-10"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 기본 제공 타입의 객체는 직접 초기화.
   - 경우에 따라 자동으로 되기도하고, 안되기도 함
2. 멤버 초기화리스트를 이용해 초기화하자!
   - 초기화리스트는 선언순서대로 하자!
3. 여러 번역 단위에 있는 비지역 정적 객체들의 초기화 순서문제는 피해서 설계하자!
   - 비지역 정적객체를 지역 정적객체로 바꾸면 됨!

# 1. 대입과 초기화의 차이

1. 아래는 초기화가 아니라 대입!!
   - 생성자 전에 초기화 되었고, 대입된다.

```cpp
ABEntry::ABEntry(const std::string& _name, const std::string& _address){
   this.theName = name;
   this.theAddress = address;
   this.numTimes = 0;
}
```

2. 아래가 초기화
   - 멤버 초기화 리스트 사용

```cpp
ABEntry::ABEntry(const std::string& _name, const std::string& _address)
   :theName(_name),
   theAddress(_address),
   numTimes(0)
{}
```

3. 초기화가 대입보다 더 효율적

   - 대입의 경우 초기화 후 바로 대입하므로, 앞의 초기화는 쓸모없는 행위가 됨

# 2. 초기화 규칙

1. 기본 제공 타입은 멤버 초기화 리스트에 넣는 쪽으로 습관을 들이자!
   - 매개 변수가 없더라도 0으로 초기화 하는 습관!
   - 특히 상수, 참조자 형태의 데이터 멤버는 반드시 초기화 필요!

```cpp
ABEntry::ABEntry()
   : theName(),
   theAddress(),
   numTimes(0)
```

# 3. 생성자가 많을 때 팁

1. 여러 생성자에서 초기화 리스트를 정의하면 불편함
2. private 멤버 함수 하나를 만들어 초기화 하고, 모든 생성자에서 이 함수를 호출
   - 데이터 초기값을 파일에서 읽거나,
   - 데이터베이스에서 찾아오는 경우에 유용하게 사용 가능
3. 하지만 이런 경우가 아니면 초기화 리스트가 효율적임

# 4. 초기화 순서

1. 기본 클래스는 파생 클래스보다 먼저 초기화
2. 클래스 데이터 멤버는 선언된 순서대로 초기화
   - 초기화 리스트에서 순서가 달라져도 선언 순서대로 초기화
   - 헷갈림 방지를 위해 초기화 리스트는 선언 순서와 맞추자!

# 5. 비지역 정적 객체의 초기화 순서

0. 비지역 정적 객체의 초기화 순서

   - 별개의 번역 단위에 정의된 비지역 정적 객체들의 초기화 순서는 '정해져 있지 않다'

1. 정적 객체란?

   - 생성된 시점부터 프로그램 끝날 때 까지 살아 있는 객체
   - 정적 객체는 프로그램이 끝날 때 자동으로 소멸됨
   - 아래 에서 4)를 지역 정적 객체, 4)를 제외한 나버지를 비지역 정적 객체라고 함

1. 정적 객체 종류

   - 1)전역 객체
   - 2)네임스페이스 유효범위에서 정의된 객체
   - 3)클래스 안에서 static으로 선언된 객체
   - 4)함수 안에서 static으로 선언된 객체
   - 5)파일 유효점위에서 static으로 정의된 객체

1. 번역 단위란?

   - 컴파일을 통해 하나의 목적파일을 만드는 바탕이 되는 소스 코드
   - 기본적으로는 소스파일 하나며, 그 파일이 #include하는 파일까지 합쳐서 하나의 번역 단위가 됨

1. 아래의 경우에 문제 발생

   - 별도로 컴파일된 소스 파일이 두 개 이상 있고,
   - 각 소스 파일에 비지역 정적 객체가 한 개 이상 있을 경우

1. 문제 발생 이유

   - 한쪽 번역 단위에 있는 비정적 객체가 초기화 되면서, 다른 쪽 번역 단위에 잇는 비지역 정적 객체를 사용하는데, 객체가 초기화 되어 있지 않을 수 있다!

1. 예제
   - tfs가 tempDir보다 먼저 초기화되어 있지 않으면, 에러 발생

```cpp
// 객체 선언부
class FileSystem{
public:
   std::size_t numDisks() const;
};

extern FileSystem tfs;

// 객체 사용부(다른 파일)
class Directory{
public:
   Directory(params);
};
Directory::Directory(params){
   std::size_t disks = tfs.numDisks();
}

// 실 사용부
Directory tempDir(params);
```

1. 해결 방법
   - tfs가 tempDir보다 먼저 초기화 되게는 할 수 없다.
   - 설계적인 방법(Singleton)으로 해결!!
   - 비지역 정적 객체를 하나씩 맡는 함수 선언
   - 그 함수에서 객체 참조자를 반환
   - 사용자 쪽에서는 함수호출을 하여 사용
   - 비지역 정적 객체가 지역 정적 객체로 변경됨!

```cpp
class FileSystem{...};
FileSystem& tfs(){
   static FileSystem fs;
   return fs;
}

class Directory{...};
Directory::Directory(params){
   std::size_t disks = tfs().numDisks();
}

Directory& tempDir(){
   static Directory td;
   return td;
}
```

# 참고

1. Effective C++
