---
title: "[STL-09] 알고리즘4-변경 알고리즘"
category: "C++/STL"
date: "2020-06-20"
tags: ["C++", "STL", "algorithm"]
---

# 0. 변경 알고리즘

1. 순차열 원소의 '순서'를 변경하는 알고리즘
   - 순차열의 원소를 교환
   - 순차열의 원소를 이동

# 1. 변경 알고리즘 리스트

| 알고리즘                     | 설명                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| bool=next_permutation(b,e)   | 구간 [b,e)의 순차열을 사전순 다음 순열이 되게 함. 더 이상 다음 순열이 없는 마지막 순열이라면 bool은 false                         |
| bool=next_permutation(b,e,f) | 구간 [b,e)의 순차열을 사전순 다음 순열이 되게 함. 비교에 f를 사용. 더 이상 다음 순열이 없는 마지막 순열이라면 bool은 false를 반환 |
| bool=prev_permutation(b,e)   | 구간 [b,e)의 순차열을 사전순 이전 순열이 되게 함. 더 이상 이전 순열이 없는 첫 순열이라면 bool은 false를 반환                      |
| bool=prev_permutation(b,e,f) | 구간 [b,e)의 순차열을 사전순 이전 순열이 되게 함. 비교에 f를 사용. 더 이상 이전 순열이 없는 첫 순열이라면 bool은 false            |
| p=partition(b,e,f)           | 구간 [b,e)의 순차열 중 f(\*p)가 참인 원소는 [b,p)의 순차열에 거짓인 원소는 [p,e)의 순차열로 분류                                  |
| random_shuffle(b,e)          | 구간 [b,e)의 순차열을 랜덤(기본 랜덤기)로 뒤섞음                                                                                  |
| random_shuffle(b,e,f)        | 구간 [b,e)의 순차열을 f를 랜덤기로 사용하여 뒤섞음                                                                                |
| reverse(b,e)                 | 구간 [b,e)의 순차열을 뒤집음                                                                                                      |
| p=reverse_copy(b,e,t)        | 구간 [b,e) 순차열을 뒤집어 목적지 순차열 [t,p)에 복사함                                                                           |
| rotate(b,m,e)                | 구간 [b,e)의 순차열을 왼쪽으로 회전. 첫 원소와 마지막 원소가 연결된 것 처럼 모든 원소가 왼쪽으로 (m-b) 만큼 이동                  |
| p=rotate_copy(b,m,e,t)       | 구간 [b,e)의 순차열을 회전하여 목적지 순차열 [t,p)에 복사                                                                         |
| stable_partition(b,e,f)      | partition() 알고리즘과 같고 원소의 상대적인 순서를 유지함                                                                         |

# 2. 상세 예시

1. next_permutation(b,e)
   - 예시) v = 10,20,30
   - 6가지 순열을 만듦

```cpp
vector<int> v = {10,20,30}
while(next_permutation(v.begin(), v.end())){
// 1. v = {10, 30, 20} , b = true
// 2. v = {20, 10, 30} , b = true
// 3. v = {20, 30, 10} , b = true
// 4. v = {30, 10, 20} , b = true
// 5. v = {30, 20, 10} , b = true
// 6. v = {10, 20, 30} , b = false
}
```

2. next_permutation(b,e,f)
   - 이항 조건자 f를 기준으로 순열 만듦

```cpp
bool Pred(const Point& left, const Point& right){
   return left.getY() < right.getY();
}  // Point의 y좌표가 오른쪽이 더 크면 true

vector<Point> v;
v.push_back(Point(5,1));
v.push_back(Point(7,2));
v.push_back(Point(5,3));

while(next_permutation(v.begin(), v.end(), Pred)){
   // 1. v = {(5,1), (5,3), (7,2)}, b = true
   // 2. v = {(7,2), (5,1), (5,3)}, b = true
   // 3. v = {(7,2), (5,3), (5,1)}, b = true
   // 4. v = {(5,3), (5,1), (7,2)}, b = true
   // 5. v = {(5,3), (7,2), (5,1)}, b = true
   // 6. v = {(5,1), (7,2), (5,3)}, b = false
}
```

3. partition(b,e,f)
   - 순차열의 원소를 특정 조건에 따라 분류
   - 원리 : quick sort 에서 pivot 값을 기준으로 큰값과 작은값을 분류하듯 분류함
   - 30,40,50,10,20,60 => 30 그대로
   - 30,20,50,10,40,60 => 40,20 교환
   - 30,20,10,50,40,60 => 50,10 교환

```cpp
bool Pred(int n){
   return n < 40;
} // 40 작으면 참

// 1. partition
vector<int> v = {30,40,50,10,20,60};
auto iter = partition(v.begin(), v.end(), Pred);
// v = 30,20,10,50,40,60
// iter -1 => 10을 가리킴
// [begin,iter) => {30,20,10}
// [iter,end) => {50,40,60}

// 2.stable_partition
vector<int> v2 = {30,40,50,10,20,60};
iter = stable_partition(v2.begin(), v2.end(), Pred);
// v = 30,10,20,40,50,60
// iter -1 => 20을 가리킴
// [begin,iter) => {30,10,20}
// [iter,end) => {40,50,60}
```

4. stable_partition(b,e,f)

   - partition와의 차이
   - => 원소의 상대적인 순서를 변경안함
   - 위의 예제 참고
   - 원리
   - 30,40,50,10,20,60 => 30 그대로
   - 30,10,50,40,20,60 => 40, 10 교환
   - 30,10,20,40,50,60 => 50, 20 교환

5. random_suffle(b,e)
   - 구간 [b,e)의 순차열을 랜덤으로 섞음
   - 초기화는 \<cstdlib\> 헤더의 srand() 사용

```cpp
vector<int> v = {10,20,30,40,50};
random_shuffle(v.begin(), v.end());
// {50,20,40,30,10} : 랜덤으로 값 뒤섞임
```

6. reverse(b,e)
   - 구간 [b,e)의 원소를 뒤집는다.

```cpp
vector<int> v = {10,20,30,40,50};
reverse(v.begin(), v.end());
// v = {50,40,30,20,10}
```

7. reverse_copy(b,e,t)
   - 뒤집은 순차열을 구간 [t,p)에 저장

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);
auto iter = reverse_copy(v1.begin(), v1.end(), v2.begin());
// v2 = {50,40,30,20,10}
// iter - 1 => 10을 가리킴
```

8. rotate(b,m,e)
   - 순차열을 회전
   - m 이 begin이 되고, (m-b) 만큼 이동함

```cpp
vector<int> v = {10,20,30,40,50};

rotate(v.begin(), v.begin() + 2, v.end());
// v = {30,40,50,10,20} : 2만큼 회전
```

9. rotate_copy(b,m,e,t)
   - 순차열을 회전하여 [t,p)에 복사

```cpp
vector<int> v1 = {10,20,30,40,50};
vector<int> v2(5);
auto iter = rotate_copy(v1.begin(), v1.begin() + 2, v1.end(), v2.begin());
//v2 = {30,40,50,10,20}
```

# 참고

뇌를 자극하는 C++ STL
