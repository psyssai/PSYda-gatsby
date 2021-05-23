---
title: "[SQL]7. 데이터 조작"
category: "빅데이터분석/sql"
date: "2021-04-08"
tags: ["데이터 조작"]
---

# 1. INSERT문

- 테이블 안에 데이터를 삽입하는 명령어

# 1.1 문법

- <span style= "color:blue">**INSERT INTO**</span> 테이블명 <span style= "color:blue">**VALUES**</span>(v1,v2,...)
- <span style= "color:blue">**INSERT INTO**</span> 테이블명(칼럼명1, 칼럼명2,..) <span style= "color:blue">**VALUES**</span>(v1, v2,...)

# 1.2 예제

- 실습용 테이블 생성

```sql
CREATE TABLE LINK (
ID SERIAL PRIMARY KEY
, URL VARCHAR (255) NOT NULL
, NAME VARCHAR (255) NOT NULL
, DESCRIPTION VARCHAR (255)
, REL VARCHAR (50)
);

SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>

- 1개의 데이터 행 추가

```sql
INSERT INTO LINK (URL, NAME)
VALUES ('http://naver.com','Naver');
COMMIT;

SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- 작은따옴표를 데이터로 입력

```sql
INSERT INTO LINK(URL, NAME)
VALUES ('''http://naver.com''', '''Naver''');
COMMIT;

SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- 여러 개의 데이터 행 추가

```sql
INSERT INTO LINK(URL, NAME)
VALUES ('http://www.google.com','Google')
	 , ('http://www.yahoo.com' ,'Yahoo')
	 , ('http://www.bing.com'  ,'Bing')
;
COMMIT;

SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- 다른 테이블을 이용해 스키마만 있는 빈 껍데기 테이블 생성

```sql
CREATE TABLE LINK_TMP AS
SELECT * FROM LINK WHERE 0=1;
COMMIT

SELECT * FROM LINK_TMP
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>

- 다른 테이블로부터 SELECT 하여 데이터 삽입

```sql
INSERT INTO LINK_TMP
SELECT * FROM LINK;
COMMIT;

SELECT * FROM LINK_TMP
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

# 2. UPDATE문

- 테이블 안에 데이터를 편집할 때 사용하는 명령어

# 2.1 문법

- <span style= "color:blue">**UPDATE**</span> 테이블명 <span style= "color:blue">**SET**</span> 컬럼명 = 값 <span style= "color:blue">**WHERE**</span> 조건

# 2.2 예제

- name 이 'Naver'인 데이터의 description을 name 컬럼값으로 수정

```sql
UPDATE LINK SET DESCRIPTION = NAME
WHERE NAME = 'Naver'
COMMIT;

SELECT * FROM LINK
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>Naver</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

# 3. UPDATE JOIN 문

- 다른 테이블의 값을 참조하여 한 테이블의 값을 편집할 때 사용하는 명령어

# 3.1 문법

- <span style= "color:blue">**UPDATE**</span> 테이블1 A <span style= "color:blue">**SET**</span> A.컬럼 = 값 <span style= "color:blue">**FROM**</span> 테이블2 B <span style= "color:blue">**WHERE**</span> A.컬럼 = B.컬럼

# 3.2 예제

- 실습용 테이블 생성

```sql
-- PRODUCT_SEGMENT 테이블 생성 및 삽입
CREATE TABLE PRODUCT_SEGMENT
(
ID SERIAL PRIMARY KEY
, SEGMENT VARCHAR NOT NULL
, DISCOUNT NUMERIC (4, 2)
);

INSERT INTO PRODUCT_SEGMENT (SEGMENT, DISCOUNT)
VALUES
('Grand Luxury', 0.05)
, ('Luxury', 0.06)
, ('Mass', 0.1);
COMMIT;

-- PRODUCT 테이블 생성 및 삽입
CREATE TABLE PRODUCT(
ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
, PRICE NUMERIC(10, 2)
, NET_PRICE NUMERIC(10, 2)
, SEGMENT_ID INT NOT NULL
, FOREIGN KEY(SEGMENT_ID)
REFERENCES PRODUCT_SEGMENT(ID)
);
NSERT INTO PRODUCT (NAME, PRICE, SEGMENT_ID)
VALUES
('K5', 804.89, 1)
, ('K7', 228.55, 3)
, ('K9', 366.45, 2)
, ('SONATA', 145.33, 3)
, ('SPARK', 551.77, 2)
, ('AVANTE', 261.58, 3)
, ('LOZTE', 519.62, 2)
, ('SANTAFE', 843.31, 1)
, ('TUSON', 254.18, 3)
, ('TRAX', 427.78, 2)
, ('ORANDO', 936.29, 1)
, ('RAY', 910.34, 1)
, ('MORNING', 208.33, 3)
, ('VERNA', 985.45, 1)
, ('K8', 841.26, 1)
, ('TICO', 896.38, 1)
, ('MATIZ', 575.74, 2)
, ('SPORTAGE', 530.64, 2)
, ('ACCENT', 892.43, 1)
, ('TOSCA', 161.71, 3);
COMMIT;
```

```sql
SELECT * FROM PRODUCT_SEGMENT;
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
      <th>id</th>
      <th>segment</th>
      <th>discount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Grand Luxury</td>
      <td>0.05</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Luxury</td>
      <td>0.06</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Mass</td>
      <td>0.10</td>
    </tr>
  </tbody>
</table>
</div>

```sql
SELECT * FROM PRODUCT;
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
      <th>id</th>
      <th>name</th>
      <th>price</th>
      <th>net_price</th>
      <th>segment_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>K5</td>
      <td>804.89</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>K7</td>
      <td>228.55</td>
      <td>None</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>K9</td>
      <td>366.45</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>SONATA</td>
      <td>145.33</td>
      <td>None</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>SPARK</td>
      <td>551.77</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>AVANTE</td>
      <td>261.58</td>
      <td>None</td>
      <td>3</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>LOZTE</td>
      <td>519.62</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>SANTAFE</td>
      <td>843.31</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>TUSON</td>
      <td>254.18</td>
      <td>None</td>
      <td>3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>TRAX</td>
      <td>427.78</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ORANDO</td>
      <td>936.29</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>RAY</td>
      <td>910.34</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>MORNING</td>
      <td>208.33</td>
      <td>None</td>
      <td>3</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VERNA</td>
      <td>985.45</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>K8</td>
      <td>841.26</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>TICO</td>
      <td>896.38</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>MATIZ</td>
      <td>575.74</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>SPORTAGE</td>
      <td>530.64</td>
      <td>None</td>
      <td>2</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>ACCENT</td>
      <td>892.43</td>
      <td>None</td>
      <td>1</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>TOSCA</td>
      <td>161.71</td>
      <td>None</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

- PRODUCT_SEGMENT의 값을 참조하여 NET_PRICE 계산

```sql
UPDATE PRODUCT A
SET NET_PRICE = A.PRICE - (A.PRICE * B.DISCOUNT)
FROM PRODUCT_SEGMENT B
WHERE A.SEGMENT_ID = B.ID;
COMMIT;
SELECT * FROM PRODUCT;
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
      <th>id</th>
      <th>name</th>
      <th>price</th>
      <th>net_price</th>
      <th>segment_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>K5</td>
      <td>804.89</td>
      <td>764.65</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>K7</td>
      <td>228.55</td>
      <td>205.70</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>K9</td>
      <td>366.45</td>
      <td>344.46</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>SONATA</td>
      <td>145.33</td>
      <td>130.80</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>SPARK</td>
      <td>551.77</td>
      <td>518.66</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>AVANTE</td>
      <td>261.58</td>
      <td>235.42</td>
      <td>3</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>LOZTE</td>
      <td>519.62</td>
      <td>488.44</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>SANTAFE</td>
      <td>843.31</td>
      <td>801.14</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>TUSON</td>
      <td>254.18</td>
      <td>228.76</td>
      <td>3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>TRAX</td>
      <td>427.78</td>
      <td>402.11</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ORANDO</td>
      <td>936.29</td>
      <td>889.48</td>
      <td>1</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>RAY</td>
      <td>910.34</td>
      <td>864.82</td>
      <td>1</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>MORNING</td>
      <td>208.33</td>
      <td>187.50</td>
      <td>3</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VERNA</td>
      <td>985.45</td>
      <td>936.18</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>K8</td>
      <td>841.26</td>
      <td>799.20</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>TICO</td>
      <td>896.38</td>
      <td>851.56</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>MATIZ</td>
      <td>575.74</td>
      <td>541.20</td>
      <td>2</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>SPORTAGE</td>
      <td>530.64</td>
      <td>498.80</td>
      <td>2</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>ACCENT</td>
      <td>892.43</td>
      <td>847.81</td>
      <td>1</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>TOSCA</td>
      <td>161.71</td>
      <td>145.54</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

# 4. DELETE 문

- 테이블의 특정 데이터를 삭제할 때 사용

# 4.1 문법

- <span style= "color:blue">**DELETE FROM**</span> 테이블 <span style= "color:blue">**WHERE**</span> 조건

# 4.2 예제

- LINK 테이블

```sql
SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>Naver</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- LINK_TMP 테이블

```sql
SELECT * FROM LINK_TMP;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- LINK 테이블에서 ID가 5인 행 삭제

```sql
DELETE FROM LINK WHERE ID = 5;
COMMIT;
SELECT * FROM LINK;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>'http://naver.com'</td>
      <td>'Naver'</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>http://www.google.com</td>
      <td>Google</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>http://www.yahoo.com</td>
      <td>Yahoo</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>http://naver.com</td>
      <td>Naver</td>
      <td>Naver</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

- 다른 테이블 값을 참조하여 삭제

```sql
DELETE FROM LINK_TMP A USING LINK B
WHERE A.ID = B.ID
COMMIT;
SELECT * FROM LINK_TMP;
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
      <th>id</th>
      <th>url</th>
      <th>name</th>
      <th>description</th>
      <th>rel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5</td>
      <td>http://www.bing.com</td>
      <td>Bing</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

# 5. UPSERT 문

- INSERT 시도 시에 조건에 따라 UPDATE를 할 수 있는 구문

# 5.1 문법

- <span style= "color:blue">**INSERT INTO**</span> 테이블명(컬럼) <span style= "color:blue">**VALUES**</span>(값) <span style= "color:blue">**ON CONFLICT**</span>(타켓컬럼) 액션
- 액션 종류
  - <span style= "color:blue">**DO NOTHING**</span> : 충돌 시 아무 것도 하지 말라
  - <span style= "color:blue">**DO UPDATE SET ...**</span> : 충돌 시 업데이트 하라

# 5.2 예시

- 실습 테이블 생성(NAME 컬럼에 UNIQUE 제약 조건 설정)

```sql
CREATE TABLE CUSTOMERS
(
CUSTOMER_ID SERIAL PRIMARY KEY
, NAME VARCHAR UNIQUE
, EMAIL VARCHAR NOT NULL
, ACTIVE BOOL NOT NULL DEFAULT TRUE
);

INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
('IBM', 'contact@ibm.com'),
('Microsoft', 'contact@microsoft.com'),
('Intel', 'contact@intel.com');
COMMIT;

SELECT * FROM CUSTOMERS;
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
      <th>customer_id</th>
      <th>name</th>
      <th>email</th>
      <th>active</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>IBM</td>
      <td>contact@ibm.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Microsoft</td>
      <td>contact@microsoft.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Intel</td>
      <td>contact@intel.com</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>

- 이미 있는 NAME 값을 추가 시 아무것도 하지 않음

```sql
INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
(
'Microsoft', 'hotline@microsoft.com'
)
ON CONFLICT (NAME) DO NOTHING;
COMMIT;
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
      <th>customer_id</th>
      <th>name</th>
      <th>email</th>
      <th>active</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>IBM</td>
      <td>contact@ibm.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Microsoft</td>
      <td>contact@microsoft.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Intel</td>
      <td>contact@intel.com</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>

- 이미 있는 NAME 값을 추가 시 email 컬럼에 내용 추가
  - EXCLUDED.EMAIL 은 위에서 INSERT 시도한 EMAIL을 가리킴

```sql
INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES ('Microsoft', 'hotline@microsoft.com')
ON CONFLICT (NAME) DO UPDATE
SET EMAIL = EXCLUDED.EMAIL || ';' || CUSTOMERS.EMAIL;
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
      <th>customer_id</th>
      <th>name</th>
      <th>email</th>
      <th>active</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>IBM</td>
      <td>contact@ibm.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>Intel</td>
      <td>contact@intel.com</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>Microsoft</td>
      <td>hotline@microsoft.com;contact@microsoft.com</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>

# 참고

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
