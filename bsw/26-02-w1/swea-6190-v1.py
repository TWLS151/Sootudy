T = int(input())
for tc in range(1, T + 1):
    N = int(input())
    sum_ = []
    num_lst = list(map(str, input())) + [0]
    # for i in range(len(num_lst)):
    #     # 공백을 안 지우고 했슴. 그래서 valueerror 뜸
    #     if int(num_lst[i]) >= int(num_lst[i+1]):
    #         for j in range(N, 0, -1):
    #             for k in j:
    #                 sum_.append(int(num_lst[i]) * int(num_lst[i+j-1])) # i+j-1 수정 필요
    # print(f'#{tc} {max(num_lst)}')

    print(num_lst)