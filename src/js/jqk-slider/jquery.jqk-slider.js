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

    var JQK_SLIDER = 'jqkSlider',
        JQK_SLIDER_DATA_KEY = JQK_SLIDER,
        JQK_SLIDER_TOGGLE_KEY = 'jqk-toggle';

    function Slider(element, config) {
        var $element = $(element);

        this.container = $element;

        $element.data(JQK_SLIDER_DATA_KEY, this);

        this.init(config);
        this.render();
    }

    function handleOptionChange(name, value, context) {
        switch (name) {
            case 'dottedNav':
            case 'arrowNav':
                if (!$.isPlainObject(value)) {
                    context[name].use = value;
                }
                break;
            default:
                context[name] = value;
                break;
        }

        switch (name) {
            case 'width':
            case 'height':
                context.refreshSize();
                break;
            case 'dottedNav':
                context.refreshDottedNav(value);
                break;
            case 'arrowNav':
                context.refreshArrowNav(value);
                break;
            case 'refreshNav':
                context.refreshNavigation(value);
                break;
            default:
                context.render();
                break;
        }
    }

    Slider.prototype = {
        width: '100%',
        height: '100%',
        dottedNav: {
            use: true
        },
        arrowNav: {
            use: true
        },
        slideSpeed: 5000,
        effectSpeed: 300,
        autoCtrlBtn: true,

        wrapper: null,
        itemElements: [],
        dottedItems: [],
        dottedContainer: null,
        items: [],
        arrowContainer: null,
        leftArrowItem: null,
        rightArrowItem: null,

        wrapperClass: 'jqk-wrapper',
        dottedItemsClass: 'jqk-dotted-item',
        dottedNavClass: 'jqk-dotted-navigation',
        dottedContainerClass: 'jqk-dotted-container',
        arrowContainerClass: 'jqk-arrow-container',
        arrowClass: 'jqk-move-arrow',
        sliderItemClass: 'jqk-slider-child',
        titleClass: 'jqk-title-text',

        init: function (config) {
            $.extend(this, config);

            if (typeof this.width == 'number') {
                this.width += 'px';
            }

            if (typeof this.height == 'number') {
                this.height += 'px';
            }

            this._stateDashIdx = 0;
            this._slideShowInterval = 0;
            this._tempSlideSpeed = this.slideSpeed;

            this.container.parent().css('position', 'relative');
        },
        appendDottedNavigation: function () {
            var container = this.container,
                conParent = container.parent(),
                dottedArr = [];
            var listItem = this.itemElements;

            var dottedNavContainer = this.dottedContainer = $('<ul>').addClass(this.dottedNavClass);

            for (var i = 0; i < listItem.length; i++) {
                dottedArr.push(this.createOnceDottedItem());
            }

            this.dottedItems = dottedArr;

            $('<div>')
                .addClass(this.dottedContainerClass)
                .append(dottedNavContainer)
                .appendTo(conParent);
        },
        createOnceDottedItem: function () {
            var self = this;
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
                    .appendTo(this.dottedContainer);

            return dottedItems;
        },
        appendArrowNavigation: function () {
            var container = this.container,
                conParent = container.parent();

            var arrowContainer =
                this.arrowContainer =
                    $('<div>')
                        .css('position', 'absolute')
                        .css('top', '50%')
                        .css('width', this.width)
                        .addClass(this.arrowContainerClass);

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

            conParent
                .find('[jqk-move-type]')
                .off('click')
                .on('click', function (e) {
                    var listItem = self.itemElements,
                        listItemLength = listItem.length;
                    var moveType = $(this).attr('jqk-move-type');

                    if (!self.container.children().is(':animated')) {
                        var maxIdx = listItemLength,
                            currIdx = self.dottedContainer.children('[class*=on]').index(),
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
                title = $(listItem[index]).attr('jqk-title');

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

            $.each(this.items, $.proxy(function (idx, obj) {
                itemElements.push(this.createOnceItemElements(obj, idx));
            }, this));

            return $.map(itemElements, function (item) {
                return item;
            });
        },
        createOnceItemElements: function (item, idx) {
            var keys = Object.keys(item);
            var img = $('<img>');
            var listItem = $('<li>').attr('jqk-item-index', idx);

            $.each(keys, function (idx, key) {
                switch (key) {
                    case 'title' :
                        listItem.attr('jqk-title', item[key]);
                        break;
                    case 'img' :
                        img.attr('src', item[key]).appendTo(listItem);
                        break;
                    default :
                        break;
                }
            });

            listItem
                .css('height', '100%')
                .addClass(this.sliderItemClass)
                .css('display', 'none');

            return listItem;
        },
        render: function () {
            var wrapper =
                $('<div>')
                    .css('width', this.width)
                    .css('height', this.height)
                    .addClass(this.wrapperClass);
            var container = this.container,
                listItem = this.itemElements = this.createItemElements();

            container
                .css('height', '100%')
                .wrap(wrapper);

            this.wrapper = container.parent();

            $.each(listItem, $.proxy(function (idx, value) {
                if (idx !== this._stateDashIdx) {
                    value.css('display', 'none');
                }

                container.prepend(listItem);
            }, this));

            this.attachNavigations();

            if (!this.dottedNav.use || this.dottedNav == false) {
                this.dottedContainer.hide();
            }

            if (!this.arrowNav.use || this.arrowNav == false) {
                this.arrowContainer.hide();
            }

            this.changedItemRender(0);
            this.slideStart();
        },
        option: function (key, value) {
            var optionChangingEventArgs;

            if (arguments.length === 1)
                return this[key];

            optionChangingEventArgs = {
                option: key,
                oldValue: this[key],
                newValue: value
            };

            handleOptionChange(optionChangingEventArgs.option, optionChangingEventArgs.newValue, this);
        },
        refreshSize: function () {
            this.refreshHeight();
            this.refreshWidth();
        },
        refreshNavigation: function (value) {
            this.refreshDottedNav(value);
            this.refreshArrowNav(value);
        },
        refreshHeight: function () {
            var wrapper = this.wrapper;

            wrapper.height(this.height);
        },
        refreshWidth: function () {
            var wrapper = this.wrapper,
                arrowContainer = this.arrowContainer;

            wrapper.width(this.width);
            arrowContainer.width(this.width);
        },
        refreshDottedNav: function (value) {
            if ($.isPlainObject(value)) {
                if (!value.use || value == false) {
                    this.dottedContainer.hide();
                } else {
                    this.dottedContainer.show();
                }
            }
        },
        refreshArrowNav: function (value) {
            if ($.isPlainObject(value)) {
                if (!value.use || value == false) {
                    this.arrowContainer.hide();
                } else {
                    this.arrowContainer.show();
                }
            }
        },
        destroy: function () {
            this.clear();
            this.container.removeData(JQK_SLIDER_DATA_KEY);
        },
        clear: function () {
            this.slideStop();
            this.wrapper.empty().css({width: '', height: ''});
            this.items = [];
            this.itemElements = [];
            this.dottedItems = [];
            this.dottedContainer = null;
            this.arrowContainer = null;
            this.leftArrowItem = null;
            this.rightArrowItem = null;
        },
        slideStop: function () {
            clearInterval(this._slideShowInterval);
            this._slideShowInterval = null;
        },
        slideStart: function () {
            this._slideShowInterval = setInterval($.proxy(this.changeItem, this), this._tempSlideSpeed);
        },
        addSlide: function (item) {
            if ($.isPlainObject(item)) {
                var itemIndex = this.items.length;
                var onceItem = this.createOnceItemElements(item, itemIndex);

                this.items.push(item);
                this.itemElements.push(onceItem);
                this.container.append(onceItem);
                this.dottedItems.push(this.createOnceDottedItem());

                this.attachArrowEvent();
            }
        },
        removeSlide: function (index) {
            var self = this;
            var idx = parseInt(index);

            this.items = $.grep(self.items, function (v, i) {
                return i != idx;
            });

            this.itemElements = $.grep(self.itemElements, function (v, i) {
                return i != idx;
            });

            this.dottedItems = $.grep(self.dottedItems, function (v, i) {
                return i != idx;
            });

            this.container.find('li').eq(index).remove();
            this.dottedContainer.find('li').eq(index).remove();
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
                if (typeof config === 'string') {
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
        Slider: Slider,
        version: '1.1.0'
    };

}(window, jQuery));
