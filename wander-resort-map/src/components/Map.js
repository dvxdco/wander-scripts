import React, { useRef, useEffect, useState } from 'react'
import { pan, zoom, getScale, setScale, resetScale } from 'svg-pan-zoom-container'

function Map(props) {
    const Container = useRef(null);

    useEffect(() => {
        setScale(Container.current, {
            origin: {
                clientX: 0,
                clientY: 0,
            },
            minScale: 1,
            maxScale: 2,
        });
    }, []);

    return (
        <>
            <div>
                <button onClick={() => {
                    pan(Container.current, 10, 10)
                }}>pan</button>
                <button onClick={() => {
                    zoom(Container.current, 1.5)
                }}>zoom in</button>
                <button onClick={() => {
                    resetScale(Container.current)
                }}>zoom out</button>
            </div>
            <div 
                ref={Container}
                style={{overflow: 'hidden', height: '400px'}}
                data-zoom-on-wheel
                data-pan-on-drag>
                <svg width="100%" height={400}>
                    <g>
                        <rect x="0" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142" />
                        <rect x="200" y="100" width="100" height="200" fill="#0ff" stroke="#0ff" />
                        <rect x="400" y="190" width="100" height="200" fill="#ff0" stroke="#ff0" />
                        <rect x="600" y="100" width="100" height="200" fill="#f0f" stroke="#f0f" />
                    </g>
                </svg>
            </div>
        </>
    )
}

export default Map