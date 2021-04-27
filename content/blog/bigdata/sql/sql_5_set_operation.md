---
title: "[SQL]5. 집합 연산자"
category: "빅데이터분석/sql"
date: "2021-04-06"
tags: ["분석 함수", "Analytic Function"]
---

# 1. 집합 연산자 종류

| 이름          | 기능                                     |
| ------------- | ---------------------------------------- |
| **UNION**     | 두 집합을 합친다.(중복 데이터 제거)      |
| **UNION ALL** | 두 집합을 합친다.(중복 데이터 모두 출력) |
| **INTERSECT** | 두 집합 모두 가지는 데이터만 출력        |
| **EXCEPT**    | 앞 집합에서 뒷 집합을 제외한 결과 출력   |

- 예제 데이터

```sql
-- SALE1 Table
CREATE TABLE SALE1
(
NAME VARCHAR(50)
, AMOUNT NUMERIC(15,2)
);
INSERT INTO SALE1
VALUES
('Mike', 150)
, ('Jon', 132)
, ('Mary', 100)
;

SELECT * FROM SALE1;
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Mike</td>
      <td>150.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Jon</td>
      <td>132.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
  </tbody>
</table>
</div>

```sql
-- SALE2 Table
CREATE TABLE SALE2
(
NAME VARCHAR(50)
, AMOUNT NUMERIC(15,2)
);
INSERT INTO SALE2
VALUES
('Mike', 120)
, ('Jon', 142)
, ('Mary', 100)
;

SELECT * FROM SALE2;
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Mike</td>
      <td>120.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Jon</td>
      <td>142.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
  </tbody>
</table>
</div>

# 2. UNION

- 두 집합을 합치며, 중복 데이터는 제거 된다.
- 중복 데이터인 Mary는 중복 제거 후 1건만 출력됨

```sql
SELECT * FROM SALE1
UNION
SELECT * FROM SALE2
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Jon</td>
      <td>132.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mike</td>
      <td>120.00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Jon</td>
      <td>142.00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Mike</td>
      <td>150.00</td>
    </tr>
  </tbody>
</table>
</div>

# 3.UNION ALL

- 두 집합을 합치며, 중복 데이터도 모두 출력된다.
- 중복 데이터인 Mary도 2건 모두 출력

```sql
SELECT * FROM SALE1
UNION ALL
SELECT * FROM SALE2
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Mike</td>
      <td>150.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Jon</td>
      <td>132.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Mike</td>
      <td>120.00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Jon</td>
      <td>142.00</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
  </tbody>
</table>
</div>

# 4.INTERSECT

- 두 집합 모두 가지는 데이터만 출력한다.
- 중복 데이터인 Mary만 출력

```sql
SELECT * FROM SALE1
INTERSECT
SELECT * FROM SALE2
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Mary</td>
      <td>100.00</td>
    </tr>
  </tbody>
</table>
</div>

# 5.EXCEPT

- 앞 집합에서 뒷 집합을 제외한 모든 데이터를 출력
- JON, MIKE, MARY에서 중복된 MARY만 제외 후 출력

```sql
SELECT * FROM SALE1
EXCEPT
SELECT * FROM SALE2
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
      <th>name</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Jon</td>
      <td>132.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Mike</td>
      <td>150.00</td>
    </tr>
  </tbody>
</table>
</div>

# \# 참고

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
