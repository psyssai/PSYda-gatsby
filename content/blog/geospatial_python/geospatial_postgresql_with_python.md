---
title: "파이썬으로 postgresql(postGIS) 사용하기"
category: "GIS/Python기반공간분석"
date: "2021-03-05"
tags: ["Python", "postgreSql", "postGIS"]
---

# 1. postgresql 설치(postGIS 포함)

- [programmerpsy.tistory.com/94](https://programmerpsy.tistory.com/94)

# 2. 파이썬에서 PostgreSQL 연결하기

- psycopg2 설치하기

```cmd
conda install -c anaconda psycopg2
```

# 3. 데이터 베이스 연결하기

- geospatial DB에 연결 후 points 테이블 생성하는 예제

```python
import psycopg2, pprint

connection = psycopg2.connect(database="geospatial", user="postgres", password="******")
cursor = connection.cursor()

cursor.execute("CREATE TABLE points (id SERIAL PRIMARY KEY, name VARCHAR(255), location GEOMETRY)")
connection.commit()
```

- **psycopg2.connect**
  - 데이터베이스명, 사용자ID, PW를 입력하여 DB에 연결
- **connection.cursor**
  - 데이터베이스와 통신할 수 있는 cursor 생성
- **cursor.execute**
  - 인자로 입력된 SQL문을 실행
- **connection.commit**
  - 변경 내용을 DB에 저장

# 4. 테이블에 데이터 추가

- WKT형태의 좌표를 Geometry로 저장

```python
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(100 200)'))")
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(200 400)'))")
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(700 300)'))")
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(400 300)'))")
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(100 400)'))")
cursor.execute("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('POINT(100 300)'))")
connection.commit()

cursor.execute("SELECT * from points")
cursor.fetchall()
```

- WKT 대신 shapely를 이용해 geometry를 컨트롤 하는 방법
  - shapely의 Point 객체이용
  - Point 객체는 wkt 함수를 이용해 WKT로 변환 가능

```python
from shapely.geometry import Point, MultiPoint
p = [Point(100,200), Point(100,100)]
for pp in p:
    s = ("INSERT INTO points (name, location) VALUES ('p1',ST_GeomFromText('{}'))").format(pp.wkt)
    cursor.execute(s)
connection.commit()

cursor.execute("SELECT * from points")
cursor.fetchall()
```

- 주피터 노트북에서 이미지 띄우기
  - 좌표 리스트들이 표시됨

```python
MultiPoint(p)
```

![Points](./img/1_points.png)

## 5\. 테이블 조회

- points를 조회 하는 예제
  - fetchall() 을 이용하면 select 된 모든 데이터 가져옴
  - fetchone을 이용하면 1개의 데이터만 가져옴

```python
cursor.execute("SELECT * from points")
data=cursor.fetchall()
data
```

```text
[(1, 'p1', '010100000000000000000059400000000000006940'),
 (2, 'p1', '010100000000000000000069400000000000007940'),
 (3, 'p1', '01010000000000000000E085400000000000C07240'),
 (4, 'p1', '010100000000000000000079400000000000C07240'),
 (5, 'p1', '010100000000000000000059400000000000007940'),
 (6, 'p1', '010100000000000000000059400000000000C07240'),
 (8, 'p1', '010100000000000000000059400000000000006940'),
 (9, 'p1', '010100000000000000000059400000000000005940')]
```

- geomtery가 WKB 형태로 출력
  - shapely를 이용해 WKB-> Point -> WKT 변환 하기

```python
from shapely.wkb import loads
aPoint=loads(data[0][2],hex=True)
aPoint.wkt
```

```text
'POINT (100 200)'
```

## 6\. 좌표계 설정/변경하기

```python
cursor.execute("SELECT UpdateGeometrySRID('points','location',4326)")
cursor.execute("SELECT Find_SRID('public','points','location')")
cursor.fetchall()

cursor.execute("SELECT code, ST_AsTexT(ST_Transform(location,3857)) from points")
cursor.fetchone()
```

- **updateGeomterySRID**
  - Geometry에 좌표계 설정함
- **Find_SRID**
  - Geomtery가 어떤 좌표계 인지 보여줌
- **ST_Transform**
  - 좌표계를 변경함

## 7\. KNN을 이용한 지정한 점에 가장 가까운 3개 점 얻기

```python
cursor.execute("SELECT name, ST_Distance(location::geography, ST_GeometryFromText('POINT(-106.591838300225 35.1555000000615)')::geography) as d from points ORDER BY location<->ST_GeometryFromText('POINT(-106.591838300225 35.1555000000615)') LIMIT 3")
cursor.fetchall()
```

```text
[('p1', 7120405.75751067),
 ('p1', 16921336.66007583),
 ('p1', 16921336.66007583)]
```

## 8\. line 데이터 다루기

- line 생성 예제

```python
from shapely.geometry import LineString
from shapely.geometry import MultiLineString
connection = psycopg2.connect(database="geospatial",user="postgres",password="****")
cursor = connection.cursor()
cursor.execute("CREATE TABLE lines (id SERIAL PRIMARY KEY, location GEOMETRY)")
thelines=[]
thelines.append(LineString([(-106.635585,35.086972),(-106.621294,35.124997)]))
thelines.append(LineString([(-106.498309,35.140108),(-106.497010,35.069488)]))
thelines.append(LineString([(-106.663878,35.106459),(-106.586506,35.103979)]))
mls=MultiLineString([((-106.635585,35.086972),(-106.621294,35.124997)),((-106.498309,35.140108),(-106.497010,35.069488)),((-106.663878 ,35.106459),(-106.586506,35.103979))])
for a in thelines:
    cursor.execute("INSERT INTO lines (location) VALUES (ST_GeomFromText('{}'))".format(a.wkt))
    connection.commit()
cursor.execute("SELECT id, ST_AsTexT(location) from lines")
data=cursor.fetchall()
data
connection.commit()
```

- 두 선 교차 여부 확인 하기
  - ST_Intersects 함수 사용

```python
cursor.execute("SELECT ST_Intersects(l.location::geography,ll.location::geometry) FROM lines l, lines ll WHERE l.id=1 AND ll.id=3")
cursor.fetchall()

```

- 두 선을 교차하는 점 확인 하기

```python
cursor.execute("SELECT ST_AsText(ST_Intersection(l.location::geography, ll.location::geometry)) FROM lines l, lines ll WHERE l.id=1 AND ll.id=3")
cursor.fetchall()
```

## 9.Polygon 데이터 다루기

- polygon 생성 예제

```python
from shapely.geometry import Polygon
connection = psycopg2.connect(database="pythonspatial",user="postgres", password="postgres")
cursor = conectionn.cursor()
cursor.execute("CREATE TABLE poly (id SERIAL PRIMARY KEY, location GEOMETRY)")
a=Polygon([(-106.936763,35.958191),(-106.944385,35.239293),(-106.452396,35.281908),(-106.407844,35.948708)])
cursor.execute("INSERT INTO poly (location) VALUES (ST_GeomFromText('{}'))".format(a.wkt))
connection.commit()
```

- 포인트가 폴리곤 내부에 있는지 확인
  - ST \_Intersects 또는 ST \_Contains 사용

## \# 참고

- 파이썬을 활용한 지리공간 분석 마스터하기
- [WKB, WKT의 이해 및 변환](http://blog.naver.com/PostView.nhn?blogId=ilsan_ilsan&logNo=221497823431&parentCategoryNo=&categoryNo=153&viewDate=&isShowPopularPosts=false&from=postView)
