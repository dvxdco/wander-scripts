import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    render() {
        const { title, features } = this.props; 
        return (
            <div>Loading {title}...</div>
        )
    }
};

const resortMapData = {
    title: 'Wander The Resort Map',
    features: [] 
};
const resortMapFeatureEls = document.querySelectorAll('.resort-map-feature');
resortMapFeatureEls.forEach((feature) => {
    resortMapData.features.push({
        slug: feature.getAttribute('data-slug'),
        name: feature.getAttribute('data-name'),
        desc: feature.getAttribute('data-desc')
    })
});
console.log('resortMapData ::: ', resortMapData);

ReactDOM.render(
    React.createElement(App, resortMapData, null),
    document.getElementById('react-target')
);