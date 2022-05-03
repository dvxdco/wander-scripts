# wander-scripts
External scripts and styles for `wandertheresort.com`

#### Notes:
```
- 01/26/22: keeping js files in root dir for now until we replace all imports in webflow to github pages `dist/[filename].min.js` when in development, and jsDeliver for prod
```

Scripts and styles in `/dist` are requested as needed on different Wander pages via CDN `jsDelivr` which handles minification, backup, version fallback.
https://www.jsdelivr.com/?docs=gh 
https://www.jsdelivr.com/github 

### Embed scripts or styles via jsDelivr:
```
<script src="https://cdn.jsdelivr.net/gh/dvxdco/wander-scripts@latest/dist/footer.min.js" type="text/javascript" defer></script>
<link href="https://cdn.jsdelivr.net/gh/dvxdco/wander-scripts@latest/dist/general.min.css" rel="stylesheet">
```

Get script directly from via github pages (but jsDelivr preferred):
```
<script src="https://dvxdco.github.io/wander-scripts/dist/footer.min.js" type="text/javascript" defer></script>
```

### To manually minify script and styles to `/dist`

1. Install globally
```
npm install terser -g
npm install css-minify -g
```

2. Use CLI
```
terser --compress --mangle --output dist/footer.min.js -- scripts/footer.js   
css-minify -d styles -o dist
```

### Terser
https://www.npmjs.com/package/terser

### CSS-minify
https://www.npmjs.com/package/css-minify

---

# Resort Map

The Wander Resort Map (not to be confused with the county map), is a React component. The script targets selector `#wander-resort-map` added in Webflow. 

React project uses webpack
```
// run locally
npm run start
```
Build to `prod`, merge to `main`,
```
// build for prod
npm run build
```

To add a new location, add the following with the appropriate index to the appropriate SVG element 
`id="your_id" ref={elementsRef.current[0]} onClick={() => setActiveId(0)}`


# Glide Sliders

To add glide sliders to a page:
1. import cdn script in <head>
```
<script src="https://cdn.jsdelivr.net/npm/@glidejs/glide"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/css/glide.core.css" integrity="sha512-ShLuspGzRsTiMlQ2Rg0e+atjy/gVQr3oYKnKmQkHQ6sxcnDAEOtOaPz2rRmeygV2CtnwUawDyHkGgH4zUbP3Hw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
``` 
2. Copy and paste existing `glide` symbol and UNLINK to associate with CMS collection.
```
<style>
.glide__controls {
	pointer-events: none;
}
.glide__controls .glide__arrow {
	pointer-events: auto;
}
.glide__bullet .glide__bullet-btn {
	color: #999 !important;
}
.glide__bullet--active .glide__bullet-btn {
	color: black !important;
}
.glide__slide-textwrap {
	opacity: 0;
  transition: opacity 0.3s ease-in;
}
.glide__slide--active .glide__slide-textwrap {
	opacity: 1;
	transition: opacity 0.3s ease-in;
}
</style>
<script>
// GLIDE SLIDERS
const glides = [];
const gliderEls = document.querySelectorAll('.glide');
const conf = {
    type: 'carousel',
    perView: 1,
    perTouch: 1,
    peek: 0,
    focusAt: 0
};
gliderEls.forEach((el, index) => {
    // if using webflow's "multiimage" field, remove its conflicting scripts
    const multiImageScripts = el.getElementsByTagName('script');
    for (let s of multiImageScripts) {
        s.remove();
    };
    const bullets = el.querySelectorAll('.glide__bullet');
    bullets.forEach((bullet, i) => {
        bullet.setAttribute('data-glide-dir', `=${i}`);
    });
    glides[index] = new Glide(el, conf).mount()
});
</script>
```
or version for slider with peeking slides and fading text content
```
<script>
// GLIDE SLIDERS
const glides = [];
const gliderEls = document.querySelectorAll('.glide');
const conf = {
    type: 'carousel',
    perView: 1,
    perTouch: 1,
    peek: 500,
    focusAt: 0,
    breakpoints: {
        1536: { peek: 300 },
        1024: { peek: 250 },
        768: { peek: 200 },
        640: { peek: 50 }
    }
};
gliderEls.forEach((el, index) => {
    // if using webflow's "multiimage" field, remove its conflicting scripts
    const multiImageScripts = el.getElementsByTagName('script');
    for (let s of multiImageScripts) {
        s.remove();
    };

    // init bullet nav
    const bullets = el.querySelectorAll('.glide__bullet');
    bullets.forEach((bullet, i) => {
        bullet.setAttribute('data-glide-dir', `=${i}`);
    });
    glides[index] = new Glide(el, conf).mount()
});
</script>
```
3. add the following snippet to </body> and customize `conf` as desired
4. Have fun!