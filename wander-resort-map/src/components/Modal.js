import React, { createRef,  useRef, useEffect } from 'react'

import Close from './Close'
import Glide, { Slide } from 'react-glidejs'
import 'react-glidejs/dist/index.css'
import useLockBodyScroll from './../useLockBodyScroll';

function Modal({ features, activeId, isModalOpen, onClose }) {
	const gliderRefs = useRef(features.map(() => createRef()))
	
	useLockBodyScroll();

	useEffect(() => {
		const index = getFeatureIndex(activeId)
		const ref = gliderRefs.current[index]?.current
		if (ref) ref.update()
	}, [isModalOpen])

    const getFeatureIndex = (id) => {
        return features.findIndex(object => {
            return object.slug === id;
        });
    }

    return (
		<div className="wrm__modal">
			<Close onClick={onClose} size={24} />
			{			
				features.map((feature, index) => {
					const { slides, videoUrl } = feature
					return (
						<div key={feature.slug} className="wrm__modal-content" style={{ 'display': (activeId == feature.slug) ? 'flex' : 'none' }}>
							{
								!videoUrl &&
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
							}	
							{
								videoUrl &&								
									<div className="video-responsive">
										<iframe
											width="853"
											height="480"
											src={`${videoUrl}?enablejsapi=1`}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											title="Embedded youtube"
											allowFullScreen
										/>
									</div>
							}
						</div>				
					)
				})
			}	
		</div>
    )
}

export default Modal
