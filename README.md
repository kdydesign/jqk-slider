#jqk-Slider by kdydesign.
> Simple jQuery Slider by kdydesign.
![Alt Text](https://github.com/kdydesign/jqk-slider/blob/master/src/img/git-demo.png)

#Demo
> JSFiddle Demo

[<p align="center"><a href="https://jsfiddle.net/kdydesign30/w3pb81qy/" target="_blank"><img src="https://raw.githubusercontent.com/kdydesign/jqk-slider/master/src/img/fiddle_icon.png" style="width:whatever;height:whatever;text-align:center" width="200"></a></p>]

#Basic Usage
>To add this to your website, simply include the latest jQuery library together with jquery.jqk-slider.js, and jqk-slider.css, and image resources into your document's <head> and create an HTML markup as follows:

```
<div class="wrapper">
        <ul id="jqk-slider">
                <li jqk-title="Slider Title - 1">
                        ...
                </li>

                <li jqk-title="Slider Title - 2">
                        ...
                </li>

                <li jqk-title="Slider Title - 3">
                        ...
                </li>
        </ul>
</div>
```

> And simply call the script like this:

```
var slider = $("#jqk-slider").jqkSlider({
        width : "100%",
        height : 500,
        dottedNav : {
                use : true
        },
        moveNav : {
	        use : true
	    },
        slideSpeed : 5000,              //slide speed(ms)
        effectSpeed : 300,              //show effect speed(ms)
});
```

#Public Methods
>You can also trigger the slider to move programmatically as well:

##slideStop
>This method allows you to stop the slider.

```
$("#jqk-slider").slideStop();
```

##slideStart
>This method allows you to start the slider.

```
$("#jqk-slider").slideStart();
```

#Version
>Feb 29 2016 (1.0.0)



