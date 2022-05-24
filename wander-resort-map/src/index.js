import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const resortMapData = {
    navLabel: 'Locations',
    features: []
}

const resortMapFeatureEls = document.querySelectorAll('.resort-map-feature')
resortMapFeatureEls.forEach(feature => {
    const images = feature.parentNode.parentNode.getElementsByTagName('img')
    resortMapData.features.push({
        slug: feature.getAttribute('data-slug').toLowerCase(),
        name: feature.getAttribute('data-name'),
        desc: feature.getAttribute('data-desc'),
        link: feature.getAttribute('data-link'),
        hero: feature.getAttribute('data-hero'),
        gallery: feature.getAttribute('data-gallery'),
        images: Array.from(images).map(el => el.src )
    })
})

// sort alphabetically by slug (slug is the key of the object) 
resortMapData.features.sort((a, b) => {
    const aSlug = a.slug.toLowerCase()
    const bSlug = b.slug.toLowerCase()
    if (aSlug < bSlug) return -1
    if (aSlug > bSlug) return 1
    return 0
});
console.log('Wander Resort Map Data: ', resortMapData)

ReactDOM.render(
    <React.StrictMode>
        <App data={resortMapData} />
    </React.StrictMode>,
    document.getElementById('wander-resort-map')
)
