---
title: "[STL]소개"
category: "C++/STL"
date: "2020-04-30"
tags: ["C++", "STL"]
---

# 1.컨테이너

1. 컨테이너 : 객체를 저장하는 객체

# 1.1 삽입 순서에 따른 분류

1. 표준 시퀀스 컨테이너 : 삽입 순서를 가지는 것
   - vector, deque, list 등
2. 표준 연관 컨테이너 : 삽입 순서 없이 자동 정렬
   - map, set, multiset, multimap 등

# 1.2 메모리 단위 저장에 따른 분류

1. 배열 기반 컨테이너 : 연속된 메모리에 저장
   - vector, deque
2. 노드 기반 컨테이너 : 각 메모리 단위에 저장
   - list, set, multiset, map, multimap

# 2.반복자

1. 반복자 : 컨테이너 원소를 순회하고 접근하는 방법
2. 특징
   - 컨테이너 원소를 가리킨다.
   - 다음 원소로 이동하고 모든 원소를 순회 가능
   - begin()과 end()로 시작과 끝을 가리킴

# 2.1 반복자의 범주

1. 입력 반복자
   - 현위치 원소를 한번만 읽는 반복자
   - ex)istream
2. 출력 반복자
   - 현위치 원소를 한번만 쓰는 반복자
   - ex)ostream
3. 순방향 반복자
   - 순반향으로 이동 가능한 반복자
4. 양방향 반복자
   - 순/역방향으로 이동 가능한 반복자
   - ex) list, set, map, multimap, multiset
5. 임의 접근 반복자
   - +, - , [] 연산이 가능한 반복자
   - ex) vector, deque

# 3. 알고리즘

1. 범주
   - 원소를 수정하지 않는 알고리즘
   - 원소를 수정하는 알고리즘
   - 제거 알고리즘
   - 변경 알고리즘
   - 정렬 알고리즘
   - 정렬된 범위 알고리즘
   - 수치 알고리즘

# 4. 함수 객체

1. operator()을 오버로딩한 객체

# 5. 어댑터

1. 구성요소의 인터페이스를 변경해 새로운 인터페이스를 갖는 요소로 변경
2. 컨테이너 어댑터
   - stack, queue, priority_queue
3. 반복자 어댑터

   - reverse_iterator, insert_iterator
   - back_insert_iterator, front_insert_iterator

4. 함수 어댑터
   - 바인더, 부정자, 함수 포인터 어댑터

# 6. 할당기

1. 메모리 할당 정보와 정책을 캡슐화 한 것

# 참고

뇌를 자극하는 C++ STL
