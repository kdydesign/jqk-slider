!function(t){var e,i,n,o;t._jqkSlider=function(a,l){var d={width:"100%",height:"100%",dottNav:{use:!0},slideSpeed:5e3,effectSpeed:300,autoCtrlBtn:!0,stateDashIdx:0},s=this;s.options={};var v=t(a),r=v.parent(),q=null;s.init=function(){s.options=t.extend({},d,l),o=parseInt(s.options.slideSpeed),e=null,i=null,n=null,r.parent().css("position","relative")},s.appendDottNavigation=function(n){var o="";t(n).each(function(t,e){o+="<li class='jqk-dott-item'></li>"}),r.append("<div><ul class='jqk-dott-navigation'>"+o+"</ul></div>"),q=t(".jqk-dott-navigation"),t(".jqk-dott-navigation").on("click",".jqk-dott-item",function(o){n.is(":animated")||t(this).hasClass("jqk-dott-item-on")||(clearInterval(e),e=null,i(t(this).index()))})},s.appendMoveNavigation=function(e){r.append("<div class='jqk-move-arrow jqk-move-arrow-left' jqk-move-type='left' jqk-move-bnt></div><div class='jqk-move-arrow jqk-move-arrow-right' jqk-move-type='right' jqk-move-bnt></div>"),r.find("[jqk-move-bnt]").on("click",function(n){var o=t(this).attr("jqk-move-type");if(!e.is(":animated")){var a=v.children("li").length,l=q.children(".jqk-dott-item-on").index(),d=0;"left"==o?d=l>0?--l:a-1:"right"==o&&(d=a-1>l?++l:0),i(d)}})},s.main=function(){var a=v.children("li"),d=a.length,r=s.options.stateDashIdx;v.css("width",s.options.width),v.css("height",s.options.height),v.children("li").css("height","100%"),a.addClass("jqk-slider-child"),s.appendDottNavigation(a),s.appendMoveNavigation(a),s.options.dottNav.use&&0!=s.options.dottNav||t(".jqk-dott-navigation").hide(),s.options.moveNav.use&&0!=s.options.moveNav||t(".jqk-move-arrow").hide(),n=function(e){var i=a.eq(e).attr("jqk-title");t(a.eq(e)).parent().removeClass("jqk-title-parent"),t(".jqk-title-text").remove(),t(a.eq(e)).parent().addClass("jqk-title-parent"),t(a.eq(e)).append("<label class='jqk-title-text'>"+i+"</label>"),a.eq(e).fadeIn(s.options.effectSpeed,function(i){t(".jqk-dott-navigation li").eq(e).addClass("jqk-dott-item-on")})},i=function(l){t(".jqk-dott-navigation li").eq(r).removeClass("jqk-dott-item-on"),t(".jqk-dott-navigation li").eq(r).addClass("jqk-dott-item-off"),l!=r&&a.eq(r).fadeOut(s.options.effectSpeed,function(a){r+=1,r==d&&(r=0),null!=l&&(r=l),n(r),null==e&&(e=setInterval(i,o)),t(".jqk-dott-navigation li").eq(r).removeClass("jqk-dott-item-off"),t(".jqk-dott-navigation li").eq(r).addClass("jqk-dott-item-on")})},a.not(":eq("+l.stateDashIdx+")").hide(),n(0),e=setInterval(i,o)}},t.fn.jqkSlider=function(e){return this.each(function(){var i=new t._jqkSlider(this,e);i.init(),i.main()})},t.fn.slideStop=function(){clearInterval(e),e=null},t.fn.slideStart=function(){e=setInterval(i,o)}}(jQuery);