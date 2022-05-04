import React, { useState } from 'react'
import './styles.css'
import Map from './components/Map'
import Nav from './components/Nav'
import Card from './components/Card'

function App({ data }) {
    const [ activeId, setActiveId ] = useState()
    const { features, navLabel } = data

    return (
        <div className="wrm">
            <div className="wrm__wrap">
                <Nav label={navLabel}
                    features={features}
                    activeId={activeId}
                    setActiveId={setActiveId}
                />
                {
                    features.map((feature, index) => {
                        return (
                            <Card
                                index={index}
                                active={(feature.slug === activeId ? 'active' : '')} 
                                feature={feature}
                                onClose={() => setActiveId(null)}
                                key={index} />
                        )
                    })
                }
                <div className="wrm__map-wrap">
                    <Map 
                        features={features}
                        activeId={activeId}
                        setActiveId={setActiveId}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
