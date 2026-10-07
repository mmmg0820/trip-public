# 유럽 여행 · 공개판

여행 일정, 동선, 숙소와 식당·와인 추천을 보는 정적 웹 앱입니다. 날짜별 일정 편집과 JSON 내보내기·불러오기, 검색, 홈 화면 추가와 오프라인 캐시를 지원합니다. 추천 장소와 운행 시간은 출발 전에 공식 사이트에서 확인하세요.

개인판과 독립된 새 저장소로 시작합니다. 티켓, QR, 예약번호, 좌석, 결제 내역, 원본 문서, 암호화 보관함, 번역·백업 파일과 결혼식·청첩장 정보는 포함하지 않습니다. 개인판의 Git 기록도 복사하지 않습니다.

## 실행

Node.js 20 이상에서 `npm run dev`로 실행합니다. `npm test`는 공개 자료 제외 검증을 포함하며, `npm run build`는 `dist/`를 만듭니다. 별도 npm 패키지를 설치할 필요가 없습니다.

## GitHub Pages

[공개 저장소](https://github.com/mmmg0820/trip-public)의 main 브랜치의 루트 폴더를 GitHub Pages로 게시합니다. 수정 전 `npm test`로 공개 자료 제외 여부를 확인하세요. 저장소 Settings > Pages의 Source는 Deploy from a branch, main / (root)입니다.

사진: Mgimelfarb, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hungarian_Parliament_Building_at_Night.jpg), CC BY-SA 4.0. 화면 비율에 맞춰 표시합니다.

## 이동 지도

항공 구간은 한국–유럽 지도, 열차 구간은 중앙유럽 지도로 표시하고 차량이 경로를 따라 움직입니다. Natural Earth 공개 지리 자료를 로컬로 포함합니다. 개략 경로이며 실제 항로·철도 선형과 다를 수 있습니다. 일시정지와 동작 줄이기를 지원합니다. 공개판에는 서버 비밀번호 편집 기능이 포함되지 않습니다.
