import React from 'react'
import Close from './Close'

function Modal({ features, activeId, onClose }) {

    return (
		<div className="wrm__modal">
			<Close onClick={onClose} />
			{
				features.map((feature, index) => {
					const { slug, images } = feature
					return (
						<div className="wrm__modal-content" style={{ 'display': (activeId == feature.slug) ? 'block' : 'none' }}>
						{
							images.map((src, index) => {
								return (
									<img src={src} />
								)
							})
						}	
						</div>						
					)
				})
			}
		</div>
    )
}

export default Modal
