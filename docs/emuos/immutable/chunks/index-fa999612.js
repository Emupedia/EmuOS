function P(){}const st=t=>t;function ot(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function H(){return Object.create(null)}function $(t){t.forEach(J)}function K(t){return typeof t=="function"}function Tt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let j;function qt(t,e){return j||(j=document.createElement("a")),j.href=e,t===j.href}function lt(t){return Object.keys(t).length===0}function Rt(t,e,n,i){if(t){const s=Q(t,e,n,i);return t[0](s)}}function Q(t,e,n,i){return t[1]&&i?ot(n.ctx.slice(),t[1](i(e))):n.ctx}function Lt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function zt(t,e,n,i,s,c){if(s){const r=Q(e,n,i,c);t.p(r,s)}}function Bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Ft(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Ht(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}const U=typeof window<"u";let ct=U?()=>window.performance.now():()=>Date.now(),B=U?t=>requestAnimationFrame(t):P;const x=new Set;function V(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&B(V)}function ut(t){let e;return x.size===0&&B(V),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let T=!1;function at(){T=!0}function ft(){T=!1}function _t(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&o.push(_)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:_t(1,s,a=>e[n[a]].claim_order,u))-1;i[o]=n[_]+1;const f=_+1;n[f]=o,s=Math.max(f,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<c.length&&r[o].claim_order>=c[u].claim_order;)u++;const _=u<c.length?c[u]:null;t.insertBefore(r[o],_)}}function ht(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function mt(t){const e=Y("style");return pt(X(t),e),e.sheet}function pt(t,e){ht(t.head||t,e)}function yt(t,e){if(T){for(dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function It(t,e,n){T&&!n?yt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function gt(t){t.parentNode.removeChild(t)}function Y(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function Wt(){return F(" ")}function Gt(){return F("")}function Jt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Kt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function xt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Qt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:xt(t,i,e[i])}function $t(t){return Array.from(t.childNodes)}function bt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,i,s=!1){bt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function wt(t,e,n,i){return Z(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Ut(t,e,n){return wt(t,e,n,Y)}function vt(t,e){return Z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function Vt(t){return vt(t," ")}function Xt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Yt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Zt(t,e,n){t.classList[n?"add":"remove"](e)}function tt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function te(t,e=document.body){return Array.from(e.querySelectorAll(t))}const D=new Map;let M=0;function Et(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function kt(t,e){const n={stylesheet:mt(e),rules:{}};return D.set(t,n),n}function I(t,e,n,i,s,c,r,l=0){const o=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=o){const g=e+(n-e)*c(p);u+=p*100+`%{${r(g,1-g)}}
`}const _=u+`100% {${r(n,1-n)}}
}`,f=`__svelte_${Et(_)}_${l}`,a=X(t),{stylesheet:d,rules:h}=D.get(a)||kt(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${i}ms linear ${s}ms 1 both`,M+=1,f}function At(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),M-=s,M||jt())}function jt(){B(()=>{M||(D.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),D.clear())})}let E;function v(t){E=t}function k(){if(!E)throw new Error("Function called outside component initialization");return E}function ee(t){k().$$.on_mount.push(t)}function ne(t){k().$$.after_update.push(t)}function ie(t){k().$$.on_destroy.push(t)}function re(){const t=k();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=tt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function se(t,e){return k().$$.context.set(t,e),e}const w=[],W=[],S=[],G=[],et=Promise.resolve();let z=!1;function nt(){z||(z=!0,et.then(it))}function oe(){return nt(),et}function O(t){S.push(t)}const R=new Set;let N=0;function it(){const t=E;do{for(;N<w.length;){const e=w[N];N++,v(e),Nt(e.$$)}for(v(null),w.length=0,N=0;W.length;)W.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];R.has(n)||(R.add(n),n())}S.length=0}while(w.length);for(;G.length;)G.pop()();z=!1,R.clear(),v(t)}function Nt(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}let b;function St(){return b||(b=Promise.resolve(),b.then(()=>{b=null})),b}function L(t,e,n){t.dispatchEvent(tt(`${e?"intro":"outro"}${n}`))}const C=new Set;let m;function le(){m={r:0,c:[],p:m}}function ce(){m.r||$(m.c),m=m.p}function Ct(t,e){t&&t.i&&(C.delete(t),t.i(e))}function ue(t,e,n,i){if(t&&t.o){if(C.has(t))return;C.add(t),m.c.push(()=>{C.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Dt={duration:0};function ae(t,e,n,i){let s=e(t,n),c=i?0:1,r=null,l=null,o=null;function u(){o&&At(t,o)}function _(a,d){const h=a.b-c;return d*=Math.abs(h),{a:c,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:y=st,tick:p=P,css:g}=s||Dt,q={start:ct()+d,b:a};a||(q.group=m,m.r+=1),r||l?l=q:(g&&(u(),o=I(t,c,a,h,d,y,g)),a&&p(0,1),r=_(q,h),O(()=>L(t,a,"start")),ut(A=>{if(l&&A>l.start&&(r=_(l,h),l=null,L(t,r.b,"start"),g&&(u(),o=I(t,c,r.b,r.duration,0,y,s.css))),r){if(A>=r.end)p(c=r.b,1-c),L(t,r.b,"end"),l||(r.b?u():--r.group.r||$(r.group.c)),r=null;else if(A>=r.start){const rt=A-r.start;c=r.a+r.d*y(rt/r.duration),p(c,1-c)}}return!!(r||l)}))}return{run(a){K(s)?St().then(()=>{s=s(),f(a)}):f(a)},end(){u(),r=l=null}}}const fe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function _e(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],l=e[c];if(l){for(const o in r)o in l||(i[o]=1);for(const o in l)s[o]||(n[o]=l[o],s[o]=1);t[c]=l}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function de(t){return typeof t=="object"&&t!==null?t:{}}function he(t){t&&t.c()}function me(t,e){t&&t.l(e)}function Mt(t,e,n,i){const{fragment:s,on_mount:c,on_destroy:r,after_update:l}=t.$$;s&&s.m(e,n),i||O(()=>{const o=c.map(J).filter(K);r?r.push(...o):$(o),t.$$.on_mount=[]}),l.forEach(O)}function Ot(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(w.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function pe(t,e,n,i,s,c,r,l=[-1]){const o=E;v(t);const u=t.$$={fragment:null,ctx:null,props:c,update:P,not_equal:s,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:H(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Pt(t,f)),a}):[],u.update(),_=!0,$(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){at();const f=$t(e.target);u.fragment&&u.fragment.l(f),f.forEach(gt)}else u.fragment&&u.fragment.c();e.intro&&Ct(t.$$.fragment),Mt(t,e.target,e.anchor,e.customElement),ft(),it()}v(o)}class ye{$destroy(){Ot(this,1),this.$destroy=P}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!lt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{re as $,_e as A,de as B,Ot as C,ot as D,oe as E,Rt as F,te as G,zt as H,Bt as I,Lt as J,qt as K,yt as L,ie as M,Qt as N,Zt as O,Jt as P,$ as Q,Ht as R,ye as S,Ft as T,fe as U,W as V,K as W,st as X,Kt as Y,O as Z,ae as _,Wt as a,It as b,Vt as c,ce as d,Gt as e,Ct as f,le as g,gt as h,pe as i,se as j,ne as k,Y as l,Ut as m,P as n,ee as o,$t as p,xt as q,Yt as r,Tt as s,ue as t,F as u,vt as v,Xt as w,he as x,me as y,Mt as z};
