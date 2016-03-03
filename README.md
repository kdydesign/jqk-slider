#jqk-Slider by kdydesign.
> Simple jQuery Slider by kdydesign

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
        dottNav : {
                use : true
        },
        moveNav : {
	        use : true
	},
        slideSpeed : 5000,              //slide speed(ms)
        effectSpeed : 300,              //show effect speed(ms)
});
```


