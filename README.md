# jqk-Slider by kdydesign.
Simple jQuery Slider by kdydesign.
![Alt Text](https://github.com/kdydesign/jqk-slider/blob/master/src/img/git-demo.png)

# Demo
JSFiddle Demo

<a href="https://jsfiddle.net/kdydesign30/w3pb81qy/" target="_blank"><p align="center"><img src="https://raw.githubusercontent.com/kdydesign/jqk-slider/master/src/img/fiddle_icon.png" style="width:whatever;height:whatever;text-align:center" width="200"></p></a>

# Basic Usage
To add this to your website, simply include the latest jQuery library together with jquery.jqk-slider.js, and jqk-slider.css, and image resources into your document's <head> and create an HTML markup as follows:

```html
<ul id="jqk-slider"></ul>
```

And simply call the script like this:

```javascript
var slider =
        $("#jqk-slider").jqkSlider({
            width: "100%",
            height: 500,
            dottedNav: {
                use: true
            },
            moveNav: {
                use: true
            },
            slideSpeed: 5000,
            effectSpeed: 300,
            items: [
                {
                    title: 'Slider Title-1',
                    img: 'img/demo-img1.jpg'
                },
                {
                    title: 'Slider Title-2',
                    img: 'img/demo-img1.jpg'
                },
                {
                    title: 'Slider Title-3',
                    img: 'img/demo-img1.jpg'
                }
            ]
        });
```

# Public Methods
`jqkSlider` methods could be called with jsGrid `jqkSlider` plugin or directly.
To use `jqkSlider` plugin to call a method, just call `jqkSlider` with method name and required parameters as next arguments:

```javascript
// calling method with jQuery plugin
$("#jqk-slider").jqkSlider("methodName");
```

To call method directly you need to retrieve slider instance or just create slider with the constructor:

```javascript
// retrieve grid instance from element data
var slider = $("#jqk-slider").data("jqkSlider");
```

```javascript
// create slider with the constructor
var slider = new jqkSlider.Slider($("#jqk-slider"), { ... });
```

```javascript
// call method directly
slider.methodName(param1, param2); 
```

You can also trigger the slider to move programmatically as well:

## slideStop
This method allows you to stop the slider.

```javascript
$("#jqk-slider").slideStop();
```
or
```javascript
$("#jqk-slider").jqkSlider('slideStop')
```

## slideStart
This method allows you to start the slider.

```javascript
$("#jqk-slider").slideStart();
```
or
```javascript
$("#jqk-slider").jqkSlider('slideStart')
```

# Version
> Feb 29 2016 (1.0.0)
> Jun 23 2017 (1.1.0.1)



