(()=>{var t={593:t=>{t.exports={createNanoEvents:()=>({events:{},emit(t,...e){for(let n of this.events[t]||[])n(...e)},on(t,e){return(this.events[t]=this.events[t]||[]).push(e),()=>this.events[t]=this.events[t].filter((t=>t!==e))}})}},478:(t,e,n)=>{"use strict";var{createNanoEvents:i}=n(593);t.exports=i()},225:t=>{"use strict";t.exports={getRandomBetween:function(t,e){return Math.floor(Math.random()*(e-t)+t)}}},520:(t,e,n)=>{"use strict";var i=n(478),s=n(225);const o=document.querySelector("main").clientHeight,r=document.querySelector("main").clientWidth,h="horizontal";var a=1,m=1;function d(t,e){return e===h?((t<=20||t>=r)&&(a=-a),t+a):((t<=20||t>=o)&&(m=-m),t+m)}function l(){this.me.style.top=d(parseInt(this.me.style.top,10),"vertical")+"px",this.me.style.left=d(parseInt(this.me.style.left,10),h)+"px",0===this.life?(this.unbindMove(),this.unbindFood(),this.me.className="food",i.emit("food",this.me.style.top,this.me.style.left)):this.life-=1}t.exports=function(t){this.me=document.createElement("div"),this.life=s.getRandomBetween(10,100),this.unbindMove=i.on("move",l.bind(this));var e=i.on("destroy",function(t){this.unbindFood(),this.unbindMove(),e(),document.querySelector("main").removeChild(this.me)}.bind(this));this.unbindFood=i.on("food",function(t,e){t!==this.me.style.top&&e!==this.me.style.left||(console.log(this.me.getAttribute("data-index"),"mangiato",this.life),this.life+=50)}.bind(this)),this.me.style.top=s.getRandomBetween(20,o)+"px",this.me.style.left=s.getRandomBetween(20,r)+"px",this.me.className="person",this.me.setAttribute("data-index",t),document.querySelector("main").appendChild(this.me)}},603:(t,e,n)=>{"use strict";var i=n(478),s=n(520);t.exports={init:function(){for(var t=0;t<200;t+=1)new s(t)}},setInterval((function(){i.emit("move")}),100)}},e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={exports:{}};return t[i](s,s.exports,n),s.exports}(()=>{"use strict";var t=n(603);document.addEventListener("DOMContentLoaded",(function(){t.init()}))})()})();
//# sourceMappingURL=population_7086fe32eb15cf6f34d6.js.map