---
title: "[Pandas 기초]9.Series와 DataFrmae에 함수 적용하기"   
categories: "빅데이터분석/Pandas"  
date: "2019-08-29"  
tags: ["apply","applymap","dataframe 함수적용", "map"]  
---

안녕하세요. PSYda입니다.

Series와 DataFrame을 다루다 보면 각각의 열/행 데이터에 함수를 일괄적으로 적용해야 할 때가 있습니다. 

이번 포스팅에서는 Series와 DataFrame의 요소에 함수를 적용하는 방법에 대해 알아보겠습니다.

소개할 내용은 아래와 같습니다.

<div id = "summary">
<ul>
<li>Series 각각 요소에 함수 일괄 적용(<strong><u><span style = "color:red">map함수</span></u></strong>) </li>
<li>DataFrame의 행, 열 별 함수 일괄 적용(<strong><u><span style = "color:red">apply함수</span></u></strong>)</li>
<li>DataFrame의 요소에 함수 일괄 적용(<strong><u><span style = "color:red">applymap함수</span></u></strong>)</li>
</ul>
</div>

# 8. Series와 DataFrame에 외부 함수 적용하기

- <strong><u>map</u></strong> 함수 : <strong>Series</strong>에서 사용하며 <strong>모든 요소</strong>에 함수 일괄 적용
- <strong><u>apply</u></strong> 함수 : <strong>DataFrame</strong>에서 사용하며 <strong>각각의 행 또는 열(Series)</strong>에 함수 일괄 적용
- <strong><u>applymap</u></strong> 함수 : <strong>DataFrame</strong>에서 사용하며 <strong>모든 요소</strong>에 함수 일괄 적용

## 8.1 Series의 각각의 요소에 함수 적용하기

<span class = "hlblock">map(Function name)</span>

- <strong><u>Series</u></strong>에서 사용가능한 함수
- Series의 <strong><u>모든값(values)</u></strong>에 대해 입력된 함수 일괄 적용
<div class = "CenterImg">
<img src = "./img/mapFunction.jpg" alt="mapFunction" />
</div>

pandas library import


```python
import pandas as pd
from pandas import Series , DataFrame
```


```python
srAge = Series([10,13,15,23,22,36])
srAge
```




    0    10
    1    13
    2    15
    3    23
    4    22
    5    36
    dtype: int64



나이의 범위에 따라 10대, 20대, 30대로 변경하는 함수 생성

- 10~19 : 10대
- 20~29 : 20대
- 30~39 : 30대
- 그외 : NaN값

으로 변경


```python
def weekday2weeknumber(age):
    if age >= 10 and age < 20:
        ageRange = '10대'
    elif age >= 20 and age < 30:
        ageRange = '20대'
    elif age >= 30 and age < 40:
        ageRange = '30대'
    else:
        ageRange = pd.np.nan
    return ageRange
```

map 함수로 Series의 각각의 값에 함수 적용


```python
srAgeRange = srAge.map(weekday2weeknumber)
srAgeRange
```




    0    10대
    1    10대
    2    10대
    3    20대
    4    20대
    5    30대
    dtype: object



## 8.2 DataFrame의 각 열 또는 행에 함수 일괄 적용하기

<span class ="hlblock">apply(Function name)</span>

- <strong><u>DataFrame</u></strong>에서 사용 가능한 함수
- DataFrame의 <strong><u>행 또는 열에 해당하는 Series</u></strong>에 함수를 일괄 적용

<strong>axis 옵션</strong>

- <strong><u>axis = 0(Defualt)</u></strong> : 열기준 함수 적용
- <strong><u>axis = 1</u></strong> : 행기준 함수 적용
<div class = "CenterImg">
<img src = "./img/applyFunction.jpg" alt="applyFunction" />
</div>

DataFrame 생성


```python
df = DataFrame([[1,3,5],[4,5,6],[7,8,10]])
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>3</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>7</td>
      <td>8</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
</div>



행 또는 열의 최대값과 최소값의 차이를 구하는 함수 생성


```python
def maxMinusMin(sr):
    return sr.max() - sr.min()
```


```python
df.apply(maxMinusMin, axis = 0)
```




    0    6
    1    5
    2    5
    dtype: int64




```python
df.apply(maxMinusMin, axis = 1)
```




    0    4
    1    2
    2    3
    dtype: int64



return값을 조정하여 <strong><u>여러개의 열 또는 컬럼으로 출력</u></strong> 가능


```python
def maxMinusMin2(sr):
    sr2 = Series([sr.max(), sr.min(), sr.max()-sr.min()], index = ['최대값','최소값','차이'])
    return sr2
```


```python
df.apply(maxMinusMin2, axis =0)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>최대값</th>
      <td>7</td>
      <td>8</td>
      <td>10</td>
    </tr>
    <tr>
      <th>최소값</th>
      <td>1</td>
      <td>3</td>
      <td>5</td>
    </tr>
    <tr>
      <th>차이</th>
      <td>6</td>
      <td>5</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.apply(maxMinusMin2, axis =1)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>최대값</th>
      <th>최소값</th>
      <th>차이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>6</td>
      <td>4</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10</td>
      <td>7</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>



## 8.3 DataFrmae의 각각 요소에 함수 일괄 적용하기

<span class = "hlblock">applymap(Function name)</span>

- <strong><u>DataFrame</u></strong>에서 사용가능한 함수
- DataFrame의 <strong><u>모든값(values)</u></strong>에 대해 함수 일괄 적용

<div class = "CenterImg">
<img src = "./img/applymapFunction.jpg" alt="applymapFunction" />
</div>

DataFrame 생성


```python
df2 = DataFrame([[1,1,1],[2,2,2],[3,3,3]])
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>3</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>



입력값의 제곱을 리턴하는 함수 생성


```python
def square(x):
    y = x * x
    return y
```


```python
df2.applymap(square)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>4</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>9</td>
      <td>9</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_8_Pandas_apply_function.ipynb) Github에서도 확인 할 수 있습니다.

다음 포스팅은 Pandas DataFrame 집계(그룹핑) 함수에 대해 알아볼 예정입니다.

감사합니다.
