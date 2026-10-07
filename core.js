export const STORAGE_KEY = 'public-trip-plan-v1';
export function escapeHTML(value) {return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function validatePlan(value, days) {
 if(!value || value.version!==1 || !value.overrides || typeof value.overrides!=='object' || Array.isArray(value.overrides)) throw new Error('일정 파일 형식이 올바르지 않아요.');
 const allowed=new Set(days.map(d=>d.date)), result={};
 for(const [date,entries] of Object.entries(value.overrides)) {
  if(!allowed.has(date)||!Array.isArray(entries)||entries.length>40) throw new Error('날짜 또는 일정 개수를 확인해 주세요.');
  result[date]=entries.map(e=>{
   if(!e||typeof e!=='object'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time)||typeof e.title!=='string'||!e.title.trim()||e.title.length>100||typeof e.detail!=='string'||e.detail.length>1500||typeof e.place!=='string'||e.place.length>200||!['idea','food','wine'].includes(e.kind)) throw new Error('추천 일정 내용이 올바르지 않아요.');
   return {time:e.time,title:e.title,detail:e.detail,place:e.place,kind:e.kind,ref:''};
  });
 }
 return result;
}
export function eventsFor(day,overrides) {const suggestions=overrides[day.date]??day.events.filter(e=>!['fixed','hotel'].includes(e.kind));return [...day.events.filter(e=>['fixed','hotel'].includes(e.kind)),...suggestions].sort((a,b)=>a.time.localeCompare(b.time));}
