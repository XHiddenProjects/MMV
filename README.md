# MMV (Multi-Media Viewer)
MMV, also known as Multi-Media Veiwer, which allow easy and flexable media viewing on your website. This library allows you to configure and maintain in a very short amount of time. This will also make device-friendly look better for any user on any device. This also uses web-interactions with zoom-in-out effect, animation, and more.

### Requirements
* Boostrap
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```
* FontAwesome 6 Pro
 ```html
  <link href="https://cdn.jsdelivr.net/gh/eliyantosarage/font-awesome-pro@main/fontawesome-pro-6.5.1-web/css/all.min.css" rel="stylesheet">
  ```
* CDN link
```html
  <link href="https://cdn.jsdelivr.net/gh/XHiddenProjects/MMV@0.0.3/src/css/MMV.min.css" rel="stylesheet"  crossorigin="anonymous"/>
  <script src="https://cdn.jsdelivr.net/gh/XHiddenProjects/MMV@0.0.3/src/js/MMV.min.js" crossorigin="anonymous"></script>
``` 

### Setup
To setup the library, you would have to follow the steps below... 

**Note: (Some Images, Videos/Audios) can only contain 1 item in it!**

Here is how you set it up
```html
<div class="{class-name}" img-type="{media-format}">
  <!--Media-->
</div>
```
and to load the _MMV_ function
```js
let iv = new MMV('{element_target}');
    iv.init();
```
### Valid Media Format
These are the limited options you can use for `media-format`
<table>
  <tr>
    <th>Type</th>
    <th>Supports</th>
    <th>Configuration</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>gallery</td>
    <td>Images</td>
    <td>
     zoom(<b>bool</b>|{active:(<b>bool</b>), static:(<b>bool</b>)})<br/>
     hover(<b>bool</b>)<br/> 
     transition(<b>""</b>|<b>"slide"</b>|<b>"curtain"</b>)<br/>
     allowDescription(<b>bool</b>)<br/>
     cols(<b>int</b>|<b>"scroll"</b>)<br/>
     Use <em>img-desc</em> to give a description
    </td>
    <td>Loads up 1 or more images in a grid format.</td>
  </tr>
 <tr>
    <td>carousel</td>
    <td>Images</td>
    <td>
     zoom(<b>bool</b>|{active:(<b>bool</b>), static:(<b>bool</b>)})<br/>
     control(<b>""</b>|<b>"auto"</b>|<b>"manual"</b>)<br/> 
     timeout(<b>int</b>)<br/>
     allowDescription(<b>bool</b>)<br/>
     Use <em>img-desc</em> to give a description
    </td>
    <td>Loads up 1 or more images and makes a manual/auto carousel</td>
  </tr>
  <tr>
    <td>stack</td>
    <td>Images</td>
    <td>
     allowDescription(<b>bool</b>)<br/>
     Use <em>img-desc</em> to give a description
    </td>
    <td>Loads up 1 or more images and stacks it up</td>
  </tr>
  <tr>
    <td>lightbox</td>
    <td>Images</td>
    <td>
     allowDescription(<b>bool</b>)<br/>
     Use <em>img-desc</em> to give a description
    </td>
    <td>Loads up 1 or more images and makes a lightbox out of it.</td>
  </tr>
 <tr>
    <td>background</td>
    <td>Images/Videos</td>
    <td>
     multiple(<b>bool</b>)
    </td>
    <td>Loads up 1 or more images/videos and places it in the background</td>
  </tr>
  <tr>
    <td>heroimage</td>
    <td>Image</td>
    <td>
     Use <em>hero-url</em> attribute to load up image URL.
    </td>
    <td>Loads up 1 image and formats the text</td>
  </tr>
  <tr>
    <td>video</td>
    <td>Videos</td>
    <td>
     bar(<b>color</b>)&lt;string&gt;<br/>
     skip(<b>seconds</b>)&lt;int&gt;<br/>
     quality(<b>{quality:quality_url}</b>)&lt;object&gt;<br/>
     subtitles(<b>{items:{lang:caption_url}, template:{size:font_size, bg:hex_color, bg-opacity:(0-1), color:hex_color, color-opacity:(0-1), family:font_family}}</b>)&lt;object&gt;<br/>
    </td>
    <td>Loads up a custom video player.</td>
  </tr>
  <tr>
     <td>audio</td>
     <td>Audio</td>
     <td>
      bar(<b>color</b>)&lt;string&gt;
     </td>
     <td>Load a custom audio player.</td>
   </tr>
</table>

### activating the target
After you initalize the program you would have to run a function that is based on the [img-type](#valid-media-format)
```js
//We will be using "Gallery" type for this example w/ configuration
iv.gallery({
   allowDescription:true, 
   cols:'scroll', 
   zoom:{active:true,static:false}, 
   hover:false
});
//zoom can be "zoom:true/false" or an object format

./*
- Will show description
- grid size is 1 row with scroll
- zoom is active and static is off
- hover affect is off
*/
```
