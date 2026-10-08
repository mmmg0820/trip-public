import test from 'node:test';
import assert from 'node:assert/strict';
import {sightseeing} from '../itinerary.js';
test('tourism blocks have only public guide fields and no personal dates',()=>{
 for(const d of sightseeing){assert.deepEqual(Object.keys(d).sort(),['city','pace','rain','slots','title','url']);assert(d.slots.length>=3);assert(d.slots.every(s=>s.length===2));assert(new URL(d.url).protocol==='https:');}
 assert(!JSON.stringify(sightseeing).match(/\d{4}-\d{2}-\d{2}/));
 assert(sightseeing.some(d=>d.city==='드레스덴'&&d.slots.at(-1)[1].includes('프라하')));
 assert(sightseeing.some(d=>d.city==='귀국'&&d.slots.some(s=>s[1].includes('프라하 → 헬싱키 → 인천'))));
});
