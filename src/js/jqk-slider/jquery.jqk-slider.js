/**
 * jquery Slider Plug-in
 * jqk-slider.js by kdydesign
 *
 * Copyright (c) 2016 Licensed kdydesign
 *
 * @version : 1.0.0
 * @since : Feb 29 2016
 */
(function($){
	var _slideShowInterval;
	var _changeItem;
	var _initChangeItem;
	var _tempSlideSpeed;

	$._jqkSlider = function(e, options) {
		var defaults = {
				width : "100%",
				height : "100%",
				dottNav : {
					use : true
				},
				slideSpeed : 5000,
				effectSpeed : 300,
				autoCtrlBtn : true,
				stateDashIdx : 0
		};
		
		var $this = this;

		$this.options = {};

		var el = $(e),
			el_p = el.parent(),
			dottElement = null;

		$this.init = function() {
			$this.options = $.extend({}, defaults, options);
			_tempSlideSpeed = parseInt($this.options.slideSpeed);
			_slideShowInterval = null;
		    _changeItem = null;
			_initChangeItem = null;

			el_p.parent().css("position", "relative");
		};

		//도트 네비게이션 추가
		$this.appendDottNavigation = function (listItem) {
			var dottEl = "";

			$(listItem).each(function(list_doot_idx, list_doot_value) {
				dottEl += "<li class='jqk-dott-item'></li>";
			});

			el_p.append("<div><ul class='jqk-dott-navigation'>" + dottEl + "</ul></div>");

			dottElement = $(".jqk-dott-navigation");

			//도트 네비게이션 토글
			$(".jqk-dott-navigation").on("click", ".jqk-dott-item", function(e){
				if ( !listItem.is(":animated") && !$(this).hasClass("jqk-dott-item-on")) {
					clearInterval(_slideShowInterval);
					_slideShowInterval = null;
					_changeItem($(this).index());
				}
			});
		};

		//양옆 네비 추가
		$this.appendMoveNavigation = function (listItem) {
			el_p.append(
				"<div class='jqk-move-arrow jqk-move-arrow-left' jqk-move-type='left' jqk-move-bnt></div>" +
				"<div class='jqk-move-arrow jqk-move-arrow-right' jqk-move-type='right' jqk-move-bnt></div>"
			);

			//left move
			el_p.find("[jqk-move-bnt]").on("click", function(e){
				var moveType = $(this).attr("jqk-move-type");

				if ( !listItem.is(":animated") ) {
					var maxIdx = el.children("li").length;
					var currIdx = dottElement.children(".jqk-dott-item-on").index();
					var nextIdx = 0;

					if ( moveType == "left" ) {
						if (0 < currIdx) {
							nextIdx = --currIdx;
						} else {
							nextIdx = maxIdx - 1;
						}
					} else if ( moveType == "right" ) {
						if (maxIdx - 1 > currIdx) {
							nextIdx = ++currIdx;
						} else {
							nextIdx = 0;
						}
					}

					_changeItem(nextIdx);
				}
			});
		};

		$this.main = function () {
			//FadeOut, In 이펙트
			var listItem = el.children("li");
			var listItemLength = listItem.length;
			var i = $this.options.stateDashIdx;

			//CSS 변경
			el.css("width", $this.options.width);
			el.css("height", $this.options.height);
			el.children("li").css("height", "100%");

			listItem.addClass("jqk-slider-child");

			$this.appendDottNavigation(listItem);
			$this.appendMoveNavigation(listItem);

			//dott Navigation 표현
			if ( !$this.options.dottNav.use || $this.options.dottNav == false ) {
				$(".jqk-dott-navigation").hide();
			}

			//dott Navigation 추가
			if ( !$this.options.moveNav.use || $this.options.moveNav == false ) {
				$(".jqk-move-arrow").hide();
			}

			_initChangeItem = function (eq_value) {
				var title = listItem.eq(eq_value).attr("jqk-title");

				$(listItem.eq(eq_value)).parent().removeClass("jqk-title-parent");
				$(".jqk-title-text").remove();

				$(listItem.eq(eq_value)).parent().addClass("jqk-title-parent");
				$(listItem.eq(eq_value)).append("<label class='jqk-title-text'>" + title + "</label>");

				listItem.eq(eq_value).fadeIn($this.options.effectSpeed, function(e){
					$(".jqk-dott-navigation li").eq(eq_value).addClass("jqk-dott-item-on");
				});
			};

			_changeItem = function(getItemIdx) {
				$(".jqk-dott-navigation li").eq(i).removeClass("jqk-dott-item-on");
				$(".jqk-dott-navigation li").eq(i).addClass("jqk-dott-item-off");

				if ( getItemIdx != i ) {
					listItem.eq(i).fadeOut($this.options.effectSpeed, function(e) {
						i += 1;

						if ( i == listItemLength ) {
							i = 0;
						}

						if ( getItemIdx != null ) {
							i = getItemIdx;
						}

						_initChangeItem(i);

						if ( _slideShowInterval == null ) {
							_slideShowInterval = setInterval(_changeItem, _tempSlideSpeed);
						}

						$(".jqk-dott-navigation li").eq(i).removeClass("jqk-dott-item-off");
						$(".jqk-dott-navigation li").eq(i).addClass("jqk-dott-item-on");
					});
				}
			};

			listItem.not(":eq(" + options.stateDashIdx + ")").hide();

			_initChangeItem(0);

			_slideShowInterval = setInterval(_changeItem, _tempSlideSpeed);
		};
	};

	$.fn.jqkSlider = function(options) {
		return this.each(function(){
			var plugin = new $._jqkSlider(this, options);

			plugin.init();
			plugin.main();
		});
	};
	
	//슬라이드 정지
	$.fn.slideStop = function() {
		clearInterval(_slideShowInterval);
	    _slideShowInterval = null;
	};

	//슬라이드 실행
	$.fn.slideStart = function() {
		_slideShowInterval = setInterval(_changeItem, _tempSlideSpeed);
	};
})(jQuery);