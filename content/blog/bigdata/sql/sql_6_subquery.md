---
title: "[SQL]6. 서브 쿼리(Sub Query)"
category: "빅데이터분석/sql"
date: "2021-04-07"
tags: ["분석 함수", "sub query"]
---

# 1. 서브 쿼리란?

- SQL 문 내에서 Main 쿼리가 아닌 하위에 존재하는 쿼리
- 서브 쿼리를 활용해 다양한 결과 도출 가능

# 2. 서브 쿼리 종류

- **인라인 뷰(Inline View)**

  - From 절에 위치하여 하나의 Table 용도로 사용되는 서브 쿼리

- **스칼라 서브쿼리(Scalar Sub Query)**

  - 칼럼절에 위치하여 하나의 컬럼 용도로 사용되는 서브 쿼리

- **중첩 서브쿼리(일반 서브쿼리)**
  - where 절에 위치하여 하나의 변수 용도로 사용되는 서브쿼리

```sql
-- ㄱ) 인라인 뷰
SELECT *
FROM PRODUCT A,
    ( SELECT AVG(PRICE) AS AVG_PRICE FROM PRODUCT ) B
WHERE A.PRICE > B.AVG_PRICE;

-- ㄴ) 스칼라 서브 쿼리
SELECT *, ( SELECT AVG(PRICE) FROM PRODUCT) AS AVG_PRICE
FROM PRODUCT A
WHERE A.PRICE > A.AVG_PRICE

-- ㄷ) 중첩 서브 쿼리
SELECT *
FROM PRODUCT
WHERE PRICE > (SELECT AVG(RENTAL_RATE) FROM PRODUCT)
```

# 3. 서브 쿼리 연산자

- 서브 쿼리 결과가 1건 이상일 때 사용하는 연산자
- 종류

| 이름       | 내용                                          |
| ---------- | --------------------------------------------- |
| **ANY**    | 서브 쿼리 결과 중 하나라도 만족하면 조건 성립 |
| **ALL**    | 서브 쿼리 결과의 모든 값이 만족해야 조건 성립 |
| **IN**     | 서브 쿼리 결과에 포함되는지 확인              |
| **EXISTS** | 서브 쿼리 결과에 특정 집합이 존재하는지 확인  |

# 3.1 ANY 연산자

- 서브 쿼리 결과 중 하나라도 만족하면 조건 성립
- 예제 1)
  - 영화 분류별 최대 상영시간 집합 추출
  - 상영시간이 상기 집합 중 하나라도 크거나 같은 영화 출력

```sql
SELECT TITLE, LENGTH FROM FILM
WHERE LENGTH >= ANY
	( SELECT DISTINCT MAX(LENGTH)
	  FROM FILM A INNER JOIN FILM_CATEGORY B
	  ON A.FILM_ID = B.FILM_ID
	  GROUP BY B.CATEGORY_ID
	 )

-- 서브 쿼리 결과 집합은
-- 178, 181, 183, 184, 185 이다.
-- LENGTH가 상기 집합 중 하나의 값 만이라도 크거나 같으면 참
-- 180의 경우 178보다 크므로 참
-- 170의 경우 아무 데이터도 크지 않으므로 거짓
```

- 예제 2)
  - 영화 분류별 최대 상영시간 집합 추출
  - 상영시간이 상기 집합 중 하나라도 같은 영화 출력
  - = ANY의 경우 IN과 같다.

```sql
SELECT TITLE, LENGTH FROM FILM
WHERE LENGTH = ANY
	( SELECT DISTINCT MAX(LENGTH)
	  FROM FILM A INNER JOIN FILM_CATEGORY B
	  ON A.FILM_ID = B.FILM_ID
	  GROUP BY B.CATEGORY_ID
	 )

-- 서브 쿼리 결과 집합은
-- 178, 181, 183, 184, 185 이다.
-- LENGTH가 상기 집합 중 하나의 값 만이라도 같으면 참
-- 178의 경우 178과 동일하므로 참
-- 179의 경우 같은 데이터가 없으므로 거짓
```

## 3.2 ALL 연산자

- 서브 쿼리 결과의 모든 값이 만족해야 조건 성립
- 예제 1)
  - 영화 분류별 최대 상영시간 집합 추출
  - 상영시간이 상기 집합의 모든 데이터 보다 크거나 같은 영화 출력

```sql
SELECT TITLE, LENGTH FROM FILM
WHERE LENGTH >= ALL
	( SELECT DISTINCT MAX(LENGTH)
	  FROM FILM A INNER JOIN FILM_CATEGORY B
	  ON A.FILM_ID = B.FILM_ID
	  GROUP BY B.CATEGORY_ID
	 )

-- 서브 쿼리 결과 집합은
-- 178, 181, 183, 184, 185 이다.
-- LENGTH가 상기 집합의 모든 데이터보다 크거나 같으면 참
-- 185의 경우 모든 데이터 보다 크거나 같으므로 참
-- 180의 경우 178보다 크지만 181보다 작으므로 거짓
```

## 3.3 EXISTS 연산자

- 서브 쿼리 결과에 특정 집합이 존재하는지 확인
- 동작 중 조건에 만족하는 데이터 발견 시 동작을 멈추므로 속도 빠름
- 예제 1)
  - 고객중에서 11불을 초과한 지불내역이 있는 고객 추출

```sql
SELECT FIRST_NAME, LAST_NAME
FROM CUSTOMER C
WHERE EXISTS (
	SELECT 1
	FROM PAYMENT P
	WHERE P.CUSTOMER_ID = C.CUSTOMER_ID
	AND P.AMOUNT > 11
	)
ORDER BY FIRST_NAME, LAST_NAME;
```

# \# 참고

- [모두를 위한 SQL/DB 올인원 패키지 Online(패스트 캠퍼스)](fastcampus.co.kr/data_online_sqldb)
