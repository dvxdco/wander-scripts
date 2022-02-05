import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import './styles.css'

class App extends Component {
    render() {
        const { title, features } = this.props; 
        return (
            <div className="app">
                <h1>{title}</h1>
                <Map features={features} />
                {/* <h3>Data</h3>
                <ul>
                    {
                        features.map((feature, i) => (
                            <li key={i}>
                                <p>{ feature.name }</p>
                                <p>{ feature.slug }</p>
                                <small>{ feature.desc }</small>
                            </li>
                        ))
                    }
                </ul> */}
            </div>
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
console.log('resortMapData: ', resortMapData);

ReactDOM.render(
    React.createElement(App, resortMapData, null),
    document.getElementById('react-target')
);