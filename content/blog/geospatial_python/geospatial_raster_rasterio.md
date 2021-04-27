---
title: "공간 데이터 타입"
category: "GIS/Python기반공간분석"
date: "2021-03-22"
tags: ["공간 데이터 타입", "Geopandas", "ORG", "GDAL"]
---

# 1. 벡터 데이터 타입

| 벡터 데이터 타입 | 특징                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ShapeFile        | - 가장 많이 쓰는 포맷으로 3개의 파일로 구성<br>&nbsp; &nbsp;- shp : Geometry 정보 보유<br>&nbsp; &nbsp;- shx : Geomtery를 빠르게 찾을 수 있게 인덱스 보유<br>&nbsp; &nbsp;- dbf : 속성 정보 보유 |
| GeoJson          | - Json 기반의 공간 정보 포맷으로 key, value 쌍으로 구성<br>- 확장자는 .json 또는 .geojson을 사용                                                                                                 |
| KML              | - XML을 기반으로 태그 형태의 포맷<br>- 확장자는 압축된 .kmz 형태로 배포되는 경우가 많음<br>- WGS84 에 정의된 경도, 위도 좌표계를 사용                                                            |
| GeoPackage       | - 벡터와 래스터 데이터를 모두 지원하는 개방형 데이터 포맷<br>- 모바일 사용자를 위한 포맷<br>- 데이터와 메타데이터 테이블을 결합한 확장 SQLite3 데이터베이스 파일(.gpkg) 사용                     |

# 2.래스터 데이터 타입

| 래스터 데이터 타입 | 특징                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| ECW                | - 항공 및 위성 사진용으로 많이 사용<br>- 압축된 이미지 포맷으로 화질을 유지하면서 압축율이 높음 |
| Esri grid          | - 래스터 파일에 속성 데이터를 추가한 파일 포맷                                                  |
| GeoTIFF            | - GIS 및 원격 탐사 App을 위한 표준 이미지 파일                                                  |

# 4. Rasterio로 래스터 데이터 읽고 쓰기

- **Rasterio로 파일 읽기**

```python
import rasterio
dataset = rasterio.open(r'Natural_Earth_quick_start\50m_raster\NE1_50M_SR_W\NE1_50M_SR_W.tif')
```

- **밴드 수 확인**

```python
dataset.count
```

```text
3
```

- **열 수(width) 조회**

```python
dataset.width
```

```text
10800
```

- **높이(height) 조회**

```python
dataset.height
```

```text
5400
```

- **공간 경계(boundbox) 조회**

```python
dataset.bounds
```

```text
BoundingBox(left=-179.99999999999997, bottom=-89.99999999998201, right=179.99999999996405, top=90.0)
```

- **CRS 조회**

```python
dataset.crs
```

```text
CRS.from_epsg(4326)
```

- **밴드1 데이터 조회**

```python
band1 = dataset.read(1)
```

- **이미지 보기**

```python
%matplotlib inline
from matplotlib import pyplot
pyplot.imshow(dataset.read(1))
pyplot.show()
```

![resterio](./img/rasterio_result.png)

# 5. GDAL로 래스터 데이터 읽고 쓰기

- 터미널 명령어 이며, 상기 내용 처럼 !를 포함하면 JupyterNoteBook에서 명령 가능하다.
- **지원되는 모든 파일 형식 조회**

```python
!gdalinfo --formats
```

```text
Supported Formats:
  VRT -raster- (rw+v): Virtual Raster
...
```

- **파일 정보 요약(CRS 포함)**

```python
!gdalinfo "Natural_Earth_quick_start\50m_raster\NE1_50M_SR_W\NE1_50M_SR_W.tif"
```

```text
Driver: GTiff/GeoTIFF
Files: Natural_Earth_quick_start\50m_raster\NE1_50M_SR_W\NE1_50M_SR_W.tif
Size is 10800, 5400
Coordinate System is:
GEOGCRS["WGS 84",
    DATUM["World Geodetic System 1984",
        ELLIPSOID["WGS 84",6378137,298.257223563,
            LENGTHUNIT["metre",1]]],
    PRIMEM["Greenwich",0,
        ANGLEUNIT["degree",0.0174532925199433]],
    CS[ellipsoidal,2],
        AXIS["geodetic latitude (Lat)",north,
            ORDER[1],
            ANGLEUNIT["degree",0.0174532925199433]],
        AXIS["geodetic longitude (Lon)",east,
            ORDER[2],
            ANGLEUNIT["degree",0.0174532925199433]],
    USAGE[
        SCOPE["unknown"],
        AREA["World"],
        BBOX[-90,-180,90,180]],
    ID["EPSG",4326]]
Data axis to CRS axis mapping: 2,1
Origin = (-179.999999999999972,90.000000000000000)
Pixel Size = (0.033333333333330,-0.033333333333330)
Metadata:
  AREA_OR_POINT=Area
  TIFFTAG_DATETIME=2014:10:18 09:32:38
  TIFFTAG_RESOLUTIONUNIT=2 (pixels/inch)
  TIFFTAG_SOFTWARE=Adobe Photoshop CC 2014 (Macintosh)
  TIFFTAG_XRESOLUTION=342.85699
  TIFFTAG_YRESOLUTION=342.85699
Image Structure Metadata:
  INTERLEAVE=PIXEL
Corner Coordinates:
Upper Left  (-180.0000000,  90.0000000) (180d 0' 0.00"W, 90d 0' 0.00"N)
Lower Left  (-180.0000000, -90.0000000) (180d 0' 0.00"W, 90d 0' 0.00"S)
Upper Right ( 180.0000000,  90.0000000) (180d 0' 0.00"E, 90d 0' 0.00"N)
Lower Right ( 180.0000000, -90.0000000) (180d 0' 0.00"E, 90d 0' 0.00"S)
Center      (  -0.0000000,   0.0000000) (  0d 0' 0.00"W,  0d 0' 0.00"N)
Band 1 Block=10800x1 Type=Byte, ColorInterp=Red
Band 2 Block=10800x1 Type=Byte, ColorInterp=Green
Band 3 Block=10800x1 Type=Byte, ColorInterp=Blue
```

- **GeoTiff를 JPEG로 변환**

```python
!gdal_translate -of JPEG "Natural_Earth_quick_start\50m_raster\NE1_50M_SR_W\NE1_50M_SR_W.tif" NE1_50M_SR_W.jpg
```

```text
Input file size is 10800, 5400
0...10...20...30...40...50...60...70...80...90...100 - done.
```

- **GDAL을 사용해 GeoPackage 파일 정보 보기**
  - [Sample 파일 다운로드](http://geopackage.org/data/gdal_sample_v1.2_no_extensions.gpkg)

```python
!gdalinfo gdal_sample_v1.2_no_extensions.gpkg
```

```text
Driver: GPKG/GeoPackage
Files: gdal_sample_v1.2_no_extensions.gpkg
Size is 512, 512
Subdatasets:
  SUBDATASET_1_NAME=GPKG:gdal_sample_v1.2_no_extensions.gpkg:byte_png
  SUBDATASET_1_DESC=byte_png - byte_png
  SUBDATASET_2_NAME=GPKG:gdal_sample_v1.2_no_extensions.gpkg:byte_jpeg
  SUBDATASET_2_DESC=byte_jpeg - byte_jpeg
Corner Coordinates:
Upper Left  (    0.0,    0.0)
Lower Left  (    0.0,  512.0)
Upper Right (  512.0,    0.0)
Lower Right (  512.0,  512.0)
Center      (  256.0,  256.0)
```

# \# 참고

- 파이썬을 활용한 지리공간 분석 마스터하기
- [GDAL, OGR CookBook](https://pcjericks.github.io/py-gdalogr-cookbook/index.html)
