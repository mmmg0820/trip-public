import test from 'node:test';
import assert from 'node:assert/strict';
import {sightseeing,dining} from '../itinerary.js';
test('public timelines use explicit time ranges and valid dining references',()=>{
 for(const d of sightseeing){
  assert.deepEqual(Object.keys(d).sort(),['basis','city','pace','rain','slots','title','url']);
  assert(d.slots.length>=3);assert(new URL(d.url).protocol==='https:');
  let prior=0;
  for(const slot of d.slots){
   assert.deepEqual(Object.keys(slot).sort(),['activity','note','place','time']);
   assert(/\d{2}:\d{2}/.test(slot.time));
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
