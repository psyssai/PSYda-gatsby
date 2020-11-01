---
title: "[algorithm 풀이] 6.뮤직비디오(이분 검색 응용)"
category: "algorithm/문제풀이"
date: "2020-10-22"
tags: ["C++", "algorithm"]
---

# 0. 문제

지니레코드에서는 불세출의 가수 조영필의 라이브 동영상을 DVD로 만들어 판매하려 한다.  
DVD에는 총 N개의 곡이 들어가는데, DVD에 녹화할 때에는 라이브에서의 순서가 그대로 유지되어야 한다. 순서가 바뀌는 것을 우리의 가수 조영필씨가 매우 싫어한다. 즉, 1번 노래와 5번
노래를 같은 DVD에 녹화하기 위해서는 1번과 5번 사이의 모든 노래도 같은 DVD에 녹화해야 한다.  
지니레코드 입장에서는 이 DVD가 팔릴 것인지 확신할 수 없기 때문에 이 사업에 낭비되는 DVD를 가급적 줄이려고 한다. 고민 끝에 지니레코드는 M개의 DVD에 모든 동영상을 녹화하기로 하였다. 이 때 DVD의 크기(녹화 가능한 길이)를 최소로 하려고 한다. 그리고 M개의 DVD는 모두 같은 크기여야 제조원가가 적게 들기 때문에 꼭 같은 크기로 해야 한다.

1. 입력설명

   - 첫째 줄에 자연수 N(1≤N≤1,000), M(1≤M≤N)이 주어진다. 다음 줄에는 조영필이 라이브에서 부른 순서대로 부른 곡의 길이가 분 단위로(자연수) 주어진다. 부른 곡의 길이는 10,000분을 넘지 않는다고 가정하자.

2. 출력 설명

   - 첫 번째 줄부터 DVD의 최소 용량 크기를 출력하세요.

3. 입력 예제1

   - 9 3
   - 1 2 3 4 5 6 7 8 9

4. 출력 예제1

   - 17

5. 문제 풀이 핵심
   - 입력값을 모두 더한 값을 sum, DVD 개수를 m이라고 했을 때 정답은 sum / m ~ sum 안에 존재한다고 가정한다.
   - 시작값 : sum / m, 끝값 : sum 으로 잡고 이분 검색 방법으로 정답을 찾는다.

# 1. 풀이1 : 정답의 범위를 정해놓고, 정답을 이분 검색으로 찾아 나가자!

1. 입력
   - 데이터 개수 저장 : n
   - DVD 개수 저장 : m
   - 데이터 저장 : data
   - 입력 받을 때 합계 sum 저장
2. 정답 가능한 시작값 설정
   - lt = sum / m;
3. 정답 가능한 끝값 설정
   - rt = sum;
4. mid값이 정답 가능한지 확인
   - mid = (lt + rt) / 2
   - 가능하다면, mid보다 큰값은 무조건 가능하므로, rt = mid -1 하면서 solution 변수에 mid값을 저장
   - 안된다면, mid보다는 커야 하므로, lt = mid + 1
   - 4를 반복하다가 lt와 rt가 엇갈리면 중단하고 solution 을 출력

```cpp
#include<iostream>
#include<vector>

int main() {
#include<iostream>
#include<vector>

bool isAvailable(std::vector<int> data, int mid, int num) {
	int cnt = 1;
	int sum = 0;
	for (int i = 0; i < data.size(); i++) {
		sum += data[i];
		if (mid < sum) {
			cnt++;
			sum = data[i];
		}
	}
	if (cnt <= num) {
		return true;
	}
	return false;
}

int main() {
	int n, m, sum = 0;

	scanf_s("%d %d", &n, &m);
	std::vector<int> data(n);
	for (auto& dd : data) {
		scanf_s("%d", &dd);
		sum += dd;
	}
	int lt = sum / m, rt = sum, mid, solution = sum;
	while (lt <= rt) {
		mid = (lt + rt) / 2;
		if (isAvailable(data, mid, m)) {
			solution = mid;
			rt = mid - 1;
		}
		else {
			lt = mid + 1;
		}
	}

	std::cout << solution;
	return 0;
}
}
```

9. 예시

   - 입력 : 9, 3
   - 데이터 : 1 2 3 4 5 6 7 8 9
   - sum = 45, m = 3
   - 정답은 45 / 3 = 15 ~ 45 사이에 존재
   - 중간 값인 60/2 = 30 이 가능한지 확인
   - 가능하므로 범위는 15 ~ 29, sol 변수에 30 저장
   - 중간 값인 44/2 = 22 가 가능한지 확인
   - 가능하므로 범위는 15 ~ 21, sol 변수에 22 저장
   - 중간 값인 36/2 = 18 이 가능한지 확인
   - 가능 하므로 범위는 15 ~ 17, sol 변수에 18 저장
   - 중간 값인 32/2= 16 이 가능한지 확인
   - 불가능 하므로 범위는 17~17
   - 중간 값인 34/7 = 17 이 가능한지 확인
   - 가능하므로 범위는 17 ~ 16, sol 변수에 17 저장
   - lIdx와 rIdx가 엇갈리므로 빠져나오고 sol변수에 저장된 17이 정답

# 참고

1. [it 취업을 위한 알고리즘 문제풀이 (with C/C++) : 코딩테스트 대비](https://www.inflearn.com/course/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)
