---
title: "공간 데이터 타입 및 입출력"
category: "GIS/Python기반공간분석"
date: "2021-03-22"
tags: []
---

# 1\. 공간 데이터 타입

- 벡터 데이터 타입

  | 벡터 데이터 타입 | 특징                                                                                                                                                                                             |
  | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | ShapeFile        | - 가장 많이 쓰는 포맷으로 3개의 파일로 구성<br>&nbsp; &nbsp;- shp : Geometry 정보 보유<br>&nbsp; &nbsp;- shx : Geomtery를 빠르게 찾을 수 있게 인덱스 보유<br>&nbsp; &nbsp;- dbf : 속성 정보 보유 |
  | GeoJson          | - Json 기반의 공간 정보 포맷으로 key, value 쌍으로 구성<br>- 확장자는 .json 또는 .geo을 사용                                                                                                     |
  | KML              | - XML을 기반으로 태그 형태의 포맷<br>- 확장자는 압축된 .kmz 형태로 배포되는 경우가 많음<br>- WGS84 에 정의된 경도, 위도 좌표계를 사용                                                            | GeoPackage | - 벡터와 래스터 데이터를 모두 지원하는 개방형 데이터 포맷<br>- 모바일 사용자를 위한 포맷<br>- 데이터와 메타데이터 테이블을 결합한 확장 SQLite3 데이터베이스 파일(.gpkg) 사용 |

- 래스터 데이터 타입

| 래스터 데이터 타입 | 특징                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| ECW                | - 항공 및 위성 사진용으로 많이 사용<br>- 압축된 이미지 포맷으로 화질을 유지하면서 압축율이 높음 |
| Esri grid          | - 래스터 파일에 속성 데이터를 추가한 파일 포맷                                                  |
| GeoTIFF            | - GIS 및 원격 탐사 App을 위한 표준 이미지 파일                                                  |

# 2\. GeoPandas로 벡터 데이터 읽고 쓰기

- **벡터 데이터 읽기**
  - read_file(\*.shp) : shp파일 읽어서 geoDataFrame에 저장

```python
import geopandas as gpd
df = gpd.read_file(r'Natural_Earth_quick_start\10m_cultural\ne_10m_admin_0_boundary_lines_land.shp')
df.head()
```

- **Geometry 표시 하기**

```python
%matplotlib inline
df.plot(color='black')
```

![geometry](./img/geopandas_result_1.png)

- **Geometry type 확인**

```python
df.geom_type
```

```text
0         LineString
1         LineString
2    MultiLineString
3         LineString
4         LineString
dtype: object
```

- **좌표계 확인**

```python
df.crs
```

```text
<Geographic 2D CRS: EPSG:4326>
Name: WGS 84
Axis Info [ellipsoidal]:
- Lat[north]: Geodetic latitude (degree)
- Lon[east]: Geodetic longitude (degree)
Area of Use:
- name: World
- bounds: (-180.0, -90.0, 180.0, 90.0)
Datum: World Geodetic System 1984
- Ellipsoid: WGS 84
- Prime Meridian: Greenwich
```

- **좌표계 변경**

```python
merc = df.to_crs({'init':'epsg:3395'})
merc.plot(color='black')
```

![geometry](./img/geopandas_result_2.png)

- **GeoDataFrame을 json 포맷으로 변환**

```python
df.to_json()
```

- **GeoDataFrame을 json 파일로 저장**
  - driver : 출력 파일 포맷

```python
df.to_file(driver='GeoJSON', filename='world.geojson')
```

- **파일 출력 시 가능한 포맷**
  - GeoPandas는 Fiona 라이브러리를 이용해 출력
  - 아래 명령을 통해 Fiona에서 지원하는 모든 driver 확인 가능

```python
import fiona
fiona.supported_drivers
```

# 3\. OGR로 벡터 데이터 읽고 쓰기

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
  - 10m_cultural 폴더의 ne_10m_admin_0_boundary_lines_land 파일의 요약 정보 보기
  - \-so : 요약 정보만 보겠다는 옵션
  - \-so가 없으면 shp의 모든 정보를 표시함

```python
!ogrinfo -so "10m_cultural" ne_10m_admin_0_boundary_lines_land
```

```text
INFO: Open of `Natural_Earth_quick_start/10m_cultural'
      using driver `ESRI Shapefile' successful.

Layer name: ne_10m_admin_0_boundary_lines_land
Metadata:
  DBF_DATE_LAST_UPDATE=2018-05-13
Geometry: Line String
Feature Count: 462
Extent: (-141.005549, -55.120924) - (140.977627, 70.075310)
Layer SRS WKT:
GEOGCS["WGS 84",
    DATUM["WGS_1984",
        SPHEROID["WGS 84",6378137,298.257223563,
            AUTHORITY["EPSG","7030"]],
        AUTHORITY["EPSG","6326"]],
    PRIMEM["Greenwich",0,
        AUTHORITY["EPSG","8901"]],
    UNIT["degree",0.0174532925199433,
        AUTHORITY["EPSG","9122"]],
    AXIS["Latitude",NORTH],
    AXIS["Longitude",EAST],
    AUTHORITY["EPSG","4326"]]
Data axis to CRS axis mapping: 2,1
featurecla: String (32.0)
name: String (100.0)
comment: String (100.0)
adm0_usa: Integer (4.0)
adm0_left: String (100.0)
adm0_right: String (100.0)
adm0_a3_l: String (3.0)
adm0_a3_r: String (3.0)
sov_a3_l: String (3.0)
sov_a3_r: String (3.0)
type: String (50.0)
labelrank: Integer (4.0)
scalerank: Integer64 (10.0)
min_zoom: Real (4.1)
min_label: Real (4.1)
note: String (254.0)
adm0_abr_l: String (32.0)
adm0_abr_r: String (32.0)
```

- **shp 파일을 GeoJson파일로 변환**

```python
!ogr2ogr -f "GeoJson" "output.json" "Natural_Earth_quick_start/10m_cultural/ne_10m_admin_0_boundary_lines_land.shp"
```

- **KML 파일 읽기**
  - 샘플 데이터 : [https://developers.google.com/kml/documentation/KML_Samples.kml](https://developers.google.com/kml/documentation/KML_Samples.kml)

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

# \# 참고

- 파이썬을 활용한 지리공간 분석 마스터하기
