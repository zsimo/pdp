(()=>{var e={478:(e,t,n)=>{"use strict";var{createNanoEvents:s}=n(972);e.exports=s()},346:(e,t,n)=>{"use strict";n(478),e.exports=function(e,t){t=!!t;var n=document.createElement("td");n.className="cell",t&&n.classList.add("alive"),n.setAttribute("data-index",e);const s=document.querySelector("table"),l=s.tBodies[0].rows;let o=l[l.length-1];if(!o){const e=document.createElement("tr");s.tBodies[0].appendChild(e),o=e}if(o.appendChild(n),n.offsetLeft>window.innerWidth-49){o.removeChild(n);const e=document.createElement("tr");s.tBodies[0].appendChild(e)}}},731:(e,t,n)=>{"use strict";n(478);var s=n(346);const l="alive";var o=[];function i(){let e=Date.now();const t=document.querySelector("main"),n=t.querySelectorAll(".cell"),s=document.createElement("table"),o=s.createTBody();let i;for(const e of n){let t=0;const n=[],s=e.parentElement.previousSibling,c=e.parentElement.nextSibling;s&&(n.push(s.cells[e.cellIndex-1]),n.push(s.cells[e.cellIndex]),n.push(s.cells[e.cellIndex+1])),n.push(e.previousSibling),n.push(e.nextSibling),c&&(n.push(c.cells[e.cellIndex-1]),n.push(c.cells[e.cellIndex]),n.push(c.cells[e.cellIndex+1]));for(const e of n)e&&e.classList.contains(l)&&(t+=1);const r=e.cloneNode(!0);t<2||t>3?r.classList.remove("alive"):3===t&&r.classList.add("alive"),o.rows[e.parentElement.rowIndex]||(i=o.insertRow(-1)),i.appendChild(r)}t.replaceChildren(s),console.log(Date.now()-e)}e.exports={init:function(){const e=document.querySelector("table"),t=document.querySelector("header");let n=e.offsetHeight+t.getBoundingClientRect().height+10,i=1;for(;n<=window.innerHeight;)new s(i,-1!==o.indexOf(i)),i+=1,n=e.offsetHeight+t.getBoundingClientRect().height+10;const c=e.tBodies[0].rows;e.tBodies[0].removeChild(c[c.length-1]),e.addEventListener("click",(function(e){e.target.classList.toggle(l)}))}},document.querySelector("button").addEventListener("click",(function(){setInterval(i,100)}))},972:e=>{e.exports={createNanoEvents:()=>({events:{},emit(e,...t){(this.events[e]||[]).forEach((e=>e(...t)))},on(e,t){return(this.events[e]=this.events[e]||[]).push(t),()=>this.events[e]=(this.events[e]||[]).filter((e=>e!==t))}})}}},t={};function n(s){var l=t[s];if(void 0!==l)return l.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{"use strict";n(731).init()})()})();
//# sourceMappingURL=life_43565d5e0abc552e9c44.js.map