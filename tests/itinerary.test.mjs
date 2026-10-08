import test from 'node:test';
import assert from 'node:assert/strict';
import {sightseeing,dining} from '../itinerary.js';
test('public timelines use explicit time ranges and valid dining references',()=>{
 for(const d of sightseeing){
  assert.deepEqual(Object.keys(d).sort(),['basis','city','date','pace','rain','slots','title','url']);
  assert(d.slots.length>=3);assert(new URL(d.url).protocol==='https:');
  let prior=0;
  for(const slot of d.slots){
   assert.deepEqual(Object.keys(slot).sort(),['activity','note','place','time']);
   assert(/^\d{2}:\d{2}–\d{2}:\d{2}$/.test(slot.time),slot.time);
   assert(!/도착\s*\+|귀환 열차|출발\s*−|환승\s*\+/.test(slot.time));
   if(slot.place)assert(dining[slot.place],slot.place);
   const m=slot.time.match(/^(\d{2}):(\d{2})–(\d{2}):(\d{2})$/);
   if(m){const start=+m[1]*60 + +m[2],end=+m[3]*60 + +m[4];assert(start>=prior);assert(end>start);prior=end;}
  }
 }
 assert(!JSON.stringify(sightseeing).match(/\d{4}-\d{2}-\d{2}/));
 assert(sightseeing.some(d=>d.city==='드레스덴'&&d.slots.at(-1).activity.includes('프라하')));
 assert(sightseeing.some(d=>d.city==='귀국'&&d.title.includes('프라하 → 헬싱키 → 인천')));
});
test('dining details provide public menu, directions and source links',()=>{
 for(const p of Object.values(dining)){
  assert(p.menu.length>=2);assert(p.address&&p.booking&&p.hours&&p.budget);
  for(const key of ['url','menuUrl','source'])assert.equal(new URL(p[key]).protocol,'https:');
 }
 assert(dining.eska.hours.includes('18:00'));
 assert(dining.sophien.hours.includes('월요일 휴무'));
});

test('dated itinerary matches the eleven travel days without extra tourist days',()=>{
 assert.equal(sightseeing.length,11);
 assert.deepEqual(sightseeing.map(d=>d.date),["11월 7일 (토)","11월 8일 (일)","11월 9일 (월)","11월 10일 (화)","11월 11일 (수)","11월 12일 (목)","11월 13일 (금)","11월 14일 (토)","11월 15일 (일)","11월 16일 (월)","11월 17일 (화)"]);
 assert.equal(sightseeing[1].city,'헬싱키');
 assert.equal(sightseeing[5].city,'할슈타트');
 assert.equal(sightseeing[7].city,'드레스덴');
 assert(!sightseeing.some(d=>d.pace.includes('추가 관광일')));
});
