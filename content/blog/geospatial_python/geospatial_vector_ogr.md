---
title: "벡터 데이터 분석-1. OGR"
category: "GIS/Python기반공간분석"
date: "2021-03-23"
tags: [""]
---

# 1\. OGR 라이브러리

- OGR의 3가지 Component
  - OGR 배치 명령 : 벡터 데이터 정보 요약 및 변환
  - 파이썬 스크립트 : 미리 개발해 놓은 GIS 분석 기능
  - OGR 라이브러리 : 파이썬에서 사용할 수 있는 OGR 라이브러리

# 2. OGR 배치 명령

- OGR은 벡터데이터 요약 정보 제공, 변환 등을 위한 배치 명령을 제공
- 대표적으로 아래와 같은 배치 명령 존재
  - **ogrinfo** : 벡터 데이터 요약정보 확인
  - **ogr2ogr** : 벡터 파일을 다른 포맷으로 변경
  - ogrtindex : 벡터 타일 생성
  - ogr2vrt : 벡터 타일 생성(orgtindex 보다 광범위하게 사용됨)
- 터미널에서 명령을 수행함
  - Jupyter notebook에서 명령어 앞에 !를 붙이면 터미널 명령 수행 가능

# 2.1 ogrinfo

- **파일 입출력 가능 포맷 조회**

```python
!ogrinfo --formats
```

```text
Supported Formats:
...
  ESRI Shapefile -vector- (rw+v): ESRI Shapefile
  KML -vector- (rw+v): Keyhole Markup Language (KML)
  GeoJSON -vector- (rw+v): GeoJSON
...
```

- **파일의 요약 정보 보기**
  - data 폴더의 link 파일 요약 정보 보기
  - \-so : 요약 정보만 보겠다는 옵션
  - \-so가 없으면 shp의 모든 정보를 표시함

```python
!ogrinfo -so "data" MOCT_LINK
```

```text
INFO: Open of `data'
      using driver `ESRI Shapefile' successful.

Layer name: MOCT_LINK
Metadata:
  DBF_DATE_LAST_UPDATE=2021-03-30
Geometry: Line String
Feature Count: 528232
Extent: (101766.537600, 67516.493200) - (546275.776100, 665746.517600)
Layer SRS WKT:
PROJCS["ITRF2000_Central_Belt_60",
    GEOGCS["GCS_ITRF_2000",
        DATUM["International_Terrestrial_Reference_Frame_2000",
            SPHEROID["GRS 1980",6378137,298.257222101,
                AUTHORITY["EPSG","7019"]],
            AUTHORITY["EPSG","6656"]],
        PRIMEM["Greenwich",0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["latitude_of_origin",38],
    PARAMETER["central_meridian",127],
    PARAMETER["scale_factor",1],
    PARAMETER["false_easting",200000],
    PARAMETER["false_northing",600000],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]],
    AXIS["Easting",EAST],
    AXIS["Northing",NORTH]]
Data axis to CRS axis mapping: 1,2
LINK_ID: String (10.0)
F_NODE: String (10.0)
T_NODE: String (10.0)
LANES: Integer (4.0)
ROAD_RANK: String (3.0)
ROAD_TYPE: String (3.0)
ROAD_NO: String (5.0)
ROAD_NAME: String (30.0)
ROAD_USE: String (1.0)
MULTI_LINK: String (1.0)
CONNECT: String (3.0)
MAX_SPD: Integer (4.0)
REST_VEH: String (3.0)
REST_W: Integer (4.0)
REST_H: Integer (4.0)
LENGTH: Real (18.12)
REMARK: String (30.0)
```

- **KML 파일 읽기**
  - 샘플 데이터 : [다운로드](https://developers.google.com/kml/documentation/KML_Samples.kml)

```python
!ogrinfo "KML_Sample.kml" -summary
```

```text
INFO: Open of `KML_Sample.kml'
      using driver `KML' successful.
1: Placemarks (3D Point)
2: Highlighted Icon (3D Point)
3: Paths (3D Line String)
4: Google Campus (3D Polygon)
5: Extruded Polygon (3D Polygon)
6: Absolute and Relative (3D Polygon)
```

# 2.2 ogr2ogr

- **shp 파일을 GeoJson파일로 변환**

```python
!ogr2ogr -f "GeoJson" "output.json" "data/MOCT_LINK.shp"
```

# 3. 파이썬 스크립트

- GDAL 설치 경로에 GIS 분석에 사용할 수 있는 스크립트 제공
  - 경로 예시(anaconda일 때) : C:\Users\82103\Anaconda3\envs\geospatial\Lib\site-packages\GDAL-3.0.2-py3.6-win-amd64.egg-info\scripts
- scripts 예시
  - ogrmerge.py : shp파일을 merge 하여 다른 파일로 변환함
- 사용 방법
  - 터미널 또는 Jupyter notebook에서 사용 방식에 따라 명령 수행

```python
#경로 이동
cd "C:\Users\82103\Anaconda3\envs\geospatial\Lib\site-packages\GDAL-3.0.2-py3.6-win-amd64.egg-info\scripts"

#터미널에서 수행 할 때
ogrmerge.py -f GPKG -o merged.gpkg "MOCT_LINK.shp"

# Jupyter Note Book에서 수행할 때
%run ogrmerge.py -f GPKG -o merged.gpkg "MOCT_LINK.shp"
```

- 참고 : %run
  - Jupyter notebook의 매직명령
  - 외부 스크립트를 Jupyter notebook에서 실행 할 때 사용

# 4. OGR 라이브러리

- OGR 라이브러리는 2개의 주요 모듈로 구성
  - **ogr** : 벡터 지오메트리를 주로 다룸
  - **osr** : 투영에 관해 다룸
- OGR 이 제공하는 7개의 클래스
  - **Geometry** : 기하학 좌표 연산/변환 제공, Spatial Reference System을 포함
  - **Spatial Reference** : 투영과 좌표계 관련 기능 정의
  - **Feature** : Geometry와 속성정보를 가진 Feature를 정의(Polygon 등의 객체)
  - **Feature Class Definition** : Feature의 스키마 정보를 정의
  - **Layer** : Feature들을 모아놓은 Layer 정의
  - **Dataset** : OGRLayer 객체를 하나 이상 포함하는 File 또는 Database을 표현
  - **Drivers** : 포맷 변환을 정의하며, 모든 Drivers는 GDALDriverManager에서 관리함

# 4.1 OGR로 객체 생성하기

- OGR로 Point, Line, Polygon과 같은 벡터 Geometry 생성 가능
- Polygon 생성 예제

```python
from osgeo import ogr
r = ogr.Geometry(ogr.wkbLinearRing)
r.AddPoint(1,1)
r.AddPoint(5,1)
r.AddPoint(5,5)
r.AddPoint(1,5)
r.AddPoint(1,1)
poly = ogr.Geometry(ogr.wkbPolygon)
poly.AddGeometry(r)
print(poly.ExportToWkt())
```

```text
POLYGON ((1 1 0,5 1 0,5 5 0,1 5 0,1 1 0))
```

# 4.2 GeoJSON으로 부터 객체 생성하기

- GeoJSON 구조로 부터 객체 생성 가능
- GeoJSON으로 부터 Polygon 생성 예제

```python
from osgeo import ogr
geojson = """{"type":"Polygon","coordinates":[[[1,1],[5,1],[5,5],[1,5],[1,1]]]}"""
polygon = ogr.CreateGeometryFromJson(geojson)
print(polygon)
```

```text
POLYGON ((1 1,5 1,5 5,1 5,1 1))
```

# 4.3 Geometry 연산 수행

- **Polygon Geometry 연산 수행**

```python
# 1. 면적 구하기
print("폴리곤 면적은 ", polygon.Area(), "입니다.")

# 2. 중심점 구하기
cen = polygon.Centroid()
print(cen)

# 3. 경계 구하기
boundary = polygon.GetBoundary()
print(boundary)

# 4. Point 가 Polygon 내부에 존재하는지 확인
point = ogr.Geometry(ogr.wkbPoint)
point.AddPoint(10, 10)
polygon.Contains(point)

# 5.  Buffer 구하기
buffer = polygon.Buffer(2)
```

```text
폴리곤 면적은  16.0 입니다.
POINT (3 3)
LINESTRING (1 1,5 1,5 5,1 5,1 1)
False
```

# 4.4 Shape 파일에 Polygon Data 쓰기

- 아래 순서로 진행
  - **좌표계 설정**
  - **Shape file 생성**
  - **Layer 생성**
  - **feature 생성 및 Geometry 입력**
  - **Layer에 Feature 입력**

```python
import osgeo.ogr, osgeo.osr

# 1. 좌표계 설정
spatialReference = osgeo.osr.SpatialReference()
spatialReference.ImportFromProj4('+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs')

# 2. ShapeFile 생성
driver = osgeo.ogr.GetDriverByName('ESRI ShapeFile')
shapeData = driver.CreateDataSource('polygon.shp')

# 3. layer 생성
layer = shapeData.CreateLayer('polygon_layer', spatialReference, osgeo.ogr.wkbPolygon)
layerDefinition = layer.GetLayerDefn()

# 4. Feature 생성 및 Geometry 입력
featureIndex = 0
feature = osgeo.ogr.Feature(layerDefinition)
feature.SetGeometry(polygon)
feature.SetFID(featureIndex)

# 5. Layer에 Feature 입력
layer.CreateFeature(feature)

# 6. 생성 확인
!ogrinfo polygon.shp
```

```text
INFO: Open of `polygon.shp'
      using driver `ESRI Shapefile' successful.
1: polygon (Polygon)
```

# 4.5 feature 다루기

- **Shape 파일을 읽어 특정 필드명 출력**

```python
from osgeo import ogr
import os
shapefile = r'data/node.shp'
driver = ogr.GetDriverByName("ESRI Shapefile")
dataSource = driver.Open(shapefile,0)
layer = dataSource.GetLayer()

# 데이터가 많아서 Sample로 5개 필드만 출력
idx = 0
for feature in layer:
    print(idx, ", ", feature.GetField("NODE_NAME"))
    idx += 1
    if(idx == 5):
        break
```

```text
0 ,  하계5,6단지앞교차로
1 ,  공릉터널남측
2 ,  미성아파트5동앞
3 ,  유토피아빌딩
4 ,  청구빌라4단지401동
```

- **Shape 파일의 모든 필드 이름 나열하기**

```python
from osgeo import ogr
source = ogr.Open(r'data/MOCT_LINK.shp')
layer = source.GetLayer()
schema = []
ldefn = layer.GetLayerDefn()
for n in range(ldefn.GetFieldCount()):
    fdefn = ldefn.GetFieldDefn(n)
    schema.append(fdefn.name)
print(schema)
```

```text
['LINK_ID', 'F_NODE', 'T_NODE', 'LANES', 'ROAD_RANK', 'ROAD_TYPE', 'ROAD_NO', 'ROAD_NAME', 'ROAD_USE', 'MULTI_LINK', 'CONNECT', 'MAX_SPD', 'REST_VEH', 'REST_W', 'REST_H', 'LENGTH', 'REMARK']
```

- **Feature 개수 구하기**

```python
from osgeo import ogr
import os
shapefile = r'data/MOCT_LINK.shp'
driver = ogr.GetDriverByName("ESRI Shapefile")
dataSource = driver.Open(shapefile, 0)
layer = dataSource.GetLayer()
featureCount = layer.GetFeatureCount()
print("count = ", featureCount)
```

```text
count =  528232
```

# 4.6 좌표계 다루기

- **CRS 정보 조회하기**
  - Layer로부터 구하기
  - Geometry로부터 구하기

```python
# 1) Layer로부터 구하기
spatialRef = layer.GetSpatialRef()
print(spatialRef)
```

```text
PROJCS["ITRF2000_Central_Belt_60",
    GEOGCS["GCS_ITRF_2000",
        DATUM["International_Terrestrial_Reference_Frame_2000",
            SPHEROID["GRS 1980",6378137,298.257222101,
                AUTHORITY["EPSG","7019"]],
            AUTHORITY["EPSG","6656"]],
        PRIMEM["Greenwich",0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["latitude_of_origin",38],
    PARAMETER["central_meridian",127],
    PARAMETER["scale_factor",1],
    PARAMETER["false_easting",200000],
    PARAMETER["false_northing",600000],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]],
    AXIS["Easting",EAST],
    AXIS["Northing",NORTH]]
```

```python
# 2) Geometry로부터 구하기
feature = layer.GetNextFeature()
geom = feature.GetGeometryRef()
spatialRef2 = geom.GetSpatialReference()
print(spatialRef2)
```

```text
PROJCS["ITRF2000_Central_Belt_60",
    GEOGCS["GCS_ITRF_2000",
        DATUM["International_Terrestrial_Reference_Frame_2000",
            SPHEROID["GRS 1980",6378137,298.257222101,
                AUTHORITY["EPSG","7019"]],
            AUTHORITY["EPSG","6656"]],
        PRIMEM["Greenwich",0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["latitude_of_origin",38],
    PARAMETER["central_meridian",127],
    PARAMETER["scale_factor",1],
    PARAMETER["false_easting",200000],
    PARAMETER["false_northing",600000],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]],
    AXIS["Easting",EAST],
    AXIS["Northing",NORTH]]
```

# 참고

- 파이썬을 활용한 지리공간 분석 마스터하기
- [GDAL Vector Data Model](https://gdal.org/user/vector_data_model.html)
- 예제는 [국가표준노드링크](https://its.go.kr/nodelink/nodelinkRef)로 진행
