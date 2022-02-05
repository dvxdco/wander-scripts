import React, { createRef, useRef, useEffect, useState } from 'react'
import { gsap } from "gsap"

const MAP_HEIGHT = 600;
const COLOUR_ACTIVE = "#ff0ff";

function Map(props) {
	const { features } = props
    const containerRef = useRef()
    const mapRef = useRef()
	const elementsRef = useRef(features.map(() => createRef()));
	const [ activeIndex, setActiveIndex ] = useState()

	useEffect(() => {
		panTo(activeIndex)
	}, [activeIndex])

	const panTo = (i) => {
		const el = elementsRef.current[i]?.current
		if (el) {
			gsap.to(mapRef.current, {
				x: "+=1",
				y: "+=1",
				scale: 2,
				duration: 0.5,
				ease: "Power1.linear",
				onUpdate: onUpdate(el)
			})
		}
    }

	const zoomOut = (e) => {
        gsap.to(mapRef.current, {
			x: 0,
			y: 0,
            scale: 1,
            duration: 0.5,
            ease: "Power1.linear"
        })
		setActiveIndex(null)
    }

    const onUpdate = (el) => {
        let rect = el.getBoundingClientRect();
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        let deltaX = centerX - (rect.x + rect.width / 2);
        let deltaY = centerY - (rect.y + rect.height / 2);
      
        return function () {
            gsap.to(mapRef.current, {
                x: "+=" + deltaX,
                y: "+=" + deltaY,
                scale: 1.5,
                duration: gsap.utils.clamp(0, 1, this.duration() - this.time()),
                overwrite: true,
                ease: "Power1.linear"
            })
        }
    }

	const getColour = (index) => {
		return (index === activeIndex) ? "#000" : "#ccc"
	}

    return (
        <div ref={containerRef} className="container" style={{ position: "relative", overflow: 'hidden', border: '1px solid #eee'}}>
			<svg ref={mapRef} className="map" width="100%" height={MAP_HEIGHT}>
				<rect ref={elementsRef.current[0]} id={features[0].slug} onClick={(e) => setActiveIndex(0)} x="0" y="40" width="100" height="100" fill={getColour(0)} />
				<rect ref={elementsRef.current[1]} id={features[1].slug} onClick={(e) => setActiveIndex(1)} x="150" y="100" width="100" height="100" fill={getColour(1)} />
				<rect ref={elementsRef.current[2]} id={features[2].slug} onClick={(e) => setActiveIndex(2)} x="300" y="300" width="100" height="100" fill={getColour(2)} />
				<rect ref={elementsRef.current[3]} id={features[3].slug} onClick={(e) => setActiveIndex(3)} x="450" y="200" width="100" height="100" fill={getColour(3)} />
			</svg>
			<div style={{ position: "absolute", top: 0, right: 0, padding: 15, background: 'white' }}>
				<button onClick={zoomOut}>zoom out</button>
				<ul>
					{
						features.map((feature, index) => {
							return (
								<li key={index} onClick={(e) => setActiveIndex(index)} style={{
									border: `1px solid ${getColour(index)}`,
								}}>
									<h3>{feature.slug}</h3>
								</li>
							)
						})
					}
				</ul>
			</div>
        </div>
    )
}

export default Map