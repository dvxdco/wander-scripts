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

ReactDOM.render(
    React.createElement(App, {
        title: 'Wander Resort Map'
    }, null),
    document.getElementById('react-target')
);