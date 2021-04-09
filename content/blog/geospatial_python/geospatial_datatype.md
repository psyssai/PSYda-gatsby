---
title: "공간 데이터 타입 및 입출력"
category: "GIS/Python기반공간분석"
date: "2021-03-22"
tags: ["공간 데이터 타입", "Geopandas", "ORG", "GDAL"]
---

# 1\. 공간 데이터 타입

- 벡터 데이터 타입

  | 벡터 데이터 타입 | 특징                                                                                                                                                                                             |
  | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | ShapeFile        | - 가장 많이 쓰는 포맷으로 3개의 파일로 구성<br>&nbsp; &nbsp;- shp : Geometry 정보 보유<br>&nbsp; &nbsp;- shx : Geomtery를 빠르게 찾을 수 있게 인덱스 보유<br>&nbsp; &nbsp;- dbf : 속성 정보 보유 |
  | GeoJson          | - Json 기반의 공간 정보 포맷으로 key, value 쌍으로 구성<br>- 확장자는 .json 또는 .geojson을 사용                                                                                                 |
  | KML              | - XML을 기반으로 태그 형태의 포맷<br>- 확장자는 압축된 .kmz 형태로 배포되는 경우가 많음<br>- WGS84 에 정의된 경도, 위도 좌표계를 사용                                                            | GeoPackage | - 벡터와 래스터 데이터를 모두 지원하는 개방형 데이터 포맷<br>- 모바일 사용자를 위한 포맷<br>- 데이터와 메타데이터 테이블을 결합한 확장 SQLite3 데이터베이스 파일(.gpkg) 사용 |

- 래스터 데이터 타입

| 래스터 데이터 타입 | 특징                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| ECW                | - 항공 및 위성 사진용으로 많이 사용<br>- 압축된 이미지 포맷으로 화질을 유지하면서 압축율이 높음 |
| Esri grid          | - 래스터 파일에 속성 데이터를 추가한 파일 포맷                                                  |
| GeoTIFF            | - GIS 및 원격 탐사 App을 위한 표준 이미지 파일                                                  |

- 참고
  - 예제는 [국가표준노드링크](https://its.go.kr/nodelink/nodelinkRef)로 진행함.

# 2\. GeoPandas로 벡터 데이터 읽고 쓰기

- **벡터 데이터 읽기**
  - read_file(\*.shp) : shp파일 읽어서 geoDataFrame에 저장

```python
import geopandas as gpd
df = gpd.read_file(r'data/MOCT_LINK.shp',encoding='CP949')
df.head()
```

<div style="overflow-x:scroll; ">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
         white-space: nowrap !important;
    }

    .dataframe tbody tr th {
        vertical-align: top;
         white-space: nowrap !important;
    }

    .dataframe thead th {
        text-align: right;
         white-space: nowrap !important;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>LINK_ID</th>
      <th>F_NODE</th>
      <th>T_NODE</th>
      <th>LANES</th>
      <th>ROAD_RANK</th>
      <th>ROAD_TYPE</th>
      <th>ROAD_NO</th>
      <th>ROAD_NAME</th>
      <th>ROAD_USE</th>
      <th>MULTI_LINK</th>
      <th>CONNECT</th>
      <th>MAX_SPD</th>
      <th>REST_VEH</th>
      <th>REST_W</th>
      <th>REST_H</th>
      <th>LENGTH</th>
      <th>REMARK</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2630193301</td>
      <td>2630076801</td>
      <td>2630076901</td>
      <td>1</td>
      <td>106</td>
      <td>000</td>
      <td>391</td>
      <td>화악산로</td>
      <td>0</td>
      <td>0</td>
      <td>000</td>
      <td>60</td>
      <td>0</td>
      <td>0.0</td>
      <td>0</td>
      <td>1410.192910</td>
      <td>None</td>
      <td>LINESTRING (245889.208 602540.103, 245884.524 ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2630193001</td>
      <td>2630076801</td>
      <td>2630076701</td>
      <td>1</td>
      <td>106</td>
      <td>003</td>
      <td>391</td>
      <td>화악산로</td>
      <td>0</td>
      <td>0</td>
      <td>000</td>
      <td>60</td>
      <td>0</td>
      <td>0.0</td>
      <td>0</td>
      <td>12.137670</td>
      <td>None</td>
      <td>LINESTRING (245881.843 602537.719, 245885.114 ...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2630193101</td>
      <td>2630076701</td>
      <td>2630076801</td>
      <td>1</td>
      <td>106</td>
      <td>003</td>
      <td>391</td>
      <td>화악산로</td>
      <td>0</td>
      <td>0</td>
      <td>000</td>
      <td>60</td>
      <td>0</td>
      <td>0.0</td>
      <td>0</td>
      <td>12.326808</td>
      <td>None</td>
      <td>LINESTRING (245893.460 602528.496, 245889.209 ...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2630192801</td>
      <td>2630076701</td>
      <td>2630076601</td>
      <td>1</td>
      <td>106</td>
      <td>000</td>
      <td>391</td>
      <td>화악산로</td>
      <td>0</td>
      <td>0</td>
      <td>000</td>
      <td>60</td>
      <td>0</td>
      <td>0.0</td>
      <td>0</td>
      <td>364.089006</td>
      <td>None</td>
      <td>LINESTRING (245885.688 602526.172, 245886.272 ...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2630192901</td>
      <td>2630076601</td>
      <td>2630076701</td>
      <td>1</td>
      <td>106</td>
      <td>000</td>
      <td>391</td>
      <td>화악산로</td>
      <td>0</td>
      <td>0</td>
      <td>000</td>
      <td>60</td>
      <td>0</td>
      <td>0.0</td>
      <td>0</td>
      <td>373.389143</td>
      <td>None</td>
      <td>LINESTRING (246066.042 602242.391, 246069.650 ...</td>
    </tr>
  </tbody>
</table>
</div>

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
<Projected CRS: PROJCS["ITRF2000_Central_Belt_60",GEOGCS["GCS_ITRF ...>
Name: ITRF2000_Central_Belt_60
Axis Info [cartesian]:
- [east]: Easting (metre)
- [north]: Northing (metre)
Area of Use:
- undefined
Coordinate Operation:
- name: unnamed
- method: Transverse Mercator
Datum: International Terrestrial Reference Frame 2000
- Ellipsoid: GRS 1980
- Prime Meridian: Greenwich
```

- **좌표계 변경**

```python
merc = df.to_crs({'init':'epsg:4326'})
merc.plot(color='black')
```

![geometry](./img/geopandas_result_2.png)

- **GeoDataFrame을 json 포맷으로 변환**

```python
# 데이터가 커서 sample로 1개 데이터만 json으로 변환
df.head(1).to_json()
```

```text
'{"type": "FeatureCollection", "features": [{"id": "0", "type": "Feature", "properties": {"CONNECT": "000", "F_NODE": "2630076801", "LANES": 1, "LENGTH": 1410.19291001225, "LINK_ID": "2630193301", "MAX_SPD": 60, "MULTI_LINK": "0", "REMARK": null, "REST_H": 0, "REST_VEH": "0", "REST_W": 0.0, "ROAD_NAME": "\\ud654\\uc545\\uc0b0\\ub85c", "ROAD_NO": "391", "ROAD_RANK": "106", "ROAD_TYPE": "000", "ROAD_USE": "0", "T_NODE": "2630076901"}, "geometry": {"type": "LineString", "coordinates": [[245889.20842293755, 602540.1031623926], [245884.52438196362, 602550.7076639828], [245880.5845997197, 602562.441661735], [245877.37697640058, 602577.5560817202], [245874.80402102915, 602590.923142394], [245870.08166344027, 602608.6555760134], [245866.14860266628, 602619.1390588756], [245861.72407481138, 602627.9941839982], [245850.47753049707, 602649.6933080491], [245843.77653209324, 602663.2882877537], [245840.21593625328, 602674.2739925202], [245836.2741359605, 602686.3831435101], [245833.96002093932, 602698.125878997], [245831.74675705165, 602714.3711385361], [245830.48617608764, 602739.5004281478], [245829.72781690946, 602764.257252305], [245829.78834916753, 602799.523103117], [245829.18865190083, 602818.0280274062], [245827.4648357864, 602836.2767985966], [245825.86203727854, 602855.2765506067], [245823.64944289793, 602871.396758187], [245821.52694263405, 602894.0203128068], [245820.4236764545, 602913.1478050507], [245821.58007512547, 602930.6617291515], [245823.60645547815, 602949.1807706261], [245825.40895076204, 602962.8214614922], [245826.09405003514, 602974.9554847644], [245825.65368618732, 602987.0834576795], [245823.97894215182, 602996.2034733664], [245820.42842643222, 603005.3134050232], [245811.20958754103, 603022.0212222983], [245803.40463366537, 603031.6085023026], [245795.35831640614, 603039.5687689325], [245779.41022924686, 603051.8634824678], [245761.20651050736, 603065.0214546616], [245744.9962197665, 603079.5657484786], [245711.8058337661, 603112.2767922183], [245676.3322525288, 603150.9782006346], [245664.11688441734, 603166.7945190094], [245654.27749311822, 603182.6236104805], [245646.6896994245, 603198.3397514643], [245641.49132830047, 603211.5676374831], [245635.8969615895, 603228.67010031], [245632.192484073, 603243.1565677221], [245627.70139361764, 603264.3917775303], [245625.5082893798, 603276.885489703], [245622.31073984868, 603290.1241318531], [245618.2163164351, 603307.3597129482], [245615.66553742788, 603316.6000712622], [245612.62396502416, 603324.0870205313], [245606.79428443874, 603338.4370064927], [245600.21765677864, 603352.1577013484], [245595.16584919338, 603361.384613071], [245585.18325133767, 603380.5894169775], [245577.72319553196, 603395.8060218558], [245572.39439199885, 603410.0336447023], [245567.3082955352, 603425.6381774854], [245563.35505705074, 603439.873195574], [245557.6094144114, 603461.851987991], [245552.1448012958, 603478.0797602631], [245546.8139796491, 603492.6825364484], [245543.12428970283, 603504.4178705714], [245537.91112339962, 603520.3968842088], [245527.91978245924, 603541.2273534045], [245501.14465575287, 603590.2300162113], [245479.78640583853, 603631.8835551282], [245454.11186099224, 603685.5191653903], [245430.8179966427, 603738.292187912], [245408.38805921804, 603793.195787896], [245399.2431610517, 603819.4081672801]]}}]}'
```

- **GeoDataFrame을 json 파일로 저장**
  - driver : 출력 파일 포맷

```python
df.to_file(driver='GeoJSON', filename='link.geojson')
```

- **파일 출력 시 가능한 포맷**
  - GeoPandas는 Fiona 라이브러리를 이용해 출력
  - 아래 명령을 통해 Fiona에서 지원하는 모든 driver 확인 가능

```python
import fiona
fiona.supported_drivers
```

# 3\. OGR로 벡터 데이터 읽고 쓰기

## 3.1 터미널에서 명령 수행

- 참고 : Jupyter Notebook에서 앞에 !를 붙이면 터미널 명령 수행 가능
  - 터미널에서 명령 수행 시 ! 빼고 입력하면 됨
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

- **shp 파일을 GeoJson파일로 변환**

```python
!ogr2ogr -f "GeoJson" "output.json" "data/MOCT_LINK.shp"
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

## 3.2 파이썬에서 명령 수행

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
