---  
title: "[Pandas 기초]1.Pandas란 무엇인가?"  
category : "빅데이터분석/Pandas"  
date: "2019-08-13"  
tags: ["Pandas","데이터분석","빅데이터"]  
---

안녕하세요. PSYda입니다.  
오늘은 Pandas가 무엇인지 알아보겠습니다.

# 1. Pandas란?
[Pandas의 공식 Github](https://github.com/pandas-dev/pandas)에서 설명하는 Pandas는 아래와 같습니다.  


>"**<span style="color:red">관계형</span>**" 또는 "**<span style="color:red">레이블이 된</span>**" 데이터로 **<span style="color:red">쉽고 직관적</span>**으로 작업할 수 있도록 설계되었고 **<span style="color:red">빠르고, 유연한</span>** 데이터 구조를 제공하는 **<span style="color:red">Python 패키지</span>**

관계형, 레이블이 된 데이터라는 말은 엑셀의 데이터나, DBMS의 관계형 테이블 형태와 같은 표형태의 데이터로 이해 할 수 있습니다. 아무튼 데이터를 쉽게 다룰 수 있고, 분석을 용이하게 해주는 파이썬 라이브러리라고 이해 할 수 있습니다.

# 2. Pandas로 할 수 있는 것은?
구체적으로 Pandas로 할 수 있는 것들은 아래와 같습니다.  

- Python 자료구조와의 호환(List ,Tuple, Dict, NumpyArray 등)  
- 큰 데이터의 **<span style="color:red">빠른 Indexing, Slicing, Sorting</span>** 하는 기능
- **<span style="color:red">두 데이터 간의 Join</span>**(행,열 방향) 기능
- 데이터의 **<span style="color:red">피봇팅 및 그룹핑</span>**
- 데이터의 **<span style="color:red">통계 및 시각화</span>** 기능
- **<span style="color:red">외부 데이터</span>**를 입력 받아 Pandas 자료구조로 **<span style="color:red">저장 및 출력</span>**(CSV, 구분자가 있는 txt, 엑셀데이터, SQL database, XML 등)

# 3. Pandas 사용하기
Pandas는 파이썬 라이브러리이기 때문에 별도의 설치가 필요한데, **<span style="color:red">Anaconda</span>**라는 패키지를 사용하면, Pandas가 기본으로 설치되어 있기 때문에 Anaconda를 이용하는 것을 권장합니다.

Anaconda는 수학, 과학, **<span style="color:red">데이터 분석 분야에서 사용하는 Python 패키지를 한 번에 설치</span>** 할 수 있게 해줍니다. 또한 **<span style="color:red">Jupyter notebook</span>**과 같은 IDE 개발 도구도 함께 설치 할 수 있습니다.

[Anaconda 공식 홈페이지](https://www.anaconda.com/distribution/)에서 원클릭으로 쉽게 설치 할 수 있습니다.  

# 4. 포스팅 목자
1. [Pandas의 자료구조-Series](../2_Series)
2. [Pandas의 자료구조-DataFrame](../3_dataframe)
3. [여러 DataFrame 연결하기](../4_dataframe_merge)
4. [Pandas의 파일 입출력](../5_dataframe_fileio)
5. [Pandas DataFrame 산술 연산](../6_dataframe_calc)
6. [Pandas DataFrame 통계](../7_dataframe_statistic)
7. [Pandas DataFrmae의 sort,rank 함수](../8_dataframe_sortrank)
8. [Series와 DataFrame에 함수 적용하기](../9_dataframe_applyfunction)
9. [DataFrame의 집계(그룹핑) 함수](../10_dataframe_grouping)


다음의 포스팅부터 Jupyter notebook을 사용하여 직접 Pandas를 실습할 예정입니다.  
Pandas에 대한 추가적인 정보가 필요할 경우 [공식 문서](https://pandas.pydata.org/pandas-docs/stable/reference/io.html#excel)를 참고해주세요.  
