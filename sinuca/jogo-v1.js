(()=>{"use strict";let e,t,i,r,a,n,s,o,l,c,h,u,d,p,f,m="srgb",g="srgb-linear",v="linear",_="srgb";function y(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array;let x={};function M(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];console.log("THREE."+t.shift(),...t)}function S(e){let t=e[0];if("string"==typeof t&&t.startsWith("TSL:")){let t=e[1];t&&t.isStackTrace?e[0]+=" "+t.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function b(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let r="THREE."+(t=S(t)).shift();{let e=t[0];e&&e.isStackTrace?console.warn(e.getError(r)):console.warn(r,...t)}}function T(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let r="THREE."+(t=S(t)).shift();{let e=t[0];e&&e.isStackTrace?console.error(e.getError(r)):console.error(r,...t)}}function E(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let r=t.join(" ");r in x||(x[r]=!0,b(...t))}let w={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};let EventDispatcher=class EventDispatcher{addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let i=this._listeners;void 0===i[e]&&(i[e]=[]),-1===i[e].indexOf(t)&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return void 0!==i&&void 0!==i[e]&&-1!==i[e].indexOf(t)}removeEventListener(e,t){let i=this._listeners;if(void 0===i)return;let r=i[e];if(void 0!==r){let e=r.indexOf(t);-1!==e&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(void 0===t)return;let i=t[e.type];if(void 0!==i){e.target=this;let t=i.slice(0);for(let i=0,r=t.length;i<r;i++)t[i].call(this,e);e.target=null}}};let A=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],R=Math.PI/180,C=180/Math.PI;function P(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,i=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0;return(A[255&e]+A[e>>8&255]+A[e>>16&255]+A[e>>24&255]+"-"+A[255&t]+A[t>>8&255]+"-"+A[t>>16&15|64]+A[t>>24&255]+"-"+A[63&i|128]+A[i>>8&255]+"-"+A[i>>16&255]+A[i>>24&255]+A[255&r]+A[r>>8&255]+A[r>>16&255]+A[r>>24&255]).toLowerCase()}function L(e,t,i){return Math.max(t,Math.min(i,e))}function I(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/0xffffffff;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/0x7fffffff,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function N(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(0xffffffff*e);case Uint16Array:return Math.round(65535*e);case Uint8Array:case Uint8ClampedArray:return Math.round(255*e);case Int32Array:return Math.round(0x7fffffff*e);case Int16Array:return Math.round(32767*e);case Int8Array:return Math.round(127*e);default:throw Error("THREE.MathUtils: Invalid component type.")}}let Vector2=class Vector2{get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(L(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return 0===t?Math.PI/2:Math.acos(L(this.dot(e)/t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.x=e[t],this.y=e[t+1],this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,n=this.y-e.y;return this.x=a*i-n*r+e.x,this.y=a*r+n*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}constructor(e=0,t=0){this.x=e,this.y=t}};Vector2.prototype.isVector2=!0;let Quaternion=class Quaternion{static slerpFlat(e,t,i,r,a,n,s){let o=i[r+0],l=i[r+1],c=i[r+2],h=i[r+3],u=a[n+0],d=a[n+1],p=a[n+2],f=a[n+3];if(h!==f||o!==u||l!==d||c!==p){let e=o*u+l*d+c*p+h*f;e<0&&(u=-u,d=-d,p=-p,f=-f,e=-e);let t=1-s;if(e<.9995){let i=Math.acos(e),r=Math.sin(i);o=o*(t=Math.sin(t*i)/r)+u*(s=Math.sin(s*i)/r),l=l*t+d*s,c=c*t+p*s,h=h*t+f*s}else{let e=1/Math.sqrt((o=o*t+u*s)*o+(l=l*t+d*s)*l+(c=c*t+p*s)*c+(h=h*t+f*s)*h);o*=e,l*=e,c*=e,h*=e}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,a,n){let s=i[r],o=i[r+1],l=i[r+2],c=i[r+3],h=a[n],u=a[n+1],d=a[n+2],p=a[n+3];return e[t]=s*p+c*h+o*d-l*u,e[t+1]=o*p+c*u+l*h-s*d,e[t+2]=l*p+c*d+s*u-o*h,e[t+3]=c*p-s*h-o*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=e._x,r=e._y,a=e._z,n=e._order,s=Math.cos,o=Math.sin,l=s(i/2),c=s(r/2),h=s(a/2),u=o(i/2),d=o(r/2),p=o(a/2);switch(n){case"XYZ":this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p;break;case"YXZ":this._x=u*c*h+l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p;break;case"ZXY":this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h-u*d*p;break;case"ZYX":this._x=u*c*h-l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h+u*d*p;break;case"YZX":this._x=u*c*h+l*d*p,this._y=l*d*h+u*c*p,this._z=l*c*p-u*d*h,this._w=l*c*h-u*d*p;break;case"XZY":this._x=u*c*h-l*d*p,this._y=l*d*h-u*c*p,this._z=l*c*p+u*d*h,this._w=l*c*h+u*d*p;break;default:b("Quaternion: .setFromEuler() encountered an unknown order: "+n)}return!0===t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],o=t[9],l=t[2],c=t[6],h=t[10],u=i+s+h;if(u>0){let e=.5/Math.sqrt(u+1);this._w=.25/e,this._x=(c-o)*e,this._y=(a-l)*e,this._z=(n-r)*e}else if(i>s&&i>h){let e=2*Math.sqrt(1+i-s-h);this._w=(c-o)/e,this._x=.25*e,this._y=(r+n)/e,this._z=(a+l)/e}else if(s>h){let e=2*Math.sqrt(1+s-i-h);this._w=(a-l)/e,this._x=(r+n)/e,this._y=.25*e,this._z=(o+c)/e}else{let e=2*Math.sqrt(1+h-i-s);this._w=(n-r)/e,this._x=(a+l)/e,this._y=(o+c)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0):(this._x=0,this._y=-e.z,this._z=e.y)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x),this._w=i,this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(L(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(0===i)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return 0===e?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=t._x,o=t._y,l=t._z,c=t._w;return this._x=i*c+n*s+r*l-a*o,this._y=r*c+n*o+a*s-i*l,this._z=a*c+n*l+i*o-r*s,this._w=n*c-i*s-r*o-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,n=-n,s=-s);let o=1-t;if(s<.9995){let e=Math.acos(s),l=Math.sin(e);o=Math.sin(o*e)/l,t=Math.sin(t*e)/l,this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+r*t,this._z=this._z*o+a*t,this._w=this._w*o+n*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}};let Vector3=class Vector3{set(e,t,i){return void 0===i&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(U.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(U.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=e.elements,n=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*n,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*n,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*n,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,a=e.x,n=e.y,s=e.z,o=e.w,l=2*(n*r-s*i),c=2*(s*t-a*r),h=2*(a*i-n*t);return this.x=t+o*l+n*h-s*c,this.y=i+o*c+s*l-a*h,this.z=r+o*h+a*c-n*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this.z=L(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this.z=L(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(L(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,a=e.z,n=t.x,s=t.y,o=t.z;return this.x=r*o-a*s,this.y=a*n-i*o,this.z=i*s-r*n,this}projectOnVector(e){let t=e.lengthSq();if(0===t)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return D.copy(this).projectOnVector(e),this.sub(D)}reflect(e){return this.sub(D.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return 0===t?Math.PI/2:Math.acos(L(this.dot(e)/t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}};Vector3.prototype.isVector3=!0;let D=new Vector3,U=new Quaternion;let Matrix3=class Matrix3{set(e,t,i,r,a,n,s,o,l){let c=this.elements;return c[0]=e,c[1]=r,c[2]=s,c[3]=t,c[4]=a,c[5]=o,c[6]=i,c[7]=n,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,n=i[0],s=i[3],o=i[6],l=i[1],c=i[4],h=i[7],u=i[2],d=i[5],p=i[8],f=r[0],m=r[3],g=r[6],v=r[1],_=r[4],y=r[7],x=r[2],M=r[5],S=r[8];return a[0]=n*f+s*v+o*x,a[3]=n*m+s*_+o*M,a[6]=n*g+s*y+o*S,a[1]=l*f+c*v+h*x,a[4]=l*m+c*_+h*M,a[7]=l*g+c*y+h*S,a[2]=u*f+d*v+p*x,a[5]=u*m+d*_+p*M,a[8]=u*g+d*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],n=e[4],s=e[5],o=e[6],l=e[7],c=e[8];return t*n*c-t*s*l-i*a*c+i*s*o+r*a*l-r*n*o}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],n=e[4],s=e[5],o=e[6],l=e[7],c=e[8],h=c*n-s*l,u=s*o-c*a,d=l*a-n*o,p=t*h+i*u+r*d;if(0===p)return this.set(0,0,0,0,0,0,0,0,0);let f=1/p;return e[0]=h*f,e[1]=(r*l-c*i)*f,e[2]=(s*i-r*n)*f,e[3]=u*f,e[4]=(c*t-r*o)*f,e[5]=(r*a-s*t)*f,e[6]=d*f,e[7]=(i*o-l*t)*f,e[8]=(n*t-i*a)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,n,s){let o=Math.cos(a),l=Math.sin(a);return this.set(i*o,i*l,-i*(o*n+l*s)+n+e,-r*l,r*o,-r*(-l*n+o*s)+s+t,0,0,1),this}scale(e,t){return E("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(O.makeScale(e,t)),this}rotate(e){return E("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(O.makeRotation(-e)),this}translate(e,t){return E("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(O.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let e=0;e<9;e++)if(t[e]!==i[e])return!1;return!0}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}constructor(e,t,i,r,a,n,s,o,l){this.elements=[1,0,0,0,1,0,0,0,1],void 0!==e&&this.set(e,t,i,r,a,n,s,o,l)}};Matrix3.prototype.isMatrix3=!0;let O=new Matrix3,F=(new Matrix3).set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),B=(new Matrix3).set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715),V=(d=[.64,.33,.3,.6,.15,.06],p=[.2126,.7152,.0722],f=[.3127,.329],(u={enabled:!0,workingColorSpace:g,spaces:{},convert:function(e,t,i){return!1!==this.enabled&&t!==i&&t&&i&&(this.spaces[t].transfer===_&&(e.r=k(e.r),e.g=k(e.g),e.b=k(e.b)),this.spaces[t].primaries!==this.spaces[i].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[i].fromXYZ)),this.spaces[i].transfer===_&&(e.r=G(e.r),e.g=G(e.g),e.b=G(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return""===e?v:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.workingColorSpace;return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,i){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[i].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.workingColorSpace;return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(e,t){return E("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),u.workingToColorSpace(e,t)},toWorkingColorSpace:function(e,t){return E("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),u.colorSpaceToWorking(e,t)}}).define({[g]:{primaries:d,whitePoint:f,transfer:v,toXYZ:F,fromXYZ:B,luminanceCoefficients:p,workingColorSpaceConfig:{unpackColorSpace:m},outputColorSpaceConfig:{drawingBufferColorSpace:m}},[m]:{primaries:d,whitePoint:f,transfer:_,toXYZ:F,fromXYZ:B,luminanceCoefficients:p,outputColorSpaceConfig:{drawingBufferColorSpace:m}}}),u);function k(e){return e<.04045?.0773993808*e:Math.pow(.9478672986*e+.0521327014,2.4)}function G(e){return e<.0031308?12.92*e:1.055*Math.pow(e,.41666)-.055}let ImageUtils=class ImageUtils{static getDataURL(t){let i,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image/png";if(/^data:/i.test(t.src)||"u"<typeof HTMLCanvasElement)return t.src;if(t instanceof HTMLCanvasElement)i=t;else{void 0===e&&(e=y("canvas")),e.width=t.width,e.height=t.height;let r=e.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=e}return i.toDataURL(r)}static sRGBToLinear(e){if("u">typeof HTMLImageElement&&e instanceof HTMLImageElement||"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"u">typeof ImageBitmap&&e instanceof ImageBitmap){let t=y("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let e=0;e<a.length;e++)a[e]=255*k(a[e]/255);return i.putImageData(r,0,0),t}if(!e.data)return b("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e;{let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(255*k(t[e]/255)):t[e]=k(t[e]);return{data:t,width:e.width,height:e.height}}}};let z=0;let TextureSource=class TextureSource{getSize(e){let t=this.data;return"u">typeof HTMLVideoElement&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):"u">typeof VideoFrame&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):null!==t?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){!0===e&&this.version++}toJSON(e){let t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.images[this.uuid])return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(null!==r){let e;if(Array.isArray(r)){e=[];for(let t=0,i=r.length;t<i;t++)r[t].isDataTexture?e.push(H(r[t].image)):e.push(H(r[t]))}else e=H(r);i.url=e}return t||(e.images[this.uuid]=i),i}constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:z++}),this.uuid=P(),this.data=e,this.dataReady=!0,this.version=0}};function H(e){return"u">typeof HTMLImageElement&&e instanceof HTMLImageElement||"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"u">typeof ImageBitmap&&e instanceof ImageBitmap?ImageUtils.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(b("Texture: Unable to serialize Texture."),{})}let W=0,X=new Vector3;let Texture=class Texture extends EventDispatcher{get width(){return this.source.getSize(X).x}get height(){return this.source.getSize(X).y}get depth(){return this.source.getSize(X).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(void 0===i){b("Texture.setValues(): parameter '".concat(t,"' has value of undefined."));continue}let r=this[t];if(void 0===r){b("Texture.setValues(): property '".concat(t,"' does not exist."));continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=void 0===e||"string"==typeof e;if(!t&&void 0!==e.textures[this.uuid])return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(300!==this.mapping)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:1===Math.abs(Math.floor(e.x)%2)?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:1===Math.abs(Math.floor(e.y)%2)?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){!0===e&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){!0===e&&this.pmremVersion++}constructor(e=Texture.DEFAULT_IMAGE,t=Texture.DEFAULT_MAPPING,i=1001,r=1001,a=1006,n=1008,s=1023,o=1009,l=Texture.DEFAULT_ANISOTROPY,c=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:W++}),this.uuid=P(),this.name="",this.source=new TextureSource(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=n,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=o,this.offset=new Vector2(0,0),this.repeat=new Vector2(1,1),this.center=new Vector2(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Matrix3,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!e&&!!e.depth&&e.depth>1,this.pmremVersion=0,this.normalized=!1}};Texture.DEFAULT_IMAGE=null,Texture.DEFAULT_MAPPING=300,Texture.DEFAULT_ANISOTROPY=1;let Vector4=class Vector4{get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=void 0!==e.w?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=this.w,n=e.elements;return this.x=n[0]*t+n[4]*i+n[8]*r+n[12]*a,this.y=n[1]*t+n[5]*i+n[9]*r+n[13]*a,this.z=n[2]*t+n[6]*i+n[10]*r+n[14]*a,this.w=n[3]*t+n[7]*i+n[11]*r+n[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a,n=e.elements,s=n[0],o=n[4],l=n[8],c=n[1],h=n[5],u=n[9],d=n[2],p=n[6],f=n[10];if(.01>Math.abs(o-c)&&.01>Math.abs(l-d)&&.01>Math.abs(u-p)){if(.1>Math.abs(o+c)&&.1>Math.abs(l+d)&&.1>Math.abs(u+p)&&.1>Math.abs(s+h+f-3))return this.set(1,0,0,0),this;t=Math.PI;let e=(s+1)/2,n=(h+1)/2,m=(f+1)/2,g=(o+c)/4,v=(l+d)/4,_=(u+p)/4;return e>n&&e>m?e<.01?(i=0,r=.707106781,a=.707106781):(r=g/(i=Math.sqrt(e)),a=v/i):n>m?n<.01?(i=.707106781,r=0,a=.707106781):(i=g/(r=Math.sqrt(n)),a=_/r):m<.01?(i=.707106781,r=.707106781,a=0):(i=v/(a=Math.sqrt(m)),r=_/a),this.set(i,r,a,t),this}let m=Math.sqrt((p-u)*(p-u)+(l-d)*(l-d)+(c-o)*(c-o));return .001>Math.abs(m)&&(m=1),this.x=(p-u)/m,this.y=(l-d)/m,this.z=(c-o)/m,this.w=Math.acos((s+h+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this.z=L(this.z,e.z,t.z),this.w=L(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this.z=L(this.z,e,t),this.w=L(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(L(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}};Vector4.prototype.isVector4=!0;let RenderTarget=class RenderTarget extends EventDispatcher{_setTextureOptions(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};void 0!==e.mapping&&(t.mapping=e.mapping),void 0!==e.wrapS&&(t.wrapS=e.wrapS),void 0!==e.wrapT&&(t.wrapT=e.wrapT),void 0!==e.wrapR&&(t.wrapR=e.wrapR),void 0!==e.magFilter&&(t.magFilter=e.magFilter),void 0!==e.minFilter&&(t.minFilter=e.minFilter),void 0!==e.format&&(t.format=e.format),void 0!==e.type&&(t.type=e.type),void 0!==e.anisotropy&&(t.anisotropy=e.anisotropy),void 0!==e.colorSpace&&(t.colorSpace=e.colorSpace),void 0!==e.flipY&&(t.flipY=e.flipY),void 0!==e.generateMipmaps&&(t.generateMipmaps=e.generateMipmaps),void 0!==e.internalFormat&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){null!==this._depthTexture&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),null!==e&&null===e.renderTarget&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,!0!==this.textures[r].isData3DTexture&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new TextureSource(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,null!==e.depthTexture)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Vector4(0,0,e,t),this.scissorTest=!1,this.viewport=new Vector4(0,0,e,t),this.textures=[];let r=new Texture({width:e,height:t,depth:i.depth}),a=i.count;for(let e=0;e<a;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}};let WebGLRenderTarget=class WebGLRenderTarget extends RenderTarget{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}};let DataArrayTexture=class DataArrayTexture extends Texture{copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}};let Data3DTexture=class Data3DTexture extends Texture{copy(e){return super.copy(e),this.wrapR=e.wrapR,this}constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};let Matrix4=class Matrix4{set(e,t,i,r,a,n,s,o,l,c,h,u,d,p,f,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=a,g[5]=n,g[9]=s,g[13]=o,g[2]=l,g[6]=c,g[10]=h,g[14]=u,g[3]=d,g[7]=p,g[11]=f,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Matrix4().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return 0===this.determinantAffine()?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1)):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2)),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(0===e.determinantAffine())return this.identity();let t=this.elements,i=e.elements,r=1/j.setFromMatrixColumn(e,0).length(),a=1/j.setFromMatrixColumn(e,1).length(),n=1/j.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*n,t[9]=i[9]*n,t[10]=i[10]*n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,a=e.z,n=Math.cos(i),s=Math.sin(i),o=Math.cos(r),l=Math.sin(r),c=Math.cos(a),h=Math.sin(a);if("XYZ"===e.order){let e=n*c,i=n*h,r=s*c,a=s*h;t[0]=o*c,t[4]=-o*h,t[8]=l,t[1]=i+r*l,t[5]=e-a*l,t[9]=-s*o,t[2]=a-e*l,t[6]=r+i*l,t[10]=n*o}else if("YXZ"===e.order){let e=o*c,i=o*h,r=l*c,a=l*h;t[0]=e+a*s,t[4]=r*s-i,t[8]=n*l,t[1]=n*h,t[5]=n*c,t[9]=-s,t[2]=i*s-r,t[6]=a+e*s,t[10]=n*o}else if("ZXY"===e.order){let e=o*c,i=o*h,r=l*c,a=l*h;t[0]=e-a*s,t[4]=-n*h,t[8]=r+i*s,t[1]=i+r*s,t[5]=n*c,t[9]=a-e*s,t[2]=-n*l,t[6]=s,t[10]=n*o}else if("ZYX"===e.order){let e=n*c,i=n*h,r=s*c,a=s*h;t[0]=o*c,t[4]=r*l-i,t[8]=e*l+a,t[1]=o*h,t[5]=a*l+e,t[9]=i*l-r,t[2]=-l,t[6]=s*o,t[10]=n*o}else if("YZX"===e.order){let e=n*o,i=n*l,r=s*o,a=s*l;t[0]=o*c,t[4]=a-e*h,t[8]=r*h+i,t[1]=h,t[5]=n*c,t[9]=-s*c,t[2]=-l*c,t[6]=i*h+r,t[10]=e-a*h}else if("XZY"===e.order){let e=n*o,i=n*l,r=s*o,a=s*l;t[0]=o*c,t[4]=-h,t[8]=l*c,t[1]=e*h+a,t[5]=n*c,t[9]=i*h-r,t[2]=r*h-i,t[6]=s*c,t[10]=a*h+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Y,e,K)}lookAt(e,t,i){let r=this.elements;return Q.subVectors(e,t),0===Q.lengthSq()&&(Q.z=1),Q.normalize(),J.crossVectors(i,Q),0===J.lengthSq()&&(1===Math.abs(i.z)?Q.x+=1e-4:Q.z+=1e-4,Q.normalize(),J.crossVectors(i,Q)),J.normalize(),Z.crossVectors(Q,J),r[0]=J.x,r[4]=Z.x,r[8]=Q.x,r[1]=J.y,r[5]=Z.y,r[9]=Q.y,r[2]=J.z,r[6]=Z.z,r[10]=Q.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,n=i[0],s=i[4],o=i[8],l=i[12],c=i[1],h=i[5],u=i[9],d=i[13],p=i[2],f=i[6],m=i[10],g=i[14],v=i[3],_=i[7],y=i[11],x=i[15],M=r[0],S=r[4],b=r[8],T=r[12],E=r[1],w=r[5],A=r[9],R=r[13],C=r[2],P=r[6],L=r[10],I=r[14],N=r[3],D=r[7],U=r[11],O=r[15];return a[0]=n*M+s*E+o*C+l*N,a[4]=n*S+s*w+o*P+l*D,a[8]=n*b+s*A+o*L+l*U,a[12]=n*T+s*R+o*I+l*O,a[1]=c*M+h*E+u*C+d*N,a[5]=c*S+h*w+u*P+d*D,a[9]=c*b+h*A+u*L+d*U,a[13]=c*T+h*R+u*I+d*O,a[2]=p*M+f*E+m*C+g*N,a[6]=p*S+f*w+m*P+g*D,a[10]=p*b+f*A+m*L+g*U,a[14]=p*T+f*R+m*I+g*O,a[3]=v*M+_*E+y*C+x*N,a[7]=v*S+_*w+y*P+x*D,a[11]=v*b+_*A+y*L+x*U,a[15]=v*T+_*R+y*I+x*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],n=e[1],s=e[5],o=e[9],l=e[13],c=e[2],h=e[6],u=e[10],d=e[14],p=e[3],f=e[7],m=e[11],g=e[15],v=o*d-l*u,_=s*d-l*h,y=s*u-o*h,x=n*d-l*c,M=n*u-o*c,S=n*h-s*c;return t*(f*v-m*_+g*y)-i*(p*v-m*x+g*M)+r*(p*_-f*x+g*S)-a*(p*y-f*M+m*S)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],n=e[5],s=e[9],o=e[2],l=e[6],c=e[10];return t*(n*c-s*l)-i*(a*c-s*o)+r*(a*l-n*o)}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],n=e[4],s=e[5],o=e[6],l=e[7],c=e[8],h=e[9],u=e[10],d=e[11],p=e[12],f=e[13],m=e[14],g=e[15],v=t*s-i*n,_=t*o-r*n,y=t*l-a*n,x=i*o-r*s,M=i*l-a*s,S=r*l-a*o,b=c*f-h*p,T=c*m-u*p,E=c*g-d*p,w=h*m-u*f,A=h*g-d*f,R=u*g-d*m,C=v*R-_*A+y*w+x*E-M*T+S*b;if(0===C)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/C;return e[0]=(s*R-o*A+l*w)*P,e[1]=(r*A-i*R-a*w)*P,e[2]=(f*S-m*M+g*x)*P,e[3]=(u*M-h*S-d*x)*P,e[4]=(o*E-n*R-l*T)*P,e[5]=(t*R-r*E+a*T)*P,e[6]=(m*y-p*S-g*_)*P,e[7]=(c*S-u*y+d*_)*P,e[8]=(n*A-s*E+l*b)*P,e[9]=(i*E-t*A-a*b)*P,e[10]=(p*M-f*y+g*v)*P,e[11]=(h*y-c*M-d*v)*P,e[12]=(s*T-n*w-o*b)*P,e[13]=(t*w-i*T+r*b)*P,e[14]=(f*_-p*x-m*v)*P,e[15]=(c*x-h*_+u*v)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements;return Math.sqrt(Math.max(e[0]*e[0]+e[1]*e[1]+e[2]*e[2],e[4]*e[4]+e[5]*e[5]+e[6]*e[6],e[8]*e[8]+e[9]*e[9]+e[10]*e[10]))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),a=1-i,n=e.x,s=e.y,o=e.z,l=a*n,c=a*s;return this.set(l*n+i,l*s-r*o,l*o+r*s,0,l*s+r*o,c*s+i,c*o-r*n,0,l*o-r*s,c*o+r*n,a*o*o+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,n){return this.set(1,i,a,0,e,1,n,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,a=t._x,n=t._y,s=t._z,o=t._w,l=a+a,c=n+n,h=s+s,u=a*l,d=a*c,p=a*h,f=n*c,m=n*h,g=s*h,v=o*l,_=o*c,y=o*h,x=i.x,M=i.y,S=i.z;return r[0]=(1-(f+g))*x,r[1]=(d+y)*x,r[2]=(p-_)*x,r[3]=0,r[4]=(d-y)*M,r[5]=(1-(u+g))*M,r[6]=(m+v)*M,r[7]=0,r[8]=(p+_)*S,r[9]=(m-v)*S,r[10]=(1-(u+f))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let a=this.determinantAffine();if(0===a)return i.set(1,1,1),t.identity(),this;let n=j.set(r[0],r[1],r[2]).length(),s=j.set(r[4],r[5],r[6]).length(),o=j.set(r[8],r[9],r[10]).length();a<0&&(n=-n),q.copy(this);let l=1/n,c=1/s,h=1/o;return q.elements[0]*=l,q.elements[1]*=l,q.elements[2]*=l,q.elements[4]*=c,q.elements[5]*=c,q.elements[6]*=c,q.elements[8]*=h,q.elements[9]*=h,q.elements[10]*=h,t.setFromRotationMatrix(q),i.x=n,i.y=s,i.z=o,this}makePerspective(e,t,i,r,a,n){let s,o,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:2e3,c=arguments.length>7&&void 0!==arguments[7]&&arguments[7],h=this.elements;if(c)s=a/(n-a),o=n*a/(n-a);else if(2e3===l)s=-(n+a)/(n-a),o=-2*n*a/(n-a);else if(2001===l)s=-n/(n-a),o=-n*a/(n-a);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=2*a/(t-e),h[4]=0,h[8]=(t+e)/(t-e),h[12]=0,h[1]=0,h[5]=2*a/(i-r),h[9]=(i+r)/(i-r),h[13]=0,h[2]=0,h[6]=0,h[10]=s,h[14]=o,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,i,r,a,n){let s,o,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:2e3,c=arguments.length>7&&void 0!==arguments[7]&&arguments[7],h=this.elements;if(c)s=1/(n-a),o=n/(n-a);else if(2e3===l)s=-2/(n-a),o=-(n+a)/(n-a);else if(2001===l)s=-1/(n-a),o=-a/(n-a);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2/(t-e),h[4]=0,h[8]=0,h[12]=-(t+e)/(t-e),h[1]=0,h[5]=2/(i-r),h[9]=0,h[13]=-(i+r)/(i-r),h[2]=0,h[6]=0,h[10]=s,h[14]=o,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let e=0;e<16;e++)if(t[e]!==i[e])return!1;return!0}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}constructor(e,t,i,r,a,n,s,o,l,c,h,u,d,p,f,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],void 0!==e&&this.set(e,t,i,r,a,n,s,o,l,c,h,u,d,p,f,m)}};Matrix4.prototype.isMatrix4=!0;let j=new Vector3,q=new Matrix4,Y=new Vector3(0,0,0),K=new Vector3(1,1,1),J=new Vector3,Z=new Vector3,Q=new Vector3,$=new Matrix4,ee=new Quaternion;let Euler=class Euler{get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this._order;return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._order,i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=e.elements,a=r[0],n=r[4],s=r[8],o=r[1],l=r[5],c=r[9],h=r[2],u=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(L(s,-1,1)),.9999999>Math.abs(s)?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-n,a)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-L(c,-1,1)),.9999999>Math.abs(c)?(this._y=Math.atan2(s,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(L(u,-1,1)),.9999999>Math.abs(u)?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-n,l)):(this._y=0,this._z=Math.atan2(o,a));break;case"ZYX":this._y=Math.asin(-L(h,-1,1)),.9999999>Math.abs(h)?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,a)):(this._x=0,this._z=Math.atan2(-n,l));break;case"YZX":this._z=Math.asin(L(o,-1,1)),.9999999>Math.abs(o)?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(s,d));break;case"XZY":this._z=Math.asin(-L(n,-1,1)),.9999999>Math.abs(n)?(this._x=Math.atan2(u,l),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-c,d),this._y=0);break;default:b("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,!0===i&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return $.makeRotationFromQuaternion(e),this.setFromRotationMatrix($,t,i)}setFromVector3(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._order;return this.set(e.x,e.y,e.z,t)}reorder(e){return ee.setFromEuler(this),this.setFromQuaternion(ee,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],void 0!==e[3]&&(this._order=e[3]),this._onChangeCallback(),this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}constructor(e=0,t=0,i=0,r=Euler.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}};Euler.DEFAULT_ORDER="XYZ";let Layers=class Layers{set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&1<<e)!=0}constructor(){this.mask=1}};let et=0,ei=new Vector3,er=new Quaternion,ea=new Matrix4,en=new Vector3,es=new Vector3,eo=new Vector3,el=new Quaternion,ec=new Vector3(1,0,0),eh=new Vector3(0,1,0),eu=new Vector3(0,0,1),ed={type:"added"},ep={type:"removed"},ef={type:"childadded",child:null},em={type:"childremoved",child:null};let Object3D=class Object3D extends EventDispatcher{onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return er.setFromAxisAngle(e,t),this.quaternion.multiply(er),this}rotateOnWorldAxis(e,t){return er.setFromAxisAngle(e,t),this.quaternion.premultiply(er),this}rotateX(e){return this.rotateOnAxis(ec,e)}rotateY(e){return this.rotateOnAxis(eh,e)}rotateZ(e){return this.rotateOnAxis(eu,e)}translateOnAxis(e,t){return ei.copy(e).applyQuaternion(this.quaternion),this.position.add(ei.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ec,e)}translateY(e){return this.translateOnAxis(eh,e)}translateZ(e){return this.translateOnAxis(eu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ea.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?en.copy(e):en.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ea.lookAt(es,en,this.up):ea.lookAt(en,es,this.up),this.quaternion.setFromRotationMatrix(ea),r&&(ea.extractRotation(r.matrixWorld),er.setFromRotationMatrix(ea),this.quaternion.premultiply(er.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?T("Object3D.add: object can't be added as a child of itself.",e):e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),ef.child=e,this.dispatchEvent(ef),ef.child=null):T("Object3D.add: object not an instance of THREE.Object3D.",e),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return -1!==t&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ep),em.child=e,this.dispatchEvent(em),em.child=null),this}removeFromParent(){let e=this.parent;return null!==e&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ea.copy(this.matrixWorld).invert(),null!==e.parent&&(e.parent.updateWorldMatrix(!0,!1),ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),ef.child=e,this.dispatchEvent(ef),ef.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let r=this.children[i].getObjectByProperty(e,t);if(void 0!==r)return r}}getObjectsByProperty(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];this[e]===t&&i.push(this);let r=this.children;for(let a=0,n=r.length;a<n;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,eo),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,el,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(!1===this.visible)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;null!==t&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(null!==e){let t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.parent;if(!0===e&&null!==r&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),!0===t){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=void 0===e||"string"==typeof e,i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function a(t,i){return void 0===t[i.uuid]&&(t[i.uuid]=i.toJSON(e)),i.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),null!==this.pivot&&(r.pivot=this.pivot.toArray()),void 0!==this.morphTargetDictionary&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),void 0!==this.morphTargetInfluences&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),null!==this._colorsTexture&&(r.colorsTexture=this._colorsTexture.toJSON(e)),null!==this.boundingSphere&&(r.boundingSphere=this.boundingSphere.toJSON()),null!==this.boundingBox&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&!0!==this.environment.isRenderTargetTexture&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let t=this.geometry.parameters;if(void 0!==t&&void 0!==t.shapes){let i=t.shapes;if(Array.isArray(i))for(let t=0,r=i.length;t<r;t++){let r=i[t];a(e.shapes,r)}else a(e.shapes,i)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),void 0!==this.material)if(Array.isArray(this.material)){let t=[];for(let i=0,r=this.material.length;i<r;i++)t.push(a(e.materials,this.material[i]));r.material=t}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let i=this.animations[t];r.animations.push(a(e.animations,i))}}if(t){let t=n(e.geometries),r=n(e.materials),a=n(e.textures),s=n(e.images),o=n(e.shapes),l=n(e.skeletons),c=n(e.animations),h=n(e.nodes);t.length>0&&(i.geometries=t),r.length>0&&(i.materials=r),a.length>0&&(i.textures=a),s.length>0&&(i.images=s),o.length>0&&(i.shapes=o),l.length>0&&(i.skeletons=l),c.length>0&&(i.animations=c),h.length>0&&(i.nodes=h)}return i.object=r,i;function n(e){let t=[];for(let i in e){let r=e[i];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=null!==e.pivot?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),!0===t)for(let t=0;t<e.children.length;t++){let i=e.children[t];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:et++}),this.uuid=P(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Object3D.DEFAULT_UP.clone();let e=new Vector3,t=new Euler,i=new Quaternion,r=new Vector3(1,1,1);t._onChange(function(){i.setFromEuler(t,!1)}),i._onChange(function(){t.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Matrix4},normalMatrix:{value:new Matrix3}}),this.matrix=new Matrix4,this.matrixWorld=new Matrix4,this.matrixAutoUpdate=Object3D.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Layers,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}};Object3D.DEFAULT_UP=new Vector3(0,1,0),Object3D.DEFAULT_MATRIX_AUTO_UPDATE=!0,Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;let Group=class Group extends Object3D{constructor(){super(),this.isGroup=!0,this.type="Group"}};let eg={type:"move"};let WebXRController=class WebXRController{getHandSpace(){return null===this._hand&&(this._hand=new Group,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return null===this._targetRay&&(this._targetRay=new Group,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Vector3,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Vector3),this._targetRay}getGripSpace(){return null===this._grip&&(this._grip=new Group,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Vector3,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Vector3,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return null!==this._targetRay&&this._targetRay.dispatchEvent(e),null!==this._grip&&this._grip.dispatchEvent(e),null!==this._hand&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),null!==this._targetRay&&(this._targetRay.visible=!1),null!==this._grip&&(this._grip.visible=!1),null!==this._hand&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,n=null,s=this._targetRay,o=this._grip,l=this._hand;if(e&&"visible-blurred"!==t.session.visibilityState){if(l&&e.hand){for(let r of(n=!0,e.hand.values())){let e=t.getJointPose(r,i),a=this._getHandJoint(l,r);null!==e&&(a.matrix.fromArray(e.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,a.jointRadius=e.radius),a.visible=null!==e}let r=l.joints["index-finger-tip"],a=l.joints["thumb-tip"],s=r.position.distanceTo(a.position);l.inputState.pinching&&s>.025?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&s<=.015&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else null!==o&&e.gripSpace&&null!==(a=t.getPose(e.gripSpace,i))&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this}));null!==s&&(null===(r=t.getPose(e.targetRaySpace,i))&&null!==a&&(r=a),null!==r&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(eg)))}return null!==s&&(s.visible=null!==r),null!==o&&(o.visible=null!==a),null!==l&&(l.visible=null!==n),this}_getHandJoint(e,t){if(void 0===e.joints[t.jointName]){let i=new Group;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}constructor(){this._targetRay=null,this._grip=null,this._hand=null}};let ev={aliceblue:0xf0f8ff,antiquewhite:0xfaebd7,aqua:65535,aquamarine:8388564,azure:0xf0ffff,beige:0xf5f5dc,bisque:0xffe4c4,black:0,blanchedalmond:0xffebcd,blue:255,blueviolet:9055202,brown:0xa52a2a,burlywood:0xdeb887,cadetblue:6266528,chartreuse:8388352,chocolate:0xd2691e,coral:0xff7f50,cornflowerblue:6591981,cornsilk:0xfff8dc,crimson:0xdc143c,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:0xb8860b,darkgray:0xa9a9a9,darkgreen:25600,darkgrey:0xa9a9a9,darkkhaki:0xbdb76b,darkmagenta:9109643,darkolivegreen:5597999,darkorange:0xff8c00,darkorchid:0x9932cc,darkred:9109504,darksalmon:0xe9967a,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:0xff1493,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:0xb22222,floralwhite:0xfffaf0,forestgreen:2263842,fuchsia:0xff00ff,gainsboro:0xdcdcdc,ghostwhite:0xf8f8ff,gold:0xffd700,goldenrod:0xdaa520,gray:8421504,green:32768,greenyellow:0xadff2f,grey:8421504,honeydew:0xf0fff0,hotpink:0xff69b4,indianred:0xcd5c5c,indigo:4915330,ivory:0xfffff0,khaki:0xf0e68c,lavender:0xe6e6fa,lavenderblush:0xfff0f5,lawngreen:8190976,lemonchiffon:0xfffacd,lightblue:0xadd8e6,lightcoral:0xf08080,lightcyan:0xe0ffff,lightgoldenrodyellow:0xfafad2,lightgray:0xd3d3d3,lightgreen:9498256,lightgrey:0xd3d3d3,lightpink:0xffb6c1,lightsalmon:0xffa07a,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:0xb0c4de,lightyellow:0xffffe0,lime:65280,limegreen:3329330,linen:0xfaf0e6,magenta:0xff00ff,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:0xba55d3,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:0xc71585,midnightblue:1644912,mintcream:0xf5fffa,mistyrose:0xffe4e1,moccasin:0xffe4b5,navajowhite:0xffdead,navy:128,oldlace:0xfdf5e6,olive:8421376,olivedrab:7048739,orange:0xffa500,orangered:0xff4500,orchid:0xda70d6,palegoldenrod:0xeee8aa,palegreen:0x98fb98,paleturquoise:0xafeeee,palevioletred:0xdb7093,papayawhip:0xffefd5,peachpuff:0xffdab9,peru:0xcd853f,pink:0xffc0cb,plum:0xdda0dd,powderblue:0xb0e0e6,purple:8388736,rebeccapurple:6697881,red:0xff0000,rosybrown:0xbc8f8f,royalblue:4286945,saddlebrown:9127187,salmon:0xfa8072,sandybrown:0xf4a460,seagreen:3050327,seashell:0xfff5ee,sienna:0xa0522d,silver:0xc0c0c0,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:0xfffafa,springgreen:65407,steelblue:4620980,tan:0xd2b48c,teal:32896,thistle:0xd8bfd8,tomato:0xff6347,turquoise:4251856,violet:0xee82ee,wheat:0xf5deb3,white:0xffffff,whitesmoke:0xf5f5f5,yellow:0xffff00,yellowgreen:0x9acd32},e_={h:0,s:0,l:0},ey={h:0,s:0,l:0};function ex(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*6*(2/3-i):e}let Color=class Color{set(e,t,i){return void 0===t&&void 0===i?e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e):this.setRGB(e,t,i),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m;return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,V.colorSpaceToWorking(this,t),this}setRGB(e,t,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:V.workingColorSpace;return this.r=e,this.g=t,this.b=i,V.colorSpaceToWorking(this,r),this}setHSL(e,t,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:V.workingColorSpace;if(e=(e%1+1)%1,t=L(t,0,1),i=L(i,0,1),0===t)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ex(a,r,e+1/3),this.g=ex(a,r,e),this.b=ex(a,r,e-1/3)}return V.colorSpaceToWorking(this,r),this}setStyle(e){let t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m;function r(t){void 0!==t&&1>parseFloat(t)&&b("Color: Alpha component of "+e+" will be ignored.")}if(t=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,n=t[1],s=t[2];switch(n){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return r(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,i);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return r(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,i);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return r(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,i);break;default:b("Color: Unknown color model "+e)}}else if(t=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=t[1],a=r.length;if(3===a)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,i);if(6===a)return this.setHex(parseInt(r,16),i);b("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,i=ev[e.toLowerCase()];return void 0!==i?this.setHex(i,t):b("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=k(e.r),this.g=k(e.g),this.b=k(e.b),this}copyLinearToSRGB(e){return this.r=G(e.r),this.g=G(e.g),this.b=G(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;return V.workingToColorSpace(eM.copy(this),e),65536*Math.round(L(255*eM.r,0,255))+256*Math.round(L(255*eM.g,0,255))+Math.round(L(255*eM.b,0,255))}getHexString(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e){let t,i,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:V.workingColorSpace;V.workingToColorSpace(eM.copy(this),r);let a=eM.r,n=eM.g,s=eM.b,o=Math.max(a,n,s),l=Math.min(a,n,s),c=(l+o)/2;if(l===o)t=0,i=0;else{let e=o-l;switch(i=c<=.5?e/(o+l):e/(2-o-l),o){case a:t=(n-s)/e+6*(n<s);break;case n:t=(s-a)/e+2;break;case s:t=(a-n)/e+4}t/=6}return e.h=t,e.s=i,e.l=c,e}getRGB(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:V.workingColorSpace;return V.workingToColorSpace(eM.copy(this),t),e.r=eM.r,e.g=eM.g,e.b=eM.b,e}getStyle(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;V.workingToColorSpace(eM.copy(this),e);let t=eM.r,i=eM.g,r=eM.b;return e!==m?"color(".concat(e," ").concat(t.toFixed(3)," ").concat(i.toFixed(3)," ").concat(r.toFixed(3),")"):"rgb(".concat(Math.round(255*t),",").concat(Math.round(255*i),",").concat(Math.round(255*r),")")}offsetHSL(e,t,i){return this.getHSL(e_),this.setHSL(e_.h+e,e_.s+t,e_.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){var i,r,a,n,s,o,l,c,h;this.getHSL(e_),e.getHSL(ey);let u=(i=e_.h,r=ey.h,(1-(a=t))*i+a*r),d=(n=e_.s,s=ey.s,(1-(o=t))*n+o*s),p=(l=e_.l,c=ey.l,(1-(h=t))*l+h*c);return this.setHSL(u,d,p),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}};let eM=new Color;Color.NAMES=ev;let Scene=class Scene extends Object3D{copy(e,t){return super.copy(e,t),null!==e.background&&(this.background=e.background.clone()),null!==e.environment&&(this.environment=e.environment.clone()),null!==e.fog&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),null!==e.overrideMaterial&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return null!==this.fog&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Euler,this.environmentIntensity=1,this.environmentRotation=new Euler,this.overrideMaterial=null,"u">typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}};let eS=new Vector3,eb=new Vector3,eT=new Vector3,eE=new Vector3,ew=new Vector3,eA=new Vector3,eR=new Vector3,eC=new Vector3,eP=new Vector3,eL=new Vector3,eI=new Vector4,eN=new Vector4,eD=new Vector4;let Triangle=class Triangle{static getNormal(e,t,i,r){r.subVectors(i,t),eS.subVectors(e,t),r.cross(eS);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){eS.subVectors(r,t),eb.subVectors(i,t),eT.subVectors(e,t);let n=eS.dot(eS),s=eS.dot(eb),o=eS.dot(eT),l=eb.dot(eb),c=eb.dot(eT),h=n*l-s*s;if(0===h)return a.set(0,0,0),null;let u=1/h,d=(l*o-s*c)*u,p=(n*c-s*o)*u;return a.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return null!==this.getBarycoord(e,t,i,r,eE)&&eE.x>=0&&eE.y>=0&&eE.x+eE.y<=1}static getInterpolation(e,t,i,r,a,n,s,o){return null===this.getBarycoord(e,t,i,r,eE)?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(a,eE.x),o.addScaledVector(n,eE.y),o.addScaledVector(s,eE.z),o)}static getInterpolatedAttribute(e,t,i,r,a,n){return eI.setScalar(0),eN.setScalar(0),eD.setScalar(0),eI.fromBufferAttribute(e,t),eN.fromBufferAttribute(e,i),eD.fromBufferAttribute(e,r),n.setScalar(0),n.addScaledVector(eI,a.x),n.addScaledVector(eN,a.y),n.addScaledVector(eD,a.z),n}static isFrontFacing(e,t,i,r){return eS.subVectors(i,t),eb.subVectors(e,t),0>eS.cross(eb).dot(r)}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return eS.subVectors(this.c,this.b),eb.subVectors(this.a,this.b),.5*eS.cross(eb).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Triangle.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Triangle.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return Triangle.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return Triangle.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Triangle.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i,r,a=this.a,n=this.b,s=this.c;ew.subVectors(n,a),eA.subVectors(s,a),eC.subVectors(e,a);let o=ew.dot(eC),l=eA.dot(eC);if(o<=0&&l<=0)return t.copy(a);eP.subVectors(e,n);let c=ew.dot(eP),h=eA.dot(eP);if(c>=0&&h<=c)return t.copy(n);let u=o*h-c*l;if(u<=0&&o>=0&&c<=0)return i=o/(o-c),t.copy(a).addScaledVector(ew,i);eL.subVectors(e,s);let d=ew.dot(eL),p=eA.dot(eL);if(p>=0&&d<=p)return t.copy(s);let f=d*l-o*p;if(f<=0&&l>=0&&p<=0)return r=l/(l-p),t.copy(a).addScaledVector(eA,r);let m=c*p-d*h;if(m<=0&&h-c>=0&&d-p>=0)return eR.subVectors(s,n),r=(h-c)/(h-c+(d-p)),t.copy(n).addScaledVector(eR,r);let g=1/(m+f+u);return i=f*g,r=u*g,t.copy(a).addScaledVector(ew,i).addScaledVector(eA,r)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}constructor(e=new Vector3,t=new Vector3,i=new Vector3){this.a=e,this.b=t,this.c=i}};let Box3=class Box3{set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(eO.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(eO.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=eO.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.updateWorldMatrix(!1,!1);let i=e.geometry;if(void 0!==i){let r=i.getAttribute("position");if(!0===t&&void 0!==r&&!0!==e.isInstancedMesh)for(let t=0,i=r.count;t<i;t++)!0===e.isMesh?e.getVertexPosition(t,eO):eO.fromBufferAttribute(r,t),eO.applyMatrix4(e.matrixWorld),this.expandByPoint(eO);else void 0!==e.boundingBox?(null===e.boundingBox&&e.computeBoundingBox(),eF.copy(e.boundingBox)):(null===i.boundingBox&&i.computeBoundingBox(),eF.copy(i.boundingBox)),eF.applyMatrix4(e.matrixWorld),this.union(eF)}let r=e.children;for(let e=0,i=r.length;e<i;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,eO),eO.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(eW),eX.subVectors(this.max,eW),eB.subVectors(e.a,eW),eV.subVectors(e.b,eW),ek.subVectors(e.c,eW),eG.subVectors(eV,eB),ez.subVectors(ek,eV),eH.subVectors(eB,ek);let t=[0,-eG.z,eG.y,0,-ez.z,ez.y,0,-eH.z,eH.y,eG.z,0,-eG.x,ez.z,0,-ez.x,eH.z,0,-eH.x,-eG.y,eG.x,0,-ez.y,ez.x,0,-eH.y,eH.x,0];return!!eY(t,eB,eV,ek,eX)&&!!eY(t=[1,0,0,0,1,0,0,0,1],eB,eV,ek,eX)&&(ej.crossVectors(eG,ez),eY(t=[ej.x,ej.y,ej.z],eB,eV,ek,eX))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,eO).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(eO).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(eU[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),eU[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),eU[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),eU[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),eU[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),eU[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),eU[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),eU[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(eU)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}constructor(e=new Vector3(1/0,1/0,1/0),t=new Vector3(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}};let eU=[new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3],eO=new Vector3,eF=new Box3,eB=new Vector3,eV=new Vector3,ek=new Vector3,eG=new Vector3,ez=new Vector3,eH=new Vector3,eW=new Vector3,eX=new Vector3,ej=new Vector3,eq=new Vector3;function eY(e,t,i,r,a){for(let n=0,s=e.length-3;n<=s;n+=3){eq.fromArray(e,n);let s=a.x*Math.abs(eq.x)+a.y*Math.abs(eq.y)+a.z*Math.abs(eq.z),o=t.dot(eq),l=i.dot(eq),c=r.dot(eq);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>s)return!1}return!0}let eK=new Vector3,eJ=new Vector2,eZ=0;let BufferAttribute=class BufferAttribute extends EventDispatcher{onUploadCallback(){}set needsUpdate(e){!0===e&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(2===this.itemSize)for(let t=0,i=this.count;t<i;t++)eJ.fromBufferAttribute(this,t),eJ.applyMatrix3(e),this.setXY(t,eJ.x,eJ.y);else if(3===this.itemSize)for(let t=0,i=this.count;t<i;t++)eK.fromBufferAttribute(this,t),eK.applyMatrix3(e),this.setXYZ(t,eK.x,eK.y,eK.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)eK.fromBufferAttribute(this,t),eK.applyMatrix4(e),this.setXYZ(t,eK.x,eK.y,eK.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)eK.fromBufferAttribute(this,t),eK.applyNormalMatrix(e),this.setXYZ(t,eK.x,eK.y,eK.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)eK.fromBufferAttribute(this,t),eK.transformDirection(e),this.setXYZ(t,eK.x,eK.y,eK.z);return this}set(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=I(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=N(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=I(t,this.array)),t}setX(e,t){return this.normalized&&(t=N(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=I(t,this.array)),t}setY(e,t){return this.normalized&&(t=N(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=I(t,this.array)),t}setZ(e,t){return this.normalized&&(t=N(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=I(t,this.array)),t}setW(e,t){return this.normalized&&(t=N(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=N(t,this.array),i=N(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=N(t,this.array),i=N(i,this.array),r=N(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=N(t,this.array),i=N(i,this.array),r=N(r,this.array),a=N(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}constructor(e,t,i=!1){if(super(),Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eZ++}),this.name="",this.array=e,this.itemSize=t,this.count=void 0!==e?e.length/t:0,this.normalized=i,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}};let Uint16BufferAttribute=class Uint16BufferAttribute extends BufferAttribute{constructor(e,t,i){super(new Uint16Array(e),t,i)}};let Uint32BufferAttribute=class Uint32BufferAttribute extends BufferAttribute{constructor(e,t,i){super(new Uint32Array(e),t,i)}};let Float32BufferAttribute=class Float32BufferAttribute extends BufferAttribute{constructor(e,t,i){super(new Float32Array(e),t,i)}};let eQ=new Box3,e$=new Vector3,e0=new Vector3;let Sphere=class Sphere{set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;void 0!==t?i.copy(t):eQ.setFromPoints(e).getCenter(i);let r=0;for(let t=0,a=e.length;t<a;t++)r=Math.max(r,i.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius)),e}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;e$.subVectors(e,this.center);let t=e$.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),i=(e-this.radius)*.5;this.center.addScaledVector(e$,i/e),this.radius+=i}return this}union(e){return e.isEmpty()||(this.isEmpty()?this.copy(e):!0===this.center.equals(e.center)?this.radius=Math.max(this.radius,e.radius):(e0.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(e$.copy(e.center).add(e0)),this.expandByPoint(e$.copy(e.center).sub(e0)))),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}constructor(e=new Vector3,t=-1){this.isSphere=!0,this.center=e,this.radius=t}};let e1=0,e3=new Matrix4,e2=new Object3D,e4=new Vector3,e5=new Box3,e6=new Box3,e8=new Vector3;let BufferGeometry=class BufferGeometry extends EventDispatcher{getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(!function(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}(e)?Uint16BufferAttribute:Uint32BufferAttribute)(e,1):this.index=e,this}setIndirect(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return void 0!==this.attributes[e]}addGroup(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;void 0!==t&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(void 0!==i){let t=new Matrix3().getNormalMatrix(e);i.applyNormalMatrix(t),i.needsUpdate=!0}let r=this.attributes.tangent;return void 0!==r&&(r.transformDirection(e),r.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return e3.makeRotationFromQuaternion(e),this.applyMatrix4(e3),this}rotateX(e){return e3.makeRotationX(e),this.applyMatrix4(e3),this}rotateY(e){return e3.makeRotationY(e),this.applyMatrix4(e3),this}rotateZ(e){return e3.makeRotationZ(e),this.applyMatrix4(e3),this}translate(e,t,i){return e3.makeTranslation(e,t,i),this.applyMatrix4(e3),this}scale(e,t,i){return e3.makeScale(e,t,i),this.applyMatrix4(e3),this}lookAt(e){return e2.lookAt(e),e2.updateMatrix(),this.applyMatrix4(e2.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(e4).negate(),this.translate(e4.x,e4.y,e4.z),this}setFromPoints(e){let t=this.getAttribute("position");if(void 0===t){let t=[];for(let i=0,r=e.length;i<r;i++){let r=e[i];t.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Float32BufferAttribute(t,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let i=e[r];t.setXYZ(r,i.x,i.y,i.z||0)}e.length>t.count&&b("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Box3);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){T("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Vector3(-1/0,-1/0,-1/0),new Vector3(1/0,1/0,1/0));return}if(void 0!==e){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,i=t.length;e<i;e++){let i=t[e];e5.setFromBufferAttribute(i),this.morphTargetsRelative?(e8.addVectors(this.boundingBox.min,e5.min),this.boundingBox.expandByPoint(e8),e8.addVectors(this.boundingBox.max,e5.max),this.boundingBox.expandByPoint(e8)):(this.boundingBox.expandByPoint(e5.min),this.boundingBox.expandByPoint(e5.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&T('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new Sphere);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){T("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Vector3,1/0);return}if(e){let i=this.boundingSphere.center;if(e5.setFromBufferAttribute(e),t)for(let e=0,i=t.length;e<i;e++){let i=t[e];e6.setFromBufferAttribute(i),this.morphTargetsRelative?(e8.addVectors(e5.min,e6.min),e5.expandByPoint(e8),e8.addVectors(e5.max,e6.max),e5.expandByPoint(e8)):(e5.expandByPoint(e6.min),e5.expandByPoint(e6.max))}e5.getCenter(i);let r=0;for(let t=0,a=e.count;t<a;t++)e8.fromBufferAttribute(e,t),r=Math.max(r,i.distanceToSquared(e8));if(t)for(let a=0,n=t.length;a<n;a++){let n=t[a],s=this.morphTargetsRelative;for(let t=0,a=n.count;t<a;t++)e8.fromBufferAttribute(n,t),s&&(e4.fromBufferAttribute(e,t),e8.add(e4)),r=Math.max(r,i.distanceToSquared(e8))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&T('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(null===e||void 0===t.position||void 0===t.normal||void 0===t.uv)return void T("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let i=t.position,r=t.normal,a=t.uv,n=this.getAttribute("tangent");(void 0===n||n.count!==i.count)&&(n=new BufferAttribute(new Float32Array(4*i.count),4),this.setAttribute("tangent",n));let s=[],o=[];for(let e=0;e<i.count;e++)s[e]=new Vector3,o[e]=new Vector3;let l=new Vector3,c=new Vector3,h=new Vector3,u=new Vector2,d=new Vector2,p=new Vector2,f=new Vector3,m=new Vector3,g=this.groups;0===g.length&&(g=[{start:0,count:e.count}]);for(let t=0,r=g.length;t<r;++t){let r=g[t],n=r.start,v=r.count;for(let t=n,r=n+v;t<r;t+=3)!function(e,t,r){l.fromBufferAttribute(i,e),c.fromBufferAttribute(i,t),h.fromBufferAttribute(i,r),u.fromBufferAttribute(a,e),d.fromBufferAttribute(a,t),p.fromBufferAttribute(a,r),c.sub(l),h.sub(l),d.sub(u),p.sub(u);let n=1/(d.x*p.y-p.x*d.y);isFinite(n)&&(f.copy(c).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(n),m.copy(h).multiplyScalar(d.x).addScaledVector(c,-p.x).multiplyScalar(n),s[e].add(f),s[t].add(f),s[r].add(f),o[e].add(m),o[t].add(m),o[r].add(m))}(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Vector3,_=new Vector3,y=new Vector3,x=new Vector3;function M(e){y.fromBufferAttribute(r,e),x.copy(y);let t=s[e];v.copy(t),v.sub(y.multiplyScalar(y.dot(t))).normalize(),_.crossVectors(x,t);let i=_.dot(o[e]);n.setXYZW(e,v.x,v.y,v.z,i<0?-1:1)}for(let t=0,i=g.length;t<i;++t){let i=g[t],r=i.start,a=i.count;for(let t=r,i=r+a;t<i;t+=3)M(e.getX(t+0)),M(e.getX(t+1)),M(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(void 0!==t){let i=this.getAttribute("normal");if(void 0===i||i.count!==t.count)i=new BufferAttribute(new Float32Array(3*t.count),3),this.setAttribute("normal",i);else for(let e=0,t=i.count;e<t;e++)i.setXYZ(e,0,0,0);let r=new Vector3,a=new Vector3,n=new Vector3,s=new Vector3,o=new Vector3,l=new Vector3,c=new Vector3,h=new Vector3;if(e)for(let u=0,d=e.count;u<d;u+=3){let d=e.getX(u+0),p=e.getX(u+1),f=e.getX(u+2);r.fromBufferAttribute(t,d),a.fromBufferAttribute(t,p),n.fromBufferAttribute(t,f),c.subVectors(n,a),h.subVectors(r,a),c.cross(h),s.fromBufferAttribute(i,d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,f),s.add(c),o.add(c),l.add(c),i.setXYZ(d,s.x,s.y,s.z),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let e=0,s=t.count;e<s;e+=3)r.fromBufferAttribute(t,e+0),a.fromBufferAttribute(t,e+1),n.fromBufferAttribute(t,e+2),c.subVectors(n,a),h.subVectors(r,a),c.cross(h),i.setXYZ(e+0,c.x,c.y,c.z),i.setXYZ(e+1,c.x,c.y,c.z),i.setXYZ(e+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)e8.fromBufferAttribute(e,t),e8.normalize(),e.setXYZ(t,e8.x,e8.y,e8.z)}toNonIndexed(){function e(e,t){let i=e.array,r=e.itemSize,a=e.normalized,n=new i.constructor(t.length*r),s=0,o=0;for(let a=0,l=t.length;a<l;a++){s=e.isInterleavedBufferAttribute?t[a]*e.data.stride+e.offset:t[a]*r;for(let e=0;e<r;e++)n[o++]=i[s++]}return new BufferAttribute(n,r,a)}if(null===this.index)return b("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new BufferGeometry,i=this.index.array,r=this.attributes;for(let a in r){let n=e(r[a],i);t.setAttribute(a,n)}let a=this.morphAttributes;for(let r in a){let n=[],s=a[r];for(let t=0,r=s.length;t<r;t++){let r=e(s[t],i);n.push(r)}t.morphAttributes[r]=n}t.morphTargetsRelative=this.morphTargetsRelative;let n=this.groups;for(let e=0,i=n.length;e<i;e++){let i=n[e];t.addGroup(i.start,i.count,i.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=void 0!==this.parameters&&!0===this._transformed?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),void 0!==this.parameters&&!0!==this._transformed){let t=this.parameters;for(let i in t)void 0!==t[i]&&(e[i]=t[i]);return e}e.data={attributes:{}};let t=this.index;null!==t&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let t in i){let r=i[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},a=!1;for(let t in this.morphAttributes){let i=this.morphAttributes[t],n=[];for(let t=0,r=i.length;t<r;t++){let r=i[t];n.push(r.toJSON(e.data))}n.length>0&&(r[t]=n,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let n=this.groups;n.length>0&&(e.data.groups=JSON.parse(JSON.stringify(n)));let s=this.boundingSphere;return null!==s&&(e.data.boundingSphere=s.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;null!==i&&this.setIndex(i.clone());let r=e.attributes;for(let e in r){let i=r[e];this.setAttribute(e,i.clone(t))}let a=e.morphAttributes;for(let e in a){let i=[],r=a[e];for(let e=0,a=r.length;e<a;e++)i.push(r[e].clone(t));this.morphAttributes[e]=i}this.morphTargetsRelative=e.morphTargetsRelative;let n=e.groups;for(let e=0,t=n.length;e<t;e++){let t=n[e];this.addGroup(t.start,t.count,t.materialIndex)}let s=e.boundingBox;null!==s&&(this.boundingBox=s.clone());let o=e.boundingSphere;return null!==o&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=P(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}};let e9=new Vector3,e7=new Vector3,te=new Matrix3;let Plane=class Plane{set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=e9.subVectors(i,t).cross(e7.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=e.delta(e9),a=this.normal.dot(r);if(0===a)return 0===this.distanceToPoint(e.start)?t.copy(e.start):null;let n=-(e.start.dot(this.normal)+this.constant)/a;return!0===i&&(n<0||n>1)?null:t.copy(e.start).addScaledVector(r,n)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||te.getNormalMatrix(e),r=this.coplanarPoint(e9).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}constructor(e=new Vector3(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}};let tt=0;let Material=class Material extends EventDispatcher{get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(void 0!==e)for(let t in e){let i=e[t];if(void 0===i){b("Material: parameter '".concat(t,"' has value of undefined."));continue}let r=this[t];if(void 0===r){b("Material: '".concat(t,"' is not a property of THREE.").concat(this.type,"."));continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=void 0===e||"string"==typeof e;t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(e){let t=[];for(let i in e){let r=e[i];delete r.metadata,t.push(r)}return t}if(i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),void 0!==this.roughness&&(i.roughness=this.roughness),void 0!==this.metalness&&(i.metalness=this.metalness),void 0!==this.sheen&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),void 0!==this.sheenRoughness&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),void 0!==this.emissiveIntensity&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),void 0!==this.specularIntensity&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),void 0!==this.shininess&&(i.shininess=this.shininess),void 0!==this.clearcoat&&(i.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),void 0!==this.dispersion&&(i.dispersion=this.dispersion),void 0!==this.retroreflectivity&&(i.retroreflectivity=this.retroreflectivity),void 0!==this.iridescence&&(i.iridescence=this.iridescence),void 0!==this.iridescenceIOR&&(i.iridescenceIOR=this.iridescenceIOR),void 0!==this.iridescenceThicknessRange&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),void 0!==this.anisotropy&&(i.anisotropy=this.anisotropy),void 0!==this.anisotropyRotation&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,void 0!==this.combine&&(i.combine=this.combine)),void 0!==this.envMapRotation&&(i.envMapRotation=this.envMapRotation.toArray()),void 0!==this.envMapIntensity&&(i.envMapIntensity=this.envMapIntensity),void 0!==this.reflectivity&&(i.reflectivity=this.reflectivity),void 0!==this.refractionRatio&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),void 0!==this.transmission&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),void 0!==this.thickness&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),void 0!==this.attenuationDistance&&(i.attenuationDistance=this.attenuationDistance),void 0!==this.attenuationColor&&(i.attenuationColor=this.attenuationColor.getHex()),void 0!==this.size&&(i.size=this.size),void 0!==this.sizeAttenuation&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),void 0!==this.rotation&&(i.rotation=this.rotation),void 0!==this.depthPacking&&(i.depthPacking=this.depthPacking),void 0!==this.linewidth&&(i.linewidth=this.linewidth),void 0!==this.linecap&&(i.linecap=this.linecap),void 0!==this.linejoin&&(i.linejoin=this.linejoin),void 0!==this.dashSize&&(i.dashSize=this.dashSize),void 0!==this.gapSize&&(i.gapSize=this.gapSize),void 0!==this.scale&&(i.scale=this.scale),void 0!==this.wireframe&&(i.wireframe=this.wireframe),void 0!==this.wireframeLinewidth&&(i.wireframeLinewidth=this.wireframeLinewidth),void 0!==this.wireframeLinecap&&(i.wireframeLinecap=this.wireframeLinecap),void 0!==this.wireframeLinejoin&&(i.wireframeLinejoin=this.wireframeLinejoin),void 0!==this.flatShading&&(i.flatShading=this.flatShading),void 0!==this.fog&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData),t){let t=r(e.textures),a=r(e.images);t.length>0&&(i.textures=t),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(void 0!==e.uuid&&(this.uuid=e.uuid),void 0!==e.name&&(this.name=e.name),void 0!==e.color&&void 0!==this.color&&this.color.setHex(e.color),void 0!==e.roughness&&(this.roughness=e.roughness),void 0!==e.metalness&&(this.metalness=e.metalness),void 0!==e.sheen&&(this.sheen=e.sheen),void 0!==e.sheenColor&&(this.sheenColor=new Color().setHex(e.sheenColor)),void 0!==e.sheenRoughness&&(this.sheenRoughness=e.sheenRoughness),void 0!==e.emissive&&void 0!==this.emissive&&this.emissive.setHex(e.emissive),void 0!==e.specular&&void 0!==this.specular&&this.specular.setHex(e.specular),void 0!==e.specularIntensity&&(this.specularIntensity=e.specularIntensity),void 0!==e.specularColor&&void 0!==this.specularColor&&this.specularColor.setHex(e.specularColor),void 0!==e.shininess&&(this.shininess=e.shininess),void 0!==e.clearcoat&&(this.clearcoat=e.clearcoat),void 0!==e.clearcoatRoughness&&(this.clearcoatRoughness=e.clearcoatRoughness),void 0!==e.dispersion&&(this.dispersion=e.dispersion),void 0!==e.retroreflectivity&&(this.retroreflectivity=e.retroreflectivity),void 0!==e.iridescence&&(this.iridescence=e.iridescence),void 0!==e.iridescenceIOR&&(this.iridescenceIOR=e.iridescenceIOR),void 0!==e.iridescenceThicknessRange&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),void 0!==e.transmission&&(this.transmission=e.transmission),void 0!==e.thickness&&(this.thickness=e.thickness),void 0!==e.attenuationDistance&&(this.attenuationDistance=e.attenuationDistance),void 0!==e.attenuationColor&&void 0!==this.attenuationColor&&this.attenuationColor.setHex(e.attenuationColor),void 0!==e.anisotropy&&(this.anisotropy=e.anisotropy),void 0!==e.anisotropyRotation&&(this.anisotropyRotation=e.anisotropyRotation),void 0!==e.fog&&(this.fog=e.fog),void 0!==e.flatShading&&(this.flatShading=e.flatShading),void 0!==e.blending&&(this.blending=e.blending),void 0!==e.combine&&(this.combine=e.combine),void 0!==e.side&&(this.side=e.side),void 0!==e.shadowSide&&(this.shadowSide=e.shadowSide),void 0!==e.opacity&&(this.opacity=e.opacity),void 0!==e.transparent&&(this.transparent=e.transparent),void 0!==e.alphaTest&&(this.alphaTest=e.alphaTest),void 0!==e.alphaHash&&(this.alphaHash=e.alphaHash),void 0!==e.depthFunc&&(this.depthFunc=e.depthFunc),void 0!==e.depthTest&&(this.depthTest=e.depthTest),void 0!==e.depthWrite&&(this.depthWrite=e.depthWrite),void 0!==e.colorWrite&&(this.colorWrite=e.colorWrite),void 0!==e.clippingPlanes&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Plane().fromJSON(e))),void 0!==e.clipIntersection&&(this.clipIntersection=e.clipIntersection),void 0!==e.clipShadows&&(this.clipShadows=e.clipShadows),void 0!==e.depthPacking&&(this.depthPacking=e.depthPacking),void 0!==e.blendSrc&&(this.blendSrc=e.blendSrc),void 0!==e.blendDst&&(this.blendDst=e.blendDst),void 0!==e.blendEquation&&(this.blendEquation=e.blendEquation),void 0!==e.blendSrcAlpha&&(this.blendSrcAlpha=e.blendSrcAlpha),void 0!==e.blendDstAlpha&&(this.blendDstAlpha=e.blendDstAlpha),void 0!==e.blendEquationAlpha&&(this.blendEquationAlpha=e.blendEquationAlpha),void 0!==e.blendColor&&void 0!==this.blendColor&&this.blendColor.setHex(e.blendColor),void 0!==e.blendAlpha&&(this.blendAlpha=e.blendAlpha),void 0!==e.stencilWriteMask&&(this.stencilWriteMask=e.stencilWriteMask),void 0!==e.stencilFunc&&(this.stencilFunc=e.stencilFunc),void 0!==e.stencilRef&&(this.stencilRef=e.stencilRef),void 0!==e.stencilFuncMask&&(this.stencilFuncMask=e.stencilFuncMask),void 0!==e.stencilFail&&(this.stencilFail=e.stencilFail),void 0!==e.stencilZFail&&(this.stencilZFail=e.stencilZFail),void 0!==e.stencilZPass&&(this.stencilZPass=e.stencilZPass),void 0!==e.stencilWrite&&(this.stencilWrite=e.stencilWrite),void 0!==e.wireframe&&(this.wireframe=e.wireframe),void 0!==e.wireframeLinewidth&&(this.wireframeLinewidth=e.wireframeLinewidth),void 0!==e.wireframeLinecap&&(this.wireframeLinecap=e.wireframeLinecap),void 0!==e.wireframeLinejoin&&(this.wireframeLinejoin=e.wireframeLinejoin),void 0!==e.rotation&&(this.rotation=e.rotation),void 0!==e.linewidth&&(this.linewidth=e.linewidth),void 0!==e.linecap&&(this.linecap=e.linecap),void 0!==e.linejoin&&(this.linejoin=e.linejoin),void 0!==e.dashSize&&(this.dashSize=e.dashSize),void 0!==e.gapSize&&(this.gapSize=e.gapSize),void 0!==e.scale&&(this.scale=e.scale),void 0!==e.polygonOffset&&(this.polygonOffset=e.polygonOffset),void 0!==e.polygonOffsetFactor&&(this.polygonOffsetFactor=e.polygonOffsetFactor),void 0!==e.polygonOffsetUnits&&(this.polygonOffsetUnits=e.polygonOffsetUnits),void 0!==e.dithering&&(this.dithering=e.dithering),void 0!==e.alphaToCoverage&&(this.alphaToCoverage=e.alphaToCoverage),void 0!==e.premultipliedAlpha&&(this.premultipliedAlpha=e.premultipliedAlpha),void 0!==e.forceSinglePass&&(this.forceSinglePass=e.forceSinglePass),void 0!==e.allowOverride&&(this.allowOverride=e.allowOverride),void 0!==e.visible&&(this.visible=e.visible),void 0!==e.toneMapped&&(this.toneMapped=e.toneMapped),void 0!==e.userData&&(this.userData=e.userData),void 0!==e.vertexColors&&("number"==typeof e.vertexColors?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),void 0!==e.size&&(this.size=e.size),void 0!==e.sizeAttenuation&&(this.sizeAttenuation=e.sizeAttenuation),void 0!==e.map&&(this.map=t[e.map]||null),void 0!==e.matcap&&(this.matcap=t[e.matcap]||null),void 0!==e.alphaMap&&(this.alphaMap=t[e.alphaMap]||null),void 0!==e.bumpMap&&(this.bumpMap=t[e.bumpMap]||null),void 0!==e.bumpScale&&(this.bumpScale=e.bumpScale),void 0!==e.normalMap&&(this.normalMap=t[e.normalMap]||null),void 0!==e.normalMapType&&(this.normalMapType=e.normalMapType),void 0!==e.normalScale){let t=e.normalScale;!1===Array.isArray(t)&&(t=[t,t]),this.normalScale=new Vector2().fromArray(t)}return void 0!==e.displacementMap&&(this.displacementMap=t[e.displacementMap]||null),void 0!==e.displacementScale&&(this.displacementScale=e.displacementScale),void 0!==e.displacementBias&&(this.displacementBias=e.displacementBias),void 0!==e.roughnessMap&&(this.roughnessMap=t[e.roughnessMap]||null),void 0!==e.metalnessMap&&(this.metalnessMap=t[e.metalnessMap]||null),void 0!==e.emissiveMap&&(this.emissiveMap=t[e.emissiveMap]||null),void 0!==e.emissiveIntensity&&(this.emissiveIntensity=e.emissiveIntensity),void 0!==e.specularMap&&(this.specularMap=t[e.specularMap]||null),void 0!==e.specularIntensityMap&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),void 0!==e.specularColorMap&&(this.specularColorMap=t[e.specularColorMap]||null),void 0!==e.envMap&&(this.envMap=t[e.envMap]||null),void 0!==e.envMapRotation&&this.envMapRotation.fromArray(e.envMapRotation),void 0!==e.envMapIntensity&&(this.envMapIntensity=e.envMapIntensity),void 0!==e.reflectivity&&(this.reflectivity=e.reflectivity),void 0!==e.refractionRatio&&(this.refractionRatio=e.refractionRatio),void 0!==e.lightMap&&(this.lightMap=t[e.lightMap]||null),void 0!==e.lightMapIntensity&&(this.lightMapIntensity=e.lightMapIntensity),void 0!==e.aoMap&&(this.aoMap=t[e.aoMap]||null),void 0!==e.aoMapIntensity&&(this.aoMapIntensity=e.aoMapIntensity),void 0!==e.gradientMap&&(this.gradientMap=t[e.gradientMap]||null),void 0!==e.clearcoatMap&&(this.clearcoatMap=t[e.clearcoatMap]||null),void 0!==e.clearcoatRoughnessMap&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),void 0!==e.clearcoatNormalMap&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),void 0!==e.clearcoatNormalScale&&(this.clearcoatNormalScale=new Vector2().fromArray(e.clearcoatNormalScale)),void 0!==e.iridescenceMap&&(this.iridescenceMap=t[e.iridescenceMap]||null),void 0!==e.iridescenceThicknessMap&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),void 0!==e.transmissionMap&&(this.transmissionMap=t[e.transmissionMap]||null),void 0!==e.thicknessMap&&(this.thicknessMap=t[e.thicknessMap]||null),void 0!==e.anisotropyMap&&(this.anisotropyMap=t[e.anisotropyMap]||null),void 0!==e.sheenColorMap&&(this.sheenColorMap=t[e.sheenColorMap]||null),void 0!==e.sheenRoughnessMap&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(null!==t){let e=t.length;i=Array(e);for(let r=0;r!==e;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){!0===e&&this.version++}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tt++}),this.uuid=P(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Color(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}};let ti=new Vector3,tr=new Vector3,ta=new Vector3,tn=new Vector3;let Ray=class Ray{set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){let a,n,s,o;tr.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),tn.copy(this.origin).sub(tr);let l=.5*e.distanceTo(t),c=-this.direction.dot(ta),h=tn.dot(this.direction),u=-tn.dot(ta),d=tn.lengthSq(),p=Math.abs(1-c*c);if(p>0)if(a=c*u-h,n=c*h-u,o=l*p,a>=0)if(n>=-o)if(n<=o){let e=1/p;a*=e,n*=e,s=a*(a+c*n+2*h)+n*(c*a+n+2*u)+d}else s=-(a=Math.max(0,-(c*(n=l)+h)))*a+n*(n+2*u)+d;else s=-(a=Math.max(0,-(c*(n=-l)+h)))*a+n*(n+2*u)+d;else n<=-o?(n=(a=Math.max(0,-(-c*l+h)))>0?-l:Math.min(Math.max(-l,-u),l),s=-a*a+n*(n+2*u)+d):n<=o?(a=0,s=(n=Math.min(Math.max(-l,-u),l))*(n+2*u)+d):(n=(a=Math.max(0,-(c*l+h)))>0?l:Math.min(Math.max(-l,-u),l),s=-a*a+n*(n+2*u)+d);else n=c>0?-l:l,s=-(a=Math.max(0,-(c*n+h)))*a+n*(n+2*u)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,a),r&&r.copy(tr).addScaledVector(ta,n),s}intersectSphere(e,t){if(e.radius<0)return null;ti.subVectors(e.center,this.origin);let i=ti.dot(this.direction),r=ti.dot(ti)-i*i,a=e.radius*e.radius;if(r>a)return null;let n=Math.sqrt(a-r),s=i-n,o=i+n;return o<0?null:s<0?this.at(o,t):this.at(s,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(0===t)return 0===e.distanceToPoint(this.origin)?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return null===i?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return!!(0===t||e.normal.dot(this.direction)*t<0)}intersectBox(e,t){let i,r,a,n,s,o,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;return(l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),c>=0?(a=(e.min.y-u.y)*c,n=(e.max.y-u.y)*c):(a=(e.max.y-u.y)*c,n=(e.min.y-u.y)*c),i>n||a>r||((a>i||isNaN(i))&&(i=a),(n<r||isNaN(r))&&(r=n),h>=0?(s=(e.min.z-u.z)*h,o=(e.max.z-u.z)*h):(s=(e.max.z-u.z)*h,o=(e.min.z-u.z)*h),i>o||s>r||((s>i||i!=i)&&(i=s),(o<r||r!=r)&&(r=o),r<0)))?null:this.at(i>=0?i:r,t)}intersectsBox(e){return null!==this.intersectBox(e,ti)}intersectTriangle(e,t,i,r,a){let n,s,o,l,c,h,u,d,p,f,m,g,v=this.origin,_=this.direction,y=_.x,x=_.y,M=_.z,S=e.x-v.x,b=e.y-v.y,T=e.z-v.z,E=t.x-v.x,w=t.y-v.y,A=t.z-v.z,R=i.x-v.x,C=i.y-v.y,P=i.z-v.z,L=Math.abs(y),I=Math.abs(x),N=Math.abs(M);if(L>=I&&L>=N?(o=y,h=S,p=E,g=R,y>=0?(n=x,s=M,l=b,c=T,u=w,d=A,f=C,m=P):(n=M,s=x,l=T,c=b,u=A,d=w,f=P,m=C)):I>=N?(o=x,h=b,p=w,g=C,x>=0?(n=M,s=y,l=T,c=S,u=A,d=E,f=P,m=R):(n=y,s=M,l=S,c=T,u=E,d=A,f=R,m=P)):(o=M,h=T,p=A,g=P,M>=0?(n=y,s=x,l=S,c=b,u=E,d=w,f=R,m=C):(n=x,s=y,l=b,c=S,u=w,d=E,f=C,m=R)),0===o)return null;let D=n/o,U=s/o,O=1/o,F=l-D*h,B=c-U*h,V=u-D*p,k=d-U*p,G=f-D*g,z=m-U*g,H=G*k-z*V,W=F*z-B*G,X=V*B-k*F;if(r){if(H<0||W<0||X<0)return null}else if((H<0||W<0||X<0)&&(H>0||W>0||X>0))return null;let j=H+W+X;if(0===j)return null;let q=O*(H*h+W*p+X*g);return(j>0?q<0:q>0)?null:this.at(q/j,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}constructor(e=new Vector3,t=new Vector3(0,0,-1)){this.origin=e,this.direction=t}};let MeshBasicMaterial=class MeshBasicMaterial extends Material{copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Color(0xffffff),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Euler,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}};let ts=new Matrix4,to=new Ray,tl=new Sphere,tc=new Vector3,th=new Vector3,tu=new Vector3,td=new Vector3,tp=new Vector3,tf=new Vector3,tm=new Vector3,tg=new Vector3;let Mesh=class Mesh extends Object3D{copy(e,t){return super.copy(e,t),void 0!==e.morphTargetInfluences&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),void 0!==e.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(void 0!==i){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=i.length;e<t;e++){let t=i[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,n=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(a&&s){tf.set(0,0,0);for(let i=0,r=a.length;i<r;i++){let r=s[i],o=a[i];0!==r&&(tp.fromBufferAttribute(o,e),n?tf.addScaledVector(tp,r):tf.addScaledVector(tp.sub(t),r))}t.add(tf)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;void 0===r||(null===i.boundingSphere&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(a),to.copy(e.ray).recast(e.near),!1===tl.containsPoint(to.origin)&&(null===to.intersectSphere(tl,tc)||to.origin.distanceToSquared(tc)>(e.far-e.near)**2)||(ts.copy(a).invert(),to.copy(e.ray).applyMatrix4(ts),(null===i.boundingBox||!1!==to.intersectsBox(i.boundingBox))&&this._computeIntersections(e,t,to)))}_computeIntersections(e,t,i){let r,a=this.geometry,n=this.material,s=a.index,o=a.attributes.position,l=a.attributes.uv,c=a.attributes.uv1,h=a.attributes.normal,u=a.groups,d=a.drawRange;if(null!==s)if(Array.isArray(n))for(let a=0,o=u.length;a<o;a++){let o=u[a],p=n[o.materialIndex],f=Math.max(o.start,d.start),m=Math.min(s.count,Math.min(o.start+o.count,d.start+d.count));for(let a=f;a<m;a+=3)(r=tv(this,p,e,i,l,c,h,s.getX(a),s.getX(a+1),s.getX(a+2)))&&(r.faceIndex=Math.floor(a/3),r.face.materialIndex=o.materialIndex,t.push(r))}else{let a=Math.max(0,d.start),o=Math.min(s.count,d.start+d.count);for(let u=a;u<o;u+=3)(r=tv(this,n,e,i,l,c,h,s.getX(u),s.getX(u+1),s.getX(u+2)))&&(r.faceIndex=Math.floor(u/3),t.push(r))}else if(void 0!==o)if(Array.isArray(n))for(let a=0,s=u.length;a<s;a++){let s=u[a],p=n[s.materialIndex],f=Math.max(s.start,d.start),m=Math.min(o.count,Math.min(s.start+s.count,d.start+d.count));for(let a=f;a<m;a+=3)(r=tv(this,p,e,i,l,c,h,a,a+1,a+2))&&(r.faceIndex=Math.floor(a/3),r.face.materialIndex=s.materialIndex,t.push(r))}else{let a=Math.max(0,d.start),s=Math.min(o.count,d.start+d.count);for(let o=a;o<s;o+=3)(r=tv(this,n,e,i,l,c,h,o,o+1,o+2))&&(r.faceIndex=Math.floor(o/3),t.push(r))}}constructor(e=new BufferGeometry,t=new MeshBasicMaterial){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}};function tv(e,t,i,r,a,n,s,o,l,c){e.getVertexPosition(o,th),e.getVertexPosition(l,tu),e.getVertexPosition(c,td);let h=function(e,t,i,r,a,n,s,o){if(null===(1===t.side?r.intersectTriangle(s,n,a,!0,o):r.intersectTriangle(a,n,s,0===t.side,o)))return null;tg.copy(o),tg.applyMatrix4(e.matrixWorld);let l=i.ray.origin.distanceTo(tg);return l<i.near||l>i.far?null:{distance:l,point:tg.clone(),object:e}}(e,t,i,r,th,tu,td,tm);if(h){let e=new Vector3;Triangle.getBarycoord(tm,th,tu,td,e),a&&(h.uv=Triangle.getInterpolatedAttribute(a,o,l,c,e,new Vector2)),n&&(h.uv1=Triangle.getInterpolatedAttribute(n,o,l,c,e,new Vector2)),s&&(h.normal=Triangle.getInterpolatedAttribute(s,o,l,c,e,new Vector3),h.normal.dot(r.direction)>0&&h.normal.multiplyScalar(-1));let t={a:o,b:l,c:c,normal:new Vector3,materialIndex:0};Triangle.getNormal(th,tu,td,t.normal),h.face=t,h.barycoord=e}return h}let DataTexture=class DataTexture extends Texture{constructor(e=null,t=1,i=1,r,a,n,s,o,l=1003,c=1003,h,u){super(null,n,s,o,l,c,r,a,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};let t_=new Sphere,ty=new Vector2(.5,.5),tx=new Vector3;let Frustum=class Frustum{set(e,t,i,r,a,n){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(n),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.planes,a=e.elements,n=a[0],s=a[1],o=a[2],l=a[3],c=a[4],h=a[5],u=a[6],d=a[7],p=a[8],f=a[9],m=a[10],g=a[11],v=a[12],_=a[13],y=a[14],x=a[15];if(r[0].setComponents(l-n,d-c,g-p,x-v).normalize(),r[1].setComponents(l+n,d+c,g+p,x+v).normalize(),r[2].setComponents(l+s,d+h,g+f,x+_).normalize(),r[3].setComponents(l-s,d-h,g-f,x-_).normalize(),i)r[4].setComponents(o,u,m,y).normalize(),r[5].setComponents(l-o,d-u,g-m,x-y).normalize();else if(r[4].setComponents(l-o,d-u,g-m,x-y).normalize(),2e3===t)r[5].setComponents(l+o,d+u,g+m,x+y).normalize();else if(2001===t)r[5].setComponents(o,u,m,y).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(void 0!==e.boundingSphere)null===e.boundingSphere&&e.computeBoundingSphere(),t_.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;null===t.boundingSphere&&t.computeBoundingSphere(),t_.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(t_)}intersectsSprite(e){return t_.center.set(0,0,0),t_.radius=.7071067811865476+ty.distanceTo(e.center),t_.applyMatrix4(e.matrixWorld),this.intersectsSphere(t_)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(tx.x=r.normal.x>0?e.max.x:e.min.x,tx.y=r.normal.y>0?e.max.y:e.min.y,tx.z=r.normal.z>0?e.max.z:e.min.z,0>r.distanceToPoint(tx))return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(0>t[i].distanceToPoint(e))return!1;return!0}clone(){return new this.constructor().copy(this)}constructor(e=new Plane,t=new Plane,i=new Plane,r=new Plane,a=new Plane,n=new Plane){this.planes=[e,t,i,r,a,n]}};let LineBasicMaterial=class LineBasicMaterial extends Material{copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Color(0xffffff),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}};let tM=new Vector3,tS=new Vector3,tb=new Matrix4,tT=new Ray,tE=new Sphere,tw=new Vector3,tA=new Vector3;let Line=class Line extends Object3D{copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(null===e.index){let t=e.attributes.position,i=[0];for(let e=1,r=t.count;e<r;e++)tM.fromBufferAttribute(t,e-1),tS.fromBufferAttribute(t,e),i[e]=i[e-1],i[e]+=tM.distanceTo(tS);e.setAttribute("lineDistance",new Float32BufferAttribute(i,1))}else b("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,n=i.drawRange;if(null===i.boundingSphere&&i.computeBoundingSphere(),tE.copy(i.boundingSphere),tE.applyMatrix4(r),tE.radius+=a,!1===e.ray.intersectsSphere(tE))return;tb.copy(r).invert(),tT.copy(e.ray).applyMatrix4(tb);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=this.isLineSegments?2:1,c=i.index,h=i.attributes.position;if(null!==c){let i=Math.max(0,n.start),r=Math.min(c.count,n.start+n.count);for(let a=i,n=r-1;a<n;a+=l){let i=tR(this,e,tT,o,c.getX(a),c.getX(a+1),a);i&&t.push(i)}if(this.isLineLoop){let a=tR(this,e,tT,o,c.getX(r-1),c.getX(i),r-1);a&&t.push(a)}}else{let i=Math.max(0,n.start),r=Math.min(h.count,n.start+n.count);for(let a=i,n=r-1;a<n;a+=l){let i=tR(this,e,tT,o,a,a+1,a);i&&t.push(i)}if(this.isLineLoop){let a=tR(this,e,tT,o,r-1,i,r-1);a&&t.push(a)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(void 0!==i){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=i.length;e<t;e++){let t=i[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}constructor(e=new BufferGeometry,t=new LineBasicMaterial){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}};function tR(e,t,i,r,a,n,s){let o=e.geometry.attributes.position;if(tM.fromBufferAttribute(o,a),tS.fromBufferAttribute(o,n),i.distanceSqToSegment(tM,tS,tw,tA)>r)return;tw.applyMatrix4(e.matrixWorld);let l=t.ray.origin.distanceTo(tw);if(!(l<t.near)&&!(l>t.far))return{distance:l,point:tA.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}let LineLoop=class LineLoop extends Line{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};let CubeTexture=class CubeTexture extends Texture{get images(){return this.image}set images(e){this.image=e}constructor(e=[],t=301,i,r,a,n,s,o,l,c){super(e,t,i,r,a,n,s,o,l,c),this.isCubeTexture=!0,this.flipY=!1}};let CanvasTexture=class CanvasTexture extends Texture{constructor(e,t,i,r,a,n,s,o,l){super(e,t,i,r,a,n,s,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};let DepthTexture=class DepthTexture extends Texture{copy(e){return super.copy(e),this.source=new TextureSource(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}constructor(e,t,i=1014,r,a,n,s=1003,o=1003,l,c=1026,h=1){if(1026!==c&&1027!==c)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:h},r,a,n,s,o,c,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}};let CubeDepthTexture=class CubeDepthTexture extends DepthTexture{get images(){return this.image}set images(e){this.image=e}constructor(e,t=1014,i=301,r,a,n=1003,s=1003,o,l=1026){let c={width:e,height:e,depth:1};super(e,e,t,i,r,a,n,s,o,l),this.image=[c,c,c,c,c,c],this.isCubeDepthTexture=!0,this.isCubeTexture=!0}};let ExternalTexture=class ExternalTexture extends Texture{copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}};let BoxGeometry=class BoxGeometry extends BufferGeometry{copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new BoxGeometry(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}constructor(e=1,t=1,i=1,r=1,a=1,n=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:n};let s=this;r=Math.floor(r),a=Math.floor(a);let o=[],l=[],c=[],h=[],u=0,d=0;function p(e,t,i,r,a,n,p,f,m,g,v){let _=n/m,y=p/g,x=n/2,M=p/2,S=f/2,b=m+1,T=g+1,E=0,w=0,A=new Vector3;for(let n=0;n<T;n++){let s=n*y-M;for(let o=0;o<b;o++){let u=o*_-x;A[e]=u*r,A[t]=s*a,A[i]=S,l.push(A.x,A.y,A.z),A[e]=0,A[t]=0,A[i]=f>0?1:-1,c.push(A.x,A.y,A.z),h.push(o/m),h.push(1-n/g),E+=1}}for(let e=0;e<g;e++)for(let t=0;t<m;t++){let i=u+t+b*e,r=u+t+b*(e+1),a=u+(t+1)+b*(e+1),n=u+(t+1)+b*e;o.push(i,r,n),o.push(r,a,n),w+=6}s.addGroup(d,w,v),d+=w,u+=E}p("z","y","x",-1,-1,i,t,e,n=Math.floor(n),a,0),p("z","y","x",1,-1,i,t,-e,n,a,1),p("x","z","y",1,1,e,i,t,r,n,2),p("x","z","y",1,-1,e,i,-t,r,n,3),p("x","y","z",1,-1,e,t,i,r,a,4),p("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(o),this.setAttribute("position",new Float32BufferAttribute(l,3)),this.setAttribute("normal",new Float32BufferAttribute(c,3)),this.setAttribute("uv",new Float32BufferAttribute(h,2))}};let CircleGeometry=class CircleGeometry extends BufferGeometry{copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new CircleGeometry(e.radius,e.segments,e.thetaStart,e.thetaLength)}constructor(e=1,t=32,i=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);let a=[],n=[],s=[],o=[],l=new Vector3,c=new Vector2;n.push(0,0,0),s.push(0,0,1),o.push(.5,.5);for(let a=0,h=3;a<=t;a++,h+=3){let u=i+a/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),n.push(l.x,l.y,l.z),s.push(0,0,1),c.x=(n[h]/e+1)/2,c.y=(n[h+1]/e+1)/2,o.push(c.x,c.y)}for(let e=1;e<=t;e++)a.push(e,e+1,0);this.setIndex(a),this.setAttribute("position",new Float32BufferAttribute(n,3)),this.setAttribute("normal",new Float32BufferAttribute(s,3)),this.setAttribute("uv",new Float32BufferAttribute(o,2))}};let CylinderGeometry=class CylinderGeometry extends BufferGeometry{copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new CylinderGeometry(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}constructor(e=1,t=1,i=1,r=32,a=1,n=!1,s=0,o=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:n,thetaStart:s,thetaLength:o};let l=this;r=Math.floor(r),a=Math.floor(a);let c=[],h=[],u=[],d=[],p=0,f=[],m=i/2,g=0;function v(i){let a=p,n=new Vector2,f=new Vector3,v=0,_=!0===i?e:t,y=!0===i?1:-1;for(let e=1;e<=r;e++)h.push(0,m*y,0),u.push(0,y,0),d.push(.5,.5),p++;let x=p;for(let e=0;e<=r;e++){let t=e/r*o+s,i=Math.cos(t),a=Math.sin(t);f.x=_*a,f.y=m*y,f.z=_*i,h.push(f.x,f.y,f.z),u.push(0,y,0),n.x=.5*i+.5,n.y=.5*a*y+.5,d.push(n.x,n.y),p++}for(let e=0;e<r;e++){let t=a+e,r=x+e;!0===i?c.push(r,r+1,t):c.push(r+1,r,t),v+=3}l.addGroup(g,v,!0===i?1:2),g+=v}(function(){let n=new Vector3,v=new Vector3,_=0,y=(t-e)/i;for(let l=0;l<=a;l++){let c=[],g=l/a,_=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,a=t*o+s,l=Math.sin(a),f=Math.cos(a);v.x=_*l,v.y=-g*i+m,v.z=_*f,h.push(v.x,v.y,v.z),n.set(l,y,f).normalize(),u.push(n.x,n.y,n.z),d.push(t,1-g),c.push(p++)}f.push(c)}for(let i=0;i<r;i++)for(let r=0;r<a;r++){let n=f[r][i],s=f[r+1][i],o=f[r+1][i+1],l=f[r][i+1];(e>0||0!==r)&&(c.push(n,s,l),_+=3),(t>0||r!==a-1)&&(c.push(s,o,l),_+=3)}l.addGroup(g,_,0),g+=_})(),!1===n&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new Float32BufferAttribute(h,3)),this.setAttribute("normal",new Float32BufferAttribute(u,3)),this.setAttribute("uv",new Float32BufferAttribute(d,2))}};let ConeGeometry=class ConeGeometry extends CylinderGeometry{static fromJSON(e){return new ConeGeometry(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}constructor(e=1,t=1,i=32,r=1,a=!1,n=0,s=2*Math.PI){super(0,e,t,i,r,a,n,s),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:n,thetaLength:s}}};let PolyhedronGeometry=class PolyhedronGeometry extends BufferGeometry{copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new PolyhedronGeometry(e.vertices,e.indices,e.radius,e.detail)}constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let a=[],n=[];function s(e){a.push(e.x,e.y,e.z)}function o(t,i){let r=3*t;i.x=e[r+0],i.y=e[r+1],i.z=e[r+2]}function l(e,t,i,r){r<0&&1===e.x&&(n[t]=e.x-1),0===i.x&&0===i.z&&(n[t]=r/2/Math.PI+.5)}function c(e){return Math.atan2(e.z,-e.x)}(function(e){let i=new Vector3,r=new Vector3,a=new Vector3;for(let n=0;n<t.length;n+=3)o(t[n+0],i),o(t[n+1],r),o(t[n+2],a),function(e,t,i,r){let a=r+1,n=[];for(let r=0;r<=a;r++){n[r]=[];let s=e.clone().lerp(i,r/a),o=t.clone().lerp(i,r/a),l=a-r;for(let e=0;e<=l;e++)0===e&&r===a?n[r][e]=s:n[r][e]=s.clone().lerp(o,e/l)}for(let e=0;e<a;e++)for(let t=0;t<2*(a-e)-1;t++){let i=Math.floor(t/2);t%2==0?(s(n[e][i+1]),s(n[e+1][i]),s(n[e][i])):(s(n[e][i+1]),s(n[e+1][i+1]),s(n[e+1][i]))}}(i,r,a,e)})(r),function(e){let t=new Vector3;for(let i=0;i<a.length;i+=3)t.x=a[i+0],t.y=a[i+1],t.z=a[i+2],t.normalize().multiplyScalar(e),a[i+0]=t.x,a[i+1]=t.y,a[i+2]=t.z}(i),function(){let e=new Vector3;for(let i=0;i<a.length;i+=3){var t;e.x=a[i+0],e.y=a[i+1],e.z=a[i+2];let r=c(e)/2/Math.PI+.5,s=Math.atan2(-(t=e).y,Math.sqrt(t.x*t.x+t.z*t.z))/Math.PI+.5;n.push(r,1-s)}(function(){let e=new Vector3,t=new Vector3,i=new Vector3,r=new Vector3,s=new Vector2,o=new Vector2,h=new Vector2;for(let u=0,d=0;u<a.length;u+=9,d+=6){e.set(a[u+0],a[u+1],a[u+2]),t.set(a[u+3],a[u+4],a[u+5]),i.set(a[u+6],a[u+7],a[u+8]),s.set(n[d+0],n[d+1]),o.set(n[d+2],n[d+3]),h.set(n[d+4],n[d+5]),r.copy(e).add(t).add(i).divideScalar(3);let p=c(r);l(s,d+0,e,p),l(o,d+2,t,p),l(h,d+4,i,p)}})(),function(){for(let e=0;e<n.length;e+=6){let t=n[e+0],i=n[e+2],r=n[e+4],a=Math.max(t,i,r),s=Math.min(t,i,r);a>.9&&s<.1&&(t<.2&&(n[e+0]+=1),i<.2&&(n[e+2]+=1),r<.2&&(n[e+4]+=1))}}()}(),this.setAttribute("position",new Float32BufferAttribute(a,3)),this.setAttribute("normal",new Float32BufferAttribute(a.slice(),3)),this.setAttribute("uv",new Float32BufferAttribute(n,2)),0===r?this.computeVertexNormals():this.normalizeNormals()}};let Curve=class Curve{getPoint(){b("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.arcLengthDivisions;if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let n=1;n<=e;n++)t.push(a+=(i=this.getPoint(n/e)).distanceTo(r)),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e){let t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=this.getLengths(),a=0,n=r.length;t=i||e*r[n-1];let s=0,o=n-1,l;for(;s<=o;)if((l=r[a=Math.floor(s+(o-s)/2)]-t)<0)s=a+1;else if(l>0)o=a-1;else{o=a;break}if(r[a=o]===t)return a/(n-1);let c=r[a],h=r[a+1];return(a+(t-c)/(h-c))/(n-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),n=this.getPoint(r),s=t||(a.isVector2?new Vector2:new Vector3);return s.copy(n).sub(a).normalize(),s}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=new Vector3,r=[],a=[],n=[],s=new Vector3,o=new Matrix4;for(let t=0;t<=e;t++){let i=t/e;r[t]=this.getTangentAt(i,new Vector3)}a[0]=new Vector3,n[0]=new Vector3;let l=Number.MAX_VALUE,c=Math.abs(r[0].x),h=Math.abs(r[0].y),u=Math.abs(r[0].z);c<=l&&(l=c,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),u<=l&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),n[0].crossVectors(r[0],a[0]);for(let t=1;t<=e;t++){if(a[t]=a[t-1].clone(),n[t]=n[t-1].clone(),s.crossVectors(r[t-1],r[t]),s.length()>Number.EPSILON){s.normalize();let e=Math.acos(L(r[t-1].dot(r[t]),-1,1));a[t].applyMatrix4(o.makeRotationAxis(s,e))}n[t].crossVectors(r[t],a[t])}if(!0===t){let t=Math.acos(L(a[0].dot(a[e]),-1,1));t/=e,r[0].dot(s.crossVectors(a[0],a[e]))>0&&(t=-t);for(let i=1;i<=e;i++)a[i].applyMatrix4(o.makeRotationAxis(r[i],t*i)),n[i].crossVectors(r[i],a[i])}return{tangents:r,normals:a,binormals:n}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}};let EllipseCurve=class EllipseCurve extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2,i=2*Math.PI,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(r=a?0:i),!0!==this.aClockwise||a||(r===i?r=-i:r-=i);let n=this.aStartAngle+e*r,s=this.aX+this.xRadius*Math.cos(n),o=this.aY+this.yRadius*Math.sin(n);if(0!==this.aRotation){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),i=s-this.aX,r=o-this.aY;s=i*e-r*t+this.aX,o=i*t+r*e+this.aY}return t.set(s,o)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}constructor(e=0,t=0,i=1,r=1,a=0,n=2*Math.PI,s=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=n,this.aClockwise=s,this.aRotation=o}};let ArcCurve=class ArcCurve extends EllipseCurve{constructor(e,t,i,r,a,n){super(e,t,i,i,r,a,n),this.isArcCurve=!0,this.type="ArcCurve"}};function tC(){let e=0,t=0,i=0,r=0;function a(a,n,s,o){e=a,t=s,i=-3*a+3*n-2*s-o,r=2*a-2*n+s+o}return{initCatmullRom:function(e,t,i,r,n){a(t,i,n*(i-e),n*(r-t))},initNonuniformCatmullRom:function(e,t,i,r,n,s,o){let l=(t-e)/n-(i-e)/(n+s)+(i-t)/s,c=(i-t)/s-(r-t)/(s+o)+(r-i)/o;a(t,i,l*=s,c*=s)},calc:function(a){let n=a*a;return e+t*a+i*n+n*a*r}}}let tP=new Vector3,tL=new Vector3,tI=new tC,tN=new tC,tD=new tC;let CatmullRomCurve3=class CatmullRomCurve3 extends Curve{getPoint(e){let t,i,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3,a=this.points,n=a.length,s=(n-!this.closed)*e,o=Math.floor(s),l=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/n)+1)*n:0===l&&o===n-1&&(o=n-2,l=1),this.closed||o>0?t=a[(o-1)%n]:(tL.subVectors(a[0],a[1]).add(a[0]),t=tL);let c=a[o%n],h=a[(o+1)%n];if(this.closed||o+2<n?i=a[(o+2)%n]:(tP.subVectors(a[n-1],a[n-2]).add(a[n-1]),i=tP),"centripetal"===this.curveType||"chordal"===this.curveType){let e="chordal"===this.curveType?.5:.25,r=Math.pow(t.distanceToSquared(c),e),a=Math.pow(c.distanceToSquared(h),e),n=Math.pow(h.distanceToSquared(i),e);a<1e-4&&(a=1),r<1e-4&&(r=a),n<1e-4&&(n=a),tI.initNonuniformCatmullRom(t.x,c.x,h.x,i.x,r,a,n),tN.initNonuniformCatmullRom(t.y,c.y,h.y,i.y,r,a,n),tD.initNonuniformCatmullRom(t.z,c.z,h.z,i.z,r,a,n)}else"catmullrom"===this.curveType&&(tI.initCatmullRom(t.x,c.x,h.x,i.x,this.tension),tN.initCatmullRom(t.y,c.y,h.y,i.y,this.tension),tD.initCatmullRom(t.z,c.z,h.z,i.z,this.tension));return r.set(tI.calc(l),tN.calc(l),tD.calc(l)),r}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(new Vector3().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}};function tU(e,t,i,r,a){let n=(r-t)*.5,s=(a-i)*.5,o=e*e;return e*o*(2*i-2*r+n+s)+(-3*i+3*r-2*n-s)*o+n*e+i}function tO(e,t,i,r){let a;return(a=1-e)*a*t+2*(1-e)*e*i+e*e*r}function tF(e,t,i,r,a){let n,s;return(n=1-e)*n*n*t+3*(s=1-e)*s*e*i+3*(1-e)*e*e*r+e*e*e*a}let CubicBezierCurve=class CubicBezierCurve extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2,i=this.v0,r=this.v1,a=this.v2,n=this.v3;return t.set(tF(e,i.x,r.x,a.x,n.x),tF(e,i.y,r.y,a.y,n.y)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}constructor(e=new Vector2,t=new Vector2,i=new Vector2,r=new Vector2){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}};let CubicBezierCurve3=class CubicBezierCurve3 extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3,i=this.v0,r=this.v1,a=this.v2,n=this.v3;return t.set(tF(e,i.x,r.x,a.x,n.x),tF(e,i.y,r.y,a.y,n.y),tF(e,i.z,r.z,a.z,n.z)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}constructor(e=new Vector3,t=new Vector3,i=new Vector3,r=new Vector3){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}};let LineCurve=class LineCurve extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2;return 1===e?t.copy(this.v2):(t.copy(this.v2).sub(this.v1),t.multiplyScalar(e).add(this.v1)),t}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2;return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}constructor(e=new Vector2,t=new Vector2){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}};let LineCurve3=class LineCurve3 extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3;return 1===e?t.copy(this.v2):(t.copy(this.v2).sub(this.v1),t.multiplyScalar(e).add(this.v1)),t}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3;return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}constructor(e=new Vector3,t=new Vector3){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}};let QuadraticBezierCurve=class QuadraticBezierCurve extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2,i=this.v0,r=this.v1,a=this.v2;return t.set(tO(e,i.x,r.x,a.x),tO(e,i.y,r.y,a.y)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}constructor(e=new Vector2,t=new Vector2,i=new Vector2){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}};let QuadraticBezierCurve3=class QuadraticBezierCurve3 extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3,i=this.v0,r=this.v1,a=this.v2;return t.set(tO(e,i.x,r.x,a.x),tO(e,i.y,r.y,a.y),tO(e,i.z,r.z,a.z)),t}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}constructor(e=new Vector3,t=new Vector3,i=new Vector3){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}};let SplineCurve=class SplineCurve extends Curve{getPoint(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector2,i=this.points,r=(i.length-1)*e,a=Math.floor(r),n=r-a,s=i[0===a?a:a-1],o=i[a],l=i[a>i.length-2?i.length-1:a+1],c=i[a>i.length-3?i.length-1:a+2];return t.set(tU(n,s.x,o.x,l.x,c.x),tU(n,s.y,o.y,l.y,c.y)),t}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let i=e.points[t];this.points.push(new Vector2().fromArray(i))}return this}constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}};var tB,tV,tk,tG,tz,tH,tW,tX=Object.freeze({__proto__:null,ArcCurve:ArcCurve,CatmullRomCurve3:CatmullRomCurve3,CubicBezierCurve:CubicBezierCurve,CubicBezierCurve3:CubicBezierCurve3,EllipseCurve:EllipseCurve,LineCurve:LineCurve,LineCurve3:LineCurve3,QuadraticBezierCurve:QuadraticBezierCurve,QuadraticBezierCurve3:QuadraticBezierCurve3,SplineCurve:SplineCurve});let IcosahedronGeometry=class IcosahedronGeometry extends PolyhedronGeometry{static fromJSON(e){return new IcosahedronGeometry(e.radius,e.detail)}constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2;super([-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}};let PlaneGeometry=class PlaneGeometry extends BufferGeometry{copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new PlaneGeometry(e.width,e.height,e.widthSegments,e.heightSegments)}constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let a=e/2,n=t/2,s=Math.floor(i),o=Math.floor(r),l=s+1,c=o+1,h=e/s,u=t/o,d=[],p=[],f=[],m=[];for(let e=0;e<c;e++){let t=e*u-n;for(let i=0;i<l;i++){let r=i*h-a;p.push(r,-t,0),f.push(0,0,1),m.push(i/s),m.push(1-e/o)}}for(let e=0;e<o;e++)for(let t=0;t<s;t++){let i=t+l*e,r=t+l*(e+1),a=t+1+l*(e+1),n=t+1+l*e;d.push(i,r,n),d.push(r,a,n)}this.setIndex(d),this.setAttribute("position",new Float32BufferAttribute(p,3)),this.setAttribute("normal",new Float32BufferAttribute(f,3)),this.setAttribute("uv",new Float32BufferAttribute(m,2))}};function tj(e){let t={};for(let i in e)for(let r in t[i]={},e[i]){let a=e[i][r];if(tY(a))a.isRenderTargetTexture?(b("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=a.clone();else if(Array.isArray(a))if(tY(a[0])){let e=[];for(let t=0,i=a.length;t<i;t++)e[t]=a[t].clone();t[i][r]=e}else t[i][r]=a.slice();else t[i][r]=a}return t}function tq(e){let t={};for(let i=0;i<e.length;i++){let r=tj(e[i]);for(let e in r)t[e]=r[e]}return t}function tY(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function tK(e){let t=e.getRenderTarget();return null===t?e.outputColorSpace:!0===t.isXRRenderTarget?t.texture.colorSpace:V.workingColorSpace}var tJ=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tZ=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let ShaderMaterial=class ShaderMaterial extends Material{copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tj(e.uniforms),this.uniformsGroups=function(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);for(let i in t.glslVersion=this.glslVersion,t.uniforms={},this.uniforms){let r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let e in this.extensions)!0===this.extensions[e]&&(i[e]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),void 0!==e.uniforms)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Color().setHex(r.value);break;case"v2":this.uniforms[i].value=new Vector2().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Vector3().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Vector4().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Matrix3().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Matrix4().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(void 0!==e.defines&&(this.defines=e.defines),void 0!==e.vertexShader&&(this.vertexShader=e.vertexShader),void 0!==e.fragmentShader&&(this.fragmentShader=e.fragmentShader),void 0!==e.glslVersion&&(this.glslVersion=e.glslVersion),void 0!==e.extensions)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return void 0!==e.lights&&(this.lights=e.lights),void 0!==e.clipping&&(this.clipping=e.clipping),this}constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tJ,this.fragmentShader=tZ,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,void 0!==e&&this.setValues(e)}};let RawShaderMaterial=class RawShaderMaterial extends ShaderMaterial{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};let MeshStandardMaterial=class MeshStandardMaterial extends Material{copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Color(0xffffff),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Euler,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}};let MeshPhysicalMaterial=class MeshPhysicalMaterial extends MeshStandardMaterial{get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Vector2(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return L(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Color(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Color(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Color(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}};let MeshPhongMaterial=class MeshPhongMaterial extends Material{copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Color(0xffffff),this.specular=new Color(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Color(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Vector2(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Euler,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}};let MeshDepthMaterial=class MeshDepthMaterial extends Material{copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}};let MeshDistanceMaterial=class MeshDistanceMaterial extends Material{copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}};function tQ(e,t){return e&&e.constructor!==t?"number"==typeof t.BYTES_PER_ELEMENT?new t(e):Array.prototype.slice.call(e):e}function t$(e){return void 0!==e&&void 0!==e.inTangents&&void 0!==e.outTangents}let Interpolant=class Interpolant{evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];e:{t:{let n;i:{r:if(!(e<r)){for(let n=i+2;;){if(void 0===r){if(e<a)break r;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===n)break;if(a=r,e<(r=t[++i]))break t}n=t.length;break i}if(!(e>=a)){let s=t[1];e<s&&(i=2,a=s);for(let n=i-2;;){if(void 0===a)return this._cachedIndex=0,this.copySampleValue_(0);if(i===n)break;if(r=a,e>=(a=t[--i-1]))break t}n=i,i=0;break i}break e}for(;i<n;){let r=i+n>>>1;e<t[r]?n=r:i=r+1}if(r=t[i],void 0===(a=t[i-1]))return this._cachedIndex=0,this.copySampleValue_(0);if(void 0===r)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let e=0;e!==r;++e)t[e]=i[a+e];return t}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=void 0!==r?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}};let CubicInterpolant=class CubicInterpolant extends Interpolant{intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,n=e+1,s=r[a],o=r[n];if(void 0===s)switch(this.getSettings_().endingStart){case 2401:a=e,s=2*t-i;break;case 2402:a=r.length-2,s=t+r[a]-r[a+1];break;default:a=e,s=i}if(void 0===o)switch(this.getSettings_().endingEnd){case 2401:n=e,o=2*i-t;break;case 2402:n=1,o=i+r[1]-r[0];break;default:n=e-1,o=t}let l=(i-t)*.5,c=this.valueSize;this._weightPrev=l/(t-s),this._weightNext=l/(o-i),this._offsetPrev=a*c,this._offsetNext=n*c}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(i-t)/(r-t),f=p*p,m=f*p,g=-u*m+2*u*f-u*p,v=(1+u)*m+(-1.5-2*u)*f+(-.5+u)*p+1,_=(-1-d)*m+(1.5+d)*f+.5*p,y=d*m-d*f;for(let e=0;e!==s;++e)a[e]=g*n[c+e]+v*n[l+e]+_*n[o+e]+y*n[h+e];return a}constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}};let LinearInterpolant=class LinearInterpolant extends Interpolant{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=(i-t)/(r-t),h=1-c;for(let e=0;e!==s;++e)a[e]=n[l+e]*h+n[o+e]*c;return a}constructor(e,t,i,r){super(e,t,i,r)}};let DiscreteInterpolant=class DiscreteInterpolant extends Interpolant{interpolate_(e){return this.copySampleValue_(e-1)}constructor(e,t,i,r){super(e,t,i,r)}};let BezierInterpolant=class BezierInterpolant extends Interpolant{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=e*s,l=o-s,c=this.inTangents,h=this.outTangents;if(!c||!h){let e=(i-t)/(r-t),c=1-e;for(let t=0;t!==s;++t)a[t]=n[l+t]*c+n[o+t]*e;return a}let u=2*s,d=e-1;for(let p=0;p!==s;++p){let s=n[l+p],f=n[o+p],m=d*u+2*p,g=h[m],v=h[m+1],_=e*u+2*p,y=c[_],x=c[_+1],M=function(e,t,i,r,a){let n=(e-t)/(a-t);for(let s=0;s<8;s++){let s=t0(n,t,i,r,a)-e;if(1e-10>Math.abs(s))break;let o=function(e,t,i,r,a){let n=1-e;return 3*n*n*(i-t)+6*n*e*(r-i)+3*e*e*(a-r)}(n,t,i,r,a);if(1e-10>Math.abs(o))break;n=Math.max(0,Math.min(1,n-s/o))}return n}(i,t,g,y,r);a[p]=t0(M,s,v,x,f)}return a}};function t0(e,t,i,r,a){let n=1-e;return n*n*n*t+3*n*n*e*i+3*n*e*e*r+e*e*e*a}let KeyframeTrack=class KeyframeTrack{static toJSON(e){let t,i=e.constructor;if(i.toJSON!==this.toJSON)t=i.toJSON(e);else{t={name:e.name,times:tQ(e.times,Array),values:tQ(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(t.interpolation=i),t$(e.settings)&&(t.settings={inTangents:tQ(e.settings.inTangents,Array),outTangents:tQ(e.settings.outTangents,Array)})}return t.type=e.ValueTypeName,t}InterpolantFactoryMethodDiscrete(e){return new DiscreteInterpolant(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new LinearInterpolant(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new CubicInterpolant(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new BezierInterpolant(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(void 0===t){let t="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return b("KeyframeTrack:",t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(0!==e){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(1!==e){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;t$(this.settings)&&(t1(this.settings.inTangents,e),t1(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,n=r-1;for(;a!==r&&i[a]<e;)++a;for(;-1!==n&&i[n]>t;)--n;if(++n,0!==a||n!==r){a>=n&&(a=(n=Math.max(n,1))-1);let e=this.getValueSize();this.times=i.slice(a,n),this.values=this.values.slice(a*e,n*e)}return this}validate(){var e;let t=!0,i=this.getValueSize();i-Math.floor(i)!=0&&(T("KeyframeTrack: Invalid value size in track.",this),t=!1);let r=this.times,a=this.values,n=r.length;0===n&&(T("KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let e=0;e!==n;e++){let i=r[e];if("number"==typeof i&&isNaN(i)){T("KeyframeTrack: Time is not a valid number.",this,e,i),t=!1;break}if(null!==s&&s>i){T("KeyframeTrack: Out of order keys.",this,e,i,s),t=!1;break}s=i}if(void 0!==a&&ArrayBuffer.isView(e=a)&&!(e instanceof DataView))for(let e=0,i=a.length;e!==i;++e){let i=a[e];if(isNaN(i)){T("KeyframeTrack: Value is not a valid number.",this,e,i),t=!1;break}}return t}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=2302===this.getInterpolation(),a=e.length-1,n=1;for(let s=1;s<a;++s){let a=!1,o=e[s];if(o!==e[s+1]&&(1!==s||o!==e[0]))if(r)a=!0;else{let e=s*i,r=e-i,n=e+i;for(let s=0;s!==i;++s){let i=t[e+s];if(i!==t[r+s]||i!==t[n+s]){a=!0;break}}}if(a){if(s!==n){e[n]=e[s];let r=s*i,a=n*i;for(let e=0;e!==i;++e)t[a+e]=t[r+e]}++n}}if(a>0){e[n]=e[a];for(let e=a*i,r=n*i,s=0;s!==i;++s)t[r+s]=t[e+s];++n}return n!==e.length?(this.times=e.slice(0,n),this.values=t.slice(0,n*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);return i.createInterpolant=this.createInterpolant,t$(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}constructor(e,t,i,r){if(void 0===e)throw Error("THREE.KeyframeTrack: track name is undefined");if(void 0===t||0===t.length)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=tQ(t,this.TimeBufferType),this.values=tQ(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}};function t1(e,t){for(let i=0,r=e.length;i!==r;i+=2)e[i]*=t}KeyframeTrack.prototype.ValueTypeName="",KeyframeTrack.prototype.TimeBufferType=Float32Array,KeyframeTrack.prototype.ValueBufferType=Float32Array,KeyframeTrack.prototype.DefaultInterpolation=2301;let BooleanKeyframeTrack=class BooleanKeyframeTrack extends KeyframeTrack{constructor(e,t,i){super(e,t,i)}};BooleanKeyframeTrack.prototype.ValueTypeName="bool",BooleanKeyframeTrack.prototype.ValueBufferType=Array,BooleanKeyframeTrack.prototype.DefaultInterpolation=2300,BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear=void 0,BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth=void 0;let ColorKeyframeTrack=class ColorKeyframeTrack extends KeyframeTrack{constructor(e,t,i,r){super(e,t,i,r)}};ColorKeyframeTrack.prototype.ValueTypeName="color";let NumberKeyframeTrack=class NumberKeyframeTrack extends KeyframeTrack{constructor(e,t,i,r){super(e,t,i,r)}};NumberKeyframeTrack.prototype.ValueTypeName="number";let QuaternionLinearInterpolant=class QuaternionLinearInterpolant extends Interpolant{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,o=(i-t)/(r-t),l=e*s;for(let e=l+s;l!==e;l+=4)Quaternion.slerpFlat(a,0,n,l-s,n,l,o);return a}constructor(e,t,i,r){super(e,t,i,r)}};let QuaternionKeyframeTrack=class QuaternionKeyframeTrack extends KeyframeTrack{InterpolantFactoryMethodLinear(e){return new QuaternionLinearInterpolant(this.times,this.values,this.getValueSize(),e)}constructor(e,t,i,r){super(e,t,i,r)}};QuaternionKeyframeTrack.prototype.ValueTypeName="quaternion",QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth=void 0;let StringKeyframeTrack=class StringKeyframeTrack extends KeyframeTrack{constructor(e,t,i){super(e,t,i)}};StringKeyframeTrack.prototype.ValueTypeName="string",StringKeyframeTrack.prototype.ValueBufferType=Array,StringKeyframeTrack.prototype.DefaultInterpolation=2300,StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear=void 0,StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth=void 0;let VectorKeyframeTrack=class VectorKeyframeTrack extends KeyframeTrack{constructor(e,t,i,r){super(e,t,i,r)}};VectorKeyframeTrack.prototype.ValueTypeName="vector";let LoadingManager=class LoadingManager{get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}constructor(e,t,i){let r,a=this,n=!1,s=0,o=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(e){o++,!1===n&&void 0!==a.onStart&&a.onStart(e,s,o),n=!0},this.itemEnd=function(e){s++,void 0!==a.onProgress&&a.onProgress(e,s,o),s===o&&(n=!1,void 0!==a.onLoad&&a.onLoad())},this.itemError=function(e){void 0!==a.onError&&a.onError(e)},this.resolveURL=function(e){return(e=e.normalize("NFC"),r)?r(e):e},this.setURLModifier=function(e){return r=e,this},this.addHandler=function(e,t){return l.push(e,t),this},this.removeHandler=function(e){let t=l.indexOf(e);return -1!==t&&l.splice(t,2),this},this.getHandler=function(e){for(let t=0,i=l.length;t<i;t+=2){let i=l[t],r=l[t+1];if(i.global&&(i.lastIndex=0),i.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}};let t3=new LoadingManager;let Loader=class Loader{load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}constructor(e){this.manager=void 0!==e?e:t3,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},"u">typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}};Loader.DEFAULT_MATERIAL_NAME="__DEFAULT",new WeakMap;let Light=class Light extends Object3D{copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Color(e),this.intensity=t}};let t2=new Matrix4,t4=new Vector3,t5=new Vector3;let LightShadow=class LightShadow{getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;t4.setFromMatrixPosition(e.matrixWorld),t.position.copy(t4),t5.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(t5),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){t2.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(t2,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,n=r?r.z/a.x:1,s=r?r.w/a.y:1,o=r?r.x/a.x:0,l=r?r.y/a.y:0;2001===e.coordinateSystem||e.reversedDepth?t.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,1,0,0,0,0,1):t.set(.5*n,0,0,.5*n+o,0,.5*s,0,.5*s+l,0,0,.5,.5,0,0,0,1),t.multiply(t2)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vector2(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new Matrix4,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Frustum,this._frameExtents=new Vector2(1,1),this._viewportCount=1,this._viewports=[new Vector4(0,0,1,1)]}};let t6=new Vector3,t8=new Quaternion,t9=new Vector3;let Camera=class Camera extends Object3D{get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(t6,t8,t9),1===t9.x&&1===t9.y&&1===t9.z?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(t6,t8,t9.set(1,1,1)).invert()}updateWorldMatrix(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(t6,t8,t9),1===t9.x&&1===t9.y&&1===t9.z?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(t6,t8,t9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Matrix4,this.projectionMatrix=new Matrix4,this.projectionMatrixInverse=new Matrix4,this.coordinateSystem=2e3,this._reversedDepth=!1}};let t7=new Vector3,ie=new Vector2,it=new Vector2;let PerspectiveCamera=class PerspectiveCamera extends Camera{copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=null===e.view?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*C*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*R*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*C*Math.atan(Math.tan(.5*R*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){t7.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(t7.x,t7.y).multiplyScalar(-e/t7.z),t7.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(t7.x,t7.y).multiplyScalar(-e/t7.z)}getViewSize(e,t){return this.getViewBounds(e,ie,it),t.subVectors(it,ie)}setViewOffset(e,t,i,r,a,n){this.aspect=e/t,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*R*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,n=this.view;if(null!==this.view&&this.view.enabled){let e=n.fullWidth,s=n.fullHeight;a+=n.offsetX*r/e,t-=n.offsetY*i/s,r*=n.width/e,i*=n.height/s}let s=this.filmOffset;0!==s&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,null!==this.view&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}};let OrthographicCamera=class OrthographicCamera extends Camera{copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=null===e.view?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,n){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,n=i+e,s=r+t,o=r-t;if(null!==this.view&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=e*this.view.offsetX,n=a+e*this.view.width,s-=t*this.view.offsetY,o=s-t*this.view.height}this.projectionMatrix.makeOrthographic(a,n,s,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,null!==this.view&&(t.object.view=Object.assign({},this.view)),t}constructor(e=-1,t=1,i=1,r=-1,a=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}};let DirectionalLightShadow=class DirectionalLightShadow extends LightShadow{constructor(){super(new OrthographicCamera(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};let DirectionalLight=class DirectionalLight extends Light{dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Object3D.DEFAULT_UP),this.updateMatrix(),this.target=new Object3D,this.shadow=new DirectionalLightShadow}};let AmbientLight=class AmbientLight extends Light{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};new WeakMap;let CubeCamera=class CubeCamera extends Object3D{updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,n,s,o]=t;for(let e of t)this.remove(e);if(2e3===e)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(2001===e)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){null===this.parent&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,n,s,o,l,c]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let f=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;m=!0===e.isWebGLRenderer?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,n),e.setRenderTarget(i,2,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,3,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=f,e.setRenderTarget(i,5,r),m&&!1===e.autoClear&&e.clearDepth(),e.render(t,c),e.setRenderTarget(h,u,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new PerspectiveCamera(-90,1,e,t);r.layers=this.layers,this.add(r);let a=new PerspectiveCamera(-90,1,e,t);a.layers=this.layers,this.add(a);let n=new PerspectiveCamera(-90,1,e,t);n.layers=this.layers,this.add(n);let s=new PerspectiveCamera(-90,1,e,t);s.layers=this.layers,this.add(s);let o=new PerspectiveCamera(-90,1,e,t);o.layers=this.layers,this.add(o);let l=new PerspectiveCamera(-90,1,e,t);l.layers=this.layers,this.add(l)}};let ArrayCamera=class ArrayCamera extends PerspectiveCamera{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};let ii="\\[\\]\\.:\\/",ir=RegExp("["+ii+"]","g"),ia="[^"+ii+"]",is="[^"+ii.replace("\\.","")+"]",io=RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",ia)+/(WCOD+)?/.source.replace("WCOD",is)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ia)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ia)+"$"),il=["material","materials","bones","map"];let Composite=class Composite{getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];void 0!==r&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}constructor(e,t,i){let r=i||PropertyBinding.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}};let PropertyBinding=class PropertyBinding{static create(e,t,i){return e&&e.isAnimationObjectGroup?new PropertyBinding.Composite(e,t,i):new PropertyBinding(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ir,"")}static parseTrackName(e){let t=io.exec(e);if(null===t)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(void 0!==r&&-1!==r){let e=i.nodeName.substring(r+1);-1!==il.indexOf(e)&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=e)}if(null===i.propertyName||0===i.propertyName.length)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(void 0===t||""===t||"."===t||-1===t||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(void 0!==i)return i}if(e.children){let i=function(e){for(let r=0;r<e.length;r++){let a=e[r];if(a.name===t||a.uuid===t)return a;let n=i(a.children);if(n)return n}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=PropertyBinding.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void b("PropertyBinding: No target node found for track: "+this.path+".");if(i){let r=t.objectIndex;switch(i){case"materials":if(!e.material)return void T("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void T("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void T("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let t=0;t<e.length;t++)if(e[t].name===r){r=t;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void T("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void T("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(void 0===e[i])return void T("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[i]}if(void 0!==r){if(void 0===e[r])return void T("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[r]}}let n=e[r];if(void 0===n)return void T("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let s=this.Versioning.None;this.targetObject=e,!0===e.isMaterial?s=this.Versioning.NeedsUpdate:!0===e.isObject3D&&(s=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(void 0!==a){if("morphTargetInfluences"===r){if(!e.geometry)return void T("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void T("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);void 0!==e.morphTargetDictionary[a]&&(a=e.morphTargetDictionary[a])}o=this.BindingType.ArrayElement,this.resolvedProperty=n,this.propertyIndex=a}else void 0!==n.fromArray&&void 0!==n.toArray?(o=this.BindingType.HasFromToArray,this.resolvedProperty=n):Array.isArray(n)?(o=this.BindingType.EntireArray,this.resolvedProperty=n):this.propertyName=r;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}constructor(e,t,i){this.path=t,this.parsedPath=i||PropertyBinding.parseTrackName(t),this.node=PropertyBinding.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};PropertyBinding.Composite=Composite,PropertyBinding.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},PropertyBinding.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},PropertyBinding.prototype.GetterByBindingType=[PropertyBinding.prototype._getValue_direct,PropertyBinding.prototype._getValue_array,PropertyBinding.prototype._getValue_arrayElement,PropertyBinding.prototype._getValue_toArray],PropertyBinding.prototype.SetterByBindingTypeAndVersioning=[[PropertyBinding.prototype._setValue_direct,PropertyBinding.prototype._setValue_direct_setNeedsUpdate,PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[PropertyBinding.prototype._setValue_array,PropertyBinding.prototype._setValue_array_setNeedsUpdate,PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate],[PropertyBinding.prototype._setValue_arrayElement,PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[PropertyBinding.prototype._setValue_fromArray,PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];let ic=new Matrix4;let Raycaster=class Raycaster{set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):T("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ic.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ic),this}intersectObject(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return iu(e,this,i,t),i.sort(ih),i}intersectObjects(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];for(let r=0,a=e.length;r<a;r++)iu(e[r],this,i,t);return i.sort(ih),i}constructor(e,t,i=0,r=1/0){this.ray=new Ray(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Layers,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}};function ih(e,t){return e.distance-t.distance}function iu(e,t,i,r){let a=!0;if(e.layers.test(t.layers)&&!1===e.raycast(t,i)&&(a=!1),!0===a&&!0===r){let r=e.children;for(let e=0,a=r.length;e<a;e++)iu(r[e],t,i,!0)}}let Matrix2=class Matrix2{identity(){return this.set(1,0,0,1),this}fromArray(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}constructor(e,t,i,r){this.elements=[1,0,0,1],void 0!==e&&this.set(e,t,i,r)}};Matrix2.prototype.isMatrix2=!0;let id=new Vector3;let ArrowHelper=class ArrowHelper extends Object3D{setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{id.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(id,t)}}setLength(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.2*e,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.2*t;this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}constructor(e=new Vector3(0,0,1),r=new Vector3(0,0,0),a=1,n=0xffff00,s=.2*a,o=.2*s){super(),this.type="ArrowHelper",void 0===t&&((t=new BufferGeometry).setAttribute("position",new Float32BufferAttribute([0,0,0,0,1,0],3)),(i=new ConeGeometry(.5,1,5,1)).translate(0,-.5,0)),this.position.copy(r),this.line=new Line(t,new LineBasicMaterial({color:n,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Mesh(i,new MeshBasicMaterial({color:n,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(a,s,o)}};function ip(e,t,i,r){let a=function(e){switch(e){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error("THREE.TextureUtils: Unknown texture type ".concat(e,"."))}(r);switch(i){case 1021:return e*t;case 1028:case 1029:return e*t/a.components*a.byteLength;case 1030:case 1031:return e*t*2/a.components*a.byteLength;case 1022:return e*t*3/a.components*a.byteLength;case 1023:case 1033:return e*t*4/a.components*a.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8}throw Error("Unable to determine texture byte length for ".concat(i," format."))}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function im(){let e=null,t=!1,i=null,r=null;function a(t,n){r=e.requestAnimationFrame(a),i(t,n)}return{start:function(){!0===t||null===i||null!==e&&(r=e.requestAnimationFrame(a),t=!0)},stop:function(){null!==e&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){i=e},setContext:function(t){e=t}}}function ig(e){let t=new WeakMap;return{get:function(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)},remove:function(i){i.isInterleavedBufferAttribute&&(i=i.data);let r=t.get(i);r&&(e.deleteBuffer(r.buffer),t.delete(i))},update:function(i,r){if(i.isInterleavedBufferAttribute&&(i=i.data),i.isGLBufferAttribute){let e=t.get(i);(!e||e.version<i.version)&&t.set(i,{buffer:i.buffer,type:i.type,bytesPerElement:i.elementSize,version:i.version});return}let a=t.get(i);if(void 0===a)t.set(i,function(t,i){let r,a=t.array,n=t.usage,s=a.byteLength,o=e.createBuffer();if(e.bindBuffer(i,o),e.bufferData(i,a,n),t.onUploadCallback(),a instanceof Float32Array)r=e.FLOAT;else if("u">typeof Float16Array&&a instanceof Float16Array)r=e.HALF_FLOAT;else if(a instanceof Uint16Array)r=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(a instanceof Int16Array)r=e.SHORT;else if(a instanceof Uint32Array)r=e.UNSIGNED_INT;else if(a instanceof Int32Array)r=e.INT;else if(a instanceof Int8Array)r=e.BYTE;else if(a instanceof Uint8Array)r=e.UNSIGNED_BYTE;else if(a instanceof Uint8ClampedArray)r=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:o,type:r,bytesPerElement:a.BYTES_PER_ELEMENT,version:t.version,size:s}}(i,r));else if(a.version<i.version){if(a.size!==i.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");!function(t,i,r){let a=i.array,n=i.updateRanges;if(e.bindBuffer(r,t),0===n.length)e.bufferSubData(r,0,a);else{n.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<n.length;e++){let i=n[t],r=n[e];r.start<=i.start+i.count+1?i.count=Math.max(i.count,r.start+r.count-i.start):n[++t]=r}n.length=t+1;for(let t=0,i=n.length;t<i;t++){let i=n[t];e.bufferSubData(r,i.start*a.BYTES_PER_ELEMENT,a,i.start,i.count)}i.clearUpdateRanges()}i.onUploadCallback()}(a.buffer,i,r),a.version=i.version}}}}"u">typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),"u">typeof window&&(window.__THREE__?b("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");let iv={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},i_={common:{diffuse:{value:new Color(0xffffff)},opacity:{value:1},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Matrix3}},envmap:{envMap:{value:null},envMapRotation:{value:new Matrix3},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Matrix3}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Matrix3}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Matrix3},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Matrix3},normalScale:{value:new Vector2(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Matrix3},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Matrix3}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Matrix3}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Matrix3}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Color(0xffffff)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Vector3},probesMax:{value:new Vector3},probesResolution:{value:new Vector3}},points:{diffuse:{value:new Color(0xffffff)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0},uvTransform:{value:new Matrix3}},sprite:{diffuse:{value:new Color(0xffffff)},opacity:{value:1},center:{value:new Vector2(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}}},iy={basic:{uniforms:tq([i_.common,i_.specularmap,i_.envmap,i_.aomap,i_.lightmap,i_.fog]),vertexShader:iv.meshbasic_vert,fragmentShader:iv.meshbasic_frag},lambert:{uniforms:tq([i_.common,i_.specularmap,i_.envmap,i_.aomap,i_.lightmap,i_.emissivemap,i_.bumpmap,i_.normalmap,i_.displacementmap,i_.fog,i_.lights,{emissive:{value:new Color(0)},envMapIntensity:{value:1}}]),vertexShader:iv.meshlambert_vert,fragmentShader:iv.meshlambert_frag},phong:{uniforms:tq([i_.common,i_.specularmap,i_.envmap,i_.aomap,i_.lightmap,i_.emissivemap,i_.bumpmap,i_.normalmap,i_.displacementmap,i_.fog,i_.lights,{emissive:{value:new Color(0)},specular:{value:new Color(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:iv.meshphong_vert,fragmentShader:iv.meshphong_frag},standard:{uniforms:tq([i_.common,i_.envmap,i_.aomap,i_.lightmap,i_.emissivemap,i_.bumpmap,i_.normalmap,i_.displacementmap,i_.roughnessmap,i_.metalnessmap,i_.fog,i_.lights,{emissive:{value:new Color(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:iv.meshphysical_vert,fragmentShader:iv.meshphysical_frag},toon:{uniforms:tq([i_.common,i_.aomap,i_.lightmap,i_.emissivemap,i_.bumpmap,i_.normalmap,i_.displacementmap,i_.gradientmap,i_.fog,i_.lights,{emissive:{value:new Color(0)}}]),vertexShader:iv.meshtoon_vert,fragmentShader:iv.meshtoon_frag},matcap:{uniforms:tq([i_.common,i_.bumpmap,i_.normalmap,i_.displacementmap,i_.fog,{matcap:{value:null}}]),vertexShader:iv.meshmatcap_vert,fragmentShader:iv.meshmatcap_frag},points:{uniforms:tq([i_.points,i_.fog]),vertexShader:iv.points_vert,fragmentShader:iv.points_frag},dashed:{uniforms:tq([i_.common,i_.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:iv.linedashed_vert,fragmentShader:iv.linedashed_frag},depth:{uniforms:tq([i_.common,i_.displacementmap]),vertexShader:iv.depth_vert,fragmentShader:iv.depth_frag},normal:{uniforms:tq([i_.common,i_.bumpmap,i_.normalmap,i_.displacementmap,{opacity:{value:1}}]),vertexShader:iv.meshnormal_vert,fragmentShader:iv.meshnormal_frag},sprite:{uniforms:tq([i_.sprite,i_.fog]),vertexShader:iv.sprite_vert,fragmentShader:iv.sprite_frag},background:{uniforms:{uvTransform:{value:new Matrix3},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:iv.background_vert,fragmentShader:iv.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Matrix3}},vertexShader:iv.backgroundCube_vert,fragmentShader:iv.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:iv.cube_vert,fragmentShader:iv.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:iv.equirect_vert,fragmentShader:iv.equirect_frag},distance:{uniforms:tq([i_.common,i_.displacementmap,{referencePosition:{value:new Vector3},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:iv.distance_vert,fragmentShader:iv.distance_frag},shadow:{uniforms:tq([i_.lights,i_.fog,{color:{value:new Color(0)},opacity:{value:1}}]),vertexShader:iv.shadow_vert,fragmentShader:iv.shadow_frag}};iy.physical={uniforms:tq([iy.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Matrix3},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Matrix3},clearcoatNormalScale:{value:new Vector2(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Matrix3},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Matrix3},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Matrix3},sheen:{value:0},sheenColor:{value:new Color(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Matrix3},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Matrix3},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Matrix3},transmissionSamplerSize:{value:new Vector2},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Matrix3},attenuationDistance:{value:0},attenuationColor:{value:new Color(0)},specularColor:{value:new Color(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Matrix3},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Matrix3},anisotropyVector:{value:new Vector2},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Matrix3}}]),vertexShader:iv.meshphysical_vert,fragmentShader:iv.meshphysical_frag};let ix={r:0,b:0,g:0},iM=new Matrix4,iS=new Matrix3;function ib(e,t,i,r,a,n){let s,o,l=new Color(0),c=+(!0!==a),h=null,u=0,d=null;function p(e){let i=!0===e.isScene?e.background:null;if(i&&i.isTexture){let r=e.backgroundBlurriness>0;i=t.get(i,r)}return i}function f(t,r){t.getRGB(ix,tK(e)),i.buffers.color.setClear(ix.r,ix.g,ix.b,r,n)}return{getClearColor:function(){return l},setClearColor:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;l.set(e),f(l,c=t)},getClearAlpha:function(){return c},setClearAlpha:function(e){f(l,c=e)},render:function(t){let r=!1,a=p(t);null===a?f(l,c):a&&a.isColor&&(f(a,1),r=!0);let s=e.xr.getEnvironmentBlendMode();"additive"===s?i.buffers.color.setClear(0,0,0,1,n):"alpha-blend"===s&&i.buffers.color.setClear(0,0,0,0,n),(e.autoClear||r)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))},addToRenderList:function(t,i){let a=p(i);a&&(a.isCubeTexture||306===a.mapping)?(void 0===o&&((o=new Mesh(new BoxGeometry(1,1,1),new ShaderMaterial({name:"BackgroundCubeMaterial",uniforms:tj(iy.backgroundCube.uniforms),vertexShader:iy.backgroundCube.vertexShader,fragmentShader:iy.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1}))).geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(e,t,i){this.matrixWorld.copyPosition(i.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(o)),o.material.uniforms.envMap.value=a,o.material.uniforms.backgroundBlurriness.value=i.backgroundBlurriness,o.material.uniforms.backgroundIntensity.value=i.backgroundIntensity,o.material.uniforms.backgroundRotation.value.setFromMatrix4(iM.makeRotationFromEuler(i.backgroundRotation)).transpose(),a.isCubeTexture&&!1===a.isRenderTargetTexture&&o.material.uniforms.backgroundRotation.value.premultiply(iS),o.material.toneMapped="srgb"!==V.getTransfer(a.colorSpace),(h!==a||u!==a.version||d!==e.toneMapping)&&(o.material.needsUpdate=!0,h=a,u=a.version,d=e.toneMapping),o.layers.enableAll(),t.unshift(o,o.geometry,o.material,0,0,null)):a&&a.isTexture&&(void 0===s&&((s=new Mesh(new PlaneGeometry(2,2),new ShaderMaterial({name:"BackgroundMaterial",uniforms:tj(iy.background.uniforms),vertexShader:iy.background.vertexShader,fragmentShader:iy.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1}))).geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(s)),s.material.uniforms.t2D.value=a,s.material.uniforms.backgroundIntensity.value=i.backgroundIntensity,s.material.toneMapped="srgb"!==V.getTransfer(a.colorSpace),!0===a.matrixAutoUpdate&&a.updateMatrix(),s.material.uniforms.uvTransform.value.copy(a.matrix),(h!==a||u!==a.version||d!==e.toneMapping)&&(s.material.needsUpdate=!0,h=a,u=a.version,d=e.toneMapping),s.layers.enableAll(),t.unshift(s,s.geometry,s.material,0,0,null))},dispose:function(){void 0!==o&&(o.geometry.dispose(),o.material.dispose(),o=void 0),void 0!==s&&(s.geometry.dispose(),s.material.dispose(),s=void 0)}}}function iT(e,t){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},a=c(null),n=a,s=!1;function o(t){return e.bindVertexArray(t)}function l(t){return e.deleteVertexArray(t)}function c(e){let t=[],r=[],a=[];for(let e=0;e<i;e++)t[e]=0,r[e]=0,a[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:a,object:e,attributes:{},index:null}}function h(){let e=n.newAttributes;for(let t=0,i=e.length;t<i;t++)e[t]=0}function u(e){d(e,0)}function d(t,i){let r=n.newAttributes,a=n.enabledAttributes,s=n.attributeDivisors;r[t]=1,0===a[t]&&(e.enableVertexAttribArray(t),a[t]=1),s[t]!==i&&(e.vertexAttribDivisor(t,i),s[t]=i)}function p(){let t=n.newAttributes,i=n.enabledAttributes;for(let r=0,a=i.length;r<a;r++)i[r]!==t[r]&&(e.disableVertexAttribArray(r),i[r]=0)}function f(t,i,r,a,n,s,o){!0===o?e.vertexAttribIPointer(t,i,r,n,s):e.vertexAttribPointer(t,i,r,a,n,s)}function m(){g(),s=!0,n!==a&&o((n=a).object)}function g(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:function(i,a,l,m,g){var v,_,y;let x,M,S,b,T,E,w=!1,A=(v=i,_=m,y=l,x=!0===a.wireframe,void 0===(M=r[_.id])&&(M={},r[_.id]=M),void 0===(b=M[S=!0===v.isInstancedMesh?v.id:0])&&(b={},M[S]=b),void 0===(T=b[y.id])&&(T={},b[y.id]=T),void 0===(E=T[x])&&(E=c(e.createVertexArray()),T[x]=E),E);n!==A&&o((n=A).object),(w=function(e,t,i,r){let a=n.attributes,s=t.attributes,o=0,l=i.getAttributes();for(let t in l)if(l[t].location>=0){let i=a[t],r=s[t];if(void 0===r&&("instanceMatrix"===t&&e.instanceMatrix&&(r=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(r=e.instanceColor)),void 0===i||i.attribute!==r||r&&i.data!==r.data)return!0;o++}return n.attributesNum!==o||n.index!==r}(i,m,l,g))&&function(e,t,i,r){let a={},s=t.attributes,o=0,l=i.getAttributes();for(let t in l)if(l[t].location>=0){let i=s[t];void 0===i&&("instanceMatrix"===t&&e.instanceMatrix&&(i=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(i=e.instanceColor));let r={};r.attribute=i,i&&i.data&&(r.data=i.data),a[t]=r,o++}n.attributes=a,n.attributesNum=o,n.index=r}(i,m,l,g),null!==g&&t.update(g,e.ELEMENT_ARRAY_BUFFER),(w||s)&&(s=!1,function(i,r,a,n){h();let s=n.attributes,o=a.getAttributes(),l=r.defaultAttributeValues;for(let r in o){let a=o[r];if(a.location>=0){let o=s[r];if(void 0===o&&("instanceMatrix"===r&&i.instanceMatrix&&(o=i.instanceMatrix),"instanceColor"===r&&i.instanceColor&&(o=i.instanceColor)),void 0!==o){let r=o.normalized,s=o.itemSize,l=t.get(o);if(void 0===l)continue;let c=l.buffer,h=l.type,p=l.bytesPerElement,m=h===e.INT||h===e.UNSIGNED_INT||1013===o.gpuType;if(o.isInterleavedBufferAttribute){let t=o.data,l=t.stride,g=o.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<a.locationSize;e++)d(a.location+e,t.meshPerAttribute);!0!==i.isInstancedMesh&&void 0===n._maxInstanceCount&&(n._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<a.locationSize;e++)u(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<a.locationSize;e++)f(a.location+e,s/a.locationSize,h,r,l*p,(g+s/a.locationSize*e)*p,m)}else{if(o.isInstancedBufferAttribute){for(let e=0;e<a.locationSize;e++)d(a.location+e,o.meshPerAttribute);!0!==i.isInstancedMesh&&void 0===n._maxInstanceCount&&(n._maxInstanceCount=o.meshPerAttribute*o.count)}else for(let e=0;e<a.locationSize;e++)u(a.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<a.locationSize;e++)f(a.location+e,s/a.locationSize,h,r,s*p,s/a.locationSize*e*p,m)}}else if(void 0!==l){let t=l[r];if(void 0!==t)switch(t.length){case 2:e.vertexAttrib2fv(a.location,t);break;case 3:e.vertexAttrib3fv(a.location,t);break;case 4:e.vertexAttrib4fv(a.location,t);break;default:e.vertexAttrib1fv(a.location,t)}}}}p()}(i,a,l,m),null!==g&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(g).buffer))},reset:m,resetDefaultState:g,dispose:function(){for(let e in m(),r){let t=r[e];for(let e in t){let i=t[e];for(let e in i){let t=i[e];for(let e in t)l(t[e].object),delete t[e];delete i[e]}}delete r[e]}},releaseStatesOfGeometry:function(e){if(void 0===r[e.id])return;let t=r[e.id];for(let e in t){let i=t[e];for(let e in i){let t=i[e];for(let e in t)l(t[e].object),delete t[e];delete i[e]}}delete r[e.id]},releaseStatesOfObject:function(e){for(let t in r){let i=r[t],a=!0===e.isInstancedMesh?e.id:0,n=i[a];if(void 0!==n){for(let e in n){let t=n[e];for(let e in t)l(t[e].object),delete t[e];delete n[e]}delete i[a],0===Object.keys(i).length&&delete r[t]}}},releaseStatesOfProgram:function(e){for(let t in r){let i=r[t];for(let t in i){let r=i[t];if(void 0===r[e.id])continue;let a=r[e.id];for(let e in a)l(a[e].object),delete a[e];delete r[e.id]}}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function iE(e,t,i){let r;this.setMode=function(e){r=e},this.render=function(t,a){e.drawArrays(r,t,a),i.update(a,r,1)},this.renderInstances=function(t,a,n){0!==n&&(e.drawArraysInstanced(r,t,a,n),i.update(a,r,n))},this.renderMultiDraw=function(e,a,n){if(0===n)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,e,0,a,0,n);let s=0;for(let e=0;e<n;e++)s+=a[e];i.update(s,r,1)}}function iw(e,t,i,r){let a;function n(t){if("highp"===t){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";t="mediump"}return"mediump"===t&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=void 0!==i.precision?i.precision:"highp",o=n(s);o!==s&&(b("WebGLRenderer:",s,"not supported, using",o,"instead."),s=o);let l=!0===i.logarithmicDepthBuffer,c=!0===i.reversedDepthBuffer&&t.has("EXT_clip_control");return!0===i.reversedDepthBuffer&&!1===c&&b("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(void 0!==a)return a;if(!0===t.has("EXT_texture_filter_anisotropic")){let i=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a},getMaxPrecision:n,textureFormatReadable:function(t){return 1023===t||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(i){let a=1016===i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return 1009===i||1015===i||!!a||r.convert(i)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)},precision:s,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxCubemapSize:e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:e.getParameter(e.MAX_VERTEX_ATTRIBS),maxVertexUniforms:e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:e.getParameter(e.MAX_VARYING_VECTORS),maxFragmentUniforms:e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:e.getParameter(e.MAX_SAMPLES),samples:e.getParameter(e.SAMPLES)}}function iA(e){let t=this,i=null,r=0,a=!1,n=!1,s=new Plane,o=new Matrix3,l={value:null,needsUpdate:!1};function c(e,i,r,a){let n=null!==e?e.length:0,c=null;if(0!==n){if(c=l.value,!0!==a||null===c){let t=r+4*n,a=i.matrixWorldInverse;o.getNormalMatrix(a),(null===c||c.length<t)&&(c=new Float32Array(t));for(let t=0,i=r;t!==n;++t,i+=4)s.copy(e[t]).applyMatrix4(a,o),s.normal.toArray(c,i),c[i+3]=s.constant}l.value=c,l.needsUpdate=!0}return t.numPlanes=n,t.numIntersection=0,c}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let i=0!==e.length||t||0!==r||a;return a=t,r=e.length,i},this.beginShadows=function(){n=!0,c(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(e,t){i=c(e,t,0)},this.setState=function(s,o,h){let u=s.clippingPlanes,d=s.clipIntersection,p=s.clipShadows,f=e.get(s);if(a&&null!==u&&0!==u.length&&(!n||p)){let e=n?0:r,t=4*e,a=f.clippingState||null;l.value=a,a=c(u,o,t,h);for(let e=0;e!==t;++e)a[e]=i[e];f.clippingState=a,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=e}else n?c(null):(l.value!==i&&(l.value=i,l.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0)}}iS.set(-1,0,0,0,1,0,0,0,1);let iR=new OrthographicCamera,iC=new Color,iP=null,iL=0,iI=0,iN=!1,iD=new Vector3,iU=new Vector3;let PMREMGenerator=class PMREMGenerator{fromScene(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},{size:n=256,position:s=iD}=a;iP=this._renderer.getRenderTarget(),iL=this._renderer.getActiveCubeFace(),iI=this._renderer.getActiveMipmapLevel(),iN=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(n);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o,s),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._fromTexture(e,t)}fromCubemap(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._fromTexture(e,t)}compileCubemapShader(){null===this._cubemapMaterial&&(this._cubemapMaterial=iV(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){null===this._equirectMaterial&&(this._equirectMaterial=iB(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),null!==this._cubemapMaterial&&this._cubemapMaterial.dispose(),null!==this._equirectMaterial&&this._equirectMaterial.dispose(),null!==this._backgroundBox&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){null!==this._blurMaterial&&this._blurMaterial.dispose(),null!==this._ggxMaterial&&this._ggxMaterial.dispose(),null!==this._pingPongRenderTarget&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(iP,iL,iI),this._renderer.xr.enabled=iN,e.scissorTest=!1,iF(e,0,0,e.width,e.height)}_fromTexture(e,t){301===e.mapping||302===e.mapping?this._setSize(0===e.image.length?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),iP=this._renderer.getRenderTarget(),iL=this._renderer.getActiveCubeFace(),iI=this._renderer.getActiveMipmapLevel(),iN=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:g,depthBuffer:!1},r=iO(e,t,i);if(null===this._pingPongRenderTarget||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){var a,n;null!==this._pingPongRenderTarget&&this._dispose(),this._pingPongRenderTarget=iO(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=function(e){let t=[],i=[],r=e,a=e-4+1+6;for(let e=0;e<a;e++){let e=Math.pow(2,r);t.push(e);let a=1/(e-2),n=-a,s=1+a,o=[n,n,s,n,s,s,n,n,s,s,n,s],l=new Float32Array(108),c=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,i=e>2?0:-1,r=[t,i,0,t+2/3,i,0,t+2/3,i+1,0,t,i,0,t+2/3,i+1,0,t,i+1,0];l.set(r,18*e);for(let t=0;t<6;t++){let i=2*o[2*t]-1,r=2*o[2*t+1]-1;0===e?iU.set(1,r,i):1===e?iU.set(-i,1,-r):2===e?iU.set(-i,r,1):3===e?iU.set(-1,r,-i):4===e?iU.set(-i,-1,r):iU.set(i,r,-1),iU.toArray(c,(6*e+t)*3)}}let h=new BufferGeometry;h.setAttribute("position",new BufferAttribute(l,3)),h.setAttribute("outputDirection",new BufferAttribute(c,3)),i.push(new Mesh(h,null)),r>4&&r--}return{lodMeshes:i,sizeLods:t}}(r)),this._blurMaterial=(a=r,new ShaderMaterial({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:"".concat(a,".0")},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ik(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})),this._ggxMaterial=(n=r,new ShaderMaterial({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:"".concat(n,".0")},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ik(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1}))}return r}_compileMaterial(e){let t=new Mesh(new BufferGeometry,e);this._renderer.compile(t,iR)}_sceneToCubeUV(e,t,i,r,a){let n=new PerspectiveCamera(90,1,t,i),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(iC),l.toneMapping=0,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),null===this._backgroundBox&&(this._backgroundBox=new Mesh(new BoxGeometry,new MeshBasicMaterial({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));let u=this._backgroundBox,d=u.material,p=!1,f=e.background;f?f.isColor&&(d.color.copy(f),e.background=null,p=!0):(d.color.copy(iC),p=!0);for(let t=0;t<6;t++){let i=t%3;0===i?(n.up.set(0,s[t],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x+o[t],a.y,a.z)):1===i?(n.up.set(0,0,s[t]),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y+o[t],a.z)):(n.up.set(0,s[t],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y,a.z+o[t]));let c=this._cubeSize;iF(r,i*c,t>2?c:0,c,c),l.setRenderTarget(r),p&&l.render(u,n),l.render(e,n)}l.toneMapping=h,l.autoClear=c,e.background=f}_textureToCubeUV(e,t){let i=this._renderer,r=301===e.mapping||302===e.mapping;r?(null===this._cubemapMaterial&&(this._cubemapMaterial=iV()),this._cubemapMaterial.uniforms.flipEnvMap.value=!1===e.isRenderTargetTexture?-1:1):null===this._equirectMaterial&&(this._equirectMaterial=iB());let a=r?this._cubemapMaterial:this._equirectMaterial,n=this._lodMeshes[0];n.material=a,a.uniforms.envMap.value=e;let s=this._cubeSize;iF(t,0,0,3*s,2*s),i.setRenderTarget(t),i.render(n,iR)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,n=this._ggxMaterial,s=this._lodMeshes[i];s.material=n;let o=n.uniforms,l=i/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-c*c),{_lodMax:u}=this,d=this._sizeLods[i],p=3*d*(i>u-4?i-u+4:0),f=4*(this._cubeSize-d);o.envMap.value=e.texture,o.roughness.value=1.25*l*h,o.mipInt.value=u-t,iF(a,p,f,3*d,2*d),r.setRenderTarget(a),r.render(s,iR),o.envMap.value=a.texture,o.roughness.value=0,o.mipInt.value=u-i,iF(e,p,f,3*d,2*d),r.setRenderTarget(e),r.render(s,iR)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,n=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,n),this._blurPass(a,e,i,i,n)}_blurPass(e,t,i,r,a){let n=this._renderer,s=this._blurMaterial,o=this._lodMeshes[r];o.material=s;let l=s.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;let c=this._sizeLods[r];iF(t,3*c*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-c),3*c,2*c),n.setRenderTarget(t),n.render(o,iR)}constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}};function iO(e,t,i){let r=new WebGLRenderTarget(e,t,i);return r.texture.mapping=306,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function iF(e,t,i,r,a){e.viewport.set(t,i,r,a),e.scissor.set(t,i,r,a)}function iB(){return new ShaderMaterial({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ik(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function iV(){return new ShaderMaterial({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ik(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ik(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}let WebGLCubeRenderTarget=class WebGLCubeRenderTarget extends WebGLRenderTarget{fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new BoxGeometry(5,5,5),a=new ShaderMaterial({name:"CubemapFromEquirect",uniforms:tj(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let n=new Mesh(r,a),s=t.minFilter;return 1008===t.minFilter&&(t.minFilter=1006),new CubeCamera(1,10,this).update(e,n),t.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=!(arguments.length>3)||void 0===arguments[3]||arguments[3],a=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(a)}constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1};this.texture=new CubeTexture([i,i,i,i,i,i]),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}};function iG(e){let t=new WeakMap,i=new WeakMap,r=null;function a(e,t){return 303===t?e.mapping=301:304===t&&(e.mapping=302),e}function n(e){let i=e.target;i.removeEventListener("dispose",n);let r=t.get(i);void 0!==r&&(t.delete(i),r.dispose())}function s(e){let t=e.target;t.removeEventListener("dispose",s);let r=i.get(t);void 0!==r&&(i.delete(t),r.dispose())}return{get:function(o){let l=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return null==o?null:l?function(t){if(t&&t.isTexture){let a=t.mapping,n=303===a||304===a,o=301===a||302===a;if(n||o){let a=i.get(t),l=void 0!==a?a.texture.pmremVersion:0;if(t.isRenderTargetTexture&&t.pmremVersion!==l)return null===r&&(r=new PMREMGenerator(e)),(a=n?r.fromEquirectangular(t,a):r.fromCubemap(t,a)).texture.pmremVersion=t.pmremVersion,i.set(t,a),a.texture;{if(void 0!==a)return a.texture;let l=t.image;return n&&l&&l.height>0||o&&l&&function(e){let t=0;for(let i=0;i<6;i++)void 0!==e[i]&&t++;return 6===t}(l)?(null===r&&(r=new PMREMGenerator(e)),(a=n?r.fromEquirectangular(t):r.fromCubemap(t)).texture.pmremVersion=t.pmremVersion,i.set(t,a),t.addEventListener("dispose",s),a.texture):null}}}return t}(o):function(i){if(i&&i.isTexture){let r=i.mapping;if(303===r||304===r)if(t.has(i))return a(t.get(i).texture,i.mapping);else{let r=i.image;if(!r||!(r.height>0))return null;{let s=new WebGLCubeRenderTarget(r.height);return s.fromEquirectangularTexture(e,i),t.set(i,s),i.addEventListener("dispose",n),a(s.texture,i.mapping)}}}return i}(o)},dispose:function(){t=new WeakMap,i=new WeakMap,null!==r&&(r.dispose(),r=null)}}}function iz(e){let t={};function i(i){if(void 0!==t[i])return t[i];let r=e.getExtension(i);return t[i]=r,r}return{has:function(e){return null!==i(e)},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(e){let t=i(e);return null===t&&E("WebGLRenderer: "+e+" extension not supported."),t}}}function iH(e,t,i,r){let a={},n=new WeakMap;function s(e){let o=e.target;for(let e in null!==o.index&&t.remove(o.index),o.attributes)t.remove(o.attributes[e]);o.removeEventListener("dispose",s),delete a[o.id];let l=n.get(o);l&&(t.remove(l),n.delete(o)),r.releaseStatesOfGeometry(o),!0===o.isInstancedBufferGeometry&&delete o._maxInstanceCount,i.memory.geometries--}function o(e){let i=[],r=e.index,a=e.attributes.position,s=0;if(void 0===a)return;if(null!==r){let e=r.array;s=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],a=e[t+1],n=e[t+2];i.push(r,a,a,n,n,r)}}else{let e=a.array;s=a.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,a=t+2;i.push(e,r,r,a,a,e)}}let o=new(a.count>=65535?Uint32BufferAttribute:Uint16BufferAttribute)(i,1);o.version=s;let l=n.get(e);l&&t.remove(l),n.set(e,o)}return{get:function(e,t){return!0===a[t.id]||(t.addEventListener("dispose",s),a[t.id]=!0,i.memory.geometries++),t},update:function(i){let r=i.attributes;for(let i in r)t.update(r[i],e.ARRAY_BUFFER)},getWireframeAttribute:function(e){let t=n.get(e);if(t){let i=e.index;null!==i&&t.version<i.version&&o(e)}else o(e);return n.get(e)}}}function iW(e,t,i){let r,a,n;this.setMode=function(e){r=e},this.setIndex=function(e){a=e.type,n=e.bytesPerElement},this.render=function(t,s){e.drawElements(r,s,a,t*n),i.update(s,r,1)},this.renderInstances=function(t,s,o){0!==o&&(e.drawElementsInstanced(r,s,a,t*n,o),i.update(s,r,o))},this.renderMultiDraw=function(e,n,s){if(0===s)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,n,0,a,e,0,s);let o=0;for(let e=0;e<s;e++)o+=n[e];i.update(o,r,1)}}function iX(e){let t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function(){t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(i,r,a){switch(t.calls++,r){case e.TRIANGLES:t.triangles+=i/3*a;break;case e.LINES:t.lines+=i/2*a;break;case e.LINE_STRIP:t.lines+=a*(i-1);break;case e.LINE_LOOP:t.lines+=a*i;break;case e.POINTS:t.points+=a*i;break;default:T("WebGLInfo: Unknown draw mode:",r)}}}}function ij(e,t,i){let r=new WeakMap,a=new Vector4;return{update:function(n,s,o){let l=n.morphTargetInfluences,c=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,h=void 0!==c?c.length:0,u=r.get(s);if(void 0===u||u.count!==h){void 0!==u&&u.texture.dispose();let e=void 0!==s.morphAttributes.position,i=void 0!==s.morphAttributes.normal,n=void 0!==s.morphAttributes.color,o=s.morphAttributes.position||[],l=s.morphAttributes.normal||[],c=s.morphAttributes.color||[],d=0;!0===e&&(d=1),!0===i&&(d=2),!0===n&&(d=3);let p=s.attributes.position.count*d,f=1;p>t.maxTextureSize&&(f=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let m=new Float32Array(p*f*4*h),g=new DataArrayTexture(m,p,f,h);g.type=1015,g.needsUpdate=!0;let v=4*d;for(let t=0;t<h;t++){let r=o[t],s=l[t],h=c[t],u=p*f*4*t;for(let t=0;t<r.count;t++){let o=t*v;!0===e&&(a.fromBufferAttribute(r,t),m[u+o+0]=a.x,m[u+o+1]=a.y,m[u+o+2]=a.z,m[u+o+3]=0),!0===i&&(a.fromBufferAttribute(s,t),m[u+o+4]=a.x,m[u+o+5]=a.y,m[u+o+6]=a.z,m[u+o+7]=0),!0===n&&(a.fromBufferAttribute(h,t),m[u+o+8]=a.x,m[u+o+9]=a.y,m[u+o+10]=a.z,m[u+o+11]=4===h.itemSize?a.w:1)}}u={count:h,texture:g,size:new Vector2(p,f)},r.set(s,u),s.addEventListener("dispose",function e(){g.dispose(),r.delete(s),s.removeEventListener("dispose",e)})}if(!0===n.isInstancedMesh&&null!==n.morphTexture)o.getUniforms().setValue(e,"morphTexture",n.morphTexture,i);else{let t=0;for(let e=0;e<l.length;e++)t+=l[e];let i=s.morphTargetsRelative?1:1-t;o.getUniforms().setValue(e,"morphTargetBaseInfluence",i),o.getUniforms().setValue(e,"morphTargetInfluences",l)}o.getUniforms().setValue(e,"morphTargetsTexture",u.texture,i),o.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}}}function iq(e,t,i,r,a){let n=new WeakMap;function s(e){let t=e.target;t.removeEventListener("dispose",s),r.releaseStatesOfObject(t),i.remove(t.instanceMatrix),null!==t.instanceColor&&i.remove(t.instanceColor)}return{update:function(r){let o=a.render.frame,l=r.geometry,c=t.get(r,l);if(n.get(c)!==o&&(t.update(c),n.set(c,o)),r.isInstancedMesh&&(!1===r.hasEventListener("dispose",s)&&r.addEventListener("dispose",s),n.get(r)!==o&&(i.update(r.instanceMatrix,e.ARRAY_BUFFER),null!==r.instanceColor&&i.update(r.instanceColor,e.ARRAY_BUFFER),n.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;n.get(e)!==o&&(e.update(),n.set(e,o))}return c},dispose:function(){n=new WeakMap}}}let iY={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function iK(e,t,i,r,a,n){let s,o=new WebGLRenderTarget(t,i,{type:e,depthBuffer:a,stencilBuffer:n,samples:4*!!r,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,c=null,h=new BufferGeometry;h.setAttribute("position",new Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Float32BufferAttribute([0,2,0,0,2,0],2));let u=new RawShaderMaterial({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Mesh(h,u),p=new OrthographicCamera(-1,1,1,-1,0,1),f=null,m=null,g=!1,v=null,_=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),null!==l&&l.setSize(e,t),null!==c&&c.setSize(e,t);for(let i=0;i<_.length;i++){let r=_[i];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=(_=e).length>0&&!0===_[0].isRenderPass;let t=o.width,i=o.height;_.length>0&&null===l&&(l=new WebGLRenderTarget(t,i,{type:1016,depthBuffer:!1,stencilBuffer:!1}),c=new WebGLRenderTarget(t,i,{type:1016,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,i)}},this.begin=function(e,t){if(g||0===e.toneMapping&&0===_.length)return!1;if(v=t,null!==t){let e=t.width,i=t.height;(o.width!==e||o.height!==i)&&this.setSize(e,i)}return!1===y&&e.setRenderTarget(o),s=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=s,g=!0;let i=o,r=l;for(let a=0;a<_.length;a++){let n=_[a];!1!==n.enabled&&(n.render(e,r,i,t),!1!==n.needsSwap&&(i=r,r=r===l?c:l))}if(f!==e.outputColorSpace||m!==e.toneMapping){f=e.outputColorSpace,m=e.toneMapping,u.defines={},"srgb"===V.getTransfer(f)&&(u.defines.SRGB_TRANSFER="");let t=iY[m];t&&(u.defines[t]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=i.texture,e.setRenderTarget(v),e.render(d,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),null!==l&&l.dispose(),null!==c&&c.dispose(),h.dispose(),u.dispose()}}let iJ=new Texture,iZ=new DepthTexture(1,1),iQ=new DataArrayTexture,i$=new Data3DTexture,i0=new CubeTexture,i1=[],i3=[],i2=new Float32Array(16),i4=new Float32Array(9),i5=new Float32Array(4);function i6(e,t,i){let r=e[0];if(r<=0||r>0)return e;let a=t*i,n=i1[a];if(void 0===n&&(n=new Float32Array(a),i1[a]=n),0!==t){r.toArray(n,0);for(let r=1,a=0;r!==t;++r)a+=i,e[r].toArray(n,a)}return n}function i8(e,t){if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]!==t[i])return!1;return!0}function i9(e,t){for(let i=0,r=t.length;i<r;i++)e[i]=t[i]}function i7(e,t){let i=i3[t];void 0===i&&(i=new Int32Array(t),i3[t]=i);for(let r=0;r!==t;++r)i[r]=e.allocateTextureUnit();return i}function re(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function rt(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(i8(i,t))return;e.uniform2fv(this.addr,t),i9(i,t)}}function ri(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(void 0!==t.r)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(i8(i,t))return;e.uniform3fv(this.addr,t),i9(i,t)}}function rr(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(i8(i,t))return;e.uniform4fv(this.addr,t),i9(i,t)}}function ra(e,t){let i=this.cache,r=t.elements;if(void 0===r){if(i8(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),i9(i,t)}else{if(i8(i,r))return;i5.set(r),e.uniformMatrix2fv(this.addr,!1,i5),i9(i,r)}}function rn(e,t){let i=this.cache,r=t.elements;if(void 0===r){if(i8(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),i9(i,t)}else{if(i8(i,r))return;i4.set(r),e.uniformMatrix3fv(this.addr,!1,i4),i9(i,r)}}function rs(e,t){let i=this.cache,r=t.elements;if(void 0===r){if(i8(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),i9(i,t)}else{if(i8(i,r))return;i2.set(r),e.uniformMatrix4fv(this.addr,!1,i2),i9(i,r)}}function ro(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function rl(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(i8(i,t))return;e.uniform2iv(this.addr,t),i9(i,t)}}function rc(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(i8(i,t))return;e.uniform3iv(this.addr,t),i9(i,t)}}function rh(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(i8(i,t))return;e.uniform4iv(this.addr,t),i9(i,t)}}function ru(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function rd(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(i8(i,t))return;e.uniform2uiv(this.addr,t),i9(i,t)}}function rp(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(i8(i,t))return;e.uniform3uiv(this.addr,t),i9(i,t)}}function rf(e,t){let i=this.cache;if(void 0!==t.x)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(i8(i,t))return;e.uniform4uiv(this.addr,t),i9(i,t)}}function rm(e,t,i){let r,a=this.cache,n=i.allocateTextureUnit();a[0]!==n&&(e.uniform1i(this.addr,n),a[0]=n),this.type===e.SAMPLER_2D_SHADOW?(iZ.compareFunction=i.isReversedDepthBuffer()?518:515,r=iZ):r=iJ,i.setTexture2D(t||r,n)}function rg(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(t||i$,a)}function rv(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(t||i0,a)}function r_(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(t||iQ,a)}function ry(e,t){e.uniform1fv(this.addr,t)}function rx(e,t){let i=i6(t,this.size,2);e.uniform2fv(this.addr,i)}function rM(e,t){let i=i6(t,this.size,3);e.uniform3fv(this.addr,i)}function rS(e,t){let i=i6(t,this.size,4);e.uniform4fv(this.addr,i)}function rb(e,t){let i=i6(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function rT(e,t){let i=i6(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function rE(e,t){let i=i6(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function rw(e,t){e.uniform1iv(this.addr,t)}function rA(e,t){e.uniform2iv(this.addr,t)}function rR(e,t){e.uniform3iv(this.addr,t)}function rC(e,t){e.uniform4iv(this.addr,t)}function rP(e,t){e.uniform1uiv(this.addr,t)}function rL(e,t){e.uniform2uiv(this.addr,t)}function rI(e,t){e.uniform3uiv(this.addr,t)}function rN(e,t){e.uniform4uiv(this.addr,t)}function rD(e,t,i){let r,a=this.cache,n=t.length,s=i7(i,n);i8(a,s)||(e.uniform1iv(this.addr,s),i9(a,s)),r=this.type===e.SAMPLER_2D_SHADOW?iZ:iJ;for(let e=0;e!==n;++e)i.setTexture2D(t[e]||r,s[e])}function rU(e,t,i){let r=this.cache,a=t.length,n=i7(i,a);i8(r,n)||(e.uniform1iv(this.addr,n),i9(r,n));for(let e=0;e!==a;++e)i.setTexture3D(t[e]||i$,n[e])}function rO(e,t,i){let r=this.cache,a=t.length,n=i7(i,a);i8(r,n)||(e.uniform1iv(this.addr,n),i9(r,n));for(let e=0;e!==a;++e)i.setTextureCube(t[e]||i0,n[e])}function rF(e,t,i){let r=this.cache,a=t.length,n=i7(i,a);i8(r,n)||(e.uniform1iv(this.addr,n),i9(r,n));for(let e=0;e!==a;++e)i.setTexture2DArray(t[e]||iQ,n[e])}let SingleUniform=class SingleUniform{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=function(e){switch(e){case 5126:return re;case 35664:return rt;case 35665:return ri;case 35666:return rr;case 35674:return ra;case 35675:return rn;case 35676:return rs;case 5124:case 35670:return ro;case 35667:case 35671:return rl;case 35668:case 35672:return rc;case 35669:case 35673:return rh;case 5125:return ru;case 36294:return rd;case 36295:return rp;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return rv;case 36289:case 36303:case 36311:case 36292:return r_}}(t.type)}};let PureArrayUniform=class PureArrayUniform{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(e){switch(e){case 5126:return ry;case 35664:return rx;case 35665:return rM;case 35666:return rS;case 35674:return rb;case 35675:return rT;case 35676:return rE;case 5124:case 35670:return rw;case 35667:case 35671:return rA;case 35668:case 35672:return rR;case 35669:case 35673:return rC;case 5125:return rP;case 36294:return rL;case 36295:return rI;case 36296:return rN;case 35678:case 36198:case 36298:case 36306:case 35682:return rD;case 35679:case 36299:case 36307:return rU;case 35680:case 36300:case 36308:case 36293:return rO;case 36289:case 36303:case 36311:case 36292:return rF}}(t.type)}};let StructuredUniform=class StructuredUniform{setValue(e,t,i){let r=this.seq;for(let a=0,n=r.length;a!==n;++a){let n=r[a];n.setValue(e,t[n.id],i)}}constructor(e){this.id=e,this.seq=[],this.map={}}};let rB=/(\w+)(\])?(\[|\.)?/g;function rV(e,t){e.seq.push(t),e.map[t.id]=t}let WebGLUniforms=class WebGLUniforms{setValue(e,t,i,r){let a=this.map[t];void 0!==a&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];void 0!==r&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,n=t.length;a!==n;++a){let n=t[a],s=i[n.id];!1!==s.needsUpdate&&n.setValue(e,s.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let a=e[r];a.id in t&&i.push(a)}return i}constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let i=e.getActiveUniform(t,r),a=e.getUniformLocation(t,i.name);!function(e,t,i){let r=e.name,a=r.length;for(rB.lastIndex=0;;){let n=rB.exec(r),s=rB.lastIndex,o=n[1],l="]"===n[2],c=n[3];if(l&&(o|=0),void 0===c||"["===c&&s+2===a){rV(i,void 0===c?new SingleUniform(o,e,t):new PureArrayUniform(o,e,t));break}{let e=i.map[o];void 0===e&&rV(i,e=new StructuredUniform(o)),i=e}}}(i,a,this)}let r=[],a=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):a.push(t);r.length>0&&(this.seq=r.concat(a))}};function rk(e,t,i){let r=e.createShader(t);return e.shaderSource(r,i),e.compileShader(r),r}let rG=0,rz=new Matrix3;function rH(e,t,i){let r=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(r&&""===a)return"";let n=/ERROR: 0:(\d+)/.exec(a);if(!n)return a;{let r=parseInt(n[1]);return i.toUpperCase()+`

`+a+`

`+function(e,t){let i=e.split(`
`),r=[],a=Math.max(t-6,0),n=Math.min(t+6,i.length);for(let e=a;e<n;e++){let a=e+1;r.push("".concat(a===t?">":" "," ").concat(a,": ").concat(i[e]))}return r.join(`
`)}(e.getShaderSource(t),r)}}let rW={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"},rX=new Vector3;function rj(e){return""!==e}function rq(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rY(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}let rK=/^[ \t]*#include +<([\w\d./]+)>/gm;function rJ(e){return e.replace(rK,rQ)}let rZ=new Map;function rQ(e,t){let i=iv[t];if(void 0===i){let e=rZ.get(t);if(void 0!==e)i=iv[e],b('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,e);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return rJ(i)}let r$=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function r0(e){return e.replace(r$,r1)}function r1(e,t,i,r){let a="";for(let e=parseInt(t);e<parseInt(i);e++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+e+" ]").replace(/UNROLLED_LOOP_INDEX/g,e);return a}function r3(e){let t="precision ".concat(e.precision,` float;
	precision `).concat(e.precision,` int;
	precision `).concat(e.precision,` sampler2D;
	precision `).concat(e.precision,` samplerCube;
	precision `).concat(e.precision,` sampler3D;
	precision `).concat(e.precision,` sampler2DArray;
	precision `).concat(e.precision,` sampler2DShadow;
	precision `).concat(e.precision,` samplerCubeShadow;
	precision `).concat(e.precision,` sampler2DArrayShadow;
	precision `).concat(e.precision,` isampler2D;
	precision `).concat(e.precision,` isampler3D;
	precision `).concat(e.precision,` isamplerCube;
	precision `).concat(e.precision,` isampler2DArray;
	precision `).concat(e.precision,` usampler2D;
	precision `).concat(e.precision,` usampler3D;
	precision `).concat(e.precision,` usamplerCube;
	precision `).concat(e.precision,` usampler2DArray;
	`);return"highp"===e.precision?t+=`
#define HIGH_PRECISION`:"mediump"===e.precision?t+=`
#define MEDIUM_PRECISION`:"lowp"===e.precision&&(t+=`
#define LOW_PRECISION`),t}let r2={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"},r4={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"},r5={302:"ENVMAP_MODE_REFRACTION"},r6={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function r8(e,t,i,r){var a,n;let s,o,l,c,h=e.getContext(),u=i.defines,d=i.vertexShader,p=i.fragmentShader,f=r2[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC",m=!1===i.envMap?"ENVMAP_TYPE_CUBE":r4[i.envMapMode]||"ENVMAP_TYPE_CUBE",g=!1===i.envMap?"ENVMAP_MODE_REFLECTION":r5[i.envMapMode]||"ENVMAP_MODE_REFLECTION",v=!1===i.envMap?"ENVMAP_BLENDING_NONE":r6[i.combine]||"ENVMAP_BLENDING_NONE",_=function(e){let t=e.envMapCubeUVHeight;if(null===t)return null;let i=Math.log2(t)-2;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:1/t,maxMip:i}}(i),y=[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rj).join(`
`),x=function(e){let t=[];for(let i in e){let r=e[i];!1!==r&&t.push("#define "+i+" "+r)}return t.join(`
`)}(u),M=h.createProgram(),S=i.glslVersion?"#version "+i.glslVersion+`
`:"";if(i.isRawShaderMaterial)(s=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x].filter(rj).join(`
`)).length>0&&(s+=`
`),(o=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x].filter(rj).join(`
`)).length>0&&(o+=`
`);else{let e,t,r,l,c;s=[r3(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&!1===i.flatShading?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&!1===i.flatShading?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+f:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rj).join(`
`),o=[r3(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,x,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&!1===i.flatShading?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+f:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",0!==i.toneMapping?"#define TONE_MAPPING":"",0!==i.toneMapping?iv.tonemapping_pars_fragment:"",0!==i.toneMapping?(a="toneMapping",void 0===(e=rW[n=i.toneMapping])?(b("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+a+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",iv.colorspace_pars_fragment,(t=function(e){V._getMatrix(rz,V.workingColorSpace,e);let t="mat3( ".concat(rz.elements.map(e=>e.toFixed(4))," )");switch(V.getTransfer(e)){case"linear":return[t,"LinearTransferOETF"];case"srgb":return[t,"sRGBTransferOETF"];default:return b("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}(i.outputColorSpace),["vec4 ".concat("linearToOutputTexel","( vec4 value ) {"),"	return ".concat(t[1],"( vec4( value.rgb * ").concat(t[0],", value.a ) );"),"}"].join(`
`)),(V.getLuminanceCoefficients(rX),r=rX.x.toFixed(4),l=rX.y.toFixed(4),c=rX.z.toFixed(4),["float luminance( const in vec3 rgb ) {","	const vec3 weights = vec3( ".concat(r,", ").concat(l,", ").concat(c," );"),`	return dot( weights, rgb );
}`].join(`
`)),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(rj).join(`
`)}d=rY(d=rq(d=rJ(d),i),i),p=rY(p=rq(p=rJ(p),i),i),d=r0(d),p=r0(p),!0!==i.isRawShaderMaterial&&(S=`#version 300 es
`,s=[y,`#define attribute in
#define varying out
#define texture2D texture`].join(`
`)+`
`+s,o=["#define varying in","300 es"===i.glslVersion?"":"layout(location = 0) out highp vec4 pc_fragColor;","300 es"===i.glslVersion?"":"#define gl_FragColor pc_fragColor",`#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+o);let E=S+s+d,w=S+o+p,A=rk(h,h.VERTEX_SHADER,E),R=rk(h,h.FRAGMENT_SHADER,w);function C(t){if(e.debug.checkShaderErrors){let i=h.getProgramInfoLog(M)||"",r=h.getShaderInfoLog(A)||"",a=h.getShaderInfoLog(R)||"",n=i.trim(),l=r.trim(),c=a.trim(),u=!0,d=!0;if(!1===h.getProgramParameter(M,h.LINK_STATUS))if(u=!1,"function"==typeof e.debug.onShaderError)e.debug.onShaderError(h,M,A,R);else{let e=rH(h,A,"vertex"),i=rH(h,R,"fragment");T("WebGLProgram: Shader Error "+h.getError()+" - VALIDATE_STATUS "+h.getProgramParameter(M,h.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+n+`
`+e+`
`+i)}else""!==n?b("WebGLProgram: Program Info Log:",n):(""===l||""===c)&&(d=!1);d&&(t.diagnostics={runnable:u,programLog:n,vertexShader:{log:l,prefix:s},fragmentShader:{log:c,prefix:o}})}h.deleteShader(A),h.deleteShader(R),l=new WebGLUniforms(h,M),c=function(e,t){let i={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let r=e.getActiveAttrib(t,a),n=r.name,s=1;r.type===e.FLOAT_MAT2&&(s=2),r.type===e.FLOAT_MAT3&&(s=3),r.type===e.FLOAT_MAT4&&(s=4),i[n]={type:r.type,location:e.getAttribLocation(t,n),locationSize:s}}return i}(h,M)}h.attachShader(M,A),h.attachShader(M,R),void 0!==i.index0AttributeName?h.bindAttribLocation(M,0,i.index0AttributeName):!0===i.hasPositionAttribute&&h.bindAttribLocation(M,0,"position"),h.linkProgram(M),this.getUniforms=function(){return void 0===l&&C(this),l},this.getAttributes=function(){return void 0===c&&C(this),c};let P=!1===i.rendererExtensionParallelShaderCompile;return this.isReady=function(){return!1===P&&(P=h.getProgramParameter(M,37297)),P},this.destroy=function(){r.releaseStatesOfProgram(this),h.deleteProgram(M),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=rG++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=R,this}let r9=0;let WebGLShaderCache=class WebGLShaderCache{update(e,t,i){let r=this._getShaderCacheForMaterial(e);return!1===r.has(t)&&(r.add(t),t.usedTimes++),!1===r.has(i)&&(r.add(i),i.usedTimes++),this}remove(e){for(let t of this.materialCache.get(e))t.usedTimes--,0===t.usedTimes&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return void 0===i&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return void 0===i&&(i=new WebGLShaderStage(e),t.set(e,i)),i}constructor(){this.shaderCache=new Map,this.materialCache=new Map}};let WebGLShaderStage=class WebGLShaderStage{constructor(e){this.id=r9++,this.code=e,this.usedTimes=0}};function r7(e,t,i,r,a,n){let s=new Layers,o=new WebGLShaderCache,l=new Set,c=[],h=new Map,u=r.logarithmicDepthBuffer,d=r.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(e){return(l.add(e),0===e)?"uv":"uv".concat(e)}return{getParameters:function(a,s,c,h,m,g){var v;let _,y,x,M,S=h.fog,T=m.geometry,E=a.isMeshStandardMaterial||a.isMeshLambertMaterial||a.isMeshPhongMaterial?h.environment:null,w=a.isMeshStandardMaterial||a.isMeshLambertMaterial&&!a.envMap||a.isMeshPhongMaterial&&!a.envMap,A=t.get(a.envMap||E,w),R=A&&306===A.mapping?A.image.height:null,C=p[a.type];null!==a.precision&&(d=r.getMaxPrecision(a.precision))!==a.precision&&b("WebGLProgram.getParameters:",a.precision,"not supported, using",d,"instead.");let P=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,L=void 0!==P?P.length:0,I=0;if(void 0!==T.morphAttributes.position&&(I=1),void 0!==T.morphAttributes.normal&&(I=2),void 0!==T.morphAttributes.color&&(I=3),C){let e=iy[C];_=e.vertexShader,y=e.fragmentShader}else{_=a.vertexShader,y=a.fragmentShader;let e=o.getVertexShaderStage(a),t=o.getFragmentShaderStage(a);o.update(a,e,t),x=e.id,M=t.id}let N=e.getRenderTarget(),D=e.state.buffers.depth.getReversed(),U=!0===m.isInstancedMesh,O=!0===m.isBatchedMesh,F=!!a.map,B=!!a.matcap,k=!!A,G=!!a.aoMap,z=!!a.lightMap,H=!!a.bumpMap&&!1===a.wireframe,W=!!a.normalMap,X=!!a.displacementMap,j=!!a.emissiveMap,q=!!a.metalnessMap,Y=!!a.roughnessMap,K=a.anisotropy>0,J=a.clearcoat>0,Z=a.dispersion>0,Q=a.retroreflectivity>0,$=a.iridescence>0,ee=a.sheen>0,et=a.transmission>0,ei=K&&!!a.anisotropyMap,er=J&&!!a.clearcoatMap,ea=J&&!!a.clearcoatNormalMap,en=J&&!!a.clearcoatRoughnessMap,es=$&&!!a.iridescenceMap,eo=$&&!!a.iridescenceThicknessMap,el=ee&&!!a.sheenColorMap,ec=ee&&!!a.sheenRoughnessMap,eh=!!a.specularMap,eu=!!a.specularColorMap,ed=!!a.specularIntensityMap,ep=et&&!!a.transmissionMap,ef=et&&!!a.thicknessMap,em=!!a.gradientMap,eg=!!a.alphaMap,ev=a.alphaTest>0,e_=!!a.alphaHash,ey=!!a.extensions,ex=0;a.toneMapped&&(null===N||!0===N.isXRRenderTarget)&&(ex=e.toneMapping);let eM={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:_,fragmentShader:y,defines:a.defines,customVertexShaderID:x,customFragmentShaderID:M,isRawShaderMaterial:!0===a.isRawShaderMaterial,glslVersion:a.glslVersion,precision:d,batching:O,batchingColor:O&&null!==m._colorsTexture,instancing:U,instancingColor:U&&null!==m.instanceColor,instancingMorph:U&&null!==m.morphTexture,outputColorSpace:null===N?e.outputColorSpace:!0===N.isXRRenderTarget?N.texture.colorSpace:V.workingColorSpace,alphaToCoverage:!!a.alphaToCoverage,map:F,matcap:B,envMap:k,envMapMode:k&&A.mapping,envMapCubeUVHeight:R,aoMap:G,lightMap:z,bumpMap:H,normalMap:W,displacementMap:X,emissiveMap:j,normalMapObjectSpace:W&&1===a.normalMapType,normalMapTangentSpace:W&&0===a.normalMapType,packedNormalMap:W&&0===a.normalMapType&&(1030===(v=a.normalMap.format)||37490===v||36285===v),metalnessMap:q,roughnessMap:Y,anisotropy:K,anisotropyMap:ei,clearcoat:J,clearcoatMap:er,clearcoatNormalMap:ea,clearcoatRoughnessMap:en,dispersion:Z,retroreflection:Q,iridescence:$,iridescenceMap:es,iridescenceThicknessMap:eo,sheen:ee,sheenColorMap:el,sheenRoughnessMap:ec,specularMap:eh,specularColorMap:eu,specularIntensityMap:ed,transmission:et,transmissionMap:ep,thicknessMap:ef,gradientMap:em,opaque:!1===a.transparent&&1===a.blending&&!1===a.alphaToCoverage,alphaMap:eg,alphaTest:ev,alphaHash:e_,combine:a.combine,mapUv:F&&f(a.map.channel),aoMapUv:G&&f(a.aoMap.channel),lightMapUv:z&&f(a.lightMap.channel),bumpMapUv:H&&f(a.bumpMap.channel),normalMapUv:W&&f(a.normalMap.channel),displacementMapUv:X&&f(a.displacementMap.channel),emissiveMapUv:j&&f(a.emissiveMap.channel),metalnessMapUv:q&&f(a.metalnessMap.channel),roughnessMapUv:Y&&f(a.roughnessMap.channel),anisotropyMapUv:ei&&f(a.anisotropyMap.channel),clearcoatMapUv:er&&f(a.clearcoatMap.channel),clearcoatNormalMapUv:ea&&f(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:en&&f(a.clearcoatRoughnessMap.channel),iridescenceMapUv:es&&f(a.iridescenceMap.channel),iridescenceThicknessMapUv:eo&&f(a.iridescenceThicknessMap.channel),sheenColorMapUv:el&&f(a.sheenColorMap.channel),sheenRoughnessMapUv:ec&&f(a.sheenRoughnessMap.channel),specularMapUv:eh&&f(a.specularMap.channel),specularColorMapUv:eu&&f(a.specularColorMap.channel),specularIntensityMapUv:ed&&f(a.specularIntensityMap.channel),transmissionMapUv:ep&&f(a.transmissionMap.channel),thicknessMapUv:ef&&f(a.thicknessMap.channel),alphaMapUv:eg&&f(a.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(W||K),vertexNormals:!!T.attributes.normal,vertexColors:a.vertexColors,vertexAlphas:!0===a.vertexColors&&!!T.attributes.color&&4===T.attributes.color.itemSize,pointsUvs:!0===m.isPoints&&!!T.attributes.uv&&(F||eg),fog:!!S,useFog:!0===a.fog,fogExp2:!!S&&S.isFogExp2,flatShading:!1===a.wireframe&&(!0===a.flatShading||void 0===T.attributes.normal&&!1===W&&(a.isMeshLambertMaterial||a.isMeshPhongMaterial||a.isMeshStandardMaterial||a.isMeshPhysicalMaterial)),sizeAttenuation:!0===a.sizeAttenuation,logarithmicDepthBuffer:u,reversedDepthBuffer:D,skinning:!0===m.isSkinnedMesh,hasPositionAttribute:void 0!==T.attributes.position,morphTargets:void 0!==T.morphAttributes.position,morphNormals:void 0!==T.morphAttributes.normal,morphColors:void 0!==T.morphAttributes.color,morphTargetsCount:L,morphTextureStride:I,numSunLights:s.sun.length,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numSunLightShadows:s.sunShadowMap.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&c.length>0,shadowMapType:e.shadowMap.type,toneMapping:ex,decodeVideoTexture:F&&!0===a.map.isVideoTexture&&"srgb"===V.getTransfer(a.map.colorSpace),decodeVideoTextureEmissive:j&&!0===a.emissiveMap.isVideoTexture&&"srgb"===V.getTransfer(a.emissiveMap.colorSpace),premultipliedAlpha:a.premultipliedAlpha,doubleSided:2===a.side,flipSided:1===a.side,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:ey&&!0===a.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ey&&!0===a.extensions.multiDraw||O)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:a.customProgramCacheKey()};return eM.vertexUv1s=l.has(1),eM.vertexUv2s=l.has(2),eM.vertexUv3s=l.has(3),l.clear(),eM},getProgramCacheKey:function(t){var i,r,a,n;let o=[];if(t.shaderID?o.push(t.shaderID):(o.push(t.customVertexShaderID),o.push(t.customFragmentShaderID)),void 0!==t.defines)for(let e in t.defines)o.push(e),o.push(t.defines[e]);return!1===t.isRawShaderMaterial&&(i=o,r=t,i.push(r.precision),i.push(r.outputColorSpace),i.push(r.envMapMode),i.push(r.envMapCubeUVHeight),i.push(r.mapUv),i.push(r.alphaMapUv),i.push(r.lightMapUv),i.push(r.aoMapUv),i.push(r.bumpMapUv),i.push(r.normalMapUv),i.push(r.displacementMapUv),i.push(r.emissiveMapUv),i.push(r.metalnessMapUv),i.push(r.roughnessMapUv),i.push(r.anisotropyMapUv),i.push(r.clearcoatMapUv),i.push(r.clearcoatNormalMapUv),i.push(r.clearcoatRoughnessMapUv),i.push(r.iridescenceMapUv),i.push(r.iridescenceThicknessMapUv),i.push(r.sheenColorMapUv),i.push(r.sheenRoughnessMapUv),i.push(r.specularMapUv),i.push(r.specularColorMapUv),i.push(r.specularIntensityMapUv),i.push(r.transmissionMapUv),i.push(r.thicknessMapUv),i.push(r.combine),i.push(r.fogExp2),i.push(r.sizeAttenuation),i.push(r.morphTargetsCount),i.push(r.morphAttributeCount),i.push(r.numSunLights),i.push(r.numDirLights),i.push(r.numPointLights),i.push(r.numSpotLights),i.push(r.numSpotLightMaps),i.push(r.numHemiLights),i.push(r.numRectAreaLights),i.push(r.numSunLightShadows),i.push(r.numDirLightShadows),i.push(r.numPointLightShadows),i.push(r.numSpotLightShadows),i.push(r.numSpotLightShadowsWithMaps),i.push(r.numLightProbes),i.push(r.shadowMapType),i.push(r.toneMapping),i.push(r.numClippingPlanes),i.push(r.numClipIntersection),i.push(r.depthPacking),a=o,n=t,s.disableAll(),n.instancing&&s.enable(0),n.instancingColor&&s.enable(1),n.instancingMorph&&s.enable(2),n.matcap&&s.enable(3),n.envMap&&s.enable(4),n.normalMapObjectSpace&&s.enable(5),n.normalMapTangentSpace&&s.enable(6),n.clearcoat&&s.enable(7),n.iridescence&&s.enable(8),n.alphaTest&&s.enable(9),n.vertexColors&&s.enable(10),n.vertexAlphas&&s.enable(11),n.vertexUv1s&&s.enable(12),n.vertexUv2s&&s.enable(13),n.vertexUv3s&&s.enable(14),n.vertexTangents&&s.enable(15),n.anisotropy&&s.enable(16),n.alphaHash&&s.enable(17),n.batching&&s.enable(18),n.dispersion&&s.enable(19),n.retroreflection&&s.enable(24),n.batchingColor&&s.enable(20),n.gradientMap&&s.enable(21),n.packedNormalMap&&s.enable(22),n.vertexNormals&&s.enable(23),a.push(s.mask),s.disableAll(),n.fog&&s.enable(0),n.useFog&&s.enable(1),n.flatShading&&s.enable(2),n.logarithmicDepthBuffer&&s.enable(3),n.reversedDepthBuffer&&s.enable(4),n.skinning&&s.enable(5),n.morphTargets&&s.enable(6),n.morphNormals&&s.enable(7),n.morphColors&&s.enable(8),n.premultipliedAlpha&&s.enable(9),n.shadowMapEnabled&&s.enable(10),n.doubleSided&&s.enable(11),n.flipSided&&s.enable(12),n.useDepthPacking&&s.enable(13),n.dithering&&s.enable(14),n.transmission&&s.enable(15),n.sheen&&s.enable(16),n.opaque&&s.enable(17),n.pointsUvs&&s.enable(18),n.decodeVideoTexture&&s.enable(19),n.decodeVideoTextureEmissive&&s.enable(20),n.alphaToCoverage&&s.enable(21),n.numLightProbeGrids>0&&s.enable(22),n.hasPositionAttribute&&s.enable(23),a.push(s.mask),o.push(e.outputColorSpace)),o.push(t.customProgramCacheKey),o.join()},getUniforms:function(e){let t,i=p[e.type];return t=i?tj(iy[i].uniforms):e.uniforms},acquireProgram:function(t,i){let r=h.get(i);return void 0!==r?++r.usedTimes:(r=new r8(e,i,t,a),c.push(r),h.set(i,r)),r},releaseProgram:function(e){if(0==--e.usedTimes){let t=c.indexOf(e);c[t]=c[c.length-1],c.pop(),h.delete(e.cacheKey),e.destroy()}},releaseShaderCache:function(e){o.remove(e)},programs:c,dispose:function(){o.dispose()}}}function ae(){let e=new WeakMap;return{has:function(t){return e.has(t)},get:function(t){let i=e.get(t);return void 0===i&&(i={},e.set(t,i)),i},remove:function(t){e.delete(t)},update:function(t,i,r){e.get(t)[i]=r},dispose:function(){e=new WeakMap}}}function at(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;if(e.material.id!==t.material.id)return e.material.id-t.material.id;if(e.materialVariant!==t.materialVariant)return e.materialVariant-t.materialVariant;if(e.z!==t.z)return e.z-t.z;else return e.id-t.id}function ai(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function ar(){let e=[],t=0,i=[],r=[],a=[];function n(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(i,r,a,s,o,l){let c=e[t];return void 0===c?(c={id:i.id,object:i,geometry:r,material:a,materialVariant:n(i),groupOrder:s,renderOrder:i.renderOrder,z:o,group:l},e[t]=c):(c.id=i.id,c.object=i,c.geometry=r,c.material=a,c.materialVariant=n(i),c.groupOrder=s,c.renderOrder=i.renderOrder,c.z=o,c.group=l),t++,c}return{opaque:i,transmissive:r,transparent:a,init:function(){t=0,i.length=0,r.length=0,a.length=0},push:function(e,t,n,o,l,c,h){!0===h.reversedDepth&&(l=-l);let u=s(e,t,n,o,l,c);n.transmission>0?r.push(u):!0===n.transparent?a.push(u):i.push(u)},unshift:function(e,t,n,o,l,c){let h=s(e,t,n,o,l,c);n.transmission>0?r.unshift(h):!0===n.transparent?a.unshift(h):i.unshift(h)},finish:function(){for(let i=t,r=e.length;i<r;i++){let t=e[i];if(null===t.id)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}},sort:function(e,t){i.length>1&&i.sort(e||at),r.length>1&&r.sort(t||ai),a.length>1&&a.sort(t||ai)}}}function aa(){let e=new WeakMap;return{get:function(t,i){let r,a=e.get(t);return void 0===a?(r=new ar,e.set(t,[r])):i>=a.length?(r=new ar,a.push(r)):r=a[i],r},dispose:function(){e=new WeakMap}}}function an(){let e={};return{get:function(t){let i;if(void 0!==e[t.id])return e[t.id];switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new Vector3,color:new Color};break;case"SpotLight":i={position:new Vector3,direction:new Vector3,color:new Color,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Vector3,color:new Color,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Vector3,skyColor:new Color,groundColor:new Color};break;case"RectAreaLight":i={color:new Color,position:new Vector3,halfWidth:new Vector3,halfHeight:new Vector3}}return e[t.id]=i,i}}}let as=0;function ao(e,t){return 2*!!t.castShadow-2*!!e.castShadow+ +!!t.map-!!e.map}function al(e){let t,i=new an,r=(t={},{get:function(e){let i;if(void 0!==t[e.id])return t[e.id];switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2,shadowCameraNear:1,shadowCameraFar:1e3}}return t[e.id]=i,i}}),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)a.probe.push(new Vector3);let n=new Vector3,s=new Matrix4,o=new Matrix4;return{setup:function(t){let n=0,s=0,o=0;for(let e=0;e<9;e++)a.probe[e].set(0,0,0);let l=0,c=0,h=0,u=0,d=0,p=0,f=0,m=0,g=0,v=0,_=0,y=0,x=0,M=0;t.sort(ao);for(let e=0,S=t.length;e<S;e++){let S=t[e],b=S.color,T=S.intensity,E=S.distance,w=null;if(S.shadow&&S.shadow.map&&(w=1030===S.shadow.map.texture.format?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)n+=b.r*T,s+=b.g*T,o+=b.b*T;else if(S.isLightProbe){for(let e=0;e<9;e++)a.probe[e].addScaledVector(S.sh.coefficients[e],T);M++}else if(S.isSunLight){let e=i.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),a.sunShadow[c]=t,a.sunShadowMap[c]=w;let i=e.getViewportCount();for(let t=0;t<i;t++)a.sunShadowMatrix[h+t]=e.getMatrix(t),a.sunShadowCascade[h+t]=e._cascadeData[t];h+=i,c++}a.sun[l]=e,l++}else if(S.isDirectionalLight){let e=i.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,a.directionalShadow[u]=t,a.directionalShadowMap[u]=w,a.directionalShadowMatrix[u]=S.shadow.matrix,g++}a.directional[u]=e,u++}else if(S.isSpotLight){let e=i.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(b).multiplyScalar(T),e.distance=E,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,a.spot[p]=e;let t=S.shadow;if(S.map&&(a.spotLightMap[y]=S.map,y++,t.updateMatrices(S),S.castShadow&&x++),a.spotLightMatrix[p]=t.matrix,S.castShadow){let e=r.get(S);e.shadowIntensity=t.intensity,e.shadowBias=t.bias,e.shadowNormalBias=t.normalBias,e.shadowRadius=t.radius,e.shadowMapSize=t.mapSize,a.spotShadow[p]=e,a.spotShadowMap[p]=w,_++}p++}else if(S.isRectAreaLight){let e=i.get(S);e.color.copy(b).multiplyScalar(T),e.halfWidth.set(.5*S.width,0,0),e.halfHeight.set(0,.5*S.height,0),a.rectArea[f]=e,f++}else if(S.isPointLight){let e=i.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=r.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,a.pointShadow[d]=t,a.pointShadowMap[d]=w,a.pointShadowMatrix[d]=S.shadow.matrix,v++}a.point[d]=e,d++}else if(S.isHemisphereLight){let e=i.get(S);e.skyColor.copy(S.color).multiplyScalar(T),e.groundColor.copy(S.groundColor).multiplyScalar(T),a.hemi[m]=e,m++}}f>0&&(!0===e.has("OES_texture_float_linear")?(a.rectAreaLTC1=i_.LTC_FLOAT_1,a.rectAreaLTC2=i_.LTC_FLOAT_2):(a.rectAreaLTC1=i_.LTC_HALF_1,a.rectAreaLTC2=i_.LTC_HALF_2)),a.ambient[0]=n,a.ambient[1]=s,a.ambient[2]=o;let S=a.hash;(S.sunLength!==l||S.directionalLength!==u||S.pointLength!==d||S.spotLength!==p||S.rectAreaLength!==f||S.hemiLength!==m||S.numSunShadows!==c||S.numDirectionalShadows!==g||S.numPointShadows!==v||S.numSpotShadows!==_||S.numSpotMaps!==y||S.numLightProbes!==M)&&(a.sun.length=l,a.directional.length=u,a.spot.length=p,a.rectArea.length=f,a.point.length=d,a.hemi.length=m,a.sunShadow.length=c,a.sunShadowMap.length=c,a.sunShadowMatrix.length=h,a.sunShadowCascade.length=h,a.directionalShadow.length=g,a.directionalShadowMap.length=g,a.directionalShadowMatrix.length=g,a.pointShadow.length=v,a.pointShadowMap.length=v,a.pointShadowMatrix.length=v,a.spotShadow.length=_,a.spotShadowMap.length=_,a.spotLightMatrix.length=_+y-x,a.spotLightMap.length=y,a.numSpotLightShadowsWithMaps=x,a.numLightProbes=M,S.sunLength=l,S.directionalLength=u,S.pointLength=d,S.spotLength=p,S.rectAreaLength=f,S.hemiLength=m,S.numSunShadows=c,S.numDirectionalShadows=g,S.numPointShadows=v,S.numSpotShadows=_,S.numSpotMaps=y,S.numLightProbes=M,a.version=as++)},setupView:function(e,t){let i=0,r=0,l=0,c=0,h=0,u=0,d=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=a.sun[i];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(d),i++}else if(p.isDirectionalLight){let e=a.directional[r];e.direction.setFromMatrixPosition(p.matrixWorld),n.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(n),e.direction.transformDirection(d),r++}else if(p.isSpotLight){let e=a.spot[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(p.matrixWorld),n.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(n),e.direction.transformDirection(d),c++}else if(p.isRectAreaLight){let e=a.rectArea[h];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(d),o.identity(),s.copy(p.matrixWorld),s.premultiply(d),o.extractRotation(s),e.halfWidth.set(.5*p.width,0,0),e.halfHeight.set(0,.5*p.height,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),h++}else if(p.isPointLight){let e=a.point[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(d),l++}else if(p.isHemisphereLight){let e=a.hemi[u];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(d),u++}}},state:a}}function ac(e){let t=new al(e),i=[],r=[],a=[],n={lightsArray:i,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:function(e){n.camera=e,i.length=0,r.length=0,a.length=0},state:n,setupLights:function(){t.setup(i)},setupLightsView:function(e){t.setupView(i,e)},pushLight:function(e){i.push(e)},pushShadow:function(e){r.push(e)},pushLightProbeGrid:function(e){a.push(e)}}}function ah(e){let t=new WeakMap;return{get:function(i){let r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=t.get(i);return void 0===n?(r=new ac(e),t.set(i,[r])):a>=n.length?(r=new ac(e),n.push(r)):r=n[a],r},dispose:function(){t=new WeakMap}}}let au=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ad=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ap=[new Vector3(1,0,0),new Vector3(-1,0,0),new Vector3(0,1,0),new Vector3(0,-1,0),new Vector3(0,0,1),new Vector3(0,0,-1)],af=[new Vector3(0,-1,0),new Vector3(0,-1,0),new Vector3(0,0,1),new Vector3(0,0,-1),new Vector3(0,-1,0),new Vector3(0,-1,0)],am=new Matrix4,ag=new Vector3,av=new Vector3;function a_(e,t,i){let r=new Frustum,a=new Vector2,n=new Vector2,s=new Vector4,o=new MeshDepthMaterial,l=new MeshDistanceMaterial,c={},h=i.maxTextureSize,u={0:1,1:0,2:2},d=new ShaderMaterial({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vector2},radius:{value:4}},vertexShader:au,fragmentShader:ad}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new BufferGeometry;f.setAttribute("position",new BufferAttribute(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new Mesh(f,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;function _(t,i,r,a){let n=null,s=!0===r.isPointLight?t.customDistanceMaterial:t.customDepthMaterial;if(void 0!==s)n=s;else if(n=!0===r.isPointLight?l:o,e.localClippingEnabled&&!0===i.clipShadows&&Array.isArray(i.clippingPlanes)&&0!==i.clippingPlanes.length||i.displacementMap&&0!==i.displacementScale||i.alphaMap&&i.alphaTest>0||i.map&&i.alphaTest>0||!0===i.alphaToCoverage){let e=n.uuid,t=i.uuid,r=c[e];void 0===r&&(r={},c[e]=r);let a=r[t];void 0===a&&(a=n.clone(),r[t]=a,i.addEventListener("dispose",y)),n=a}return n.visible=i.visible,n.wireframe=i.wireframe,3===a?n.side=null!==i.shadowSide?i.shadowSide:i.side:n.side=null!==i.shadowSide?i.shadowSide:u[i.side],n.alphaMap=i.alphaMap,n.alphaTest=!0===i.alphaToCoverage?.5:i.alphaTest,n.map=i.map,n.clipShadows=i.clipShadows,n.clippingPlanes=i.clippingPlanes,n.clipIntersection=i.clipIntersection,n.displacementMap=i.displacementMap,n.displacementScale=i.displacementScale,n.displacementBias=i.displacementBias,n.wireframeLinewidth=i.wireframeLinewidth,n.linewidth=i.linewidth,!0===r.isPointLight&&!0===n.isMeshDistanceMaterial&&(e.properties.get(n).light=r),n}function y(e){for(let t in e.target.removeEventListener("dispose",y),c){let i=c[t],r=e.target.uuid;r in i&&(i[r].dispose(),delete i[r])}}this.render=function(i,o,l){if(!1===g.enabled||!1===g.autoUpdate&&!1===g.needsUpdate||0===i.length)return;2===this.type&&(b("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=1);let c=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),y=e.state;y.setBlending(0),!0===y.buffers.depth.getReversed()?y.buffers.color.setClear(0,0,0,0):y.buffers.color.setClear(1,1,1,1),y.buffers.depth.setTest(!0),y.setScissorTest(!1);let x=v!==this.type;x&&o.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,u=i.length;c<u;c++){let u=i[c],f=u.shadow;if(void 0===f){b("WebGLShadowMap:",u,"has no shadow.");continue}if(!1===f.autoUpdate&&!1===f.needsUpdate)continue;a.copy(f.mapSize);let g=f.getFrameExtents();a.multiply(g),n.copy(f.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(n.x=Math.floor(h/g.x),a.x=n.x*g.x,f.mapSize.x=n.x),a.y>h&&(n.y=Math.floor(h/g.y),a.y=n.y*g.y,f.mapSize.y=n.y));let v=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=v,null===f.map||!0===x){if(null!==f.map&&(null!==f.map.depthTexture&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),3===this.type){if(u.isPointLight){b("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new WebGLRenderTarget(a.x,a.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),f.map.texture.name=u.name+".shadowMap",f.map.depthTexture=new DepthTexture(a.x,a.y,1015),f.map.depthTexture.name=u.name+".shadowMapDepth",f.map.depthTexture.format=1026,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=1003,f.map.depthTexture.magFilter=1003}else u.isPointLight?(f.map=new WebGLCubeRenderTarget(a.x),f.map.depthTexture=new CubeDepthTexture(a.x,1014)):(f.map=new WebGLRenderTarget(a.x,a.y),f.map.depthTexture=new DepthTexture(a.x,a.y,1014)),f.map.depthTexture.name=u.name+".shadowMap",f.map.depthTexture.format=1026,1===this.type?(f.map.depthTexture.compareFunction=v?518:515,f.map.depthTexture.minFilter=1006,f.map.depthTexture.magFilter=1006):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=1003,f.map.depthTexture.magFilter=1003);f.camera.updateProjectionMatrix()}!0!==f.map.isWebGLCubeRenderTarget&&(f.map.width!==a.x||f.map.height!==a.y)&&f.map.setSize(a.x,a.y);let M=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();!0!==u.isPointLight&&f.updateMatrices(u,l);for(let i=0;i<M;i++){let a=f.getCamera(i);if(u.isPointLight){let e=f.camera,t=f.matrix,r=u.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ag.setFromMatrixPosition(u.matrixWorld),e.position.copy(ag),av.copy(e.position),av.add(ap[i]),e.up.copy(af[i]),e.lookAt(av),e.updateMatrixWorld(),t.makeTranslation(-ag.x,-ag.y,-ag.z),am.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(am,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,i),e.clear();else{0===i&&(e.setRenderTarget(f.map),e.clear());let t=f.getViewport(i);s.set(n.x*t.x,n.y*t.y,n.x*t.z,n.y*t.w),y.viewport(s)}r=f.getFrustum(i),function i(a,n,s,o,l){if(!1===a.visible)return;if(a.layers.test(n.layers)&&(a.isMesh||a.isLine||a.isPoints)&&(a.castShadow||a.receiveShadow&&3===l)&&(!a.frustumCulled||a.intersectsFrustum(r))){a.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,a.matrixWorld);let i=t.update(a),r=a.material;if(Array.isArray(r)){let t=i.groups;for(let c=0,h=t.length;c<h;c++){let h=t[c],u=r[h.materialIndex];if(u&&u.visible){let t=_(a,u,o,l);a.onBeforeShadow(e,a,n,s,i,t,h),e.renderBufferDirect(s,null,i,t,a,h),a.onAfterShadow(e,a,n,s,i,t,h)}}}else if(r.visible){let t=_(a,r,o,l);a.onBeforeShadow(e,a,n,s,i,t,null),e.renderBufferDirect(s,null,i,t,a,null),a.onAfterShadow(e,a,n,s,i,t,null)}}let c=a.children;for(let e=0,t=c.length;e<t;e++)i(c[e],n,s,o,l)}(o,l,a,u,this.type)}!0!==f.isPointLightShadow&&3===this.type&&function(i,r){let n=t.update(m);d.defines.VSM_SAMPLES!==i.blurSamples&&(d.defines.VSM_SAMPLES=i.blurSamples,p.defines.VSM_SAMPLES=i.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),null===i.mapPass?i.mapPass=new WebGLRenderTarget(a.x,a.y,{format:1030,type:1016}):(i.mapPass.width!==i.map.width||i.mapPass.height!==i.map.height)&&i.mapPass.setSize(i.map.width,i.map.height),d.uniforms.shadow_pass.value=i.map.depthTexture,d.uniforms.resolution.value.set(i.map.width,i.map.height),d.uniforms.radius.value=i.radius,e.setRenderTarget(i.mapPass),e.clear(),e.renderBufferDirect(r,null,n,d,m,null),p.uniforms.shadow_pass.value=i.mapPass.texture,p.uniforms.resolution.value.set(i.map.width,i.map.height),p.uniforms.radius.value=i.radius,e.setRenderTarget(i.map),e.clear(),e.renderBufferDirect(r,null,n,p,m,null)}(f,l),f.needsUpdate=!1}v=this.type,g.needsUpdate=!1,e.setRenderTarget(c,u,f)}}function ay(e,t){let i=new function(){let t=!1,i=new Vector4,r=null,a=new Vector4(0,0,0,0);return{setMask:function(i){r===i||t||(e.colorMask(i,i,i,i),r=i)},setLocked:function(e){t=e},setClear:function(t,r,n,s,o){!0===o&&(t*=s,r*=s,n*=s),i.set(t,r,n,s),!1===a.equals(i)&&(e.clearColor(t,r,n,s),a.copy(i))},reset:function(){t=!1,r=null,a.set(-1,0,0,0)}}},r=new function(){let i=!1,r=!1,a=null,n=null,s=null;return{setReversed:function(e){if(r!==e){let i=t.get("EXT_clip_control");e?i.clipControlEXT(i.LOWER_LEFT_EXT,i.ZERO_TO_ONE_EXT):i.clipControlEXT(i.LOWER_LEFT_EXT,i.NEGATIVE_ONE_TO_ONE_EXT),r=e;let a=s;s=null,this.setClear(a)}},getReversed:function(){return r},setTest:function(t){t?z(e.DEPTH_TEST):H(e.DEPTH_TEST)},setMask:function(t){a===t||i||(e.depthMask(t),a=t)},setFunc:function(t){if(r&&(t=w[t]),n!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:default:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL)}n=t}},setLocked:function(e){i=e},setClear:function(t){s!==t&&(s=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){i=!1,a=null,n=null,s=null,r=!1}}},a=new function(){let t=!1,i=null,r=null,a=null,n=null,s=null,o=null,l=null,c=null;return{setTest:function(i){t||(i?z(e.STENCIL_TEST):H(e.STENCIL_TEST))},setMask:function(r){i===r||t||(e.stencilMask(r),i=r)},setFunc:function(t,i,s){(r!==t||a!==i||n!==s)&&(e.stencilFunc(t,i,s),r=t,a=i,n=s)},setOp:function(t,i,r){(s!==t||o!==i||l!==r)&&(e.stencilOp(t,i,r),s=t,o=i,l=r)},setLocked:function(e){t=e},setClear:function(t){c!==t&&(e.clearStencil(t),c=t)},reset:function(){t=!1,i=null,r=null,a=null,n=null,s=null,o=null,l=null,c=null}}},n=new WeakMap,s=new WeakMap,o={},l={},c={},h=new WeakMap,u=[],d=null,p=!1,f=null,m=null,g=null,v=null,_=null,y=null,x=null,M=new Color(0,0,0),S=0,b=!1,E=null,A=null,R=null,C=null,P=null,L=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),I=!1,N=e.getParameter(e.VERSION);-1!==N.indexOf("WebGL")?I=parseFloat(/^WebGL (\d)/.exec(N)[1])>=1:-1!==N.indexOf("OpenGL ES")&&(I=parseFloat(/^OpenGL ES (\d)/.exec(N)[1])>=2);let D=null,U={},O=e.getParameter(e.SCISSOR_BOX),F=e.getParameter(e.VIEWPORT),B=new Vector4().fromArray(O),V=new Vector4().fromArray(F);function k(t,i,r,a){let n=new Uint8Array(4),s=e.createTexture();e.bindTexture(t,s),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let s=0;s<r;s++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(i,0,e.RGBA,1,1,a,0,e.RGBA,e.UNSIGNED_BYTE,n):e.texImage2D(i+s,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,n);return s}let G={};function z(t){!0!==o[t]&&(e.enable(t),o[t]=!0)}function H(t){!1!==o[t]&&(e.disable(t),o[t]=!1)}G[e.TEXTURE_2D]=k(e.TEXTURE_2D,e.TEXTURE_2D,1),G[e.TEXTURE_CUBE_MAP]=k(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[e.TEXTURE_2D_ARRAY]=k(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),G[e.TEXTURE_3D]=k(e.TEXTURE_3D,e.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),a.setClear(0),z(e.DEPTH_TEST),r.setFunc(3),q(!1),Y(1),z(e.CULL_FACE),j(0);let W={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};W[103]=e.MIN,W[104]=e.MAX;let X={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function j(t,i,r,a,n,s,o,l,c,h){if(0===t){!0===p&&(H(e.BLEND),p=!1);return}if(!1===p&&(z(e.BLEND),p=!0),5!==t){if(t!==f||h!==b){if((100!==m||100!==_)&&(e.blendEquation(e.FUNC_ADD),m=100,_=100),h)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:T("WebGLState: Invalid blending: ",t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:T("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:T("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:T("WebGLState: Invalid blending: ",t)}g=null,v=null,y=null,x=null,M.set(0,0,0),S=0,f=t,b=h}return}n=n||i,s=s||r,o=o||a,(i!==m||n!==_)&&(e.blendEquationSeparate(W[i],W[n]),m=i,_=n),(r!==g||a!==v||s!==y||o!==x)&&(e.blendFuncSeparate(X[r],X[a],X[s],X[o]),g=r,v=a,y=s,x=o),(!1===l.equals(M)||c!==S)&&(e.blendColor(l.r,l.g,l.b,c),M.copy(l),S=c),f=t,b=!1}function q(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function Y(t){0!==t?(z(e.CULL_FACE),t!==A&&(1===t?e.cullFace(e.BACK):2===t?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):H(e.CULL_FACE),A=t}function K(t,i,a){t?(z(e.POLYGON_OFFSET_FILL),(C!==i||P!==a)&&(C=i,P=a,r.getReversed()&&(i=-i),e.polygonOffset(i,a))):H(e.POLYGON_OFFSET_FILL)}return{buffers:{color:i,depth:r,stencil:a},enable:z,disable:H,bindFramebuffer:function(t,i){return c[t]!==i&&(e.bindFramebuffer(t,i),c[t]=i,t===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=i),t===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=i),!0)},drawBuffers:function(t,i){let r=u,a=!1;if(t){void 0===(r=h.get(i))&&(r=[],h.set(i,r));let n=t.textures;if(r.length!==n.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,i=n.length;t<i;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=n.length,a=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,a=!0);a&&e.drawBuffers(r)},useProgram:function(t){return d!==t&&(e.useProgram(t),d=t,!0)},setBlending:j,setMaterial:function(t,n){2===t.side?H(e.CULL_FACE):z(e.CULL_FACE);let s=1===t.side;n&&(s=!s),q(s),1===t.blending&&!1===t.transparent?j(0):j(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),r.setFunc(t.depthFunc),r.setTest(t.depthTest),r.setMask(t.depthWrite),i.setMask(t.colorWrite);let o=t.stencilWrite;a.setTest(o),o&&(a.setMask(t.stencilWriteMask),a.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),a.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),K(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),!0===t.alphaToCoverage?z(e.SAMPLE_ALPHA_TO_COVERAGE):H(e.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:q,setCullFace:Y,setLineWidth:function(t){t!==R&&(I&&e.lineWidth(t),R=t)},setPolygonOffset:K,setScissorTest:function(t){t?z(e.SCISSOR_TEST):H(e.SCISSOR_TEST)},activeTexture:function(t){void 0===t&&(t=e.TEXTURE0+L-1),D!==t&&(e.activeTexture(t),D=t)},bindTexture:function(t,i,r){void 0===r&&(r=null===D?e.TEXTURE0+L-1:D);let a=U[r];void 0===a&&(a={type:void 0,texture:void 0},U[r]=a),(a.type!==t||a.texture!==i)&&(D!==r&&(e.activeTexture(r),D=r),e.bindTexture(t,i||G[t]),a.type=t,a.texture=i)},unbindTexture:function(){let t=U[D];void 0!==t&&void 0!==t.type&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)},compressedTexImage2D:function(){try{e.compressedTexImage2D(...arguments)}catch(e){T("WebGLState:",e)}},compressedTexImage3D:function(){try{e.compressedTexImage3D(...arguments)}catch(e){T("WebGLState:",e)}},texImage2D:function(){try{e.texImage2D(...arguments)}catch(e){T("WebGLState:",e)}},texImage3D:function(){try{e.texImage3D(...arguments)}catch(e){T("WebGLState:",e)}},pixelStorei:function(t,i){l[t]!==i&&(e.pixelStorei(t,i),l[t]=i)},getParameter:function(t){return void 0!==l[t]?l[t]:e.getParameter(t)},updateUBOMapping:function(t,i){let r=s.get(i);void 0===r&&(r=new WeakMap,s.set(i,r));let a=r.get(t);void 0===a&&(a=e.getUniformBlockIndex(i,t.name),r.set(t,a))},uniformBlockBinding:function(t,i){let r=s.get(i).get(t);n.get(i)!==r&&(e.uniformBlockBinding(i,r,t.__bindingPointIndex),n.set(i,r))},texStorage2D:function(){try{e.texStorage2D(...arguments)}catch(e){T("WebGLState:",e)}},texStorage3D:function(){try{e.texStorage3D(...arguments)}catch(e){T("WebGLState:",e)}},texSubImage2D:function(){try{e.texSubImage2D(...arguments)}catch(e){T("WebGLState:",e)}},texSubImage3D:function(){try{e.texSubImage3D(...arguments)}catch(e){T("WebGLState:",e)}},compressedTexSubImage2D:function(){try{e.compressedTexSubImage2D(...arguments)}catch(e){T("WebGLState:",e)}},compressedTexSubImage3D:function(){try{e.compressedTexSubImage3D(...arguments)}catch(e){T("WebGLState:",e)}},scissor:function(t){!1===B.equals(t)&&(e.scissor(t.x,t.y,t.z,t.w),B.copy(t))},viewport:function(t){!1===V.equals(t)&&(e.viewport(t.x,t.y,t.z,t.w),V.copy(t))},reset:function(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(0xffffffff),e.stencilFunc(e.ALWAYS,0,0xffffffff),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),o={},l={},D=null,U={},c={},h=new WeakMap,u=[],d=null,p=!1,f=null,m=null,g=null,v=null,_=null,y=null,x=null,M=new Color(0,0,0),S=0,b=!1,E=null,A=null,R=null,C=null,P=null,B.set(0,0,e.canvas.width,e.canvas.height),V.set(0,0,e.canvas.width,e.canvas.height),i.reset(),r.reset(),a.reset()}}}function ax(e,t,i,r,a,n,s){let o,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c="u">typeof navigator&&/OculusBrowser/g.test(navigator.userAgent),h=new Vector2,u=new WeakMap,d=new Set,p=new WeakMap,f=!1;try{f="u">typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}catch{}function m(e,t){return f?new OffscreenCanvas(e,t):y("canvas")}function v(e,t,i){let r=1,a=Y(e);if((a.width>i||a.height>i)&&(r=i/Math.max(a.width,a.height)),r<1)if("u">typeof HTMLImageElement&&e instanceof HTMLImageElement||"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"u">typeof ImageBitmap&&e instanceof ImageBitmap||"u">typeof VideoFrame&&e instanceof VideoFrame){let i=Math.floor(r*a.width),n=Math.floor(r*a.height);void 0===o&&(o=m(i,n));let s=t?m(i,n):o;return s.width=i,s.height=n,s.getContext("2d").drawImage(e,0,0,i,n),b("WebGLRenderer: Texture has been resized from ("+a.width+"x"+a.height+") to ("+i+"x"+n+")."),s}else"data"in e&&b("WebGLRenderer: Image in DataTexture is too big ("+a.width+"x"+a.height+").");return e}function _(e){return e.generateMipmaps}function x(t){e.generateMipmap(t)}function M(i,r,a,n,s){let o,l=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(null!==i){if(void 0!==e[i])return e[i];b("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+i+"'")}n&&((o=t.get("EXT_texture_norm16"))||b("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let c=r;if(r===e.RED&&(a===e.FLOAT&&(c=e.R32F),a===e.HALF_FLOAT&&(c=e.R16F),a===e.UNSIGNED_BYTE&&(c=e.R8),a===e.UNSIGNED_SHORT&&o&&(c=o.R16_EXT),a===e.SHORT&&o&&(c=o.R16_SNORM_EXT)),r===e.RED_INTEGER&&(a===e.UNSIGNED_BYTE&&(c=e.R8UI),a===e.UNSIGNED_SHORT&&(c=e.R16UI),a===e.UNSIGNED_INT&&(c=e.R32UI),a===e.BYTE&&(c=e.R8I),a===e.SHORT&&(c=e.R16I),a===e.INT&&(c=e.R32I)),r===e.RG&&(a===e.FLOAT&&(c=e.RG32F),a===e.HALF_FLOAT&&(c=e.RG16F),a===e.UNSIGNED_BYTE&&(c=e.RG8),a===e.UNSIGNED_SHORT&&o&&(c=o.RG16_EXT),a===e.SHORT&&o&&(c=o.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(a===e.UNSIGNED_BYTE&&(c=e.RG8UI),a===e.UNSIGNED_SHORT&&(c=e.RG16UI),a===e.UNSIGNED_INT&&(c=e.RG32UI),a===e.BYTE&&(c=e.RG8I),a===e.SHORT&&(c=e.RG16I),a===e.INT&&(c=e.RG32I)),r===e.RGB_INTEGER&&(a===e.UNSIGNED_BYTE&&(c=e.RGB8UI),a===e.UNSIGNED_SHORT&&(c=e.RGB16UI),a===e.UNSIGNED_INT&&(c=e.RGB32UI),a===e.BYTE&&(c=e.RGB8I),a===e.SHORT&&(c=e.RGB16I),a===e.INT&&(c=e.RGB32I)),r===e.RGBA_INTEGER&&(a===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),a===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),a===e.UNSIGNED_INT&&(c=e.RGBA32UI),a===e.BYTE&&(c=e.RGBA8I),a===e.SHORT&&(c=e.RGBA16I),a===e.INT&&(c=e.RGBA32I)),r===e.RGB&&(a===e.UNSIGNED_SHORT&&o&&(c=o.RGB16_EXT),a===e.SHORT&&o&&(c=o.RGB16_SNORM_EXT),a===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),a===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),r===e.RGBA){let t=l?"linear":V.getTransfer(s);a===e.FLOAT&&(c=e.RGBA32F),a===e.HALF_FLOAT&&(c=e.RGBA16F),a===e.UNSIGNED_BYTE&&(c="srgb"===t?e.SRGB8_ALPHA8:e.RGBA8),a===e.UNSIGNED_SHORT&&o&&(c=o.RGBA16_EXT),a===e.SHORT&&o&&(c=o.RGBA16_SNORM_EXT),a===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),a===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&t.get("EXT_color_buffer_float"),c}function S(t,i){let r;return t?null===i||1014===i||1020===i?r=e.DEPTH24_STENCIL8:1015===i?r=e.DEPTH32F_STENCIL8:1012===i&&(r=e.DEPTH24_STENCIL8,b("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):null===i||1014===i||1020===i?r=e.DEPTH_COMPONENT24:1015===i?r=e.DEPTH_COMPONENT32F:1012===i&&(r=e.DEPTH_COMPONENT16),r}function E(e,t){return!0===_(e)||e.isFramebufferTexture&&1003!==e.minFilter&&1006!==e.minFilter?Math.log2(Math.max(t.width,t.height))+1:void 0!==e.mipmaps&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function w(e){let t=e.target;t.removeEventListener("dispose",w),function(e){let t=r.get(e);if(void 0===t.__webglInit)return;let i=e.source,a=p.get(i);if(a){let r=a[t.__cacheKey];r.usedTimes--,0===r.usedTimes&&R(e),0===Object.keys(a).length&&p.delete(i)}r.remove(e)}(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function A(t){let i=t.target;i.removeEventListener("dispose",A),function(t){let i=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(i.__webglFramebuffer[t]))for(let r=0;r<i.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(i.__webglFramebuffer[t][r]);else e.deleteFramebuffer(i.__webglFramebuffer[t]);i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer[t])}else{if(Array.isArray(i.__webglFramebuffer))for(let t=0;t<i.__webglFramebuffer.length;t++)e.deleteFramebuffer(i.__webglFramebuffer[t]);else e.deleteFramebuffer(i.__webglFramebuffer);if(i.__webglDepthbuffer&&e.deleteRenderbuffer(i.__webglDepthbuffer),i.__webglMultisampledFramebuffer&&e.deleteFramebuffer(i.__webglMultisampledFramebuffer),i.__webglColorRenderbuffer)for(let t=0;t<i.__webglColorRenderbuffer.length;t++)i.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(i.__webglColorRenderbuffer[t]);i.__webglDepthRenderbuffer&&e.deleteRenderbuffer(i.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,i=a.length;t<i;t++){let i=r.get(a[t]);i.__webglTexture&&(e.deleteTexture(i.__webglTexture),s.memory.textures--),r.remove(a[t])}r.remove(t)}(i)}function R(t){let i=r.get(t);e.deleteTexture(i.__webglTexture);let a=t.source,n=p.get(a);delete n[i.__cacheKey],s.memory.textures--}let C=0;function P(t,a){var n;let o,l=r.get(t);if(t.isVideoTexture&&(n=t,o=s.render.frame,u.get(n)!==o&&(u.set(n,o),n.update())),!1===t.isRenderTargetTexture&&!0!==t.isExternalTexture&&t.version>0&&l.__version!==t.version){let e=t.image;if(null===e)b("WebGLRenderer: Texture marked for update but no image data found.");else{if(!1!==e.complete)return void F(l,t,a);b("WebGLRenderer: Texture marked for update but image is incomplete")}}else t.isExternalTexture&&(l.__webglTexture=t.sourceTexture?t.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,l.__webglTexture,e.TEXTURE0+a)}let L={1e3:e.REPEAT,1001:e.CLAMP_TO_EDGE,1002:e.MIRRORED_REPEAT},I={1003:e.NEAREST,1004:e.NEAREST_MIPMAP_NEAREST,1005:e.NEAREST_MIPMAP_LINEAR,1006:e.LINEAR,1007:e.LINEAR_MIPMAP_NEAREST,1008:e.LINEAR_MIPMAP_LINEAR},N={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function D(i,n){if((1015===n.type&&!1===t.has("OES_texture_float_linear")&&(1006===n.magFilter||1007===n.magFilter||1005===n.magFilter||1008===n.magFilter||1006===n.minFilter||1007===n.minFilter||1005===n.minFilter||1008===n.minFilter)&&b("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(i,e.TEXTURE_WRAP_S,L[n.wrapS]),e.texParameteri(i,e.TEXTURE_WRAP_T,L[n.wrapT]),(i===e.TEXTURE_3D||i===e.TEXTURE_2D_ARRAY)&&e.texParameteri(i,e.TEXTURE_WRAP_R,L[n.wrapR]),e.texParameteri(i,e.TEXTURE_MAG_FILTER,I[n.magFilter]),e.texParameteri(i,e.TEXTURE_MIN_FILTER,I[n.minFilter]),n.compareFunction&&(e.texParameteri(i,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(i,e.TEXTURE_COMPARE_FUNC,N[n.compareFunction])),!0===t.has("EXT_texture_filter_anisotropic"))&&1003!==n.magFilter&&(1005===n.minFilter||1008===n.minFilter)&&(1015!==n.type||!1!==t.has("OES_texture_float_linear"))&&(n.anisotropy>1||r.get(n).__currentAnisotropy)){let s=t.get("EXT_texture_filter_anisotropic");e.texParameterf(i,s.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,a.getMaxAnisotropy())),r.get(n).__currentAnisotropy=n.anisotropy}}function U(t,i){let r,a=!1;void 0===t.__webglInit&&(t.__webglInit=!0,i.addEventListener("dispose",w));let n=i.source,o=p.get(n);void 0===o&&(o={},p.set(n,o));let l=((r=[]).push(i.wrapS),r.push(i.wrapT),r.push(i.wrapR||0),r.push(i.magFilter),r.push(i.minFilter),r.push(i.anisotropy),r.push(i.internalFormat),r.push(i.format),r.push(i.type),r.push(i.generateMipmaps),r.push(i.premultiplyAlpha),r.push(i.flipY),r.push(i.unpackAlignment),r.push(i.colorSpace),r.join());if(l!==t.__cacheKey){void 0===o[l]&&(o[l]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,a=!0),o[l].usedTimes++;let r=o[t.__cacheKey];void 0!==r&&(o[t.__cacheKey].usedTimes--,0===r.usedTimes&&R(i)),t.__cacheKey=l,t.__webglTexture=o[l].texture}return a}function O(e,t,i){return Math.floor(Math.floor(e/i)/t)}function F(t,s,o){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let c=U(t,s),h=s.source;i.bindTexture(l,t.__webglTexture,e.TEXTURE0+o);let u=r.get(h);if(h.version!==u.__version||!0===c){let t;if(i.activeTexture(e.TEXTURE0+o),!1==("u">typeof ImageBitmap&&s.image instanceof ImageBitmap)){let t=V.getPrimaries(V.workingColorSpace),r=""===s.colorSpace?null:V.getPrimaries(s.colorSpace),a=""===s.colorSpace||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}i.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let r=v(s.image,!1,a.maxTextureSize);r=q(s,r);let p=n.convert(s.format,s.colorSpace),f=n.convert(s.type),m=M(s.internalFormat,p,f,s.normalized,s.colorSpace,s.isVideoTexture);D(l,s);let g=s.mipmaps,y=!0!==s.isVideoTexture,T=void 0===u.__version||!0===c,w=h.dataReady,A=E(s,r);if(s.isDepthTexture)m=S(1027===s.format,s.type),T&&(y?i.texStorage2D(e.TEXTURE_2D,1,m,r.width,r.height):i.texImage2D(e.TEXTURE_2D,0,m,r.width,r.height,0,p,f,null));else if(s.isDataTexture)if(g.length>0){y&&T&&i.texStorage2D(e.TEXTURE_2D,A,m,g[0].width,g[0].height);for(let r=0,a=g.length;r<a;r++)t=g[r],y?w&&i.texSubImage2D(e.TEXTURE_2D,r,0,0,t.width,t.height,p,f,t.data):i.texImage2D(e.TEXTURE_2D,r,m,t.width,t.height,0,p,f,t.data);s.generateMipmaps=!1}else y?(T&&i.texStorage2D(e.TEXTURE_2D,A,m,r.width,r.height),w&&function(t,r,a,n){let s=t.updateRanges;if(0===s.length)i.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,a,n,r.data);else{s.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<s.length;e++){let t=s[o],i=s[e],a=t.start+t.count,n=O(i.start,r.width,4),l=O(t.start,r.width,4);i.start<=a+1&&n===l&&O(i.start+i.count-1,r.width,4)===n?t.count=Math.max(t.count,i.start+i.count-t.start):s[++o]=i}s.length=o+1;let l=i.getParameter(e.UNPACK_ROW_LENGTH),c=i.getParameter(e.UNPACK_SKIP_PIXELS),h=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,o=s.length;t<o;t++){let o=s[t],l=Math.floor(o.start/4),c=Math.ceil(o.count/4),h=l%r.width,u=Math.floor(l/r.width);i.pixelStorei(e.UNPACK_SKIP_PIXELS,h),i.pixelStorei(e.UNPACK_SKIP_ROWS,u),i.texSubImage2D(e.TEXTURE_2D,0,h,u,c,1,a,n,r.data)}t.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,l),i.pixelStorei(e.UNPACK_SKIP_PIXELS,c),i.pixelStorei(e.UNPACK_SKIP_ROWS,h)}}(s,r,p,f)):i.texImage2D(e.TEXTURE_2D,0,m,r.width,r.height,0,p,f,r.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){y&&T&&i.texStorage3D(e.TEXTURE_2D_ARRAY,A,m,g[0].width,g[0].height,r.depth);for(let a=0,n=g.length;a<n;a++)if(t=g[a],1023!==s.format)if(null!==p)if(y){if(w)if(s.layerUpdates.size>0){let r=ip(t.width,t.height,s.format,s.type);for(let n of s.layerUpdates){let s=t.data.subarray(n*r/t.data.BYTES_PER_ELEMENT,(n+1)*r/t.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,n,t.width,t.height,1,p,s)}}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,t.width,t.height,r.depth,p,t.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,a,m,t.width,t.height,r.depth,0,t.data,0,0);else b("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else y?w&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,t.width,t.height,r.depth,p,f,t.data):i.texImage3D(e.TEXTURE_2D_ARRAY,a,m,t.width,t.height,r.depth,0,p,f,t.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{y&&T&&i.texStorage2D(e.TEXTURE_2D,A,m,g[0].width,g[0].height);for(let r=0,a=g.length;r<a;r++)t=g[r],1023!==s.format?null!==p?y?w&&i.compressedTexSubImage2D(e.TEXTURE_2D,r,0,0,t.width,t.height,p,t.data):i.compressedTexImage2D(e.TEXTURE_2D,r,m,t.width,t.height,0,t.data):b("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):y?w&&i.texSubImage2D(e.TEXTURE_2D,r,0,0,t.width,t.height,p,f,t.data):i.texImage2D(e.TEXTURE_2D,r,m,t.width,t.height,0,p,f,t.data)}else if(s.isDataArrayTexture)if(y){if(T&&i.texStorage3D(e.TEXTURE_2D_ARRAY,A,m,r.width,r.height,r.depth),w)if(s.layerUpdates.size>0){let t=ip(r.width,r.height,s.format,s.type);for(let a of s.layerUpdates){let n=r.data.subarray(a*t/r.data.BYTES_PER_ELEMENT,(a+1)*t/r.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,r.width,r.height,1,p,f,n)}s.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,r.width,r.height,r.depth,p,f,r.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,m,r.width,r.height,r.depth,0,p,f,r.data);else if(s.isData3DTexture)y?(T&&i.texStorage3D(e.TEXTURE_3D,A,m,r.width,r.height,r.depth),w&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,r.width,r.height,r.depth,p,f,r.data)):i.texImage3D(e.TEXTURE_3D,0,m,r.width,r.height,r.depth,0,p,f,r.data);else if(s.isFramebufferTexture){if(T)if(y)i.texStorage2D(e.TEXTURE_2D,A,m,r.width,r.height);else{let t=r.width,a=r.height;for(let r=0;r<A;r++)i.texImage2D(e.TEXTURE_2D,r,m,t,a,0,p,f,null),t>>=1,a>>=1}}else if(s.isHTMLTexture){if("texElementImage2D"in e){let t=e.canvas;if(t.hasAttribute("layoutsubtree")||t.setAttribute("layoutsubtree","true"),r.parentNode!==t){t.appendChild(r),d.add(s),t.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},t.requestPaint();return}if(3===e.texElementImage2D.length)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,r);else{let t=e.RGBA,i=e.RGBA,a=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,t,i,a,r)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(y&&T){let t=Y(g[0]);i.texStorage2D(e.TEXTURE_2D,A,m,t.width,t.height)}for(let r=0,a=g.length;r<a;r++)t=g[r],y?w&&i.texSubImage2D(e.TEXTURE_2D,r,0,0,p,f,t):i.texImage2D(e.TEXTURE_2D,r,m,p,f,t);s.generateMipmaps=!1}else if(y){if(T){let t=Y(r);i.texStorage2D(e.TEXTURE_2D,A,m,t.width,t.height)}w&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,p,f,r)}else i.texImage2D(e.TEXTURE_2D,0,m,p,f,r);_(s)&&x(l),u.__version=h.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function B(t,a,s,o,c,h){let u=n.convert(s.format,s.colorSpace),d=n.convert(s.type),p=M(s.internalFormat,u,d,s.normalized,s.colorSpace),f=r.get(a),m=r.get(s);if(m.__renderTarget=a,!f.__hasExternalTextures){let t=Math.max(1,a.width>>h),r=Math.max(1,a.height>>h);c===e.TEXTURE_3D||c===e.TEXTURE_2D_ARRAY?i.texImage3D(c,h,p,t,r,a.depth,0,u,d,null):i.texImage2D(c,h,p,t,r,0,u,d,null)}i.bindFramebuffer(e.FRAMEBUFFER,t),j(a)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,o,c,m.__webglTexture,0,X(a)):(c===e.TEXTURE_2D||c>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&c<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,o,c,m.__webglTexture,h),i.bindFramebuffer(e.FRAMEBUFFER,null)}function k(t,i,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),i.depthBuffer){let a=i.depthTexture,n=a&&a.isDepthTexture?a.type:null,s=S(i.stencilBuffer,n),o=i.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;j(i)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,X(i),s,i.width,i.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,X(i),s,i.width,i.height):e.renderbufferStorage(e.RENDERBUFFER,s,i.width,i.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,o,e.RENDERBUFFER,t)}else{let t=i.textures;for(let a=0;a<t.length;a++){let s=t[a],o=n.convert(s.format,s.colorSpace),c=n.convert(s.type),h=M(s.internalFormat,o,c,s.normalized,s.colorSpace);j(i)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,X(i),h,i.width,i.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,X(i),h,i.width,i.height):e.renderbufferStorage(e.RENDERBUFFER,h,i.width,i.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function G(t,a,s){let o=!0===a.isWebGLCubeRenderTarget;if(i.bindFramebuffer(e.FRAMEBUFFER,t),!(a.depthTexture&&a.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let c=r.get(a.depthTexture);if(c.__renderTarget=a,c.__webglTexture&&a.depthTexture.image.width===a.width&&a.depthTexture.image.height===a.height||(a.depthTexture.image.width=a.width,a.depthTexture.image.height=a.height,a.depthTexture.needsUpdate=!0),o){if(void 0===c.__webglInit&&(c.__webglInit=!0,a.depthTexture.addEventListener("dispose",w)),void 0===c.__webglTexture){let t;c.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),D(e.TEXTURE_CUBE_MAP,a.depthTexture);let r=n.convert(a.depthTexture.format),s=n.convert(a.depthTexture.type);1026===a.depthTexture.format?t=e.DEPTH_COMPONENT24:1027===a.depthTexture.format&&(t=e.DEPTH24_STENCIL8);for(let i=0;i<6;i++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,t,a.width,a.height,0,r,s,null)}}else P(a.depthTexture,0);let h=c.__webglTexture,u=X(a),d=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+s:e.TEXTURE_2D,p=1027===a.depthTexture.format?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(1026===a.depthTexture.format)j(a)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,d,h,0,u):e.framebufferTexture2D(e.FRAMEBUFFER,p,d,h,0);else if(1027===a.depthTexture.format)j(a)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,d,h,0,u):e.framebufferTexture2D(e.FRAMEBUFFER,p,d,h,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function z(t){let a=r.get(t),n=!0===t.isWebGLCubeRenderTarget;if(a.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(a.__depthDisposeCallback&&a.__depthDisposeCallback(),e){let t=()=>{delete a.__boundDepthTexture,delete a.__depthDisposeCallback,e.removeEventListener("dispose",t)};e.addEventListener("dispose",t),a.__depthDisposeCallback=t}a.__boundDepthTexture=e}if(t.depthTexture&&!a.__autoAllocateDepthBuffer)if(n)for(let e=0;e<6;e++)G(a.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?G(a.__webglFramebuffer[0],t,0):G(a.__webglFramebuffer,t,0)}else if(n){a.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(i.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[r]),void 0===a.__webglDepthbuffer[r])a.__webglDepthbuffer[r]=e.createRenderbuffer(),k(a.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,n=a.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,n),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,n)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?i.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer),void 0===a.__webglDepthbuffer)a.__webglDepthbuffer=e.createRenderbuffer(),k(a.__webglDepthbuffer,t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=a.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,r)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}let H=[],W=[];function X(e){return Math.min(a.maxSamples,e.samples)}function j(e){let i=r.get(e);return e.samples>0&&!0===t.has("WEBGL_multisampled_render_to_texture")&&!1!==i.__useRenderToTexture}function q(e,t){let i=e.colorSpace,r=e.format,a=e.type;return!0===e.isCompressedTexture||!0===e.isVideoTexture||i!==g&&""!==i&&("srgb"===V.getTransfer(i)?(1023!==r||1009!==a)&&b("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):T("WebGLTextures: Unsupported texture color space:",i)),t}function Y(e){return"u">typeof HTMLImageElement&&e instanceof HTMLImageElement?(h.width=e.naturalWidth||e.width,h.height=e.naturalHeight||e.height):"u">typeof VideoFrame&&e instanceof VideoFrame?(h.width=e.displayWidth,h.height=e.displayHeight):(h.width=e.width,h.height=e.height),h}this.allocateTextureUnit=function(){let e=C;return e>=a.maxTextures&&b("WebGLTextures: Trying to use "+(e+1)+" texture units while this GPU supports only "+a.maxTextures),C+=1,e},this.resetTextureUnits=function(){C=0},this.getTextureUnits=function(){return C},this.setTextureUnits=function(e){C=e},this.setTexture2D=P,this.setTexture2DArray=function(t,a){let n=r.get(t);!1===t.isRenderTargetTexture&&t.version>0&&n.__version!==t.version?F(n,t,a):(t.isExternalTexture&&(n.__webglTexture=t.sourceTexture?t.sourceTexture:null),i.bindTexture(e.TEXTURE_2D_ARRAY,n.__webglTexture,e.TEXTURE0+a))},this.setTexture3D=function(t,a){let n=r.get(t);!1===t.isRenderTargetTexture&&t.version>0&&n.__version!==t.version?F(n,t,a):i.bindTexture(e.TEXTURE_3D,n.__webglTexture,e.TEXTURE0+a)},this.setTextureCube=function(t,s){let o=r.get(t);!0!==t.isCubeDepthTexture&&t.version>0&&o.__version!==t.version?function(t,s,o){if(6!==s.image.length)return;let l=U(t,s),c=s.source;i.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+o);let h=r.get(c);if(c.version!==h.__version||!0===l){let t;i.activeTexture(e.TEXTURE0+o);let r=V.getPrimaries(V.workingColorSpace),u=""===s.colorSpace?null:V.getPrimaries(s.colorSpace),d=""===s.colorSpace||r===u?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let p=s.isCompressedTexture||s.image[0].isCompressedTexture,f=s.image[0]&&s.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)p||f?m[e]=f?s.image[e].image:s.image[e]:m[e]=v(s.image[e],!0,a.maxCubemapSize),m[e]=q(s,m[e]);let g=m[0],y=n.convert(s.format,s.colorSpace),S=n.convert(s.type),T=M(s.internalFormat,y,S,s.normalized,s.colorSpace),w=!0!==s.isVideoTexture,A=void 0===h.__version||!0===l,R=c.dataReady,C=E(s,g);if(D(e.TEXTURE_CUBE_MAP,s),p){w&&A&&i.texStorage2D(e.TEXTURE_CUBE_MAP,C,T,g.width,g.height);for(let r=0;r<6;r++){t=m[r].mipmaps;for(let a=0;a<t.length;a++){let n=t[a];1023!==s.format?null!==y?w?R&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a,0,0,n.width,n.height,y,n.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a,T,n.width,n.height,0,n.data):b("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):w?R&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a,0,0,n.width,n.height,y,S,n.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a,T,n.width,n.height,0,y,S,n.data)}}}else{if(t=s.mipmaps,w&&A){t.length>0&&C++;let r=Y(m[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,C,T,r.width,r.height)}for(let r=0;r<6;r++)if(f){w?R&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,m[r].width,m[r].height,y,S,m[r].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,T,m[r].width,m[r].height,0,y,S,m[r].data);for(let a=0;a<t.length;a++){let n=t[a].image[r].image;w?R&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a+1,0,0,n.width,n.height,y,S,n.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a+1,T,n.width,n.height,0,y,S,n.data)}}else{w?R&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,y,S,m[r]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,T,y,S,m[r]);for(let a=0;a<t.length;a++){let n=t[a];w?R&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a+1,0,0,y,S,n.image[r]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,a+1,T,y,S,n.image[r])}}}_(s)&&x(e.TEXTURE_CUBE_MAP),h.__version=c.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}(o,t,s):i.bindTexture(e.TEXTURE_CUBE_MAP,o.__webglTexture,e.TEXTURE0+s)},this.rebindTextures=function(t,i,a){let n=r.get(t);void 0!==i&&B(n.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),void 0!==a&&z(t)},this.setupRenderTarget=function(t){let a=t.texture,o=r.get(t),l=r.get(a);t.addEventListener("dispose",A);let c=t.textures,h=!0===t.isWebGLCubeRenderTarget,u=c.length>1;if(!u&&(void 0===l.__webglTexture&&(l.__webglTexture=e.createTexture()),l.__version=a.version,s.memory.textures++),h){o.__webglFramebuffer=[];for(let t=0;t<6;t++)if(a.mipmaps&&a.mipmaps.length>0){o.__webglFramebuffer[t]=[];for(let i=0;i<a.mipmaps.length;i++)o.__webglFramebuffer[t][i]=e.createFramebuffer()}else o.__webglFramebuffer[t]=e.createFramebuffer()}else{if(a.mipmaps&&a.mipmaps.length>0){o.__webglFramebuffer=[];for(let t=0;t<a.mipmaps.length;t++)o.__webglFramebuffer[t]=e.createFramebuffer()}else o.__webglFramebuffer=e.createFramebuffer();if(u)for(let t=0,i=c.length;t<i;t++){let i=r.get(c[t]);void 0===i.__webglTexture&&(i.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&!1===j(t)){o.__webglMultisampledFramebuffer=e.createFramebuffer(),o.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,o.__webglMultisampledFramebuffer);for(let i=0;i<c.length;i++){let r=c[i];o.__webglColorRenderbuffer[i]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,o.__webglColorRenderbuffer[i]);let a=n.convert(r.format,r.colorSpace),s=n.convert(r.type),l=M(r.internalFormat,a,s,r.normalized,r.colorSpace,!0===t.isXRRenderTarget),h=X(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,h,l,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+i,e.RENDERBUFFER,o.__webglColorRenderbuffer[i])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(o.__webglDepthRenderbuffer=e.createRenderbuffer(),k(o.__webglDepthRenderbuffer,t,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(h){i.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),D(e.TEXTURE_CUBE_MAP,a);for(let i=0;i<6;i++)if(a.mipmaps&&a.mipmaps.length>0)for(let r=0;r<a.mipmaps.length;r++)B(o.__webglFramebuffer[i][r],t,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,r);else B(o.__webglFramebuffer[i],t,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);_(a)&&x(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(u){for(let a=0,n=c.length;a<n;a++){let n=c[a],s=r.get(n),l=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(l,s.__webglTexture),D(l,n),B(o.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0+a,l,0),_(n)&&x(l)}i.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(r,l.__webglTexture),D(r,a),a.mipmaps&&a.mipmaps.length>0)for(let i=0;i<a.mipmaps.length;i++)B(o.__webglFramebuffer[i],t,a,e.COLOR_ATTACHMENT0,r,i);else B(o.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0,r,0);_(a)&&x(r),i.unbindTexture()}t.depthBuffer&&z(t)},this.updateRenderTargetMipmap=function(t){let a=t.textures;for(let n=0,s=a.length;n<s;n++){let s=a[n];if(_(s)){let a=t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D,n=r.get(s).__webglTexture;i.bindTexture(a,n),x(a),i.unbindTexture()}}},this.updateMultisampleRenderTarget=function(t){if(t.samples>0){if(!1===j(t)){let a=t.textures,n=t.width,s=t.height,o=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,h=r.get(t),u=a.length>1;if(u)for(let t=0;t<a.length;t++)i.bindFramebuffer(e.FRAMEBUFFER,h.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,h.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,h.__webglMultisampledFramebuffer);let d=t.texture.mipmaps;d&&d.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,h.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,h.__webglFramebuffer);for(let i=0;i<a.length;i++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(o|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(o|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,h.__webglColorRenderbuffer[i]);let t=r.get(a[i]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,n,s,0,0,n,s,o,e.NEAREST),!0===c&&(H.length=0,W.length=0,H.push(e.COLOR_ATTACHMENT0+i),t.depthBuffer&&!1===t.storeMultisampledDepthBuffer&&(H.push(l),W.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,W)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,H))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<a.length;t++){i.bindFramebuffer(e.FRAMEBUFFER,h.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,h.__webglColorRenderbuffer[t]);let n=r.get(a[t]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,h.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,n,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,h.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&!1===t.storeMultisampledDepthBuffer&&c){let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[i])}}},this.setupDepthRenderbuffer=z,this.setupFrameBufferTexture=B,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function aM(e,t){return{convert:function(i){let r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=V.getTransfer(a);if(1009===i)return e.UNSIGNED_BYTE;if(1017===i)return e.UNSIGNED_SHORT_4_4_4_4;if(1018===i)return e.UNSIGNED_SHORT_5_5_5_1;if(35902===i)return e.UNSIGNED_INT_5_9_9_9_REV;if(35899===i)return e.UNSIGNED_INT_10F_11F_11F_REV;if(1010===i)return e.BYTE;if(1011===i)return e.SHORT;if(1012===i)return e.UNSIGNED_SHORT;if(1013===i)return e.INT;if(1014===i)return e.UNSIGNED_INT;if(1015===i)return e.FLOAT;if(1016===i)return e.HALF_FLOAT;if(1021===i)return e.ALPHA;if(1022===i)return e.RGB;if(1023===i)return e.RGBA;if(1026===i)return e.DEPTH_COMPONENT;if(1027===i)return e.DEPTH_STENCIL;if(1028===i)return e.RED;if(1029===i)return e.RED_INTEGER;if(1030===i)return e.RG;if(1031===i)return e.RG_INTEGER;if(1033===i)return e.RGBA_INTEGER;if(33776===i||33777===i||33778===i||33779===i)if("srgb"===n){if(null===(r=t.get("WEBGL_compressed_texture_s3tc_srgb")))return null;if(33776===i)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(33777===i)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(33778===i)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(33779===i)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(null===(r=t.get("WEBGL_compressed_texture_s3tc")))return null;if(33776===i)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(33777===i)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(33778===i)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(33779===i)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(35840===i||35841===i||35842===i||35843===i){if(null===(r=t.get("WEBGL_compressed_texture_pvrtc")))return null;if(35840===i)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(35841===i)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(35842===i)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(35843===i)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(36196===i||37492===i||37496===i||37488===i||37489===i||37490===i||37491===i){if(null===(r=t.get("WEBGL_compressed_texture_etc")))return null;if(36196===i||37492===i)return"srgb"===n?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(37496===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(37488===i)return r.COMPRESSED_R11_EAC;if(37489===i)return r.COMPRESSED_SIGNED_R11_EAC;if(37490===i)return r.COMPRESSED_RG11_EAC;if(37491===i)return r.COMPRESSED_SIGNED_RG11_EAC}if(37808===i||37809===i||37810===i||37811===i||37812===i||37813===i||37814===i||37815===i||37816===i||37817===i||37818===i||37819===i||37820===i||37821===i){if(null===(r=t.get("WEBGL_compressed_texture_astc")))return null;if(37808===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(37809===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(37810===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(37811===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(37812===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(37813===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(37814===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(37815===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(37816===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(37817===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(37818===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(37819===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(37820===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(37821===i)return"srgb"===n?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(36492===i||36494===i||36495===i){if(null===(r=t.get("EXT_texture_compression_bptc")))return null;if(36492===i)return"srgb"===n?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(36494===i)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(36495===i)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(36283===i||36284===i||36285===i||36286===i){if(null===(r=t.get("EXT_texture_compression_rgtc")))return null;if(36283===i)return r.COMPRESSED_RED_RGTC1_EXT;if(36284===i)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(36285===i)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(36286===i)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return 1020===i?e.UNSIGNED_INT_24_8:void 0!==e[i]?e[i]:null}}}let aS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ab=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;let WebXRDepthSensing=class WebXRDepthSensing{init(e,t){if(null===this.texture){let i=new ExternalTexture(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(null!==this.texture&&null===this.mesh){let t=e.cameras[0].viewport,i=new ShaderMaterial({vertexShader:aS,fragmentShader:ab,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mesh(new PlaneGeometry(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}};let WebXRManager=class WebXRManager extends EventDispatcher{constructor(e,t){super();let i=this,r=null,a=1,n=null,s="local-floor",o=1,l=null,c=null,h=null,u=null,d=null,p=null,f="u">typeof XRWebGLBinding,m=new WebXRDepthSensing,g={},v=t.getContextAttributes(),_=null,y=null,x=[],M=[],S=new Vector2,T=null,E=null,w=new PerspectiveCamera;w.viewport=new Vector4;let A=new PerspectiveCamera;A.viewport=new Vector4;let R=[w,A],P=new ArrayCamera,L=null,I=null;function N(e){let t=M.indexOf(e.inputSource);if(-1===t)return;let i=x[t];void 0!==i&&(i.update(e.inputSource,e.frame,l||n),i.dispatchEvent({type:e.type,data:e.inputSource}))}function D(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",D),r.removeEventListener("inputsourceschange",U);for(let e=0;e<x.length;e++){let t=M[e];null!==t&&(M[e]=null,x[e].disconnect(t))}for(let e in L=null,I=null,m.reset(),g)delete g[e];if(e.setRenderTarget(_),d=null,u=null,h=null,r=null,y=null,k.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(S.width,S.height,!1),null!==E){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}function U(e){for(let t=0;t<e.removed.length;t++){let i=e.removed[t],r=M.indexOf(i);r>=0&&(M[r]=null,x[r].disconnect(i))}for(let t=0;t<e.added.length;t++){let i=e.added[t],r=M.indexOf(i);if(-1===r){for(let e=0;e<x.length;e++)if(e>=M.length){M.push(i),r=e;break}else if(null===M[e]){M[e]=i,r=e;break}if(-1===r)break}let a=x[r];a&&a.connect(i)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return void 0===t&&(t=new WebXRController,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return void 0===t&&(t=new WebXRController,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return void 0===t&&(t=new WebXRController,x[e]=t),t.getHandSpace()},this.setFramebufferScaleFactor=function(e){a=e,!0===i.isPresenting&&b("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(e){s=e,!0===i.isPresenting&&b("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||n},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return null!==u?u:d},this.getBinding=function(){return null===h&&f&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(c){if(null!==(r=c)){if(_=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",D),r.addEventListener("inputsourceschange",U),!0!==v.xrCompatible&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(S),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let i=null,n=null,s=null;v.depth&&(s=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,i=v.stencil?1027:1026,n=v.stencil?1020:1014);let o={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:a};u=(h=this.getBinding()).createProjectionLayer(o),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new WebGLRenderTarget(u.textureWidth,u.textureHeight,{format:1023,type:1009,depthTexture:new DepthTexture(u.textureWidth,u.textureHeight,n,void 0,void 0,void 0,void 0,void 0,void 0,i),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:4*!!v.antialias,resolveDepthBuffer:!1===u.ignoreDepthValues,resolveStencilBuffer:!1===u.ignoreDepthValues,storeMultisampledDepthBuffer:!1===u.ignoreDepthValues,storeMultisampledStencilBuffer:!1===u.ignoreDepthValues})}else{let i={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(r,t,i),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new WebGLRenderTarget(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:!1===d.ignoreDepthValues,resolveStencilBuffer:!1===d.ignoreDepthValues,storeMultisampledDepthBuffer:!1===d.ignoreDepthValues,storeMultisampledStencilBuffer:!1===d.ignoreDepthValues})}y.isXRRenderTarget=!0,this.setFoveation(o),l=null,n=await r.requestReferenceSpace(s),k.setContext(r),k.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(null!==r)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let O=new Vector3,F=new Vector3;function B(e,t){null===t?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){var t,i,a;if(null===r)return;let n=e.near,s=e.far;null!==m.texture&&(m.depthNear>0&&(n=m.depthNear),m.depthFar>0&&(s=m.depthFar)),P.near=A.near=w.near=n,P.far=A.far=w.far=s,(L!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),L=P.near,I=P.far),P.layers.mask=6|e.layers.mask,w.layers.mask=-5&P.layers.mask,A.layers.mask=-3&P.layers.mask;let o=e.parent,l=P.cameras;B(P,o);for(let e=0;e<l.length;e++)B(l[e],o);2===l.length?function(e,t,i){O.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(i.matrixWorld);let r=O.distanceTo(F),a=t.projectionMatrix.elements,n=i.projectionMatrix.elements,s=a[14]/(a[10]-1),o=a[14]/(a[10]+1),l=(a[9]+1)/a[5],c=(a[9]-1)/a[5],h=(a[8]-1)/a[0],u=(n[8]+1)/n[0],d=r/(-h+u),p=-(d*h);if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(p),e.translateZ(d),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),-1===a[10])e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=s+d,i=o+d;e.projectionMatrix.makePerspective(s*h-p,s*u+(r-p),l*o/i*t,c*o/i*t,t,i),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}(P,w,A):P.projectionMatrix.copy(w.projectionMatrix),null===E&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),t=e,i=P,null===(a=o)?t.matrix.copy(i.matrixWorld):(t.matrix.copy(a.matrixWorld),t.matrix.invert(),t.matrix.multiply(i.matrixWorld)),t.matrix.decompose(t.position,t.quaternion,t.scale),t.updateMatrixWorld(!0),t.projectionMatrix.copy(i.projectionMatrix),t.projectionMatrixInverse.copy(i.projectionMatrixInverse),t.isPerspectiveCamera&&(t.fov=2*C*Math.atan(1/t.projectionMatrix.elements[5]),t.zoom=1)},this.getCamera=function(){return P},this.getFoveation=function(){if(null!==u||null!==d)return o},this.setFoveation=function(e){o=e,null!==u&&(u.fixedFoveation=e),null!==d&&void 0!==d.fixedFoveation&&(d.fixedFoveation=e)},this.hasDepthSensing=function(){return null!==m.texture},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function(e){return g[e]};let V=null,k=new im;k.setAnimationLoop(function(t,a){if(c=a.getViewerPose(l||n),p=a,null!==c){let t=c.views;null!==d&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let a=!1;t.length!==P.cameras.length&&(P.cameras.length=0,a=!0);for(let i=0;i<t.length;i++){let r=t[i],n=null;if(null!==d)n=d.getViewport(r);else{let t=h.getViewSubImage(u,r);n=t.viewport,0===i&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let s=R[i];void 0===s&&((s=new PerspectiveCamera).layers.enable(i),s.viewport=new Vector4,R[i]=s),s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.projectionMatrix.fromArray(r.projectionMatrix),s.projectionMatrixInverse.copy(s.projectionMatrix).invert(),s.viewport.set(n.x,n.y,n.width,n.height),0===i&&(P.matrix.copy(s.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),!0===a&&P.cameras.push(s)}let n=r.enabledFeatures;if(n&&n.includes("depth-sensing")&&"gpu-optimized"==r.depthUsage&&f){let e=(h=i.getBinding()).getDepthInformation(t[0]);e&&e.isValid&&e.texture&&m.init(e,r.renderState)}if(n&&n.includes("camera-access")&&f){e.state.unbindTexture(),h=i.getBinding();for(let e=0;e<t.length;e++){let i=t[e].camera;if(i){let e=g[i];e||(e=new ExternalTexture,g[i]=e);let t=h.getCameraImage(i);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=M[e],i=x[e];null!==t&&void 0!==i&&i.update(t,a,l||n)}V&&V(t,a),a.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:a}),p=null}),this.setAnimationLoop=function(e){V=e},this.dispose=function(){}}};let aT=new Matrix4,aE=new Matrix3;function aw(e,t){function i(e,t){!0===e.matrixAutoUpdate&&e.updateMatrix(),t.value.copy(e.matrix)}function r(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,i(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,i(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,i(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,1===r.side&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,i(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),1===r.side&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,i(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,i(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,i(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let a=t.get(r),n=a.envMap,s=a.envMapRotation;n&&(e.envMap.value=n,e.envMapRotation.value.setFromMatrix4(aT.makeRotationFromEuler(s)).transpose(),n.isCubeTexture&&!1===n.isRenderTargetTexture&&e.envMapRotation.value.premultiply(aE),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,i(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,i(r.aoMap,e.aoMapTransform))}return{refreshFogUniforms:function(t,i){i.color.getRGB(t.fogColor.value,tK(e)),i.isFog?(t.fogNear.value=i.near,t.fogFar.value=i.far):i.isFogExp2&&(t.fogDensity.value=i.density)},refreshMaterialUniforms:function(e,a,n,s,o){var l,c,h,u,d,p,f,m,g,v,_,y,x,M,S,b,T,E,w,A,R,C,P;let L;a.isNodeMaterial?a.uniformsNeedUpdate=!1:a.isMeshBasicMaterial?r(e,a):a.isMeshLambertMaterial?(r(e,a),a.envMap&&(e.envMapIntensity.value=a.envMapIntensity)):a.isMeshToonMaterial?(r(e,a),l=e,(c=a).gradientMap&&(l.gradientMap.value=c.gradientMap)):a.isMeshPhongMaterial?(r(e,a),h=e,u=a,h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4),a.envMap&&(e.envMapIntensity.value=a.envMapIntensity)):a.isMeshStandardMaterial?(r(e,a),d=e,p=a,d.metalness.value=p.metalness,p.metalnessMap&&(d.metalnessMap.value=p.metalnessMap,i(p.metalnessMap,d.metalnessMapTransform)),d.roughness.value=p.roughness,p.roughnessMap&&(d.roughnessMap.value=p.roughnessMap,i(p.roughnessMap,d.roughnessMapTransform)),p.envMap&&(d.envMapIntensity.value=p.envMapIntensity),a.isMeshPhysicalMaterial&&(f=e,m=a,g=o,f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,i(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,i(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,i(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,i(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,i(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),1===m.side&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.retroreflectivity>0&&(f.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,i(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,i(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=g.texture,f.transmissionSamplerSize.value.set(g.width,g.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,i(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,i(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,i(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,i(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,i(m.specularIntensityMap,f.specularIntensityMapTransform)))):a.isMeshMatcapMaterial?(r(e,a),v=e,(_=a).matcap&&(v.matcap.value=_.matcap)):a.isMeshDepthMaterial?r(e,a):a.isMeshDistanceMaterial?(r(e,a),y=e,x=a,L=t.get(x).light,y.referencePosition.value.setFromMatrixPosition(L.matrixWorld),y.nearDistance.value=L.shadow.camera.near,y.farDistance.value=L.shadow.camera.far):a.isMeshNormalMaterial?r(e,a):a.isLineBasicMaterial?(M=e,S=a,M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),a.isLineDashedMaterial&&(b=e,T=a,b.dashSize.value=T.dashSize,b.totalSize.value=T.dashSize+T.gapSize,b.scale.value=T.scale)):a.isPointsMaterial?(E=e,w=a,A=n,R=s,E.diffuse.value.copy(w.color),E.opacity.value=w.opacity,E.size.value=w.size*A,E.scale.value=.5*R,w.map&&(E.map.value=w.map,i(w.map,E.uvTransform)),w.alphaMap&&(E.alphaMap.value=w.alphaMap,i(w.alphaMap,E.alphaMapTransform)),w.alphaTest>0&&(E.alphaTest.value=w.alphaTest)):a.isSpriteMaterial?(C=e,P=a,C.diffuse.value.copy(P.color),C.opacity.value=P.opacity,C.rotation.value=P.rotation,P.map&&(C.map.value=P.map,i(P.map,C.mapTransform)),P.alphaMap&&(C.alphaMap.value=P.alphaMap,i(P.alphaMap,C.alphaMapTransform)),P.alphaTest>0&&(C.alphaTest.value=P.alphaTest)):a.isShadowMaterial?(e.color.value.copy(a.color),e.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function aA(e,t,i,r){let a={},n={},s=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(t,i,r,a){if(!0===function(e,t,i,r){let a=e.value,n=t+"_"+i;if(void 0===r[n])return"number"==typeof a||"boolean"==typeof a?r[n]=a:ArrayBuffer.isView(a)?r[n]=a.slice():r[n]=a.clone(),!0;{let e=r[n];if("number"==typeof a||"boolean"==typeof a){if(e!==a)return r[n]=a,!0}else if(ArrayBuffer.isView(a))return!0;else if(!1===e.equals(a))return e.copy(a),!0}return!1}(t,i,r,a)){let i=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let i=0;i<r.length;i++){let a=r[i],n=h(a);c(a,t.__data,e),"number"==typeof a||"boolean"==typeof a||a.isMatrix3||ArrayBuffer.isView(a)||(e+=n.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,i,t.__data)}}function c(e,t,i){"number"==typeof e||"boolean"==typeof e?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,i)}function h(e){let t={boundary:0,storage:0};return"number"==typeof e||"boolean"==typeof e?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?b("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):b("WebGLRenderer: Unsupported uniform value type.",e),t}function u(t){let i=t.target;i.removeEventListener("dispose",u);let r=s.indexOf(i.__bindingPointIndex);s.splice(r,1),e.deleteBuffer(a[i.id]),delete a[i.id],delete n[i.id]}return{bind:function(e,t){let i=t.program;r.uniformBlockBinding(e,i)},update:function(i,c){var d;let p,f,m,g,v=a[i.id];void 0===v&&(function(e){let t=e.uniforms,i=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],a=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=a.length;e<r;e++){let r=h(a[e]),n=i%16,s=n%r.boundary,o=n+s;i+=s,0!==o&&16-o<r.storage&&(i+=16-o),t.__data=new Float32Array(r.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=i,i+=r.storage}}}let r=i%16;r>0&&(i+=16-r),e.__size=i,e.__cache={}}(i),(d=i).__bindingPointIndex=p=function(){for(let e=0;e<o;e++)if(-1===s.indexOf(e))return s.push(e),e;return T("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}(),f=e.createBuffer(),m=d.__size,g=d.usage,e.bindBuffer(e.UNIFORM_BUFFER,f),e.bufferData(e.UNIFORM_BUFFER,m,g),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,p,f),v=f,a[i.id]=v,i.addEventListener("dispose",u));let _=c.program;r.updateUBOMapping(i,_);let y=t.render.frame;n[i.id]!==y&&(function(t){let i=a[t.id],r=t.uniforms,n=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,i);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let i=0,r=t.length;i<r;i++)l(t[i],e,i,n);else l(t,e,0,n)}e.bindBuffer(e.UNIFORM_BUFFER,null)}(i),n[i.id]=y)},dispose:function(){for(let t in a)e.deleteBuffer(a[t]);s=[],a={},n={}}}}aE.set(-1,0,0,0,1,0,0,0,1);let aR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),aC=null;let WebGLRenderer=class WebGLRenderer{get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=V._getDrawingBufferColorSpace(e),t.unpackColorSpace=V._getUnpackColorSpace()}constructor(e={}){let t,i,r,a,n,s,o,l,c,h,u,d,p,f,m,g,v,_,x,S,E,w,A,R,C,{canvas:P=((C=y("canvas")).style.display="block",C),context:L=null,depth:I=!0,stencil:N=!1,alpha:D=!1,antialias:U=!1,premultipliedAlpha:O=!0,preserveDrawingBuffer:F=!1,powerPreference:B="default",failIfMajorPerformanceCaveat:k=!1,reversedDepthBuffer:G=!1,outputBufferType:z=1009}=e;if(this.isWebGLRenderer=!0,null!==L){if("u">typeof WebGLRenderingContext&&L instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");t=L.getContextAttributes().alpha}else t=D;let H=new Set([1033,1031,1029]),W=new Set([1009,1014,1012,1020,1017,1018]),X=new Uint32Array(4),j=new Int32Array(4),q=new Vector3,Y=null,K=null,J=[],Z=[],Q=null;this.domElement=P,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let $=this,ee=!1,et=null,ei=null,er=null,ea=null;this._outputColorSpace="srgb";let en=0,es=0,eo=null,el=-1,ec=null,eh=new Vector4,eu=new Vector4,ed=null,ep=new Color(0),ef=0,em=P.width,eg=P.height,ev=1,e_=null,ey=null,ex=new Vector4(0,0,em,eg),eM=new Vector4(0,0,em,eg),eS=!1,eb=new Frustum,eT=!1,eE=!1,ew=new Matrix4,eA=new Vector3,eR=new Vector4,eC={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},eP=!1;function eL(){return null===eo?ev:1}let eI=L;function eN(e,t){return P.getContext(e,t)}try{if("setAttribute"in P&&P.setAttribute("data-engine","three.js r".concat("186")),P.addEventListener("webglcontextlost",eO,!1),P.addEventListener("webglcontextrestored",eF,!1),P.addEventListener("webglcontextcreationerror",eB,!1),null===eI){let e="webgl2";if(eI=eN(e,{alpha:!0,depth:I,stencil:N,antialias:U,premultipliedAlpha:O,preserveDrawingBuffer:F,powerPreference:B,failIfMajorPerformanceCaveat:k}),null===eI)if(eN(e))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}eD()}catch(e){throw P.removeEventListener("webglcontextlost",eO,!1),P.removeEventListener("webglcontextrestored",eF,!1),P.removeEventListener("webglcontextcreationerror",eB,!1),T("WebGLRenderer: "+e.message),e}function eD(){(i=new iz(eI)).init(),w=new aM(eI,i),r=new iw(eI,i,e,w),a=new ay(eI,i),r.reversedDepthBuffer&&G&&a.buffers.depth.setReversed(!0),ei=eI.createFramebuffer(),er=eI.createFramebuffer(),ea=eI.createFramebuffer(),n=new iX(eI),s=new ae,o=new ax(eI,i,a,s,r,w,n),l=new iG($),c=new ig(eI),A=new iT(eI,c),h=new iH(eI,c,n,A),u=new iq(eI,h,c,A,n),x=new ij(eI,r,o),g=new iA(s),d=new r7($,l,i,r,A,g),p=new aw($,s),f=new aa,m=new ah(i),_=new ib($,l,a,u,t,O),v=new a_($,u,r),R=new aA(eI,n,r,a),S=new iE(eI,i,n),E=new iW(eI,i,n),n.programs=d.programs,$.capabilities=r,$.extensions=i,$.properties=s,$.renderLists=f,$.shadowMap=v,$.state=a,$.info=n}1009!==z&&(Q=new iK(z,P.width,P.height,U,I,N));let eU=new WebXRManager($,eI);function eO(e){e.preventDefault(),M("WebGLRenderer: Context Lost."),ee=!0}function eF(){M("WebGLRenderer: Context Restored."),ee=!1;let e=n.autoReset,t=v.enabled,i=v.autoUpdate,r=v.needsUpdate,a=v.type;eD(),n.autoReset=e,v.enabled=t,v.autoUpdate=i,v.needsUpdate=r,v.type=a}function eB(e){T("WebGLRenderer: A WebGL context could not be created. Reason: ",e.statusMessage)}function eV(e){var t,i;let r,a=e.target;a.removeEventListener("dispose",eV),i=t=a,void 0!==(r=s.get(i).programs)&&(r.forEach(function(e){d.releaseProgram(e)}),i.isShaderMaterial&&d.releaseShaderCache(i)),s.remove(t)}function ek(e,t,i,r){null!==et&&e.isNodeMaterial&&et.setObject(r,e),!0===eT&&g.setState(e,i,!1),!0===e.transparent&&2===e.side&&!1===e.forceSinglePass?(e.side=1,e.needsUpdate=!0,eJ(e,t,r),e.side=0,e.needsUpdate=!0,eJ(e,t,r),e.side=2):eJ(e,t,r)}this.xr=eU,this.getContext=function(){return eI},this.getContextAttributes=function(){return eI.getContextAttributes()},this.forceContextLoss=function(){let e=i.get("WEBGL_lose_context");e&&e.loseContext()},this.forceContextRestore=function(){let e=i.get("WEBGL_lose_context");e&&e.restoreContext()},this.getPixelRatio=function(){return ev},this.setPixelRatio=function(e){void 0!==e&&(ev=e,this.setSize(em,eg,!1))},this.getSize=function(e){return e.set(em,eg)},this.setSize=function(e,t){let i=!(arguments.length>2)||void 0===arguments[2]||arguments[2];eU.isPresenting?b("WebGLRenderer: Can't change size while VR device is presenting."):(em=e,eg=t,P.width=Math.floor(e*ev),P.height=Math.floor(t*ev),!0===i&&(P.style.width=e+"px",P.style.height=t+"px"),null!==Q&&Q.setSize(P.width,P.height),this.setViewport(0,0,e,t))},this.getDrawingBufferSize=function(e){return e.set(em*ev,eg*ev).floor()},this.setDrawingBufferSize=function(e,t,i){em=e,eg=t,ev=i,P.width=Math.floor(e*i),P.height=Math.floor(t*i),this.setViewport(0,0,e,t)},this.setEffects=function(e){if(1009===z)return void T("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");if(e){for(let t=0;t<e.length;t++)if(!0===e[t].isOutputPass){b("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}Q.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(eh)},this.getViewport=function(e){return e.copy(ex)},this.setViewport=function(e,t,i,r){e.isVector4?ex.set(e.x,e.y,e.z,e.w):ex.set(e,t,i,r),a.viewport(eh.copy(ex).multiplyScalar(ev).round())},this.getScissor=function(e){return e.copy(eM)},this.setScissor=function(e,t,i,r){e.isVector4?eM.set(e.x,e.y,e.z,e.w):eM.set(e,t,i,r),a.scissor(eu.copy(eM).multiplyScalar(ev).round())},this.getScissorTest=function(){return eS},this.setScissorTest=function(e){a.setScissorTest(eS=e)},this.setOpaqueSort=function(e){e_=e},this.setTransparentSort=function(e){ey=e},this.getClearColor=function(e){return e.copy(_.getClearColor())},this.setClearColor=function(){_.setClearColor(...arguments)},this.getClearAlpha=function(){return _.getClearAlpha()},this.setClearAlpha=function(){_.setClearAlpha(...arguments)},this.clear=function(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0],t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=0;if(e){let e=!1;if(null!==eo){let t=eo.texture.format;e=H.has(t)}if(e){let e=eo.texture.type,t=W.has(e),i=_.getClearColor(),r=_.getClearAlpha(),a=i.r,n=i.g,s=i.b;t?(X[0]=a,X[1]=n,X[2]=s,X[3]=r,eI.clearBufferuiv(eI.COLOR,0,X)):(j[0]=a,j[1]=n,j[2]=s,j[3]=r,eI.clearBufferiv(eI.COLOR,0,j))}else r|=eI.COLOR_BUFFER_BIT}t&&(r|=eI.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),i&&(r|=eI.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(0xffffffff)),0!==r&&eI.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),et=e},this.dispose=function(){P.removeEventListener("webglcontextlost",eO,!1),P.removeEventListener("webglcontextrestored",eF,!1),P.removeEventListener("webglcontextcreationerror",eB,!1),_.dispose(),f.dispose(),m.dispose(),s.dispose(),l.dispose(),u.dispose(),A.dispose(),R.dispose(),d.dispose(),eU.dispose(),eU.removeEventListener("sessionstart",ez),eU.removeEventListener("sessionend",eH),eW.stop()},this.renderBufferDirect=function(e,t,n,u,d,f){let m;null===t&&(t=eC);let v=d.isMesh&&0>d.matrixWorld.determinantAffine(),_=function(e,t,i,n,c){!0!==t.isScene&&(t=eC),o.resetTextureUnits();let h=t.fog,u=n.isMeshStandardMaterial||n.isMeshLambertMaterial||n.isMeshPhongMaterial?t.environment:null,d=null===eo?$.outputColorSpace:!0===eo.isXRRenderTarget?eo.texture.colorSpace:V.workingColorSpace,f=n.isMeshStandardMaterial||n.isMeshLambertMaterial&&!n.envMap||n.isMeshPhongMaterial&&!n.envMap,m=l.get(n.envMap||u,f),v=!0===n.vertexColors&&!!i.attributes.color&&4===i.attributes.color.itemSize,_=!!i.attributes.tangent&&(!!n.normalMap||n.anisotropy>0),y=!!i.morphAttributes.position,M=!!i.morphAttributes.normal,S=!!i.morphAttributes.color,b=0;n.toneMapped&&(null===eo||!0===eo.isXRRenderTarget)&&(b=$.toneMapping);let T=i.morphAttributes.position||i.morphAttributes.normal||i.morphAttributes.color,E=void 0!==T?T.length:0,w=s.get(n),A=K.state.lights;if(!0===eT&&(!0===eE||e!==ec)){let t=e===ec&&n.id===el;g.setState(n,e,t)}let C=!1;n.version===w.__version?w.needsLights&&w.lightsStateVersion!==A.state.version||w.outputColorSpace!==d||c.isBatchedMesh&&!1===w.batching?C=!0:c.isBatchedMesh||!0!==w.batching?c.isBatchedMesh&&!0===w.batchingColor&&null===c._colorsTexture||c.isBatchedMesh&&!1===w.batchingColor&&null!==c._colorsTexture||c.isInstancedMesh&&!1===w.instancing?C=!0:c.isInstancedMesh||!0!==w.instancing?c.isSkinnedMesh&&!1===w.skinning?C=!0:c.isSkinnedMesh||!0!==w.skinning?c.isInstancedMesh&&!0===w.instancingColor&&null===c.instanceColor||c.isInstancedMesh&&!1===w.instancingColor&&null!==c.instanceColor||c.isInstancedMesh&&!0===w.instancingMorph&&null===c.morphTexture||c.isInstancedMesh&&!1===w.instancingMorph&&null!==c.morphTexture||w.envMap!==m||!0===n.fog&&w.fog!==h||void 0!==w.numClippingPlanes&&(w.numClippingPlanes!==g.numPlanes||w.numIntersection!==g.numIntersection)||w.vertexAlphas!==v||w.vertexTangents!==_||w.morphTargets!==y||w.morphNormals!==M||w.morphColors!==S||w.toneMapping!==b||w.morphTargetsCount!==E?C=!0:!!w.lightProbeGrid!=K.state.lightProbeGridArray.length>0&&(C=!0):C=!0:C=!0:C=!0:(C=!0,w.__version=n.version);let P=w.currentProgram;!0===C&&(P=eJ(n,t,c),et&&n.isNodeMaterial&&et.onUpdateProgram(n,P,w));let L=!1,I=!1,N=!1,D=P.getUniforms(),U=w.uniforms;if(a.useProgram(P.program)&&(L=!0,I=!0,N=!0),n.id!==el&&(el=n.id,I=!0),w.needsLights){let e=function(e,t){if(0===e.length)return null;if(1===e.length)return null!==e[0].texture?e[0]:null;q.setFromMatrixPosition(t.matrixWorld);for(let t=0,i=e.length;t<i;t++){let i=e[t];if(null!==i.texture&&i.boundingBox.containsPoint(q))return i}return null}(K.state.lightProbeGridArray,c);w.lightProbeGrid!==e&&(w.lightProbeGrid=e,I=!0)}if(L||ec!==e){a.buffers.depth.getReversed()&&!0!==e.reversedDepth&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(eI,"projectionMatrix",e.projectionMatrix),D.setValue(eI,"viewMatrix",e.matrixWorldInverse);let t=D.map.cameraPosition;void 0!==t&&t.setValue(eI,eA.setFromMatrixPosition(e.matrixWorld)),r.logarithmicDepthBuffer&&D.setValue(eI,"logDepthBufFC",2/(Math.log(e.far+1)/Math.LN2)),(n.isMeshPhongMaterial||n.isMeshToonMaterial||n.isMeshLambertMaterial||n.isMeshBasicMaterial||n.isMeshStandardMaterial||n.isShaderMaterial)&&D.setValue(eI,"isOrthographic",!0===e.isOrthographicCamera),ec!==e&&(ec=e,I=!0,N=!0)}if(w.needsLights&&(A.state.sunShadowMap.length>0&&D.setValue(eI,"sunShadowMap",A.state.sunShadowMap,o),A.state.directionalShadowMap.length>0&&D.setValue(eI,"directionalShadowMap",A.state.directionalShadowMap,o),A.state.spotShadowMap.length>0&&D.setValue(eI,"spotShadowMap",A.state.spotShadowMap,o),A.state.pointShadowMap.length>0&&D.setValue(eI,"pointShadowMap",A.state.pointShadowMap,o)),c.isSkinnedMesh){D.setOptional(eI,c,"bindMatrix"),D.setOptional(eI,c,"bindMatrixInverse");let e=c.skeleton;e&&(null===e.boneTexture&&e.computeBoneTexture(),D.setValue(eI,"boneTexture",e.boneTexture,o))}c.isBatchedMesh&&(D.setOptional(eI,c,"batchingTexture"),D.setValue(eI,"batchingTexture",c._matricesTexture,o),D.setOptional(eI,c,"batchingIdTexture"),D.setValue(eI,"batchingIdTexture",c._indirectTexture,o),D.setOptional(eI,c,"batchingColorTexture"),null!==c._colorsTexture&&D.setValue(eI,"batchingColorTexture",c._colorsTexture,o));let O=i.morphAttributes;if((void 0!==O.position||void 0!==O.normal||void 0!==O.color)&&x.update(c,i,P),(I||w.receiveShadow!==c.receiveShadow)&&(w.receiveShadow=c.receiveShadow,D.setValue(eI,"receiveShadow",c.receiveShadow)),(n.isMeshStandardMaterial||n.isMeshLambertMaterial||n.isMeshPhongMaterial)&&null===n.envMap&&null!==t.environment&&(U.envMapIntensity.value=t.environmentIntensity),void 0!==U.dfgLUT&&(U.dfgLUT.value=(null===aC&&((aC=new DataTexture(aR,16,16,1030,1016)).name="DFG_LUT",aC.minFilter=1006,aC.magFilter=1006,aC.wrapS=1001,aC.wrapT=1001,aC.generateMipmaps=!1,aC.needsUpdate=!0),aC)),I){var F,B;if(D.setValue(eI,"toneMappingExposure",$.toneMappingExposure),w.needsLights&&(F=U,B=N,F.ambientLightColor.needsUpdate=B,F.lightProbe.needsUpdate=B,F.sunLights.needsUpdate=B,F.sunLightShadows.needsUpdate=B,F.directionalLights.needsUpdate=B,F.directionalLightShadows.needsUpdate=B,F.pointLights.needsUpdate=B,F.pointLightShadows.needsUpdate=B,F.spotLights.needsUpdate=B,F.spotLightShadows.needsUpdate=B,F.rectAreaLights.needsUpdate=B,F.hemisphereLights.needsUpdate=B),h&&!0===n.fog&&p.refreshFogUniforms(U,h),p.refreshMaterialUniforms(U,n,ev,eg,K.state.transmissionRenderTarget[e.id]),w.needsLights&&w.lightProbeGrid){let e=w.lightProbeGrid;U.probesSH.value=e.texture,U.probesMin.value.copy(e.boundingBox.min),U.probesMax.value.copy(e.boundingBox.max),U.probesResolution.value.copy(e.resolution)}WebGLUniforms.upload(eI,eZ(w),U,o)}if(n.isShaderMaterial&&!0===n.uniformsNeedUpdate&&(WebGLUniforms.upload(eI,eZ(w),U,o),n.uniformsNeedUpdate=!1),n.isSpriteMaterial&&D.setValue(eI,"center",c.center),D.setValue(eI,"modelViewMatrix",c.modelViewMatrix),D.setValue(eI,"normalMatrix",c.normalMatrix),D.setValue(eI,"modelMatrix",c.matrixWorld),void 0!==n.uniformsGroups){let e=n.uniformsGroups;for(let t=0,i=e.length;t<i;t++){let i=e[t];R.update(i,P),R.bind(i,P)}}return P}(e,t,n,u,d);a.setMaterial(u,v);let y=n.index,M=1;if(!0===u.wireframe){if(void 0===(y=h.getWireframeAttribute(n)))return;M=2}let b=n.drawRange,T=n.attributes.position,w=b.start*M,C=(b.start+b.count)*M;null!==f&&(w=Math.max(w,f.start*M),C=Math.min(C,(f.start+f.count)*M)),null!==y?(w=Math.max(w,0),C=Math.min(C,y.count)):null!=T&&(w=Math.max(w,0),C=Math.min(C,T.count));let P=C-w;if(P<0||1/0===P)return;A.setup(d,u,_,n,y);let L=S;if(null!==y&&(m=c.get(y),(L=E).setIndex(m)),d.isMesh)!0===u.wireframe?(a.setLineWidth(u.wireframeLinewidth*eL()),L.setMode(eI.LINES)):L.setMode(eI.TRIANGLES);else if(d.isLine){let e=u.linewidth;void 0===e&&(e=1),a.setLineWidth(e*eL()),d.isLineSegments?L.setMode(eI.LINES):d.isLineLoop?L.setMode(eI.LINE_LOOP):L.setMode(eI.LINE_STRIP)}else d.isPoints?L.setMode(eI.POINTS):d.isSprite&&L.setMode(eI.TRIANGLES);if(d.isBatchedMesh)if(i.get("WEBGL_multi_draw"))L.renderMultiDraw(d._multiDrawStarts,d._multiDrawCounts,d._multiDrawCount);else{let e=d._multiDrawStarts,t=d._multiDrawCounts,i=d._multiDrawCount,r=y?c.get(y).bytesPerElement:1,a=s.get(u).currentProgram.getUniforms();for(let n=0;n<i;n++)a.setValue(eI,"_gl_DrawID",n),L.render(e[n]/r,t[n])}else if(d.isInstancedMesh)L.renderInstances(w,P,d.count);else if(n.isInstancedBufferGeometry){let e=void 0!==n._maxInstanceCount?n._maxInstanceCount:1/0,t=Math.min(n.instanceCount,e);L.renderInstances(w,P,t)}else L.render(w,P)},this.compile=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;null===i&&(i=e),null!==et&&et.renderStart(e,t,i),(K=m.get(i)).init(t),Z.push(K),i.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(K.pushLight(e),e.castShadow&&K.pushShadow(e))}),e!==i&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(K.pushLight(e),e.castShadow&&K.pushShadow(e))}),K.setupLights(),null!==et&&et.updateLights(K.state.lightsArray),eE=this.localClippingEnabled,!0===(eT=g.init(this.clippingPlanes,eE))&&g.setGlobalState(this.clippingPlanes,t),null!==et&&v.render(K.state.shadowsArray,i,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let a=e.material;if(a)if(Array.isArray(a))for(let n=0;n<a.length;n++){let s=a[n];ek(s,i,t,e),r.add(s)}else ek(a,i,t,e),r.add(a)}),K=Z.pop(),null!==et&&et.renderEnd(),r},this.compileAsync=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=this.compile(e,t,r);return new Promise(t=>{function r(){(a.forEach(function(e){let t=s.get(e).currentProgram;(void 0===t||t.isReady())&&a.delete(e)}),0===a.size)?t(e):setTimeout(r,10)}null!==i.get("KHR_parallel_shader_compile")?r():setTimeout(r,10)})};let eG=null;function ez(){eW.stop()}function eH(){eW.start()}let eW=new im;function eX(e,t,i,r){if(!1===e.visible)return;if(e.layers.test(t.layers)){if(e.isGroup)i=e.renderOrder;else if(e.isLOD)!0===e.autoUpdate&&e.update(t);else if(e.isLightProbeGrid)K.pushLightProbeGrid(e);else if(e.isLight)K.pushLight(e),e.castShadow&&K.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(eb)){r&&eR.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ew);let a=u.update(e),n=e.material;n.visible&&Y.push(e,a,n,i,eR.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(eb))){let a=u.update(e),n=e.material;if(r&&(void 0!==e.boundingSphere?(null===e.boundingSphere&&e.computeBoundingSphere(),eR.copy(e.boundingSphere.center)):(null===a.boundingSphere&&a.computeBoundingSphere(),eR.copy(a.boundingSphere.center)),eR.applyMatrix4(e.matrixWorld).applyMatrix4(ew)),Array.isArray(n)){let r=a.groups;for(let s=0,o=r.length;s<o;s++){let o=r[s],l=n[o.materialIndex];l&&l.visible&&Y.push(e,a,l,i,eR.z,o,t)}}else n.visible&&Y.push(e,a,n,i,eR.z,null,t)}}let a=e.children;for(let e=0,n=a.length;e<n;e++)eX(a[e],t,i,r)}function ej(e,t,i,r){let{opaque:n,transmissive:s,transparent:o}=e;K.setupLightsView(i),!0===eT&&g.setGlobalState($.clippingPlanes,i),r&&a.viewport(eh.copy(r)),n.length>0&&eY(n,t,i),s.length>0&&eY(s,t,i),o.length>0&&eY(o,t,i),a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),a.setPolygonOffset(!1)}function eq(e,t,a,n){if(null!==(!0===a.isScene?a.overrideMaterial:null))return;if(void 0===K.state.transmissionRenderTarget[n.id]){let e=i.has("EXT_color_buffer_half_float")||i.has("EXT_color_buffer_float");K.state.transmissionRenderTarget[n.id]=new WebGLRenderTarget(1,1,{generateMipmaps:!0,type:e?1016:1009,minFilter:1008,samples:Math.max(4,r.samples),stencilBuffer:N,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:V.workingColorSpace})}let s=K.state.transmissionRenderTarget[n.id],l=n.viewport||eh;s.setSize(l.z*$.transmissionResolutionScale,l.w*$.transmissionResolutionScale);let c=$.getRenderTarget(),h=$.getActiveCubeFace(),u=$.getActiveMipmapLevel();$.setRenderTarget(s),$.getClearColor(ep),(ef=$.getClearAlpha())<1&&$.setClearColor(0xffffff,.5),$.clear(),eP&&_.render(a);let d=$.toneMapping;$.toneMapping=0;let p=n.viewport;if(void 0!==n.viewport&&(n.viewport=void 0),K.setupLightsView(n),!0===eT&&g.setGlobalState($.clippingPlanes,n),eY(e,a,n),o.updateMultisampleRenderTarget(s),o.updateRenderTargetMipmap(s),!1===i.has("WEBGL_multisampled_render_to_texture")){let e=!1;for(let i=0,r=t.length;i<r;i++){let{object:r,geometry:s,material:o,group:l}=t[i];if(2===o.side&&r.layers.test(n.layers)){let t=o.side;o.side=1,o.needsUpdate=!0,eK(r,a,n,s,o,l),o.side=t,o.needsUpdate=!0,e=!0}}!0===e&&(o.updateMultisampleRenderTarget(s),o.updateRenderTargetMipmap(s))}$.setRenderTarget(c,h,u),$.setClearColor(ep,ef),void 0!==p&&(n.viewport=p),$.toneMapping=d}function eY(e,t,i){let r=!0===t.isScene?t.overrideMaterial:null;for(let a=0,n=e.length;a<n;a++){let n=e[a],{object:s,geometry:o,group:l}=n,c=n.material;!0===c.allowOverride&&null!==r&&(c=r),s.layers.test(i.layers)&&eK(s,t,i,o,c,l)}}function eK(e,t,i,r,a,n){null!==et&&a.isNodeMaterial&&et.setObject(e,a),e.onBeforeRender($,t,i,r,a,n),e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),a.onBeforeRender($,t,i,r,e,n),!0===a.transparent&&2===a.side&&!1===a.forceSinglePass?(a.side=1,a.needsUpdate=!0,$.renderBufferDirect(i,t,r,a,e,n),a.side=0,a.needsUpdate=!0,$.renderBufferDirect(i,t,r,a,e,n),a.side=2):$.renderBufferDirect(i,t,r,a,e,n),e.onAfterRender($,t,i,r,a,n)}function eJ(e,t,i){var r;!0!==t.isScene&&(t=eC);let a=s.get(e),n=K.state.lights,o=K.state.shadowsArray,c=n.state.version,h=d.getParameters(e,n.state,o,t,i,K.state.lightProbeGridArray),u=d.getProgramCacheKey(h),p=a.programs;a.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,a.fog=t.fog;let f=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;a.envMap=l.get(e.envMap||a.environment,f),a.envMapRotation=null!==a.environment&&null===e.envMap?t.environmentRotation:e.envMapRotation,void 0===p&&(e.addEventListener("dispose",eV),a.programs=p=new Map);let m=p.get(u);if(void 0!==m){if(a.currentProgram===m&&a.lightsStateVersion===c)return eQ(e,h),m}else h.uniforms=d.getUniforms(e),null!==et&&e.isNodeMaterial&&et.build(e,i,h),e.onBeforeCompile(h,$),m=d.acquireProgram(h,u),p.set(u,m),a.uniforms=h.uniforms;let v=a.uniforms;return(e.isShaderMaterial||e.isRawShaderMaterial)&&!0!==e.clipping||(v.clippingPlanes=g.uniform),eQ(e,h),a.needsLights=(r=e).isMeshLambertMaterial||r.isMeshToonMaterial||r.isMeshPhongMaterial||r.isMeshStandardMaterial||r.isShadowMaterial||r.isShaderMaterial&&!0===r.lights,a.lightsStateVersion=c,a.needsLights&&(v.ambientLightColor.value=n.state.ambient,v.lightProbe.value=n.state.probe,v.sunLights.value=n.state.sun,v.sunLightShadows.value=n.state.sunShadow,v.directionalLights.value=n.state.directional,v.directionalLightShadows.value=n.state.directionalShadow,v.spotLights.value=n.state.spot,v.spotLightShadows.value=n.state.spotShadow,v.rectAreaLights.value=n.state.rectArea,v.ltc_1.value=n.state.rectAreaLTC1,v.ltc_2.value=n.state.rectAreaLTC2,v.pointLights.value=n.state.point,v.pointLightShadows.value=n.state.pointShadow,v.hemisphereLights.value=n.state.hemi,v.sunShadowMatrix.value=n.state.sunShadowMatrix,v.sunShadowCascade.value=n.state.sunShadowCascade,v.directionalShadowMatrix.value=n.state.directionalShadowMatrix,v.spotLightMatrix.value=n.state.spotLightMatrix,v.spotLightMap.value=n.state.spotLightMap,v.pointShadowMatrix.value=n.state.pointShadowMatrix),a.lightProbeGrid=K.state.lightProbeGridArray.length>0,a.currentProgram=m,a.uniformsList=null,m}function eZ(e){if(null===e.uniformsList){let t=e.currentProgram.getUniforms();e.uniformsList=WebGLUniforms.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function eQ(e,t){let i=s.get(e);i.outputColorSpace=t.outputColorSpace,i.batching=t.batching,i.batchingColor=t.batchingColor,i.instancing=t.instancing,i.instancingColor=t.instancingColor,i.instancingMorph=t.instancingMorph,i.skinning=t.skinning,i.morphTargets=t.morphTargets,i.morphNormals=t.morphNormals,i.morphColors=t.morphColors,i.morphTargetsCount=t.morphTargetsCount,i.numClippingPlanes=t.numClippingPlanes,i.numIntersection=t.numClipIntersection,i.vertexAlphas=t.vertexAlphas,i.vertexTangents=t.vertexTangents,i.toneMapping=t.toneMapping}function e$(e){let t=s.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=r.textureFormatReadable(e.format),t.__typeReadable=r.textureTypeReadable(e.type)),t}eW.setAnimationLoop(function(e){eG&&eG(e)}),"u">typeof self&&eW.setContext(self),this.setAnimationLoop=function(e){eG=e,eU.setAnimationLoop(e),null===e?eW.stop():eW.start()},eU.addEventListener("sessionstart",ez),eU.addEventListener("sessionend",eH),this.render=function(e,t){if(void 0!==t&&!0!==t.isCamera)return void T("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!0===ee)return;null!==et&&et.renderStart(e,t);let i=!0===eU.enabled&&!0===eU.isPresenting,r=null!==Q&&(null===eo||i)&&Q.begin($,eo);if(!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),null===t.parent&&!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),!0===eU.enabled&&!0===eU.isPresenting&&(null===Q||!1===Q.isCompositing())&&(!0===eU.cameraAutoUpdate&&eU.updateCamera(t),t=eU.getCamera()),!0===e.isScene&&e.onBeforeRender($,e,t,eo),(K=m.get(e,Z.length)).init(t),K.state.textureUnits=o.getTextureUnits(),Z.push(K),ew.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),eb.setFromProjectionMatrix(ew,2e3,t.reversedDepth),eE=this.localClippingEnabled,eT=g.init(this.clippingPlanes,eE),(Y=f.get(e,J.length)).init(),J.push(Y),!0===eU.enabled&&!0===eU.isPresenting){let e=$.xr.getDepthSensingMesh();null!==e&&eX(e,t,-1/0,$.sortObjects)}eX(e,t,0,$.sortObjects),Y.finish(),null!==et&&et.updateLights(K.state.lightsArray),!0===$.sortObjects&&Y.sort(e_,ey),(eP=!1===eU.enabled||!1===eU.isPresenting||!1===eU.hasDepthSensing())&&_.addToRenderList(Y,e),this.info.render.frame++,!0===this.info.autoReset&&this.info.reset(),!0===eT&&g.beginShadows();let a=K.state.shadowsArray;if(v.render(a,e,t),!0===eT&&g.endShadows(),!1===(r&&Q.hasRenderPass())){let i=Y.opaque,r=Y.transmissive;if(K.setupLights(),t.isArrayCamera){let a=t.cameras;if(r.length>0)for(let t=0,n=a.length;t<n;t++)eq(i,r,e,a[t]);eP&&_.render(e);for(let t=0,i=a.length;t<i;t++){let i=a[t];ej(Y,e,i,i.viewport)}}else r.length>0&&eq(i,r,e,t),eP&&_.render(e),ej(Y,e,t)}null!==eo&&0===es&&(o.updateMultisampleRenderTarget(eo),o.updateRenderTargetMipmap(eo)),r&&Q.end($),!0===e.isScene&&e.onAfterRender($,e,t),A.resetDefaultState(),el=-1,ec=null,Z.pop(),Z.length>0?(K=Z[Z.length-1],o.setTextureUnits(K.state.textureUnits),!0===eT&&g.setGlobalState($.clippingPlanes,K.state.camera)):K=null,J.pop(),Y=J.length>0?J[J.length-1]:null,null!==et&&et.renderEnd()},this.getActiveCubeFace=function(){return en},this.getActiveMipmapLevel=function(){return es},this.getRenderTarget=function(){return eo},this.setRenderTargetTextures=function(e,t,i){let r=s.get(e);r.__autoAllocateDepthBuffer=!1===e.resolveDepthBuffer,!1===r.__autoAllocateDepthBuffer&&(r.__useRenderToTexture=!1),s.get(e.texture).__webglTexture=t,s.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:i,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let i=s.get(e);i.__webglFramebuffer=t,i.__useDefaultFramebuffer=void 0===t},this.setRenderTarget=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;eo=e,en=t,es=i;let r=null,n=!1,l=!1;if(e){let c=s.get(e);if(void 0!==c.__useDefaultFramebuffer){a.bindFramebuffer(eI.FRAMEBUFFER,c.__webglFramebuffer),eh.copy(e.viewport),eu.copy(e.scissor),ed=e.scissorTest,a.viewport(eh),a.scissor(eu),a.setScissorTest(ed),el=-1;return}if(void 0===c.__webglFramebuffer)o.setupRenderTarget(e);else if(c.__hasExternalTextures)o.rebindTextures(e,s.get(e.texture).__webglTexture,s.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(c.__boundDepthTexture!==t){if(null!==t&&s.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");o.setupDepthRenderbuffer(e)}}let h=e.texture;(h.isData3DTexture||h.isDataArrayTexture||h.isCompressedArrayTexture)&&(l=!0);let u=s.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(u[t])?u[t][i]:u[t],n=!0):r=e.samples>0&&!1===o.useMultisampledRTT(e)?s.get(e).__webglMultisampledFramebuffer:Array.isArray(u)?u[i]:u,eh.copy(e.viewport),eu.copy(e.scissor),ed=e.scissorTest}else eh.copy(ex).multiplyScalar(ev).floor(),eu.copy(eM).multiplyScalar(ev).floor(),ed=eS;if(0!==i&&(r=ei),a.bindFramebuffer(eI.FRAMEBUFFER,r)&&a.drawBuffers(e,r),a.viewport(eh),a.scissor(eu),a.setScissorTest(ed),n){let r=s.get(e.texture);eI.framebufferTexture2D(eI.FRAMEBUFFER,eI.COLOR_ATTACHMENT0,eI.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,i)}else if(l)for(let r=0;r<e.textures.length;r++){let a=s.get(e.textures[r]);eI.framebufferTextureLayer(eI.FRAMEBUFFER,eI.COLOR_ATTACHMENT0+r,a.__webglTexture,i,t)}else if(null!==e&&0!==i){let t=s.get(e.texture);eI.framebufferTexture2D(eI.FRAMEBUFFER,eI.COLOR_ATTACHMENT0,eI.TEXTURE_2D,t.__webglTexture,i)}el=-1},this.readRenderTargetPixels=function(e,t,i,r,n,o,l){let c=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0;if(!(e&&e.isWebGLRenderTarget))return void T("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let h=s.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==l&&(h=h[l]),h){a.bindFramebuffer(eI.FRAMEBUFFER,h);try{let a=e.textures[c],s=a.format,l=a.type;e.textures.length>1&&eI.readBuffer(eI.COLOR_ATTACHMENT0+c);let h=e$(a);if(!1===h.__formatReadable)return void T("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!1===h.__typeReadable)return void T("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");t>=0&&t<=e.width-r&&i>=0&&i<=e.height-n&&eI.readPixels(t,i,r,n,w.convert(s),w.convert(l),o)}finally{let e=null!==eo?s.get(eo).__webglFramebuffer:null;a.bindFramebuffer(eI.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,i,r,n,o,l){let c=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0;if(!(e&&e.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let h=s.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==l&&(h=h[l]),h)if(t>=0&&t<=e.width-r&&i>=0&&i<=e.height-n){var u;a.bindFramebuffer(eI.FRAMEBUFFER,h);let l=e.textures[c],d=l.format,p=l.type;e.textures.length>1&&eI.readBuffer(eI.COLOR_ATTACHMENT0+c);let f=e$(l);if(!1===f.__formatReadable)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!1===f.__typeReadable)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let m=eI.createBuffer();eI.bindBuffer(eI.PIXEL_PACK_BUFFER,m),eI.bufferData(eI.PIXEL_PACK_BUFFER,o.byteLength,eI.STREAM_READ),eI.readPixels(t,i,r,n,w.convert(d),w.convert(p),0),eI.bindBuffer(eI.PIXEL_PACK_BUFFER,null);let g=null!==eo?s.get(eo).__webglFramebuffer:null;a.bindFramebuffer(eI.FRAMEBUFFER,g);let v=eI.fenceSync(eI.SYNC_GPU_COMMANDS_COMPLETE,0);return eI.flush(),await (u=eI,new Promise(function(e,t){setTimeout(function i(){switch(u.clientWaitSync(v,u.SYNC_FLUSH_COMMANDS_BIT,0)){case u.WAIT_FAILED:t();break;case u.TIMEOUT_EXPIRED:setTimeout(i,4);break;default:e()}},4)})),eI.bindBuffer(eI.PIXEL_PACK_BUFFER,m),eI.getBufferSubData(eI.PIXEL_PACK_BUFFER,0,o),eI.bindBuffer(eI.PIXEL_PACK_BUFFER,null),eI.deleteBuffer(m),eI.deleteSync(v),o}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=Math.pow(2,-i),n=Math.floor(e.image.width*r),s=Math.floor(e.image.height*r),l=null!==t?t.x:0,c=null!==t?t.y:0;o.setTexture2D(e,0),eI.copyTexSubImage2D(eI.TEXTURE_2D,i,0,0,l,c,n,s),a.unbindTexture()},this.copyTextureToTexture=function(e,t){let i,r,n,l,c,h,u,d,p,f,m=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,g=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,v=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,_=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,y=e.isCompressedTexture?e.mipmaps[_]:e.image;if(null!==m)i=m.max.x-m.min.x,r=m.max.y-m.min.y,n=m.isBox3?m.max.z-m.min.z:1,l=m.min.x,c=m.min.y,h=m.isBox3?m.min.z:0;else{let t=Math.pow(2,-v);i=Math.floor(y.width*t),r=Math.floor(y.height*t),n=e.isDataArrayTexture?y.depth:e.isData3DTexture?Math.floor(y.depth*t):1,l=0,c=0,h=0}null!==g?(u=g.x,d=g.y,p=g.z):(u=0,d=0,p=0);let x=w.convert(t.format),M=w.convert(t.type);t.isData3DTexture?(o.setTexture3D(t,0),f=eI.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(o.setTexture2DArray(t,0),f=eI.TEXTURE_2D_ARRAY):(o.setTexture2D(t,0),f=eI.TEXTURE_2D),a.activeTexture(eI.TEXTURE0),a.pixelStorei(eI.UNPACK_FLIP_Y_WEBGL,t.flipY),a.pixelStorei(eI.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),a.pixelStorei(eI.UNPACK_ALIGNMENT,t.unpackAlignment);let S=a.getParameter(eI.UNPACK_ROW_LENGTH),b=a.getParameter(eI.UNPACK_IMAGE_HEIGHT),T=a.getParameter(eI.UNPACK_SKIP_PIXELS),E=a.getParameter(eI.UNPACK_SKIP_ROWS),A=a.getParameter(eI.UNPACK_SKIP_IMAGES);a.pixelStorei(eI.UNPACK_ROW_LENGTH,y.width),a.pixelStorei(eI.UNPACK_IMAGE_HEIGHT,y.height),a.pixelStorei(eI.UNPACK_SKIP_PIXELS,l),a.pixelStorei(eI.UNPACK_SKIP_ROWS,c),a.pixelStorei(eI.UNPACK_SKIP_IMAGES,h);let R=e.isDataArrayTexture||e.isData3DTexture,C=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let o=s.get(e),f=s.get(t),m=s.get(o.__renderTarget),g=s.get(f.__renderTarget);a.bindFramebuffer(eI.READ_FRAMEBUFFER,m.__webglFramebuffer),a.bindFramebuffer(eI.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let a=0;a<n;a++)R&&(eI.framebufferTextureLayer(eI.READ_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,s.get(e).__webglTexture,v,h+a),eI.framebufferTextureLayer(eI.DRAW_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,s.get(t).__webglTexture,_,p+a)),eI.blitFramebuffer(l,c,i,r,u,d,i,r,eI.DEPTH_BUFFER_BIT,eI.NEAREST);a.bindFramebuffer(eI.READ_FRAMEBUFFER,null),a.bindFramebuffer(eI.DRAW_FRAMEBUFFER,null)}else if(0!==v||e.isRenderTargetTexture||s.has(e)){let o=s.get(e),m=s.get(t);a.bindFramebuffer(eI.READ_FRAMEBUFFER,er),a.bindFramebuffer(eI.DRAW_FRAMEBUFFER,ea);for(let e=0;e<n;e++)R?eI.framebufferTextureLayer(eI.READ_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,o.__webglTexture,v,h+e):eI.framebufferTexture2D(eI.READ_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,eI.TEXTURE_2D,o.__webglTexture,v),C?eI.framebufferTextureLayer(eI.DRAW_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,m.__webglTexture,_,p+e):eI.framebufferTexture2D(eI.DRAW_FRAMEBUFFER,eI.COLOR_ATTACHMENT0,eI.TEXTURE_2D,m.__webglTexture,_),0!==v?eI.blitFramebuffer(l,c,i,r,u,d,i,r,eI.COLOR_BUFFER_BIT,eI.NEAREST):C?eI.copyTexSubImage3D(f,_,u,d,p+e,l,c,i,r):eI.copyTexSubImage2D(f,_,u,d,l,c,i,r);a.bindFramebuffer(eI.READ_FRAMEBUFFER,null),a.bindFramebuffer(eI.DRAW_FRAMEBUFFER,null)}else C?e.isDataTexture||e.isData3DTexture?eI.texSubImage3D(f,_,u,d,p,i,r,n,x,M,y.data):t.isCompressedArrayTexture?eI.compressedTexSubImage3D(f,_,u,d,p,i,r,n,x,y.data):eI.texSubImage3D(f,_,u,d,p,i,r,n,x,M,y):e.isDataTexture?eI.texSubImage2D(eI.TEXTURE_2D,_,u,d,i,r,x,M,y.data):e.isCompressedTexture?eI.compressedTexSubImage2D(eI.TEXTURE_2D,_,u,d,y.width,y.height,x,y.data):eI.texSubImage2D(eI.TEXTURE_2D,_,u,d,i,r,x,M,y);a.pixelStorei(eI.UNPACK_ROW_LENGTH,S),a.pixelStorei(eI.UNPACK_IMAGE_HEIGHT,b),a.pixelStorei(eI.UNPACK_SKIP_PIXELS,T),a.pixelStorei(eI.UNPACK_SKIP_ROWS,E),a.pixelStorei(eI.UNPACK_SKIP_IMAGES,A),0===_&&t.generateMipmaps&&eI.generateMipmap(f),a.unbindTexture()},this.initRenderTarget=function(e){void 0===s.get(e).__webglFramebuffer&&o.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?o.setTextureCube(e,0):e.isData3DTexture?o.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?o.setTexture2DArray(e,0):o.setTexture2D(e,0),a.unbindTexture()},this.resetState=function(){en=0,es=0,eo=null,a.reset(),A.reset()},"u">typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}};function aP(e){return Math.fround(e)}function aL(e,t){return Math.fround(Math.atan2(e,t))}function aI(e){return Math.fround(Math.sin(e))}function aN(e){return Math.fround(Math.cos(e))}function aD(e){return Math.fround(Math.sqrt(e))}let aU=new Vector3(0,0,0),aO=new Vector3(0,0,1);function aF(e){return new Vector3(e.x,e.y,e.z)}let aB=new Vector3;function aV(e){return aB.copy(aO).cross(e)}let ak=new Vector3;function aG(e){return ak.copy(e).normalize()}let az=new Vector3;function aH(e,t){return 0>=az.copy(e).add(t).dot(e)}function aW(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Vector3;return t.set(1,0,0).applyAxisAngle(aO,e)}function aX(e){return e.x=aP(e.x),e.y=aP(e.y),e.z=aP(e.z),e}let aj=.0055,aq=Math.sqrt(21)/5;function aY(){r=.23*aj*19.6/3*.045,a=7/(5*Math.sqrt(2))*.03275*aj*.23*9.8,n=.4*.23*.03275*.03275}function aK(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}aY();let Mathavan=class Mathavan{configure(e,t,i,r,a){this.M=e,this.R=t,this.ee=i,this.μs=r,this.μw=a}updateSlipSpeedsAndAngles(){let e=this.R,t=this.vx+this.ωy*e*.4-this.ωz*e*aq,i=-(.4*this.vy)+this.ωx*e,r=this.vx-this.ωy*e,a=this.vy+this.ωx*e;this.s=aD(t*t+i*i),this.φ=aL(i,t),this.φ<0&&(this.φ+=2*Math.PI),this.sʹ=aD(r*r+a*a),this.φʹ=aL(a,r),this.φʹ<0&&(this.φʹ+=2*Math.PI),this.sinφ=aI(this.φ),this.cosφ=aN(this.φ),this.sinφʹ=aI(this.φʹ),this.cosφʹ=aN(this.φʹ)}compressionPhase(){let e=Math.max(this.M*this.vy/this.N,.001);for(;this.vy>0;)this.updateSingleStep(e)}restitutionPhase(e){let t=Math.max(e/this.N,.001);for(this.WzI=0;this.WzI<e;)this.updateSingleStep(t)}updateSingleStep(e){this.updateSlipSpeedsAndAngles();let t=this.vy;if(this.updateVelocity(e),this.updateAngularVelocity(e),this.updateWorkDone(e,t),this.i++>10*this.N)throw Error("Solution not found")}updateVelocity(e){let t=this.μs,i=this.μw,r=this.M;this.vx-=1/r*(i*this.cosφ+t*this.cosφʹ*(.4+i*this.sinφ*aq))*e,this.vy-=1/r*(aq-.4*i*this.sinφ+t*this.sinφʹ*(.4+i*this.sinφ*aq))*e}updateAngularVelocity(e){let t=this.μs,i=this.μw,r=this.M,a=this.R;this.ωx+=-(5/(2*r*a))*(i*this.sinφ+t*this.sinφʹ*(.4+i*this.sinφ*aq))*e,this.ωy+=-(5/(2*r*a))*(i*this.cosφ*.4-t*this.cosφʹ*(.4+i*this.sinφ*aq))*e,this.ωz+=5/(2*r*a)*(i*this.cosφ*aq)*e}updateWorkDone(e,t){let i=e/2*(Math.abs(t)+Math.abs(this.vy))*aq;this.WzI+=i,this.P+=e}solvePaper(e,t,i,r){this.solve(e*aN(t),e*aI(t),-r*aI(t),r*aN(t),i)}solve(e,t,i,r,a){this.vx=e,this.vy=t,this.ωx=i,this.ωy=r,this.ωz=a,this.WzI=0,this.P=0,this.i=0,this.compressionPhase();let n=this.ee*this.ee*this.WzI;this.restitutionPhase(n)}constructor(e,t,i,r,a){aK(this,"P",0),aK(this,"WzI",0),aK(this,"vx",void 0),aK(this,"vy",void 0),aK(this,"ωx",void 0),aK(this,"ωy",void 0),aK(this,"ωz",void 0),aK(this,"s",void 0),aK(this,"φ",void 0),aK(this,"sʹ",void 0),aK(this,"φʹ",void 0),aK(this,"sinφ",void 0),aK(this,"cosφ",void 0),aK(this,"sinφʹ",void 0),aK(this,"cosφʹ",void 0),aK(this,"i",0),aK(this,"N",100),aK(this,"M",void 0),aK(this,"R",void 0),aK(this,"μs",void 0),aK(this,"μw",void 0),aK(this,"ee",void 0),this.configure(e,t,i,r,a)}};let aJ=new Vector3;function aZ(e,t){return aJ.copy(e).addScaledVector(aV(t),.03275)}let aQ={v:new Vector3,w:new Vector3},a$=new Vector3,a0=new Vector3,a1=Math.asin(.1),a3=aI(a1),a2=aN(a1);function a4(e,t){return{c:e.x*a2,s:new Vector3(e.x*a3-e.z*a2+.03275*t.y,-e.y-.03275*t.z*a2+.03275*t.x*a3),A:3.5/.23,B:1/.23}}function a5(e,t){let i=function(e,t){let{c:i,s:r,A:a,B:n}=a4(e,t),s=i/n*(1+.86);return a6(-r.x/a*a3-s*a2,r.y/a,r.x/a*a2-s*a3)}(e,t),r=function(e,t){var i;let{c:r,B:a}=a4(e,t),n=r/a*(1+.86),s=.471-.241*Math.atan2(Math.abs((i=e).y),i.x),o=Math.atan2(e.y,e.x),l=Math.cos(o);return a6(-s*n*l*a2-n*a2,s*n*Math.sin(o),s*n*l*a2-n*a3)}(e,t),a=Math.sign(e.y)===Math.sign(t.z)?Math.cos(Math.atan2(e.y,e.x)):1;return{v:r.v.lerp(i.v,a),w:r.w.lerp(i.w,a)}}function a6(e,t,i){return{v:new Vector3(e/.23,t/.23),w:new Vector3(-.03275/n*t*a3,.03275/n*(e*a3-i*a2),.03275/n*t*a2)}}function a8(e,t,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=t*(1-.25*i.lengthSq()),n=aG(new Vector3(aN(e),aI(e),0)).multiplyScalar(a);return{vel:n.clone().multiplyScalar(aN(r)),rvel:function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=Math.max(.001,Math.cos(i)),a=Math.sin(i),n=Math.max(.5,r),s=2.5*t.length()*(.03275*e.length())/(.03275*.03275*n),o=t.clone().normalize(),l=o.clone().multiplyScalar(r).addScaledVector(aO,-a),c=Math.atan2(-e.x,e.y);return aV(o).applyAxisAngle(l,c).multiplyScalar(s)}(i,n,r)}}function a9(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}new Mathavan(.23,.03275,.85,.2,.175),new Vector3,new Vector3;let Trace=class Trace{reset(){this.geometry.setDrawRange(0,0),this.lastVel.setZ(1)}forceTrace(e){this.line.visible&&(this.lastVel.z=1,this.addTraceGiven(e,this.lastVel,1,.1,1))}addTrace(e,t){if(!this.line.visible||0===t.length())return;let i=this.lastVel.angleTo(t),r=i>Math.PI/32?.01*.03275:.03275,a=this.lastPos.distanceTo(e);this.addTraceGiven(e,t,a,r,i)}addTraceGiven(e,t,i,r,a){let n=this.geometry.drawRange.count;0!==n&&i<r||(n>1&&a<1e-4&&n--,this.lastPos.copy(e),this.lastVel.copy(t),this.addPoint(e,n))}freeze(){let e=this.geometry.drawRange.count,t=new Float32Array(this.positions.subarray(0,3*e)),i=new BufferGeometry;i.setAttribute("position",new BufferAttribute(t,3)),i.setDrawRange(0,e);let r=this.line.material.clone();return r.opacity=.12,new Line(i,r)}addPoint(e,t){let i=3*t;i>this.positions.length||(this.positions[i++]=e.x,this.positions[i++]=e.y,this.positions[i]=e.z,this.geometry.setDrawRange(0,t+1),this.line.geometry.attributes.position.needsUpdate=!0)}constructor(e,t){a9(this,"line",void 0),a9(this,"geometry",void 0),a9(this,"positions",void 0),a9(this,"lastPos",new Vector3),a9(this,"lastVel",new Vector3),this.geometry=new BufferGeometry,this.positions=new Float32Array(3*e),this.geometry.setAttribute("position",new BufferAttribute(this.positions,3)),this.reset();let i=new LineBasicMaterial({color:t,opacity:.25,linewidth:3,transparent:!0});this.line=new Line(this.geometry,i),this.line.visible=!1}};let BallTextureFactory=class BallTextureFactory{static getOrCreateTexture(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:256,r="".concat(e,"_").concat(t.getHex(),"_").concat(i);if(this.textureCache.has(r))return this.textureCache.get(r);let a=this.createNumberTexture(e,t,i);return this.textureCache.set(r,a),a}static createNumberTexture(e,t,i){let r=i/256,a=document.createElement("canvas");a.width=i,a.height=i;let n=a.getContext("2d");if(!n)return new CanvasTexture(a);if(n.fillStyle="#".concat(t.getHexString()),n.fillRect(0,0,a.width,a.height),e>=9&&(n.fillStyle="white",n.fillRect(0,0,i,.2*i),n.fillRect(0,.8*i,i,.2*i)),e>0){let t=i/2,a=i/2,s=Math.round(52*r),o=Math.round(15*r);n.beginPath(),n.arc(t,a,s+o,0,2*Math.PI),n.fillStyle="black",n.fill(),n.beginPath(),n.arc(t,a,s,0,2*Math.PI),n.fillStyle="white",n.fill(),n.fillStyle="black",n.strokeStyle="black";let l=Math.round(97*r);n.lineWidth=.05*l,n.font="900 ".concat(l,'px "Arial Black", Arial, sans-serif'),n.textAlign="center",n.textBaseline="middle";let c=a+Math.round(5*r);n.strokeText(e.toString(),t,c),n.fillText(e.toString(),t,c)}let s=new CanvasTexture(a);return s.flipY=!1,s}};function a7(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}tB="textureCache",tV=new Map,tB in BallTextureFactory?Object.defineProperty(BallTextureFactory,tB,{value:tV,enumerable:!0,configurable:!0,writable:!0}):BallTextureFactory[tB]=tV;let BallCubeTextureFactory=class BallCubeTextureFactory{static getOrCreateTexture(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,r="".concat(e.getHex(),"_").concat(t,"_").concat(i);if(this.textureCache.has(r))return this.textureCache.get(r);let a=this.createTexture(e,t,i);return this.textureCache.set(r,a),a}static createTexture(e,t,i){let r=document.createElement("canvas");r.width=t,r.height=t,i="ff0000"===e.getHexString()?.08:i;let a="ff0000"===e.getHexString()?"#ffffff":this.dotColor,n=r.getContext("2d");n&&(n.fillStyle="#".concat(e.getHexString()),n.fillRect(0,0,t,t),n.beginPath(),n.arc(t/2,t/2,t*i,0,2*Math.PI),n.fillStyle=a,n.fill());let s=new CubeTexture(Array(6).fill(r));return s.needsUpdate=!0,s}};a7(BallCubeTextureFactory,"textureCache",new Map),a7(BallCubeTextureFactory,"dotColor","#cc0000");function ne(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Session=class Session{static getInstance(){return null!=Session.instance||(Session.instance=new Session("","","",!1,!1,!1,!1)),Session.instance}static playerIndex(){return Session.getInstance().playerIndex}static isSpectator(){return Session.getInstance().spectator}static isBotMode(){return Session.getInstance().botMode}static getBotUserId(){let e=void 0!==globalThis.location?new URLSearchParams(globalThis.location.search).get("bot"):void 0;return"bot-".concat((null!=e?e:"ClawBreak").toLowerCase())}static isExamMode(){return Session.getInstance().examMode}static isPracticeMode(){var e,t;return null!=(e=null==(t=Session.instance)?void 0:t.practiceMode)&&e}static isSpeedrunMode(){return Session.getInstance().speedrunMode}static getLod(){return Session.getInstance().lod}static hasInitParam(){var e;return void 0!==globalThis.location&&new URLSearchParams(null==(e=globalThis.location)?void 0:e.search).has("init")}static reset(){Session.instance=void 0}static init(e,t,i,r){let a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],n=arguments.length>5&&void 0!==arguments[5]&&arguments[5],s=arguments.length>6&&void 0!==arguments[6]&&arguments[6],o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,l=arguments.length>8&&void 0!==arguments[8]&&arguments[8],c=arguments.length>9&&void 0!==arguments[9]&&arguments[9],h=arguments.length>10?arguments[10]:void 0;if(Session.instance=new Session(t,e,i,r,a,n,s,o,l,c,h),Session.instance.initializeScores(),a&&void 0!==globalThis.location){let e=new URLSearchParams(globalThis.location.search).get("bot");Session.instance.opponentName=null!=e?e:"ClawBreak",Session.instance.setOpponentClientId(Session.getBotUserId()),Session.instance.opponentParams.emoji="🤖"}}initializeScores(){this.scoreByClientId={[this.clientId]:0},this.opponentClientId&&(this.scoreByClientId[this.opponentClientId]=0)}opponentKey(){var e;return null!=(e=this.opponentClientId)?e:Session.fallbackOpponentClientId}setOpponentClientId(e){let t=this.opponentKey(),i=this.getScoreByClientId(t);this.opponentClientId=e,e in this.scoreByClientId||(this.scoreByClientId[e]=i),t!==e&&t in this.scoreByClientId&&delete this.scoreByClientId[t]}applyUrlParams(e){let t=e.get("opponent.userId");t&&t!==this.clientId&&this.setOpponentClientId(t);let i=e.get("opponent.userName");for(let[t,r]of(i&&(this.opponentName=i),e))t.startsWith("opponent.custom.")?this.opponentParams[t.slice(16)]=r:t.startsWith("custom.")&&(this.customParams[t.slice(7)]=r)}myScore(){return this.getScoreByClientId(this.clientId)}opponentScore(){return this.getScoreByClientId(this.opponentKey())}setMyScore(e){this.setScoreByClientId(this.clientId,e)}setOpponentScore(e){this.setScoreByClientId(this.opponentKey(),e)}addMyScore(e){this.setMyScore(this.myScore()+e)}addOpponentScore(e){this.setOpponentScore(this.opponentScore()+e)}getScoreByClientId(e){var t;return null!=(t=this.scoreByClientId[e])?t:0}setScoreByClientId(e,t){this.scoreByClientId[e]=t}orderedScoresForHud(){return 0===this.playerIndex?{p1:this.myScore(),p2:this.opponentScore()}:{p1:this.opponentScore(),p2:this.myScore()}}orderedNamesForHud(){if(this.spectator){console.log("[Session] orderedNamesForHud spectator mode: spectatedP1Name=".concat(this.spectatedP1Name,", spectatedP2Name=").concat(this.spectatedP2Name));let e={};return this.spectatedP1Name&&(e.p1Name=this.spectatedP1Name),this.spectatedP2Name&&(e.p2Name=this.spectatedP2Name),e}let e=this.playername||void 0,t=this.opponentName||void 0;if(0===this.playerIndex){let i={};return e&&(i.p1Name=e),t&&(i.p2Name=t),i}let i={};return t&&(i.p1Name=t),e&&(i.p2Name=e),i}updateScoresFromNetwork(e,t,i){1===this.playerIndex?(this.setMyScore(t),this.setOpponentScore(e)):(this.setMyScore(e),this.setOpponentScore(t)),this.currentBreak=i}getHandicaps(){if(void 0===globalThis.location||!globalThis.location.search)return{};let e=new URLSearchParams(globalThis.location.search),t={};for(let[i,r]of e)i.startsWith("handicap_")&&(t[i.replace("handicap_","")]=Number.parseInt(r)||5);return t}getRaceTargetForPlayer(e){var t;let i=this.getHandicaps();return Object.keys(i).length>0?null!=(t=i[e])?t:5:7}constructor(e,t,i,r,a=!1,n=!1,s=!1,o=1,l=!1,c=!1,h){ne(this,"playername",void 0),ne(this,"clientId",void 0),ne(this,"tableId",void 0),ne(this,"spectator",void 0),ne(this,"botMode",void 0),ne(this,"examMode",void 0),ne(this,"practiceMode",void 0),ne(this,"lod",void 0),ne(this,"first",void 0),ne(this,"speedrunMode",void 0),ne(this,"tournamentId",void 0),ne(this,"opponentName",void 0),ne(this,"opponentClientId",void 0),ne(this,"opponentParams",void 0),ne(this,"customParams",void 0),ne(this,"spectatedP1Name",void 0),ne(this,"spectatedP2Name",void 0),ne(this,"vsNotificationShown",void 0),ne(this,"playerIndex",void 0),ne(this,"scoreByClientId",void 0),ne(this,"currentBreak",void 0),ne(this,"p1type",void 0),ne(this,"lastMsgId",void 0),this.playername=e,this.clientId=t,this.tableId=i,this.spectator=r,this.botMode=a,this.examMode=n,this.practiceMode=s,this.lod=o,this.first=l,this.speedrunMode=c,this.tournamentId=h,this.opponentParams={},this.customParams={},this.vsNotificationShown=!1,this.playerIndex=0,this.scoreByClientId={},this.currentBreak=0,this.p1type=0}};ne(Session,"instance",void 0),ne(Session,"fallbackOpponentClientId","opponent");let BallMaterialFactory=class BallMaterialFactory{static createTexturedDotsMaterial(e){let t="texturedDots_".concat(e.getHex());if(this.materialCache.has(t))return this.materialCache.get(t);let i=BallCubeTextureFactory.getOrCreateTexture(e),r=new MeshPhysicalMaterial({color:e,roughness:.1,metalness:0,clearcoat:1,clearcoatRoughness:.02,reflectivity:.25});return r.onBeforeCompile=e=>{e.uniforms.uCubeMap={value:i},e.vertexShader=`
        varying vec3 vLocalPos;
        varying float vShade;
        `.concat(e.vertexShader,`
      `).replace("#include <begin_vertex>",`#include <begin_vertex>
        vLocalPos = position;
        vShade = clamp(-modelMatrix[3].z * `.concat((1/.131).toFixed(2),", 0.0, 1.0);")),e.fragmentShader=`
        uniform samplerCube uCubeMap;
        varying vec3 vLocalPos;
        varying float vShade;
        `.concat(e.fragmentShader,`
      `).replace("#include <color_fragment>",`#include <color_fragment>
        diffuseColor.rgb = textureCube(uCubeMap, normalize(vLocalPos)).rgb * mix(1.0, `.concat(.4,", vShade);"))},this.materialCache.set(t,r),r}static createDottedMaterial(e){let t="dotted_".concat(e.getHex());if(this.materialCache.has(t))return this.materialCache.get(t);let i=new MeshPhongMaterial({emissive:0,flatShading:!0,vertexColors:!0,forceSinglePass:!0,shininess:25,specular:5592371,transparent:!1,depthWrite:!0});return i.onBeforeCompile=e=>{e.vertexShader=`
        varying float vShade;
        `.concat(e.vertexShader,`
      `).replace("#include <begin_vertex>",`#include <begin_vertex>
        vShade = clamp(-modelMatrix[3].z * `.concat((1/.131).toFixed(2),", 0.0, 1.0);")),e.fragmentShader=`
        varying float vShade;
        `.concat(e.fragmentShader,`
      `).replace("#include <color_fragment>",`#include <color_fragment>
        diffuseColor.rgb *= mix(1.0, `.concat(.4,", vShade);"))},this.materialCache.set(t,i),i}static createProjectedMaterial(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:256,r="projected_".concat(e,"_").concat(t.getHex(),"_").concat(i);if(this.materialCache.has(r))return this.materialCache.get(r);let a=BallTextureFactory.getOrCreateTexture(e,t,i),n=1>=Session.getLod()?new MeshStandardMaterial({color:t,roughness:.5,metalness:0,flatShading:!0,transparent:!1,depthWrite:!0}):new MeshPhysicalMaterial({color:t,roughness:.1,metalness:0,clearcoat:1,clearcoatRoughness:.02,reflectivity:.25});return n.onBeforeCompile=e=>{e.uniforms.numberTex={value:a},e.uniforms.invScale={value:1/.0655},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
         varying vec3 vLocalPosition;
         varying float vShade;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
         vLocalPosition = position;
         vShade = clamp(-modelMatrix[3].z * `.concat((1/.131).toFixed(2),", 0.0, 1.0);")),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
        uniform sampler2D numberTex;
        uniform float invScale;
        varying vec3 vLocalPosition;
        varying float vShade;`),e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        // Calculate the base UV mapping
        vec2 projUv = vLocalPosition.xz * invScale + 0.5;

        // Capture derivatives BEFORE the flip. 
        // This prevents the GPU from seeing the 'teleport' at the equator.
        vec2 dx = dFdx(projUv);
        vec2 dy = dFdy(projUv);

        // Flip logic for the bottom hemisphere
        if (vLocalPosition.y < 0.0) {
          projUv.x = 1.0 - projUv.x;
          // Mirror the derivatives so mipmapping stays consistent
          dx.x = -dx.x;
          dy.x = -dy.x;
        }

        projUv = clamp(projUv, 0.0, 1.0);

        // Add a negative bias to force a higher-resolution mipmap level
        // -0.5 to -1.0 usually restores the "crisp" look.
        vec4 texColor = textureGrad(numberTex, projUv, dx * 0.5, dy * 0.5);
     
        diffuseColor.rgb = texColor.rgb * mix(1.0, `.concat(.4,", vShade);"))},this.materialCache.set(r,n),n}};function nt(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}tk="materialCache",tG=new Map,tk in BallMaterialFactory?Object.defineProperty(BallMaterialFactory,tk,{value:tG,enumerable:!0,configurable:!0,writable:!0}):BallMaterialFactory[tk]=tG;let BallMesh=class BallMesh{static getBallGeometry(){return this._ballGeometry||(this._ballGeometry=new IcosahedronGeometry(.03275,Math.max(1,Session.getLod()))),this._ballGeometry}static getShadowGeometry(){return this._shadowGeometry||(this._shadowGeometry=new CircleGeometry(.029475,1>=Session.getLod()?9:24),this._shadowGeometry.applyMatrix4(new Matrix4().makeTranslation(0,0,-.0324225))),this._shadowGeometry}static getShadowMaterial(){return this._shadowMaterial||(this._shadowMaterial=new MeshBasicMaterial({color:1118498})),this._shadowMaterial}freezeTrace(e){if(this.trace.geometry.drawRange.count>1){let t=this.trace.freeze();this.ghosts.push(t),e.add(t)}}clearGhosts(e){this.ghosts.forEach(t=>e.remove(t)),this.ghosts=[]}updateAll(e,t){let i=e.state===nr.Stationary,r=!this.mesh.position.equals(e.pos);(!i||r)&&(this.updatePosition(e.pos),this.spinAxisArrow.visible&&this.updateArrows(e.pos,e.rvel,e.state),0!==e.rvel.lengthSq()&&(this.updateRotation(e.rvel,t),this.trace.addTrace(e.pos,e.vel)))}updatePosition(e){this.mesh.position.copy(e),this.shadow.position.copy(e)}updateRotation(e,t){let i=e.length()*t;this.mesh.rotateOnWorldAxis(aG(e),i)}updateArrows(e,t,i){this.spinAxisArrow.setLength(.03275+.03275*t.length()/2,.03275,.03275),this.spinAxisArrow.position.copy(e),this.spinAxisArrow.setDirection(aG(t)),i==nr.Rolling?this.spinAxisArrow.setColor(0xcc0000):this.spinAxisArrow.setColor(52224)}initialiseMesh(e,t,i){let r,a,n=null!=i?i:void 0===t?"dotted":"projected";if("dotted"===n){let t=e.getHex(),i=BallMesh._dottedGeometryCache.get(t);i||(i=new IcosahedronGeometry(.03275,Math.max(1,Session.getLod())),BallMesh.addDots(i,e),BallMesh._dottedGeometryCache.set(t,i)),r=i,a=BallMaterialFactory.createDottedMaterial(e)}else if("texturedDots"===n)r=BallMesh.getBallGeometry(),a=BallMaterialFactory.createTexturedDotsMaterial(e);else{if(void 0===t)throw Error("Projected ball material requires a label");r=BallMesh.getBallGeometry(),a=BallMaterialFactory.createProjectedMaterial(t,e)}this.mesh=new Mesh(r,a),this.mesh.name="ball",this.updateRotation(new Vector3().random(),100),this.shadow=new Mesh(BallMesh.getShadowGeometry(),BallMesh.getShadowMaterial()),this.spinAxisArrow=new ArrowHelper(aO,aU,2,0,.01,.01),this.spinAxisArrow.visible=!1,this.trace=new Trace(500,e)}static addDots(e,t){let i=e.attributes.position.count,r=new Color(t);e.setAttribute("color",new BufferAttribute(new Float32Array(3*i),3));let a=e.attributes.color;for(let e=0;e<i/3;e++)BallMesh.colorVerticesForFace(e,a,BallMesh.scaleNoise(r.r),BallMesh.scaleNoise(r.g),BallMesh.scaleNoise(r.b));let n=new Color(0xaa2222);[0,96,111,156,186,195].forEach(e=>{BallMesh.colorVerticesForFace(e/3,a,n.r,n.g,n.b)})}addToScene(e){e.add(this.mesh),e.add(this.shadow),e.add(this.spinAxisArrow),e.add(this.trace.line)}static colorVerticesForFace(e,t,i,r,a){t.setXYZ(3*e+0,i,r,a),t.setXYZ(3*e+1,i,r,a),t.setXYZ(3*e+2,i,r,a)}static scaleNoise(e){return(1-.25*Math.random())*e}constructor(e,t,i){nt(this,"mesh",void 0),nt(this,"shadow",void 0),nt(this,"spinAxisArrow",void 0),nt(this,"trace",void 0),nt(this,"color",void 0),nt(this,"ghosts",[]),nt(this,"m",new Matrix4),this.color=new Color(e),this.initialiseMesh(this.color,t,i)}};function ni(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}nt(BallMesh,"_ballGeometry",void 0),nt(BallMesh,"_shadowGeometry",void 0),nt(BallMesh,"_shadowMaterial",void 0),nt(BallMesh,"_dottedGeometryCache",new Map);var nr=((tz={}).Stationary="Stationary",tz.Rolling="Rolling",tz.Sliding="Sliding",tz.Falling="Falling",tz.InPocket="InPocket",tz);let Ball=class Ball{update(e){if("Falling"==this.state){var t;this.updatePosition(e),null==(t=this.pocket)||t.updateFall(this,e)}else"Rolling"==this.state?(this.velBefore.copy(this.vel),this.updateVelocity(e),this.pos.addScaledVector(this.velBefore,e/2),this.pos.addScaledVector(this.vel,e/2)):(this.updatePosition(e),this.updateVelocity(e))}updateMesh(e){var t;null==(t=this.ballmesh)||t.updateAll(this,e)}updatePosition(e){this.pos.addScaledVector(this.vel,e)}updateVelocity(e){var t,i,n,s;if(this.inMotion())if(this.isRolling()){let n;this.state="Rolling",t=this.vel,n=(i=this.rvel).z,i.copy(aV(t).multiplyScalar(1/.03275)),i.setZ(n),this.addDelta(e,function(e,t,i){let n=Math.fround(Math.hypot(e.x,e.y)),s=Math.abs(e.z),o=Math.sign(e.z);if(n<.1)return aQ.v.set(-t.x/i,-t.y/i,0),aQ.w.set(-e.x/i,-e.y/i,-(r/(.23*.03275*.03275)*2.5)*(s>24?12:1)*o),aQ;let l=5/7*a/(.23*.03275*.03275)/n,c=-l*e.x,h=-l*e.y;return aQ.w.set(c,h,-(r/(.23*.03275*.03275)*2.5)*o),aQ.v.set(.03275*(e.y+h)-t.x,-.03275*(e.x+c)-t.y,0),aQ}(this.rvel,this.vel,e))}else{let t;this.state="Sliding",this.addDelta(e,(n=this.vel,t=aZ(n,s=this.rvel).setZ(0),aQ.v.copy(aG(t).multiplyScalar(-.126*9.8)),aQ.w.copy(aG(aV(t)).multiplyScalar(3.087/.03275)),aQ.w.setZ(-(r/(.23*.03275*.03275)*2.5)*Math.sign(s.z)),aQ))}}addDelta(e,t){t.v.multiplyScalar(e),t.w.multiplyScalar(e),this.passesZero(t)?this.setStationary():(this.vel.add(t.v),this.rvel.add(t.w))}passesZero(e){let t=aH(this.vel,e.v),i=aH(this.rvel,e.w);return!!("Rolling"===this.state?t||i:t&&i)&&Math.abs(this.rvel.z)<=Math.abs(e.w.z)}setStationary(){this.vel.copy(aU),this.rvel.copy(aU),this.state="Stationary"}isRolling(){return 0!==this.rvel.lengthSq()&&aZ(this.vel,this.rvel).length()<Ball.transition}onTable(){return"Falling"!==this.state&&"InPocket"!==this.state}inMotion(){return"Rolling"===this.state||"Sliding"===this.state||this.isFalling()}isFalling(){return"Falling"===this.state}futurePosition(e){return this.futurePos.copy(this.pos).addScaledVector(this.vel,e),this.futurePos}fround(){this.pos.x=Math.fround(this.pos.x),this.pos.y=Math.fround(this.pos.y),this.vel.x=Math.fround(this.vel.x),this.vel.y=Math.fround(this.vel.y),this.rvel.x=Math.fround(this.rvel.x),this.rvel.y=Math.fround(this.rvel.y),this.rvel.z=Math.fround(this.rvel.z)}serialise(){return{pos:this.pos.clone(),id:this.id}}static fromSerialised(e){return Ball.updateFromSerialised(new Ball(aF(e.pos)),e)}static updateFromSerialised(e,t){var i,r,a;let n=null!=(i=t.pos.z)?i:e.onTable()?0:e.pos.z;return e.pos.set(t.pos.x,t.pos.y,n),e.vel.copy(null!=(r=null==t?void 0:t.vel)?r:aU),e.rvel.copy(null!=(a=null==t?void 0:t.rvel)?a:aU),e}constructor(e,t,i,r){ni(this,"pos",void 0),ni(this,"vel",aU.clone()),ni(this,"rvel",aU.clone()),ni(this,"futurePos",aU.clone()),ni(this,"ballmesh",void 0),ni(this,"state","Stationary"),ni(this,"pocket",void 0),ni(this,"id",Ball.id++),ni(this,"label",void 0),ni(this,"appearance",void 0),ni(this,"velBefore",new Vector3),this.pos=e.clone(),this.label=i,this.appearance=r,"u">typeof document&&(this.ballmesh=new BallMesh(t||0xeeeeee*Math.random(),i,r))}};function na(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}ni(Ball,"id",0),ni(Ball,"transition",.05);var nn=((tH={}).Pot="Pot",tH.Cushion="Cushion",tH.Collision="Collision",tH.Hit="Hit",tH.Proximity="Proximity",tH);let Outcome=class Outcome{static pot(e,t,i){return new Outcome("Pot",e,e,t,i)}static cushion(e,t,i,r){return new Outcome("Cushion",e,e,t,i,r)}static collision(e,t,i,r){return new Outcome("Collision",e,t,i,r)}static hit(e,t,i){return new Outcome("Hit",e,e,t,i)}static proximity(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3?arguments[3]:void 0;return new Outcome("Proximity",e,t,i,r)}static isCueBallPotted(e,t){return t.some(t=>"Pot"==t.type&&t.ballA===e)}static isBallPottedNoFoul(e,t){return t.some(e=>"Pot"==e.type&&null!==e.ballA)&&!Outcome.isCueBallPotted(e,t)}static pots(e){return e.filter(e=>"Pot"==e.type).map(e=>e.ballA)}static potCount(e){return this.pots(e).length}static onlyRedsPotted(e){return this.pots(e).every(e=>e.id>6)}static firstCollision(e){let t=e.filter(e=>"Collision"===e.type);return t.length>0?t[0]:void 0}static isClearTable(e){let t=e.balls.filter(e=>e.onTable());return 1===t.length&&t[0]===e.cueball}static isCaromPoint(e,t){let i=new Set;for(let r of Outcome.cueBallFirst(e,t))"Collision"===r.type&&r.ballA===e&&null!==r.ballB&&i.add(r.ballB);return i.size>=2}static isThreeCushionPoint(e,t){t=Outcome.cueBallFirst(e,t).filter(t=>t.ballA===e);let i=new Set,r=0;for(let e of t)if("Cushion"===e.type&&r++,"Collision"===e.type&&(i.add(e.ballB),2===i.size))return r>=3;return!!t.find(t=>"Proximity"===t.type&&t.ballA===e)&&1===new Set(t.filter(t=>"Collision"===t.type&&t.ballA===e).map(e=>e.ballB)).size&&!!(r>=3)||!1}static getProximityScore(e,t){let i=t.filter(t=>"Proximity"===t.type&&t.ballA===e);if(0===i.length)return 0;let r=Math.min(...i.map(e=>e.incidentSpeed));return r<=.0655?3:r<=.09825?2:+(r<=.131)}static cueBallFirst(e,t){return t.forEach(t=>{"Collision"===t.type&&t.ballB===e&&(t.ballB=t.ballA,t.ballA=e)}),t}serialise(){let e={type:this.type,timestamp:this.timestamp,incidentSpeed:this.incidentSpeed,ballA:this.ballA?{id:this.ballA.id}:null,ballB:this.ballB?{id:this.ballB.id}:null};return this.cushion&&(e.cushion=this.cushion),e}constructor(e,t,i,r,a,n){na(this,"type",void 0),na(this,"timestamp",void 0),na(this,"ballA",null),na(this,"ballB",null),na(this,"incidentSpeed",void 0),na(this,"cushion",void 0),this.type=e,this.ballA=t,this.ballB=i,this.incidentSpeed=r,this.timestamp=a,this.cushion=n}};function ns(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let TableGeometry=class TableGeometry{static scaleToRadius(e){TableGeometry.tableX=43*e,TableGeometry.tableY=21*e,TableGeometry.X=TableGeometry.tableX+e,TableGeometry.Y=TableGeometry.tableY+e}static configureForRule(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,i=t/10;"threecushion"===e||"sagu"===e?(TableGeometry.tableX=1.479645*i,TableGeometry.tableY=.7234475*i,TableGeometry.hasPockets=!1):(TableGeometry.tableX=1.40825*i,TableGeometry.tableY=21*.03275*i,TableGeometry.hasPockets=!0,aj=.007,aY()),TableGeometry.X=TableGeometry.tableX+.03275,TableGeometry.Y=TableGeometry.tableY+.03275}};function no(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}ns(TableGeometry,"tableX",void 0),ns(TableGeometry,"tableY",void 0),ns(TableGeometry,"X",void 0),ns(TableGeometry,"Y",void 0),ns(TableGeometry,"hasPockets",!0),TableGeometry.scaleToRadius(.03275);let Knuckle=class Knuckle{static willBounce(e,t){return t.distanceTo(e.pos)<.03275+e.radius}bounce(e){let t=e.pos.clone().sub(this.pos).normalize(),i=t.dot(e.vel);return e.vel.addScaledVector(t,-1.72*i),e.rvel.multiplyScalar(.5),Math.abs(i)}static findBouncing(e,t){let i=e.futurePosition(t);return PocketGeometry.knuckles.find(e=>Knuckle.willBounce(e,i))}constructor(e,t){no(this,"pos",void 0),no(this,"radius",void 0),this.pos=e,this.radius=t}};function nl(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Pocket=class Pocket{static willFall(e,t){return t.distanceTo(e.pos)<e.radius}fall(e,t){return e.vel.z=-9.8*t,e.state=nr.Falling,e.pocket=this,e.vel.length()}updateFall(e,t){e.vel.addScaledVector(aO,-.3275*t*9.8);let i=e.pos.z;if(e.pos.clone().setZ(0).distanceTo(this.pos)>this.radius-.03275){let a=this.pos.clone().sub(e.pos).normalize().setZ(0);if(i>-.016375&&(e.vel.addScaledVector(a,.22925*t*9.8),e.rvel.addScaledVector(aV(a),7*t*9.8)),0>e.vel.dot(a)){var r;null==(r=e.ballmesh)||r.trace.forceTrace(e.pos),e.vel.x=a.x*e.vel.length()/2,e.vel.y=a.y*e.vel.length()/2}}let a=this.restingDepth(e);i<a&&0!==e.rvel.length()&&(e.pos.z=a,e.vel.z=-.003275,e.rvel.copy(aU)),i<a-.03275&&(e.pos.z=a-.03275,e.setStationary(),e.state=nr.InPocket)}restingDepth(e){return -.09825-.03275*e.id/4}static findPocket(e,t,i){let r=t.futurePosition(i);return e.find(e=>Pocket.willFall(e,r))}constructor(e,t){nl(this,"pos",void 0),nl(this,"radius",void 0),this.pos=e,this.radius=t}};function nc(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let PocketGeometry=class PocketGeometry{static scaleToRadius(e){PocketGeometry.PX=TableGeometry.tableX+1.6*e,PocketGeometry.PY=TableGeometry.tableY+1.6*e,PocketGeometry.knuckleInset=1.6*e/.5,PocketGeometry.knuckleRadius=.31*e/.5,PocketGeometry.middleKnuckleInset=1.385*e/.5,PocketGeometry.middleKnuckleRadius=.2*e/.5,PocketGeometry.cornerRadius=1.1*e/.5,PocketGeometry.middleRadius=.9*e/.5,PocketGeometry.pocketLayout(e),PocketGeometry.enumerateCenters(),PocketGeometry.enumerateKnuckles()}static enumerateKnuckles(){PocketGeometry.knuckles=[PocketGeometry.pockets.pocketNW.knuckleNE,PocketGeometry.pockets.pocketNW.knuckleSW,PocketGeometry.pockets.pocketN.knuckleNW,PocketGeometry.pockets.pocketN.knuckleNE,PocketGeometry.pockets.pocketS.knuckleSW,PocketGeometry.pockets.pocketS.knuckleSE,PocketGeometry.pockets.pocketNE.knuckleNW,PocketGeometry.pockets.pocketNE.knuckleSE,PocketGeometry.pockets.pocketSE.knuckleNE,PocketGeometry.pockets.pocketSE.knuckleSW,PocketGeometry.pockets.pocketSW.knuckleSE,PocketGeometry.pockets.pocketSW.knuckleNW]}static enumerateCenters(){PocketGeometry.pocketCenters=[PocketGeometry.pockets.pocketNW.pocket,PocketGeometry.pockets.pocketSW.pocket,PocketGeometry.pockets.pocketN.pocket,PocketGeometry.pockets.pocketS.pocket,PocketGeometry.pockets.pocketNE.pocket,PocketGeometry.pockets.pocketSE.pocket]}static pocketLayout(e){PocketGeometry.pockets={pocketNW:{pocket:new Pocket(new Vector3(-PocketGeometry.PX,PocketGeometry.PY,0),PocketGeometry.cornerRadius),knuckleNE:new Knuckle(new Vector3(-TableGeometry.X+PocketGeometry.knuckleInset,TableGeometry.Y+PocketGeometry.knuckleRadius,0),PocketGeometry.knuckleRadius),knuckleSW:new Knuckle(new Vector3(-TableGeometry.X-PocketGeometry.knuckleRadius,TableGeometry.Y-PocketGeometry.knuckleInset,0),PocketGeometry.knuckleRadius)},pocketN:{pocket:new Pocket(new Vector3(0,PocketGeometry.PY+.7*e/.5,0),PocketGeometry.middleRadius),knuckleNE:new Knuckle(new Vector3(PocketGeometry.middleKnuckleInset,TableGeometry.Y+PocketGeometry.middleKnuckleRadius,0),PocketGeometry.middleKnuckleRadius),knuckleNW:new Knuckle(new Vector3(-PocketGeometry.middleKnuckleInset,TableGeometry.Y+PocketGeometry.middleKnuckleRadius,0),PocketGeometry.middleKnuckleRadius)},pocketS:{pocket:new Pocket(new Vector3(0,-PocketGeometry.PY-.7*e/.5,0),PocketGeometry.middleRadius),knuckleSE:new Knuckle(new Vector3(PocketGeometry.middleKnuckleInset,-TableGeometry.Y-PocketGeometry.middleKnuckleRadius,0),PocketGeometry.middleKnuckleRadius),knuckleSW:new Knuckle(new Vector3(-PocketGeometry.middleKnuckleInset,-TableGeometry.Y-PocketGeometry.middleKnuckleRadius,0),PocketGeometry.middleKnuckleRadius)},pocketNE:{pocket:new Pocket(new Vector3(PocketGeometry.PX,PocketGeometry.PY,0),PocketGeometry.cornerRadius),knuckleNW:new Knuckle(new Vector3(TableGeometry.X-PocketGeometry.knuckleInset,TableGeometry.Y+PocketGeometry.knuckleRadius,0),PocketGeometry.knuckleRadius),knuckleSE:new Knuckle(new Vector3(TableGeometry.X+PocketGeometry.knuckleRadius,TableGeometry.Y-PocketGeometry.knuckleInset,0),PocketGeometry.knuckleRadius)},pocketSE:{pocket:new Pocket(new Vector3(PocketGeometry.PX,-PocketGeometry.PY,0),PocketGeometry.cornerRadius),knuckleNE:new Knuckle(new Vector3(TableGeometry.X+PocketGeometry.knuckleRadius,-TableGeometry.Y+PocketGeometry.knuckleInset,0),PocketGeometry.knuckleRadius),knuckleSW:new Knuckle(new Vector3(TableGeometry.X-PocketGeometry.knuckleInset,-TableGeometry.Y-PocketGeometry.knuckleRadius,0),PocketGeometry.knuckleRadius)},pocketSW:{pocket:new Pocket(new Vector3(-PocketGeometry.PX,-PocketGeometry.PY,0),PocketGeometry.cornerRadius),knuckleSE:new Knuckle(new Vector3(-TableGeometry.X+PocketGeometry.knuckleInset,-TableGeometry.Y-PocketGeometry.knuckleRadius,0),PocketGeometry.knuckleRadius),knuckleNW:new Knuckle(new Vector3(-TableGeometry.X-PocketGeometry.knuckleRadius,-TableGeometry.Y+PocketGeometry.knuckleInset,0),PocketGeometry.knuckleRadius)}}}};nc(PocketGeometry,"PX",void 0),nc(PocketGeometry,"PY",void 0),nc(PocketGeometry,"knuckleInset",void 0),nc(PocketGeometry,"knuckleRadius",void 0),nc(PocketGeometry,"middleKnuckleInset",void 0),nc(PocketGeometry,"middleKnuckleRadius",void 0),nc(PocketGeometry,"cornerRadius",void 0),nc(PocketGeometry,"middleRadius",void 0),nc(PocketGeometry,"pockets",void 0),nc(PocketGeometry,"knuckles",void 0),nc(PocketGeometry,"pocketCenters",void 0),PocketGeometry.scaleToRadius(.03275);let Cushion=class Cushion{static bounceAny(e,t){let i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a5,a=e.futurePosition(t);if(!i){let t=Cushion.bounceCornerNoPockets(e,r);if(void 0!==t)return t}if(Cushion.willBounceLong(a,i)){let t=a.y>TableGeometry.tableY?-Math.PI/2:Math.PI/2,i=a.y>TableGeometry.tableY?"L":"l";return{incidentSpeed:Cushion.bounceIn(t,e,r),cushion:i}}if(Cushion.willBounceShort(a,i)){let t=a.x>TableGeometry.tableX?0:Math.PI,i=a.x>TableGeometry.tableX?"S":"s";return{incidentSpeed:Cushion.bounceIn(t,e,r),cushion:i}}}static bounceCornerNoPockets(e,t){let i,r,a=Math.abs(e.futurePos.x)-TableGeometry.tableX,n=Math.abs(e.futurePos.y)-TableGeometry.tableY;if(!(a<=0)&&!(n<=0))return a>=n?(i=e.futurePos.x>0?0:Math.PI,r=e.futurePos.x>0?"S":"s"):(i=e.futurePos.y>0?-Math.PI/2:Math.PI/2,r=e.futurePos.y>0?"L":"l"),{incidentSpeed:Cushion.bounceIn(i,e,t),cushion:r}}static willBounceShort(e,t){return t?Cushion.willBounceShortSegment(PocketGeometry.pockets.pocketNW.knuckleSW.pos.y,PocketGeometry.pockets.pocketSW.knuckleNW.pos.y,e):Cushion.willBounceShortSegment(TableGeometry.Y,-TableGeometry.Y,e)}static willBounceLong(e,t){return t?Cushion.willBounceLongSegment(PocketGeometry.pockets.pocketNW.knuckleNE.pos.x,PocketGeometry.pockets.pocketN.knuckleNW.pos.x,e)||Cushion.willBounceLongSegment(PocketGeometry.pockets.pocketN.knuckleNE.pos.x,PocketGeometry.pockets.pocketNE.knuckleNW.pos.x,e):Cushion.willBounceLongSegment(-TableGeometry.X,TableGeometry.X,e)}static willBounceLongSegment(e,t,i){return i.x>e&&i.x<t&&Math.abs(i.y)>TableGeometry.tableY}static willBounceShortSegment(e,t,i){return i.y>t&&i.y<e&&Math.abs(i.x)>TableGeometry.tableX}static bounceIn(e,t,i){var r,a,n;let s;null==(r=t.ballmesh)||r.trace.forceTrace(t.futurePos);let o=(a=t.vel,n=t.rvel,(s=i(a$.copy(a).applyAxisAngle(aO,e),a0.copy(n).applyAxisAngle(aO,e))).v.applyAxisAngle(aO,-e),s.w.applyAxisAngle(aO,-e),s);return t.vel.add(o.v),t.rvel.add(o.w),o.v.length()}};function nh(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let nu=new Vector3,nd=new Vector3,np=new Vector3,nf=new Vector3,nm=new Vector3,ng=new Vector3,nv=new Vector3,n_=new Vector3;let CollisionThrow=class CollisionThrow{dynamicFriction(e){return .01+.108*Math.fround(Math.exp(-1.088*e))}updateVelocities(e,t){var i,r;let a=Collision.positionsAtContact(e,t);null==(i=e.ballmesh)||i.trace.forceTrace(a.a),null==(r=t.ballmesh)||r.trace.forceTrace(a.b);let s=nu.subVectors(a.b,a.a).normalize(),o=nd.set(-s.y,s.x,0),l=np.copy(e.vel).sub(t.vel).add(n_.copy(s).multiplyScalar(-.03275).cross(e.rvel)).sub(n_.copy(s).multiplyScalar(.03275).cross(t.rvel)),c=s.dot(l),h=nf.copy(l).addScaledVector(s,-c),u=h.length(),d=this.dynamicFriction(u);this.normalImpulse=-1.925*c/(2/.23);let p=nm.set(0,0,0);if(u>1e-8){let e=Math.min(d*Math.abs(this.normalImpulse),.23/7*u);p.copy(h).multiplyScalar(-e/u),this.tangentialImpulse=p.dot(o)}else this.tangentialImpulse=0;let f=ng.copy(s).multiplyScalar(this.normalImpulse);e.vel.addScaledVector(f,1/.23).addScaledVector(p,1/.23),e.vel.z=0,t.vel.addScaledVector(f,-1/.23).addScaledVector(p,-1/.23),t.vel.z=0;let m=nv.copy(s).multiplyScalar(.03275).cross(p);return e.rvel.addScaledVector(m,1/n),t.rvel.addScaledVector(m,1/n),c}constructor(){nh(this,"normalImpulse",void 0),nh(this,"tangentialImpulse",void 0)}};function ny(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Collision=class Collision{static willCollide(e,t,i){return(e.inMotion()||t.inMotion())&&e.onTable()&&t.onTable()&&e.futurePosition(i).distanceToSquared(t.futurePosition(i))<.131*.03275}static collide(e,t){return Collision.updateVelocities(e,t)}static positionsAtContact(e,t){this.p.subVectors(e.pos,t.pos),this.v.subVectors(e.vel,t.vel);let i=this.v.lengthSq();if(0===i)return{a:this.contactA.copy(e.pos),b:this.contactB.copy(t.pos)};let r=2*this.p.dot(this.v),a=r*r-4*i*(this.p.lengthSq()-.0655*.0655),n=a<0?0:(-r-Math.sqrt(a))/(2*i);return{a:this.contactA.copy(e.pos).addScaledVector(e.vel,n),b:this.contactB.copy(t.pos).addScaledVector(t.vel,n)}}static updateVelocities(e,t){let i=Collision.model.updateVelocities(e,t);return e.state=nr.Sliding,t.state=nr.Sliding,i}};function nx(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}ny(Collision,"p",new Vector3),ny(Collision,"v",new Vector3),ny(Collision,"contactA",new Vector3),ny(Collision,"contactB",new Vector3),ny(Collision,"model",new CollisionThrow);let GameEvent=class GameEvent{constructor(){nx(this,"type",void 0),nx(this,"sequence",void 0),nx(this,"clientId",void 0),nx(this,"playername",void 0)}};var nM=((tW={}).BEGIN="BEGIN",tW.BREAK="BREAK",tW.WATCHAIM="WATCHAIM",tW.AIM="AIM",tW.HIT="HIT",tW.STATIONARY="STATIONARY",tW.CHAT="CHAT",tW.ABORT="ABORT",tW.PLACEBALL="PLACEBALL",tW.REJOIN="REJOIN",tW.RERACK="RERACK",tW.STARTAIM="STARTAIM",tW.NOTIFICATION="NOTIFICATION",tW.SCORE="SCORE",tW.CONCEDE="CONCEDE",tW);function nS(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let AimEvent=class AimEvent extends GameEvent{applyToController(e){return e.handleAim(this)}static fromJson(e){let t=new AimEvent;return t.pos=aF(e.pos),t.angle=e.angle,t.offset=aF(e.offset),t.power=e.power,t.elevation=e.elevation||0,e.i&&(t.i=e.i),t}copy(){return AimEvent.fromJson(this)}constructor(){super(),nS(this,"offset",new Vector3(0,0,0)),nS(this,"angle",0),nS(this,"power",0),nS(this,"elevation",0),nS(this,"pos",new Vector3(0,0,0)),nS(this,"i",0),this.type=nM.AIM}};function nb(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let nT={shaftColour:"#d2b48c",buttColour:"#0d0d0d",jointColour:"#2b2f36",jointLength:.004,ferruleColour:"#e5e5e5",ferruleLength:.015,buttRatio:.4,grain:!0};let CueMesh=class CueMesh{static indicateValid(e){CueMesh.placermaterial.color.setHex(e?0xccffcc:0xff0000)}static createHelper(){let e=new Mesh(new CylinderGeometry(.03275,.03275,1.965,12,1,!0),this.helpermaterial);return e.geometry.applyMatrix4(new Matrix4().identity().makeRotationAxis(aO,-Math.PI/2)).applyMatrix4(new Matrix4().identity().makeTranslation(.9825,0,-.01*.03275/.5)),e.visible=!1,e.renderOrder=-1,e.material.depthTest=!1,e}static createPlacer(){let e=new Group,t=new ConeGeometry(.0245625,.0524,4);for(let i=0;i<4;i++){let r=new Mesh(t,CueMesh.placermaterial),a=2*i*Math.PI/4;r.position.x=2*Math.cos(a)*.03275,r.position.y=2*Math.sin(a)*.03275,r.position.z=.03275,r.lookAt(0,0,.03275),r.rotateX(Math.PI/2),e.add(r)}return e.visible=!1,e}static createShadow(e){let t=new PlaneGeometry(e,.0131);t.applyMatrix4(new Matrix4().identity().makeTranslation(-e/2-.03275,0,0));let i=new Mesh(t,new MeshBasicMaterial({color:0,opacity:.25,transparent:!0,depthWrite:!1}));return i.visible=!0,i}static createCue(e,t,i,r){let a=this.cueGeometry(e,t,i,11,r),n=new Group,s=new Group;return a.applyMatrix4(new Matrix4().identity().makeRotationAxis(aO,-Math.PI/2)),a.position.set(-i/2-.03275,0,.00393),n.rotation.y=this.baseTilt,n.add(a),n.add(CueMesh.createFatHit(i,t*CueMesh.fatHitRadiusFactor)),s.add(n),{mesh:s,tiltMesh:n,cueBody:a}}static createFatHit(e,t){let i=new CylinderGeometry(t,t,e,8,1,!1);i.applyMatrix4(new Matrix4().identity().makeRotationAxis(aO,-Math.PI/2));let r=new Mesh(i,new MeshBasicMaterial);return r.position.set(-e/2-.03275,0,.00393),r.visible=!1,r.name="cueHitZone",r}static cueGeometry(e,t,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:11,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},n={...nT,...a},s=new Group,{jointLength:o,ferruleLength:l,buttRatio:c}=n,h=new MeshPhongMaterial({color:n.shaftColour,shininess:50}),u=new MeshPhongMaterial({color:n.buttColour,shininess:80}),d=new MeshPhongMaterial({color:n.jointColour,shininess:25}),p=CueMesh.jointStyles[n.jointColour];p&&(d.shininess=p.shininess,d.specular.set(p.specular));let f=CueMesh.ferruleStyles[n.ferruleColour]||CueMesh.ferruleStyles["#e5e5e5"],m=new MeshPhongMaterial({color:n.ferruleColour,shininess:f.shininess,specular:f.specular}),g=new MeshPhongMaterial({color:4881562,shininess:5});n.grain&&(h.map=CueMesh.woodGrainTexture(n.shaftColour),u.map=CueMesh.woodGrainTexture(n.buttColour,11));let v=i*c,_=i*(1-c)-o-l,y=-i/2,x=y+v,M=CueMesh.createSpliceGeometries(x,y,.38*v,e=>t*(1-(e-y)/v*.1),e=>(e-y)/v);s.add(new Mesh(M.upper,h)),s.add(new Mesh(M.lower,u));let S=new Mesh(new CircleGeometry(t,24),u);S.rotation.x=Math.PI/2,S.position.y=y,s.add(S);let b=.9*t,T=new Mesh(new CylinderGeometry(b,b,o,r),d);T.position.y=x+o/2,s.add(T);let E=new Mesh(new CylinderGeometry(e,b,_,r),h);E.position.y=x+o+_/2,s.add(E);let w=new Mesh(new CylinderGeometry(e,e,l,r),m);w.position.y=E.position.y+_/2+l/2,s.add(w);let A=new Mesh(new CylinderGeometry(.93*e,e,.0055,r),g);return A.position.y=w.position.y+l/2+.00275,A.name="cueTip",s.add(A),s}static createSpliceGeometries(e,t,i,r,a){let n=[],s=[],o=[],l=[],c=[],h=[];for(let u=0;u<24;u++){let d=(u+1)%24,p=u/24,f=(u+1)/24,m=p*Math.PI*2,g=f*Math.PI*2,v=e-(1-Math.abs(4*u/24%1*2-1))*i,_=e-(1-Math.abs(4*d/24%1*2-1))*i,y=r(e),x=r(v),M=r(_),S=r(t),b=new Vector3(Math.cos(m)*y,e,Math.sin(m)*y),T=new Vector3(Math.cos(g)*y,e,Math.sin(g)*y),E=new Vector3(Math.cos(m)*x,v,Math.sin(m)*x),w=new Vector3(Math.cos(g)*M,_,Math.sin(g)*M),A=new Vector3(Math.cos(m)*S,t,Math.sin(m)*S),R=new Vector3(Math.cos(g)*S,t,Math.sin(g)*S);CueMesh.addSpliceQuad(n,s,o,b,E,T,w,p,a(e),p,a(v),f,a(e),f,a(_)),CueMesh.addSpliceQuad(l,c,h,E,A,w,R,p,a(v),p,a(t),f,a(_),f,a(t))}let u=new BufferGeometry;u.setAttribute("position",new Float32BufferAttribute(n,3)),u.setAttribute("normal",new Float32BufferAttribute(s,3)),u.setAttribute("uv",new Float32BufferAttribute(o,2));let d=new BufferGeometry;return d.setAttribute("position",new Float32BufferAttribute(l,3)),d.setAttribute("normal",new Float32BufferAttribute(c,3)),d.setAttribute("uv",new Float32BufferAttribute(h,2)),{upper:u,lower:d}}static addSpliceQuad(e,t,i,r,a,n,s,o,l,c,h,u,d,p,f){e.push(r.x,r.y,r.z,n.x,n.y,n.z,a.x,a.y,a.z),e.push(n.x,n.y,n.z,s.x,s.y,s.z,a.x,a.y,a.z);let m=new Vector3(r.x,0,r.z).normalize(),g=new Vector3(a.x,0,a.z).normalize(),v=new Vector3(n.x,0,n.z).normalize(),_=new Vector3(s.x,0,s.z).normalize();t.push(m.x,m.y,m.z,v.x,v.y,v.z,g.x,g.y,g.z),t.push(v.x,v.y,v.z,_.x,_.y,_.z,g.x,g.y,g.z),i.push(o,l,u,d,c,h),i.push(u,d,p,f,c,h)}static woodGrainTexture(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7;if("u"<typeof document)return null;let i=document.createElement("canvas");i.width=64,i.height=512;let r=i.getContext("2d");if(!r)return new CanvasTexture(i);r.fillStyle=e,r.fillRect(0,0,64,512);let a=CueMesh.mulberry32(t);for(let e=0;e<140;e++){let e=64*a(),t=512*a(),i=512*(.4+.6*a());r.strokeStyle=a()>.45?"rgba(0,0,0,0.14)":"rgba(255,255,255,0.07)",r.lineWidth=.5+1.6*a(),r.beginPath();let n=.4+1.6*a();r.moveTo(e,t);for(let s=0;s<i;s+=6)r.lineTo(e+Math.sin(s*(.05+.06*a()))*n,t+s);r.stroke()}let n=r.createLinearGradient(0,0,0,512);n.addColorStop(0,"rgba(255,255,255,0.06)"),n.addColorStop(.5,"rgba(0,0,0,0.05)"),n.addColorStop(1,"rgba(255,255,255,0.04)"),r.fillStyle=n,r.fillRect(0,0,64,512);let s=new CanvasTexture(i);return s.wrapS=1e3,s.repeat.set(4,1),s.colorSpace="srgb",s}static mulberry32(e){return function(){e|=0;let t=Math.imul((e=e+0x6d2b79f5|0)^e>>>15,1|e);return(((t=t+Math.imul(t^t>>>7,61|t)^t)^t>>>14)>>>0)/0x100000000}}};nb(CueMesh,"mesh",void 0),nb(CueMesh,"baseTilt",.12),nb(CueMesh,"fatHitRadiusFactor",4),nb(CueMesh,"placermaterial",new MeshPhongMaterial({color:0xffffff,wireframe:!1,flatShading:!1,transparent:!1})),nb(CueMesh,"helpermaterial",new ShaderMaterial({uniforms:{lightDirection:{value:new Vector3(0,0,1)}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform vec3 lightDirection;
      void main() {
        float intensity = dot(vNormal, lightDirection);
        vec3 color = vec3(1.0, 1.0, 1.0);
        vec3 finalColor = color * intensity;
        gl_FragColor = vec4(finalColor, 0.075 * (1.0-vUv.y));
      }
    `,wireframe:!1,transparent:!0})),nb(CueMesh,"jointStyles",{"#2b2f36":{shininess:25,specular:3355443},"#e5e5e5":{shininess:100,specular:1118481},"#d9a62e":{shininess:150,specular:0xfff2c8},"#c7ccd6":{shininess:160,specular:0xffffff}}),nb(CueMesh,"ferruleStyles",{"#e5e5e5":{shininess:100,specular:1118481},"#d9a62e":{shininess:150,specular:0xfff2c8}});let nE=new Vector3,nw=new Vector3,nA=new Raycaster;function nR(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Cue=class Cue{rotateAim(e,t){!this.aimInputs||this.aimInputs.isDisabled()||(this.aim.angle=Math.fround(this.aim.angle+e),this.aimLimits&&(this.aim.angle=Math.min(this.aimLimits.angleMax,Math.max(this.aimLimits.angleMin,this.aim.angle))),this.root&&(this.root.rotation.z=this.aim.angle),this.aimInputs.showOverlap(),this.avoidCueTouchingOtherBall(t))}adjustPower(e){!this.aimInputs||this.aimInputs.isDisabled()||(this.aim.power=Math.fround(Math.min(5.24,this.aim.power+e)),this.updateAimInput())}setPower(e){!this.aimInputs||this.aimInputs.isDisabled()||(this.aim.power=Math.fround(5.24*e),this.updateAimInput())}hit(e){let{angle:t,power:i,offset:r,elevation:a}=this.aim;this.t=0,this.hitLift=0,this.struckBall=e,this.hittingAnimation=!0,e.state=nr.Sliding;let n=a8(t,i,r,a);e.vel.copy(n.vel),e.rvel.copy(n.rvel),this.hitStatsElement&&(this.hitStatsElement.innerText="Angle: ".concat(t.toFixed(2)," Power: ").concat(i," ")+"Offset: ".concat(r.x.toFixed(2),", ").concat(r.y.toFixed(2)," Elevation: ").concat(a.toFixed(0)," ")+"Vel: ".concat(e.vel.length().toFixed(2),"m/s rVel: ").concat(e.rvel.length().toFixed(2),"rad/s"))}aimAtNext(e,t){if(!t)return;let i=aG(this.tempVec.copy(t.pos).sub(e.pos));this.aim.angle=aL(i.y,i.x)}adjustSpin(e,t){if(!this.aimInputs||this.aimInputs.isDisabled())return;let i=this.tempVec3.copy(this.aim.offset).add(e);this.setSpin(i,t)}setSpin(e,t){!this.aimInputs||this.aimInputs.isDisabled()||(this.t=0,e.length()>.45&&e.normalize().multiplyScalar(.45),this.aim.offset.copy(aX(e)),this.avoidCueTouchingOtherBall(t),this.updateAimInput())}setElevation(e){if(!this.aimInputs||this.aimInputs.isDisabled())return;let t=e;this.aimLimits&&(t=Math.min(this.aimLimits.elevationMax,Math.max(this.aimLimits.elevationMin,t))),this.aim.elevation=t,this.updateAimInput()}avoidCueTouchingOtherBall(e){let t=0;for(;t++<20&&this.intersectsAnything(e);)this.aim.offset.y+=.1,this.aim.offset.length()>.45&&this.aim.offset.normalize().multiplyScalar(.45);let i=0;for(;i<5&&this.intersectsAnything(e);)this.setElevation(this.aim.elevation+.01),i++;(t>1||i>0)&&this.updateAimInput()}updateAimInput(){var e,t,i,r,a;null==(e=this.aimInputs)||e.updateVisualState(this.aim.offset.x,this.aim.offset.y),null==(t=this.aimInputs)||t.updatePowerSlider(this.aim.power/5.24),null==(r=this.aimInputs)||null==(i=r.updateTiltSlider)||i.call(r,this.aim.elevation),null==(a=this.aimInputs)||a.showOverlap()}updateCueRotation(){this.root&&(this.root.rotation.z=this.aim.angle);let e=CueMesh.baseTilt+this.aim.elevation;for(let t of this.cues)t.tiltMesh.rotation.y=e}applyHitAnimation(e){this.hittingAnimation?(this.hitAnimationWeight=1,this.updateHitLift()):(this.hitAnimationWeight*=.97,this.hitLift=0);let t=this.hitAnimationCurve(this.t);t<0&&(t*=.5+.5*(this.aim.power/5.24));let i=this.hitAnimationWeight*t*.0655,r=(1-this.hitAnimationWeight)*e-i,a=(.15+Math.min(this.t/5,.25))*i;this.restZ=Math.max(-.016375,a+.03275*this.aim.offset.y);let n=0!==this.hitLift?.03275*Cue.maxHitLift:this.restZ;for(let e of this.cues){e.cueBody.position.set(-this.length/2-.036025+r,.03275*this.aim.offset.x,n);let t=this.squirtAngle(),i=e.cueBody.position.x+this.length/2,a=e.cueBody.position.y;e.cueBody.rotation.z=-Math.PI/2+t,e.cueBody.position.x=i-this.length/2*Math.cos(t),e.cueBody.position.y=a-this.length/2*Math.sin(t)}return r}updateHitLift(){let e=this.struckBall;if(!e)return;let t=this.aim.pos.x-e.pos.x,i=this.aim.pos.y-e.pos.y;e.vel.x*t+e.vel.y*i>0&&t*t+i*i<.03275*Cue.hitLiftReturn*(.03275*Cue.hitLiftReturn)&&(0===this.hitLift&&console.log("Raise"),this.hitLift=Cue.maxHitLift)}updateCuePosition(e,t){this.root&&this.root.position.copy(e);let i=this.tiltMesh?this.tiltMesh.rotation.y:0,r=(t-.03275)*Math.cos(i)+this.restZ*Math.sin(i);if(this.shadowMesh){let e=this.squirtAngle(),t=(this.cueBody?this.cueBody.position.y:0)+this.length/2*Math.sin(e);this.shadowMesh.rotation.z=e,this.shadowMesh.position.set(r+.03275*Math.cos(i)-.03275+.03275*Math.cos(e),t+.03275*Math.sin(e),-.0324225),this.shadowMesh.scale.x=Math.cos(i)}this.placerMesh&&(this.placerMesh.rotation.z=this.t)}moveTo(e){var t;this.aim.pos.copy(e),this.updateCueRotation();let i=null!=(t=this.dragT)?t:this.t,r=null===this.dragT?this.aim.power/5.24:Cue.dragPullAmplifier,a=(aI(1.5*i+Math.PI/2)-1)*.0655*r,n=this.applyHitAnimation(a);this.updateCuePosition(e,n)}hitAnimationCurve(e){let t=[{t:0,v:-2},{t:1,v:-1},{t:2,v:1},{t:3,v:2}];if(e<=t[0].t)return t[0].v;if(e>=t[t.length-1].t)return t[t.length-1].v;let i=t.findIndex((i,r)=>{var a;return e>=i.t&&e<=(null==(a=t[r+1])?void 0:a.t)}),r=t[i],a=t[i+1],n=t[Math.max(0,i-1)],s=t[Math.min(t.length-1,i+2)],o=(e-r.t)/(a.t-r.t),l=o*o,c=l*o;return n.v*(-.5*c+l-.5*o)+r.v*(1.5*c-2.5*l+1)+a.v*(-1.5*c+2*l+.5*o)+s.v*(.5*c-.5*l)}update(e){this.t+=e,this.moveTo(this.aim.pos)}placeBallMode(){for(let e of this.cues)e.mesh.visible=!1;this.shadowMesh&&(this.shadowMesh.visible=!1),this.placerMesh&&(this.placerMesh.visible=!0),this.aim.angle=0}aimMode(){for(let e of this.cues)e.mesh.visible=!0;this.shadowMesh&&(this.shadowMesh.visible=!0),this.placerMesh&&(this.placerMesh.visible=!1)}squirtAngle(){return Math.atan(Math.tan(.5*R)*this.aim.offset.x/.45)}spinOffset(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.aim;return aV(aW(e.angle,this.tempVec2)).multiplyScalar(.03275*e.offset.x).setZ(.03275*e.offset.y)}intersectsAnything(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.aim;return function(e,t,i){let r=nE.copy(e.cueball.pos).add(i),a=CueMesh.baseTilt+t.elevation,n=aW(t.angle+Math.PI,nw);n.multiplyScalar(Math.cos(a)),n.z=Math.sin(a),nA.set(r,n);let s=[];for(let t of e.balls)s.push(t.ballmesh.mesh);return e.mesh&&s.push(e.mesh),nA.intersectObjects(s,!0).length>0}(e,t,this.spinOffset(t))}showHelper(e){this.helperMesh&&(this.helperMesh.visible=e&&Cue.helperEnabled)}toggleHelper(){var e;Cue.helperEnabled=!Cue.helperEnabled,this.helperMesh&&(this.helperMesh.visible=!this.helperMesh.visible),null==(e=this.aimInputs)||e.showOverlap()}constructor(e,t){if(nR(this,"mesh",void 0),nR(this,"tiltMesh",void 0),nR(this,"cueBody",void 0),nR(this,"helperMesh",void 0),nR(this,"placerMesh",void 0),nR(this,"shadowMesh",void 0),nR(this,"root",void 0),nR(this,"p1",void 0),nR(this,"p2",void 0),nR(this,"cues",[]),nR(this,"t",0),nR(this,"dragT",null),nR(this,"hittingAnimation",!1),nR(this,"aimInputs",void 0),nR(this,"aim",new AimEvent),nR(this,"aimLimits",null),nR(this,"length",+TableGeometry.tableX),nR(this,"hitStatsElement",document.getElementById("hitStats")),nR(this,"tempVec",new Vector3),nR(this,"tempVec2",new Vector3),nR(this,"tempVec3",new Vector3),nR(this,"hitAnimationWeight",0),nR(this,"hitLift",0),nR(this,"restZ",0),nR(this,"struckBall",void 0),"u">typeof document){let i=CueMesh.createCue(.07*.03275/.5,.23*.03275/.5,this.length,e),r=CueMesh.createCue(.07*.03275/.5,.23*.03275/.5,this.length,t);this.cues.push(i,r),this.mesh=i.mesh,this.tiltMesh=i.tiltMesh,this.cueBody=i.cueBody,this.p1=new Group,this.p2=new Group,this.p1.add(i.mesh),this.p2.add(r.mesh),this.helperMesh=CueMesh.createHelper(),this.placerMesh=CueMesh.createPlacer(),this.shadowMesh=CueMesh.createShadow(this.length),this.root=new Group,this.root.add(this.p1,this.p2,this.helperMesh,this.placerMesh,this.shadowMesh),this.p2.visible=!1}}};function nC(e){let t={};for(let[i,r]of Object.entries(e))i.startsWith("cue.")&&(t[i.slice(4)]="true"===r||"false"!==r&&(/^-?\d+(\.\d+)?$/.test(r)?parseFloat(r):r));return{...nT,...t}}function nP(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}nR(Cue,"dragPullAmplifier",2.5),nR(Cue,"maxHitLift",1.2),nR(Cue,"hitLiftReturn",1),nR(Cue,"helperEnabled",!0);let ProximityIndicator=class ProximityIndicator{initTexts(){0===this.proximityTexts.length&&["+1","+2","+3"].forEach(e=>{let t=this.createPlanarText(e);this.proximityTexts.push(t),this.group.add(t)})}createTextTexture(e){let t=document.createElement("canvas");t.width=64,t.height=64;let i=t.getContext("2d");i&&(i.clearRect(0,0,64,64),i.font="bold 44px sans-serif",i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle",i.fillText(e,32,32));let r=new CanvasTexture(t);return r.minFilter=1006,r}createPlanarText(e){let t=new Mesh(new PlaneGeometry(.131,.131),new MeshBasicMaterial({map:this.createTextTexture(e),transparent:!0,opacity:1,side:0,depthWrite:!1}));return t.position.set(0,.16375,.01),t.rotation.set(0,0,0),t.visible=!1,t}showAt(e){this.group.position.set(e.x,e.y,-.03245525),this.group.visible=!0;let t=this.reusableVec.set(-e.x,-e.y,0).normalize().multiplyScalar(.131);this.proximityTexts.forEach(e=>{e.position.set(t.x,t.y,.01)})}hide(){this.group.visible=!1,this.fills.forEach(e=>e.visible=!1),this.borders.forEach(e=>e.visible=!1),this.proximityTexts.forEach(e=>e.visible=!1),this.target=null,this.threeCushionsMet=!1,this.cushionCount=0,this.hitTarget=!1,this.minDistance=1/0}setCushionCount(e){this.borders.forEach((t,i)=>{t.visible=e>=3-i})}setProximity(e){this.minDistance=Math.min(this.minDistance,e);let t=[4,3,2];this.fills.forEach((e,i)=>{e.visible=this.minDistance<.03275*t[i]}),3===this.proximityTexts.length&&(this.proximityTexts[0].visible=this.minDistance<=.131&&this.minDistance>.09825,this.proximityTexts[1].visible=this.minDistance<=.09825&&this.minDistance>.0655,this.proximityTexts[2].visible=this.minDistance<=.0655)}constructor(){if(nP(this,"group",new Group),nP(this,"borders",[]),nP(this,"fills",[]),nP(this,"proximityTexts",[]),nP(this,"target",null),nP(this,"threeCushionsMet",!1),nP(this,"cushionCount",0),nP(this,"hitTarget",!1),nP(this,"minDistance",1/0),nP(this,"reusableVec",new Vector3),"u"<typeof document)return;this.group.position.z=-.0317675,this.group.visible=!1;let e=[4,3,2],t=[.15,.3,.5],i=[.15,.35,.6];for(let r=0;r<3;r++){let a=.03275*e[r],n=new EllipseCurve(0,0,a,a),s=new LineLoop(new BufferGeometry().setFromPoints(n.getPoints(64)),new LineBasicMaterial({color:0xffffff,transparent:!0,opacity:t[r]}));this.borders.push(s),this.group.add(s),s.visible=!1;let o=new Mesh(new CircleGeometry(a,24),new MeshBasicMaterial({color:0xffffff,transparent:!0,opacity:i[r],side:0,depthWrite:!1}));o.visible=!1,this.fills.push(o),this.group.add(o)}this.initTexts()}};let ShotStartUtils=class ShotStartUtils{static capture(e,t){var i,r,a,n,s,o,l,c,h,u,d,p;let f=null==(p=e.cue)?void 0:p.aim;return{balls:e.shortSerialise(),cueBallId:null!=(i=null==t?void 0:t.cueBallId)?i:e.balls.indexOf(e.cueball),angle:null!=(r=null!=(a=null==t?void 0:t.angle)?a:null==f?void 0:f.angle)?r:0,power:null!=(n=null!=(s=null==t?void 0:t.power)?s:null==f?void 0:f.power)?n:0,offsetX:null!=(o=null!=(l=null==t?void 0:t.offsetX)?l:null==f?void 0:f.offset.x)?o:0,offsetY:null!=(c=null!=(h=null==t?void 0:t.offsetY)?h:null==f?void 0:f.offset.y)?c:0,elevation:null!=(u=null!=(d=null==t?void 0:t.elevation)?d:null==f?void 0:f.elevation)?u:0,rulename:null==t?void 0:t.rulename,cushionModelName:null==t?void 0:t.cushionModelName,tableSize:null==t?void 0:t.tableSize,dt:null==t?void 0:t.dt,baseUrl:null==t?void 0:t.baseUrl}}static buildRecreateUrl(e){var t,i,r,a,n,s,o,l,c,h,u,d;if(!e)return"";let p=(null!=(t=null==(u=globalThis.location)?void 0:u.href)?t:"index.html").split("?")[0],f=null!=(i=null!=(r=e.baseUrl)?r:p)?i:"index.html",m=new URLSearchParams(null!=(a=null==(d=globalThis.location)?void 0:d.search)?a:""),g=null!=(n=null!=(s=e.rulename)?s:m.get("ruletype"))?n:"nineball",v=null!=(o=null!=(l=e.cushionModelName)?l:m.get("cushionModel"))?o:"mathavan",_=null!=(c=e.tableSize)?c:Number(null!=(h=m.get("tableSize"))?h:10),y=new URLSearchParams;return y.set("ruletype",g),y.set("practice",""),y.set("init",JSON.stringify(e.balls)),y.set("initShot",JSON.stringify({cueBallId:e.cueBallId,angle:e.angle,power:e.power,offset:{x:e.offsetX,y:e.offsetY},elevation:e.elevation})),y.set("cushionModel",v),10!==_&&y.set("tableSize",String(_)),"".concat(f,"?").concat(y.toString())}static reportDepthExceeded(e,t){let i=ShotStartUtils.buildRecreateUrl(t);console.error(`Depth exceeded resolving collisions.
Initial conditions at shot start (JSON):
`+JSON.stringify(null!=t?t:null,null,2)+(i?`
Recreation link (paste in a browser to reproduce):
`+i:`
(No shot-start snapshot — call ShotStartUtils.capture() before the shot.)`)+`
Current state (shortSerialise): `+JSON.stringify(e.shortSerialise()))}};function nL(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Table=class Table{initialiseBalls(e){this.balls=e,this.pairs=[];for(let t=0;t<e.length;t++)for(let i=0;i<e.length;i++)t<i&&this.pairs.push({a:e[t],b:e[i]})}updateBallMesh(e){this.balls.forEach(t=>{t.updateMesh(e)})}advance(e){this.time+=1e3*e;let t=0;for(;!this.prepareAdvanceAll(e);)if(t++>100)throw ShotStartUtils.reportDepthExceeded(this,this.shotStartConditions),Error("Depth exceeded resolving collisions");this.balls.forEach(t=>{t.update(e),t.fround()}),this.proximityEnabled&&this.proximityIndicator&&function(e,t,i,r,a){if(r.group.visible&&r.target)return function(e,t,i,r){let a;if(i.target.inMotion()&&i.showAt(i.target.pos),!i.hitTarget&&e.some(e=>e.type===nn.Collision&&(e.ballA===t&&e.ballB===i.target||e.ballB===t&&e.ballA===i.target))&&(i.hitTarget=!0,i.threeCushionsMet)){let a=1.99*.03275;e.push(Outcome.proximity(t,i.target,a,r)),i.setProximity(a)}!i.threeCushionsMet&&((a=e.filter(e=>e.type===nn.Cushion&&e.ballA===t).length)!==i.cushionCount&&(i.cushionCount=a,i.setCushionCount(a)),a>=3&&(i.threeCushionsMet=!0)),i.threeCushionsMet&&!i.hitTarget&&function(e,t,i,r){var a,n,s,o,l,c;if(i.hitTarget)return;let h=e[e.length-1];if((null==h?void 0:h.type)===nn.Collision&&(h.ballA===t&&h.ballB===i.target||h.ballB===t&&h.ballA===i.target)){i.hitTarget=!0;let r=1.99*.03275;e.push(Outcome.proximity(t,i.target,r,h.timestamp+1)),i.setProximity(r);return}let u=t.pos.distanceTo(i.target.pos);!(u>=.131)&&((null==h?void 0:h.type)!==nn.Proximity?(e.push(Outcome.proximity(t,i.target,u,r)),i.setProximity(u)):u<h.incidentSpeed&&(a=e,n=t,s=i.target,o=u,l=h,c=r,l.incidentSpeed>.09825&&o<=.09825?a.push(Outcome.proximity(n,s,o,c)):a[a.length-1]=Outcome.proximity(n,s,o,l.timestamp),i.setProximity(u)))}(e,t,i,r)}(e,t,r,a);let n=i.filter(e=>e.inMotion());if(2!==n.length||!n.includes(t))return;let s=i.find(e=>!e.inMotion()&&e!==t);s&&(r.target=s,r.showAt(s.pos))}(this.outcome,this.cueball,this.balls,this.proximityIndicator,this.time)}prepareAdvanceAll(e){return this.pairs.every(t=>this.prepareAdvancePair(t.a,t.b,e))&&this.balls.every(t=>this.prepareAdvanceToCushions(t,e))}prepareAdvancePair(e,t,i){if(Collision.willCollide(e,t,i)){let i=Collision.collide(e,t);return this.outcome.push(Outcome.collision(e,t,i,this.time)),!1}return!0}prepareAdvanceToCushions(e,t){if(!e.onTable())return!0;let i=e.futurePosition(t);if(Math.abs(i.y)<TableGeometry.tableY&&Math.abs(i.x)<TableGeometry.tableX)return!0;let r=Cushion.bounceAny(e,t,TableGeometry.hasPockets,this.cushionModel);if(r&&r.incidentSpeed)return this.outcome.push(Outcome.cushion(e,r.incidentSpeed,this.time,r.cushion)),!1;if(TableGeometry.hasPockets){let i=Knuckle.findBouncing(e,t);if(i){let t=i.bounce(e);return this.outcome.push(Outcome.cushion(e,t,this.time)),!1}let r=Pocket.findPocket(PocketGeometry.pocketCenters,e,t);if(r){let i=r.fall(e,t);return this.outcome.push(Outcome.pot(e,i,this.time)),!1}}return!0}allStationary(){return this.balls.every(e=>!e.inMotion())}inPockets(){return this.balls.reduce((e,t)=>t.onTable()?e:e+1,0)}hit(){var e;this.shotStartConditions=ShotStartUtils.capture(this),this.time=0,null==(e=this.cue)||e.hit(this.cueball),this.balls.forEach(e=>{var t;null==(t=e.ballmesh)||t.trace.reset()})}serialise(){var e;return{balls:this.balls.map(e=>e.serialise()),aim:null==(e=this.cue)?void 0:e.aim.copy()}}serialiseHit(){let e=this.cue.aim.copy();return e.pos.copy(this.cueball.pos),{balls:[this.balls[0].serialise()],aim:e}}static fromSerialised(e){let t=new Table(e.balls.map(e=>Ball.fromSerialised(e)));return t.updateFromSerialised(e),t}updateFromSerialised(e){e.balls&&e.balls.forEach(e=>Ball.updateFromSerialised(this.balls[e.id],e)),e.aim&&this.cue&&(this.cue.aim=AimEvent.fromJson(e.aim))}shortSerialise(){return this.balls.map(e=>[e.pos.x,e.pos.y]).reduce((e,t)=>e.concat(t),[])}updateFromShortSerialised(e){this.balls.forEach((t,i)=>{t.pos.x=e[2*i],t.pos.y=e[2*i+1],t.pos.z=0,t.vel.copy(aU),t.rvel.copy(aU),t.state=nr.Stationary})}addToScene(e){this.balls.forEach(t=>{var i;null==(i=t.ballmesh)||i.addToScene(e)}),this.cue&&e.add(this.cue.root),this.proximityIndicator&&e.add(this.proximityIndicator.group)}showTraces(e){this.balls.forEach(t=>{t.ballmesh&&(t.ballmesh.trace.line.visible=e,t.ballmesh.trace.reset())})}freezeTraces(e){this.balls.forEach(t=>{var i;return null==(i=t.ballmesh)?void 0:i.freezeTrace(e)})}showSpin(e){this.balls.forEach(t=>{t.ballmesh&&(t.ballmesh.spinAxisArrow.visible=e)})}halt(){this.balls.forEach(e=>{e.vel.copy(aU),e.rvel.copy(aU),e.state=nr.Stationary})}overlapsAny(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.cueball;return this.balls.filter(e=>e!==t).some(t=>.0655>t.pos.distanceTo(e))}constructor(e){if(nL(this,"balls",void 0),nL(this,"cue",void 0),nL(this,"proximityIndicator",void 0),nL(this,"proximityEnabled",!1),nL(this,"pairs",void 0),nL(this,"outcome",[]),nL(this,"time",0),nL(this,"cueball",void 0),nL(this,"cushionModel",a5),nL(this,"mesh",void 0),nL(this,"shotStartConditions",void 0),this.cueball=e[0],this.initialiseBalls(e),"u">typeof document){let e=Session.getInstance();this.cue=new Cue(nC(e.customParams),nC(e.opponentParams)),this.proximityIndicator=new ProximityIndicator}}};function nI(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let Rack=class Rack{static get spot(){return new Vector3(-TableGeometry.X/2,0,0)}static jitter(e){return aX(e.clone().add(new Vector3(Rack.noise*(Math.random()-.5),Rack.noise*(Math.random()-.5),0)))}static unlabeledAppearance(){return Session.getLod()>1?"texturedDots":void 0}static cueBall(e,t){return new Ball(Rack.jitter(e),0xffffff,t,Rack.unlabeledAppearance())}static swapBallPositions(e,t){let i=e.pos.clone();e.pos.copy(t.pos),t.pos.copy(i)}static diamond(){let e=new Vector3(TableGeometry.tableX/2,0,0),t=[],i=(e,t,i)=>new Ball(Rack.jitter(e),t,i);return t.push(Rack.cueBall(Rack.spot),i(e,Rack.BALL_COLORS[1],1)),e.add(Rack.diagonal),t.push(i(e,Rack.BALL_COLORS[2],2)),e.sub(Rack.across),t.push(i(e,Rack.BALL_COLORS[3],3)),e.add(Rack.diagonal),t.push(i(e,Rack.BALL_COLORS[4],4)),e.sub(Rack.across),t.push(i(e,Rack.BALL_COLORS[5],5)),e.addScaledVector(Rack.across,2),t.push(i(e,Rack.BALL_COLORS[6],6)),e.add(Rack.diagonal).sub(Rack.across),t.push(i(e,Rack.BALL_COLORS[7],7)),e.sub(Rack.across),t.push(i(e,Rack.BALL_COLORS[8],8)),e.add(Rack.diagonal),t.push(i(e,Rack.BALL_COLORS[9],9)),Rack.swapBallPositions(t[4],t[9]),t}static triangle(){let e=Rack.trianglePositions(),t=[];return t.push(Rack.cueBall(Rack.spot)),e.forEach((e,i)=>{let r=i+1;t.push(new Ball(Rack.jitter(e),Rack.BALL_COLORS[r],r))}),Rack.swapBallPositions(t[4],t[9]),t}static trianglePositions(){let e=[],t=new Vector3(TableGeometry.X/2,0,0);return e.push(aF(t)),t.add(this.diagonal),e.push(aF(t)),t.sub(this.across),e.push(aF(t)),t.add(this.diagonal),e.push(aF(t)),t.sub(this.across),e.push(aF(t)),t.addScaledVector(this.across,2),e.push(aF(t)),t.add(this.diagonal),e.push(aF(t)),t.sub(this.across),e.push(aF(t)),t.sub(this.across),e.push(aF(t)),t.sub(this.across),e.push(aF(t)),t.add(this.diagonal).sub(this.across),e.push(aF(t)),t.add(this.across),e.push(aF(t)),t.add(this.across),e.push(aF(t)),t.add(this.across),e.push(aF(t)),t.add(this.across),e.push(aF(t)),e}static three(){let e=TableGeometry.X/2,t=TableGeometry.Y/4;return[Rack.cueBall(Rack.jitter(new Vector3(-e,-t,0))),new Ball(Rack.jitter(new Vector3(-e,0,0)),0xffd700,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(new Vector3(e,0,0)),0xff0000,void 0,Rack.unlabeledAppearance())]}static fourBall(){let e=TableGeometry.X/2,t=TableGeometry.Y/4;return[Rack.cueBall(Rack.jitter(new Vector3(-e,-t,0))),new Ball(Rack.jitter(new Vector3(1.5*e,0,0)),0xffd700,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(new Vector3(-e,0,0)),0xff0000,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(new Vector3(e,0,0)),0xff0000,void 0,Rack.unlabeledAppearance())]}static get sixth(){return 2*TableGeometry.Y/6}static get baulk(){return -1.5*TableGeometry.X*2/5}static snooker(){let e=[],t=TableGeometry.Y/4;e.push(Rack.cueBall(Rack.jitter(new Vector3(Rack.baulk,-(.5*t),0))));let i=Rack.snookerColourPositions();e.push(new Ball(Rack.jitter(i[0]),0xffd700,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(i[1]),32768,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(i[2]),6956288,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(i[3]),23729,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(i[4]),0xff80b3,void 0,Rack.unlabeledAppearance()),new Ball(Rack.jitter(i[5]),65536,void 0,Rack.unlabeledAppearance()));let r=Rack.trianglePositions().slice(0,15),a=PocketGeometry.pockets.pocketS.pocket.pos;return r.forEach((t,i)=>{let r=new Ball(Rack.jitter(t.add(Rack.down)),0xee0000,void 0,Rack.unlabeledAppearance());i>=15&&(r.pos.copy(a),r.pos.setZ(-8.5*.03275),r.state=nr.InPocket),e.push(r)}),e}static snookerColourPositions(){let e=TableGeometry.X/2,t=TableGeometry.X-2*TableGeometry.X/11;return[new Vector3(Rack.baulk,-Rack.sixth,0),new Vector3(Rack.baulk,Rack.sixth,0),new Vector3(Rack.baulk,0,0),new Vector3(0,0,0),new Vector3(e,0,0),new Vector3(t,0,0)]}static revealRedsToPlay(){return 15}static eightBall(){let e=this.triangle();return Rack.swapBallPositions(e[4],e[9]),Rack.swapBallPositions(e[4],e[8]),Rack.swapBallPositions(e[3],e[11]),Rack.swapBallPositions(e[6],e[14]),Rack.swapBallPositions(e[4],e[9]),e}static fromInitParam(e){var t;let i=new URLSearchParams(null==(t=globalThis.location)?void 0:t.search);if(!i.has("practice")||!i.has("init"))return e;let r=JSON.parse(i.get("init"));return e.forEach((e,t)=>{e.pos.x=r[2*t],e.pos.y=r[2*t+1],e.pos.z=0}),e}static restrictTriangle(e,t){return e.slice(0,t+1)}};nI(Rack,"noise",Math.fround(75325e-8+.0015*Math.random())),nI(Rack,"gap",.0655+2*Rack.noise),nI(Rack,"up",new Vector3(0,0,-1)),nI(Rack,"across",new Vector3(0,Rack.gap,0)),nI(Rack,"down",new Vector3(Rack.gap,0,0)),nI(Rack,"diagonal",Rack.across.clone().applyAxisAngle(Rack.up,Math.PI/3)),nI(Rack,"BALL_COLORS",["#FFFFFF","#ffd900","#0000FF","#FF0000","#800080","#ff3300","#008000","#600000","#000000","#FFFF00","#0000FF","#FF0000","#800080","#FF8000","#008000","#600000"]);let nN={width:1472,height:810,feltro:{left:96,right:1375,top:87,bottom:712},cacapas:{NW:{x:105.2,y:101.3,r:59.3},N:{x:734.6,y:70.4,r:50.5},NE:{x:1360.2,y:88.3,r:55.2},SW:{x:94.5,y:704.7,r:51.7},S:{x:735.1,y:736.3,r:37.9},SE:{x:1372.7,y:715.2,r:49.8}},bocas:{topo:{NW:142,Nw:689,Ne:781,NE:1330},base:{SW:141,Sw:689,Se:782,SE:1331},esquerda:{NW:136,SW:663},direita:{NE:136,SE:663}}};let TableConfig=class TableConfig{static apply(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;TableGeometry.configureForRule(e,t),PocketGeometry.scaleToRadius(.03275)}static tableSizeFromUrl(){var e,t;return parseFloat(new URLSearchParams(null!=(e=null==(t=globalThis.location)?void 0:t.search)?e:"").get("tableSize")||"10")}};let{feltro:nD,cacapas:nU,bocas:nO}=nN,nF=(nD.left+nD.right)/2,nB=(nD.top+nD.bottom)/2,nV=(nD.right-nD.left)/2,nk=(nD.bottom-nD.top)/2,nG=function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return t.reduce((e,t)=>e+t,0)/t.length},nz=nG(nF-nU.NW.x,nU.NE.x-nF,nF-nU.SW.x,nU.SE.x-nF),nH=nG(nB-nU.NW.y,nB-nU.NE.y,nU.SW.y-nB,nU.SE.y-nB),nW=nG(nU.NW.r,nU.NE.r,nU.SW.r,nU.SE.r),nX=nG(nB-nU.N.y,nU.S.y-nB),nj=nG(nU.N.r,nU.S.r),nq=nG(nF-nO.topo.NW,nO.topo.NE-nF,nF-nO.base.SW,nO.base.SE-nF),nY=nG(nB-nO.esquerda.NW,nO.esquerda.SW-nB,nB-nO.direita.NE,nO.direita.SE-nB),nK=nG(nF-nO.topo.Nw,nO.topo.Ne-nF,nF-nO.base.Sw,nO.base.Se-nF),nJ=1;function nZ(){return{left:-nF/nJ,right:(nN.width-nF)/nJ,top:nB/nJ,bottom:-(nN.height-nB)/nJ}}function nQ(e){return{u:(nF+e.x*nJ)/nN.width,v:(nB-e.y*nJ)/nN.height}}nN.width,nN.height;let n$=Rack.BALL_COLORS,n0=document.querySelector("#app"),n1=document.querySelector("#lobby"),n3=document.querySelector("#game"),n2=document.querySelector("#table-canvas"),n4=document.querySelector("#playfield"),n5=document.querySelector("#message"),n6=document.querySelector("#cue-wrap"),n8=n6.querySelector("img"),n9=document.querySelector("#guide"),n7=document.querySelector("#aim-line"),se=document.querySelector("#ghost-ball"),st=document.querySelector("#target-line"),si=document.querySelector("#spin-dialog"),sr=document.querySelector("#game-menu"),sa=document.querySelector("#power-level"),sn=document.querySelector("#power-value"),ss="normal",so="bot",sl=0,sc=0,sh=0,su=0,sd=new Vector3,sp=0,sf=[null,null],sm=!1,sg=!1,sv={x:0,y:0},s_=0,sy=0,sx=!0,sM=!1,sS=0,sb=0,sT=[];function sE(e){let t=(s_=Math.max(0,Math.min(220,e)))/220;sa.style.setProperty("--power",t.toFixed(3)),sn.value="".concat(Math.round(100*t),"%")}function sw(e){return e&&e>=1&&e<=7?"lisas":e&&e>=9&&e<=15?"listradas":null}function sA(e){return"lisas"===e?[1,2,3,4,5,6,7]:[9,10,11,12,13,14,15]}function sR(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1800;window.clearTimeout(sb),n5.textContent=e,n5.classList.add("is-visible"),sb=window.setTimeout(()=>n5.classList.remove("is-visible"),t)}function sC(e,t){let i=document.createElement("li");return i.className=t,e>=9&&i.classList.add("is-striped"),i.style.setProperty("--ball-color",n$[e]),i.textContent=e.toString(),i}function sP(){let e="bot"===so?["Você","Bot"]:["Jogador 1","Jogador 2"];document.querySelector("#name-1").textContent=e[0],document.querySelector("#name-2").textContent=e[1],document.querySelector("#player-1").classList.toggle("is-active",0===sp),document.querySelector("#player-2").classList.toggle("is-active",1===sp),sf.forEach((e,t)=>{let i,r=(i="#balls-".concat(t+1),document.querySelector(i));if(r.replaceChildren(),!e){for(let e=0;e<7;e++){let e=document.createElement("li");e.className="slot-ball",e.style.opacity="0.18",r.appendChild(e)}return}sA(e).forEach(e=>{let t=sC(e,"slot-ball");t.classList.toggle("is-potted",sT.includes(e)),r.appendChild(t)})}),document.querySelector("#potted-balls").replaceChildren(...sT.map(e=>sC(e,"tray-ball")))}function sL(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0===sp?"Sua vez":"Vez do adversário";sy=performance.now(),sm=!1,sg=!1,sE(0),n4.classList.remove("is-dragging"),sP(),sU(),sR(e),window.clearTimeout(sS),"bot"!==so||1!==sp||sM||(sS=window.setTimeout(sk,900))}function sI(e){sp=+(0===sp),sL(e)}function sN(e){let{u:t,v:i}=nQ(e);return{x:t*n4.clientWidth,y:i*n4.clientHeight}}function sD(){return nJ*n4.clientWidth/nN.width}function sU(){if(!s)return;let e=new Vector3(Math.cos(su),Math.sin(su),0),t=sN(s.cueball.pos.clone().addScaledVector(e,-.0442125)),i=sD(),r=1.1*TableGeometry.X*i,a=r*(n8.naturalHeight||58)/(n8.naturalWidth||1361),n=s_/220*.22925*i;n6.style.left="".concat(t.x,"px"),n6.style.top="".concat(t.y,"px"),n6.style.transform="rotate(".concat(-su,"rad)"),n8.style.width="".concat(r,"px"),n8.style.top="".concat(-.362*a,"px"),n8.style.transform="translateX(".concat(-n,"px)"),function(){var e;if(!s||sm||sM){n9.style.display="none",n6.style.display="none";return}n9.style.display="block",n6.style.display="block";let t=n4.clientWidth,i=n4.clientHeight;n9.setAttribute("viewBox","0 0 ".concat(t," ").concat(i));let r=s.cueball.pos,a=new Vector3(Math.cos(su),Math.sin(su),0),n=r.clone().addScaledVector(a,.0376625),o=function(e){let t=s.cueball.pos,i=null;for(let r of s.balls){if(r===s.cueball||!r.onTable())continue;let a=r.pos.clone().sub(t),n=a.dot(e);if(n<=0)continue;let o=a.lengthSq()-n*n;if(o>.0655*.0655)continue;let l=n-Math.sqrt(.0655*.0655-o);(!i||l<i.distance)&&(i={ball:r,distance:l})}return i}(a),l=null!=(e=null==o?void 0:o.distance)?e:Math.min(...[(TableGeometry.tableX-r.x)/a.x,(-TableGeometry.tableX-r.x)/a.x,(TableGeometry.tableY-r.y)/a.y,(-TableGeometry.tableY-r.y)/a.y].filter(e=>Number.isFinite(e)&&e>0)),c=r.clone().addScaledVector(a,l),h=sN(n),u=sN(c);if(n7.setAttribute("x1",h.x.toString()),n7.setAttribute("y1",h.y.toString()),n7.setAttribute("x2",u.x.toString()),n7.setAttribute("y2",u.y.toString()),o){let e=sN(o.ball.pos),t=o.ball.pos.clone().sub(c).normalize(),i=sN(o.ball.pos.clone().addScaledVector(t,.180125)),r=.03275*sD();se.style.display="block",se.setAttribute("cx",u.x.toString()),se.setAttribute("cy",u.y.toString()),se.setAttribute("r",r.toString()),st.style.display="block",st.setAttribute("x1",e.x.toString()),st.setAttribute("y1",e.y.toString()),st.setAttribute("x2",i.x.toString()),st.setAttribute("y2",i.y.toString())}else se.style.display="none",st.style.display="none"}()}function sO(){let e=Math.max(1,n4.clientWidth),t=Math.max(1,n4.clientHeight);c.setPixelRatio(Math.min(devicePixelRatio,2)),c.setSize(e,t,!1),Object.assign(l,nZ()),l.updateProjectionMatrix(),sU()}function sF(e){if(sm||sM||!s.allStationary())return;s.outcome=[];let t=a8(su,5.24*Math.max(.12,e),sd);s.cueball.state=nr.Sliding,s.cueball.vel.copy(t.vel),s.cueball.rvel.copy(t.rvel),s.time=0,sm=!0,sg=!1,sE(0),n4.classList.remove("is-dragging"),sU()}function sB(e){return!!e&&s.balls.filter(t=>{var i;return sA(e).includes(null!=(i=t.label)?i:-1)}).every(e=>!e.onTable())}function sV(e){let t=Math.min(.05,(e-sc)/1e3);sc=e,sh+=t;let i=1/120;for(;sh>=i;)s.allStationary()||(s.advance(i),s.updateBallMesh(i)),sh-=i;if(s.balls.forEach(e=>{let t=e.state!==nr.InPocket;e.ballmesh.mesh.visible=t,e.ballmesh.shadow.visible=t}),sm&&s.allStationary()&&(sm=!1,!function(){var e;let t=s.outcome,i=Outcome.pots(t),r=i.filter(e=>e!==s.cueball);for(let e of r)e.label&&!sT.includes(e.label)&&sT.push(e.label);if(!sf[0]){let e=r.map(e=>sw(e.label)).find(Boolean);e&&(sf[sp]=e,sf[+(0===sp)]="lisas"===e?"listradas":"lisas")}let a=Outcome.firstCollision(Outcome.cueBallFirst(s.cueball,t)),n=null==a||null==(e=a.ballB)?void 0:e.label,o=i.includes(s.cueball),l=!a,c=null!==sf[sp]&&8!==n&&sw(n)!==sf[sp],h=8===n&&!sB(sf[sp]),u=o||l||c||h;if(r.some(e=>8===e.label)){let e,t=sB(sf[sp])&&!u;sM=!0,sR("bot"===so?(0===sp?t:!t)?"Você venceu":"Você perdeu":(e=t?sp+1:0===sp?2:1,"Jogador ".concat(e," venceu")),1e4),sP(),sU();return}let d=new Set(t.filter(e=>e.type===nn.Cushion).map(e=>e.ballA));sx&&0===r.length&&d.size<4?(u=!0,sR("Quebra ilegal")):o?sR("Falta: bola branca"):(c||h||l)&&sR("Falta"),sx=!1,o&&function(){let e=s.cueball;for(e.setStationary(),e.pos.copy(Rack.spot);s.overlapsAny(e.pos,e);)e.pos.x-=.07205;e.pos.z=0,e.ballmesh.mesh.visible=!0,e.ballmesh.shadow.visible=!0,e.ballmesh.updatePosition(e.pos)}(),sP();let p=r.some(e=>sw(e.label)===sf[sp]);!u&&p?sL("Sua vez"):sI()}()),!sm&&!sM){let t,i,r,a,n=30-(e-sy)/1e3;t=Math.max(0,Math.ceil(n)),i="".concat(Math.max(0,n/30*100),"%"),r=document.querySelector("#timer-1"),a=document.querySelector("#timer-2"),r.textContent=0===sp?t.toString():"30",a.textContent=1===sp?t.toString():"30",document.querySelector("#player-1 .player__timer").style.setProperty("--timer",0===sp?i:"100%"),document.querySelector("#player-2 .player__timer").style.setProperty("--timer",1===sp?i:"100%"),5===t&&n>4.9&&sR("Tempo acabando",900),n<=0&&sI("Tempo esgotado")}c.render(o,l),sl=requestAnimationFrame(sV)}function sk(){let e,t;if(sM||1!==sp||sm)return;let i=(t=sB(e=sf[1]),s.balls.filter(i=>!!i.onTable()&&i!==s.cueball&&(e?t?8===i.label:sw(i.label)===e:8!==i.label)));if(0===i.length)return;i.sort((e,t)=>e.pos.distanceToSquared(s.cueball.pos)-t.pos.distanceToSquared(s.cueball.pos));let r=i[0];su=Math.atan2(r.pos.y-s.cueball.pos.y,r.pos.x-s.cueball.pos.x)+(Math.random()-.5)*({facil:.13,normal:.055,dificil:.018})[ss],sd.set(0,0,0),sU(),window.setTimeout(()=>sF(sx?.92:.5+.28*Math.random()),450)}function sG(e){so=e,sp=0,sf=[null,null],sT.length=0,sx=!0,sM=!1,sd.set(0,0,0),su=0;try{let e,t,i,r,a,n,u,d,p,f,m,g,v,_,y,x,M;n1.hidden=!0,n3.hidden=!1,n0.classList.remove("is-lobby"),window.cancelAnimationFrame(sl),null==h||h.disconnect(),null==c||c.dispose(),TableConfig.apply("eightball",10),nJ=nV/TableGeometry.X,TableGeometry.tableY=nk/nJ-.03275,TableGeometry.Y=TableGeometry.tableY+.03275,PocketGeometry.scaleToRadius(.03275),e=PocketGeometry.pockets,t=nz/nJ,i=nH/nJ,r=.8*nW/nJ,a=nX/nJ,n=.8*nj/nJ,(u=(e,t,i,r)=>{e.pos.set(t,i,0),e.radius=r})(e.pocketNW.pocket,-t,i,r),u(e.pocketNE.pocket,t,i,r),u(e.pocketSW.pocket,-t,-i,r),u(e.pocketSE.pocket,t,-i,r),u(e.pocketN.pocket,0,a,n),u(e.pocketS.pocket,0,-a,n),d=nq/nJ,p=nY/nJ,f=nK/nJ,m=PocketGeometry.knuckleRadius,g=PocketGeometry.middleKnuckleRadius,v=TableGeometry.X,_=TableGeometry.Y,e.pocketNW.knuckleNE.pos.set(-d,_+m,0),e.pocketNW.knuckleSW.pos.set(-v-m,p,0),e.pocketNE.knuckleNW.pos.set(d,_+m,0),e.pocketNE.knuckleSE.pos.set(v+m,p,0),e.pocketSW.knuckleSE.pos.set(-d,-_-m,0),e.pocketSW.knuckleNW.pos.set(-v-m,-p,0),e.pocketSE.knuckleSW.pos.set(d,-_-m,0),e.pocketSE.knuckleNE.pos.set(v+m,-p,0),e.pocketN.knuckleNW.pos.set(-f,_+g,0),e.pocketN.knuckleNE.pos.set(f,_+g,0),e.pocketS.knuckleSW.pos.set(-f,-_-g,0),e.pocketS.knuckleSE.pos.set(f,-_-g,0),Session.init("local","Jogador","mesa",!1,!1,!1,!0,4),s=new Table(Rack.eightBall()),o=new Scene,y=nZ(),(l=new OrthographicCamera(y.left,y.right,y.top,y.bottom,.01,20)).position.set(0,0,5),(c=new WebGLRenderer({canvas:n2,alpha:!0,antialias:!0})).setClearColor(0,0),o.add(new AmbientLight(0xffffff,1.45)),(x=new DirectionalLight(0xffe6bd,2.4)).position.set(-2,-1,5),o.add(x),(M=new DirectionalLight(5217535,.7)).position.set(2,1,3),o.add(M),s.balls.forEach(e=>{e.ballmesh.updatePosition(e.pos),o.add(e.ballmesh.mesh),o.add(e.ballmesh.shadow)}),new URLSearchParams(location.search).has("debug")&&Object.assign(globalThis,{__sinuca:{table:s,geometria:{R:.03275,tableX:TableGeometry.tableX,tableY:TableGeometry.tableY},paraImagem:nQ,strike:(e,t)=>{su=e,sF(t)}}}),(h=new ResizeObserver(sO)).observe(n4),sO(),sc=performance.now(),sh=0,sl=requestAnimationFrame(sV),sL("Sua vez")}catch(t){n3.hidden=!0,n1.hidden=!1,n0.classList.add("is-lobby");let e=t instanceof Error?t.message:"erro desconhecido";window.alert("Não foi possível abrir a mesa (".concat(e,"). Verifique se a aceleração de hardware/WebGL está ativa no navegador.")),console.error(t)}}function sz(e,t){let i=Math.hypot(e,t);i>1&&(e/=i,t/=i),sd.set(-(.45*e),.45*t,0);let r="".concat(50+42*e,"%"),a="".concat(50-42*t,"%");document.querySelector("#spin-picker").style.left=r,document.querySelector("#spin-picker").style.top=a,document.querySelector("#spin-dot").style.left=r,document.querySelector("#spin-dot").style.top=a}n4.addEventListener("pointermove",e=>{if(s&&!sm&&!sM&&("local"===so||0===sp)){if(sg){let t=e.clientX-sv.x,i=e.clientY-sv.y;sE(-t*Math.cos(su)+i*Math.sin(su))}else{var t,i,r,a;let n,o=(t=e.clientX,i=e.clientY,r=(t-(n=n4.getBoundingClientRect()).left)/n.width,a=(i-n.top)/n.height,new Vector3((r*nN.width-nF)/nJ,(nB-a*nN.height)/nJ,0));su=Math.atan2(o.y-s.cueball.pos.y,o.x-s.cueball.pos.x)}sU()}}),n4.addEventListener("pointerdown",e=>{sm||sM||!(null==s?void 0:s.allStationary())||("bot"!==so||1!==sp)&&(sg=!0,sv={x:e.clientX,y:e.clientY},sE(0),n4.classList.add("is-dragging"),n4.setPointerCapture(e.pointerId),e.preventDefault())}),n4.addEventListener("pointerup",e=>{if(!sg)return;sg=!1,n4.classList.remove("is-dragging");try{n4.releasePointerCapture(e.pointerId)}catch{}let t=s_/220;sE(0),t>=.04?sF(t):sU()}),document.querySelector("#play-bot").addEventListener("click",()=>sG("bot")),document.querySelector("#play-local").addEventListener("click",()=>sG("local")),document.querySelectorAll("[data-difficulty]").forEach(e=>{e.addEventListener("click",()=>{ss=e.dataset.difficulty,document.querySelectorAll("[data-difficulty]").forEach(t=>{let i=t===e;t.classList.toggle("is-selected",i),t.setAttribute("aria-pressed",i.toString())})})}),n4.addEventListener("pointercancel",()=>{sg=!1,sE(0),n4.classList.remove("is-dragging"),sU()}),document.querySelector("#spin-button").addEventListener("click",()=>si.showModal()),document.querySelector("#spin-close").addEventListener("click",()=>si.close()),document.querySelector("#spin-reset").addEventListener("click",()=>sz(0,0)),document.querySelector("#spin-ball").addEventListener("pointerdown",e=>{let t=e.currentTarget.getBoundingClientRect();sz((e.clientX-(t.left+t.width/2))/(.42*t.width),-(e.clientY-(t.top+t.height/2))/(.42*t.height))}),document.querySelector("#menu-button").addEventListener("click",()=>sr.showModal()),document.querySelector("#resume").addEventListener("click",()=>sr.close()),document.querySelector("#restart").addEventListener("click",()=>{sr.close(),sG(so)}),document.querySelector("#back-lobby").addEventListener("click",()=>{sr.close(),window.cancelAnimationFrame(sl),null==h||h.disconnect(),null==c||c.dispose(),n3.hidden=!0,n1.hidden=!1,n0.classList.add("is-lobby")})})();