import React, { createRef, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable' // https://greensock.com/docs/v2/Utilities/Draggable

const MAP_WIDTH = 2000 // window.innerWidth
// const MAP_HEIGHT = '100%'
const COLOUR_ACTIVE = '#e2e'
const COLOUR_INACTIVE = '#222'

gsap.registerPlugin(Draggable);

function Map({ features, activeIndex, isNavOpen, setActiveIndex, setIsNavOpen }) {
    const containerRef = useRef()
    const mapRef = useRef()
	const elementsRef = useRef(features.map(() => createRef()));

	useEffect(() => {
		panTo(activeIndex)
	}, [activeIndex])

	useEffect(() => {
		Draggable.create(mapRef.current, {
			// bounds: containerRef.current
			// bounds: { minX: -100, minY: -100, maxX: 100, maxY: 100 }
		})
		
		// center svg in container on first load
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
				scale: 1, // 2
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
                scale: 1, // 1.5
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
        <div ref={containerRef} className="wrm__container">
			<svg ref={mapRef} className="wrm__map" width={MAP_WIDTH}>  
				{/* width={MAP_WIDTH} height={MAP_HEIGHT}> */}
				{/* <image href={mapAsset} width="100%" alt="map" /> */}
				{/* <image href="./map.png" width="100%" alt="map" /> */}
				<rect x="0" y="0" width={MAP_WIDTH} height="1000" fill="#ceffcf" />
				<rect ref={elementsRef.current[0]} id={features[0].slug} onClick={() => setActiveIndex(0)} x="100" y="100" width="100" height="100" fill={getColour(0)} />
				<rect ref={elementsRef.current[1]} id={features[1].slug} onClick={() => setActiveIndex(1)} x="250" y="400" width="100" height="100" fill={getColour(1)} />
				<rect ref={elementsRef.current[2]} id={features[2].slug} onClick={() => setActiveIndex(2)} x="700" y="350" width="100" height="100" fill={getColour(2)} />
				<rect ref={elementsRef.current[3]} id={features[3].slug} onClick={() => setActiveIndex(3)} x="1200" y="800" width="100" height="100" fill={getColour(3)} />
				<rect ref={elementsRef.current[4]} id={features[4].slug} onClick={() => setActiveIndex(4)} x="1400" y="400" width="100" height="100" fill={getColour(4)} />
			</svg>
			{/* <li>
                <button onClick={()=>{}}>zoom out</button>
            </li> */}
        </div>
    )
}

export default Map
