# SWEA - 2005


TC = int(input())

for test_case in range(1, TC + 1):
    num_of_line = int(input())

    # 인덱스로 풀어야겠는데?
    # 이전 리스트의 본인 인덱스 + 이전 리스트의 인덱스-1

    # 1로 채워진 2차원 리스트 생성
    pascal = [[1] * i for i in range(1, num_of_line + 1)]

    # 1번째 2번째 리스트는 1로만 채워져있으니 제외하고 순회
    for idx in range(2, num_of_line):
        # 3번째 리스트부터 가장 앞, 가장 뒤의 요소는 1로 고정이라 제외하고 순회
        for i in range(1, len(pascal[idx]) - 1):
            # 이전 리스트의 본인 인덱스 -1의 값 + 본인 인덱스의 값 을 하면 그 자리의 값이 됨
            # 왼쪽 위의 값, 오른쪽 위의 값을 더함
            pascal[idx][i] = pascal[idx-1][i-1] + pascal[idx-1][i]
    
    # 출력
    print(f'#{test_case}')
    for lst in pascal:
        print(*lst)
