import{p as ie,r,q as ue,t as oe,s as S,a as ne,o as de,b as o,c as _,d as a,v as b,w as s,h as k,x as z,F as V,e as q,f as l,g as j,l as c,i as p,y as I,z as g,Q as y,A as re,j as E,B as X,m as Y,C as J,D as K,E as O}from"./index.1400597a.js";const me=ie("albumStore",()=>{const C=r([]),v=ue(()=>oe(C.value));async function u(){const{data:f}=await S.get("/api/album/");C.value=f}async function A(f,x){const w=await S.patch(`/api/album/${f._id}`,{updatedFields:x});console.log(w),await u()}async function h(f){await S.delete(`/api/album/${f._id}`),C.value.splice(C.value.findIndex(x=>x._id==f._id),1)}async function $(f){await S.post(`/api/album/favourite/${f._id}`);const x=C.value.find(w=>w._id===f._id);x.favourite=!x.favourite}async function d(f){await S.post("/api/album",{updatedFields:f}),await u()}return{getUserAlbums:u,updateAlbum:A,deleteAlbum:h,favouriteAlbum:$,createAlbum:d,albums:C,albumsGetter:v}},{persist:!0}),ce={class:"q-pa-md flex row justify-center q-gutter-md"},fe=["src"],ve=a("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"All",-1),pe=a("div",{class:"text-subtitle2"},"All Images from all your Tags",-1),ge=a("p",{class:"text-subtitle2"},"|",-1),ye=["src"],_e=a("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Favourites",-1),be=a("div",{class:"text-subtitle2"},"Images from your favourite Tags",-1),xe=a("p",{class:"text-subtitle2"},"|",-1),we=["src"],ke=["onClick"],Ve={class:"text-h4",style:{"font-family":"blankRiver"}},Ce={class:"text-subtitle2"},Ae=a("p",{class:"text-subtitle2"},"|",-1),he=a("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Add",-1),$e={class:"text-subtitle2"},qe={class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}},ze={class:"flex row justify-center q-ma-md"},je=["src","onClick"],Ie=a("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," All ",-1),Te={class:"flex row justify-center q-ma-md"},Ue=["src","onClick"],Qe=a("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," Favourite ",-1),De={class:"flex row justify-center q-ma-md"},Se=["src","onClick"],Be=["src"],Fe={__name:"AlbumsView",setup(C){const v=me(),u=ne(),A=r([]),h=r([]),$=r(),d=r(),f=r(!1),x=r(),w=r(!1),M=r(!1),N=r(!1),T=r(""),U=r(""),B=r([]),Q=r(!1),P=r(!1),R=r(""),F=r(""),G=r([]),L=i=>{let t=0;return i.forEach(e=>{t+=u.tags.find(m=>m._id===e).images.length}),t},Z=()=>{R.value="",F.value="",Q.value=!1},ee=async()=>{const i=[];G.value.forEach(e=>i.push(u.tags.find(m=>m.title===e)._id));const t={title:R.value,description:F.value,tags:i};await v.createAlbum(t),$.value=v.albums,Q.value=!1},te=i=>{d.value=i,P.value=!0},H=i=>{x.value=i,f.value=!0},le=()=>{T.value=d.value.title,U.value=d.value.description,B.value=d.value.tags.map(i=>u.tags.find(t=>t._id===i).title),w.value=!0},ae=()=>{w.value=!1},se=async()=>{const i={};d.value.title!==T.value&&(i.title=T.value),d.value.description!==U.value&&(i.description=U.value);const t=B.value.map(e=>u.tags.find(m=>m.title===e)._id);d.value.tags!==t&&(i.tags=t),await v.updateAlbum(d.value,i),$.value=v.albums,d.value=v.albums.find(e=>e._id===d.value._id),w.value=!1};return de(async()=>{await v.getUserAlbums(),$.value=v.albums,A.value=u.tags.filter(i=>i.favourite===!0).map(i=>i._id),h.value=u.tags.map(i=>i._id),d.value=$.value[0]}),(i,t)=>(o(),_(V,null,[a("div",ce,[h.value.length!==0?(o(),b(k,{key:0,class:"col-5"},{default:s(()=>[a("img",{src:`/images/${c(u).tags[0].images[0]}`,alt:""},null,8,fe),a("div",{onClick:t[0]||(t[0]=e=>M.value=!0)},[l(p,{class:""},{default:s(()=>[ve,pe]),_:1}),l(I),l(p,{class:"flex row justify-around"},{default:s(()=>[a("p",null,"Tags: "+g(h.value.length),1),ge,a("p",null,"Images: "+g(L(h.value)),1)]),_:1})])]),_:1})):z("",!0),A.value.length!==0?(o(),b(k,{key:1,class:"col-5"},{default:s(()=>[a("img",{src:`/images/${c(u).tags.filter(e=>e.favourite===!0)[0].images[0]}`,alt:""},null,8,ye),a("div",{onClick:t[1]||(t[1]=e=>N.value=!0)},[l(p,{class:""},{default:s(()=>[_e,be]),_:1}),l(I),l(p,{class:"flex row justify-around"},{default:s(()=>[a("p",null,"Tags: "+g(A.value.length),1),xe,a("p",null,"Images: "+g(L(A.value)),1)]),_:1})])]),_:1})):z("",!0),(o(!0),_(V,null,q($.value,e=>(o(),b(k,{class:"col-5",key:e._id},{default:s(()=>[l(y,{class:"absolute-top-left q-mt-md","text-color":"primary",flat:"",icon:"delete",style:{"z-index":"1"},onClick:m=>c(v).deleteAlbum(e)},null,8,["onClick"]),e.favourite?z("",!0):(o(),b(y,{key:0,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star_outline",style:{"z-index":"1"},onClick:m=>c(v).favouriteAlbum(e)},null,8,["onClick"])),e.favourite?(o(),b(y,{key:1,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star",style:{"z-index":"1"},onClick:m=>c(v).favouriteAlbum(e)},null,8,["onClick"])):z("",!0),a("img",{src:`/images/${c(u).tags.find(m=>m._id===e.tags[0]).images[0]}`,alt:""},null,8,we),a("div",{onClick:m=>te(e)},[l(p,{class:""},{default:s(()=>[a("div",Ve,g(e.title),1),a("div",Ce,g(e.description),1)]),_:2},1024),l(I),l(p,{class:"flex row justify-around"},{default:s(()=>[a("p",null,"Tags: "+g(e.tags.length),1),Ae,a("p",null,"Images: "+g(L(e.tags)),1)]),_:2},1024)],8,ke)]),_:2},1024))),128)),l(k,{class:"col-5 text-center flex column justify-center",onClick:t[2]||(t[2]=e=>Q.value=!0)},{default:s(()=>[l(re,{class:"self-center",name:"add_circle",size:"8rem",color:"primary"}),l(p,{class:""},{default:s(()=>[he,a("div",$e,g(),1)]),_:1})]),_:1})]),l(j,{modelValue:Q.value,"onUpdate:modelValue":t[8]||(t[8]=e=>Q.value=e),persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:s(()=>[l(k,null,{default:s(()=>[l(p,null,{default:s(()=>[l(E,{standout:"bg-primary text-white",modelValue:R.value,"onUpdate:modelValue":t[3]||(t[3]=e=>R.value=e),label:"Title"},null,8,["modelValue"]),l(E,{standout:"bg-primary text-white",modelValue:F.value,"onUpdate:modelValue":t[4]||(t[4]=e=>F.value=e),label:"description"},null,8,["modelValue"]),l(X,{filled:"",modelValue:G.value,"onUpdate:modelValue":t[5]||(t[5]=e=>G.value=e),multiple:"",options:c(u).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"])]),_:1}),l(Y,{align:"center"},{default:s(()=>[l(y,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:t[6]||(t[6]=e=>Z())}),l(y,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:t[7]||(t[7]=e=>ee())})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:P.value,"onUpdate:modelValue":t[18]||(t[18]=e=>P.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:s(()=>[l(k,null,{default:s(()=>[l(J,{class:"bg-primary text-white flex justify-center"},{default:s(()=>[K(l(y,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[O]])]),_:1}),l(p,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:s(()=>[a("p",qe,g(d.value.title),1),a("div",null,[l(y,{class:"q-mt-md","text-color":"primary",size:"20px",flat:"",icon:"edit",style:{"z-index":"1"},onClick:t[9]||(t[9]=e=>le())}),d.value.favourite?z("",!0):(o(),b(y,{key:0,class:"q-mt-md",size:"20px","text-color":"primary",flat:"",icon:"star_outline",style:{"z-index":"1"},onClick:t[10]||(t[10]=e=>c(v).favouriteAlbum(d.value))})),d.value.favourite?(o(),b(y,{key:1,class:"q-mt-md","text-color":"primary",size:"20px",flat:"",icon:"star",style:{"z-index":"1"},onClick:t[11]||(t[11]=e=>c(v).favouriteAlbum(d.value))})):z("",!0)])]),_:1}),(o(!0),_(V,null,q(d.value.tags,(e,m)=>(o(),b(p,{key:m},{default:s(()=>[a("p",null,g(c(u).tags.find(n=>n._id===e).title)+":",1),a("div",ze,[(o(!0),_(V,null,q(c(u).tags.find(n=>n._id===e).images,(n,D)=>(o(),_("img",{key:D,class:"col-4",src:`/images/${n}`,alt:"",onClick:W=>H(n)},null,8,je))),128))]),l(I)]),_:2},1024))),128))]),_:1}),l(j,{modelValue:w.value,"onUpdate:modelValue":t[17]||(t[17]=e=>w.value=e),persistent:""},{default:s(()=>[l(k,null,{default:s(()=>[l(E,{standout:"bg-primary text-white",modelValue:T.value,"onUpdate:modelValue":t[12]||(t[12]=e=>T.value=e),label:"Title"},null,8,["modelValue"]),l(E,{standout:"bg-primary text-white",modelValue:U.value,"onUpdate:modelValue":t[13]||(t[13]=e=>U.value=e),label:"description"},null,8,["modelValue"]),l(X,{filled:"",modelValue:B.value,"onUpdate:modelValue":t[14]||(t[14]=e=>B.value=e),multiple:"",options:c(u).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"]),l(Y,{align:"center"},{default:s(()=>[l(y,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:t[15]||(t[15]=e=>ae())}),l(y,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:t[16]||(t[16]=e=>se())})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),l(j,{modelValue:M.value,"onUpdate:modelValue":t[19]||(t[19]=e=>M.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:s(()=>[l(k,null,{default:s(()=>[l(J,{class:"bg-primary text-white flex justify-center"},{default:s(()=>[K(l(y,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[O]])]),_:1}),l(p,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:s(()=>[Ie]),_:1}),(o(!0),_(V,null,q(h.value,(e,m)=>(o(),b(p,{key:m},{default:s(()=>[a("p",null,g(c(u).tags.find(n=>n._id===e).title)+":",1),a("div",Te,[(o(!0),_(V,null,q(c(u).tags.find(n=>n._id===e).images,(n,D)=>(o(),_("img",{key:D,class:"col-4",src:`/images/${n}`,alt:"",onClick:W=>H(n)},null,8,Ue))),128))]),l(I)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:N.value,"onUpdate:modelValue":t[20]||(t[20]=e=>N.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:s(()=>[l(k,null,{default:s(()=>[l(J,{class:"bg-primary text-white flex justify-center"},{default:s(()=>[K(l(y,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[O]])]),_:1}),l(p,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:s(()=>[Qe]),_:1}),(o(!0),_(V,null,q(A.value,(e,m)=>(o(),b(p,{key:m},{default:s(()=>[a("p",null,g(c(u).tags.find(n=>n._id===e).title)+":",1),a("div",De,[(o(!0),_(V,null,q(c(u).tags.find(n=>n._id===e).images,(n,D)=>(o(),_("img",{key:D,class:"col-4",src:`/images/${n}`,alt:"",onClick:W=>H(n)},null,8,Se))),128))]),l(I)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:f.value,"onUpdate:modelValue":t[21]||(t[21]=e=>f.value=e),maximized:!0},{default:s(()=>[a("img",{src:`images/${x.value}`,style:{width:"100%"},alt:""},null,8,Be)]),_:1},8,["modelValue"])],64))}};export{Fe as default};
