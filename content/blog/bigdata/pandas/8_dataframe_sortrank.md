---
title: "[Pandas 기초]8.Pandas DataFrame의 sort, rank 함수"   
categories: "빅데이터분석/Pandas"  
date: "2019-08-28"  
tags: ["sort_index","sort_values","데이터프레임 정렬"]
---

안녕하세요. PSYda입니다.

이번 포스팅에서는 Pandas DataFrame의 sort(정렬), rank(순위)에 대해 알아보겠습니다.

소개할 내용은 아래와 같습니다.

<div id = "summary">
<ul>
    <li>DataFrame의 정렬 함수(<strong><u><span style="color:red">sort_values, sort_index</span></u></strong>)</li>
    <li>DataFrame의 순위 측정 함수(<strong><u><span style="color:red">rank</span></u></strong>)</li>    
</ul>
</div>

실습에 사용한 데이터는 fifa19에 등장하는 축구선수들의 능력치 데이터 입니다.  
[여기](./data/Ch6_1_fifaStats.csv)에서 다운 받을 수 있습니다.

# 7. DataFrame의 sort, rank 함수

- sort 함수 : 데이터를 정렬하는 함수(sort_values, sort_index)
- rank 함수 : 데이터의 순위를 매기는 함수

## 7.1 DataFrame의 sort

DataFrame에서는 sort를 index 및 column 기준으로 sort를 할 수 있다.

- <strong><span style="color:red">sort_values(axis = 0)</span></strong> : <strong><u>열방향</u></strong> 정렬(default)
- <strong><span style="color:red">sort_values(axis = 1)</span></strong> : <strong><u>행방향</u></strong> 정렬
- <strong><span style="color:red">sort_index(axis = 0)</span></strong> : <strong><u>인덱스명</u></strong> 정렬(defualt)
- <strong><span style="color:red">sort_index(axis = 1)</span></strong> : <strong><u>컬럼명</u></strong> 정렬

정렬은 ascending 옵션을 통해 오름차순과 내림차순 정렬이 가능하다.

- <strong><span style="color:red">ascending = True</span></strong> : <strong><u>오름차순 정렬</u></strong>, 영어의 경우 a 부터
- <strong><span style="color:red">ascending = False</span></strong> : <strong><u>내림차순 정렬</u></strong>, 영어의 경우 z부터


### 7.1.1 sort_values() : 열방향 또는 행방향 데이터 정렬

<strong><u>sort_values</u></strong> 함수 옵션

- <strong><span style="color:red">ascending = True</span></strong> : True 이면 오름차순, False이면 내림차순 정렬
- <strong><span style="color:red">inplace = False</span></strong> : True 이면 정렬한 값을 DataFrame에 바로 반영
- <strong><span style="color:red">by</span></strong> : 정렬할 기준 변수 지정
- <strong><span style="color:red">na_position = last</span></strong> : NaN값 위치 지정, last이면 마지막, first이면 처음
- <strong><span style="color:red">axis = 0</span></strong> : 0이면 열방향 정렬, 1이면 행방향 정렬

pandas library import


```python
import pandas as pd
from pandas import Series, DataFrame
import numpy as np
```


```python
players = pd.read_csv('data/Ch6_1_fifaStats.csv', index_col = 'Name')
players.head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>L. Messi</th>
      <td>90.0</td>
      <td>97.0</td>
      <td>87.0</td>
      <td>96.0</td>
    </tr>
    <tr>
      <th>Cristiano Ronaldo</th>
      <td>81.0</td>
      <td>88.0</td>
      <td>77.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>Neymar Jr</th>
      <td>84.0</td>
      <td>96.0</td>
      <td>78.0</td>
      <td>95.0</td>
    </tr>
    <tr>
      <th>De Gea</th>
      <td>50.0</td>
      <td>18.0</td>
      <td>51.0</td>
      <td>42.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>92.0</td>
      <td>86.0</td>
      <td>91.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



#### 7.1.1.1 by 옵션

DataFrame에서 정렬할 변수를 지정 할 수 있다.(Serise의 경우 한 컬럼이므로 by옵션 설정 필요 없음)

- <strong><u>axis = 0</u></strong> 이면 컬럼명을 정렬 기준 변수로 지정(default)
- <strong><u>axis = 1</u></strong> 이면 인덱스명을 정렬 기준 변수로 지정

ShortPassing 능력치 컬럼 기준 오름차순 정렬


```python
players.sort_values(by = 'ShortPassing', axis = 0).head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Deng Xiaofei</th>
      <td>7.0</td>
      <td>6.0</td>
      <td>12.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>Zhang Chong</th>
      <td>7.0</td>
      <td>16.0</td>
      <td>9.0</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>Cheng Yuelei</th>
      <td>8.0</td>
      <td>13.0</td>
      <td>10.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>A. Donnarumma</th>
      <td>11.0</td>
      <td>19.0</td>
      <td>11.0</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>Gabri Prestão</th>
      <td>11.0</td>
      <td>18.0</td>
      <td>12.0</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
</div>



#### 7.1.1.2 ascending 옵션

- <strong><u>True(Default)</u></strong> : 오른차순 정렬
- <strong><u>False</u></strong> : 내림차순 정렬,

ShortPassing 컬럼 기준 내림차순 정렬


```python
players.sort_values(ascending = False,by = 'ShortPassing').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>93.0</td>
      <td>89.0</td>
      <td>87.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>93.0</td>
      <td>90.0</td>
      <td>88.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>92.0</td>
      <td>81.0</td>
      <td>93.0</td>
      <td>90.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>92.0</td>
      <td>86.0</td>
      <td>91.0</td>
      <td>91.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>91.0</td>
      <td>84.0</td>
      <td>88.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



#### 7.1.1.3 na_position 옵션

- <strong><u>'last'(Defualt)</u></strong> : 결측값(NaN)을 뒤로 정렬
- <strong><u>'first'</u></strong> : 결측값(NaN)을 앞으로 정렬

ShortPassing 컬럼 기준 내림차순 정렬하면서 NaN을 처음에 배치


```python
players.sort_values(ascending = False,by = 'ShortPassing', na_position='first').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>J. McNulty</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>J. Barrera</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>J. Stead</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>A. Semprini</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>R. Bingham</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



#### 7.1.1.4 inplace 옵션

- <strong><u>False(Default)</u></strong> : 정렬된 내용을 단순 출력만함
- <strong><u>True</u></strong> : 정렬된 내용을 DataFrame에 저장

players DataFrame에 정렬된 데이터를 저장


```python
players.sort_values(ascending = False,by = 'ShortPassing', inplace = True)
players.head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>93.0</td>
      <td>89.0</td>
      <td>87.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>93.0</td>
      <td>90.0</td>
      <td>88.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>92.0</td>
      <td>81.0</td>
      <td>93.0</td>
      <td>90.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>92.0</td>
      <td>86.0</td>
      <td>91.0</td>
      <td>91.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>91.0</td>
      <td>84.0</td>
      <td>88.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



#### 7.1.1.5 axis 옵션

- <strong><u>axis = 0</u></strong> : 열방향으로 정렬(위에서 아래로)
- <strong><u>axis = 1</u></strong> : 행방향으로 정렬(좌에서 우로)

Index 명의 David Silva 기준으로 행방향 정렬


```python
players.sort_values(axis = 1, by = 'David Silva').head()
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
      <th>LongPassing</th>
      <th>Dribbling</th>
      <th>ShortPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>87.0</td>
      <td>89.0</td>
      <td>93.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>88.0</td>
      <td>90.0</td>
      <td>93.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>93.0</td>
      <td>81.0</td>
      <td>92.0</td>
      <td>90.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>91.0</td>
      <td>86.0</td>
      <td>92.0</td>
      <td>91.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>88.0</td>
      <td>84.0</td>
      <td>91.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



### 7.1.2 sort_index() : 인덱스명 정렬

sort_index 함수의 옵션(sort_values 와 옵션이 거의 동일)

- <strong><u>axis = 0(Default)</u></strong> : index명을 정렬
- <strong><u>axis = 1</u></strong> : 컬럼명을 정렬

A 부터 오름차순 정렬


```python
players.sort_index().head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A. Abang</th>
      <td>52.0</td>
      <td>56.0</td>
      <td>28.0</td>
      <td>59.0</td>
    </tr>
    <tr>
      <th>A. Abdellaoui</th>
      <td>53.0</td>
      <td>39.0</td>
      <td>45.0</td>
      <td>47.0</td>
    </tr>
    <tr>
      <th>A. Abdennour</th>
      <td>58.0</td>
      <td>48.0</td>
      <td>62.0</td>
      <td>51.0</td>
    </tr>
    <tr>
      <th>A. Abdi</th>
      <td>74.0</td>
      <td>70.0</td>
      <td>72.0</td>
      <td>74.0</td>
    </tr>
    <tr>
      <th>A. Abdu Jaber</th>
      <td>49.0</td>
      <td>61.0</td>
      <td>40.0</td>
      <td>59.0</td>
    </tr>
  </tbody>
</table>
</div>



내림차순 정렬


```python
players.sort_index(ascending = False).head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Óscar Whalley</th>
      <td>32.0</td>
      <td>16.0</td>
      <td>30.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>Óscar Valentín</th>
      <td>68.0</td>
      <td>58.0</td>
      <td>63.0</td>
      <td>68.0</td>
    </tr>
    <tr>
      <th>Óscar Plano</th>
      <td>68.0</td>
      <td>72.0</td>
      <td>65.0</td>
      <td>73.0</td>
    </tr>
    <tr>
      <th>Óscar Pinchi</th>
      <td>65.0</td>
      <td>69.0</td>
      <td>63.0</td>
      <td>70.0</td>
    </tr>
    <tr>
      <th>Óscar Gil</th>
      <td>37.0</td>
      <td>57.0</td>
      <td>34.0</td>
      <td>50.0</td>
    </tr>
  </tbody>
</table>
</div>



컬럼명 정렬


```python
players.sort_index(axis = 1).head()
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
      <th>BallControl</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>ShortPassing</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>94.0</td>
      <td>89.0</td>
      <td>87.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>93.0</td>
      <td>90.0</td>
      <td>88.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>90.0</td>
      <td>81.0</td>
      <td>93.0</td>
      <td>92.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>91.0</td>
      <td>86.0</td>
      <td>91.0</td>
      <td>92.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>91.0</td>
      <td>84.0</td>
      <td>88.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



## 7.2 DataFrame의 rank

rank 함수 (데이터의 순위를 측정) 옵션

- <strong><span style="color:red">ascending</span></strong> : False 이면 숫자가 큰 것이 순위가 높음(rank 값이 작음)
- <strong><span style="color:red">axis</span></strong> : 0이면 열방향, 1이면 행방향으로 순위 측정
- <strong><span style="color:red">method</span></strong> : 동점인 경우 순위 측정에 사용할 방법(평균, 최소값, 최대값 등)
- <strong><span style="color:red">pct</span></strong> : True 이면 상위 몇% 인지 보여줌

### 7.2.1 ascending 옵션

- <strong><u>True(Default)</u></strong> : 데이터 수치가 클 수록 rank값이 커짐(순위가 낮아짐)
- <strong><u>False</u></strong> : 데이터 수치가 작을 수록 rank값이 작아짐(순위가 높아짐)

컬럼별로 순위 측정(데이터 수치가 클수록 rank가 높음)


```python
players.rank().head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>18158.5</td>
      <td>18131.5</td>
      <td>18145.0</td>
      <td>18155.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>18158.5</td>
      <td>18141.5</td>
      <td>18150.5</td>
      <td>18152.5</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>18156.5</td>
      <td>17790.5</td>
      <td>18159.0</td>
      <td>18137.5</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>18156.5</td>
      <td>18061.0</td>
      <td>18158.0</td>
      <td>18145.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>18155.0</td>
      <td>17982.5</td>
      <td>18150.5</td>
      <td>18145.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
players.rank(ascending = False).head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>1.5</td>
      <td>28.5</td>
      <td>15.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>1.5</td>
      <td>18.5</td>
      <td>9.5</td>
      <td>7.5</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>3.5</td>
      <td>369.5</td>
      <td>1.0</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>3.5</td>
      <td>99.0</td>
      <td>2.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>5.0</td>
      <td>177.5</td>
      <td>9.5</td>
      <td>15.0</td>
    </tr>
  </tbody>
</table>
</div>



### 7.2.2 axis 옵션

- <strong><u>axis = 0(Defualt)</u></strong> : 열방향으로 순위 측정
- <strong><u>axis = 1</u></strong> : 행방향으로 순위 측정 

행방향으루 순위 측정(David Silva의 경우 BallControl 컬럼의 순위가 가장 높음)


```python
players.rank(ascending = False, axis = 1).head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>1.5</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>1.5</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>2.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>1.0</td>
      <td>4.0</td>
      <td>2.5</td>
      <td>2.5</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>1.5</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>1.5</td>
    </tr>
  </tbody>
</table>
</div>



### 7.2.3 method 옵션

데이터 수치가 동점일 경우 순위 측정 방법

- <strong><u>average(Default)</u></strong> : 평균으로 순위 측정( Ex. 1위가 2명인경우 1.5 )
- <strong><u>first</u></strong> : 동점없이 정렬된 순서대로 순위 측정( Ex. 1위가 3명인 경위 위에서부터 1,2,3 )
- <strong><u>max</u></strong> : 동점인 데이터들 중 순위가 낮은 값 선정( Ex. 1위가 3명인 경우 3 )
- <strong><u>min</u></strong> : 동점인 데이터들 중 순위가 높은 값 선정( Ex. 1위가 3명인 경우 1등, 4번째 데이터의 경우 4등 )
- <strong><u>dense</u></strong> : min과 비슷하지만 동점 다음 데이터 순위 측정에서 차이가 있음( Ex. 1위가 3명인 경우 1등, 4번째 데이터의 경우 2등 )

순위가 동점이면 평균값 측정(David Silva와 L.Modric이 공동 1등이므로 1.5값 부여)


```python
players.rank(ascending = False, method = 'average').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>1.5</td>
      <td>28.5</td>
      <td>15.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>1.5</td>
      <td>18.5</td>
      <td>9.5</td>
      <td>7.5</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>3.5</td>
      <td>369.5</td>
      <td>1.0</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>3.5</td>
      <td>99.0</td>
      <td>2.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>5.0</td>
      <td>177.5</td>
      <td>9.5</td>
      <td>15.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
players.rank(ascending = False, method = 'first').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>1.0</td>
      <td>25.0</td>
      <td>11.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>2.0</td>
      <td>13.0</td>
      <td>9.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>3.0</td>
      <td>332.0</td>
      <td>1.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>4.0</td>
      <td>80.0</td>
      <td>2.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>5.0</td>
      <td>153.0</td>
      <td>10.0</td>
      <td>14.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
players.rank(ascending = False, method = 'max').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>2.0</td>
      <td>32.0</td>
      <td>19.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>2.0</td>
      <td>24.0</td>
      <td>10.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>4.0</td>
      <td>407.0</td>
      <td>1.0</td>
      <td>27.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>4.0</td>
      <td>118.0</td>
      <td>2.0</td>
      <td>17.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>5.0</td>
      <td>202.0</td>
      <td>10.0</td>
      <td>17.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
players.rank(ascending = False, method = 'min').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>1.0</td>
      <td>25.0</td>
      <td>11.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>1.0</td>
      <td>13.0</td>
      <td>9.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>3.0</td>
      <td>332.0</td>
      <td>1.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>3.0</td>
      <td>80.0</td>
      <td>2.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>5.0</td>
      <td>153.0</td>
      <td>9.0</td>
      <td>13.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
players.rank(ascending = False, method = 'dense').head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>1.0</td>
      <td>9.0</td>
      <td>6.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>1.0</td>
      <td>8.0</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>2.0</td>
      <td>17.0</td>
      <td>1.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>2.0</td>
      <td>12.0</td>
      <td>2.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>3.0</td>
      <td>14.0</td>
      <td>5.0</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>



### 7.2.4 pct 옵션

- <strong><u>False(Default)</u></strong> : rank를 순위(숫자)로 매김
- <strong><u>True</u></strong> : 순위의 퍼센테이지값으로 매김(ex. 4명 중 1등인 경우 0.25, 4등은 1.0)

players 데이터 확인


```python
players.head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>93.0</td>
      <td>89.0</td>
      <td>87.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>93.0</td>
      <td>90.0</td>
      <td>88.0</td>
      <td>93.0</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>92.0</td>
      <td>81.0</td>
      <td>93.0</td>
      <td>90.0</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>92.0</td>
      <td>86.0</td>
      <td>91.0</td>
      <td>91.0</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>91.0</td>
      <td>84.0</td>
      <td>88.0</td>
      <td>91.0</td>
    </tr>
  </tbody>
</table>
</div>



행방향으로 퍼센테이지 순위 측정(David Silva의 경우 BallControl이 1등이므로 0.25)


```python
players.rank(ascending = False, axis = 1, pct = True).head()
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
      <th>ShortPassing</th>
      <th>Dribbling</th>
      <th>LongPassing</th>
      <th>BallControl</th>
    </tr>
    <tr>
      <th>Name</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>David Silva</th>
      <td>0.500</td>
      <td>0.75</td>
      <td>1.000</td>
      <td>0.250</td>
    </tr>
    <tr>
      <th>L. Modrić</th>
      <td>0.375</td>
      <td>0.75</td>
      <td>1.000</td>
      <td>0.375</td>
    </tr>
    <tr>
      <th>T. Kroos</th>
      <td>0.500</td>
      <td>1.00</td>
      <td>0.250</td>
      <td>0.750</td>
    </tr>
    <tr>
      <th>K. De Bruyne</th>
      <td>0.250</td>
      <td>1.00</td>
      <td>0.625</td>
      <td>0.625</td>
    </tr>
    <tr>
      <th>C. Eriksen</th>
      <td>0.375</td>
      <td>1.00</td>
      <td>0.750</td>
      <td>0.375</td>
    </tr>
  </tbody>
</table>
</div>



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_7_DataFrame_sort_rank.ipynb) Github에서도 확인 할 수 있습니다.

다음 포스팅은 Series와 DataFrame에 함수를 적용하는 방법에 대해 알아볼 예정입니다.

감사합니다.
