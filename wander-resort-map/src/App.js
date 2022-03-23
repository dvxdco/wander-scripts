import React, { useState } from 'react'
import './styles.css'
import Map from './components/Map'
import Nav from './components/Nav'
import Card from './components/Card'

function App({ data }) {
    const [ activeIndex, setActiveIndex ] = useState()
    const { title, features, navLabel } = data

    return (
        <div className="wrm">
            <h2 className="wrm__title">{title}</h2>
            <div className="wrm__wrap">
                <Nav label={navLabel}
                    features={features}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
                {
                    features.map((feature, index) => {
                        return (
                            <Card
                                onClose={() => { setActiveIndex(null) }}
                                active={(index === activeIndex ? 'active' : '')} 
                                feature={feature} 
                                key={index} />
                        )
                    })
                }
                <Map 
                    features={features}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </div>
            <p>Lorem ipsum</p>
        </div>
    )
}

export default App;
