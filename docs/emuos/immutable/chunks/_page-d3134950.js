import{ac as n}from"./index-c43397dc.js";import{g as a,d as c}from"./stores-06c76951.js";const l=async s=>{var r;console.log("+page.js");const e=await a(s.fetch).catch(t=>console.error(t)),o=await(e==null?void 0:e.json().catch(t=>console.error(t)));return{version:typeof o<"u"?(o==null?void 0:o.version)||0:((r=n(c))==null?void 0:r.version)||0}},f=Object.freeze(Object.defineProperty({__proto__:null,load:l},Symbol.toStringTag,{value:"Module"}));export{f as _,l};
