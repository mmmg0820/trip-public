import {escapeHTML as esc} from './core.js?v=16';
export const dining = {
 hungarikum:{name:'헝가리쿰 비스트로 · Hungarikum',city:'부다페스트',address:'Steindl Imre utca 13',menu:['소고기 스튜와 덤플링','바삭한 오리 다리와 감자·양배추'],budget:'2인 22,000–32,000 HUF · 계획 예산',hours:'런치·디너 영업 시간은 공식 예약에서 확인',booking:'예약 가능한 시간을 먼저 확인. 강변 산책 전에 식사하기 좋아요.',url:'https://hungarikumbisztro.hu/',menuUrl:'https://hungarikumbisztro.hu/',source:'https://hungarikumbisztro.hu/'},
 plachutta:{name:'플라후타 · Wollzeile점',city:'빈',address:'Wollzeile 38',menu:['타펠슈피츠 · 육수에 삶은 소고기와 곁들임','비너 슈니첼 · 오스트리아식 커틀릿'],budget:'2인 €85–120 · 계획 예산',hours:'매일 11:30–23:30',booking:'공식 사이트에서 Wollzeile점을 골라 예약하세요.',url:'https://www.plachutta.at/en/restaurant/wollzeile/',menuUrl:'https://www.plachutta.at/en/menu-wollzeile/',source:'https://www.plachutta.at/en/restaurant/wollzeile/'},
 eska:{name:'에스카 · Karlín점',city:'프라하',address:'Pernerova 49',menu:['재에 구운 감자 · Potatoes in ash','빵과 커피 · 에스카 사워도우 빵'],budget:'2인 700–1,100 CZK · 계획 예산',hours:'평일 08:00–18:00 · 주말 09:00–18:00',booking:'브런치·점심으로 배치해요. 저녁 18:00 이후 코스에는 넣지 않아요.',url:'https://eska.ambi.cz/en/',menuUrl:'https://eska.ambi.cz/en/menu/afternoon',source:'https://eska.ambi.cz/en/'},
 hallstatt:{name:'브로이가스트호프 · Bräugasthof Hallstatt',city:'할슈타트',address:'Seestraße 120',menu:['호수 생선 요리 · 당일 생선과 조리 방식 확인','오스트리아식 메인과 홈메이드 디저트'],budget:'2인 €60–90 · 계획 예산',hours:'계절별 영업·휴무는 방문 전 문의 필요',booking:'겨울 영업을 먼저 확인. 휴무면 실내 식당 대안을 찾아야 해요.',url:'https://www.hallstatt.net/restaurants-en-us/neue-contentpage-2-en-us/',menuUrl:'https://www.hallstatt.net/restaurants-en-us/neue-contentpage-2-en-us/',source:'https://www.hallstatt.net/restaurants-en-us/neue-contentpage-2-en-us/'},
 menza:{name:'멘자 · Menza',city:'부다페스트',address:'Liszt Ferenc tér 2',menu:['굴라시 수프 · 파프리카와 소고기를 끓인 헝가리식 수프','오리 가슴살과 버섯 리조또 · 둘이 나눠 먹기 좋은 메인'],budget:'2인 18,000–26,000 HUF · 계획 예산, 음료에 따라 달라요',hours:'11:00–23:30 · 주방 11:30–22:30',booking:'저녁은 공식 사이트에서 미리 예약. 메뉴 가격과 서비스료 확인.',url:'https://menzaetterem.hu/en/',menuUrl:'https://menzaetterem.hu/en/food/',source:'https://www.tourlive.co.kr/blog/guide/hungary/budapest-food-guide/'},
 gerbeaud:{name:'제르보 · Gerbeaud',city:'부다페스트',address:'Vörösmarty tér 7–8',menu:['헝가리 전통 케이크 · 당일 진열 케이크에서 선택','커피 또는 차 · 둘이 디저트 한 접시를 나눠요'],budget:'2인 12,000–20,000 HUF · 계획 예산',hours:'일–목 09:00–20:00 · 금·토 09:00–21:00',booking:'예약을 받지 않아요. 현장 대기 20–30분을 별도로 잡아요.',url:'https://gerbeaud.hu/en/',menuUrl:'https://gerbeaud.hu/en/our-selection/',source:'https://korhun.com/pages/food'},
 figl:{name:'피그뮐러 · Bäckerstraße점',city:'빈',address:'Bäckerstraße 6',menu:['피그뮐러 슈니첼 · 돼지고기 커틀릿','감자 샐러드 · 슈니첼 곁들임으로 선택'],budget:'2인 €60–85 · 계획 예산',hours:'11:30–23:30 · 주방 22:00까지',booking:'Bäckerstraße점을 선택해 예약하세요. 돼지고기와 송아지고기 메뉴가 달라요.',url:'https://www.figlmueller.at/en/baeckerstrasse/',menuUrl:'https://www.figlmueller.at/en/baeckerstrasse/menu/',source:'https://www.myrealtrip.com/community/posts/39640'},
 demel:{name:'드멜 · Demel',city:'빈',address:'Kohlmarkt 14',menu:['카이저슈마른 · 잘라 구운 오스트리아식 팬케이크','커피와 케이크 · 쇼케이스에서 취향대로 선택'],budget:'2인 €30–45 · 계획 예산',hours:'매일 10:00–19:00',booking:'예약 불가. 대기가 길면 포장하고 미하엘 광장에서 쉬어요.',url:'https://www.demel.com/',menuUrl:'https://www.demel.com/',source:'https://www.myrealtrip.com/community/posts/16382'},
 kloster:{name:'슈티글 클로스터호프 · Stiegl-Klosterhof',city:'린츠',address:'Landstraße 30',menu:['오스트리아식 식사 · 당일 공식 메뉴에서 메인 선택','Stiegl 맥주 또는 무알코올 라들러'],budget:'2인 €45–70 · 계획 예산',hours:'매일 운영 · 계절별 주방 시간은 공식 사이트 확인',booking:'공식 사이트 예약 가능. 다음 열차가 있으면 주문 전 필요한 식사 시간을 말해요.',url:'https://www.klosterhof.at/',menuUrl:'https://www.klosterhof.at/kulinarik/speisekarte/',source:'https://www.klosterhof.at/kontakt-service/faqs/'},
 lokal:{name:'로칼 · Lokál Dlouhááá',city:'프라하',address:'Dlouhá 33',menu:['치즈 튀김과 감자 · Fried artisan edam cheese','버터에 구운 돼지고기 슈니첼과 감자 샐러드'],budget:'2인 900–1,300 CZK · 계획 예산',hours:'월–토 11:00–24:00 · 일 11:00–22:00',booking:'공식 사이트에서 예약. 점심·저녁 메뉴가 다를 수 있어요.',url:'https://lokal-dlouha.ambi.cz/en/',menuUrl:'https://lokal-dlouha.ambi.cz/en/menu',source:'https://www.myrealtrip.com/offers/4063'},
 savoy:{name:'카페 사보이 · Café Savoy',city:'프라하',address:'Vítězná 5',menu:['Savoy 조식 · 오믈렛·햄 샌드위치·케이크·주스','Savoy 케이크 또는 애플 스트루델 · 커피와 함께'],budget:'2인 900–1,500 CZK · 계획 예산',hours:'평일 08:00–22:00 · 주말·공휴일 09:00–22:00',booking:'공식 예약 추천. 조식 메뉴는 주문 가능한 시간을 확인하세요.',url:'https://www.cafesavoy.ambi.cz/en/',menuUrl:'https://www.cafesavoy.ambi.cz/en/menu',source:'https://www.myrealtrip.com/community/posts/16361'},
 sophien:{name:'조피엔켈러 · Sophienkeller',city:'드레스덴',address:'Taschenberg 3',menu:['작센식 감자 수프 · 소시지가 들어간 따뜻한 수프','자우어브라텐 · 붉은 양배추·감자 덤플링과 소고기'],budget:'2인 €60–85 · 계획 예산',hours:'월요일 휴무(공휴일 예외) · 화–토 11:00–23:00 · 일 11:00–22:00',booking:'예약 추천. 월요일에는 이 식당을 배치하지 않고 대안을 확인하세요.',url:'https://sophienkeller-dresden.de/reservierung/',menuUrl:'https://sophienkeller-dresden.de/speisekarten',source:'https://sophienkeller-dresden.de/'}
};
dining.kloster.menu=['그릴 치킨과 리지비지 · 완두콩을 넣은 쌀밥','피아커 굴라시 · 오스트리아식 소고기 스튜'];
const s=(time,activity,place='',note='')=>({time,activity,place,note});
export const sightseeing=[
 {
  "date": "11월 7일 (토)",
  "city": "출발",
  "title": "한국 출발 · 대전 → 광명 → 인천공항",
  "slots": [
   {
    "time": "16:30–17:30",
    "activity": "출발 준비·짐과 여권 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "17:30–18:00",
    "activity": "대전역 이동·열차 탑승 준비",
    "place": "",
    "note": ""
   },
   {
    "time": "18:00–20:30",
    "activity": "KTX·공항버스로 인천공항 이동",
    "place": "",
    "note": "각 구간은 예약된 출발 시각 우선. 광명에서 버스 정류장과 터미널을 확인하세요."
   },
   {
    "time": "20:30–22:00",
    "activity": "수하물 위탁·보안 검색·저녁 식사",
    "place": "",
    "note": ""
   },
   {
    "time": "22:00–23:00",
    "activity": "탑승구 이동·헬싱키행 탑승 준비",
    "place": "",
    "note": ""
   }
  ],
  "url": "https://www.airport.kr/",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 8일 (일)",
  "city": "헬싱키",
  "title": "첫 환승일 · 헬싱키 산책 → 부다페스트",
  "slots": [
   {
    "time": "06:00–07:30",
    "activity": "입국·짐 연결 여부 확인·아침 식사",
    "place": "",
    "note": ""
   },
   {
    "time": "07:30–08:30",
    "activity": "공항철도로 중앙역 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "08:30–09:30",
    "activity": "중앙역·에스플라나디 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "09:30–10:30",
    "activity": "원로원 광장·대성당 외관 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "10:30–11:30",
    "activity": "마켓 광장·항구 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "11:30–12:30",
    "activity": "중심가에서 점심",
    "place": "",
    "note": "따뜻한 연어 수프와 빵. 당일 영업 중인 식당의 메뉴·가격을 먼저 확인하세요."
   },
   {
    "time": "12:30–13:30",
    "activity": "기념품 구경·중앙역 복귀",
    "place": "",
    "note": ""
   },
   {
    "time": "13:30–14:30",
    "activity": "공항철도로 공항 복귀",
    "place": "",
    "note": ""
   },
   {
    "time": "14:30–16:00",
    "activity": "보안 검색·탑승구 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "19:30–21:00",
    "activity": "부다페스트 도착 후 숙소 이동·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "21:30–22:15",
    "activity": "멘자에서 첫 저녁",
    "place": "menza",
    "note": "지연되면 주방 마감 확인 후 가까운 식사로 변경."
   }
  ],
  "url": "https://www.myhelsinki.fi/",
  "rain": "환승·입국이 지연되면 시내 방문을 줄이거나 생략하세요. 공항 복귀 목표 14:30.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "city": "부다페스트",
  "title": "성 지구와 강변 사진",
  "pace": "부다페스트에서 온전히 보내는 하루",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요.",
  "slots": [
   {
    "time": "09:00–09:30",
    "activity": "어부의 요새로 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "09:30–10:30",
    "activity": "어부의 요새에서 커플 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "10:30–11:30",
    "activity": "마차시 성당 주변·성 지구 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "11:30–12:15",
    "activity": "페스트로 이동·식사 대기",
    "place": "",
    "note": ""
   },
   {
    "time": "12:15–13:30",
    "activity": "멘자 점심",
    "place": "menza",
    "note": ""
   },
   {
    "time": "13:30–14:15",
    "activity": "성 이슈트반 대성당 주변 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "14:15–15:00",
    "activity": "제르보로 도보 이동·대기",
    "place": "",
    "note": ""
   },
   {
    "time": "15:00–16:00",
    "activity": "제르보에서 케이크와 커피",
    "place": "gerbeaud",
    "note": ""
   },
   {
    "time": "16:00–17:30",
    "activity": "숙소 복귀·90분 휴식",
    "place": "",
    "note": ""
   },
   {
    "time": "17:30–18:00",
    "activity": "저녁 식당으로 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "18:00–19:00",
    "activity": "헝가리쿰에서 오리 다리·소고기 스튜",
    "place": "hungarikum",
    "note": ""
   },
   {
    "time": "19:00–19:30",
    "activity": "강변으로 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "19:30–20:15",
    "activity": "국회의사당 야경 사진·숙소 복귀",
    "place": "",
    "note": ""
   }
  ],
  "rain": "성 지구 체류를 줄이고 제르보에서 쉬어요. 해질녘 시각에 따라 야경 시간은 이동해요.",
  "url": "https://www.budapestinfo.hu/",
  "date": "11월 9일 (월)"
 },
 {
  "date": "11월 10일 (화)",
  "city": "빈",
  "title": "부다페스트 → 빈 · 도심 산책과 저녁",
  "slots": [
   {
    "time": "08:00–09:00",
    "activity": "아침 식사·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "09:00–10:30",
    "activity": "체크아웃·역 이동·탑승 준비",
    "place": "",
    "note": ""
   },
   {
    "time": "10:30–14:30",
    "activity": "빈으로 기차 이동",
    "place": "",
    "note": "열차 출발·도착은 개인 티켓 기준. 식사와 탑승 대기 포함."
   },
   {
    "time": "14:30–15:30",
    "activity": "숙소 이동·짐 맡기기·환복",
    "place": "",
    "note": ""
   },
   {
    "time": "15:30–16:00",
    "activity": "슈테판 광장·그라벤 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "16:00–16:45",
    "activity": "드멜에서 디저트",
    "place": "demel",
    "note": ""
   },
   {
    "time": "17:00–18:00",
    "activity": "피그뮐러에서 저녁",
    "place": "figl",
    "note": ""
   },
   {
    "time": "18:00–19:00",
    "activity": "공연장 이동 또는 오페라극장 주변 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "19:00–21:30",
    "activity": "공연 관람 또는 도심 야경",
    "place": "",
    "note": "공연을 보는 경우 입장·종료 시각은 티켓 확인. 야경 산책은 자유 선택."
   }
  ],
  "url": "https://www.wien.info/en",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 11일 (수)",
  "city": "린츠",
  "title": "빈의 짧은 아침 → 린츠의 첫 저녁",
  "slots": [
   {
    "time": "08:00–09:00",
    "activity": "아침 식사·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "09:00–10:15",
    "activity": "벨베데레 정원 주변 산책",
    "place": "",
    "note": "실내 관람은 입장 예약과 역 복귀 시간을 확보할 수 있을 때만 선택."
   },
   {
    "time": "10:15–11:30",
    "activity": "숙소에서 짐 찾기·체크아웃·역 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "11:30–14:00",
    "activity": "린츠행 열차 대기·이동",
    "place": "",
    "note": ""
   },
   {
    "time": "14:00–15:00",
    "activity": "숙소 이동·짐 맡기기",
    "place": "",
    "note": ""
   },
   {
    "time": "15:00–16:30",
    "activity": "체크인·샤워·휴식",
    "place": "",
    "note": ""
   },
   {
    "time": "16:30–17:30",
    "activity": "중앙광장·구시가지 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "17:30–18:30",
    "activity": "클로스터호프 저녁",
    "place": "kloster",
    "note": ""
   },
   {
    "time": "18:30–19:00",
    "activity": "다뉴브 강변·숙소 복귀",
    "place": "",
    "note": ""
   }
  ],
  "url": "https://www.linztourismus.at/en/",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "city": "할슈타트",
  "title": "호숫가에서 보내는 하루",
  "pace": "린츠에서 렌터카 당일 왕복",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요.",
  "slots": [
   {
    "time": "07:30–08:00",
    "activity": "아침 식사",
    "place": "",
    "note": ""
   },
   {
    "time": "08:00–08:30",
    "activity": "차량 인수·상태 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "08:30–10:45",
    "activity": "할슈타트로 이동 · 휴게 시간 포함",
    "place": "",
    "note": ""
   },
   {
    "time": "10:45–11:45",
    "activity": "주차 대기·마을 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "11:45–12:30",
    "activity": "호수 전망 포인트에서 커플 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "12:30–13:30",
    "activity": "브로이가스트호프 점심",
    "place": "hallstatt",
    "note": ""
   },
   {
    "time": "13:30–14:30",
    "activity": "마르크트 광장·호숫가 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "14:30–15:15",
    "activity": "주차장 복귀·출발 준비",
    "place": "",
    "note": ""
   },
   {
    "time": "15:15–17:45",
    "activity": "린츠로 복귀 · 휴게·교통 여유 포함",
    "place": "",
    "note": ""
   },
   {
    "time": "17:45–18:30",
    "activity": "주유·차량 반납 · 실제 마감 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "18:30–19:30",
    "activity": "클로스터호프 저녁",
    "place": "kloster",
    "note": ""
   }
  ],
  "rain": "폭설·결빙이면 장거리 운전 코스를 변경해요. 소금광산·스카이워크는 운영 시간과 사전 입장 가능 여부 확인 후 선택하며 기본 코스에는 넣지 않았어요.",
  "url": "https://www.hallstatt.net/parking-in-hallstatt/cars/",
  "date": "11월 12일 (목)"
 },
 {
  "date": "11월 13일 (금)",
  "city": "프라하",
  "title": "린츠 → 프라하 · 짐 정리 후 구시가지",
  "slots": [
   {
    "time": "08:00–09:00",
    "activity": "아침 식사·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "09:00–10:30",
    "activity": "린츠 구시가지 짧은 산책",
    "place": "",
    "note": ""
   },
   {
    "time": "10:30–11:30",
    "activity": "체크아웃·역 이동·간식 구매",
    "place": "",
    "note": ""
   },
   {
    "time": "11:30–16:00",
    "activity": "프라하행 기차 대기·이동",
    "place": "",
    "note": ""
   },
   {
    "time": "16:00–17:00",
    "activity": "숙소 이동·체크인·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "17:00–17:30",
    "activity": "샤워·환복",
    "place": "",
    "note": ""
   },
   {
    "time": "17:30–18:00",
    "activity": "로칼로 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "18:00–19:15",
    "activity": "체코식 저녁",
    "place": "lokal",
    "note": ""
   },
   {
    "time": "19:15–20:00",
    "activity": "구시가지 광장·천문시계 외관 사진",
    "place": "",
    "note": ""
   }
  ],
  "url": "https://prague.eu/en/",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 14일 (토)",
  "city": "드레스덴",
  "title": "프라하 ↔ 드레스덴 · 엘베강과 구시가지",
  "slots": [
   {
    "time": "08:00–09:00",
    "activity": "아침 식사·당일 짐 챙기기",
    "place": "",
    "note": ""
   },
   {
    "time": "09:00–10:00",
    "activity": "프라하 중앙역 이동·탑승 준비",
    "place": "",
    "note": ""
   },
   {
    "time": "10:00–13:00",
    "activity": "드레스덴행 기차 대기·이동",
    "place": "",
    "note": ""
   },
   {
    "time": "13:00–13:30",
    "activity": "역에서 구시가지 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "13:30–14:30",
    "activity": "조피엔켈러 점심",
    "place": "sophien",
    "note": ""
   },
   {
    "time": "14:30–15:30",
    "activity": "츠빙거 안뜰·젬퍼오퍼 외관 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "15:30–16:15",
    "activity": "군주의 행렬·프라우엔 교회 주변",
    "place": "",
    "note": ""
   },
   {
    "time": "16:15–17:00",
    "activity": "브륄 테라스·엘베강 커플 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "17:00–18:00",
    "activity": "간단한 저녁·역으로 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "18:00–19:00",
    "activity": "플랫폼 확인·탑승 준비",
    "place": "",
    "note": ""
   },
   {
    "time": "19:00–22:00",
    "activity": "기차로 프라하 복귀·숙소 이동",
    "place": "",
    "note": ""
   }
  ],
  "url": "https://www.dresden.de/en/tourism/tourism.php",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 15일 (일)",
  "city": "프라하",
  "title": "공항 주변 숙소로 이동 · 가벼운 마지막 산책",
  "slots": [
   {
    "time": "08:30–09:30",
    "activity": "아침 식사·짐 정리",
    "place": "",
    "note": ""
   },
   {
    "time": "09:30–10:45",
    "activity": "체크아웃 준비·이동",
    "place": "",
    "note": ""
   },
   {
    "time": "10:45–12:30",
    "activity": "공항 주변 숙소로 이동·짐 맡기기",
    "place": "",
    "note": ""
   },
   {
    "time": "12:30–13:30",
    "activity": "점심·짐 보관 가능 여부 확인",
    "place": "",
    "note": "짐 보관이 안 되면 시내 재방문을 생략하고 숙소 주변에서 쉬어요."
   },
   {
    "time": "13:30–14:30",
    "activity": "짐 보관 가능할 때만 시내 이동",
    "place": "",
    "note": ""
   },
   {
    "time": "14:30–15:30",
    "activity": "카를교·캄파에서 마지막 커플 사진",
    "place": "",
    "note": ""
   },
   {
    "time": "15:30–16:30",
    "activity": "카페 사보이에서 디저트",
    "place": "savoy",
    "note": ""
   },
   {
    "time": "16:30–17:30",
    "activity": "공항 주변 숙소로 복귀",
    "place": "",
    "note": ""
   },
   {
    "time": "17:30–18:30",
    "activity": "체크인·짐 정리·휴식",
    "place": "",
    "note": ""
   },
   {
    "time": "18:30–19:30",
    "activity": "숙소 주변에서 저녁",
    "place": "",
    "note": "공항 식당 또는 숙소 식당의 당일 메뉴와 영업 시간 확인."
   }
  ],
  "url": "https://prague.eu/en/",
  "rain": "짐 보관·교통편·날씨가 불확실하면 시내 왕복 대신 공항 주변에서 쉬어요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 16일 (월)",
  "city": "귀국",
  "title": "프라하 → 헬싱키 → 인천",
  "slots": [
   {
    "time": "07:00–08:00",
    "activity": "아침 식사·짐 정리·체크아웃",
    "place": "",
    "note": ""
   },
   {
    "time": "08:00–09:00",
    "activity": "프라하 공항 이동·터미널 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "09:00–10:30",
    "activity": "수하물 위탁·보안 검색",
    "place": "",
    "note": ""
   },
   {
    "time": "10:30–11:30",
    "activity": "탑승구 확인·탑승 대기",
    "place": "",
    "note": ""
   },
   {
    "time": "15:00–15:45",
    "activity": "헬싱키 환승·인천행 탑승구 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "15:45–16:30",
    "activity": "공항에서 간단한 식사",
    "place": "",
    "note": ""
   },
   {
    "time": "16:30–17:30",
    "activity": "탑승 준비",
    "place": "",
    "note": "시내 관광은 첫 환승일에 배치. 귀국 환승은 공항 안에서 연결편을 준비하세요."
   }
  ],
  "url": "https://www.finavia.fi/en/airports/helsinki-airport/airport/services-facilities/transfer",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 },
 {
  "date": "11월 17일 (화)",
  "city": "귀국",
  "title": "인천 도착 · 집으로",
  "slots": [
   {
    "time": "12:30–14:00",
    "activity": "입국 심사·수하물 찾기",
    "place": "",
    "note": ""
   },
   {
    "time": "14:00–14:30",
    "activity": "공항에서 식사·귀가 교통편 확인",
    "place": "",
    "note": ""
   },
   {
    "time": "14:30–17:00",
    "activity": "집으로 이동",
    "place": "",
    "note": "입국 소요 시간에 맞춰 버스·기차를 선택하세요."
   },
   {
    "time": "17:00–18:00",
    "activity": "짐 정리·휴식",
    "place": "",
    "note": ""
   }
  ],
  "url": "https://www.airport.kr/",
  "rain": "지연·날씨에 따라 산책을 줄이고 이동과 식사를 우선해요.",
  "pace": "날짜별 여정",
  "basis": "현지 시각의 추천 시간표 · 관광·식사는 제안이며 교통편의 확정 시각은 개인 티켓에서 확인하세요."
 }
];
function restaurant(id){
 const p=dining[id];if(!p)return '';
 const maps='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.address+' '+p.city);
 return `<details class="schedule-food"><summary>식당·메뉴 보기 · ${esc(p.name)}</summary><div class="food-content"><h4>${esc(p.name)}</h4><p>${esc(p.address)}</p><ul>${p.menu.map(m=>`<li>${esc(m)}</li>`).join('')}</ul><p class="food-budget">${esc(p.budget)}</p><p><strong>영업 안내</strong> ${esc(p.hours)}</p><p>${esc(p.booking)}</p><div class="food-links"><a href="${esc(maps)}" target="_blank" rel="noopener noreferrer">길찾기 ↗</a><a href="${esc(p.menuUrl)}" target="_blank" rel="noopener noreferrer">공식 메뉴 ↗</a><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">공식 사이트·예약 안내 ↗</a><a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">추천 참고 정보 ↗</a></div><small>메뉴·운영 정보 확인: 2026.10.08 · 예산과 체류 시간은 계획용 제안입니다.</small></div></details>`;
}
export function setupItinerary(){
 const host=document.querySelector('#itinerary');if(!host)return;
 const cities=['모두',...new Set(sightseeing.map(d=>d.city))];
 host.innerHTML=`<div class="section-head"><div><p class="eyebrow">OUR HONEYMOON, HOUR BY HOUR</p><h2>11월 7일–17일, 우리의 11일.</h2></div></div><p class="schedule-intro">1일차부터 11일차까지 실제 체류 순서에 맞춘 날짜별 여정입니다. 헬싱키 관광은 11월 8일 첫 환승일에, 할슈타트는 11월 12일에, 드레스덴 왕복은 11월 14일에 배치했습니다. 표시 시간은 현지 시각의 추천 시간표이며 교통편 확정 시각·예약 상세는 개인 티켓에서 확인하세요. 식당 이름을 눌러 메뉴·주소·예약 안내를 펼쳐 보세요.</p><div class="schedule-filters" aria-label="관광 도시 선택">${cities.map((c,i)=>`<button data-city-filter="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('')}</div><div class="schedule-grid"></div>`;
 const render=city=>{host.querySelector('.schedule-grid').innerHTML=sightseeing.map((d,i)=>({d,i})).filter(({d})=>city==='모두'||d.city===city).map(({d,i})=>`<article class="schedule-card" id="schedule-day-${i+1}"><div class="schedule-day"><span>${i+1}일차 · ${esc(d.date)}</span><p class="eyebrow">${esc(d.city)} · ${esc(d.pace)}</p></div><h3>${esc(d.title)}</h3><p class="schedule-basis">${esc(d.basis)}</p><ol class="schedule-timeline">${d.slots.map(slot=>`<li><time>${esc(slot.time)}</time><div class="schedule-event"><strong>${esc(slot.activity)}</strong>${slot.note?`<p>${esc(slot.note)}</p>`:''}${restaurant(slot.place)}</div></li>`).join('')}</ol><p class="schedule-rain">${esc(d.rain)}</p><div class="schedule-actions"><a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer">공식 관광 안내 ↗</a>${!['귀국','출발'].includes(d.city)?`<button data-map-city="${esc(d.city)}">도시 지도 보기</button>`:''}</div></article>`).join('');};
 host.addEventListener('click',e=>{const b=e.target.closest('button');if(b?.dataset.cityFilter){host.querySelectorAll('[data-city-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render(b.dataset.cityFilter);}if(b?.dataset.mapCity){document.dispatchEvent(new CustomEvent('trip-city-selected',{detail:b.dataset.mapCity}));document.querySelector('.map-opening')?.scrollIntoView({block:'start'});}});render('모두');
}
