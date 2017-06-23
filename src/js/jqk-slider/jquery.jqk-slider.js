 /**
 * jquery simple slider plug-in
 *
 * Copyright (c) kdydesign(Dev. DY)
 *   : https://kdydesign.github.io
 *
 * Licensed under MIT license
 *   : https://github.com/kdydesign/jqk-slider/blob/master/LICENSE
 *
 * @version : 1.1.0
 * @since : Feb 29 2016
 * @latest: Jun 23 2017
 */
(function (window, $, undefined) {

    var JQK_SLIDER = "jqkSlider",
        JQK_SLIDER_DATA_KEY = JQK_SLIDER,
        JQK_SLIDER_TOGGLE_KEY = "jqk-toggle";

    function Slider(element, config) {
        var $element = $(element);

        this.container = $element;

        $element.data(JQK_SLIDER_DATA_KEY, this);

        this.init(config);
        this.render();
    }

    Slider.prototype = {
        width: "100%",
        height: "100%",
        dottedNav: {
            use: true
        },
        moveNav: {
            use: true
        },
        slideSpeed: 5000,
        effectSpeed: 300,
        autoCtrlBtn: true,

        itemElements: [],
        dottedItems: [],
        dottedContainer: null,
        items: [],
        leftArrowItem: null,
        rightArrowItem: null,

        wrapperClass: 'jqk-wrapper',
        dottedItemsClass: 'jqk-dotted-item',
        dottedNavClass: 'jqk-dotted-navigation',
        arrowContainerClass: 'jqk-arrow-container',
        arrowClass: 'jqk-move-arrow',
        sliderItemClass: 'jqk-slider-child',
        titleClass: 'jqk-title-text',

        init: function (config) {
            $.extend(this, config);

            this._stateDashIdx = 0;
            this._slideShowInterval = 0;
            this._tempSlideSpeed = this.slideSpeed;

            this.container.parent().css('position', 'relative');
        },
        appendDottedNavigation: function () {
            var self = this,
                container = this.container,
                conParent = container.parent(),
                dottedArr = [];
            var listItem = this.itemElements;

            var dottedNavContainer = this.dottedContainer = $('<ul>').addClass(this.dottedNavClass);

            for (var i = 0; i < listItem.length; i++) {
                var dottedItems =
                    $('<li>')
                        .addClass(this.dottedItemsClass)
                        .off('click')
                        .on('click', function (e) {
                            if ($(this).hasClass(this.dottedItemsClass + '-on')) {
                                return;
                            }

                            self.slideStop();
                            self.changeItem($(this).index());
                        })
                        .appendTo(dottedNavContainer);

                dottedArr.push(dottedItems);
            }

            this.dottedItems = dottedArr;

            $('<div>').append(dottedNavContainer).appendTo(conParent);
        },
        appendArrowNavigation: function () {
            var container = this.container,
                conParent = container.parent();

            var arrowContainer =
                $('<div>').addClass(this.arrowContainerClass);

            this.leftArrowItem =
                $('<div>')
                    .addClass(this.arrowClass)
                    .addClass(this.arrowClass + '-left')
                    .attr('jqk-move-type', 'left')
                    .appendTo(arrowContainer);

            this.rightArrowItem =
                $('<div>')
                    .addClass(this.arrowClass)
                    .addClass(this.arrowClass + '-right')
                    .attr('jqk-move-type', 'right')
                    .appendTo(arrowContainer);

            arrowContainer.appendTo(conParent);

            this.attachArrowEvent();
        },
        attachArrowEvent: function () {
            var self = this,
                container = this.container,
                conParent = container.parent();
            var listItem = this.itemElements,
                listItemLength = listItem.length;

            conParent
                .find('[jqk-move-type]')
                .off('click')
                .on('click', function (e) {
                    var moveType = $(this).attr('jqk-move-type');

                    if (!self.container.children().is(":animated")) {
                        var maxIdx = listItemLength,
                            currIdx = self.dottedContainer.children("[class*=on]").index(),
                            nextIdx = 0;

                        if (moveType === 'left') {
                            if (0 < currIdx) {
                                nextIdx = --currIdx;
                            } else {
                                nextIdx = maxIdx - 1;
                            }
                        } else if (moveType === 'right') {
                            if (maxIdx - 1 > currIdx) {
                                nextIdx = ++currIdx;
                            } else {
                                nextIdx = 0;
                            }
                        }

                        self.changeItem(nextIdx);
                    }
                });
        },
        changeItem: function (getItemIdx) {
            var container = this.container,
                listItem = this.itemElements,
                listItemLength = listItem.length;

            this.dottedItems[this._stateDashIdx]
                .removeClass(this.dottedItemsClass + '-on')
                .addClass(this.dottedItemsClass + '-off');

            if (getItemIdx != this._stateDashIdx) {
                if (container.data(JQK_SLIDER_TOGGLE_KEY)) {
                    return;
                }

                container.data(JQK_SLIDER_TOGGLE_KEY, true);

                $(listItem[this._stateDashIdx])
                    .fadeOut(this.effectSpeed, $.proxy(function () {
                        this._stateDashIdx += 1;

                        if (this._stateDashIdx == listItemLength) {
                            this._stateDashIdx = 0;
                        }

                        if (getItemIdx != null) {
                            this._stateDashIdx = getItemIdx;
                        }

                        this.changedItemRender(this._stateDashIdx);

                        if (this._slideShowInterval == null) {
                            this.slideStart();
                        }

                        this.dottedItems[this._stateDashIdx]
                            .removeClass(this.dottedItemsClass + '-off')
                            .addClass(this.dottedItemsClass + '-on');
                    }, this));
            }
        },
        changedItemRender: function (index) {
            var container = this.container,
                listItem = this.itemElements,
                title = $(listItem[index]).attr("jqk-title");

            $(listItem[index]).find('label').remove();

            $('<label>')
                .addClass(this.titleClass)
                .text(title)
                .appendTo(listItem[index]);

            $(listItem[index]).fadeIn(this.effectSpeed, $.proxy(function () {
                this.dottedItems[index].addClass(this.dottedItemsClass + '-on');
                container.data(JQK_SLIDER_TOGGLE_KEY, false);
            }, this));
        },
        attachNavigations: function () {
            this.appendDottedNavigation();
            this.appendArrowNavigation();
        },
        createItemElements: function () {
            var itemElements = [];

            $.each(this.items, function (idx, obj) {
                var keys = Object.keys(obj);
                var img = $('<img>');
                var listItem = $('<li>');

                $.each(keys, function (idx, key) {
                    switch (key) {
                        case 'title' :
                            listItem.attr('jqk-title', obj[key]);
                            break;
                        case 'img' :
                            img.attr('src', obj[key]).appendTo(listItem);
                            break;
                        default :
                            break;
                    }
                });

                itemElements.push(listItem);
            });

            return $.map(itemElements, function (item) {
                return item;
            });
        },
        render: function () {
            var wrapper = $('<div>').addClass(this.wrapperClass);
            var container = this.container,
                listItem = this.itemElements = this.createItemElements();

            container
                .css('width', this.width)
                .css('height', this.height)
                .wrap(wrapper);

            $.each(listItem, $.proxy(function (idx, value) {
                value
                    .css('height', '100%')
                    .addClass(this.sliderItemClass);

                if (idx !== this._stateDashIdx) {
                    value.css('display', 'none');
                }

                container.prepend(listItem);
            }, this));

            this.attachNavigations();

            if (!this.dottedNav.use || this.dottedNav == false) {
                this.dottedContainer.hide();
            }

            if (!this.moveNav.use || this.moveNav == false) {
                this.arrowContainerClass.hide();
            }

            this.changedItemRender(0);
            this.slideStart();
        },
        slideStop: function () {
            clearInterval(this._slideShowInterval);
            this._slideShowInterval = null;
        },
        slideStart: function () {
            this._slideShowInterval = setInterval($.proxy(this.changeItem, this), this._tempSlideSpeed);
        }

    };

    $.fn.jqkSlider = function (config) {
        var args = $.makeArray(arguments),
            methodArgs = args.slice(1),
            result = this;

        this.each(function () {
            var $element = $(this),
                instance = $element.data(JQK_SLIDER_DATA_KEY),
                methodResult;

            if (instance) {
                if (typeof config === "string") {
                    methodResult = instance[config].apply(instance, methodArgs);
                    if (methodResult !== undefined && methodResult !== instance) {
                        result = methodResult;
                        return false;
                    }
                } else {
                    instance.init(config);
                    instance.render();
                }
            } else {
                new Slider($element, config);
            }
        });

        return result;
    };

    window.jqkSlider = {
        Grid: Slider,
        version: '1.1.0'
    };

}(window, jQuery));
