import{Controller as e}from"stimulus";import t from"dialog-polyfill";import s from"lodash/camelCase";function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e}).apply(this,arguments)}class n extends e{constructor(e){return super(e),new Proxy(this,{get:(e,t)=>{let s=Reflect.get(e,t),i=this;if(function(e){switch(e){case"application":case"element":case"constructor":case"initialize":case"log":case"data":case"valueDescriptorMap":case"identifier":return!1}return!(/^_.*?$/.test(e)||/^.*?Target(s)?$/.test(e)||/^.*?Value$/.test(e)||/^.*?ValueChanged$/.test(e)||/^.*?Class$/.test(e))}(t.toString())){if("function"==typeof s)return new Proxy(s,{apply:(e,s,n)=>(i.log(t.toString(),{args:n}),Reflect.apply(e,s,n))});this.log(t.toString())}return s}})}dispatch(e,t,s={bubbles:!0,cancelable:!0,detail:{target:e}}){let i=new CustomEvent(t,s);e.dispatchEvent(i)}log(e,t={}){if(!this.application.debug)return;let s=console;s.groupCollapsed(`%c${this.identifier} %c#${e}`,"color: #3B82F6","color: unset"),s.log(i({element:this.element},t)),s.groupEnd()}}class a extends n{connect(){this.loadContent()}loadContent(){let e=this.hasReplaceTarget?this.replaceTarget:this.element;fetch(this.endpointValue).then(e=>e.text()).then(t=>{let s=document.createElement("div");s.innerHTML=t,e.replaceWith(s);let i=new CustomEvent("ajax:success",{detail:""});e.dispatchEvent(i)}).catch(t=>{e.replaceWith("Sorry, this content failed to load");let s=new CustomEvent("ajax:error",{detail:""});e.dispatchEvent(s)}).finally(()=>{let t=new CustomEvent("ajax:complete",{detail:""});e.dispatchEvent(t)})}}a.targets=["replace"],a.values={endpoint:String};class r extends n{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.addEventListener("change",this.boundHandler))}disconnect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.removeEventListener("change",this.boundHandler))}handler(e){this.element.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))}}const l=(e,t)=>{const s=e[t];return"function"==typeof s?s:(...e)=>{}},o=(e,t,s)=>{let i=e;return!0===s?i=`${t.identifier}:${e}`:"string"==typeof s&&(i=`${s}:${e}`),i},h=(e,t,s)=>{const{bubbles:i,cancelable:n,composed:a}=t||{bubbles:!0,cancelable:!0,composed:!0};return t&&Object.assign(s,{originalEvent:t}),new CustomEvent(e,{bubbles:i,cancelable:n,composed:a,detail:s})},c={dispatchEvent:!0,eventPrefix:!0},d={events:["click","touchend"],onlyVisible:!0,dispatchEvent:!0,eventPrefix:!0},u={debug:!1,logger:console};class m{constructor(e,t={}){var s,i,n;this.log=(e,t)=>{this.debug&&(this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${e}`,"color: #3B82F6","color: unset"),this.logger.log(Object.assign({controllerId:this.controllerId},t)),this.logger.groupEnd())},this.debug=null!==(i=null!==(s=null==t?void 0:t.debug)&&void 0!==s?s:e.application.stimulusUseDebug)&&void 0!==i?i:u.debug,this.logger=null!==(n=null==t?void 0:t.logger)&&void 0!==n?n:u.logger,this.controller=e,this.controllerId=e.element.id||e.element.dataset.id,this.controllerInitialize=e.initialize.bind(e),this.controllerConnect=e.connect.bind(e),this.controllerDisconnect=e.disconnect.bind(e)}}class g extends m{constructor(e,t={}){super(e,t),this.observe=()=>{this.targetElement.addEventListener("mouseenter",this.onEnter),this.targetElement.addEventListener("mouseleave",this.onLeave)},this.unobserve=()=>{this.targetElement.removeEventListener("mouseenter",this.onEnter),this.targetElement.removeEventListener("mouseleave",this.onLeave)},this.onEnter=()=>{l(this.controller,"mouseEnter").call(this.controller),this.log("mouseEnter",{hover:!0})},this.onLeave=()=>{l(this.controller,"mouseLeave").call(this.controller),this.log("mouseLeave",{hover:!1})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}class p extends m{constructor(e,t={}){super(e,t),this.observe=()=>{try{this.observer.observe(this.targetElement,this.options)}catch(e){this.controller.application.handleError(e,"At a minimum, one of childList, attributes, and/or characterData must be true",{})}},this.unobserve=()=>{this.observer.disconnect()},this.mutation=e=>{l(this.controller,"mutate").call(this.controller,e),this.log("mutate",{entries:e})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.options=t,this.observer=new MutationObserver(this.mutation),this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}const v=e=>{const t=t=>{const{innerWidth:s,innerHeight:i}=window,n={height:i||Infinity,width:s||Infinity,event:t};l(e,"windowResize").call(e,n)},s=e.disconnect.bind(e),i=()=>{window.addEventListener("resize",t),t()},n=()=>{window.removeEventListener("resize",t)};return Object.assign(e,{disconnect(){n(),s()}}),i(),[i,n]},b=(e,t=200)=>{let s=null;return function(){const i=arguments,n=this,a=()=>e.apply(n,i);s&&clearTimeout(s),s=setTimeout(a,t)}};class f extends n{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;e.style.resize="none",e.style.boxSizing="border-box",e.addEventListener("input",this.boundHandler),e.addEventListener("focus",this.boundHandler),v(this),requestAnimationFrame(this.boundHandler)}windowResize(){this.handler()}handler(){this.autosize(this.element)}autosize(e){let t=e.offsetHeight-e.clientHeight;e.style.height="auto",e.style.height=e.scrollHeight+t+"px"}}class E extends n{constructor(){super(...arguments),this.boundHandler=this.updateCharCount.bind(this)}connect(){this.updateCharCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateCharCount(){let e=this.inputTarget.value.length;this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}E.targets=["input","output"],E.values={min:Number,max:Number},E.classes=["error"];class w extends n{get checked(){return this.checkboxTargets.filter(e=>e.checked)}get unchecked(){return this.checkboxTargets.filter(e=>!e.checked)}initialize(){this.toggle=this.toggle.bind(this),this.refresh=this.refresh.bind(this)}connect(){requestAnimationFrame(()=>{this.hasSelectAllTarget&&(this.selectAllTarget.addEventListener("change",this.toggle),this.checkboxTargets.forEach(e=>e.addEventListener("change",this.refresh)),this.refresh())})}disconnect(){this.hasSelectAllTarget&&(this.selectAllTarget.removeEventListener("change",this.toggle),this.checkboxTargets.forEach(e=>e.removeEventListener("change",this.refresh)))}toggle(e){e.preventDefault();let t=e.target;this.checkboxTargets.forEach(e=>e.checked=t.checked)}refresh(){const e=this.checkboxTargets.length,t=this.checked.length;this.selectAllTarget.checked=t>0,this.selectAllTarget.indeterminate=t>0&&t<e}}w.targets=["selectAll","checkbox"];class V extends n{constructor(){super(...arguments),this.supported=!1}connect(){this.supported=document.queryCommandSupported("copy"),this.hasRemoveUnusedValue&&this.removeUnusedValue&&(this.supported&&this.hasFallbackTarget?this.fallbackTarget.remove():this.hasCopyTarget&&this.copyTarget.remove())}select(e){e&&e.preventDefault(),this.sourceTarget.select()}copy(e){e&&e.preventDefault(),this.sourceTarget.select(),this.supported&&document.execCommand("copy")}}function y(e){return"A"==e.nodeName}function C(e){return"FORM"==e.nodeName}function T(e){return"INPUT"==e.nodeName}V.targets=["button","copy","fallback"],V.values={removeUnused:Boolean};class S extends n{get message(){return this.hasMessageValue?this.messageValue:"Are you sure?"}initialize(){this.confirm=this.confirm.bind(this)}connect(){requestAnimationFrame(()=>{let e=this.element;if(C(e))e.addEventListener("submit",this.confirm);else{if(!y(e))throw new Error("Can't handle confirmation on attached element");e.addEventListener("click",this.confirm)}})}confirm(e){window.confirm(this.message)||(e.preventDefault(),this.dispatch(this.element,"confirm:cancelled"))}}S.values={message:String};class k extends n{connect(){let e=this.messageValue;window.onbeforeunload=()=>null==e||e,window.addEventListener("popstate",this.handlePopstate),window.addEventListener("submit",()=>{window.removeEventListener("popstate",this.handlePopstate),window.onbeforeunload=null})}handlePopstate(e){return!1}}k.values={message:String};class L extends n{connect(){console.log("Debug Controller",this,this.testTargets)}}L.targets=["test"];class x extends n{constructor(){super(...arguments),this.initialValue=null,this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;this.initialValue=this.isInputElement(e)&&this.isCheckable(e)?e.checked:e.value,e.addEventListener("input",this.boundHandler),e.addEventListener("change",this.boundHandler)}disconnect(){let e=this.element;e.removeEventListener("input",this.boundHandler),e.removeEventListener("change",this.boundHandler)}restore(){let e=this.element;this.isInputElement(e)&&this.isCheckable(e)?e.checked=this.initialValue:e.value=this.initialValue}handler(e){let t=this.element;this.initialValue!==t.value?t.setAttribute("data-dirty","true"):t.removeAttribute("data-dirty")}isCheckable(e){return"radio"===e.type||"checkbox"===e.type}isInputElement(e){return"INPUT"===e.tagName}}class I extends n{connect(){this.toggle()}toggle(){this.hasDisablerTarget&&this.disablerTarget.checked?this.disableInputs():this.enableInputs()}disableInputs(){let e=this.hasClearValue&&this.clearValue;this.disableTargets.forEach((t,s)=>{e&&(t.value=""),t.disabled=!0})}enableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!1})}}I.targets=["disabler","disable"],I.values={clear:Boolean};class M extends n{dismiss(){this.element.remove()}}class H extends n{connect(){((e,t={})=>{new p(this,t)})(0,{element:this.element,childList:!0}),this.checkEmpty()}mutate(e){this.checkEmpty()}checkEmpty(){let e;e=this.hasScopeSelectorValue?this.element.querySelectorAll(this.scopeSelectorValue):this.element.children,0===e.length?(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.element.dispatchEvent(new CustomEvent("dom:empty",{bubbles:!0,cancelable:!0}))):(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.element.dispatchEvent(new CustomEvent("dom:not-empty",{bubbles:!0,cancelable:!0,detail:{count:e.length}})))}}H.classes=["empty","notEmpty"],H.values={scopeSelector:String};class O extends n{connect(){this.toggle()}toggle(){this.hasEnablerTarget&&this.enablerTarget.checked?this.enableInputs():this.disableInputs()}disableInputs(){let e=this.hasClearValue&&this.clearValue;this.enableTargets.forEach((t,s)=>{e&&(t.value=""),t.disabled=!0})}enableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!1})}}O.targets=["enabler","enable"],O.values={clear:Boolean};class _ extends n{connect(){let e=this.element;e.onerror=()=>{this.hasPlaceholderValue?e.src=this.placeholderValue:e.style.display="none"}}}_.values={placeholder:String};class D extends n{get formID(){if(this.hasIdValue)return this.idValue;let e=this.element.id;if(""!==e)return e;throw new Error(`No ID value to uniquely identify this form. Please either specify data-${this.identifier}-id-value or give this form an 'id' attribute. `)}get formIdentifier(){return`${location.href} ${this.formID}`}get formElements(){return this.element.elements}get formData(){let e={[this.formIdentifier]:{}};for(const t of this.formElements){let s=t;s.name.length>0&&(T(s)&&"checkbox"==s.type?e[this.formIdentifier][s.name]=s.checked:T(s)&&"radio"==s.type?s.checked&&(e[this.formIdentifier][s.name]=s.value):e[this.formIdentifier][s.name]=s.value)}return e}get restoreOnLoad(){return!this.hasRestoreOnLoadValue||this.restoreOnLoadValue}get clearOnSubmit(){return!this.hasClearOnSubmitValue||this.clearOnSubmitValue}initialize(){this._clear=this._clear.bind(this)}connect(){requestAnimationFrame(()=>{if(!C(this.element))throw new Error("Expected controller to be mounted on a form element.");this.restoreOnLoad&&this.restore(),this.clearOnSubmit&&this.element.addEventListener("submit",this._clear)})}disconnect(){this.clearOnSubmit&&this.element.removeEventListener("submit",this._clear)}_clear(){localStorage.removeItem(this.formIdentifier),this.dispatch(this.element,"form-save:cleared")}clear(e){e&&e.preventDefault(),this._clear()}save(e){e.preventDefault(),localStorage.setItem(this.formIdentifier,JSON.stringify(this.formData[this.formIdentifier])),this.dispatch(this.element,"form-save:save:success")}restore(e){if(e&&e.preventDefault(),localStorage.getItem(this.formIdentifier)){const e=JSON.parse(localStorage.getItem(this.formIdentifier));for(const t of this.formElements){let s=t;s.name in e&&(T(s)&&"checkbox"==s.type?s.checked=e[s.name]:T(s)&&"radio"==s.type?s.value==e[s.name]&&(s.checked=!0):s.value=e[s.name])}this.dispatch(this.element,"form-save:restore:success")}else this.dispatch(this.element,"form-save:restore:empty")}}D.values={id:String,restoreOnLoad:Boolean,clearOnSubmit:Boolean};class A extends a{connect(){this.options={element:this.element,threshold:.3},"IntersectionObserver"in window?[this.observe,this.unobserve]=((e,t={})=>{const{dispatchEvent:s,eventPrefix:i}=Object.assign({},c,t),n=(null==t?void 0:t.element)||e.element,a=e.disconnect.bind(e),r=new IntersectionObserver(t=>{const[a]=t;a.isIntersecting?(t=>{if(e.isVisible=!0,l(e,"appear").call(e,t),s){const s=o("appear",e,i),a=h(s,null,{controller:e,entry:t});n.dispatchEvent(a)}})(a):e.isVisible&&(t=>{if(e.isVisible=!1,l(e,"disappear").call(e,t),s){const s=o("disappear",e,i),a=h(s,null,{controller:e,entry:t});n.dispatchEvent(a)}})(a)},t),d=()=>{r.observe(n)},u=()=>{r.unobserve(n)};return Object.assign(e,{isVisible:!1,disconnect(){u(),a()}}),d(),[d,u]})(this,this.options):this.loadContent()}appear(e){let t=this.element;""===t.src&&e.target===t&&e.isIntersecting&&(this.loadContent(),this.unobserve&&this.unobserve())}}const $="scrollBehavior"in document.documentElement.style;let N;async function R(e,{behavior:t="smooth",block:s="start",inline:i="nearest"}={}){"smooth"!=t||$||await async function(){const{polyfill:e}=await import("smoothscroll-polyfill");N||(N=!0,e())}(),e.scrollIntoView({behavior:t,block:s,inline:i})}function z(e){if(!e)return null;const t=getComputedStyle(e).overflowY;return"visible"!==t&&"hidden"!==t&&e.scrollHeight>=e.clientHeight?e:z(e.parentElement)||document.body}class j extends n{constructor(){super(...arguments),this._dialog=null}get src(){return this.hasSrcValue?this.srcValue:this.element.src}get srcSet(){return this.hasSrcSetValue?this.srcSetValue:this.element.srcset}get sizes(){return this.hasSizesValue?this.sizesValue:this.element.sizes}get modalClassName(){return this.hasModalClass?this.modalClass:"image-lightbox-dialog"}get imageClassName(){return this.hasImageClass?this.imageClass:"image-lightbox-image"}initialize(){this.open=this.open.bind(this),this.close=this.close.bind(this)}connect(){}open(){let e=this.element;if(this._dialog)return;this._dialog=document.createElement("dialog");let s=document.createElement("img");s.className=this.imageClassName,s.src=this.src,s.srcset=this.srcSet,s.sizes=this.sizes,this._dialog.appendChild(s),e.insertAdjacentElement("afterend",this._dialog),t.registerDialog(this._dialog),this._dialog.className=this.modalClassName,this._dialog.showModal(),R(this._dialog,{behavior:"smooth",block:"end"}).catch(()=>this._dialog.scrollIntoView(!1)),this._dialog.addEventListener("click",this.close),this._dialog.addEventListener("cancel",this.close),this._dialog.addEventListener("close",this.close)}close(){this._dialog&&(this._dialog.close(),this._dialog.remove(),this._dialog=null,R(this.element,{behavior:"smooth",block:"end"}).catch(()=>this.element.scrollIntoView(!1)))}}j.values={src:String,srcSet:String,sizes:String},j.classes=["modal","image"];class P extends n{constructor(){super(...arguments),this.maxSelections=0,this.boundHandleInputs=this.handleInputs.bind(this)}connect(){this.inputTargets.forEach(e=>e.addEventListener("change",this.boundHandleInputs))}disconnect(){this.inputTargets.forEach(e=>e.removeEventListener("change",this.boundHandleInputs))}handleInputs(e){let t=this.inputTargets.reduce((e,t)=>t.checked?e+1:e,0),s=e.target;t>this.maxSelections?(e.preventDefault(),s.checked=!1,s.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!0})),s.dispatchEvent(new CustomEvent("limited-selection:too-many",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=this.messageValue)):(s.dispatchEvent(new CustomEvent("limited-selection:selection",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=""))}}P.targets=["input","error"],P.values={max:Number,message:String};class F extends n{get wrapperClass(){return this.hasWrapperSelectorValue?this.wrapperClassValue:"nested-fields"}get insertMode(){return this.hasInsertModeValue?this.insertModeValue:"beforeend"}connect(){this.checkStructure()}add(e){e&&e.preventDefault();const t=this.templateTarget.innerHTML.replace(/NEW_RECORD/g,this.generateID());this.targetTarget.insertAdjacentHTML(this.insertMode,t)}remove(e){e.preventDefault();const t=e.target.closest(this.wrapperClass);if(null==t)throw new Error(`#remove was clicked from outside of a child record. Could not find an ancestor with class ${this.wrapperClass}`);if("true"===t.dataset.newRecord)t.remove();else{t.style.display="none";let e=t.querySelector("input[name*='_destroy']");if(null==e)throw new Error("Could not find a hidden input with name '_destroy'. NestedForm cannot remove an already persisted record without it.");e.value="1"}}generateID(){return(new Date).getTime().toString()+Math.random()}checkStructure(){if(this.templateTarget.innerHTML.indexOf("NEW_RECORD"))throw new Error("Could not find 'NEW_RECORD' in the provided template. Please make sure you've passed `child_index: 'NEW_RECORD'` to `fields_for`")}}F.targets=["target","template"],F.values={insertMode:String,wrapperClass:String};class B extends n{constructor(){super(...arguments),this.boundCheckPasswordsMatch=this.checkPasswordsMatch.bind(this)}connect(){this.passwordTargets.forEach(e=>e.addEventListener("change",this.boundCheckPasswordsMatch))}disconnect(){this.passwordTargets.forEach(e=>e.removeEventListener("change",this.boundCheckPasswordsMatch))}allPasswordsMatch(){let e=new Set(this.passwordTargets.map(e=>e.value));return e.has("")||1==e.size}checkPasswordsMatch(){this.allPasswordsMatch()?(this.element.dispatchEvent(new CustomEvent("password-confirm:match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.remove(this.errorClass))):(this.element.dispatchEvent(new CustomEvent("password-confirm:no-match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.add(this.errorClass)))}}B.targets=["password"],B.classes=["error"];class q extends n{peak(e){e&&e.preventDefault(),this.passwordTarget.type="text"}hide(e){e&&e.preventDefault(),this.passwordTarget.type="password"}toggle(e){e&&e.preventDefault(),"password"===this.passwordTarget.type?this.peak():this.hide()}}q.targets=["password"];class W extends n{constructor(){super(...arguments),this.boundMessageReceived=this.messageReceived.bind(this)}connect(){window.addEventListener("message",this.boundMessageReceived)}disconnect(){window.removeEventListener("message",this.boundMessageReceived)}messageReceived(e){let t=e.data;t.hasOwnProperty("name")&&"iframe-body"===t.name&&t.hasOwnProperty("height")&&this.resize(t.height)}resize(e){this.element.style.height=`${e}px`}}class U extends n{connect(){var e,t,s;window.self!==window.top&&(v(this),t={},null===(s=(e=this).constructor.debounces)||void 0===s||s.forEach(s=>{if("string"==typeof s&&(e[s]=b(e[s],null==t?void 0:t.wait)),"object"==typeof s){const{name:i,wait:n}=s;if(!i)return;e[i]=b(e[i],n||(null==t?void 0:t.wait))}}),this.postUpdate())}windowResize(e){this.postUpdate()}postUpdate(){let e={name:"iframe-body",height:this.getHeight()};window.parent.postMessage(e,"*")}getHeight(){const e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)}}U.debounces=["postUpdate"];class J extends n{cleanupSelf(){this.cleanup(this.element)}cleanup(e){var t,i,n;e.dataset.controller=(null==(t=e.dataset.controller)?void 0:t.replaceAll(new RegExp(`(s|^)${this.identifier}(s|$)`,"g"),""))||"",""==e.dataset.controller&&delete e.dataset.controller;let a=new RegExp(`(s|^)${this.identifier}\\..+?(s|$)`,"g");e.dataset.target=(null==(i=e.dataset.target)?void 0:i.replaceAll(a,""))||"",delete e.dataset[s(`${this.identifier}-target`)],""==e.dataset.target&&delete e.dataset.target,e.dataset.action=(null==(n=e.dataset.target)?void 0:n.replaceAll(a,""))||"",delete e.dataset[s(`${this.identifier}-action`)],""==e.dataset.action&&delete e.dataset.action;let r=this.constructor.values;r&&Object.keys(r).forEach(t=>delete e.dataset[s(`${this.identifier}-${t}-value`)]);let l=this.constructor.classes;l&&Object.keys(l).forEach(t=>delete e.dataset[s(`${this.identifier}-${t}-class`)])}}class Y extends J{connect(){requestAnimationFrame(()=>{R(this.element,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>this.element.scrollIntoView()),this.cleanupSelf()})}}Y.values={behavior:String,block:String,inline:String};class G extends n{scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:z(this.element),null!=t&&R(t,{behavior:"smooth",block:"end"}).catch(()=>t.scrollIntoView(!1))}}G.values={mode:String};class K extends n{scroll(){let e=document.querySelector(this.selectorValue);e?R(e,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>e.scrollIntoView()):console.warn(`Could not find target for '${this.selectorValue}'`)}}K.values={selector:String,behavior:String,block:String,inline:String};class Q extends n{scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:z(this.element),null!=t&&R(t,{behavior:"smooth",block:"start"}).catch(()=>t.scrollIntoView(!1))}}Q.values={mode:String};class X extends n{constructor(){super(...arguments),this.timeout=null}connect(){requestAnimationFrame(()=>{this.timeout=setTimeout(()=>this.element.remove(),1e3*this.secondsValue)})}disconnect(){this.timeout&&clearTimeout(this.timeout)}}X.values={seconds:Number};class Z extends n{constructor(){super(...arguments),this._magicElement=null}get _mode(){return this.hasModeValue?this.modeValue:"top"}createMagicElement(){if(null===this._magicElement)switch(this._magicElement=document.createElement("div"),this._mode){case"top":this.element.insertAdjacentElement("beforebegin",this._magicElement);break;case"bottom":this.element.insertAdjacentElement("afterend",this._magicElement)}}connect(){let e=this.element;this.createMagicElement(),new IntersectionObserver(t=>{t.forEach(t=>{t.target===this._magicElement&&(0===t.intersectionRatio?e.classList.add(this.hasStuckClass?this.stuckClass:"stuck"):1===t.intersectionRatio&&e.classList.remove(this.hasStuckClass?this.stuckClass:"stuck"))})},{threshold:[0,1]}).observe(this._magicElement)}}Z.classes=["stuck"],Z.values={mode:String};class ee extends J{connect(){if(!this.hasInsertValue)throw new Error("`insert` value was not specified");requestAnimationFrame(()=>{this.hasImmediateValue&&this.immediateValue&&this.execute()})}execute(e){e&&e.preventDefault();let t=document.querySelector(this.targetValue);if(null==t)return void this.element.dispatchEvent(new CustomEvent("teleport:error",{bubbles:!0,cancelable:!0}));let s=this.element.cloneNode(!0);switch(this.cleanup(s),this.insertValue){case"beforebegin":case"beforeend":case"afterend":case"afterbegin":t.insertAdjacentHTML(this.insertValue,s.outerHTML);break;case"replaceOuter":t.outerHTML=s.outerHTML;break;case"replaceInner":t.innerHTML=s.outerHTML;break;case"prepend":t.insertAdjacentHTML("afterbegin",s.outerHTML);break;case"append":t.insertAdjacentHTML("beforeend",s.outerHTML);break;default:throw new Error("`insert` value was not specified")}this.element.remove()}}ee.values={target:String,insert:String,immediate:Boolean};class te extends n{connect(){if(!this.hasClassValue)throw new Error("data-toggle-class-class-value must not be empty");(this.hasMouseEnterValue||this.hasMouseLeaveValue)&&((e,t={})=>{new g(this,t)})(),this.hasClickAwayValue&&this.clickAwayValue&&((e,t={})=>{const{onlyVisible:s,dispatchEvent:i,events:n,eventPrefix:a}=Object.assign({},d,t),r=n=>{const r=(null==t?void 0:t.element)||e.element;if(!(r.contains(n.target)||!function(e){const t=e.getBoundingClientRect(),s=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth;return t.top<=s&&t.top+t.height>=0&&t.left<=i&&t.left+t.width>=0}(r)&&s)&&(e.clickOutside&&e.clickOutside(n),i)){const t=o("click:outside",e,a),s=h(t,n,{controller:e});r.dispatchEvent(s)}},l=e.disconnect.bind(e);Object.assign(e,{disconnect(){null==n||n.forEach(e=>{window.removeEventListener(e,r,!1)}),l()}}),null==n||n.forEach(e=>{window.addEventListener(e,r,!1)})})(this),requestAnimationFrame(()=>{this.hasInitialValue&&this.toggleTargets.forEach("on"===this.initialValue?e=>this.elementOn(e):e=>this.elementOff(e))})}clickOutside(){this.toggleTargets.forEach(e=>{this.elementWasToggled(e)&&(this.elementToggleStatus(e),this.elementToggle(e))})}mouseEnter(){if(this.hasMouseEnterValue)switch(this.mouseEnterValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}mouseLeave(){if(this.hasMouseLeaveValue)switch(this.mouseLeaveValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}on(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOn(e)})}off(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOff(e)})}toggle(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementToggle(e)})}elementWasToggled(e){return"true"==e.dataset.toggled}elementToggleStatus(e){this.elementWasToggled(e)?delete e.dataset.toggled:e.dataset.toggled="true"}elementToggle(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t))}elementOn(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!0))}elementOff(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!1))}}te.targets=["toggle"],te.values={class:String,mouseEnter:String,mouseLeave:String,clickAway:Boolean,initial:String};class se extends n{toggle(e){e&&e.preventDefault();let t=this.getFrame().src;null==t||t!==this.getSrc()?this.setSrc():this.clear()}setSrc(e){e&&e.preventDefault();let t=this.getFrame();this.hasLoadingMessageValue&&(t.innerHTML=this.loadingMessageValue),t.src=this.getSrc()}clear(e){e&&e.preventDefault();let t=this.getFrame();t.src="",t.innerHTML=""}getFrame(){let e=document.getElementById(`${this.frameIdValue}`);if(null==e)throw new Error(`Could not find frame with ID '${this.frameIdValue}'`);if("TURBO-FRAME"!=e.nodeName)throw new Error(`Element targeted by ID '${this.frameIdValue}'`);return e}getSrc(){let e=this.element;if(this.hasSrcValue)return this.srcValue;if(y(e))return e.href;throw new Error("No link given to drive frame to")}}se.values={frameId:String,src:String,loadingMessage:String};class ie extends n{constructor(){super(...arguments),this.boundHandler=this.updateWordCount.bind(this)}connect(){this.updateWordCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateWordCount(){let e=0,t=this.inputTarget.value.match(/\S+/g);e=t&&t.length||0,this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}ie.targets=["input","output"],ie.values={min:Number,max:Number},ie.classes=["error"];export{a as AsyncBlockController,r as AutoSubmitFormController,f as AutosizeController,E as CharCountController,w as CheckboxSelectAllController,V as ClipboardController,S as ConfirmController,k as ConfirmNavigationController,L as DebugController,x as DetectDirtyController,I as DisableInputsController,M as DismissableController,H as EmptyDomController,O as EnableInputsController,_ as FallbackImageController,D as FormSaveController,A as LazyBlockController,j as LightboxImageController,P as LimitedSelectionCheckboxesController,F as NestedFormController,B as PasswordConfirmController,q as PasswordPeekController,U as ResponsiveIframeBodyController,W as ResponsiveIframeWrapperController,Y as ScrollIntoFocusController,G as ScrollToBottomController,K as ScrollToController,Q as ScrollToTopController,X as SelfDestructController,Z as StickyController,ee as TeleportController,te as ToggleClassController,se as TurboFrameRCController,ie as WordCountController};
//# sourceMappingURL=stimulus-library.modern.js.map
