import{Controller as e}from"stimulus";import t from"lodash.camelcase";class s extends e{connect(){this.loadContent()}loadContent(){let e=this.hasReplaceTarget?this.replaceTarget:this.element;fetch(this.endpointValue).then(e=>e.text()).then(t=>{let s=document.createElement("div");s.innerHTML=t,e.replaceWith(s);let n=new CustomEvent("ajax:success",{detail:""});e.dispatchEvent(n)}).catch(t=>{e.replaceWith("Sorry, this content failed to load");let s=new CustomEvent("ajax:error",{detail:""});e.dispatchEvent(s)}).finally(()=>{let t=new CustomEvent("ajax:complete",{detail:""});e.dispatchEvent(t)})}}s.targets=["replace"],s.values={endpoint:String};class n extends e{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.addEventListener("change",this.boundHandler))}disconnect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.removeEventListener("change",this.boundHandler))}handler(e){this.element.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))}}const i=(e,t)=>{const s=e[t];return"function"==typeof s?s:(...e)=>{}},a=(e,t,s)=>{let n=e;return!0===s?n=`${t.identifier}:${e}`:"string"==typeof s&&(n=`${s}:${e}`),n},l=(e,t,s)=>{const{bubbles:n,cancelable:i,composed:a}=t||{bubbles:!0,cancelable:!0,composed:!0};return t&&Object.assign(s,{originalEvent:t}),new CustomEvent(e,{bubbles:n,cancelable:i,composed:a,detail:s})},o={dispatchEvent:!0,eventPrefix:!0},r={events:["click","touchend"],onlyVisible:!0,dispatchEvent:!0,eventPrefix:!0},c={debug:!1,logger:console};class h{constructor(e,t={}){var s,n,i;this.log=(e,t)=>{this.debug&&(this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${e}`,"color: #3B82F6","color: unset"),this.logger.log(Object.assign({controllerId:this.controllerId},t)),this.logger.groupEnd())},this.debug=null!==(n=null!==(s=null==t?void 0:t.debug)&&void 0!==s?s:e.application.stimulusUseDebug)&&void 0!==n?n:c.debug,this.logger=null!==(i=null==t?void 0:t.logger)&&void 0!==i?i:c.logger,this.controller=e,this.controllerId=e.element.id||e.element.dataset.id,this.controllerInitialize=e.initialize.bind(e),this.controllerConnect=e.connect.bind(e),this.controllerDisconnect=e.disconnect.bind(e)}}class d extends h{constructor(e,t={}){super(e,t),this.observe=()=>{this.targetElement.addEventListener("mouseenter",this.onEnter),this.targetElement.addEventListener("mouseleave",this.onLeave)},this.unobserve=()=>{this.targetElement.removeEventListener("mouseenter",this.onEnter),this.targetElement.removeEventListener("mouseleave",this.onLeave)},this.onEnter=()=>{i(this.controller,"mouseEnter").call(this.controller),this.log("mouseEnter",{hover:!0})},this.onLeave=()=>{i(this.controller,"mouseLeave").call(this.controller),this.log("mouseLeave",{hover:!1})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}class u extends h{constructor(e,t={}){super(e,t),this.observe=()=>{try{this.observer.observe(this.targetElement,this.options)}catch(e){this.controller.application.handleError(e,"At a minimum, one of childList, attributes, and/or characterData must be true",{})}},this.unobserve=()=>{this.observer.disconnect()},this.mutation=e=>{i(this.controller,"mutate").call(this.controller,e),this.log("mutate",{entries:e})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.options=t,this.observer=new MutationObserver(this.mutation),this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}const g=e=>{const t=t=>{const{innerWidth:s,innerHeight:n}=window,a={height:n||Infinity,width:s||Infinity,event:t};i(e,"windowResize").call(e,a)},s=e.disconnect.bind(e),n=()=>{window.addEventListener("resize",t),t()},a=()=>{window.removeEventListener("resize",t)};return Object.assign(e,{disconnect(){a(),s()}}),n(),[n,a]},m=(e,t=200)=>{let s=null;return function(){const n=arguments,i=this,a=()=>e.apply(i,n);s&&clearTimeout(s),s=setTimeout(a,t)}};class p extends e{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;e.style.resize="none",e.style.boxSizing="border-box",e.addEventListener("input",this.boundHandler),e.addEventListener("focus",this.boundHandler),g(this),requestAnimationFrame(this.boundHandler)}windowResize(){this.handler()}handler(){this.autosize(this.element)}autosize(e){let t=e.offsetHeight-e.clientHeight;e.style.height="auto",e.style.height=e.scrollHeight+t+"px"}}class b extends e{constructor(){super(...arguments),this.boundHandler=this.updateCharCount.bind(this)}connect(){this.updateCharCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateCharCount(){let e=this.inputTarget.value.length;this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}b.targets=["input","output"],b.values={min:Number,max:Number},b.classes=["error"];class v extends e{constructor(){super(...arguments),this.supported=!1}connect(){this.supported=document.queryCommandSupported("copy"),this.hasRemoveUnusedValue&&this.removeUnusedValue&&(this.supported&&this.hasFallbackTarget?this.fallbackTarget.remove():this.hasCopyTarget&&this.copyTarget.remove())}select(e){e&&e.preventDefault(),this.sourceTarget.select()}copy(e){e&&e.preventDefault(),this.sourceTarget.select(),this.supported&&document.execCommand("copy")}}v.targets=["button","copy","fallback"],v.values={removeUnused:Boolean};class E extends e{connect(){let e=this.messageValue;window.onbeforeunload=()=>null==e||e,window.addEventListener("popstate",this.handlePopstate),window.addEventListener("submit",()=>{window.removeEventListener("popstate",this.handlePopstate),window.onbeforeunload=null})}handlePopstate(e){return!1}}E.values={message:String};class f extends e{connect(){console.log("Debug Controller",this,this.testTargets)}}f.targets=["test"];class w extends e{constructor(){super(...arguments),this.initialValue=null,this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;this.initialValue=this.isInputElement(e)&&this.isCheckable(e)?e.checked:e.value,e.addEventListener("input",this.boundHandler),e.addEventListener("change",this.boundHandler)}disconnect(){let e=this.element;e.removeEventListener("input",this.boundHandler),e.removeEventListener("change",this.boundHandler)}restore(){let e=this.element;this.isInputElement(e)&&this.isCheckable(e)?e.checked=this.initialValue:e.value=this.initialValue}handler(e){let t=this.element;this.initialValue!==t.value?t.setAttribute("data-dirty","true"):t.removeAttribute("data-dirty")}isCheckable(e){return"radio"===e.type||"checkbox"===e.type}isInputElement(e){return"INPUT"===e.tagName}}class T extends e{connect(){this.toggle()}toggle(){this.hasDisablerTarget&&this.disablerTarget.checked?this.disableInputs():this.enableInputs()}disableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!0})}enableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!1})}}T.targets=["disabler","disable"];class V extends e{dismiss(){this.element.remove()}}class y extends e{connect(){((e,t={})=>{new u(this,t)})(0,{element:this.element,childList:!0})}mutate(e){let t;t=this.hasScopeSelectorValue?this.element.querySelectorAll(this.scopeSelectorValue):this.element.children,0===t.length?(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.element.dispatchEvent(new CustomEvent("dom:empty",{bubbles:!0,cancelable:!0}))):(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.element.dispatchEvent(new CustomEvent("dom:not-empty",{bubbles:!0,cancelable:!0})))}}y.classes=["empty","notEmpty"],y.values={scopeSelector:String};class C extends e{connect(){this.toggle()}toggle(){this.hasEnablerTarget&&this.enablerTarget.checked?this.enableInputs():this.disableInputs()}disableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!0})}enableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!1})}}C.targets=["enabler","enable"];class L extends e{connect(){let e=this.element;e.onerror=()=>{this.hasPlaceholderValue?e.src=this.placeholderValue:e.style.display="none"}}}L.values={placeholder:String};class x extends s{connect(){this.options={element:this.element,threshold:.3},"IntersectionObserver"in window?[this.observe,this.unobserve]=((e,t={})=>{const{dispatchEvent:s,eventPrefix:n}=Object.assign({},o,t),r=(null==t?void 0:t.element)||e.element,c=e.disconnect.bind(e),h=new IntersectionObserver(t=>{const[o]=t;o.isIntersecting?(t=>{if(e.isVisible=!0,i(e,"appear").call(e,t),s){const s=a("appear",e,n),i=l(s,null,{controller:e,entry:t});r.dispatchEvent(i)}})(o):e.isVisible&&(t=>{if(e.isVisible=!1,i(e,"disappear").call(e,t),s){const s=a("disappear",e,n),i=l(s,null,{controller:e,entry:t});r.dispatchEvent(i)}})(o)},t),d=()=>{h.observe(r)},u=()=>{h.unobserve(r)};return Object.assign(e,{isVisible:!1,disconnect(){u(),c()}}),d(),[d,u]})(this,this.options):this.loadContent()}appear(e){let t=this.element;""===t.src&&e.target===t&&e.isIntersecting&&(this.loadContent(),this.unobserve&&this.unobserve())}}class k extends e{constructor(){super(...arguments),this.maxSelections=0,this.boundHandleInputs=this.handleInputs.bind(this)}connect(){this.inputTargets.forEach(e=>e.addEventListener("change",this.boundHandleInputs))}disconnect(){this.inputTargets.forEach(e=>e.removeEventListener("change",this.boundHandleInputs))}handleInputs(e){let t=this.inputTargets.reduce((e,t)=>t.checked?e+1:e,0),s=e.target;t>this.maxSelections?(e.preventDefault(),s.checked=!1,s.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!0})),s.dispatchEvent(new CustomEvent("limited-selection:too-many",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=this.messageValue)):(s.dispatchEvent(new CustomEvent("limited-selection:selection",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=""))}}k.targets=["input","error"],k.values={max:Number,message:String};class H extends e{constructor(){super(...arguments),this.boundCheckPasswordsMatch=this.checkPasswordsMatch.bind(this)}connect(){this.passwordTargets.forEach(e=>e.addEventListener("change",this.boundCheckPasswordsMatch))}disconnect(){this.passwordTargets.forEach(e=>e.removeEventListener("change",this.boundCheckPasswordsMatch))}allPasswordsMatch(){let e=new Set(this.passwordTargets.map(e=>e.value));return e.has("")||1==e.size}checkPasswordsMatch(){this.allPasswordsMatch()?(this.element.dispatchEvent(new CustomEvent("password-confirm:match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.remove(this.errorClass))):(this.element.dispatchEvent(new CustomEvent("password-confirm:no-match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.add(this.errorClass)))}}H.targets=["password"],H.classes=["error"];class S extends e{connect(){}peak(e){e&&e.preventDefault(),this.passwordTarget.type="text"}hide(e){e&&e.preventDefault(),this.passwordTarget.type="password"}toggle(e){e&&e.preventDefault(),"password"===this.passwordTarget.type?this.peak():this.hide()}}S.targets=["password"];class I extends e{constructor(){super(...arguments),this.boundMessageReceived=this.messageReceived.bind(this)}connect(){window.addEventListener("message",this.boundMessageReceived)}disconnect(){window.removeEventListener("message",this.boundMessageReceived)}messageReceived(e){let t=e.data;t.hasOwnProperty("name")&&"iframe-body"===t.name&&t.hasOwnProperty("height")&&this.resize(t.height)}resize(e){this.element.style.height=`${e}px`}}class M extends e{connect(){var e,t,s;window.self!==window.top&&(g(this),t={},null===(s=(e=this).constructor.debounces)||void 0===s||s.forEach(s=>{if("string"==typeof s&&(e[s]=m(e[s],null==t?void 0:t.wait)),"object"==typeof s){const{name:n,wait:i}=s;if(!n)return;e[n]=m(e[n],i||(null==t?void 0:t.wait))}}),this.postUpdate())}windowResize(e){this.postUpdate()}postUpdate(){let e={name:"iframe-body",height:this.getHeight()};window.parent.postMessage(e,"*")}getHeight(){const e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)}}M.debounces=["postUpdate"];class O extends e{cleanupSelf(){this.cleanup(this.element)}cleanup(e){var s,n,i;e.dataset.controller=(null==(s=e.dataset.controller)?void 0:s.replaceAll(new RegExp(`(s|^)${this.identifier}(s|$)`,"g"),""))||"",""==e.dataset.controller&&delete e.dataset.controller;let a=new RegExp(`(s|^)${this.identifier}\\..+?(s|$)`,"g");e.dataset.target=(null==(n=e.dataset.target)?void 0:n.replaceAll(a,""))||"",delete e.dataset[t(`${this.identifier}-target`)],""==e.dataset.target&&delete e.dataset.target,e.dataset.action=(null==(i=e.dataset.target)?void 0:i.replaceAll(a,""))||"",delete e.dataset[t(`${this.identifier}-action`)],""==e.dataset.action&&delete e.dataset.action;let l=this.constructor.values;l&&Object.keys(l).forEach(s=>delete e.dataset[t(`${this.identifier}-${s}-value`)]);let o=this.constructor.classes;o&&Object.keys(o).forEach(s=>delete e.dataset[t(`${this.identifier}-${s}-class`)])}}const A="scrollBehavior"in document.documentElement.style;let j;async function P(e,{behavior:t="smooth",block:s="start",inline:n="nearest"}={}){"smooth"!=t||A||await async function(){const{polyfill:e}=await import("smoothscroll-polyfill");j||(j=!0,e())}(),e.scrollIntoView({behavior:t,block:s,inline:n})}function $(e){if(!e)return null;const t=getComputedStyle(e).overflowY;return"visible"!==t&&"hidden"!==t&&e.scrollHeight>=e.clientHeight?e:$(e.parentElement)||document.body}class z extends O{connect(){requestAnimationFrame(()=>{P(this.element,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>this.element.scrollIntoView()),this.cleanupSelf()})}}z.values={behavior:String,block:String,inline:String};class D extends e{connect(){}scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:$(this.element),null!=t&&P(t,{behavior:"smooth",block:"end"}).catch(()=>t.scrollIntoView(!1))}}D.values={mode:String};class R extends e{connect(){}scroll(){let e=document.querySelector(this.selectorValue);e?P(e,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>e.scrollIntoView()):console.warn(`Could not find target for '${this.selectorValue}'`)}}R.values={selector:String,behavior:String,block:String,inline:String};class N extends e{connect(){}scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:$(this.element),null!=t&&P(t,{behavior:"smooth",block:"start"}).catch(()=>t.scrollIntoView(!1))}}N.values={mode:String};class W extends e{constructor(){super(...arguments),this.timeout=null}connect(){requestAnimationFrame(()=>{this.timeout=setTimeout(()=>this.element.remove(),1e3*this.secondsValue)})}disconnect(){this.timeout&&clearTimeout(this.timeout)}}W.values={seconds:Number};class q extends O{connect(){if(!this.hasInsertValue)throw new Error("`insert` value was not specified");requestAnimationFrame(()=>{this.hasImmediateValue&&this.immediateValue&&this.execute()})}execute(e){e&&e.preventDefault();let t=document.querySelector(this.targetValue);if(null==t)return void this.element.dispatchEvent(new CustomEvent("teleport:error",{bubbles:!0,cancelable:!0}));let s=this.element.cloneNode(!0);switch(this.cleanup(s),this.insertValue){case"beforebegin":case"beforeend":case"afterend":case"afterbegin":t.insertAdjacentHTML(this.insertValue,s.outerHTML);break;case"replaceOuter":t.outerHTML=s.outerHTML;break;case"replaceInner":t.innerHTML=s.outerHTML;break;case"prepend":t.insertAdjacentHTML("afterbegin",s.outerHTML);break;case"append":t.insertAdjacentHTML("beforeend",s.outerHTML);break;default:throw new Error("`insert` value was not specified")}this.element.remove()}}q.values={target:String,insert:String,immediate:Boolean};class B extends e{connect(){if(this.toggleTargets.forEach("on"===this.initialValue?e=>this.elementOn(e):e=>this.elementOff(e)),(this.hasMouseEnterValue||this.hasMouseLeaveValue)&&((e,t={})=>{new d(this,t)})(),this.hasClickAwayValue&&this.clickAwayValue&&((e,t={})=>{const{onlyVisible:s,dispatchEvent:n,events:i,eventPrefix:o}=Object.assign({},r,t),c=i=>{const r=(null==t?void 0:t.element)||e.element;if(!(r.contains(i.target)||!function(e){const t=e.getBoundingClientRect(),s=window.innerHeight||document.documentElement.clientHeight,n=window.innerWidth||document.documentElement.clientWidth;return t.top<=s&&t.top+t.height>=0&&t.left<=n&&t.left+t.width>=0}(r)&&s)&&(e.clickOutside&&e.clickOutside(i),n)){const t=a("click:outside",e,o),s=l(t,i,{controller:e});r.dispatchEvent(s)}},h=e.disconnect.bind(e);Object.assign(e,{disconnect(){null==i||i.forEach(e=>{window.removeEventListener(e,c,!1)}),h()}}),null==i||i.forEach(e=>{window.addEventListener(e,c,!1)})})(this),!this.hasClassValue)throw new Error("data-toggle-class-class-value must not be empty")}clickOutside(){this.toggleTargets.forEach(e=>{this.elementWasToggled(e)&&(this.elementToggleStatus(e),this.elementToggle(e))})}mouseEnter(){if(this.hasMouseEnterValue)switch(this.mouseEnterValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}mouseLeave(){if(this.hasMouseLeaveValue)switch(this.mouseLeaveValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}on(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOn(e)})}off(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOff(e)})}toggle(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementToggle(e)})}elementWasToggled(e){return"true"==e.dataset.toggled}elementToggleStatus(e){this.elementWasToggled(e)?delete e.dataset.toggled:e.dataset.toggled="true"}elementToggle(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t))}elementOn(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!0))}elementOff(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!1))}}B.targets=["toggle"],B.values={class:String,mouseEnter:String,mouseLeave:String,clickAway:Boolean,initial:String};class U extends e{constructor(){super(...arguments),this.boundHandler=this.updateWordCount.bind(this)}connect(){this.updateWordCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateWordCount(){let e=0,t=this.inputTarget.value.match(/\S+/g);e=t&&t.length||0,this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}U.targets=["input","output"],U.values={min:Number,max:Number},U.classes=["error"];export{s as AsyncBlockController,n as AutoSubmitFormController,p as AutosizeController,b as CharCountController,v as ClipboardController,E as ConfirmNavigationController,f as DebugController,w as DetectDirtyController,T as DisableInputsController,V as DismissableController,y as EmptyDomController,C as EnableInputsController,L as FallbackImageController,x as LazyBlockController,k as LimitedSelectionCheckboxesController,H as PasswordConfirmController,S as PasswordPeekController,M as ResponsiveIframeBodyController,I as ResponsiveIframeWrapperController,z as ScrollIntoFocusController,D as ScrollToBottomController,R as ScrollToController,N as ScrollToTopController,W as SelfDestructController,q as TeleportController,B as ToggleClassController,U as WordCountController};
//# sourceMappingURL=stimulus-library.modern.js.map
