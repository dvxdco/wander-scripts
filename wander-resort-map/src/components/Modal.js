import React, { createRef,  useRef, useEffect } from 'react'

import Close from './Close'
import Glide, { Slide } from 'react-glidejs'
import 'react-glidejs/dist/index.css'

function Modal({ features, activeId, isModalOpen, onClose }) {
	const gliderRefs = useRef(features.map(() => createRef()))

	useEffect(() => {
		const index = getFeatureIndex(activeId)
		const ref = gliderRefs.current[index]?.current
		ref.update()
		console.log(activeId, ref)
	}, [isModalOpen])

    const getFeatureIndex = (id) => {
        return features.findIndex(object => {
            return object.slug === id;
        });
    }

    return (
		<div className="wrm__modal">
			<Close onClick={onClose} />			
			{
				features.map((feature, index) => {
					const { slug, slides } = feature
					return (
						<div key={feature.slug} className="wrm__modal-content" style={{ 'display': (activeId == feature.slug) ? 'block' : 'none' }}>
							<Glide
								ref={gliderRefs.current[index]}
								type="carousel"
								perView={1}
								perTouch={1}
								focusAt={0}
								peek={400}
								breakpoints={{
									1536: { peek: 300 },
									1024: { peek: 200 },
									768: { peek: 100 },
									640: { peek: 50 }
								}}
							>
								{
									slides.map((slide, index) => {
										const { src, caption } = slide
										return (
											<div className="glide__slide-content" key={`slide${index}`}>
												<img src={src} />
												<p>{caption}</p>
											</div>
										)
									})
								}
							</Glide>	
						</div>						
					)
				})
			}	
		</div>
    )
}

export default Modal
