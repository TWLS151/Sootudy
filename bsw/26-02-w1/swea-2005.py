# 1로 채우고
# 다음 행으로 내려가면 위치의 바로 위의 숫자와 바로 위의
# 왼쪽 숫자를 더한 것을 부여
T = int(input())
for tc in range(1, T + 1):
    N = int(input())
    num_lst = [[0] * (N+2) for _ in range(N+2)]
    for c in range(1, N + 2):
        for r in range(1, N + 2):
            if r == 1:
                num_lst[r][c] = 1
            if c == 1:
                num_lst[r][c] = 1
                break
            num_lst[r][c] = num_lst[r-1][c] + num_lst[r-1][c-1]
    print(f'#{tc}')
    num_lst = num_lst[2:]
    for num in num_lst:
        num_lst2 = []
        for j in range (N):
            for i in num:
                if num[i] !=0:
                    [num_lst2[j].append(num[i])]
        print(*num_lst2)
    
            
            
