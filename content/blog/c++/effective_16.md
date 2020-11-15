---
title: "[Effective C++] 16. new 및 delete를 사용할 때는 형태를 반드시 맞추자"
category: "C++/EffectiveC++"
date: "2020-09-08"
tags: ["C++", "Effective C++"]
---

# 0. 요약

1. new와 delete 형태를 맞추자
   - new 에 []를 썼으면 delete에 []를 쓰자
   - new 에 []를 안썼으면 delete에 []를 쓰지 말자

# 1. new, delete의 동작 순서

1. new
   - 메모리가 할당됨
   - 할당된 메모리에 한 개 이상의 생성자가 호출됨
2. delete

   - 할당된 메모리에 한 개 이상의 소멸자가 호출됨
   - 메모리가 해제됨

# 2. 객체 1개 vs 배열로 할당/해제

1. 한 개 객체 할당 시 메모리 구조
   - object
2. 객체 배열 할당 시 메모리 구조
   - 객체 수(n) - object - obejct - ...
   - 위의 구조로 delete 연산자가 몇 번 호출 될지 쉽게 알 수 있음
3. 주의 사항
   - delete 뒤에 [] 를 붙여줘야만 포인터가 배열을 가리키고 있다고 이해함
   - 만약 [] 가 없으면 단일 객체로 간주하고 1개의 객체만 delete 처리함

# 3. 결론

1. new 와 delete 형태를 맞추자
   - new 에 []를 썼으면 delete에 []를 쓰자
   - new 에 []를 안썼으면 delete에 []를 쓰지 말자
2. 배열 타입을 typedef으로 만들지 않도록 하자
   - string 또는 vector type을 활용하자!

# 참고

1. Effective C++
