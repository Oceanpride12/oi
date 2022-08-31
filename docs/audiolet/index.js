(()=>{"use strict";class e extends AudioWorkletProcessor{initialized=!1;playBuffer=[];deltaChunkSize=24;bufferSize=1024;constructor(){super(),this.initialized=!0,this.port.onmessage=this.handleMessage.bind(this)}prevF32Data=null;handleMessage(e){if(e.data.deltaSize)return void(this.deltaChunkSize=e.data.deltaSize);const t=e.data.data,l=new Int16Array(t),n=new Float32Array(l.length);l.forEach(((e,t)=>{const l=e>=32768?-(65536-e)/32768:e/32767;n[t]=l}));let s=this.prevF32Data?this.prevF32Data.slice(this.prevF32Data.length-this.deltaChunkSize*this.bufferSize/2):null;const h=n.slice(n.length-this.deltaChunkSize*this.bufferSize*2/2,n.length-this.deltaChunkSize*this.bufferSize/2);if(s?.length!==h.length&&(s=null),s)for(let e=0;e<s.length;e++){let t=0;if(e<s.length/3)t=0;else if(e>s.length/3*2)t=1;else{const l=e-s.length/3;t=Math.min(l/(s.length/3),1)}const l=s[e]*(1-t),n=h[e]*t;h[e]=l+n}if(this.playBuffer.length>50)for(console.log("Buffer truncated");this.playBuffer.length>2;)this.playBuffer.shift();let i;for(let e=0;e<h.length;e++){const t=2*e%128;0===t&&(i=new Float32Array(128));const l=h[e],n=e+1<h.length?h[e+1]:h[e];i[t]=l,i[t+1]=(l+n)/2,i.length===t+2&&this.playBuffer.push(i)}this.prevF32Data=n}handleMessage_(e){const t=e.data.data,l=new Int16Array(t),n=new Float32Array(l.length);l.forEach(((e,t)=>{const l=e>=32768?-(65536-e)/32768:e/32767;n[t]=l}));let s=this.prevF32Data?this.prevF32Data.slice(this.prevF32Data.length/2):null;const h=n.slice(0,n.length/2);if(s?.length!==h.length&&(s=null),s)for(let e=0;e<s.length;e++){let t=0;if(e<s.length/3)t=0;else if(e>s.length/3*2)t=1;else{const l=e-s.length/3;t=Math.min(l/(s.length/100),1)}const l=s[e]*(1-t),n=h[e]*t;h[e]=l+n}if(this.playBuffer.length>100)for(console.log("Buffer truncated");this.playBuffer.length>2;)this.playBuffer.shift();let i;for(let e=0;e<h.length;e++){const t=2*e%128;0===t&&(i=new Float32Array(128));const l=h[e],n=e+1<h.length?h[e+1]:h[e];i[t]=l,i[t+1]=(l+n)/2,i.length===t+2&&this.playBuffer.push(i)}this.prevF32Data=n}process(e,t,l){if(!this.initialized)return console.log("worklet_process not ready"),!0;if(0===this.playBuffer.length)return console.log("no play buffer"),!0;const n=this.playBuffer.shift();return t[0][0].set(n),!0}}registerProcessor("voice-player-worklet-processor",e)})();