import{p as se,a as ae,r as m,o as ie,b as u,c as y,d as s,q as _,w as a,h as x,s as w,F as b,e as k,f as t,g as V,l as f,i as c,t as C,v,Q as p,x as ue,j as S,y as O,m as W,z as L,A as G,C as H}from"./index.f87d7745.js";const oe={class:"q-pa-md flex row justify-center q-gutter-md"},ne=["src"],de=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"All",-1),re=s("div",{class:"text-subtitle2"},"All Images from all your Tags",-1),me=s("p",{class:"text-subtitle2"},"|",-1),fe=["src"],ce=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Favourites",-1),ve=s("div",{class:"text-subtitle2"},"Images from your favourite Tags",-1),pe=s("p",{class:"text-subtitle2"},"|",-1),ge=["src"],ye=["onClick"],_e={class:"text-h4",style:{"font-family":"blankRiver"}},xe={class:"text-subtitle2"},be=s("p",{class:"text-subtitle2"},"|",-1),ke=s("div",{class:"text-h4",style:{"font-family":"blankRiver"}},"Add",-1),we={class:"text-subtitle2"},Ve={class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}},Ce={class:"flex row justify-center q-ma-md"},he=["src","onClick"],qe=s("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," All ",-1),$e={class:"flex row justify-center q-ma-md"},Ae=["src","onClick"],ze=s("p",{class:"text-h2 q-my-md",style:{"font-family":"blankRiver"}}," Favourite ",-1),je={class:"flex row justify-center q-ma-md"},Ie=["src","onClick"],Te=["src"],De={__name:"AlbumsView",setup(Ue){const g=se(),n=ae(),h=m([]),q=m([]),T=m(g.albums),d=m(),B=m(!1),J=m(),$=m(!1),F=m(!1),R=m(!1),A=m(""),z=m(""),U=m([]),j=m(!1),E=m(!1),Q=m(""),D=m(""),M=m([]),N=i=>{let l=0;return i.forEach(e=>{l+=n.tags.find(r=>r._id===e).images.length}),l},X=()=>{Q.value="",D.value="",j.value=!1},Y=async()=>{const i=[];M.value.forEach(e=>i.push(n.tags.find(r=>r.title===e)._id));const l={title:Q.value,description:D.value,tags:i};await g.createAlbum(l),T.value=g.albums,j.value=!1},Z=i=>{d.value=i,E.value=!0},P=i=>{J.value=i,B.value=!0},ee=()=>{A.value=d.value.title,z.value=d.value.description,U.value=d.value.tags.map(i=>n.tags.find(l=>l._id===i).title),$.value=!0},le=()=>{$.value=!1},te=async()=>{const i={};d.value.title!==A.value&&(i.title=A.value),d.value.description!==z.value&&(i.description=z.value);const l=U.value.map(e=>n.tags.find(r=>r.title===e)._id);d.value.tags!==l&&(i.tags=l),await g.updateAlbum(d.value,i),T.value=g.albums,d.value=g.albums.find(e=>e._id===d.value._id),$.value=!1};return ie(async()=>{await g.getUserAlbums(),h.value=n.tags.filter(i=>i.favourite===!0).map(i=>i._id),q.value=n.tags.map(i=>i._id),d.value=T.value[0]}),(i,l)=>(u(),y(b,null,[s("div",oe,[q.value.length!==0?(u(),_(x,{key:0,class:"col-5"},{default:a(()=>[s("img",{src:`/images/${f(n).tags[0].images[0]}`,alt:""},null,8,ne),s("div",{onClick:l[0]||(l[0]=e=>F.value=!0)},[t(c,{class:""},{default:a(()=>[de,re]),_:1}),t(C),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(q.value.length),1),me,s("p",null,"Images: "+v(N(q.value)),1)]),_:1})])]),_:1})):w("",!0),h.value.length!==0?(u(),_(x,{key:1,class:"col-5"},{default:a(()=>[s("img",{src:`/images/${f(n).tags.filter(e=>e.favourite===!0)[0].images[0]}`,alt:""},null,8,fe),s("div",{onClick:l[1]||(l[1]=e=>R.value=!0)},[t(c,{class:""},{default:a(()=>[ce,ve]),_:1}),t(C),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(h.value.length),1),pe,s("p",null,"Images: "+v(N(h.value)),1)]),_:1})])]),_:1})):w("",!0),(u(!0),y(b,null,k(T.value,e=>(u(),_(x,{class:"col-5",key:e._id},{default:a(()=>[t(p,{class:"absolute-top-left q-mt-md","text-color":"primary",flat:"",icon:"delete",style:{"z-index":"1"},onClick:r=>f(g).deleteAlbum(e)},null,8,["onClick"]),e.favourite?w("",!0):(u(),_(p,{key:0,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star_outline",style:{"z-index":"1"},onClick:r=>f(g).favouriteAlbum(e)},null,8,["onClick"])),e.favourite?(u(),_(p,{key:1,class:"absolute-top-right q-mt-md","text-color":"primary",flat:"",icon:"star",style:{"z-index":"1"},onClick:r=>f(g).favouriteAlbum(e)},null,8,["onClick"])):w("",!0),s("img",{src:`/images/${f(n).tags.find(r=>r._id===e.tags[0]).images[0]}`,alt:""},null,8,ge),s("div",{onClick:r=>Z(e)},[t(c,{class:""},{default:a(()=>[s("div",_e,v(e.title),1),s("div",xe,v(e.description),1)]),_:2},1024),t(C),t(c,{class:"flex row justify-around"},{default:a(()=>[s("p",null,"Tags: "+v(e.tags.length),1),be,s("p",null,"Images: "+v(N(e.tags)),1)]),_:2},1024)],8,ye)]),_:2},1024))),128)),t(x,{class:"col-5 text-center flex column justify-center",onClick:l[2]||(l[2]=e=>j.value=!0)},{default:a(()=>[t(ue,{class:"self-center",name:"add_circle",size:"8rem",color:"primary"}),t(c,{class:""},{default:a(()=>[ke,s("div",we,v(),1)]),_:1})]),_:1})]),t(V,{modelValue:j.value,"onUpdate:modelValue":l[8]||(l[8]=e=>j.value=e),persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(x,null,{default:a(()=>[t(c,null,{default:a(()=>[t(S,{standout:"bg-primary text-white",modelValue:Q.value,"onUpdate:modelValue":l[3]||(l[3]=e=>Q.value=e),label:"Title"},null,8,["modelValue"]),t(S,{standout:"bg-primary text-white",modelValue:D.value,"onUpdate:modelValue":l[4]||(l[4]=e=>D.value=e),label:"description"},null,8,["modelValue"]),t(O,{filled:"",modelValue:M.value,"onUpdate:modelValue":l[5]||(l[5]=e=>M.value=e),multiple:"",options:f(n).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"])]),_:1}),t(W,{align:"center"},{default:a(()=>[t(p,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:l[6]||(l[6]=e=>X())}),t(p,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:l[7]||(l[7]=e=>Y())})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(V,{modelValue:E.value,"onUpdate:modelValue":l[18]||(l[18]=e=>E.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(x,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(p,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[s("p",Ve,v(d.value.title),1),s("div",null,[t(p,{class:"q-mt-md","text-color":"primary",size:"20px",flat:"",icon:"edit",style:{"z-index":"1"},onClick:l[9]||(l[9]=e=>ee())}),d.value.favourite?w("",!0):(u(),_(p,{key:0,class:"q-mt-md",size:"20px","text-color":"primary",flat:"",icon:"star_outline",style:{"z-index":"1"},onClick:l[10]||(l[10]=e=>f(g).favouriteAlbum(d.value))})),d.value.favourite?(u(),_(p,{key:1,class:"q-mt-md","text-color":"primary",size:"20px",flat:"",icon:"star",style:{"z-index":"1"},onClick:l[11]||(l[11]=e=>f(g).favouriteAlbum(d.value))})):w("",!0)])]),_:1}),(u(!0),y(b,null,k(d.value.tags,(e,r)=>(u(),_(c,{key:r},{default:a(()=>[s("p",null,v(f(n).tags.find(o=>o._id===e).title)+":",1),s("div",Ce,[(u(!0),y(b,null,k(f(n).tags.find(o=>o._id===e).images,(o,I)=>(u(),y("img",{key:I,class:"col-4",src:`/images/${o}`,alt:"",onClick:K=>P(o)},null,8,he))),128))]),t(C)]),_:2},1024))),128))]),_:1}),t(V,{modelValue:$.value,"onUpdate:modelValue":l[17]||(l[17]=e=>$.value=e),persistent:""},{default:a(()=>[t(x,null,{default:a(()=>[t(S,{standout:"bg-primary text-white",modelValue:A.value,"onUpdate:modelValue":l[12]||(l[12]=e=>A.value=e),label:"Title"},null,8,["modelValue"]),t(S,{standout:"bg-primary text-white",modelValue:z.value,"onUpdate:modelValue":l[13]||(l[13]=e=>z.value=e),label:"description"},null,8,["modelValue"]),t(O,{filled:"",modelValue:U.value,"onUpdate:modelValue":l[14]||(l[14]=e=>U.value=e),multiple:"",options:f(n).tags.map(e=>e.title),label:"Multiple",style:{width:"250px"}},null,8,["modelValue","options"]),t(W,{align:"center"},{default:a(()=>[t(p,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:l[15]||(l[15]=e=>le())}),t(p,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:l[16]||(l[16]=e=>te())})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["modelValue"]),t(V,{modelValue:F.value,"onUpdate:modelValue":l[19]||(l[19]=e=>F.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(x,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(p,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[qe]),_:1}),(u(!0),y(b,null,k(q.value,(e,r)=>(u(),_(c,{key:r},{default:a(()=>[s("p",null,v(f(n).tags.find(o=>o._id===e).title)+":",1),s("div",$e,[(u(!0),y(b,null,k(f(n).tags.find(o=>o._id===e).images,(o,I)=>(u(),y("img",{key:I,class:"col-4",src:`/images/${o}`,alt:"",onClick:K=>P(o)},null,8,Ae))),128))]),t(C)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),t(V,{modelValue:R.value,"onUpdate:modelValue":l[20]||(l[20]=e=>R.value=e),maximized:!0,persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:a(()=>[t(x,null,{default:a(()=>[t(L,{class:"bg-primary text-white flex justify-center"},{default:a(()=>[G(t(p,{dense:"",flat:"","font-size":"30px",icon:"expand_more"},null,512),[[H]])]),_:1}),t(c,{class:"flex row justify-between items-top q-mt-sm q-ml-sm"},{default:a(()=>[ze]),_:1}),(u(!0),y(b,null,k(h.value,(e,r)=>(u(),_(c,{key:r},{default:a(()=>[s("p",null,v(f(n).tags.find(o=>o._id===e).title)+":",1),s("div",je,[(u(!0),y(b,null,k(f(n).tags.find(o=>o._id===e).images,(o,I)=>(u(),y("img",{key:I,class:"col-4",src:`/images/${o}`,alt:"",onClick:K=>P(o)},null,8,Ie))),128))]),t(C)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue"]),t(V,{modelValue:B.value,"onUpdate:modelValue":l[21]||(l[21]=e=>B.value=e),maximized:!0},{default:a(()=>[s("img",{src:`images/${J.value}`,style:{width:"100%"},alt:""},null,8,Te)]),_:1},8,["modelValue"])],64))}};export{De as default};
