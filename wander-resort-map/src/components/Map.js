import React, { createRef, useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 650
const COLOUR_ACTIVE = '#000'
const COLOUR_INACTIVE = '#FFF'

gsap.registerPlugin(Draggable);

function Map(props) {
	const { features } = props
    const containerRef = useRef()
    const mapRef = useRef()
	const elementsRef = useRef(features.map(() => createRef()));
	const [ activeIndex, setActiveIndex ] = useState()

	useEffect(() => {
		panTo(activeIndex)
	}, [activeIndex])

	useEffect(() => {
		// https://greensock.com/docs/v2/Utilities/Draggable
		Draggable.create(mapRef.current, {
			// bounds: containerRef.current
			bounds: { minX: 100, minY: 100, maxX: -100, maxY: -100 }
		})
		gsap.set(mapRef.current, {
			x: getX()
		})
	}, [])

	const panTo = (i) => {
		const el = elementsRef.current[i]?.current
		if (el) {
			gsap.to(mapRef.current, {
				x: '+=1',
				y: '+=1',
				scale: 2,
				duration: 0.5,
				ease: 'Power1.linear',
				onUpdate: onUpdate(el)
			})
		}
    }

	const zoomOut = (e) => {
        gsap.to(mapRef.current, {
			x: getX(),
			y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'Power1.linear'
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
                x: '+=' + deltaX,
                y: '+=' + deltaY,
                scale: 1.5,
                duration: gsap.utils.clamp(0, 1, this.duration() - this.time()),
                overwrite: true,
                ease: 'Power1.linear'
            })
        }
    }

	const getColour = (index) => {
		return (index === activeIndex) ? COLOUR_ACTIVE : COLOUR_INACTIVE
	}

	const getX = () => {
		return (containerRef.current.offsetWidth>>1) - (MAP_WIDTH>>1)
	}

    return (
        <div ref={containerRef} className="wander-resort-map__container">
			<svg ref={mapRef} className="wander-resort-map__map" width={MAP_WIDTH} height={MAP_HEIGHT}>
				<rect ref={elementsRef.current[0]} id={features[0].slug} onClick={() => setActiveIndex(0)} x="100" y="100" width="100" height="100" fill={getColour(0)} />
				<rect ref={elementsRef.current[1]} id={features[1].slug} onClick={() => setActiveIndex(1)} x="250" y="200" width="100" height="100" fill={getColour(1)} />
				<rect ref={elementsRef.current[2]} id={features[2].slug} onClick={() => setActiveIndex(2)} x="500" y="350" width="100" height="100" fill={getColour(2)} />
				<rect ref={elementsRef.current[3]} id={features[3].slug} onClick={() => setActiveIndex(3)} x="700" y="200" width="100" height="100" fill={getColour(3)} />
				<rect ref={elementsRef.current[4]} id={features[4].slug} onClick={() => setActiveIndex(4)} x="800" y="400" width="100" height="100" fill={getColour(4)} />
			</svg>
			<div className="wander-resort-map__nav">
				<ul>
					{
						features.map((feature, index) => {
							return (
								<li key={index} onClick={(e) => setActiveIndex(index)} style={{
									backgroundColor: (index === activeIndex) ? '#eee' : '#fff'
								}}>
									{feature.slug}
								</li>
							)
						})
					}
					<li>
						<button onClick={zoomOut}>zoom out</button>
					</li>
				</ul>
			</div>
        </div>
    )
}

export default Map