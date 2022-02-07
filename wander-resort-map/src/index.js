import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import './styles.css'

class App extends Component {
    render() {
        const { title, features } = this.props; 
        return (
            <div className="wander-resort-map">
                <h1>{title}</h1>
                <Map features={features} />
            </div>
        )
    }
};

const resortMapData = {
    title: 'Wander The Resort Map',
    features: []
};
const resortMapFeatureEls = document.querySelectorAll('.resort-map-feature')
resortMapFeatureEls.forEach((feature) => {
    resortMapData.features.push({
        slug: feature.getAttribute('data-slug'),
        name: feature.getAttribute('data-name'),
        desc: feature.getAttribute('data-desc')
    })
});
console.log('Wander Resort Map Data: ', resortMapData)

ReactDOM.render(
    React.createElement(App, resortMapData, null),
    document.getElementById('wander-resort-map')
)
