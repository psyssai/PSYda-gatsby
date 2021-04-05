---
title: "[SQL]4. 분석 함수"
category: "빅데이터분석/sql"
date: "2021-04-05"
tags: ["분석 함수", "Analytic Function"]
---

# 1. 분석 함수(Analytic Function)

- 분석 함수란?

  - 테이블의 행을 특정 그룹별로 그루핑하여 편리하게 함수를 적용하는 것

- Sample 데이터 생성 SQL

```sql
-- 1. PRODUCT_GROUP 테이블 생성
CREATE TABLE PRODUCT_GROUP (
GROUP_ID SERIAL PRIMARY KEY,
GROUP_NAME VARCHAR (255) NOT NULL
);

-- 1.1 PRODUCT_GROUP 데이터 삽입
INSERT INTO PRODUCT_GROUP (GROUP_NAME)
VALUES
('Smartphone')
, ('Laptop')
, ('Tablet');

SELECT * FROM PRODUCT_GROUP
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
      <th>group_id</th>
      <th>group_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Smartphone</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Laptop</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Tablet</td>
    </tr>
  </tbody>
</table>
</div>

```sql
-- 2. PRODUCT 테이블 생성
CREATE TABLE PRODUCT (
PRODUCT_ID SERIAL PRIMARY KEY
, PRODUCT_NAME VARCHAR (255) NOT NULL
, PRICE DECIMAL (11, 2)
, GROUP_ID INT NOT NULL
, FOREIGN KEY (GROUP_ID)
REFERENCES PRODUCT_GROUP (GROUP_ID)
);

-- 2.1 PRODUCT 데이터 삽입
INSERT INTO PRODUCT (PRODUCT_NAME,
GROUP_ID,PRICE)
VALUES
('Microsoft Lumia', 1, 200)
, ('HTC One', 1, 400)
, ('Nexus', 1, 500)
, ('iPhone', 1, 900)
, ('HP Elite', 2, 1200)
, ('Lenovo Thinkpad', 2, 700)
, ('Sony VAIO', 2, 700)
, ('Dell Vostro', 2, 800)
, ('iPad', 3, 700)
, ('Kindle Fire', 3, 150)
, ('Samsung Galaxy Tab', 3, 200);

SELECT * FROM PRODUCT
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
      <th>product_id</th>
      <th>product_name</th>
      <th>price</th>
      <th>group_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Microsoft Lumia</td>
      <td>200</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>HTC One</td>
      <td>400</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Nexus</td>
      <td>500</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>iPhone</td>
      <td>900</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>HP Elite</td>
      <td>1200</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>Lenovo Thinkpad</td>
      <td>700</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>Sony VAIO</td>
      <td>700</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>Dell Vostro</td>
      <td>800</td>
      <td>2</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>iPad</td>
      <td>700</td>
      <td>3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>Kindle Fire</td>
      <td>150</td>
      <td>3</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>Samsung Galaxy Tab</td>
      <td>200</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

# 2. OVER절

- OVER절?
  - GROUP BY의 한계를 개선하기 위해 나온 함수
  - 집계 함수의 결과를 테이블에 바로 보여줌

```sql
SELECT *
      , COUNT(*) OVER()
FROM PRODUCT
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
      <th>product_id</th>
      <th>product_name</th>
      <th>price</th>
      <th>group_id</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Microsoft Lumia</td>
      <td>200</td>
      <td>1</td>
      <td>11</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>HTC One</td>
      <td>400</td>
      <td>1</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Nexus</td>
      <td>500</td>
      <td>1</td>
      <td>11</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>iPhone</td>
      <td>900</td>
      <td>1</td>
      <td>11</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>HP Elite</td>
      <td>1200</td>
      <td>2</td>
      <td>11</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>Lenovo Thinkpad</td>
      <td>700</td>
      <td>2</td>
      <td>11</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>Sony VAIO</td>
      <td>700</td>
      <td>2</td>
      <td>11</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>Dell Vostro</td>
      <td>800</td>
      <td>2</td>
      <td>11</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>iPad</td>
      <td>700</td>
      <td>3</td>
      <td>11</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>Kindle Fire</td>
      <td>150</td>
      <td>3</td>
      <td>11</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>Samsung Galaxy Tab</td>
      <td>200</td>
      <td>3</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
</div>

# 3. OVER ... PARTITION BY 절

- PARTITION BY 절?
  - GROUP BY와 비슷한 기능으로 OVER절, 분석함수와 같이 사용
  - 특정 칼럼으로 그룹핑 하여 앞의 집계 함수를 그룹별로 적용

```sql
SELECT
	A.PRODUCT_NAME
	, A.PRICE
	, B.GROUP_NAME
	, AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME)
FROM
PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>price</th>
      <th>group_name</th>
      <th>avg</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>HP Elite</td>
      <td>1200</td>
      <td>Laptop</td>
      <td>850</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>700</td>
      <td>Laptop</td>
      <td>850</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Sony VAIO</td>
      <td>700</td>
      <td>Laptop</td>
      <td>850</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Dell Vostro</td>
      <td>800</td>
      <td>Laptop</td>
      <td>850</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>200</td>
      <td>Smartphone</td>
      <td>500</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>400</td>
      <td>Smartphone</td>
      <td>500</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>500</td>
      <td>Smartphone</td>
      <td>500</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>900</td>
      <td>Smartphone</td>
      <td>500</td>
    </tr>
    <tr>
      <th>8</th>
      <td>iPad</td>
      <td>700</td>
      <td>Tablet</td>
      <td>350</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Kindle Fire</td>
      <td>150</td>
      <td>Tablet</td>
      <td>350</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Samsung Galaxy Tab</td>
      <td>200</td>
      <td>Tablet</td>
      <td>350</td>
    </tr>
  </tbody>
</table>
</div>

# 4. ROW \_NUMBER, RANK, DENSE_RANK 함수

- 그룹에서 특정 컬럼의 순위를 구하는 함수

  | 함수명                                          | 내용                                                                                          |
  | ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
  | <span style= "color:blue">**ROW_NUMBER**</span> | - 같은 순위면 중복 상관 없이 순서대로 순위 구함<br> - EX) 10,20,20,30 일 때 -> 순위 : 1,2,3,4 |
  | <span style= "color:blue">**RANK**</span>       | - 같은 순위면 다음 순위로 건너뜀<br> - EX) 10,20,20,30 일 때 -> 순위 : 1,2,2,4                |
  | <span style= "color:blue">**DENSE_RANK**</span> | - 같은 순위면 다음 순위로 건너뛰지 않음<br> -EX) 10,20,20,30 일 때 -> 순위 : 1,1,2,3          |

- ROW_NUMBER

```sql
SELECT
	A.PRODUCT_NAME
	, B.GROUP_NAME
	, A.PRICE
	, ROW_NUMBER () OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>row_number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>4</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>1</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

- RANK

```sql
SELECT
	A.PRODUCT_NAME
	, B.GROUP_NAME
	, A.PRICE
	, RANK () OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>rank</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>4</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>1</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

- DENSE_RANK

```sql
SELECT
	A.PRODUCT_NAME
	, B.GROUP_NAME
	, A.PRICE
	, DENSE_RANK () OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>dense_rank</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>4</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>1</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

# 5. FIRST \_VALUE , LAST_VALUE 함수

- 그룹안에서 특정컬럼의 첫 번째 값 또는 마지막 값을 구하는 함수

- FIRST_VALUE(컬럼명)
  - 그룹안에서 컬럼명의 첫 번째 값을 구함

```sql
SELECT
  A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
  , FIRST_VALUE (A.PRICE) over (
      PARTITION BY B.GROUP_NAME ORDER BY A.PRICE
      ) AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>lowest_price_per_group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>700</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>700</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>700</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>700</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>200</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>200</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>200</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>200</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>150</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>150</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>150</td>
    </tr>
  </tbody>
</table>
</div>

- LAST_VALUE(컬럼명)

  - 그룹안에서 컬럼명의 마지막 값을 구함
  - 범위 지정 옵션 : 옵션 범위 기준 마지막값을 구함

    | 옵션                                                                                           | 내용                         |
    | ---------------------------------------------------------------------------------------------- | ---------------------------- |
    | <span style= "color:blue">**RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING**</span> | 첫 번째 로우부터 마지막 로우 |
    | <span style= "color:blue">**RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW**</span>         | 첫 번째 로우부터 현재 로우   |

```sql
SELECT
  A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
  , LAST_VALUE (A.PRICE) OVER(
    PARTITION BY B.GROUP_NAME ORDER BY A.PRICE
    RANGE BETWEEN UNBOUNDED PRECEDING
    AND UNBOUNDED FOLLOWING
  ) AS HIGHEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>upper_price_per_group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1200</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>1200</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>1200</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>1200</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>900</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>900</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>900</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>900</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>700</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>700</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>700</td>
    </tr>
  </tbody>
</table>
</div>

# 6. LAG, LEAD 함수

- 그룹안에서 특정 컬럼의 이전 행 또는 다음 행 값을 구함

| 함수                                      | 내용                |
| ----------------------------------------- | ------------------- |
| <span style= "color:blue">**LAG**</span>  | 이전 행의 값을 구함 |
| <span style= "color:blue">**LEAD**</span> | 다음행의 값을 구함  |

- LAG

```sql
SELECT A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
, 			LAG (A.PRICE, 1) OVER (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS PREV_PRICE
, A.PRICE - LAG (A.PRICE, 1) OVER (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS CUR_PREV_DIFF
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>prev_price</th>
      <th>cur_prev_diff</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>700.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>700.00</td>
      <td>100.00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>800.00</td>
      <td>400.00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>200.00</td>
      <td>200.00</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>400.00</td>
      <td>100.00</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>500.00</td>
      <td>400.00</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>150.00</td>
      <td>50.00</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>200.00</td>
      <td>500.00</td>
    </tr>
  </tbody>
</table>
</div>

- LEAD

```sql
SELECT A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
, 			LEAD (A.PRICE, 1) OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS NEXT_PRICE
, A.PRICE - LEAD (A.PRICE, 1) OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE )AS CUR_NEXT_DIFF
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
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
      <th>product_name</th>
      <th>group_name</th>
      <th>price</th>
      <th>prev_price</th>
      <th>cur_prev_diff</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sony VAIO</td>
      <td>Laptop</td>
      <td>700</td>
      <td>700.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lenovo Thinkpad</td>
      <td>Laptop</td>
      <td>700</td>
      <td>800.00</td>
      <td>-100.00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Dell Vostro</td>
      <td>Laptop</td>
      <td>800</td>
      <td>1200.00</td>
      <td>-400.00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HP Elite</td>
      <td>Laptop</td>
      <td>1200</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Microsoft Lumia</td>
      <td>Smartphone</td>
      <td>200</td>
      <td>400.00</td>
      <td>-200.00</td>
    </tr>
    <tr>
      <th>5</th>
      <td>HTC One</td>
      <td>Smartphone</td>
      <td>400</td>
      <td>500.00</td>
      <td>-100.00</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nexus</td>
      <td>Smartphone</td>
      <td>500</td>
      <td>900.00</td>
      <td>-400.00</td>
    </tr>
    <tr>
      <th>7</th>
      <td>iPhone</td>
      <td>Smartphone</td>
      <td>900</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Kindle Fire</td>
      <td>Tablet</td>
      <td>150</td>
      <td>200.00</td>
      <td>-50.00</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Samsung Galaxy Tab</td>
      <td>Tablet</td>
      <td>200</td>
      <td>700.00</td>
      <td>-500.00</td>
    </tr>
    <tr>
      <th>10</th>
      <td>iPad</td>
      <td>Tablet</td>
      <td>700</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

# \# 참고

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
