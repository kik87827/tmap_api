window.addEventListener("DOMContentLoaded",()=>{
  commonInit();
});
window.addEventListener("load",()=>{
  layoutFunc();
});

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/**
 * 레이아웃
 */
function layoutFunc(){
  const header_wrap = document.querySelector(".header_wrap");
  let header_height = 0;
  const footer_wrap = document.querySelector(".footer_wrap");
  let footer_height = 0;
  const middle_wrap = document.querySelector(".middle_wrap");
  const middle_left_item = document.querySelector(".middle_left_item");
  let middle_left_item_pos = 0;
  const btn_topmenu = document.querySelector(".btn_topmenu");
  const btn_header_menu_close = document.querySelector(".btn_header_menu_close");
  const header_menu_dialogue = document.querySelector(".header_menu_dialogue");

  const domHtml = document.querySelector("html");
  const domBody = document.querySelector("body");

  setHeight();

  window.addEventListener("scroll",()=>{
    setLeft();
  })

  window.addEventListener("resize",()=>{
    setHeight();
  })

  if(!!btn_topmenu && !!header_menu_dialogue){
    btn_topmenu.addEventListener("click",(e)=>{
      e.preventDefault();
      gnbOpen();
      // setTimeout(()=>{
      //   header_menu_dialogue.classList.add("motion");
      // },20);
    });
  }

  if(!!btn_header_menu_close){
    btn_header_menu_close.addEventListener("click",(e)=>{
      e.preventDefault();
      gnbClose();
      // setTimeout(()=>{
      //   header_menu_dialogue.classList.remove("active");
      // },320);
    });
  }

  function gnbOpen(){
    domHtml.classList.add("touchDis");
    header_menu_dialogue.classList.add("active");
  }

  function gnbClose(){
    domHtml.classList.remove("touchDis");
    header_menu_dialogue.classList.remove("active");
  }

  function setHeight(){
    if(!middle_wrap){return;}
    header_height = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
    footer_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
    middle_wrap.style.minHeight = `${window.innerHeight - (header_height + footer_height)}px`
  }

  function setLeft(){
    if(!middle_left_item){return;}
    middle_left_item_pos = !!middle_left_item ? middle_left_item.getBoundingClientRect().top : 0;
    if(window.scrollY>middle_left_item_pos){
      middle_left_item.classList.add("sticky");
      middle_left_item.style.top = `${header_height + 30}px`;
    }else{
      middle_left_item.classList.remove("sticky");
      middle_left_item.style.top = `0px`;
    }
  }
}

/**
 * 디자인 모달
 * @param {*} option 
 */
function DesignModal(option) {
  this.title = option.title;
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;
  this.initShow(option);
}
  
DesignModal.prototype.initShow = function (option) {
  var innerPublish = '';
  var objThis = this;
  let confirmPublish = option.type === "confirm" ? `<a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>` : ``;
  /* 
  innerPublish += "<div class='design_modal_wrap'>";
  innerPublish += "  <div class='bg_design_modal'></div>";
  innerPublish += "  <div class='design_modal_w'>";
  innerPublish += "          <div class='design_modal'>";

  innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
  innerPublish += "              <div class='btn_dmsm_wrap'>";
  if (option.type === "confirm") {
    innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
  }
  innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
  innerPublish += "              </div>";
  innerPublish += "          </div>";
  innerPublish += "  </div>";
  innerPublish += "</div>";
 */
  innerPublish = `
  <div class='design_modal_wrap'>
    <div class='design_modal_tb'>
      <div class='design_modal_td'>
        <div class='bg_design_modal'></div>
        <div class='design_modal'>
          <div class='design_modal_cont_w'>
            <div class='design_modal_maintext'></div>
            <div class='design_modal_subtext'></div>
          </div>
          <div class='btn_dmsm_wrap'>
          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmclose'>닫기</a>
          ${confirmPublish}
          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>
          </div>
          <a href='javascript:;' class='btn_modal_close'><span class='hdtext'>닫기</span></a>
        </div>
      </div>
    </div>
  </div>
  `;

  
  this.modalparent = document.createElement('div');
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  this.modalparent.innerHTML = innerPublish;
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.btn_modal_close = document.querySelector(".btn_modal_close");

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_tit = document.querySelector(".design_modal_tit");
    this.design_modal_text = document.querySelector(".design_modal_maintext");
    this.design_modal_subtext = document.querySelector(".design_modal_subtext");
    this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
    this.design_modal_text.innerHTML = option.main_message;
    this.design_modal_subtext.innerHTML = option.sub_message;
    
  }
  if (option.type === "confirm") {
    this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
  }
  if (option.type === "title") {
    this.design_modal_tit.innerHTML = option.title;
  }
  
  this.bindEvent(option);
}
DesignModal.prototype.show = function () {
  this.pagewrap.style.zIndex = 0;
  this.domHtml.classList.add("touchDis");
  
  
  this.design_modal_wrap.classList.add("active");
  setTimeout(()=>{
    this.design_modal_wrap.classList.add("motion");
  }, 30);
}
DesignModal.prototype.hide = function () {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(function () {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
  }, 530);
}
DesignModal.prototype.bindEvent = function (option) {
  var objThis = this;
  let btn_close_item = [this.btn_modal_close, ...this.closetrigger];
  btn_close_item.forEach((element,index)=>{
    element.addEventListener("click", function () {
      objThis.hide();
    }, false);
  })
  if (this.btn_dmsmidentify !== null) {
    this.btn_dmsmidentify.addEventListener("click", function () {
      if (option.identify_callback !== undefined) {
        option.identify_callback();
      }
    }, false);
  }
  if (this.btn_dmsmcancel !== null) {
    this.btn_dmsmcancel.addEventListener("click", function () {
      if (option.cancel_callback !== undefined) {
        option.cancel_callback();
      }
    }, false);
  }
}


/**
 * 디자인 팝업
 * @param {*} option 
 */
function DesignPopup(option) {
  this.option = option;
  this.selector = this.option.selector;

  if (this.selector !== undefined) {
    this.selector = document.querySelector(this.option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.layer_wrap_parent = null;
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;

  const popupGroupCreate = document.createElement("div");
  popupGroupCreate.classList.add("layer_wrap_parent");

  if(!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")){
    this.domBody.append(popupGroupCreate);
  }

  this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");

  

  // console.log(this.selector.querySelectorAll(".close_trigger"));



  this.bindEvent();
}



DesignPopup.prototype.dimCheck = function(){
  const popupActive = document.querySelectorAll(".popup_wrap.active");
  if(!!popupActive[0]){
    popupActive[0].classList.add("active_first");
  }
  if(popupActive.length>1){
    this.layer_wrap_parent.classList.add("has_active_multi");
  }else{
    this.layer_wrap_parent.classList.remove("has_active_multi");
  }
}
DesignPopup.prototype.popupShow = function () {
  var touchstart = "ontouchstart" in window;
  this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
  let animateIng = 0;

  if (this.selector == null) {
    return;
  }
  if(animateIng>1){
    return;
  }
  if(touchstart){
    //this.domBody.setAttribute("data-scr", window.scrollY);
    //this.domBody.style.marginTop = -window.scrollY + "px";
    this.scrollValue = window.scrollY;
    this.domHtml.classList.add("touchDis");
  }
  
  this.selector.classList.add("active");
  if ("beforeCallback" in this.option) {
    this.option.beforeCallback();
  }

  animateIng++;
  setTimeout(() => {
    this.selector.classList.add("motion");
    
    if ("callback" in this.option) {
      this.option.callback();
    }
  }, 400);
  if(!!this.design_popup_wrap_active){
    this.design_popup_wrap_active.forEach((element,index)=>{
      if(this.design_popup_wrap_active !== this.selector){
        element.classList.remove("motion");
        setTimeout(() => {
          element.classList.remove("active");
        },420);
      }
    })
  }
  //animateIng = true;

  this.layer_wrap_parent.append(this.selector);
  

  this.dimCheck();

  // this.layer_wrap_parent

  // ****** 주소 해시 설정 ****** //
  // location.hash = this.selector.id
  // modalCount++
  // modalHash[modalCount] = '#' + this.selector.id
}
DesignPopup.prototype.popupHide = function () {
  var target = this.option.selector;
  var touchstart = "ontouchstart" in window;
  var motionTime = 0;
  if (target !== undefined) {

    this.selector.classList.remove("motion");
    if ("beforeClose" in this.option) {
      this.option.beforeClose();
    }

    if(motionTime){
      clearTimeout(motionTime);
      motionTime = 0;
    }
    motionTime = setTimeout(() => {
      //remove
      this.selector.classList.remove("active");
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      this.dimCheck();
      if ("closeCallback" in this.option) {
        this.option.closeCallback();
      }
      if (this.design_popup_wrap_active.length == 0 && touchstart) {
        this.domHtml.classList.remove("touchDis");
        this.domBody.style.marginTop = 0;
        //window.scrollTo(0, parseInt(this.domBody.getAttribute("data-scr")));
      }
    }, 420);
  }
}

DesignPopup.prototype.bindEvent = function () {
  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger,.btn_closeitem");
  this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
  this.bg_design_popup = this.selector.querySelector(".bg_dim");

  var closeItemArray = [...this.btn_closeTrigger, ...this.btn_close];

  if (this.bg_design_popup !== null) {
    closeItemArray.push(this.bg_design_popup);
  }
  if (closeItemArray.length) {
    closeItemArray.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.popupHide(this.selector);
        // history.back()
        // modalCount--
      }, false);
    });
  }
};


/**
 * cookie
 */
function setCookie(c_name,value,exdays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^\s+|\s+$/g,"");
     if (x==c_name)
     {
       return unescape(y);
     }
   }
}