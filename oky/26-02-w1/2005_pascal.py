import sys

sys.stdin = open('2005_input.txt')

T = int(input())

for tc in range(1, T + 1):
    N = int(input())

    # 삼각형의 첫 번째 줄([1])을 미리 생성하여 초기화
    pascal = [[1]]

    # 두 번째 줄(인덱스 1)부터 N번째 줄까지 생성하는 루프
    for r in range(1, N):
        # 매 줄의 첫 번째 인덱스는 항상 1
        row = [1]

        # 이전 줄(r-1)의 값을 참조하여 현재 줄의 사이 값들을 계산
        # - 인덱스 c가 1부터 r-1까지 돌며 '왼쪽 위'와 '오른쪽 위'를 더함
        for c in range(1, r):
            row.append(pascal[r - 1][c - 1] + pascal[r - 1][c])

        # 매 줄의 마지막은 항상 1로 마무리
        row.append(1)
        # 완성된 한 줄을 삼각형 전체 구조에 추가
        pascal.append(row)

    # 언패킹을 이용해 리스트 요소를 공백 구분으로 출력
    print(f'#{tc}')
    for row in pascal:
        print(*row)