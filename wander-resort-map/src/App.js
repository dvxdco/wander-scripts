import React, { useState } from 'react'
import './styles.css'
import Map from './components/Map'
import Nav from './components/Nav'
import Card from './components/Card'

const START_ON_FEATURE_ID = 'clubhouse';

function App({ data }) {
    const [ activeId, setActiveId ] = useState(START_ON_FEATURE_ID)
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
                                onClose={() => setActiveId(null)}
                                active={(feature.slug === activeId ? 'active' : '')} 
                                feature={feature} 
                                key={index} />
                        )
                    })
                }
                <Map 
                    features={features}
                    activeId={activeId}
                    setActiveId={setActiveId}
                />
            </div>
        </div>
    )
}

export default App;
