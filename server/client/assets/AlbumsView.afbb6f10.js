import{p as se,a as ae,r,o as ie,b as o,c as p,d as s,q as x,w as a,h as y,s as D,F as b,e as k,f as t,g as w,l as m,i as c,t as V,v,Q as g,x as ue,j as S,y as O,m as W,z as L,A as G,C as H}from"./index.59705c03.js";const oe={class:"q-pa-md flex row justify-center q-gutter-md"},ne=["src"],de=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"All",-1),re=s("div",{class:"text-subtitle2"},"All Images from all your Tags",-1),me=s("p",{class:"text-subtitle2"},"|",-1),ce=["src"],fe=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Favourites",-1),ve=s("div",{class:"text-subtitle2"},"Images from your favourite Tags",-1),pe=s("p",{class:"text-subtitle2"},"|",-1),ge=["src"],_e=["onClick"],ye={class:"text-h4",style:{"font-family":"blankRiver"}},xe={class:"text-subtitle2"},be=s("p",{class:"text-subtitle2"},"|",-1),ke=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Add",-1),we={class:"text-subtitle2"},Ve={class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}},he={class:"flex row justify-center q-ma-md"},Ce=["src","onClick"],qe=s("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," All ",-1),$e={class:"flex row justify-center q-ma-md"},Ae=["src","onClick"],je=s("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," Favourite ",-1),ze={class:"flex row justify-center q-ma-md"},Ie=["src","onClick"],Te=["src"],De={__name:"AlbumsView",setup(Ue){const _=se(),n=ae(),h=r([]),C=r([]),q=r([]),f=r(),B=r(!1),J=r(),$=r(!1),F=r(!1),R=r(!1),A=r(""),j=r(""),T=r([]),z=r(!1),E=r(!1),U=r(""),Q=r(""),M=r([]),N=i=>{let l=0;return i.forEach(e=>{l+=n.tags.find(d=>d._id===e).images.length}),l},X=()=>{U.value="",Q.value="",z.value=!1},Y=async()=>{const i=[];M.value.forEach(e=>i.push(n.tags.find(d=>d.title===e)._id));const l={title:U.value,description:Q.value,tags:i};await _.createAlbum(l),q.value=_.albums,z.value=!1},Z=i=>{f.value=i,E.value=!0},P=i=>{J.value=i,B.value=!0},ee=()=>{A.value=f.value.title,j.value=f.value.description,T.value=f.value.tags.map(i=>n.tags.find(l=>l._id===i).title),$.value=!0},le=()=>{$.value=!1},te=async()=>{const i={};f.value.title!==A.value&&(i.title=A.value),f.value.description!==j.value&&(i.description=j.value);const l=T.value.map(e=>n.tags.find(d=>d.title===e)._id);f.value.tags!==l&&(i.tags=l),await _.updateAlbum(f.value,i),q.value=_.albums,f.value=_.albums.find(e=>e._id===f.value._id),$.value=!1};return ie(async()=>{await _.getUserAlbums(),q.value=_.albums,h.value=n.tags.filter(i=>i.favourite===!0).map(i=>i._id),C.value=n.tags.map(i=>i._id),f.value=q.value[0]}),(i,l)=>(o(),p(b,null,[s("div",oe,[C.value.length!==0?(o(),x(y,{key:0,class:"col-5"},{default:a(()=>[s("img",{src:`/images/${m(n).tags[0].images[0]}`,alt:""},null,8,ne),s("div",{onClick:l[0]||(l[0]=e=>F.value=!0)},[t(c,{class:""},{default:a(()=>[de,re]),_:1}),t(V),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(C.value.length),1),me,s("p",null,"Images: "+v(N(C.value)),1)]),_:1})])]),_:1})):D("",!0),h.value.length!==0?(o(),x(y,{key:1,class:"col-5"},{default:a(()=>[s("img",{src:`/images/${m(n).tags.filter(e=>e.favourite===!0)[0].images[0]}`,alt:""},null,8,ce),s("div",{onClick:l[1]||(l[1]=e=>R.value=!0)},[t(c,{class:""},{default:a(()=>[fe,ve]),_:1}),t(V),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(h.value.length),1),pe,s("p",null,"Images: "+v(N(h.value)),1)]),_:1})])]),_:1})):D("",!0),(o(!0),p(b,null,k(q.value,e=>(o(),x(y,{class:"col-5",key:e._id},{default:a(()=>[t(g,{class:"absolute-top-left q-mt-md","text-color":"primary",flat:"",icon:"delete",style:{"z-index":"1"},onClick:d=>m(_).deleteAlbum(e)},null,8,["onClick"]),e.favourite?D("",!0):(o(),x(g,{key:0,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star_outline",style:{"z-index":"1"},onClick:d=>m(_).favouriteAlbum(e)},null,8,["onClick"])),e.favourite?(o(),x(g,{key:1,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star",style:{"z-index":"1"},onClick:d=>m(_).favouriteAlbum(e)},null,8,["onClick"])):D("",!0),s("img",{src:`/images/${m(n).tags.find(d=>d._id===e.tags[0]).images[0]}`,alt:""},null,8,ge),s("div",{onClick:d=>Z(e)},[t(c,{class:""},{default:a(()=>[s("div",ye,v(e.title),1),s("div",xe,v(e.description),1)]),_:2},1024),t(V),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(e.tags.length),1),be,s("p",null,"Images: "+v(N(e.tags)),1)]),_:2},1024)],8,_e)]),_:2},1024))),128)),t(y,{class:"col-5 text-center flex column justify-center",onClick:l[2]||(l[2]=e=>z.value=!0)},{default:a(()=>[t(ue,{class:"self-center",name:"add_circle",size:"8rem",color:"primary"}),t(c,{class:""},{default:a(()=>[ke,s("div",we,v(),1)]),_:1})]),_:1})]),t(w,{modelValue:z.value,"onUpdate:modelValue":l[8]||(l[8]=e=>z.value=e),persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(y,null,{default:a(()=>[t(c,null,{default:a(()=>[t(S,{standout:"bg-primary text-white",modelValue:U.value,"onUpdate:modelValue":l[3]||(l[3]=e=>U.value=e),label:"Title"},null,8,["modelValue"]),t(S,{standout:"bg-primary text-white",modelValue:Q.value,"onUpdate:modelValue":l[4]||(l[4]=e=>Q.value=e),label:"description"},null,8,["modelValue"]),t(O,{filled:"",modelValue:M.value,"onUpdate:modelValue":l[5]||(l[5]=e=>M.value=e),multiple:"",options:m(n).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"])]),_:1}),t(W,{align:"center"},{default:a(()=>[t(g,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:l[6]||(l[6]=e=>X())}),t(g,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:l[7]||(l[7]=e=>Y())})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(w,{modelValue:E.value,"onUpdate:modelValue":l[16]||(l[16]=e=>E.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(y,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(g,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[s("p",Ve,v(f.value.title),1),s("div",null,[t(g,{class:"q-mt-md","text-color":"primary",size:"20px",flat:"",icon:"edit",style:{"z-index":"1"},onClick:l[9]||(l[9]=e=>ee())})])]),_:1}),(o(!0),p(b,null,k(f.value.tags,(e,d)=>(o(),x(c,{key:d},{default:a(()=>[s("p",null,v(m(n).tags.find(u=>u._id===e).title)+":",1),s("div",he,[(o(!0),p(b,null,k(m(n).tags.find(u=>u._id===e).images,(u,I)=>(o(),p("img",{key:I,class:"col-4",src:`/images/${u}`,alt:"",onClick:K=>P(u)},null,8,Ce))),128))]),t(V)]),_:2},1024))),128))]),_:1}),t(w,{modelValue:$.value,"onUpdate:modelValue":l[15]||(l[15]=e=>$.value=e),persistent:""},{default:a(()=>[t(y,null,{default:a(()=>[t(S,{standout:"bg-primary text-white",modelValue:A.value,"onUpdate:modelValue":l[10]||(l[10]=e=>A.value=e),label:"Title"},null,8,["modelValue"]),t(S,{standout:"bg-primary text-white",modelValue:j.value,"onUpdate:modelValue":l[11]||(l[11]=e=>j.value=e),label:"description"},null,8,["modelValue"]),t(O,{filled:"",modelValue:T.value,"onUpdate:modelValue":l[12]||(l[12]=e=>T.value=e),multiple:"",options:m(n).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"]),t(W,{align:"center"},{default:a(()=>[t(g,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:l[13]||(l[13]=e=>le())}),t(g,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:l[14]||(l[14]=e=>te())})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),t(w,{modelValue:F.value,"onUpdate:modelValue":l[17]||(l[17]=e=>F.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(y,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(g,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[qe]),_:1}),(o(!0),p(b,null,k(C.value,(e,d)=>(o(),x(c,{key:d},{default:a(()=>[s("p",null,v(m(n).tags.find(u=>u._id===e).title)+":",1),s("div",$e,[(o(!0),p(b,null,k(m(n).tags.find(u=>u._id===e).images,(u,I)=>(o(),p("img",{key:I,class:"col-4",src:`/images/${u}`,alt:"",onClick:K=>P(u)},null,8,Ae))),128))]),t(V)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),t(w,{modelValue:R.value,"onUpdate:modelValue":l[18]||(l[18]=e=>R.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(y,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(g,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[je]),_:1}),(o(!0),p(b,null,k(h.value,(e,d)=>(o(),x(c,{key:d},{default:a(()=>[s("p",null,v(m(n).tags.find(u=>u._id===e).title)+":",1),s("div",ze,[(o(!0),p(b,null,k(m(n).tags.find(u=>u._id===e).images,(u,I)=>(o(),p("img",{key:I,class:"col-4",src:`/images/${u}`,alt:"",onClick:K=>P(u)},null,8,Ie))),128))]),t(V)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),t(w,{modelValue:B.value,"onUpdate:modelValue":l[19]||(l[19]=e=>B.value=e),maximized:!0},{default:a(()=>[s("img",{src:`images/${J.value}`,style:{width:"100%"},alt:""},null,8,Te)]),_:1},8,["modelValue"])],64))}};export{De as default};
