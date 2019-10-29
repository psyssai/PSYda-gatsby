---  
title: "[Pandas 기초]3.Pandas의 자료구조-DataFrame"  
categories: "빅데이터분석/Pandas"   
date: "2019-08-16"  
tags: ["Pandas","DataFrame", "데이터 분석"]  
---

안녕하세요. PSYda입니다.  

이번 포스팅에서는 Pandas의 DataFrame에 대해 알아보겠습니다.  

소개할 내용은 아래와 같습니다.

<div id = "summary"> 
<ul>
    <li>DataFrame <strong><span style = "color:red">생성</span></strong></li>
    <li>DataFrame에 <strong><span style = "color:red">Data추가/삭제/조회</span></strong></li>

</div>  
  
    

# 2. DataFrame

DataFrame 이란?

<ul>
    <li> 2차원 데이터 </li>
    <li> 인덱스가 같은 하나 이상의 <strong><u>Series가 모여진 데이터</u></strong> </li>
    <li> DBMS 의 관계형 Table 과 매우 유사 </li>
</ul>

<div class = 'CenterImg'>
    <img src ="img/DataFrame_1.jpg" alt = "DataFrame_1" />
</div>

먼저 DataFrame을 사용하기 위해 Pandas 라이브러리를 import 합니다.


```python
# pandas library import
import pandas as pd
from pandas import Series, DataFrame
```

## 2.1 DataFrame 데이터 생성

DataFrame을 생성하기 위해 셀에 DataFrame() 이라고 입력하고 괄호 안에서 Shift+tab 을 눌러보면 아래와 같은 정보가 보입니다.  

DataFrame(<strong><span style = "color:red">data</span></strong>=None, <strong><span style = "color:red">index</span></strong>=None, <strong><span style = "color:red">columns</span></strong>=None, <strong><span style = "color:red">dtype</span></strong>=None, <strong><span style = "color:red">copy</span></strong>=False)  

값을 입력해줄 수 있고, Default 가 None이기 때문에 값이 없으면 아무 동작도 하지 않습니다. 속성값들을 하나씩 알아보겠습니다.
<ul>
    <li><strong><span style = "color:red">data</span></strong> : 저장되는 데이터</li>
    <li><strong><span style = "color:red">index</span></strong> : index에 대한 정보(미입력시 0부터 순차적으로 부여)</li>
    <li><strong><span style = "color:red">columns</span></strong> : 열에 대한 이름값(미입력시 0부터 순차적으로 부여)</li>
    <li><strong><span style = "color:red">dtype</span></strong> : 데이터에 대한 타입 명시(미입력시 자체적으로 판단)</li>
</ul>

예제를 확인하겠습니다.


```python
Data1 = DataFrame([[180,75],[160,65],[170,75], [175,80]], 
                  index = ["사람1","사람2","사람3","사람4"], 
                  columns = ["키","몸무게"])
Data1
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
      <th>키</th>
      <th>몸무게</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람4</th>
      <td>175</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>



index와 columns의 경우 선언후에도 별도로 입력할 수도 있습니다.


```python
Data1 = DataFrame([[180,75],[160,65],[170,75], [175,80]])
Data1
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>1</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>2</th>
      <td>170</td>
      <td>75</td>
    </tr>
    <tr>
      <th>3</th>
      <td>175</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 인덱스 저장
Data1.index = ["Man1","Man2","Man3","Man4"]
Data1
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 컬럼명 저장
Data1.columns = ["Height","Weight"]
Data1
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
      <th>Height</th>
      <th>Weight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>



## 2.2 데이터 추가, 삭제

### 2.2.1 Column 추가

#### 2.2.1.1 값으로 추가


```python
Data1["나이"] = [30,40,32,33]
Data1
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>



#### 2.2.1.2 Series 또는 DataFrame에서 추가


```python
# bmi = 몸무게(kg) / 키(m)*키(m)
Data1["BMI"] = Data1["Weight"] / ((Data1["Height"] / 100) * (Data1["Height"] / 100))
Data1
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
      <th>BMI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
      <td>23.148148</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
      <td>25.390625</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
      <td>25.951557</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
      <td>26.122449</td>
    </tr>
  </tbody>
</table>
</div>



### 2.2.2  행 추가

append 함수를 이용해서 행기준으로 데이터를 추가 할 수 있습니다.

#### 2.2.2.1 Series와 List를 이용한 행추가


```python
listOfSeries = [pd.Series([187, 85, 34, 0], index = Data1.columns),
               pd.Series([183, 80, 32, 0], index = Data1.columns)]
Data1 = Data1.append(listOfSeries)
Data1
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
      <th>BMI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
      <td>23.148148</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
      <td>25.390625</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
      <td>25.951557</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
      <td>26.122449</td>
    </tr>
    <tr>
      <th>0</th>
      <td>187</td>
      <td>85</td>
      <td>34</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>183</td>
      <td>80</td>
      <td>32</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
</div>



#### 2.2.2.2 DataFrame을 행기준으로 추가


```python
df = DataFrame([[180,75,30,33],[160,65,40,22]], 
               index = ["사람5","사람6"], 
               columns = ["Height","Weight","나이","BMI"])
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
      <th>BMI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람5</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
      <td>33</td>
    </tr>
    <tr>
      <th>사람6</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
      <td>22</td>
    </tr>
  </tbody>
</table>
</div>




```python
Data1.append(df)
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
      <th>BMI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
      <td>23.148148</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
      <td>25.390625</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
      <td>25.951557</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
      <td>26.122449</td>
    </tr>
    <tr>
      <th>0</th>
      <td>187</td>
      <td>85</td>
      <td>34</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>183</td>
      <td>80</td>
      <td>32</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>사람5</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
      <td>33.000000</td>
    </tr>
    <tr>
      <th>사람6</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
      <td>22.000000</td>
    </tr>
  </tbody>
</table>
</div>



### 2.2.3 데이터 삭제

drop 함수를 쓰면 행과 열을 삭제 할 수 있습니다.

axis option
<ul>
<li>0 : 행 기준 삭제</li>
<li>1 : 열 기준 삭제</li>
</ul>

#### 2.2.3.1 열 삭제


```python
Data1 = Data1.drop("BMI", axis = 1)
Data1
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
    <tr>
      <th>0</th>
      <td>187</td>
      <td>85</td>
      <td>34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>183</td>
      <td>80</td>
      <td>32</td>
    </tr>
  </tbody>
</table>
</div>



#### 2.2.3.2 행 삭제


```python
Data1 = Data1.drop("Man1", axis = 0)
Data1
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
      <th>Height</th>
      <th>Weight</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Man2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
    <tr>
      <th>Man3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>Man4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
    <tr>
      <th>0</th>
      <td>187</td>
      <td>85</td>
      <td>34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>183</td>
      <td>80</td>
      <td>32</td>
    </tr>
  </tbody>
</table>
</div>



## 2.3 DataFrame 조회


```python
# 예제를 위한 데이터 생성
Data2 = DataFrame([[180,75,30],[160,65,40],[170,75,32], [175,80,33]], 
                  index = ["사람1","사람2","사람3","사람4"], 
                  columns = ["키","몸무게","나이"])
Data2
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>사람4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>



### 2.3.1 Column 조회

<strong><span style = "color:red">DataFrame명["속성명"]</span></strong> 또는 <strong><span style = "color:red">DataFrame명.속성명</span></strong>을 통해 <strong><u>특정 속성명만 조회</u></strong> 할 수 있다.

하나의 속성명을 조회 하면 SeriesType, 여러 속성명을 조회 하면 DataFrame으로 출력된다.


```python
# 키 Column 만 조회
Data2["키"]
```




    사람1    180
    사람2    160
    사람3    170
    사람4    175
    Name: 키, dtype: int64




```python
# Type 은 Series
type(Data2.몸무게)
```




    pandas.core.series.Series




```python
# 두 개 이상 컬럼 조회
Data2[["키", "몸무게"]]
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
      <th>키</th>
      <th>몸무게</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람4</th>
      <td>175</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
</div>



### 2.3.2 Index 조회

<ul>
    <li><strong><span style = "color:red">DataFrame명.loc["index명"]</span></strong> 을 통해 특정 index만 조회 가능하다.</li>
    <li><strong><span style = "color:red">DataFrame명.iloc[index번호]</span></strong> 를 통해 특정 index만 조회 가능하다.</li>
</ul>

마찬가지로 하나의 index만 조회 할 경우 Series Type, 여러 index의 경우 DataFrame Type으로 출력한다.  


```python
Data2.loc["사람1"]
```




    키      180
    몸무게     75
    나이      30
    Name: 사람1, dtype: int64




```python
# 1번 인덱스 --> 사람2의 정보만 출력
Data2.iloc[1]
```




    키      160
    몸무게     65
    나이      40
    Name: 사람2, dtype: int64




```python
# 두 개 index를 index명으로 조회
Data2.loc[["사람1","사람2"]]
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 여러 개의 index를 index번호로 조회
Data2.iloc[1:3]
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
  </tbody>
</table>
</div>



### 2.3.3 Index 와 column 동시 조회

하나의 index 명과 컬럼명에 해당하는 하나의 값 찾기
<ul>
<li> DataFrame명.at["index명","컬럼명"]</li>
<li> DataFrame명.loc["index명","컬럼명"]</li>
<li> DataFrame명.loc["index명"]["컬럼명"]</li>
</ul>
여러 index명과 컬럼명에 해당하는 여러 값 찾기
<ul>
<li> DataFrame명.loc[["index명1","index명2"],["컬럼명1","컬럼명2"]]</li>
<li> DataFrame명.loc[["index명1","index명2"]][["컬럼명1","컬럼명2"]]</li>
</ul>


```python
#사람1의 나이 찾기
Data2.loc["사람1","나이"]
```




    30




```python
#사람2의 몸무게 찾기
Data2.loc["사람2"]["몸무게"]
```




    65




```python
#사람3의 키 찾기
Data2.at["사람3","키"]
```




    170




```python
# 사람1, 사람2 의 키 조회
Data2.loc[["사람1","사람2"]]["키"]
```




    사람1    180
    사람2    160
    Name: 키, dtype: int64




```python
# 사람1,사람2 의 키와 몸무게 조회
Data2.loc[["사람1","사람2"],["키","몸무게"]]
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
      <th>키</th>
      <th>몸무게</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
    </tr>
  </tbody>
</table>
</div>



하나의 index 번호와 컬럼번호에 해당하는 하나의 값 찾기
<ul>
<li> DataFrame명.iat[index번호,컬럼번호]</li>
<li> DataFrame명.iloc[index번호,컬럼번호]</li>
<li> DataFrame명.iloc[index번호][컬럼번호]</li>
</ul>
여러 index 번호와 컬럼번호에 해당하는 여러 값 찾기
<ul>
<li> DataFrame명.iloc[index번호1:index번호2,컬럼번호1:컬럼명번호2]</li>
</ul>


```python
# 사람1의 나이 찾기
Data2.iloc[0,2]
```




    30




```python
#사람2의 몸무게 찾기
Data2.iloc[1][1]
```




    65




```python
#사람3의 키 찾기
Data2.iat[2,0]
```




    170




```python
# 사람1, 사람2 의 키 조회
Data2.iloc[0:2,0]
```




    사람1    180
    사람2    160
    Name: 키, dtype: int64




```python
# 사람1,사람2 의 키와 몸무게 조회
Data2.iloc[0:2,0:2]
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
      <th>키</th>
      <th>몸무게</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
    </tr>
  </tbody>
</table>
</div>



### 2.3.4 조건 조회


```python
# 키가 170 이상인 사람만 조회
Data2[Data2["키"] >= 170]
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>사람4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>



### 2.3.5 상위/하위 데이터 조회

<ul>
<li>head(개수) : 위에서부터 개수만큼의 데이터만 출력</li>
<li>tail(개수) : 밑에서부터 개수만큼의 데이터만 출력</li>
</ul>
개수를 쓰지 않을 경우 5개만 출력


```python
Data2.head(2)
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람1</th>
      <td>180</td>
      <td>75</td>
      <td>30</td>
    </tr>
    <tr>
      <th>사람2</th>
      <td>160</td>
      <td>65</td>
      <td>40</td>
    </tr>
  </tbody>
</table>
</div>




```python
Data2.tail(2)
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
      <th>키</th>
      <th>몸무게</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>사람3</th>
      <td>170</td>
      <td>75</td>
      <td>32</td>
    </tr>
    <tr>
      <th>사람4</th>
      <td>175</td>
      <td>80</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_2_DataFrame.ipynb) Github에서도 확인 할 수 있습니다.  
다음에는 Pandas의 두 번째 자료구조이자 가장 중요한 DataFrame에 대해 포스팅 할 예정입니다.

감사합니다.
