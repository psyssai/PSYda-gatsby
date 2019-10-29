---  
title: "[Pandas 기초]2.Pandas의 자료구조-Series"  
categories : "빅데이터분석/Pandas"  
date: "2019-08-15"  
tags: ["Pandas","DataFrame", "Series"]  
---

안녕하세요. PSYda 입니다.  
Pandas는 2개의 자료구조(**<span style = "color:red">Series</span>** , **<span style = "color:red">DataFrame</span>**)를 가지고 있습니다.  
Series는 1차원 데이터 구조, DataFrame은 2차원 데이터 구조를 나타냅니다.  
이번 포스팅에서는 [Series](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.html?highlight=series)에 대해 아래와 같은 내용을 알아볼 예정입니다.

<div id = "summary"> 
<ul>
    <li>Series 데이터의 <strong><span style = "color:red">생성</span></strong></li>
    <li>Series 데이터의 <strong><span style = "color:red">조회</span></strong></li>
    <li>Series <strong><span style = "color:red">산술 연산</span></strong></li>
    <li>Series <strong><span style = "color:red">통계</span></strong></li>
</div>  
  
    

# 1. Series

Series란?

- 1차원 데이터
- Index 와 Value 로 구성(Python의 사전데이터와 유사) </li>

먼저 Series 나 DataFrame을 사용하기 위해 Pandas 라이브러리를 import 해야합니다.(설치는 이전 블로그를 참고해주세요.)


```python
# pandas library import
import pandas as pd
from pandas import Series, DataFrame
```

## 1.1 Series 데이터 생성

- Python 자료형으로 생성가능(리스트, 튜플, 사전)
- numpy array 자료형으로 생성가능

### 1.1.1 리스트로 Series 생성


```python
data = pd.Series([1,2,3,4])
data
```




    0    1
    1    2
    2    3
    3    4
    dtype: int64



### 1.1.2 튜플로 Series 생성


```python
data = pd.Series((1,2,3,4))
data
```




    0    1
    1    2
    2    3
    3    4
    dtype: int64



### 1.1.3 numpy.array로 Series 생성


```python
import numpy as np
data = pd.Series(np.array([1,2,3,4]))
data
```




    0    1
    1    2
    2    3
    3    4
    dtype: int32



위의 3가지 방법으로 생성한 Series 를 보면, **<span style = "color:red">Value 값</span>**(1,2,3,4)과 **<span style = "color:red">index 값</span>**(0,1,2,3)으로 저장되는 것을 확인 할 수 있습니다.  
index를 key라고 한다면, key와 value로 이루어진 **<span style = "color:red">dict(사전) 타입과 비슷</span>**하다는 점을 알 수 있습니다.  
물론 아래와 같이 사전 타입으로도 생성이 가능합니다.

### 1.1.4 사전타입으로 Series 생성


```python
data = pd.Series({1:1, 2:2, 3:3 ,4:4})
data
```




    1    1
    2    2
    3    3
    4    4
    dtype: int64



1,2,3,4 라는 key값이 index로 저장되고 1,2,3,4 라는 데이터가 value로 저장되는 것을 확인 할 수 있습니다. method를 통해 index와 value 값을 따로 가져 올 수도 있습니다.


```python
# index 값 가져 오기
data.index
```




    Int64Index([1, 2, 3, 4], dtype='int64')




```python
# value 값 가져 오기
data.values
```




    array([1, 2, 3, 4], dtype=int64)



위의 결과들을 보면 "dtype = int64" 라는 구문을 볼 수 있습니다. int형 외에 다른 자료형들도 Series에 저장 될 수 있습니다.

### 1.1.5 여러 자료형으로 Series 생성


```python
data.dtypes
```




    dtype('int64')




```python
# 여러 자료형으로 Series 생성
data2 = Series(["pandas", "PSY", 34])
data2
```




    0    pandas
    1       PSY
    2        34
    dtype: object




```python
data2.dtypes
```




    dtype('O')



문자열을 포함한 숫자가 아닌 형태의 자료형이 Series에 저장되면 Object type으로 저장 되는 것을 확인 할 수 있습니다.

## 1.2 Series의 index

- 사전형으로 Series를 생성하면사전형의 key값이 index로 저장
- 사전형이 아닌 데이터로 Series 생성할 때 index를 명시적으로 입력 가능
- 입력값이 없다면 0부터 순서대로 번호를 부여  

### 1.2.1 Series 생성시에 Index명 입력


```python
data3 = Series(["토트넘", "손흥민" , 30], index = ["팀명","선수명","Goal수"])
data3
```




    팀명       토트넘
    선수명      손흥민
    Goal수     30
    dtype: object




```python
data3.index
```




    Index(['팀명', '선수명', 'Goal수'], dtype='object')



### 1.2.2 이미 생성되어 있는 Series의 index명 변경


```python
data3.index = ["도시명", "사는사람" , "나이"]
data3.index
```




    Index(['도시명', '사는사람', '나이'], dtype='object')



## 1.3 Series의 조회(색인)

Series의 데이터를 조회하는 기법에 대해 설명하기 위해 Series 하나를 만들어 보겠습니다.


```python
data4 = Series([1,2,3,4,5,6,7,8,9],index = ["서울","대전","대구","부산","광주","전주","충주","마산","성남"])
data4
```




    서울    1
    대전    2
    대구    3
    부산    4
    광주    5
    전주    6
    충주    7
    마산    8
    성남    9
    dtype: int64



### 1.3.1 index 기준으로 조회


```python
#서울 데이터 조회
data4.at["서울"]
```




    1




```python
#서울, 부산 데이터 조회
data4[["부산","서울"]]
```




    부산    4
    서울    1
    dtype: int64




```python
# 위에서 부터 2개 Data
data4[0:2]
```




    서울    1
    대전    2
    dtype: int64




```python
# 끝에서 3개 Data
data4[-3:]
```




    충주    7
    마산    8
    성남    9
    dtype: int64



### 1.3.2 index 조건 색인


```python
# 서울, 대전 ,대구 데이터 조회
# isin 함수에 인자에 해당하는 index 만 True값을 가지고, True값만 출력
data4[data4.index.isin(["서울","대전", "대구"])]
```




    서울    1
    대전    2
    대구    3
    dtype: int64



### 1.3.3 조건으로 조회


```python
# 3이상인 데이터만 조회하는 방법
# 1. 각 데이터가 3보다 큰지 확인
data4 > 3
```




    서울    False
    대전    False
    대구    False
    부산     True
    광주     True
    전주     True
    충주     True
    마산     True
    성남     True
    dtype: bool




```python
# 2. True 인 데이터만 조회
data4[ data4 > 3 ]
```




    부산    4
    광주    5
    전주    6
    충주    7
    마산    8
    성남    9
    dtype: int64



## 1.4 Series의 산술 연산 및 통계

### 1.4.1 상수와의 연산


```python
# data4의 모든 데이터에 10 더하기
data4 + 10
```




    서울    11
    대전    12
    대구    13
    부산    14
    광주    15
    전주    16
    충주    17
    마산    18
    성남    19
    dtype: int64




```python
# add 함수를 이용해 더하기
data4.add(10)
```




    서울    11
    대전    12
    대구    13
    부산    14
    광주    15
    전주    16
    충주    17
    마산    18
    성남    19
    dtype: int64



### 1.4.2 Series 끼리의 연산

- 두 Series의 같은 index 끼리 연산함
- 같은 index가 없을 경우 NaN으로 저장됨

연산을 위해 새로운 Series 생성


```python
data5 = Series([10,20,30],index = ["서울","대전","대구"])
data5
```




    서울    10
    대전    20
    대구    30
    dtype: int64




```python
data6 = data4 + data5
data6
```




    광주     NaN
    대구    33.0
    대전    22.0
    마산     NaN
    부산     NaN
    서울    11.0
    성남     NaN
    전주     NaN
    충주     NaN
    dtype: float64



위의 과정을 보면 Series끼리의 연산이 어떻게 동작되는지 알 수 있습니다.  
첫 번째로 두 Series의 **<span style = "color:red">Index명이 동일하면 연산을 수행</span>**합니다. 그 예시로 첫 번째 Series의 "서울", "대전", "대구" 의 데이터와 두 번째 Series의 "서울", "대전", "대구" 의 데이터가 합해지는 것을 볼 수 있습니다.  
두 번째 과정을 보면 두 Series에서 **<span style = "color:red">동일한 Index가 없는 경우 NaN</span>**이 됩니다.
NaN은 데이터가 없다는 뜻으로 타언어의 Null과 동일한 개념입니다.

## 1.5 NaN 데이터 처리

<ul>
    <li><strong><span style = "color:red">fill_value 옵션</span></strong> : NaN 데이터를 입력값으로 적용후에 함수 적용</li>
    <li><strong><span style = "color:red">fillna 함수</span></strong> : NaN값을 입력값으로 변경</li>
</ul>

add와 같은 산술연산함수를 적용할 때 fill_value 옵션을 적용하면 NaN이 발생할 경우 특정 값으로 대입할 수 있습니다.


```python
data4.add(data5, fill_value = 0)
```




    광주     5.0
    대구    33.0
    대전    22.0
    마산     8.0
    부산     4.0
    서울    11.0
    성남     9.0
    전주     6.0
    충주     7.0
    dtype: float64



Series에 NaN값이 있을 경우 fillna를 이용해 NaN을 입력값으로 변경할 수 있습니다.


```python
# fillna를 통해 NaN값을 특정값으로 할당
data6.fillna(0)
```




    광주     0.0
    대구    33.0
    대전    22.0
    마산     0.0
    부산     0.0
    서울    11.0
    성남     0.0
    전주     0.0
    충주     0.0
    dtype: float64



## 1.6 통계

<ul>
    <li><strong><span style = "color:red">describe 함수</span></strong> : 주요 통계 정보 보기</li>
    <li><strong><span style = "color:red">mean 함수</span></strong> : 평균 구하기</li>
    <li><strong><span style = "color:red">std 함수</span></strong> : 표준편차 구하기</li>
</ul>


```python
# 데이터 통계 정보 보기
data4.describe()
```




    count    9.000000
    mean     5.000000
    std      2.738613
    min      1.000000
    25%      3.000000
    50%      5.000000
    75%      7.000000
    max      9.000000
    dtype: float64




```python
# 평균 구하기
data4.mean()
```




    5.0




```python
# 표준 편차 구하기
data4.std()
```




    2.7386127875258306



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_1_Series.ipynb) Github에서도 확인 할 수 있습니다.  
다음 포스팅은 두 개의 DataFrame을 연결하는 Join 기법에 관한 내용입니다.  
감사합니다.
