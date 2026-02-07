# 고운 (Gowun)

**당신의 사진 속 색의 이름을 찾아드립니다.**

이미지에서 주요 색상을 추출하고, 351개의 한국 전통 색상(OIMU) 중 가장 유사한 색을 찾아 이름을 알려주는 웹 애플리케이션입니다.

## 주요 기능

- 🎨 **색상 추출**: ColorThief를 사용하여 이미지에서 6개의 주요 색상 추출
- 🔍 **색상 매칭**: CIELAB Delta E 알고리즘으로 351개의 OIMU 한국 전통 색상과 비교
- 📊 **유사도 계산**: 추출된 색과 매칭된 색의 유사도를 백분율로 표시
- 📱 **반응형 디자인**: 데스크톱과 모바일 환경 모두 지원

## 기술 스택

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS (그라디언트, 애니메이션, 트랜지션)
- **Color Extraction**: ColorThief
- **Color Matching**: CIELAB Delta E (CIE76)
- **Icons**: Lucide React

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 라이선스

MIT
