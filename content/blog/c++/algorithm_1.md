---
title: "[algorithm 이론] 1. 정렬"
category: "algorithm/이론"
date: "2020-10-19"
tags: ["C++", "algorithm"]
---

# 0. 요약

| 알고리즘  | 복잡도     | 간단 설명                                                                          |
| --------- | ---------- | ---------------------------------------------------------------------------------- |
| 선택 정렬 | O(N^2)     | 가장 작은 값을 제일 앞으로 보내자.!                                                |
| 버블 정렬 | O(N^2)     | 이웃 값과 비교하여 큰 값을 뒤로 보내자.!                                           |
| 삽입 정렬 | O(N^2)     | 왼쪽의 위치 중 알맞은 위치로 삽입하자!                                             |
| 병합 정렬 | O(N\*logN) | 제일 작은 2개의 단위로 분리하여 정렬하고 합치자                                    |
| 퀵 정렬   | O(N\*logN) | 피벗을 기준으로 작은값과 큰 값을 찾아 교환하자! 엇갈리면 피벗과 작은 값을 교환하자 |

# 1. 선택 정렬

1. 핵심
   - 가장 작은 값(또는 가장 큰 값)을 제일 앞으로 보내자
   - 앞쪽(index 0) 부터 정렬이 된다.
2. 예제(파란색 : 정렬 완료, 빨간색 : 교환)

   - <strong><span style="color:red">13, 5</span></strong>, 11, 7, 23, 15
   - <strong><span style="color:blue">5</span></strong>, <strong><span style="color:red">13</span></strong>, 11, <strong><span style="color:red">7</span></strong>, 23, 15
   - <strong><span style="color:blue">5, 7, 11, 13</span></strong>, <strong><span style="color:red">23, 15</span></strong>
   - <strong><span style="color:blue">5, 7, 11, 13, 15, 23</span></strong>

3. 복잡도 : O(N^2)
4. 소스

```cpp
std::vector<int> data = { 13,5,11,7,23,15 };
for (int i = 0; i < data.size(); i++) {
	int minIdx = i;
	for (int j = i + 1; j < data.size(); j++) {
		if (data[minIdx] > data[j]) {
			minIdx = j;
		}
	}
	int temp;
	temp = data[i];
	data[i] = data[minIdx];
	data[minIdx] = temp;
}
```

5. 사용 예시
   - N명의 수학 성적 중 3등의 점수를 구하라
   - 입력 : 80 96 75 82 96 92 100
   - 출력 : 92
   - 1등부터 3등까지만 정렬하면 되므로 선택정렬이 효율적임.

# 2. 버블 정렬

1. 핵심
   - 이웃값과 비교해서 더 큰 값을 뒤로 보내길 반복하자
   - 제일 큰 값이 오른쪽으로 이동하여 오른쪽부터 정렬된다.
2. 예제(파란색 : 정렬 완료, 빨간색 : 교환)

   - <strong><span style="color:red">13, 5</span></strong>, 11, 7, 23, 15
   - 5, <strong><span style="color:red">13, 11</span></strong>, 7, 23, 15
   - 5, 11, <strong><span style="color:red">13, 7</span></strong>, 23, 15
   - 5, 11, 7, 13, <strong><span style="color:red">23, 15</span></strong>
   - 5, <strong><span style="color:red">11, 7</span></strong>, 13, 15, <strong><span style="color:blue">23</span></strong>
   - <strong><span style="color:blue">5, 7, 11, 13, 15, 23</span></strong>

3. 복잡도 : O(N^2)
4. 소스

```cpp
std::vector<int> data = { 13,5,11,7,23,15 };

for (size_t i = 0; i < data.size(); i++) {
	for (size_t j = 0; j < data.size() -1 - i; j++) {
		if (data[j] > data[j + 1]) {
			int temp;
			temp = data[j + 1];
			data[j + 1] = data[j];
			data[j] = temp;
		}
	}
}
```

5. 사용 예시
   - 음의 정수를 양의 정수 앞으로 오도록 하되 음의 정수, 양의 정수 순서에는 변함이 없게 하라
   - 입력 : 1,2,3,-3,-2,5,6,-6
   - 출력 : -3,-2,-6,1,2,3,5,6

# 3. 삽입 정렬

1. 핵심

   - 두 번째 위치 부터 끝까지 돌면서 나보다 왼쪽의 위치 중 알맞은 위치로 삽입하자.
   - 데이터가 이미 정렬된(또는 거의 정렬된) 상태에서는 굉장히 빠르다.

2. 예제(파란색 : 정렬 완료, 빨간색 : 삽입 원소, □ : 삽입 위치)

   - <strong><span style="color:red">□</span></strong>, 13, <strong><span style="color:red">5</span></strong>, 11, 7, 23, 15
   - 5, <strong><span style="color:red">□</span></strong>, 13, <strong><span style="color:red">11</span></strong>, 7, 23, 15
   - 5, <strong><span style="color:red">□</span></strong>, 11, 13, <strong><span style="color:red">7</span></strong>, 23, 15
   - 5, 7, 11, 13, <strong><span style="color:red">23</span></strong>, 15
   - 5, 7, 11, 13, <strong><span style="color:red">□</span></strong>, 23, <strong><span style="color:red">15</span></strong>
   - <strong><span style="color:blue">5, 7, 11, 13, 15, 23</span></strong>

3. 복잡도 : O(N^2)
4. 소스

```cpp
std::vector<int> data = { 13,5,11,7,23,15 };

int j = 0;
for (size_t i = 1; i < data.size(); i++) {
	int temp = data[i];
	for (j = i - 1; j >= 0; j--) {
		if (data[j] > temp) {
			data[j + 1] = data[j];
		}
		else {
			break;
		}
	}
	data[j + 1] = temp;
}
```

# 4. 병합 정렬

1. 핵심

   - 제일 작은 2개의 단위로 분리하여 정렬하고 합치자

2. 예제(빨간색 : 비교 대상)

   - <strong><span style="color:red">13, 5</span></strong>, 11, 7, 23, 15
   - <strong><span style="color:red">5, 13, 11</span></strong>, 7 ,23 ,15
   - 5, 11, 13, <strong><span style="color:red">7, 23</span></strong>, 15
   - 5, 11, 13, <strong><span style="color:red">7, 23, 15</span></strong>
   - <strong><span style="color:red">5, 11, 13, 7, 15, 23</span></strong>
   - <strong><span style="color:blue">5, 7, 11, 13, 15, 23</span></strong>

3. 복잡도 : O(N\*logN)
4. 소스

```cpp
int number = 6;
int size;
int count = 0;
std::vector<int> sorted(number);
void merge(std::vector<int>& a, int startIdx, int middle, int endIdx) {
	int i = startIdx;
	int j = middle + 1;
	int k = startIdx;

	// 두개의 영역을 각각 비교하여 작은 수선대로 sorted에 삽입
	while (i <= middle && j <= endIdx) {
		if (a[i] <= a[j]) {
			sorted[k] = a[i];
			i++;
		}
		else {
			sorted[k] = a[j];
			j++;
		}
		k++;
	}

	// 남은 데이터 삽입(i나 j가 먼저 도달했을 경우을 대비)
	if (i > middle) {
		// i가 먼저 끝났다면 남은 j값을 넣어주자
		for (int t = j; t <= endIdx; t++) {
			sorted[k] = a[t];
			k++;
		}
	}
	else {
		// j가 먼저 끝났다면 남은 i값을 넣어주자
		for (int t = i; t <= middle; t++) {
			sorted[k] = a[t];
			k++;
		}
	}

	// 실제 배열에 복사
	for (int t = startIdx; t <= endIdx; t++) {
		a[t] = sorted[t];
	}
}

void mergeSort(std::vector<int>& a, int startIdx, int endIdx) {

	if (startIdx < endIdx) {
		int middle = (startIdx + endIdx) / 2;
		mergeSort(a, startIdx, middle);
		mergeSort(a, middle + 1, endIdx);
		merge(a, startIdx, middle, endIdx);
	}
}

int main() {
	std::vector<int> array = { 13, 5, 11, 7, 23, 15 };
	mergeSort(array, 0, array.size() - 1);
	for (auto dd : array) {
		std::cout << dd << " ";
	}
	return 0;
}
```

# 5. 퀵 정렬

1. 핵심

   - 피벗(특정 값)을 기준으로 두고 왼쪽부터 시작해 오른쪽으로 피벗보다 큰 숫자를 찾고, 동시에 오른쪽부터 시작해 왼쪽으로 피벗보다 작은 숫자를 찾아 두 숫자를 교환한다.
   - 위의 과정을 반복하다가 왼쪽과 오른쪽이 엇갈릴 때 작은 원소와 피벗을 교환한다.
   - 피벗을 기준으로 왼쪽 집단과 오른쪽 집단에 대해 위의 과정을 반복 수행한다.
   - 일반적으로 집단의 가장 앞 원소를 초기 피벗값으로 설정한다.

2. 예제(빨간색 : 피벗, 파란색 : 왼쪽부터 가서 큰 원소, 초록색 : 오른쪽부터 가서 작은 원소)

   - <strong><span style="color:red">13</span></strong>, 5, 11, <strong><span style="color:green">7</span></strong>, <strong><span style="color:blue">23</span></strong>, 15
   - 엇갈렸으므로 작은 원소(7)과 피벗(13)을 교환
   - <strong><span style="color:red">7</span></strong>, 5, 11, 13, <strong><span style="color:red">23</span></strong>, 15
   - 7, <strong><span style="color:green">5</span></strong>, <strong><span style="color:blue">11</span></strong>, 13, <strong><span style="color:red">23</span></strong>, 15
   - 엇갈렸으므로 작은 원소(5)와 피벗(7)을 교환
   - 5, 7, 11, 13, <strong><span style="color:red">23</span></strong>, <strong><span style="color:green">15</span></strong>
   - 엇갈렸으므로 작은 원소(15)와 피벗(23)을 교환
   - 5, 7, 11, 13, 15, 23

3. 복잡도 : O(N\*logN)
4. 소스

```cpp
#include<iostream>
#include<vector>
void quick(std::vector<int>& data, int startIdx, int endIdx) {
	if (startIdx >= endIdx) return;
	int pivot = data[startIdx];
	int i = startIdx, j = endIdx;
	for (i = startIdx + 1; i <= endIdx; i++) {
		if (data[i] > pivot) {
			break;
		}
	}
	for (j = endIdx; j >= startIdx + 1; j--) {
		if (data[j] < pivot) {
			break;
		}
	}

	if (i >= j) {
		data[startIdx] = data[j];
		data[j] = pivot;
	}
	else {
		int temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}
	quick(data, startIdx, j - 1);
	quick(data, j + 1, endIdx);
}

int main() {
	std::vector<int> data = { 13,5,11,7,23,15 };
	quick(data, 0, 5);
	return 0;
}
```

# 참고

1. [it 취업을 위한 알고리즘 문제풀이 (with C/C++) : 코딩테스트 대비](https://www.inflearn.com/course/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)

2. [동빈나](https://blog.naver.com/ndb796/221226800661)
