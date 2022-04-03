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
`id="your_id" ref={elementsRef.current[0]} onClick={() => setActiveIndex(0)}`


# Glide Sliders

To add glide sliders to a page:
1. import cdn script in <head>
```
<script src="https://cdn.jsdelivr.net/npm/@glidejs/glide"></script>
``` 
2. add the following snippet to </body>
```
// GLIDE SLIDERS
const sliders = document.querySelectorAll('.glide');
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
sliders.forEach(item => {
  new Glide(item, conf).mount()
});

const glideSlideTextWrap = document.querySelectorAll('.glide__slide-textwrap');
glideSlideTextWrap.forEach((el) => {
	el.classList.add('glide__slide-textwrap--hidden');
});
```
3. Add webflow symbol to page and customize
4. Have fun!