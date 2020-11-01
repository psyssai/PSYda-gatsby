---
title: "[algorithm 풀이] 5.연속된 자연수의 합"
category: "algorithm/문제풀이"
date: "2020-10-21"
tags: ["C++", "algorithm"]
---

# 0. 문제

입력으로 양의 정수 N이 입력되면 2개 이상의 연속된 자연수의 합으로 정수 N을 표현하는 방법의 가짓수를 출력하는 프로그램을 작성하세요.  
만약 N=15이면  
7+8=15  
4+5+6=15  
1+2+3+4+5=15  
와 같이 총 3가지의 경우가 존재한다.

1. 입력설명

   - 첫 번째 줄에 양의 정수 N(7<=N<1000)이 주어진다.

2. 출력 설명
   - 첫줄부터 각각의 경우의 수를 출력한다. 맨 마지막 줄에 총 개수를 출력한다
3. 입력 예제1
   - 15
4. 출력 예제1
   - 7 + 8 = 15
   - 4 + 5 + 6 = 15
   - 1 + 2 + 3 + 4 + 5 = 15
   - 3
5. 문제 풀이 핵심
   - 2개 연속된 수의 경우 숫자에서 1,2를 뺀 값이 2로 나누어지는지 확인한다.
   - 3개 연속된 수의 경우 숫자에서 1,2,3을 뺀 값이 3으로 나누어지는지를 확인한다.
   - 반복한다.

# 1. 풀이1 : 오른쪽으로 +1 왼쪽으로 -1을 반복하자.

1. 방법 요약
   - 입력 변수(num)를 n(2~num)으로 나누고, 좌/우로 값을 번갈아 하나씩 연결시키며 더한다.(n 개수 만큼 연결)
   - 더한 값이 num과 같으면 기록하고, 커지면 break한다.
   - 반복하다가 왼쪽 값이 1이거나 오른쪽값이 num과 같아지면 그만한다.

```cpp
#include<iostream>
#include<vector>

int main() {
#include<iostream>
#include<deque>
int main() {
	int num;
	scanf_s("%d", &num);

	int cnt = 0;
	int lIdx = 0, rIdx = 0;
	int n = 2;

	for (n = 2; n < num; n++) {
		int sum = 0;
		int mok = num / n;
		std::deque<int> result;
		bool flag = true;
		lIdx = mok;  rIdx = mok;
		int kk = 1;
		sum += mok;
		result.push_back(mok);
		while (kk < n) {
			if(flag){
				rIdx++;
				sum += rIdx;
				flag = false;
				result.push_back(rIdx);
			}
			else {
				lIdx--;
				sum += lIdx;
				flag = true;
				result.push_front(lIdx);
			}
			kk++;
			if (sum > num) break;
			else if (sum == num) {
				std::cout << result[0];
				for (int ii = 1; ii < result.size(); ii++) {
					std::cout << " + " << result[ii];
				}
				std::cout << " = " << sum << std::endl;

				cnt++;
			}
			if (lIdx == 1 || rIdx == num) break;
		}

	}
	std::cout << cnt;
	return 0;
}
```

9. 예시

   - 입력 : 15
   - 2로 나누어질 경우
   - 15 / 2 = 7 => 오른쪽하나 증가하여 8 , ==> {7,8}
   - 15 / 3 = 5 => 오른쪽하나 증가 6, 왼쪽하나 증가 4, ==> {4,5,6}
   - 15 / 4 = 3 => 오른쪽 하나 증가 4, 왼쪽하나 증가 2, 오른쪽하나 증가 5 ==> 2+3+4+5 != 15 이므로 (x)
   - 15 / 5 = 3 => 오른쪽 하나 증가 4, 왼쪽하나 증가 2, 오른쪽하나 증가 5, 왼쪽 하나 증가 1 ==> {1,2,3,4,5}
   - lIdx가 1이므로 멈춤

# 2. 풀이2 : n이 연속된 2개로 분리된다면, n에서 1,2 를 뺀값을 2로 나누어 떨어진다.

1. 방법 요약
   - n = 2일 경우, 15 에서 1,2를 뺀 12를 2로 나누어 떨어진다.
   - 1,2에 12/2의 몫 6을 각각 더해주면 된다. ( 7,8 )
   - n = 3일 경우, 15에서 1,2,3을 뺀 9를 3으로 나누어 떨어진다.
   - 1,2,3에 9/3의 몫 3를 각각 더한다. (4,5,6)
   - 반복한다.

```cpp
int main() {
#include<iostream>
using namespace std;

int main() {
	int a, b = 1, cnt = 0, tmp, i;
	scanf_s("%d", &a);
	tmp = a;
	a--;

	while (a > 0) {
		b++;
		a = a - b;
		if (a%b == 0) {
			for (i = 1; i < b; i++) {
				printf("%d + ", (a / b) + i);
			}
			printf("%d = %d\n", (a / b) + i, tmp);
			cnt++;
		}
	}
	printf("%d\n", cnt);
	return 0;
}
```

9. 예시

   - 입력 : 15
   - n : 2일 경우
   - 15 에서 1,2를 뺀 12 / 2 는 나머지가 0이므로 1,2에 6을 더한 값이 정답 => {7,8}
   - n : 3일 경우
   - 15 에서 1,2,3를 뺀 9 / 3 은 나머지가 0이므로 1,2,3에 3을 더한 값이 정답 => {4,5,6}
   - 15 에서 1,2,3,4를 뺀 5 / 4 은 나머지가 1이므로 pass
   - 15에서 1,2,3,4,5를 뺀 0 / 5 는 나머지가 0이므로 1,2,3,4,5에 0을 더한 값이 정답 => {1,2,3,4,5}
   - a가 0이므로 멈추고 개수 출력

# 참고

1. [it 취업을 위한 알고리즘 문제풀이 (with C/C++) : 코딩테스트 대비](https://www.inflearn.com/course/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)
