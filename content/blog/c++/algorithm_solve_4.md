---
title: "[algorithm 풀이] 4. Inversion Sequence"
category: "algorithm/문제풀이"
date: "2020-10-20"
tags: ["C++", "algorithm"]
---

# 0. 문제

1부터 n까지의 수를 한 번씩만 사용하여 이루어진 수열이 있을 때, 1부터 n까지 각각의 수 앞에 놓여 있는 자신보다 큰 수들의 개수를 수열로 표현한 것을 Inversion Sequence라 한다.  
예를 들어 다음과 같은 수열의 경우  
4 8 6 2 5 1 3 7
1앞에 놓인 1보다 큰 수는 4, 8, 6, 2, 5. 이렇게 5개이고,  
2앞에 놓인 2보다 큰 수는 4, 8, 6. 이렇게 3개,  
3앞에 놓인 3보다 큰 수는 4, 8, 6, 5 이렇게 4개......  
따라서 4 8 6 2 5 1 3 7의 inversion sequence는 5 3 4 0 2 1 1 0 이 된다.  
n과 1부터 n까지의 수를 사용하여 이루어진 수열의 inversion sequence가 주어졌을 때, 원래 의 수열을 출력하는 프로그램을 작성하세요.

1. 입력설명
   - 첫 번째 줄에 자연수 N(3<=N<100)이 주어지고, 두 번째 줄에는 inversion sequence가 숫자 사이에 한 칸의 공백을 두고 주어진다.
2. 출력 설명
   - 오름차순으로 정렬된 수열을 출력합니다.
3. 입력 예제1
   - 8
   - 5 3 4 0 2 1 1 0
4. 출력 예제1
   - 4 8 6 2 5 1 3 7
5. 문제 풀이 핵심

   - 입력 데이터 끝에서 부터 시작!
   - 입력 데이터의 값 만큼 앞으로 땡기고, 그 자리에 해당 숫자를 입력
   - 삽입 정렬!!

# 1. 풀이1 : 1부터 자기 위치에 저장하자!

1. 입력
   - 사용자에게 num을 입력 받음
   - data vector를 num 개수 만큼 초기화
   - reuslt vector를 num 개수 만큼 101로 초기화(최대값이 100이므로)
2. i = 0 ~ n-1 까지 반복
   - 숫자는 1부터 시작하므로 idx = i+1로 저장
3. j = 0 ~ n-1 까지 반복
   - result[j] 가 idx보다 크면 개수를 +1
   - 개수가 data[i] + 1 과 같으면 break
4. result[j] 에는 idx를 저장
5. 반복이 끝나면 값 출력

```cpp
#include<iostream>
#include<vector>

int main() {
	// 데이터 입력
	int num;
	scanf_s("%d", &num);
	std::vector<int> data(num);
	for (auto & dd : data) {
		scanf_s("%d", &dd);
	}

	std::vector<int> result(num,101);
	int j = 0;
	for (int i = 0; i < data.size(); i++) {
		int idx = i + 1;	// 해당 번호 저장(1~n)
		int cnt = 0;
		for (j = 0; j < result.size(); j++) {
			if (result[j] > idx) {
				cnt++;
			}
			if (cnt == data[i]+1) {
				break;
			}
		}
		result[j] = idx;
	}

	for (auto dd : result) {
		std::cout << dd << " ";
	}
	return 0;
}
```

9. 예시

   - 입력 : 8
   - data : 5,3,4,0,2,1,1,0
   - result : 101,101,101,101,101,<strong><span style="color:red">1</span></strong>,101,101
   - result : 101,101,101,<strong><span style="color:red">2</span></strong>,101,1,101,101
   - result : 101,101,101,2,101,1,<strong><span style="color:red">3</span></strong>,101
   - result : <strong><span style="color:red">4</span></strong>,101,101,2,101,1,3,101
   - result : 4,101,101,2,<strong><span style="color:red">5</span></strong>,1,3,101
   - result : 4,101,<strong><span style="color:red">6</span></strong>,2,5,1,3,101
   - result : 4,101,6,2,5,1,3,<strong><span style="color:red">7</span></strong>
   - result : 4,<strong><span style="color:red">8</span></strong>,6,2,5,1,3,7

# 2. 풀이2 : 뒤에서 부터 저장하자!

1. 입력
   - 사용자에게 num을 입력 받음
   - data vector를 num 개수 만큼 초기화
   - reuslt vector를 num 개수 만큼 101로 초기화(최대값이 100이므로)
2. i는 끝에서부터 시작까지 반복
   - j는 i에서 시작하여 data[i]의 개수만큼 데이터를 앞으로 땡김
   - result[j] 에 idx를 저장

```cpp
int main() {
	int num;
	scanf_s("%d", &num);

	std::vector<int> data(num);
	std::vector<int> result(num);

	for (auto & dd : data) {
		scanf_s("%d", &dd);
	}

	int i = 0, j = 0, idx;

	for (i = data.size() - 1; i >= 0; i--) {
		idx = i + 1;
		for (j = i; j < i + data[i]; j++) {
			result[j] = result[j + 1];
		}
		result[j] = idx;
	}
	for (auto dd : result) {
		std::cout << dd << " ";
	}
	return 0;
}
```

9. 예시

   - 입력 : 8
   - data : 5,3,4,0,2,1,1,0
   - result : 0,0,0,0,0,0,0,<strong><span style="color:red">8</span></strong>
   - result : 0,0,0,0,0,0,<strong><span style="color:blue">8</span>,<span style="color:red">7</span></strong>
   - result : 0,0,0,0,0,<strong><span style="color:blue">8</span>,<span style="color:red">6</span></strong>,7
   - result : 0,0,0,0,<strong><span style="color:blue">8,6</span>,<span style="color:red">5</span></strong>,7
   - result : 0,0,0,<strong><span style="color:red">4</span></strong>,8,6,5,7
   - result : 0,0,<strong><span style="color:blue">4,8,6,5</span>,<span style="color:red">3</span></strong>,7
   - result : 0,<strong><span style="color:blue">4,8,6</span>,<span style="color:red">2</span></strong>,5,3,7
   - result : <strong><span style="color:blue">4,8,6,2,5,</span><span style="color:red">1</span></strong>,3,7

# 참고

1. [it 취업을 위한 알고리즘 문제풀이 (with C/C++) : 코딩테스트 대비](https://www.inflearn.com/course/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)
