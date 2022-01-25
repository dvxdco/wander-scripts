import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    render() {
        console.log('Wander Resort Map —', this.props);
        return (
            <div>Loading {this.props.title}...</div>
        )
    }
};

const resortMapData = { items: [] };
const resortMapItemsEl = document.querySelectorAll('.resort-map-item');
resortMapItemsEl.forEach((item) => {
    resortMapData.items.push({
        slug: item.getAttribute('data-slug'),
        name: item.getAttribute('data-name'),
        desc: item.getAttribute('data-desc')
    })
});
console.log('resortMapData ::: ', resortMapData);

ReactDOM.render(
    React.createElement(App, resortMapData, null),
    document.getElementById('react-target')
);