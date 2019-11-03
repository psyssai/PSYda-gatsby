---  
title: "[Pandas 기초]5.Pandas의 파일 입출력"  
category : "빅데이터분석/Pandas"  
date: "2019-08-20"  
tags: ["encoding","read_csv", "read_excel", "파일읽기", "파일쓰기"]  
---

안녕하세요. PSYda입니다.  

이번 포스팅에서는 Pandas 데이터의 파일 입출력 방법에 대해 알아보겠습니다.  

실습에 필요한 파일은 [여기](/data/data.zip)에서 다운로드 받을 수 있습니다.

소개할 내용은 아래와 같습니다.  

<div id="summary">
<ul>
    <li>텍스트 파일 입력을 위한 <strong><span style = "color:red">read_csv</strong></span> 함수 소개</li>
    <li>엑셀 파일 입력을 위한 <strong><span style = "color:red">read_excel</strong></span> 함수 소개</li>
    <li>DataFrame의 텍스트 파일 출력을 위한 <strong><span style = "color:red">to_csv</strong></span> 함수 소개</li>
        <li>DataFrame의 엑셀 파일 출력을 위한 <strong><span style = "color:red">to_excel</strong></span> 함수 소개</li>
        
</ul>
    

</div>

# 4. Pandas 파일 입출력

Pandas로 입출력 할 수 있는 파일 포맷은 매우 다양하지만 대표적으로 아래와 같습니다.

- CSV, Excel, HTML, JSON 등

이번에는 <strong><u><span style="color:red">CSV 및 Excel File을 입출력하는 방법</span></u></strong>을 알아보겠습니다.  

예제에 사용하기 위한 데이터를 확보하기 위해 [kaggle에서 fifa19 선수 Dataset](https://www.kaggle.com/karangadiya/fifa19)을 다운로드 받았으며, 실습에 사용하기 위해 변형하였습니다.

## 4.1 파일 입력

### 4.1.1 (구분자가 있는)텍스트 파일 및 CSV 파일 읽기

Pandas에서 **<span style="color:red">read_csv 함수</span>**를 이용하여 텍스트 파일 및 CSV 파일을 읽을 수 있으며, 읽은 데이터는 **DataFrame**형태로 저장됩니다.  
read_csv 함수 사용법은 아래와 같습니다.

<span class = "hlblock"> pd.read_csv(FilePath, sep, header, names, index_col, skiprows, nrows, encoding, comment, chunksize)</span>

- <strong>FilePath</strong> : 읽을 파일 Path, URL 도 가능
- <strong>sep</strong> : 구분자 입력, Default 는 쉼표(',')
- <strong>header</strong> : 파일의 데이터에 header가 없을 경우 none 입력, Default는 header 읽음
- <strong>names</strong> : 파일의 데이터에 header가 없을 경우에 명시적으로 컬럼명 입력 가능
- <strong>skiprows</strong> : 입력한 개수 만큼 파일에서 행을 건너뛰고 읽음
- <strong>index_col</strong> : 명시한 특정 컬럼을 index로 사용
- <strong>nrows</strong> : 파일 최상위에서부터 입력한 개수만큼의 데이터만 읽음
- <strong>encoding</strong> : 파일의 문자 인코딩 타입 입력, 한글이면 'CP949'
- <strong>comment</strong> : 특정 문자는 주석으로 간주하고 읽지 않음
- <strong>chunksize</strong> : TextFileReader가 입력받을 데이터 개수 Return하여 특정 개수 만큼 순서대로 읽음(뒤에 예시 참고)

pandas libary를 import


```python
import pandas as pd
from pandas import Series, DataFrame
```

#### 4.1.1.1 read_csv(별도 옵션 없이)

- 일반 text 파일 또는 csv을 읽어서 DataFrame에 저장
- 쉼표(',')를 기준으로 Data를 나누고 읽음

별도의 설정 없이 csv File 읽기


```python
fifa19Player = pd.read_csv("data/Ch4_1_fifa.csv")
fifa19Player.head(5)
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.2 sep 옵션


- 공백, 탭, 다른 기호 등으로 데이터가 분리된 파일일 경우 사용
- <strong><u>공백의 경우 정규식 '\s+' 을 사용</u></strong>함(공백이 하나 이상 발생한 경우 구분하는 정규식)

구분자를 공백으로 주고 csv File 읽기


```python
data1 = pd.read_csv('data/Ch4_2_sep.txt', sep='\s+')
data1
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.3 header 옵션


- Default 값은 첫 행을 Header로 간주
- 첫 행이 Header가 아닐 경우 None 을 입력해주면, 첫 행도 데이터로 저장
- 왼쪽부터 0부터 순서대로 컬럼명 부여


header가 없는 File 읽기


```python
data2 = pd.read_csv('data/Ch4_3_header.txt', sep='\s+', header = None)
data2
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
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.4 names 옵션

- 첫 행이 Header가 아닐 경우 명시적으로 컬럼명 입력 가능


header가 없응 File 읽을 때 컬럼명 명시


```python
data3 = pd.read_csv('data/Ch4_3_header.txt', sep='\s+', names = ['Index', 'ID', 'Player', 'Age'])
data3
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
      <th>Index</th>
      <th>ID</th>
      <th>Player</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.5 skiprosw 옵션

- 읽고 싶지 않은 행(MetaData 등)을 제외 할 수 있음
- 특정 행을 읽는데 에러가 생기는 경우 제외 할 수 있음

특정 행을 제외하고 파일 읽기


```python
data4 = pd.read_csv("data/Ch4_4_skiprows.txt", sep='\s+', skiprows = [0,1], header = None)
data4
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
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.6 index_col 옵션

- 특정 컬럼명을 Index열로 저장

index 컬럼을 Index로 설정


```python
data5 = pd.read_csv('data/Ch4_5_index_col.txt', index_col = 'Index')
data5
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
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
    <tr>
      <th>Index</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.7 nrows 옵션

- 위에서부터 입력한 개수 만큼의 데이터만 읽음
- 데이터량이 많아 메모리에 문제가 예상될 때 사용 할 수 있음

3개의 row만 읽기


```python
data6= pd.read_csv('data/Ch4_5_index_col.txt', nrows = 3)
data6
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.8 encoding 옵션

- 데이터 encoding 이 맞지 않아 문자가 깨지거나 오류가 생길 때 설정
- 한글의 경우 'CP949' 를 적용하면 깨지지 않음

CP949 encoding 적용!


```python
data7= pd.read_csv('data/Ch4_6_encoding.txt', encoding = 'CP949')
data7
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
      <th>Index</th>
      <th>ID</th>
      <th>이름</th>
      <th>나이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.9 comment 옵션

- 특정 문자가 있는 행은 주석으로 간주하고 읽지 않고 건너뜀

'/' 문자는 주석이므로 읽기 않음


```python
data5 = pd.read_csv('data/Ch4_5_comment.txt', comment = '/')
data5
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>192985</td>
      <td>K.DeBruyne</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.1.10 chunksize 옵션

- 특정 개수만큼 순서대로 입력 받을 수 있는 TextFileReader 객체를 생성
- next(TextFileReader객체) 구문을 이용해 특정 개수만큼 순서대로 데이터 입력
- 데이터량이 많아서 한번에 불러올 수 없는 경우에 사용

2개씩 데이터 입력


```python
TextFileReader = pd.read_csv('data/Ch4_1_fifa.csv', chunksize = 2)
```


```python
next(TextFileReader)
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L.Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>20801</td>
      <td>CristianoRonaldo</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 한번 더 하면 그 다음 500개 가 순서대로 출력
next(TextFileReader)
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
      <th>Index</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>190871</td>
      <td>NeymarJr</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>193080</td>
      <td>DeGea</td>
      <td>27</td>
    </tr>
  </tbody>
</table>
</div>



### 4.1.2 Excel 파일 읽기

**read_excel** 함수를 이용하여 excel 파일을 읽어 올 수 있으며 대부분의 옵션들은 read_csv와 동일합니다. 

자주 사용되는 옵션들 위주로 알아보겠습니다.

<span class="hlblock">read_excel(Path, sheet_name)</span>

- **Path** : excel 파일 경로
- **sheet_name** : 읽을 Sheet name 명시



#### 4.1.2.1 read_excel(별도 옵션 없이) 


```python
fifa = pd.read_excel('data/Ch4_9_fifa19.xlsx')
fifa
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
      <th>Unnamed: 0</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>158023</td>
      <td>L. Messi</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>7</td>
      <td>176580</td>
      <td>L. Suárez</td>
      <td>31</td>
    </tr>
    <tr>
      <th>2</th>
      <td>18</td>
      <td>192448</td>
      <td>M. ter Stegen</td>
      <td>26</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20</td>
      <td>189511</td>
      <td>Sergio Busquets</td>
      <td>29</td>
    </tr>
    <tr>
      <th>4</th>
      <td>32</td>
      <td>189242</td>
      <td>Coutinho</td>
      <td>26</td>
    </tr>
  </tbody>
</table>
</div>



#### 4.1.2.2 sheet_name

- 명시한 Sheet name만 읽음
- Default는 첫 번째 Sheet
- None을 입력하면 모든 Sheet를 key = Sheetname, value = Data 로 가져옴

Tottenham sheet 읽기


```python
Tottenham = pd.read_excel('data/Ch4_9_fifa19.xlsx', sheet_name = 'Tottenham')
Tottenham
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
      <th>Unnamed: 0</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>16</td>
      <td>202126</td>
      <td>H. Kane</td>
      <td>24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>31</td>
      <td>190460</td>
      <td>C. Eriksen</td>
      <td>26</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37</td>
      <td>167948</td>
      <td>H. Lloris</td>
      <td>31</td>
    </tr>
    <tr>
      <th>3</th>
      <td>125</td>
      <td>200104</td>
      <td>H. Son</td>
      <td>25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>71</td>
      <td>184087</td>
      <td>T. Alderweireld</td>
      <td>29</td>
    </tr>
  </tbody>
</table>
</div>




```python
AllTeam = pd.read_excel('data/Ch4_9_fifa19.xlsx', sheet_name = None)
```


```python
AllTeam.keys()
```




    odict_keys(['FCBarcelona', 'Tottenham', 'ManUnited'])




```python
AllTeam['ManUnited']
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
      <th>Unnamed: 0</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3</td>
      <td>193080</td>
      <td>De Gea</td>
      <td>27</td>
    </tr>
    <tr>
      <th>1</th>
      <td>45</td>
      <td>195864</td>
      <td>P. Pogba</td>
      <td>25</td>
    </tr>
    <tr>
      <th>2</th>
      <td>47</td>
      <td>192505</td>
      <td>R. Lukaku</td>
      <td>25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>93</td>
      <td>184941</td>
      <td>A. Sánchez</td>
      <td>29</td>
    </tr>
    <tr>
      <th>4</th>
      <td>116</td>
      <td>211300</td>
      <td>A. Martial</td>
      <td>22</td>
    </tr>
  </tbody>
</table>
</div>



한번에 세 개의 팀을 저장 할 수도 있음


```python
Barcelona, Tottenham, ManUTD = AllTeam.values()
```


```python
Tottenham
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
      <th>Unnamed: 0</th>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>16</td>
      <td>202126</td>
      <td>H. Kane</td>
      <td>24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>31</td>
      <td>190460</td>
      <td>C. Eriksen</td>
      <td>26</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37</td>
      <td>167948</td>
      <td>H. Lloris</td>
      <td>31</td>
    </tr>
    <tr>
      <th>3</th>
      <td>125</td>
      <td>200104</td>
      <td>H. Son</td>
      <td>25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>71</td>
      <td>184087</td>
      <td>T. Alderweireld</td>
      <td>29</td>
    </tr>
  </tbody>
</table>
</div>



## 4.2 파일 출력

파일 입력과 마찬가지로 Pandas는 다양한 데이터로의 출력을 지원하지만 가장 많이 사용하는 csv, excel 에 관해서만 알아보겠습니다.

### 4.2.1 (구분자가 있는)텍스트 파일 및 CSV 로 출력

Pandas에서는 DataFame 데이터를 to_csv 함수를 이용하여 텍스트 파일 및 CSV 파일로 출력할 수 있습니다.

**to_csv**도 read_csv와 비슷한 옵션들을 가지고 있기 떄문에, 옵션에 대한 설명은 넘어가도록 하겠습니다.


```python
Tottenham.to_csv('data/Tottenham.csv')
```

### 4.2.2 Excel 로 출력

**to_excel** 함수를 이용해 DataFrame 데이터를 Excel 파일로 출력할 수 있습니다.

마찬가지로 옵션에 대한 설명은 넘어가도록 하겠습니다.


```python
ManUTD.to_excel('data/ManUTD.xlsx')
```

위의 Jupyter notebook 내용은 [여기](https://github.com/psyssai/PandasBasic/blob/master/PandasBasic_4_DataFrame_FileIO.ipynb) Github에서도 확인 할 수 있습니다.  


다음 포스팅은 Pandas 데이터의 파일 입출력에 대해 알아볼 예정입니다.    

감사합니다.
