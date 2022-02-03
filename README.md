# wander-scripts
External scripts and styles for `wandertheresort.com`

### Note:
- 01/26/22: keeping js files in root dir for now until we replace all imports in webflow to dist/[filename].min.js

Scripts and styles in `/dist` are requested as needed on different wander pages via CDN `jsDelivr` which handles minification, backup, version fallback, so no need to minify or bundle these files manually.
https://www.jsdelivr.com/?docs=gh
https://www.jsdelivr.com/github

### Embed script via jsDelivr example
```
<script src="https://cdn.jsdelivr.net/gh/dvxdco/wander-scripts@main/dist/footer.min.js" type="text/javascript" defer></script>

// to get script directly from via github pages example (but jsDelivr preferred)
<script src="https://dvxdco.github.io/wander-scripts/dist/footer.min.js" type="text/javascript" defer></script>
```

## Resort Map

React project just uses webpack
```
npm run start
npm run build
```

### To manually minify script and styles to `/dist `

#### 1. Install globally
```
npm install terser -g
npm install css-minify -g
```

#### 2. Use CLI

```
terser --compress --mangle --output dist/footer.min.js -- scripts/footer.js   
css-minify -d styles -o dist
```

### Terser
https://www.npmjs.com/package/terser

## CSS-minify
https://www.npmjs.com/package/css-minify
