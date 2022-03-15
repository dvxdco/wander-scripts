import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const resortMapData = {
    title: 'Resort Map',
    navLabel: 'Locations',
    features: []
}

const resortMapFeatureEls = document.querySelectorAll('.resort-map-feature')
resortMapFeatureEls.forEach((feature) => {
    resortMapData.features.push({
        slug: feature.getAttribute('data-slug'),
        name: feature.getAttribute('data-name'),
        desc: feature.getAttribute('data-desc')
    })
})
console.log('Wander Resort Map Data: ', resortMapData)

ReactDOM.render(
    <React.StrictMode>
        <App data={resortMapData} />
    </React.StrictMode>,
    document.getElementById('wander-resort-map')
);
