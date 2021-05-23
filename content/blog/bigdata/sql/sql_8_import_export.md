---
title: "[SQL]8. 데이터 IMPORT/EXPORT"
category: "빅데이터분석/sql"
date: "2021-04-09"
tags: ["IMPORT"]
---

# 1. EXPORT

- 테이블의 데이터를 다른 형태 데이터로 추출하는 작업

# 1.1 문법

- <span style= "color:blue">**COPY**</span> 테이블명(칼럼1, 칼럼2,..) <span style= "color:blue">**TO**</span> '경로' <span style= "color:blue">**DELIMITER**</span> ',' <span style= "color:blue">**CSV HEADER**</span>
  - <span style= "color:blue">**COPY**</span> : 추출할 테이블과 컬럼들을 지정
  - <span style= "color:blue">**TO**</span> : 추출할 경로를 지정(폴더가 미리 존재해야함)
  - <span style= "color:blue">**DELIMITER**</span> : CSV 파일의 구분자 지정
  - <span style= "color:blue">**CSV HEADER**</span> : HEADER 가 있으면 헤더 추가됨

# 1.2 예제

- CATEGORY 테이블을 DB_CATEGORY.csv 파일로 출력

```sql
COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE)
TO 'D:\DB_CATEGORY.csv'
DELIMITER ','
CSV HEADER
;
```

# 2. IMPORT

- 다른 데이터를 테이블에 넣는 작업

# 2.1 문법

- <span style= "color:blue">**COPY**</span> 테이블명(칼럼1, 칼럼2,..) <span style= "color:blue">**FROM**</span> '경로' <span style= "color:blue">**DELIMITER**</span> ',' <span style= "color:blue">**CSV HEADER**</span>
  - <span style= "color:blue">**COPY**</span> : 적재할 테이블과 컬럼들을 지정
  - <span style= "color:blue">**FROM**</span> : 적재할 파일 경로를 지정(폴더가 미리 존재해야함)
  - <span style= "color:blue">**DELIMITER**</span> : CSV 파일의 구분자 지정
  - <span style= "color:blue">**CSV HEADER**</span> : HEADER 가 있으면 첫행을 헤더로 인식

# 2.2 예제

- 데이터 적재를 할 테이블 생성

```sql
CREATE TABLE CATEGORY_IMPORT
(
CATEGORY_ID SERIAL NOT NULL
, "NAME" VARCHAR(25) NOT NULL
, LAST_UPDATE TIMESTAMP NOT NULL DEFAULT NOW()
, CONSTRAINT CATEGORY_IMPORT_PKEY PRIMARY KEY (CATEGORY_ID)
);
```

- 데이터 적재

```sql
COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE)
FROM 'D:\DB_CATEGORY.csv'
DELIMITER ','
CSV HEADER
;
SELECT * FROM CATEGORY_IMPORT;
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
      <th>category_id</th>
      <th>NAME</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Action</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Animation</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Children</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>Classics</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>Comedy</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>Documentary</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>Drama</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>Family</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>Foreign</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>Games</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>Horror</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>Music</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>New</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>Sci-Fi</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>Sports</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>Travel</td>
      <td>2006-02-15 09:46:27</td>
    </tr>
  </tbody>
</table>
</div>

# 참고

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
