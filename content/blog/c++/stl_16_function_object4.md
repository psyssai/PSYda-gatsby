---
title: "[STL-16] 함수 객체 - 함수 어댑터"
category: "C++/STL"
date: "2020-07-15"
tags: ["C++", "STL", "function obejct", "함수 객체"]
---

# 1. 바인더

1. 이항 함수자를 단항 함수자로 변환
2. STL은 두 가지 바인더 제공
   - bind1st : 첫번 째 인자 고정
   - bind2nd : 두번 째 인자 고정
3. 예제
   - less 첫 번째 인자를 10으로 고정

```cpp
   // less의 첫 인자를 10으로 고정한 binder
   binder1st<less<int>> binder = bind1st(less<int>(), 10);
   binder(5); // => less<int>()(10,5) 와 동일

   // 임시 객체로 사용
   bind1st(less<int>(), 10)(5);
```

4. c++11 에서 비추 , c++17 에서 삭제됨
   - std::bind를 대신 사용하자.

# 2. 부정자(negator)

1. 조건자를 반대의 조건자로 변환
2. STL은 두 가지 부정자 제공
   - not1 : 단항 조건자를 변환
   - not2 : 이항 조건자를 변환
3. 예제
   - less 조건자를 반대 조건자로 변환

```cpp
less<int> oLess;
binary_negate<less<int>> negate = not2(less<int>());
// 아래 세 방법은 모두 동일
negate(5, 10);
not2(oLess)(5,10);
not2(less<int>())(5, 10);
// 5 < 10 의 반대는 5 => 10 이므로 false
```

# 3. 함수 포인터 어댑터

1. 일반 함수를 어댑터 적용 가능한 함수 객체로 변환
   - 일반 함수는 STL 어댑터에 적용 안됨
   - 어댑터에 적용 가능한 함수 객체로 변환
2. STL은 아래 함수 포인터 어댑터 제공
   - ptr_fun()
3. 사용 예시
   - 사용자 정의 함수를 변환

```cpp
bool Pred(int n){
   return 30 <= n && n <= 40;
}

vector<int> v = {10,20,30,40,50};
//30이상 40이하의 원소 개수 => 2
count_if(
   v.begin(),
   v.end(),
   Pred);

// 30이상 40이하가 아닌 원소 개수 => 3
count_if(
   v.begin(),
   v.end(),
   not1(ptr_fun(Pred)));

```

4. 사용자 정의 ptr_fun 구현

```cpp
template<typename RType, typename AType>
class Ptr_fun_class:public unary_function<AType, RType>{
   RType (*pf)(AType);
public:
   Ptr_fun_class(RType (*_pf)(AType))
      : pf(_pf) {}
   RType operator()(AType n) const{
      return pf(n);
   }
}

// 일반 함수를 함수 객체로 변환하는 Ptr_fun() 함수
template<typename RType, typename Atype>
Ptr_func_class<RType,AType> Ptr_fun(
   RType (*pf)(Atype) {
      return Ptr_fun_class<Rtpye, AType>(pf);
   }
)
```

# 4. 멤버 함수 포인터 어댑터

1. 멤버 함수를 함수 객체로 변환
2. 알고리즘이 객체 원소의 멤버 함수 호출 가능
3. STL은 두 가지 멤버 함수 포인터 어댑터 제공
   - mem_fun_ref() : 객체로 멤버 함수 호출
   - mem_fun() : 객체의 주소로 멤버 함수 호출
4. mem_fun_ref() 예시

```cpp
vector<Point> v;
v.push_back(Point(1,1));
v.push_back(Point(2,2));
v.push_back(Point(3,3));
v.push_back(Point(4,4));
v.push_back(Point(5,5));

// 멤버 함수 호출 불가능
for_each(
   v.begin(), v.end(),
   &Point::Print);

// 멤버 함수 호출 가능
for_each(
   v.begin(), v.end(),
   mem_fun_ref(&Point::Print));
```

5. 사용자 정의 Mem_fun_ref 예시

```cpp
template<typename RType, typename CType>
class Mem_fun_ref_class:public unary_function<CType, RType>{
   RType (CType::*pf)() const;
public:
   Mem_fun_ref_class(RType (CType::*_pf)() const)
      : pf(_pf) {}
   RType operator()(const CType& o) const{
      return (o.*pf)();
   }
}

// 어댑터 함수 : 멤버 함수를 주소를 저장하는 함수 객체로 반환
template<typename RType, typename CType>
Mem_fun_ref_class<RType, CType> Mem_fun_ref(
   RType (CType::*pf() const){
      return Mem_fun_ref_class<RType,CType>(pf);
   }
)

```

6. mem_fun() 어댑터 예시
   - 원소가 객체의 주소 일 때 사용

```cpp
vector<Point*> v;
v.push_back(new Point(1,1));
v.push_back(new Point(2,2));
v.push_back(new Point(3,3));
v.push_back(new Point(4,4));
v.push_back(new Point(5,5));

for_each(
   v.begin(),
   v.end(),
   mem_fun(&Point::Print)
);
```

# 참고

1. 뇌를 자극하는 C++ STL
