(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function b(){}const D=t=>t;function ft(t,e){for(const n in e)t[n]=e[n];return t}function vt(t){return t()}function At(){return Object.create(null)}function N(t){t.forEach(vt)}function V(t){return typeof t=="function"}function st(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Qt(t){return Object.keys(t).length===0}function Xt(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function zt(t,e,n){t.$$.on_destroy.push(Xt(e,n))}const It=typeof window<"u";let ot=It?()=>window.performance.now():()=>Date.now(),$t=It?t=>requestAnimationFrame(t):b;const j=new Set;function qt(t){j.forEach(e=>{e.c(t)||(j.delete(e),e.f())}),j.size!==0&&$t(qt)}function rt(t){let e;return j.size===0&&$t(qt),{promise:new Promise(n=>{j.add(e={c:t,f:n})}),abort(){j.delete(e)}}}let at=!1;function te(){at=!0}function ee(){at=!1}function ne(t,e,n,s){for(;t<e;){const i=t+(e-t>>1);n(i)<=s?t=i+1:e=i}return t}function ie(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const d=e[a];d.claim_order!==void 0&&o.push(d)}e=o}const n=new Int32Array(e.length+1),s=new Int32Array(e.length);n[0]=-1;let i=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,d=(i>0&&e[n[i]].claim_order<=a?i+1:ne(1,i,h=>e[n[h]].claim_order,a))-1;s[o]=n[d]+1;const u=d+1;n[u]=o,i=Math.max(u,i)}const r=[],c=[];let l=e.length-1;for(let o=n[i]+1;o!=0;o=s[o-1]){for(r.push(e[o-1]);l>=o;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);r.reverse(),c.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<c.length;o++){for(;a<r.length&&c[o].claim_order>=r[a].claim_order;)a++;const d=a<r.length?r[a]:null;t.insertBefore(c[o],d)}}function se(t,e){t.appendChild(e)}function Ft(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function oe(t){const e=k("style");return re(Ft(t),e),e.sheet}function re(t,e){se(t.head||t,e)}function T(t,e){if(at){for(ie(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ae(t,e,n){t.insertBefore(e,n||null)}function x(t,e,n){at&&!n?T(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function y(t){t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function le(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t){return document.createTextNode(t)}function dt(){return W(" ")}function X(){return W("")}function q(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function $(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ct(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:$(t,e,n)}function A(t){return Array.from(t.childNodes)}function Gt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Wt(t,e,n,s,i=!1){Gt(t);const r=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,i||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const o=n(l);return o===void 0?t.splice(c,1):t[c]=o,i?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return s()})();return r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,r}function ce(t,e,n,s){return Wt(t,i=>i.nodeName===e,i=>{const r=[];for(let c=0;c<i.attributes.length;c++){const l=i.attributes[c];n[l.name]||r.push(l.name)}r.forEach(c=>i.removeAttribute(c))},()=>s(e))}function L(t,e,n){return ce(t,e,n,k)}function ht(t,e){return Wt(t,n=>n.nodeType===3,n=>{const s=""+e;if(n.data.startsWith(s)){if(n.data.length!==s.length)return n.splitText(s.length)}else n.data=s},()=>W(e),!0)}function mt(t){return ht(t," ")}function St(t,e,n){for(let s=n;s<t.length;s+=1){const i=t[s];if(i.nodeType===8&&i.textContent.trim()===e)return s}return t.length}function ue(t,e){const n=St(t,"HTML_TAG_START",0),s=St(t,"HTML_TAG_END",n);if(n===s)return new pt(void 0,e);Gt(t);const i=t.splice(n,s-n+1);y(i[0]),y(i[i.length-1]);const r=i.slice(1,i.length-1);for(const c of r)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new pt(r,e)}function fe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Y(t,e,n){t.classList[n?"add":"remove"](e)}function de(t,e,{bubbles:n=!1,cancelable:s=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,s,e),i}class he{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,s=null){this.e||(this.is_svg?this.e=le(n.nodeName):this.e=k(n.nodeName),this.t=n,this.c(e)),this.i(s)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)ae(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(y)}}class pt extends he{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)x(this.t,this.n[n],e)}}function wt(t){const e={};for(const n of t)e[n.name]=n.value;return e}const tt=new Map;let et=0;function me(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function pe(t,e){const n={stylesheet:oe(e),rules:{}};return tt.set(t,n),n}function kt(t,e,n,s,i,r,c,l=0){const o=16.666/s;let a=`{
`;for(let _=0;_<=1;_+=o){const g=e+(n-e)*r(_);a+=_*100+`%{${c(g,1-g)}}
`}const d=a+`100% {${c(n,1-n)}}
}`,u=`__svelte_${me(d)}_${l}`,h=Ft(t),{stylesheet:m,rules:f}=tt.get(h)||pe(h,t);f[u]||(f[u]=!0,m.insertRule(`@keyframes ${u} ${d}`,m.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${u} ${s}ms linear ${i}ms 1 both`,et+=1,u}function nt(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),i=n.length-s.length;i&&(t.style.animation=s.join(", "),et-=i,et||_e())}function _e(){$t(()=>{et||(tt.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),tt.clear())})}function ge(t,e,n,s){if(!e)return b;const i=t.getBoundingClientRect();if(e.left===i.left&&e.right===i.right&&e.top===i.top&&e.bottom===i.bottom)return b;const{delay:r=0,duration:c=300,easing:l=D,start:o=ot()+r,end:a=o+c,tick:d=b,css:u}=n(t,{from:e,to:i},s);let h=!0,m=!1,f;function p(){u&&(f=kt(t,0,1,c,r,l,u)),r||(m=!0)}function _(){u&&nt(t,f),h=!1}return rt(g=>{if(!m&&g>=o&&(m=!0),m&&g>=a&&(d(1,0),_()),!h)return!1;if(m){const w=g-o,S=0+1*l(w/c);d(S,1-S)}return!0}),p(),d(0,1),_}function be(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:s}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=s,Ut(t,i)}}function Ut(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const s=getComputedStyle(t),i=s.transform==="none"?"":s.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let U;function F(t){U=t}function ye(){if(!U)throw new Error("Function called outside component initialization");return U}function ve(t){ye().$$.on_destroy.push(t)}function $e(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(s=>s.call(this,e))}const I=[],Mt=[],J=[],Lt=[],we=Promise.resolve();let _t=!1;function ke(){_t||(_t=!0,we.then(C))}function P(t){J.push(t)}const ut=new Set;let Z=0;function C(){const t=U;do{for(;Z<I.length;){const e=I[Z];Z++,F(e),xe(e.$$)}for(F(null),I.length=0,Z=0;Mt.length;)Mt.pop()();for(let e=0;e<J.length;e+=1){const n=J[e];ut.has(n)||(ut.add(n),n())}J.length=0}while(I.length);for(;Lt.length;)Lt.pop()();_t=!1,ut.clear(),F(t)}function xe(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}let z;function Vt(){return z||(z=Promise.resolve(),z.then(()=>{z=null})),z}function it(t,e,n){t.dispatchEvent(de(`${e?"intro":"outro"}${n}`))}const Q=new Set;let M;function xt(){M={r:0,c:[],p:M}}function Et(){M.r||N(M.c),M=M.p}function R(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function H(t,e,n,s){if(t&&t.o){if(Q.has(t))return;Q.add(t),M.c.push(()=>{Q.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const Kt={duration:0};function Ee(t,e,n){let s=e(t,n),i=!1,r,c,l=0;function o(){r&&nt(t,r)}function a(){const{delay:u=0,duration:h=300,easing:m=D,tick:f=b,css:p}=s||Kt;p&&(r=kt(t,0,1,h,u,m,p,l++)),f(0,1);const _=ot()+u,g=_+h;c&&c.abort(),i=!0,P(()=>it(t,!0,"start")),c=rt(w=>{if(i){if(w>=g)return f(1,0),it(t,!0,"end"),o(),i=!1;if(w>=_){const S=m((w-_)/h);f(S,1-S)}}return i})}let d=!1;return{start(){d||(d=!0,nt(t),V(s)?(s=s(),Vt().then(a)):a())},invalidate(){d=!1},end(){i&&(o(),i=!1)}}}function Be(t,e,n){let s=e(t,n),i=!0,r;const c=M;c.r+=1;function l(){const{delay:o=0,duration:a=300,easing:d=D,tick:u=b,css:h}=s||Kt;h&&(r=kt(t,1,0,a,o,d,h));const m=ot()+o,f=m+a;P(()=>it(t,!1,"start")),rt(p=>{if(i){if(p>=f)return u(0,1),it(t,!1,"end"),--c.r||N(c.c),!1;if(p>=m){const _=d((p-m)/a);u(1-_,_)}}return i})}return V(s)?Vt().then(()=>{s=s(),l()}):l(),{end(o){o&&s.tick&&s.tick(1,0),i&&(r&&nt(t,r),i=!1)}}}function Te(t,e){H(t,1,1,()=>{e.delete(t.key)})}function Ae(t,e){t.f(),Te(t,e)}function Ce(t,e,n,s,i,r,c,l,o,a,d,u){let h=t.length,m=r.length,f=h;const p={};for(;f--;)p[t[f].key]=f;const _=[],g=new Map,w=new Map;for(f=m;f--;){const v=u(i,r,f),E=n(v);let B=c.get(E);B?s&&B.p(v,e):(B=a(E,v),B.c()),g.set(E,_[f]=B),E in p&&w.set(E,Math.abs(f-p[E]))}const S=new Set,Tt=new Set;function ct(v){R(v,1),v.m(l,d),c.set(v.key,v),d=v.first,m--}for(;h&&m;){const v=_[m-1],E=t[h-1],B=v.key,K=E.key;v===E?(d=v.first,h--,m--):g.has(K)?!c.has(B)||S.has(B)?ct(v):Tt.has(K)?h--:w.get(B)>w.get(K)?(Tt.add(B),ct(v)):(S.add(K),h--):(o(E,c),h--)}for(;h--;){const v=t[h];g.has(v.key)||o(v,c)}for(;m;)ct(_[m-1]);return _}function Se(t,e){const n={},s={},i={$$scope:1};let r=t.length;for(;r--;){const c=t[r],l=e[r];if(l){for(const o in c)o in l||(s[o]=1);for(const o in l)i[o]||(n[o]=l[o],i[o]=1);t[r]=l}else for(const o in c)i[o]=1}for(const c in s)c in n||(n[c]=void 0);return n}function Me(t){return typeof t=="object"&&t!==null?t:{}}function Nt(t){t&&t.c()}function Le(t,e){t&&t.l(e)}function gt(t,e,n,s){const{fragment:i,on_mount:r,on_destroy:c,after_update:l}=t.$$;i&&i.m(e,n),s||P(()=>{const o=r.map(vt).filter(V);c?c.push(...o):N(o),t.$$.on_mount=[]}),l.forEach(P)}function bt(t,e){const n=t.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ne(t,e){t.$$.dirty[0]===-1&&(I.push(t),ke(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Bt(t,e,n,s,i,r,c,l=[-1]){const o=U;F(t);const a=t.$$={fragment:null,ctx:null,props:r,update:b,not_equal:i,bound:At(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:At(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};c&&c(a.root);let d=!1;if(a.ctx=n?n(t,e.props||{},(u,h,...m)=>{const f=m.length?m[0]:h;return a.ctx&&i(a.ctx[u],a.ctx[u]=f)&&(!a.skip_bound&&a.bound[u]&&a.bound[u](f),d&&Ne(t,u)),h}):[],a.update(),d=!0,N(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){te();const u=A(e.target);a.fragment&&a.fragment.l(u),u.forEach(y)}else a.fragment&&a.fragment.c();e.intro&&R(t.$$.fragment),gt(t,e.target,e.anchor,e.customElement),ee(),C()}F(o)}let lt;typeof HTMLElement=="function"&&(lt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(vt).filter(V);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){N(this.$$.on_disconnect)}$destroy(){bt(this,1),this.$destroy=b}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}$set(t){this.$$set&&!Qt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});function Re(t){let e,n,s,i,r;return{c(){e=k("button"),n=W("count is "),s=W(t[0]),this.c=b},l(c){e=L(c,"BUTTON",{});var l=A(e);n=ht(l,"count is "),s=ht(l,t[0]),l.forEach(y)},m(c,l){x(c,e,l),T(e,n),T(e,s),i||(r=q(e,"click",t[1]),i=!0)},p(c,[l]){l&1&&fe(s,c[0])},i:b,o:b,d(c){c&&y(e),i=!1,r()}}}function Oe(t,e,n){let{count:s=0}=e;function i(r){$e.call(this,t,r)}return t.$$set=r=>{"count"in r&&n(0,s=r.count)},[s,i]}class je extends lt{constructor(e){super(),this.shadowRoot.innerHTML="<style>button{border-radius:8px;border:1px solid transparent;padding:0.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;cursor:pointer;transition:border-color 0.25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}</style>",Bt(this,{target:this.shadowRoot,props:wt(this.attributes),customElement:!0},Oe,Re,st,{count:0},null),e&&(e.target&&x(e.target,this,e.anchor),e.props&&(this.$set(e.props),C()))}static get observedAttributes(){return["count"]}get count(){return this.$$.ctx[0]}set count(e){this.$$set({count:e}),C()}}customElements.define("my-counter",je);const O=[];function Yt(t,e=b){let n;const s=new Set;function i(l){if(st(t,l)&&(t=l,n)){const o=!O.length;for(const a of s)a[1](),O.push(a,t);if(o){for(let a=0;a<O.length;a+=2)O[a][0](O[a+1]);O.length=0}}}function r(l){i(l(t))}function c(l,o=b){const a=[l,o];return s.add(a),s.size===1&&(n=e(i)||b),l(t),()=>{s.delete(a),s.size===0&&(n(),n=null)}}return{set:i,update:r,subscribe:c}}function Zt(t){const e=t-1;return e*e*e+1}function Rt(t){return Object.prototype.toString.call(t)==="[object Date]"}function yt(t,e){if(t===e||t!==t)return()=>t;const n=typeof t;if(n!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const s=e.map((i,r)=>yt(t[r],i));return i=>s.map(r=>r(i))}if(n==="object"){if(!t||!e)throw new Error("Object cannot be null");if(Rt(t)&&Rt(e)){t=t.getTime(),e=e.getTime();const r=e-t;return c=>new Date(t+c*r)}const s=Object.keys(e),i={};return s.forEach(r=>{i[r]=yt(t[r],e[r])}),r=>{const c={};return s.forEach(l=>{c[l]=i[l](r)}),c}}if(n==="number"){const s=e-t;return i=>t+i*s}throw new Error(`Cannot interpolate ${n} values`)}function Pe(t,e={}){const n=Yt(t);let s,i=t;function r(c,l){if(t==null)return n.set(t=c),Promise.resolve();i=c;let o=s,a=!1,{delay:d=0,duration:u=400,easing:h=D,interpolate:m=yt}=ft(ft({},e),l);if(u===0)return o&&(o.abort(),o=null),n.set(t=i),Promise.resolve();const f=ot()+d;let p;return s=rt(_=>{if(_<f)return!0;a||(p=m(t,c),typeof u=="function"&&(u=u(t,c)),a=!0),o&&(o.abort(),o=null);const g=_-f;return g>u?(n.set(t=c),!1):(n.set(t=p(h(g/u))),!0)}),s.promise}return{set:r,update:(c,l)=>r(c(i,t),l),subscribe:n.subscribe}}const Jt={duration:4e3,initial:1,next:0,pausable:!1,dismissable:!0,reversed:!1,intro:{x:256},close:"\u2715"},G=(()=>{const{subscribe:t,update:e}=Yt([]);let n=0;const s={};return{subscribe:t,open:(o,a={})=>{const d={target:"default",...o instanceof Object?o:{...a,msg:o}},u=s[d.target]||{},h={...Jt,...u,...d,theme:{...u.theme,...d.theme},classes:[...u.classes||[],...d.classes||[]],id:d.id||++n};return e(m=>{const f=m.findIndex(p=>p.id===d.id);return f===-1?h.reversed?[...m,h]:[h,...m]:(f>-1&&(m[f]={...m[f],...h}),m)}),n},close:o=>{e(a=>{if(!a.length||o===0)return[];if(o instanceof Object)return a.filter(u=>o(u));const d=o||Math.max(...a.map(u=>u.id));return a.filter(u=>u.id!==d)})},set:(o,a={})=>{const d=o instanceof Object?{...o}:{...a,id:o};e(u=>{const h=u.findIndex(m=>m.id===d.id);return h>-1&&(u[h]={...u[h],...d}),u})},init:(o="default",a={})=>(s[o]=a,s)}})();function He(t){let e,n=t[0].msg+"",s;return{c(){e=new pt(!1),s=X(),this.h()},l(i){e=ue(i,!1),s=X(),this.h()},h(){e.a=s},m(i,r){e.m(n,i,r),x(i,s,r)},p(i,r){r&1&&n!==(n=i[0].msg+"")&&e.p(n)},i:b,o:b,d(i){i&&y(s),i&&e.d()}}}function De(t){let e,n,s;const i=[t[7]()];var r=t[0].component.src;function c(l){let o={};for(let a=0;a<i.length;a+=1)o=ft(o,i[a]);return{props:o}}return r&&(e=new r(c())),{c(){e&&Nt(e.$$.fragment),n=X()},l(l){e&&Le(e.$$.fragment,l),n=X()},m(l,o){e&&gt(e,l,o),x(l,n,o),s=!0},p(l,o){const a=o&128?Se(i,[Me(l[7]())]):{};if(r!==(r=l[0].component.src)){if(e){xt();const d=e;H(d.$$.fragment,1,0,()=>{bt(d,1)}),Et()}r?(e=new r(c()),Nt(e.$$.fragment),R(e.$$.fragment,1),gt(e,n.parentNode,n)):e=null}else r&&e.$set(a)},i(l){s||(e&&R(e.$$.fragment,l),s=!0)},o(l){e&&H(e.$$.fragment,l),s=!1},d(l){l&&y(n),e&&bt(e,l)}}}function Ot(t){let e,n=t[0].close+"",s,i;return{c(){e=k("button"),this.h()},l(r){e=L(r,"BUTTON",{class:!0,type:!0,tabindex:!0});var c=A(e);c.forEach(y),this.h()},h(){$(e,"class","toast-button pe"),$(e,"type","button"),$(e,"tabindex","-1")},m(r,c){x(r,e,c),e.innerHTML=n,s||(i=q(e,"click",t[4]),s=!0)},p(r,c){c&1&&n!==(n=r[0].close+"")&&(e.innerHTML=n)},d(r){r&&y(e),s=!1,i()}}}function ze(t){let e,n,s,i,r,c,l,o,a,d;const u=[De,He],h=[];function m(p,_){return p[0].component?0:1}s=m(t),i=h[s]=u[s](t);let f=t[0].dismissable&&Ot(t);return{c(){e=k("div"),n=k("div"),i.c(),r=dt(),f&&f.c(),c=dt(),l=k("progress"),this.c=b,this.h()},l(p){e=L(p,"DIV",{class:!0});var _=A(e);n=L(_,"DIV",{role:!0,class:!0});var g=A(n);i.l(g),g.forEach(y),r=mt(_),f&&f.l(_),c=mt(_),l=L(_,"PROGRESS",{class:!0}),A(l).forEach(y),_.forEach(y),this.h()},h(){$(n,"role","status"),$(n,"class","toast-message"),Y(n,"pe",t[0].component||typeof t[0].onclick=="function"),$(l,"class","toast-progress"),l.value=t[1],$(e,"class","toast"),Y(e,"pe",t[0].pausable)},m(p,_){x(p,e,_),T(e,n),h[s].m(n,null),T(e,r),f&&f.m(e,null),T(e,c),T(e,l),o=!0,a||(d=[q(n,"click",t[3]),q(e,"mouseenter",t[5]),q(e,"mouseleave",t[6])],a=!0)},p(p,[_]){let g=s;s=m(p),s===g?h[s].p(p,_):(xt(),H(h[g],1,1,()=>{h[g]=null}),Et(),i=h[s],i?i.p(p,_):(i=h[s]=u[s](p),i.c()),R(i,1),i.m(n,null)),_&1&&Y(n,"pe",p[0].component||typeof p[0].onclick=="function"),p[0].dismissable?f?f.p(p,_):(f=Ot(p),f.c(),f.m(e,c)):f&&(f.d(1),f=null),(!o||_&2)&&(l.value=p[1]),_&1&&Y(e,"pe",p[0].pausable)},i(p){o||(R(i),o=!0)},o(p){H(i),o=!1},d(p){p&&y(e),h[s].d(),f&&f.d(),a=!1,N(d)}}}function Ie(t,e,n){let s,{item:i=Jt}=e;console.log(i);const r=Pe(i.initial,{duration:i.duration,easing:D});zt(t,r,p=>n(1,s=p));const c=()=>{typeof i.onclick=="function"?i.onclick(i.id):l()},l=()=>G.close(i.id),o=()=>{(s===1||s===0)&&l()};let a=i.initial,d=a,u=!1;const h=()=>{i.pausable&&!u&&s!==a&&(r.set(s,{duration:0}),u=!0)},m=()=>{if(u){const p=i.duration,_=p-p*((s-d)/(a-d));r.set(a,{duration:_}).then(o),u=!1}},f=()=>{const{props:p={},sendIdTo:_}=i.component;return _&&(p[_]=i.id),p};return ve(()=>{typeof i.onclose=="function"&&i.onclose(i.id)}),t.$$set=p=>{"item"in p&&n(0,i=p.item)},t.$$.update=()=>{t.$$.dirty&259&&a!==i.next&&(n(8,a=i.next),d=s,u=!1,r.set(a).then(o))},[i,s,r,c,l,h,m,f,a]}class qe extends lt{constructor(e){super(),this.shadowRoot.innerHTML="<style>.toast{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(--toastBoxShadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;gap:var(--toastGap, 0);flex-direction:row;align-items:center;overflow:hidden}.toast.pe{pointer-events:auto}.toast-message{padding:var(--toastMessagePadding, 0.75rem 0.5rem);flex:1 1 0;cursor:pointer}.toast-button{width:var(--toastButtonWidth, 2rem);height:var(--toastButtonHeight, 100%);font:1rem sans-serif;display:flex;align-items:center;justify-content:center;cursor:pointer;outline:none;background:var(--toastButtonBackground, rgba(66, 66, 66, 0.9));color:var(--toastButtonColor, #fff);box-shadow:var(--toastButtonBoxShadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));border:var(--toastButtonBorder, none);border-radius:var(--toastButtonBorderRadius, 0);margin:var(--toastButtonMargin, 0);padding:var(--toastButtonPadding, 0)}.toast-button:active{background:var(--toastButtonBackgroundActive, rgba(66, 66, 66, 0.9));color:var(--toastButtonColorActive, #fff);box-shadow:var(--toastButtonBoxShadowActive, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));border:var(--toastButtonBorderActive, none);border-radius:var(--toastButtonBorderRadiusActive, 0);margin:var(--toastButtonMarginActive, 0);padding:var(--toastButtonPaddingActive, 0)}.toast-button.pe{pointer-events:auto}.toast-progress{top:var(--toastProgressTop, auto);right:var(--toastProgressRight, auto);bottom:var(--toastProgressBottom, 0);left:var(--toastProgressLeft, 0);height:var(--toastProgressHeight, 6px);width:var(--toastProgressWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}.toast-progress::-webkit-progress-bar{background:transparent}.toast-progress::-webkit-progress-value{background:var(--toastProgressBackground, rgba(33, 150, 243, 0.75))}.toast-progress::-moz-progress-bar{background:var(--toastProgressBackground, rgba(33, 150, 243, 0.75))}</style>",Bt(this,{target:this.shadowRoot,props:wt(this.attributes),customElement:!0},Ie,ze,st,{item:0},null),e&&(e.target&&x(e.target,this,e.anchor),e.props&&(this.$set(e.props),C()))}static get observedAttributes(){return["item"]}get item(){return this.$$.ctx[0]}set item(e){this.$$set({item:e}),C()}}customElements.define("emuos-toast",qe);function Fe(t,{delay:e=0,duration:n=400,easing:s=D}={}){const i=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:r=>`opacity: ${r*i}`}}function Ge(t,{delay:e=0,duration:n=400,easing:s=Zt,x:i=0,y:r=0,opacity:c=0}={}){const l=getComputedStyle(t),o=+l.opacity,a=l.transform==="none"?"":l.transform,d=o*(1-c);return{delay:e,duration:n,easing:s,css:(u,h)=>`
			transform: ${a} translate(${(1-u)*i}px, ${(1-u)*r}px);
			opacity: ${o-d*h}`}}function We(t,{from:e,to:n},s={}){const i=getComputedStyle(t),r=i.transform==="none"?"":i.transform,[c,l]=i.transformOrigin.split(" ").map(parseFloat),o=e.left+e.width*c/n.width-(n.left+c),a=e.top+e.height*l/n.height-(n.top+l),{delay:d=0,duration:u=m=>Math.sqrt(m)*120,easing:h=Zt}=s;return{delay:d,duration:V(u)?u(Math.sqrt(o*o+a*a)):u,easing:h,css:(m,f)=>{const p=f*o,_=f*a,g=m+f*e.width/n.width,w=m+f*e.height/n.height;return`transform: ${r} translate(${p}px, ${_}px) scale(${g}, ${w});`}}}function jt(t,e,n){const s=t.slice();return s[6]=e[n],s}function Pt(t,e){let n,s,i,r,c,l,o,a,d,u=b,h;return{key:t,first:null,c(){n=k("li"),s=k("emuos-toast"),r=dt(),this.h()},l(m){n=L(m,"LI",{class:!0,style:!0});var f=A(n);s=L(f,"EMUOS-TOAST",{item:!0}),A(s).forEach(y),r=mt(f),f.forEach(y),this.h()},h(){Ct(s,"item",i=e[6]),$(n,"class",c=e[6].classes.join(" ")),$(n,"style",l=e[2](e[6].theme)),this.first=n},m(m,f){x(m,n,f),T(n,s),T(n,r),h=!0},p(m,f){e=m,(!h||f&2&&i!==(i=e[6]))&&Ct(s,"item",i),(!h||f&2&&c!==(c=e[6].classes.join(" ")))&&$(n,"class",c),(!h||f&2&&l!==(l=e[2](e[6].theme)))&&$(n,"style",l)},r(){d=n.getBoundingClientRect()},f(){be(n),u(),Ut(n,d)},a(){u(),u=ge(n,d,We,{duration:200})},i(m){h||(P(()=>{a&&a.end(1),o=Ee(n,Ge,e[6].intro),o.start()}),h=!0)},o(m){o&&o.invalidate(),a=Be(n,Fe,{}),h=!1},d(m){m&&y(n),m&&a&&a.end()}}}function Ue(t){let e,n=[],s=new Map,i,r=t[1];const c=l=>l[6].id;for(let l=0;l<r.length;l+=1){let o=jt(t,r,l),a=c(o);s.set(a,n[l]=Pt(a,o))}return{c(){e=k("ul");for(let l=0;l<n.length;l+=1)n[l].c();this.c=b,this.h()},l(l){e=L(l,"UL",{class:!0});var o=A(e);for(let a=0;a<n.length;a+=1)n[a].l(o);o.forEach(y),this.h()},h(){$(e,"class","toasts")},m(l,o){x(l,e,o);for(let a=0;a<n.length;a+=1)n[a].m(e,null);i=!0},p(l,[o]){if(o&6){r=l[1],xt();for(let a=0;a<n.length;a+=1)n[a].r();n=Ce(n,o,c,1,l,r,s,e,Ae,Pt,null,jt);for(let a=0;a<n.length;a+=1)n[a].a();Et()}},i(l){if(!i){for(let o=0;o<r.length;o+=1)R(n[o]);i=!0}},o(l){for(let o=0;o<n.length;o+=1)H(n[o]);i=!1},d(l){l&&y(e);for(let o=0;o<n.length;o+=1)n[o].d()}}}function Ve(t,e,n){let s,i=b;zt(t,G,a=>n(5,s=a)),t.$$.on_destroy.push(()=>i());let{options:r={}}=e,{target:c="default"}=e,l;const o=a=>Object.keys(a).reduce((d,u)=>`${d}${u}:${a[u]};`,"");return t.$$set=a=>{"options"in a&&n(3,r=a.options),"target"in a&&n(4,c=a.target)},t.$$.update=()=>{t.$$.dirty&24&&G.init(c,r),t.$$.dirty&48&&n(1,l=s.filter(a=>a.target===c))},[G,l,o,r,c,s]}class Ke extends lt{constructor(e){super(),this.shadowRoot.innerHTML="<style>.toasts{position:fixed;top:var(--toastsTop, 1.5rem);right:var(--toastsRight, 2rem);bottom:var(--toastsBottom, auto);left:var(--toastsLeft, auto);margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastsZIndex, auto)}</style>",Bt(this,{target:this.shadowRoot,props:wt(this.attributes),customElement:!0},Ve,Ue,st,{toast:0,options:3,target:4},null),e&&(e.target&&x(e.target,this,e.anchor),e.props&&(this.$set(e.props),C()))}static get observedAttributes(){return["toast","options","target"]}get toast(){return G}get options(){return this.$$.ctx[3]}set options(e){this.$$set({options:e}),C()}get target(){return this.$$.ctx[4]}set target(e){this.$$set({target:e}),C()}}customElements.define("emuos-toasts",Ke);let Ht=0;const Dt=document.getElementsByTagName("my-counter")[0],Ye=document.getElementsByTagName("emuos-toasts")[0];Dt.addEventListener("click",()=>{Dt.setAttribute("count",++Ht),Ye.toast.open({msg:`You clicked ${Ht} times`,initial:1,pausable:!0})});
//# sourceMappingURL=main.164518ed.js.map
