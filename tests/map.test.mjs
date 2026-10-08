import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {routeVehicleTransform,routeBounds} from '../core.js';

test('curve tangent tilts both directions without inverting land vehicles',()=>{
 for(const kind of ['train','bus']){
  assert.equal(routeVehicleTransform(kind,-10,-10),'rotate(45) scale(-1 1)');
  assert.equal(routeVehicleTransform(kind,-10,10),'rotate(-45) scale(-1 1)');
  assert.equal(routeVehicleTransform(kind,10,10),'rotate(45) scale(1 1)');
  assert.equal(routeVehicleTransform(kind,10,-10),'rotate(-45) scale(1 1)');
 }
 assert.equal(routeVehicleTransform('flight',-10,-10),'rotate(-135)');
});
test('short city routes fill the map instead of staying dots on a continent',()=>{
 for(const [a,z] of [[[19.08,47.5],[16.38,48.19]],[[126.884,37.416],[126.45,37.46]],[[127.435,36.332],[126.884,37.416]]]){
  const b=routeBounds(a,z);const dx=(z[0]-a[0])/(b[1]-b[0])*1000,dy=(z[1]-a[1])/(b[3]-b[2])*650;
  assert(Math.hypot(dx,dy)>380);assert(Math.hypot(dx,dy)<850);
  assert(b[0]<Math.min(a[0],z[0])&&b[1]>Math.max(a[0],z[0]));
  assert(b[2]<Math.min(a[1],z[1])&&b[3]>Math.max(a[1],z[1]));
 }
});

test('land vehicles stay upright through pause, route changes and visibility changes',async()=>{
  const events={},mediaEvents={},frames=new Map();let nextFrame=0;
  const element=()=>({attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v;},querySelector(s){return nodes[s];},addEventListener(k,v){this.listeners[k]=v;}});
  const marker=element(),art=element(),select=element(),pause=element(),host=element(),overview=element();
  select.value='0';let pathDirection=-1;
  const path={getTotalLength:()=>100,getPointAtLength:n=>({x:pathDirection*n,y:n/2})};
  const nodes={'#travel-map':host,'#map-segment':select,'#map-pause':pause,'#map-overview':overview,'#map-mode':element(),'#map-caption':element(),'#active-route':path,'.map-vehicle':marker,'.vehicle-direction':art};
  const document={hidden:false,querySelector:s=>nodes[s],addEventListener:(k,v)=>events[k]=v};
  const media={matches:false,addEventListener:(k,v)=>mediaEvents[k]=v};
  const context={document,routeVehicleTransform,routeBounds,matchMedia:()=>media,fetch:async()=>({json:async()=>({features:[]})}),requestAnimationFrame:cb=>{const id=++nextFrame;frames.set(id,cb);return id;},cancelAnimationFrame:id=>frames.delete(id),esc:s=>s};
  vm.createContext(context);
  const source=(await readFile(new URL('../map.js',import.meta.url),'utf8')).replace(/^import[^\n]+\n/,'').replace('export async function setupMap','async function setupMap');
  vm.runInContext(source,context);
  await context.setupMap({transport:[{name:'부다페스트 → 빈',kind:'train',code:'개략도'},{name:'프라하 → 드레스덴',kind:'bus',code:'개략도'},{name:'인천 → 헬싱키',kind:'flight',code:'개략도'}]});
  const tick=time=>{const [id,cb]=frames.entries().next().value;frames.delete(id);cb(time);};
  assert.equal(art.attrs.transform,routeVehicleTransform('train',-1,.5));tick(100);tick(200);
  const moving=marker.attrs.transform;pause.listeners.click();assert.equal(frames.size,0);
  assert.equal(pause.textContent,'재생');assert.equal(marker.attrs.transform,moving);
  overview.listeners.click();assert.equal(overview.textContent,'구간 확대 보기');assert.equal(marker.attrs.transform,moving);assert.equal(frames.size,0);
  overview.listeners.click();assert.equal(overview.textContent,'주변 지역 보기');assert.equal(marker.attrs.transform,moving);assert.equal(frames.size,0);
  select.value='1';pathDirection=1;select.listeners.change();assert.equal(art.attrs.transform,routeVehicleTransform('bus',1,.5));assert.equal(frames.size,0);
  assert(host.innerHTML.includes('vehicle-art bus'));
  pause.listeners.click();assert.equal(frames.size,1);tick(300);tick(400);assert.notEqual(marker.attrs.transform,'translate(0 0)');
  document.hidden=true;events.visibilitychange();assert.equal(frames.size,0);
  document.hidden=false;events.visibilitychange();assert.equal(frames.size,1);
  select.value='2';select.listeners.change();assert.match(art.attrs.transform,/^rotate\(/);assert.equal(frames.size,1);
  media.matches=true;mediaEvents.change();assert.equal(frames.size,0);assert.equal(pause.disabled,true);
  media.matches=false;mediaEvents.change();assert.equal(frames.size,1);assert.equal(pause.disabled,false);
});
