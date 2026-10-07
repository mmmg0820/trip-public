import {eventsFor} from './core.js';
export function localDate(now=new Date()){return new Intl.DateTimeFormat('sv-SE',{year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function suggestedDay(days,today=localDate()){return Math.max(0,Math.min(days.length-1,days.findIndex(d=>d.date>=today)===-1?days.length-1:days.findIndex(d=>d.date>=today)));}
export function hotelOnDate(hotels,date){return hotels.find(h=>h.fromDate<=date&&date<h.toDate);}
export function nextTransport(transport,date){return transport.find(t=>t.date>=date);}
export function normalize(text){return String(text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').replace(/비엔나|vienna|wien/g,'빈').replace(/budapest/g,'부다페스트').replace(/prague|praha/g,'프라하').replace(/dresden/g,'드레스덴').replace(/helsinki/g,'헬싱키').replace(/linz/g,'린츠').replace(/[^a-z0-9가-힣]/g,' ');}
export function buildIndex(data,overrides={}){
 const records=[];
 for(const d of data.days){records.push({id:'day:'+d.date,type:'day',date:d.date,title:d.city+' · '+d.title,summary:d.note,place:'',ref:'',keywords:'일정 스케줄 오늘 내일 하루 동선'});eventsFor(d,overrides).forEach((e,i)=>records.push({id:'event:'+d.date+':'+i,type:'event',date:d.date,title:e.title,summary:e.time+' · '+e.detail,place:e.place,ref:e.ref,keywords:'일정 '+(e.kind==='fixed'?'예약 확정 기차 항공 오페라 공연':'추천')}));}
 for(const t of data.transport)records.push({id:'transport:'+t.date+':'+t.code,type:'transport',date:t.date,title:t.name+' · '+t.code,summary:t.depart+' → '+t.arrive+' · '+t.note,place:'',ref:t.ref,keywords:t.kind==='train'?'기차 열차 좌석 승강장':t.kind==='bus'?'공항버스 버스 환승 국내 광명 인천':'항공 비행기 공항 출국 귀국'});
 for(const h of data.hotels)records.push({id:'hotel:'+h.ref,type:'hotel',date:h.fromDate,endDate:h.toDate,title:h.city+' · '+h.name,summary:h.address+' · '+h.phone+' · '+h.note,place:h.name,ref:h.ref,keywords:'숙소 호텔 주소 체크인 체크아웃 조식 예약'});
 data.recommendations.forEach((r,i)=>records.push({id:'taste:'+i,type:'taste',date:r.date==='선택'?'':'2026-'+r.date.replace('/','-').split('-').map(x=>x.padStart(2,'0')).join('-'),title:r.city+' · '+r.name,summary:r.description+' · '+r.address+' · '+r.budget,place:r.name+' '+r.address,ref:'',url:r.url,keywords:r.type==='wine'?'와인 쇼핑 구매 숍':'식당 카페 커피 브런치 맛집'}));
 return records;
}
export function searchIndex(query,records,date,limit=12){
 let q=normalize(query).trim();if(!q)return [];
 let targetDate=null;if(/내일/.test(q)){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+1);targetDate=d.toISOString().slice(0,10);}else if(/오늘/.test(q))targetDate=date;
 const intent=/qr|큐알|입장권|예약번호|티켓|pdf|원본/.test(q)?'document':/숙소|호텔|주소|조식/.test(q)?'hotel':/기차|열차|좌석|항공|비행기|공항|버스/.test(q)?'transport':/와인|식당|카페|맛집/.test(q)?'taste':/일정|스케줄/.test(q)?'schedule':null;
 const busOnly=/버스/.test(q);
 const qrOnly=/qr|큐알/.test(q),wineOnly=/와인/.test(q);
 q=q.replace(/오늘|내일|기차|열차|좌석|숙소|호텔|주소|조식|qr|큐알|입장권|예약번호|티켓|pdf|원본|항공|비행기|공항|버스|와인|식당|카페|맛집|일정|스케줄|알려줘|보여줘|찾아줘|어디|몇시|바로|꺼내줘/g,' ').trim();
 const terms=q.split(/\s+/).filter(Boolean);
 return records.filter(r=>{
  if(intent==='schedule'&&!['day','event'].includes(r.type))return false;
  if(intent&&intent!=='schedule'&&r.type!==intent)return false;
  if(busOnly&&!r.keywords.includes('버스'))return false;
  if(qrOnly&&!r.hasCodes)return false;
  if(wineOnly&&!r.keywords.includes('와인'))return false;
  if(targetDate){if(r.type==='hotel'){if(!(r.date<=targetDate&&targetDate<r.endDate))return false;}else if(r.date!==targetDate)return false;}
  const text=normalize(r.title+' '+r.summary+' '+r.keywords);return terms.every(term=>text.includes(term));
 }).map(r=>({...r,score:terms.reduce((n,t)=>n+(normalize(r.title).includes(t)?10:1),0)+(r.date===date?4:0)})).sort((a,b)=>b.score-a.score||a.date.localeCompare(b.date)).slice(0,limit);
}
export function parseRoute(hash,data){const [tab,query='']=hash.replace(/^#/,'').split('?');const params=new URLSearchParams(query);return {tab:['quick','journey','bookings','taste'].includes(tab)?tab:'quick',day:data.days.some(d=>d.date===params.get('day'))?params.get('day'):null,document:null};}
