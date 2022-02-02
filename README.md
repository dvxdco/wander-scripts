# wander-scripts
External scripts and styles for `wandertheresort.com`

### NOTE
- 01/26/22: keeping js files in root dir for now until we replace all imports in webflow to dist/[filename].min.js

### embed script example
```
<script src="https://dvxdco.github.io/wander-scripts/dist/wander-resort-map.min.js" type="text/javascript" defer></script>
```

### minify a script to /dist
```
terser --compress --mangle --output dist/footer.min.js -- scripts/footer.js   
```

### minify all styles to /dist
```
css-minify -d styles -o dist
```

## Resort Map
```
npm run start
npm run build
```

### terser
https://www.npmjs.com/package/terser

## css-minify
https://www.npmjs.com/package/css-minify

### install globally
```
npm install terser -g
npm install css-minify -g
```