import{u as Y,a as _,r as n,o as z,b as w,c as k,d as x,F as M,e as G,f as a,Q as u,w as c,g as J,h as P,i as W,j as D,k as Z,l as C,m as X,M as H,n as K}from"./index.a6cee7ff.js";const ee={class:"fixed-bottom q-gutter-md"},te={class:"flex row no-wrap q-gutter-x-xs",style:{height:"60px",overflow:"scroll"}},oe=["src","onClick"],ae={class:"q-pa-md bg-black flex row justify-center q-gutter-x-lg"},ie={__name:"AddTagView",setup(ne){const Q=Y(),h=_(),$="pk.eyJ1IjoidG9iaXdhbmtpcm5vYmkiLCJhIjoiY2xlNXBuc2g1MGY4YzNxcWkxcWNtZ3N2ZCJ9.qWMZQd_uuqNnTDb9QcBtiQ",v=n(),q=n(),y=n(),m=n(!1),p=n(""),f=n(""),s=n(0),l=n(0),i=[];let r;const g=n([]),b=[];let V;async function N(){V.grabFrame().then(async o=>{console.log("Grabed Frame:",o);const e=new OffscreenCanvas(o.width,o.height);e.getContext("bitmaprenderer").transferFromImageBitmap(o);const d=await e.convertToBlob();g.value.push(URL.createObjectURL(d)),b.push(d),console.log(b)}).catch(o=>{console.error("grabFrame() error: ",o)})}navigator.mediaDevices.enumerateDevices().then(I);const T=()=>{console.log(r),window.stream&&window.stream.getTracks().forEach(e=>{e.stop()});const o={video:{deviceId:r?{exact:r}:void 0}};navigator.mediaDevices.getUserMedia(o).then(e=>{y.value.srcObject=e;const t=e.getVideoTracks()[0];V=new ImageCapture(t)}).then(I).catch(U)};function I(o){for(let e=0;e!==o.length;++e){const t=o[e];t.kind==="videoinput"?i.push(t.deviceId):console.log("Some other kind of source/device: ",t),console.log(i)}}function U(o){console.debug("navigator.MediaDevices.getUserMedia error: ",o.message,o.name)}const j=()=>{const o=i.findIndex(e=>e===r);i[o+1]!==void 0?r=i[o+1]:r=i[0],T()},F=o=>{const e=g.value.findIndex(t=>t===o);g.value.splice(e,1),b.splice(e,1)},B=async()=>{m.value=!0},E=o=>{s.value=o.coords.longitude,l.value=o.coords.latitude,console.log(l.value),console.log(v.value),v.value.panTo([s.value,l.value])};function L(o){console.warn(`ERROR(${o.code}): ${o.message}`),s.value=0,l.value=0}const R=async()=>{await navigator.geolocation.getCurrentPosition(E,L),v.value.flyTo({center:[s.value,l.value],essential:!0})},S=o=>{const{lng:e,lat:t}=o.target.getLngLat();s.value=e,l.value=t},A=()=>{p.value="",f.value="",m.value=!1},O=async()=>{const o=[];(await h.uploadAddedImages(b)).forEach(d=>o.push(d.filename));const t={title:p.value,description:f.value,coords:{longitude:s.value,latitude:l.value},images:o};await h.createTag(t),Q.push("/")};return z(async()=>{T()}),(o,e)=>(w(),k(M,null,[x("video",{ref_key:"camera",ref:y,autoplay:"",style:{width:"100%"}},null,512),x("div",ee,[x("div",te,[(w(!0),k(M,null,G(g.value,(t,d)=>(w(),k("img",{key:d,src:t,alt:"",style:{postition:"absolute","z-index":"1"},onClick:le=>F(t)},null,8,oe))),128))]),x("div",ae,[a(u,{class:"text-white",icon:"autorenew",dense:"",flat:"",onClick:e[0]||(e[0]=t=>j())}),a(u,{class:"text-white",icon:"radio_button_unchecked",dense:"",flat:"",onClick:e[1]||(e[1]=t=>N())}),a(u,{class:"text-white",icon:"done",dense:"",flat:"",onClick:e[2]||(e[2]=t=>B()),disable:g.value.length===0},null,8,["disable"])])]),a(J,{modelValue:m.value,"onUpdate:modelValue":e[11]||(e[11]=t=>m.value=t),persistent:"","transition-show":"slide-up","transition-hide":"slide-down"},{default:c(()=>[a(P,null,{default:c(()=>[a(W,null,{default:c(()=>[a(D,{standout:"bg-primary text-white",modelValue:p.value,"onUpdate:modelValue":e[3]||(e[3]=t=>p.value=t),label:"Title"},null,8,["modelValue"]),a(D,{standout:"bg-primary text-white",modelValue:f.value,"onUpdate:modelValue":e[4]||(e[4]=t=>f.value=t),label:"description"},null,8,["modelValue"]),a(u,{onClick:e[5]||(e[5]=t=>R())},{default:c(()=>[Z("Use Current postotion")]),_:1}),a(C(H),{style:{height:"100px"},"access-token":C($),"map-style":"mapbox://styles/tobiwankirnobi/cle5t3xjp001b01o4s7negt5k",center:[0,0],zoom:10,onMbCreated:e[8]||(e[8]=t=>v.value=t)},{default:c(()=>[a(C(K),{"lng-lat":[s.value,l.value],draggable:"",onMbDragend:e[6]||(e[6]=t=>S(t)),onMbCreated:e[7]||(e[7]=t=>q.value=t)},null,8,["lng-lat"])]),_:1},8,["access-token"])]),_:1}),a(X,{align:"center"},{default:c(()=>[a(u,{class:"bg-primary text-white",square:"",rouded:"",icon:"close",onClick:e[9]||(e[9]=t=>A())}),a(u,{class:"bg-primary text-white",square:"",rouded:"",icon:"done",onClick:e[10]||(e[10]=t=>O())})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{ie as default};
