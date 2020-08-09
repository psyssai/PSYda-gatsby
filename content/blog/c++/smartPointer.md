---
title: "[C++]스마트 포인터"
category: "C++"
date: "2020-03-13"
tags: ["C++", "스마트 포인터"]
---

# 1. 스마트 포인터란?

1. 스택의 포인터 변수가 없어질 때 자동 메모리 해제
2. 종류
   - unique_ptr
   - shared_ptr
   - weak_ptr

# 2.unique_ptr

1. exclusive ownership
   - 한 오브젝트에 하나의 포인터만 허용함
2. 생성 방법

```cpp
unique_ptr<Cat> catPtr = make_unique<Cat>()
```

3. std::move를 통해 소유권 이전 가능

```cpp
unique_ptr<Cat> catPtr1 = move(CatPtr)
```

4. 주로 멤버 변수가 포인터일 경우 사용

# 3. shared_ptr

1. Shared ownership
   - 한 오브젝트에 여러 포인터 가능함
2. Reference count를 계산하여, 아무도 가리키지 않을 때 자동으로 메모리 해제
3. 생성 방법

```cpp
shared_ptr<Cat> catPtr = make_shared<Cat>()
```

4. 원형 참조가 있으면 여전히 메모리 릭 발생 가능
   ![원형 참조](./img/smarpointer_1.jpg)

# 4. weak_ptr

1. 참조하여도 reference count가 증가되지 않음
