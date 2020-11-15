---
title: "[algorithm 이론] 2. 이분 검색"
category: "algorithm/이론"
date: "2020-10-20"
tags: ["C++", "algorithm"]
---

# 0. 요약

# 1. 이분 검색 이란?

1. 정렬된 데이터를 계속해서 반으로 나누어 빠르게 찾는 방법
2. 복잡도 : O(logn)
3. 사용 예시
   - 자료구조 내에 특정 값을 찾을 떄(vector에 30이 있는지)
   - 특정 값이 정답인지 추려나갈 때 사용(lt~rt사이에서 정답을 찾을 때)

# 2. 이분 검색 방법

1. n개의 데이터를 정렬
2. 양끝을 가리키는 포인터 생성
   - lt = 0번째 인덱스
   - rt = n-1번째 인덱스
3. 가운데를 가리키는 포인터 생성
   - mid = (lt+rt) / 2
4. mid 가 찾는 값(key) 인지 확인
   - 같다면 그 index(몇번째인지 출력시 index + 1)를 출력
   - mid가 key보다 크다면, rt를 mid - 1로 설정
   - mid가 key보다 작다면, lt를 mid + 1로 설정
   - 2~4를 반복
5. lt 가 rt보다 크면 찾는 값이 없으므로 중단함

# 3. 예제

1. 입력 데이터
   - 개수 8
   - 데이터 : 12, 23, 32, 57, 65, 81, 87, 99
   - 찾는 값 : 32
2. lt = 0, rt = 7
   - mid = 3
   - data[mid] = 57 > 32
   - rt = mid -1 = 2
3. lt = 0, rt = 2
   - mid = 1
   - data[mid] = 23 < 32
   - lt = mid + 1 = 2
4. lt = 2, rt = 2
   - mid = 2
   - data[mid] = 32 == 32
5. 찾는 인덱스는 mid+2 = 3번째 인덱스

# 4. 소스

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
int main() {
	int cnt, num;
	scanf_s("%d %d", &cnt, &num);

	std::vector<int> data(cnt);
	for (auto& dd : data) {
		scanf_s("%d", &dd);
	}

	std::sort(data.begin(), data.end());

	int lt = 0, rt = data.size() - 1, mid;
	while (1) {
		mid = (lt + rt) / 2;
		if (num == data[mid]) {
			std::cout << mid + 1;
			break;
		}
		else if (num > data[mid]) {
			lt = mid + 1;
		}
		else {
			rt = mid - 1;
		}
		if (lt > rt) {
			std::cout << "찾는 값 없음";
			break;
		}
	}
	return 0;
}
```

# 참고

1. [it 취업을 위한 알고리즘 문제풀이 (with C/C++) : 코딩테스트 대비](https://www.inflearn.com/course/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)
