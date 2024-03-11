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
  <link href="https://cdn.jsdelivr.net/gh/XHiddenProjects/MMV@main/src/css/MMV.min.css" rel="stylesheet"  crossorigin="anonymous"/>
  <script src="https://cdn.jsdelivr.net/gh/XHiddenProjects/MMV@main/src/js/MMV.min.js" crossorigin="anonymous"></script>
``` 

### Setup
To start off with loading the viewers you have to make a container for the media are going to place.

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
    <td>zoom(bool||{active:(_bool_), static:(_bool_)}), hover(_bool_), transition(<b>""</b>|<b>"slide"</b>|<b>"curtain"</b>), allowDescription(_bool_), cols</td>
    <td>Loads up 1 or more images in a grid format.</td>
  </tr>
</table>

