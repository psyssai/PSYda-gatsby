---
title: "[SQL]1. 데이터 조회와 필터링"
category: "빅데이터분석/sql"
date: "2021-03-23"
tags: ["sql", "select", "fetch", "limit"]
---

# 1\. 데이터 조회

​

- **데이터 조회** - **<span style = "color:blue">SELECT</span> 컬럼명 <span style = "color:blue">FROM</span> 테이블명**
  ​

```sql
SELECT * FROM CUSTOMER;          -- 모든 컬럼 조회
SELECT FIRST_NAME FROM CUSTOMER; -- 특정 컬럼 조회
```

​

- **데이터 정렬** - **<span style = "color:blue">ORDER BY</span> 칼럼명 <span style = "color:blue">ASC</span> => 정렬하기** - ASC : 오름차순 정렬(Default) - DESC : 내림차순 정렬
  ​

```sql
SELECT FIRST_NAME, LAST_NAME FROM CUSTOMER
ORDER BY FIRST_NAME ASC,
    LAST_NAME DESC
```

​

- **중복 제외값 조회** - **SELECT <span style = "color:blue">DISTINCT</span> 칼럼명 FROM 테이블명** - 테이블 내에 존재하는 칼럼명을 중복 제거 후 1개씩만 출력 - **SELECT <span style = "color:blue">DISTINCT ON</span>(칼럼명1) 칼럼명1, 칼럼명2 FROM 테이블명 <span style = "color:blue">ORDER BY</span> 칼럼명1, 칼럼명2 <span style = "color:blue">DESC</span>** - 칼럼명1 기준으로 중복 제고 후 칼럼명2는 DESC 정렬된 맨 위 1개의 값만 보여줌
  ​

# 2\. 데이터 필터링

​

- **조건으로 필터링** - **SELECT 칼럼명 FROM 테이블명 <span style = "color:blue">WHERE</span> 조건** - WHERE절 이하 조건에 따라 테이블 조회
  ​

```sql
SELECT FIRST_NNAME FROM CUSTOMER
WHERE FIRST_NAME='Jamie'
```

​

- **출력 개수로 필터링** - **LIMIT** - **SELECT \* FROM 테이블명 <span style = "color:blue">LIMIT</span> N** - N개행만 출력 - **SELECT \* FROM 테이블명 <span style = "color:blue">LIMIT</span> N <span style = "color:blue">OFFSET</span> M** - M+1번째 행부터 N개 출력 - **FETCH** - **SELECT \* FROM 테이블명 <span style = "color:blue">FETCH FIRST</span> N <span style = "color:blue">ROW ONLY</span>** - N개행만 출력 - N을 입력하지 않으면 1개 행만 출력 - **SELECT \* FROM 테이블명 <span style = "color:blue">OFFSET</span> M <span style = "color:blue">ROWS FETCH FIRST</span> N <span style = "color:blue">ROW ONLY</span>** - M+1번째 행부터 N개 출력
  ​

```sql
-- LIMIT
SELECT * FROM CUSTOMER LIMIT 5          -- 5개 행만 출력
SELECT * FROM CUSTOMER LIMIT 4 OFFSET 3 -- 3+1번째 행부터 4개행 출력
​
-- FETCH
SELECT * FROM CUSTOMER FETCH FIRST 5 ROW ONLY               -- 5개 행만 출력
SELECT * FROM CUSTOMER OFFSET 3 ROWS FETCH FIRST 4 ROW ONLY -- 3+1번째 행부터 4개행 출력
```

​

- **IN 연산자** - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">IN</span> (V1, V2)** - 칼럼명의 값이 V1, V2인 것만 조회 - **SELECT \* FROM 테이블명 WHERE CUSTOMER_ID <span style = "color:blue">NOT IN</span> (V1, V2)** - 칼럼명의 값이 V1, V2가 아닌 것만 조회
  ​

```sql
SELECT * FROM CUSTOMER WHERE CUSTOMER_ID IN (1,2) -- ID가 1,2인 대상 추출
SELECT * FROM CUSTOMER WHERE CUSTOMER_ID NOT IN (1,2) -- ID가 1,2가 아닌 대상 추출
```

​

- **BETWEEN 연산자**
  - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">BETWEEN</span> V1 <span style = "color:blue">AND</span> V2**
    - 칼럼명의 값이 V1 이상이면서 V2 이하인 것만 조회
  - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">NOT BETWEEN</span> V1 <span style = "color:blue">AND</span> V2**
    - 칼럼명의 값이 V1 미만이면서 V2 초과인 것만 조회
- **LIKE 연산자** - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">LIKE</span> 특정패턴** - 칼럼명이 특정 패턴을 갖는 것만 조회 - 특정패턴이 **%** : 길이와 상관없이 아무 문자가 있는 패턴 - 특정패턴이 **\_** : 한 개의 문자가 아무 문자가 있는 패턴
  ​

```sql
-- 이름이 KIM으로 시작하는 고객 추출
SELECT * FROM CUSTOMER
WHERE NAME LIKE 'KIM%';
​
-- 이름이 3자리이고 가운에 문자가 'A' 인 고객 추출
SELECT * FROM CUSTOMER
WHERE NAME LIKE '_A_';
```

​

- **IS NULL 연산자** - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">IS NULL</span>** - 칼럼명의 값이 NULL 인 것만 조회 - **SELECT \* FROM 테이블명 WHERE 칼럼명 <span style = "color:blue">IS NOT NULL</span>** - 칼럼명의 값이 NULL이 아닌 것만 조회
  ​

# \# 참고

​

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
