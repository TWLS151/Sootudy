# 2단계: 브랜치 생성

새로운 작업을 위한 브랜치를 생성합니다.

## 📌 브랜치 네이밍 규칙

```
learned/이름/주제
```

### 예시
- `learned/kim/algorithm`
- `learned/park/python`
- `learned/lee/database`

## 🔧 실행 방법

### 1. main 브랜치에서 새 브랜치 생성
```bash
git checkout -b learned/이름/주제
```

### 2. 브랜치 생성 확인
```bash
git branch
```

현재 브랜치에 `*` 표시가 됩니다.

## 🎯 브랜치 전략

| 접두사 | 용도 | 예시 |
|--------|------|------|
| `learned/` | 스터디 내용 | `learned/kim/algorithm` |
| `docs/` | 문서 수정 | `docs/이름/readme` |
| `fix/` | 내용 수정 | `fix/이름/typo` |

## ✅ 확인사항

- 현재 브랜치가 맞는지 확인
- 브랜치명이 명확한지 확인
- main 브랜치에서 생성했는지 확인