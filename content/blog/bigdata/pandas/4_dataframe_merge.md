---
title: "[Pandas 기초]4.여러 DataFrame 연결하기(Join)"  
categories: "빅데이터분석/Pandas"  
date: "2019-08-17"  
tags: ["Pandas","DataFrame", "데이터 분석", "Append", "concat", "join", "merge"]  
---

안녕하세요. PSYda 입니다.  

이번 포스팅에서는 **<span style = "color:red">두 개의 DataFrame을 연결하는 Join 기법</span>**에 대해 알아보겠습니다.  

소개할 내용은 아래와 같습니다.  

<div id = "summary"> 
<ul>
<li>컬럼 기준 Join</li>
<li>Index 기준 Join</li>
<li>행기준 Join</li>
<li>Inner, Left, Right ,Outer Join</li>

</div>  
  
    

# 3. DataFrame Join

<strong><u>Join</u></strong> 이란? 

- 두 개의 DataFrame을 합치는 것
- **열기준 컬럼명**으로 합치기 : merge
- **열기준 Index명**로 합치기 : merge, concat
- **행기준**으로 합치기 : concat, append  

<strong><u>합치는 방법</u></strong>은?  

- **Inner** : 두 DataFrame의 기준 컬럼에서 둘 다 존재하는 데이터만 Join
- **Left Outer join** : 왼쪽 DataFrame으로 합치기
- **Right Outer Join** : 오른쪽 DataFrame으로 합치기
- **Outer Join** : 두 DataFrame의 모든 Data를 합치기  

<strong><u>Merge</u></strong> 명령어 사용법?  

- <span class = "hlblock"> pd.merge(left, right, how, on, left_on, right_on, left_index, right_index)</span>
-  **left** : Merge 할 왼쪽 DataFrame
- **right** : Merge 할 오른쪽 DataFrame
- **how** : inner, left, right, outer
- **on** : 두 DataFrame을 Join할 기준 컬럼명(컬럼명이 동일할 경우)
- **left_on** : Join할 기준 컬럼의 왼쪽 DataFrame의 컬럼명
- **right_on** : Join할 기준 컬럼의 오른쪽 DataFrame의 컬럼명
- **left_index** : 왼쪽 DataFrame index로 Join할 경우 True
- **right_index** : 오른쪽 DataFrame index로 Join할 경우 True

<strong><u>concat</u></strong> 명령어 사용법?  


- <span class = "hlblock"> pd.concat([left,right], axis, join,...)</span>
- **[left,right]** : left DataFrame과 right DataFrame으로 이루어진 List
- **axis = 0** : 행기준으로 합치기, 1: 열기준으로 Index명으로 합치기  

pandas libary를 import 합니다.


```python
import pandas as pd
from pandas import Series, DataFrame
```

## 3.1 같은 Column끼리 합치기


```python
DF1 = DataFrame([["싸이",180,75],["덕구",160,65],["또치",170,75]], columns = ["이름","키","몸무게"])
DF1
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
      <th>이름</th>
      <th>키</th>
      <th>몸무게</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>싸이</td>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>1</th>
      <td>덕구</td>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>2</th>
      <td>또치</td>
      <td>170</td>
      <td>75</td>
    </tr>
  </tbody>
</table>
</div>




```python
DF2 = DataFrame([["싸이","포워드","잘함"],["덕구","미드필더","못함"],["똥갈","수비수","잘함"]], columns = ["이름","포지션","실력"])
DF2
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
      <th>이름</th>
      <th>포지션</th>
      <th>실력</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>싸이</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>1</th>
      <td>덕구</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
    <tr>
      <th>2</th>
      <td>똥갈</td>
      <td>수비수</td>
      <td>잘함</td>
    </tr>
  </tbody>
</table>
</div>



### 3.1.1 Inner Join

두 DataFrame의 기준 컬럼에서 <strong><u>둘 다 존재하는 데이터만 Join</u></strong>
<div class = 'CenterImg'>
    <img src = "./img/Merge_1.jpg" />
</div>


```python
pd.merge(left = DF1 , right = DF2, how = "inner", on = "이름")
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
      <th>이름</th>
      <th>키</th>
      <th>몸무게</th>
      <th>포지션</th>
      <th>실력</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>싸이</td>
      <td>180</td>
      <td>75</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>1</th>
      <td>덕구</td>
      <td>160</td>
      <td>65</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
  </tbody>
</table>
</div>



### 3.1.2 Left Outer Join


- 왼쪽 DataFrame의 모든 데이터 출력 + 
- 오른쪽 DataFrame 중 왼쪽 DataFrame에 있는 Data는 출력
- 오른쪽 DataFrame 중 <strong><u>왼쪽 DataFrame에 없는 Data는 NaN으로 처리</u></strong>

<div class = 'CenterImg'>
<img src = "./img/Merge_2.jpg" />
</div>


```python
pd.merge(left = DF1 , right = DF2, how = "left", on = "이름")
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
      <th>포지션</th>
      <th>실력</th>
    </tr>
    <tr>
      <th>이름</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
    <tr>
      <th>또치</th>
      <td>170</td>
      <td>75</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



### 3.1.3 Right Outer Join


- 오른쪽 DataFrame의 모든 데이터 출력 +
- 왼쪽 DataFrame 중 오른쪽 DataFrame에 있는 Data는 출력
- 왼쪽 DataFrame 중 <strong><u>오른쪽 DataFrame에 없는 Data는 NaN으로 처리</u></strong>

<div class ="CenterImg">
<img src = "./img/Merge_3.jpg" />
</div>


```python
pd.merge(left = DF1 , right = DF2, how = "right", on = "이름")
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
      <th>이름</th>
      <th>키</th>
      <th>몸무게</th>
      <th>포지션</th>
      <th>실력</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>싸이</td>
      <td>180.0</td>
      <td>75.0</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>1</th>
      <td>덕구</td>
      <td>160.0</td>
      <td>65.0</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
    <tr>
      <th>2</th>
      <td>똥갈</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>수비수</td>
      <td>잘함</td>
    </tr>
  </tbody>
</table>
</div>



### 3.1.4 Outer Join


- 왼쪽, 오른쪽 DataFrame의 모든 데이터 출력 +
- 왼쪽 DataFrame 중 <strong><u>오른쪽 DataFrame에 있는 Data는 NaN으로 처리</u></strong>
- 오른쪽 DataFrame 중 <strong><u>왼쪽 DataFrame에 없는 Data는 NaN으로 처리</u></strong>  

<div class = "CenterImg">
<img src = "./img/Merge_4.jpg" />
</div>

DF1과 DF2를 Outer Join


```python
pd.merge(left = DF1 , right = DF2, how = "outer", on = "이름")
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
      <th>이름</th>
      <th>키</th>
      <th>몸무게</th>
      <th>포지션</th>
      <th>실력</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>싸이</td>
      <td>180.0</td>
      <td>75.0</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>1</th>
      <td>덕구</td>
      <td>160.0</td>
      <td>65.0</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
    <tr>
      <th>2</th>
      <td>또치</td>
      <td>170.0</td>
      <td>75.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>똥갈</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>수비수</td>
      <td>잘함</td>
    </tr>
  </tbody>
</table>
</div>



## 3.2 같은 Index 기준으로 합치기

<ul><li><span style = "color:red"><strong>set_index("컬럼명")</strong></span> : <strong>컬럼명의 데이터가 Index로 설정</strong>, <u>컬럼데이터는 삭제</u>됨  </li></ul>


```python
DF1 = DF1.set_index("이름")
DF1
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
    <tr>
      <th>이름</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
    </tr>
    <tr>
      <th>또치</th>
      <td>170</td>
      <td>75</td>
    </tr>
  </tbody>
</table>
</div>




```python
DF2 = DF2.set_index("이름")
DF2
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
      <th>포지션</th>
      <th>실력</th>
    </tr>
    <tr>
      <th>이름</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>싸이</th>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
    <tr>
      <th>똥갈</th>
      <td>수비수</td>
      <td>잘함</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(left = DF1, right = DF2, left_index = True, right_index = True, how = "inner")
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
      <th>포지션</th>
      <th>실력</th>
    </tr>
    <tr>
      <th>이름</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.concat([DF1,DF2],axis = 1, join = 'inner')
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
      <th>포지션</th>
      <th>실력</th>
    </tr>
    <tr>
      <th>이름</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
      <td>포워드</td>
      <td>잘함</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
      <td>미드필더</td>
      <td>못함</td>
    </tr>
  </tbody>
</table>
</div>



## 3.3 행기준으로 합치기

<ul>
    <li>같은 컬럼명이 존재하면, 데이터 저장</li>
    <li>다른 컬럼명이 존재하면, 해당 컬럼이 있는 DataFrame은 데이터 저장, <strong><u>없는 DataFrame은 NaN 처리</u></strong></li>
    <li>일반적으로 concat보다 append가 더 빠름</li>
</ul>


```python
DF3 = DataFrame([[187, 80, 30], [190,85, 20]], columns = ["키","몸무게","나이"], index = ["거북이","깜디"])
DF3
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
      <th>거북이</th>
      <td>187</td>
      <td>80</td>
      <td>30</td>
    </tr>
    <tr>
      <th>깜디</th>
      <td>190</td>
      <td>85</td>
      <td>20</td>
    </tr>
  </tbody>
</table>
</div>




```python
DF1.append(DF3, sort=False)
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
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>또치</th>
      <td>170</td>
      <td>75</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>거북이</th>
      <td>187</td>
      <td>80</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>깜디</th>
      <td>190</td>
      <td>85</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.concat([DF1, DF3], axis = 0, sort=False)
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
      <th>싸이</th>
      <td>180</td>
      <td>75</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>덕구</th>
      <td>160</td>
      <td>65</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>또치</th>
      <td>170</td>
      <td>75</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>거북이</th>
      <td>187</td>
      <td>80</td>
      <td>30.0</td>
    </tr>
    <tr>
      <th>깜디</th>
      <td>190</td>
      <td>85</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
</div>



위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_3_DataFrame_Merge.ipynb) Github에서도 확인 할 수 있습니다.  


다음 포스팅은 Pandas 데이터의 파일 입출력에 대해 알아볼 예정입니다.  

감사합니다.
