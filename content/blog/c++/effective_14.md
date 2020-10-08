---
title: "[Effective C++] 14. 자원 관리 클래스의 복사 동작에 대해 진지하게 고찰하자."
category: "C++/EffectiveC++"
date: "2020-09-05"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. 자원 관리 클래스(RAII 클래스) 만들 때 복사에 대해 고민하자.
2. 복사에 대한 선택지는 아래와 같다.
   - 복사를 금한다(Mutex)
   - 관리하는 자원의 참조 카운팅 수행(shared_ptr)
   - 관리하는 자원을 복사(string)
   - 관리하는 자원의 소유권을 이전(unique_ptr)

# 1.뮤텍스 관리 객체 예시

1. 뮤텍스 잠금을 관리하는 객체 구현

```cpp
class Lock{
public:
   explicit Lock(Mutex *pm) : mutexPtr(pm){
      lock(mutexPtr);
   }
   ~Lock(){
      unlock(mutexPtr);
   }
private:
   Mutex *mutexPtr;
}
```

2. 사용은 RAII 방식으로

```cpp
Mutex m;
{
   Lock m1(&m); // lock
} // 블록이 끝나면 unlock
```

3. 만약 Lock객체가 복사 된다면?
   - 사본이 의미가 없기 때문에 복사가 되면 안된다.

# 2. RAII 객체 복사 구현시 선택지

1. 복사를 금지(3.참고)
2. 관리하는 자원의 참조 카운팅 수행(4.참고)
3. 관리하는 자원을 복사함(5.참고)
4. 관리하는 자원의 소유권을 이전함(6.참고)

# 3. 복사를 금지

1. RAII 객체가 복사 되면 안되는 경우 금지
   - 위의 Mutex의 경우에서 사용
2. 복사 생성자를 금지
   - [6.컴파일러가 만들어낸 함수가 필요없으면 확실히 이들의 사용을 금해버리자.](../effective_6) 참고

# 4. 관리하는 자원의 참조 카운팅 수행

1. 자원을 사용중인 마지막 객체가 소멸될 때 까지 유지해야할 경우(shared_ptr의 경우) 사용
2. 방법
   - 복사 시에 자원을 참조하는 객체의 개수 카운트를 증가
   - 참조 객체 수가 0이되면 자원을 해제하도록 구현
3. shared_ptr을 이용하는 방법
   - 참조 카운팅 구현하려면 멤버 변수를 shared_ptr로 구현하면 됨
4. shared_ptr의 삭제자
   - 삭제자(deleter) : 참조 카운트가 0이 되었을 때 호출되는 함수 또는 함수 객체
   - shared_ptr은 삭제자 지정(변경)을 허용함
5. Mutex 예제에서 shared_ptr을 이용하도록 변경!
   - shard_ptr은 참조 개수가 0이 되면 가리키고 있던 대상을 삭제 하기 때문에 Mutex의 예 맞지 않음(Mutex는 다 썻을 때 잠금 해제만 하면 됨)
   - 이럴 때 shared_ptr의 삭제자를 사용하면 참조 객체가 0이 될 때 Mutex를 unlock하도록 구현할 수 있음

```cpp
class Lock{
public:
   explicit Lock(Mutex *pm)
      : mutexPtr(pm, unlock) // 삭제자로 unlock을 지정
   {
      lock(mutexPtr.get());
   }
private:
   shared_ptr<Mutex> mutexPtr;
}

Mutex m;
{
   Lock m1(&m); // lock
} // 블록이 끝나면 삭제자(unlock)가 호출
```

# 5. 관리하는 자원을 복사함

1. 복사가 필요할 경우 복사를 지원(string의 경우)
2. 이 때 반드시 깊은 복사를 수행해야함

# 6. 관리하는 자원의 소유권을 이전

1. 자원을 참조하는 RAII 객체를 딱 하나만 만들고 싶을 때 사용(unique_ptr의 경우)

# 참고

1. Effective C++
