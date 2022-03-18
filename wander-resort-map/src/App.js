import React, { useState } from 'react'
import './styles.css'
import Map from './components/Map'
import Nav from './components/Nav'
import Card from './components/Card'

function App({ data }) {
    const [ activeIndex, setActiveIndex ] = useState()
    const { title, features, navLabel } = data

    return (
        <div className="wander-resort-map">
            <h2>{title}</h2>
            <div className="wander-resort-map__wrap">
                <Nav label={navLabel}
                    features={features}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
                {
                    features.map((feature, index) => {
                        return (
                            <Card active={(index === activeIndex ? 'active' : '')} feature={feature} key={index} />
                        )
                    })
                }
                <Map 
                    features={features}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </div>
        </div>
    )
}

export default App;
