(()=>{var t={593:t=>{t.exports={createNanoEvents:()=>({events:{},emit(t,...e){for(let n of this.events[t]||[])n(...e)},on(t,e){return(this.events[t]=this.events[t]||[]).push(e),()=>this.events[t]=this.events[t].filter((t=>t!==e))}})}},478:(t,e,n)=>{"use strict";var{createNanoEvents:r}=n(593);t.exports=r()},225:t=>{"use strict";t.exports={getRandomBetween:function(t,e){return Math.floor(Math.random()*e+t)}}},520:(t,e,n)=>{"use strict";var r=n(478),o=n(225);const s=document.body.clientHeight,i=document.body.clientWidth,a="horizontal";var c=1,u=1;function l(t,e){return e===a?((t<=0||t>=i)&&(c=-c),t+c):((t<=0||t>=s)&&(u=-u),t+u)}t.exports=function(t){var e=document.createElement("div"),n=r.on("move",(function(){!function(t){t.style.top=l(parseInt(t.style.top,10),"vertical")+"px",t.style.left=l(parseInt(t.style.left,10),a)+"px"}(e)})),c=r.on("destroy",(function(t){n(),c(),document.querySelector("main").removeChild(e)}));e.style.top=o.getRandomBetween(0,s)+"px",e.style.left=o.getRandomBetween(0,i)+"px",e.className="person",e.setAttribute("data-index",t),document.querySelector("main").appendChild(e)}},603:(t,e,n)=>{"use strict";var r=n(478),o=n(520);t.exports={init:function(){for(var t=0;t<1;t+=1)new o(t)}},setInterval((function(){r.emit("move")}),10)}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}(()=>{"use strict";n(603).init()})()})();