---
title: "[Pandas 기초]6.Pandas DataFrame 산술 연산"  
category: "빅데이터분석/Pandas"  
date: "2019-08-22"  
tags: ["Pandas","DataFrame", "데이터 분석", "Append", "concat", "join", "merge"]  
---

안녕하세요. PSYda입니다.

이번 포스팅에서는 <strong><u>Pandas DataFrame의 산술 연산</u></strong>에 대해 알아보겠습니다.

소개할 내용은 아래와 같습니다.



<div id="summary">
<ul>
    <li><strong><span style = "color:red">DataFrame과 DataFrame의 연산</strong></span> 함수 소개</li>
    <li><strong><span style = "color:red">DataFrame과 Sereis의 연산</strong></span> 함수 소개</li>
      
</ul>  

</div>

# 5.Pandas DataFrame 산술 연산

DataFrame 의 연산은 아래의 두 가지 케이스가 있습니다.

- DataFrame vs DataFrame 연산
- DataFrame vs Series 연산

## 5.1 DataFrame vs DataFrame 연산

DataFrame의 연산 규칙은 아래와 같습니다.

- <strong><u>같은 index 이면서 같은 column 명</u></strong>을 가진 두 value를 연산함
- 같은 index 이면서 같은 column 명을 가진 두 value 중 <strong><u>하나라도 NaN이 있으면 <span style = "color:red">NaN</span></u></strong>으로 채워진다.
- <strong><u>index나 column 명이 다르면 <span style = "color:red">NaN</span></u></strong>으로 채워진다.
<div class = "CenterImg">
<img src = "./img/OperationRule.jpg" alt="OperationRule" />
</div>

연산하는 방법에는 두 가지 방법이 있습니다.

- <strong><span style = "color:red">연산자( +, -, *, / )</span></strong>를 이용한 연산
- <strong><span style = "color:red">함수( add, sub, mul, div )</span></strong>를 이용한 연산 

기본 연산은 동일하지만 함수를 사용하면 <strong><span style = "color:red">fill_value</span></strong>와 <strong><span style = "color:red">axis 옵션</span></strong>을 사용할 수 있습니다.

Ex)<span class = "hlblock">df1.add(df2, fill_value = 0, axis = 0)</span>

- <strong><span style = "color:red">fill_value = 0</span></strong> : NaN값을 0으로 간주하고 연산, 0이 아닌 값 입력 가능
- <strong><span style = "color:red">axis = 0</span></strong> : DataFrame와 Series간의 연산에서 방향을 지정(5.1.2 참고)
<div class = "CenterImg">
<img src = "./img/OperationRule2.jpg" alt="OperationRule2" />
</div>

곱하기, 나누기, 빼기 등도 동일한 방법이므로, 대표로 더하기에 대해서만 실습해보겠습니다.


```python
import pandas as pd
from pandas import Series, DataFrame
import numpy as np
```


```python
df1 = DataFrame([[1,3,5],[7,9,11],[5,13,15]])
df1
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
      <td>7</td>
      <td>9</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5</td>
      <td>13</td>
      <td>15</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = DataFrame([[1,2,3],[4,np.nan,6],[7,8,9]], columns=[0,1,3], index=[0,1,3])
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
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2.0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>NaN</td>
      <td>6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>7</td>
      <td>8.0</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1 + df2
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
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2.0</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>11.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1.add(df2,fill_value=0)
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
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2.0</td>
      <td>5.0</td>
      <td>5.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>11.0</td>
      <td>9.0</td>
      <td>11.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5.0</td>
      <td>13.0</td>
      <td>15.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>7.0</td>
      <td>8.0</td>
      <td>NaN</td>
      <td>9.0</td>
    </tr>
  </tbody>
</table>
</div>



## 5.2 DataFrame vs Series 연산

연산 함수(add, sub, mul, div) 의 axis 옵션을 통해 행, 열 방향으로 연산 가능

Ex) df1.add(df2, axis = 0)

<strong><span style="color:red">axis = 0</span></strong> : <strong><u>Index방향</u></strong>(행방향)으로 DataFrame과 Series 연산

- DataFrame과 Series가 동일한 Index를 가지면 연산, 다르면거나 한쪽만 있으면 NaN

<strong><span style="color:red">axis = 1</span></strong> : <strong><u>Column방향</u></strong>으로 DataFrame과 Series 연산

- DataFrame과 Series가 동일한 Column명을 가지면 연산, 다르면거나 한쪽만 있으면 NaN

연산을 위한 Sereis 생성


```python
s1 = Series([1,2,3,4])
s1
```




    0    1
    1    2
    2    3
    3    4
    dtype: int64




```python
df1
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
      <td>7</td>
      <td>9</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5</td>
      <td>13</td>
      <td>15</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1.add(s1, axis = 0)
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
      <td>2.0</td>
      <td>4.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9.0</td>
      <td>11.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>8.0</td>
      <td>16.0</td>
      <td>18.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1.add(s1, axis = 1)
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
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>5</td>
      <td>8</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>8</td>
      <td>11</td>
      <td>14</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6</td>
      <td>15</td>
      <td>18</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_5_DataFrame_ArithmeticOperation.ipynb) Github에서도 확인 할 수 있습니다,

다음 포스팅은 DataFrame의 통계에 대해 알아볼 예정입니다.  

감사합니다.



