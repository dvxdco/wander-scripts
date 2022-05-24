import React, { useState } from 'react'
import './styles.css'
import Map from './components/Map'
import Nav from './components/Nav'
import Card from './components/Card'
import Modal from './components/Modal'

function App({ data }) {
    const [ activeId, setActiveId ] = useState()
    const [ isModalOpen, setIsModalOpen ] = useState()
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
                                onModal={() => setIsModalOpen(true)}
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
            {
                isModalOpen &&
                    <Modal features={features} activeId={activeId} onClose={() => {
                        setActiveId(null)
                        setIsModalOpen(false)
                    }}/>
            }
        </div>
    )
}

export default App;
