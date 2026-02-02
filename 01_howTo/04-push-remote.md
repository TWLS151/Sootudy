# 4단계: 리모트에 브랜치 올리기 (Push)

로컬에서 작업한 브랜치를 GitHub에 업로드합니다.

## 📌 Push란?

로컬 브랜치의 커밋들을 리모트 저장소에 업로드하는 작업입니다.

## 🔧 실행 방법

### 1. 현재 브랜치 확인
```bash
git branch
```

### 2. 리모트에 브랜치 푸시
```bash
git push origin learned/이름/주제
```

### 3. 성공 확인
```
Enumerating objects: ...
Counting objects: ...
...
remote: Create a pull request for 'learned/이름/주제' on GitHub by visiting:
```

## 💡 자주 사용하는 명령어

### 첫 푸시 설정 (상류 브랜치 설정)
```bash
git push -u origin learned/이름/주제
```

### 이후 푸시 (간단히)
```bash
git push
```

## 🔄 여러 번 푸시하기

작업 중에 여러 번 푸시할 수 있습니다:

```bash
git add .
git commit -m "두 번째 커밋"
git push
```

## ⚠️ 주의사항

- `main` 브랜치로는 직접 푸시하지 마세요
- 항상 본인의 `learned/` 브랜치로 푸시하세요

## ✅ 확인 사항

- [ ] 브랜치명이 올바른가?
- [ ] 모든 커밋이 포함되었나?
- [ ] GitHub에서 브랜치가 보이는가?