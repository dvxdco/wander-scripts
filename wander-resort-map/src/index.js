import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const resortMapData = {
    navLabel: 'Locations',
    features: []
}

const mapData = document.getElementById('map-data')
const listItems = mapData.querySelectorAll('[role="listitem"]')
listItems.forEach(el => {
    const feature = el.querySelector('.resort-map-feature')
    const slides = el.querySelectorAll('.resort-map-feature-slide')
    if (feature) {
        resortMapData.features.push({
            slug: feature.getAttribute('data-slug').toLowerCase(),
            name: feature.getAttribute('data-name'),
            desc: feature.getAttribute('data-desc'),
            link: feature.getAttribute('data-link') || '',
            hero: feature.getAttribute('data-hero'),
            videoUrl: feature.getAttribute('data-youtube'),
            gallery: feature.getAttribute('data-gallery'),
            slides: Array.from(slides).map((slide) => {
                return {
                    slug: slide.getAttribute('data-slug').toLowerCase(),
                    caption: slide.getAttribute('data-caption'),
                    src: slide.getAttribute('data-src')
                }
            })
        })
    }
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
