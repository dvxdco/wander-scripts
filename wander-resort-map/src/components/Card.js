import React from 'react'
import Close from './Close'

function Card({ index, active, feature, onClose, onModal }) {
	const { slug, name, desc, link, hero, gallery, videoUrl } = feature; // these are grabbed in index.js from data attributes in html

    return (
		<div className={'wrm__card' + (active ? ' active' : '')}>
			<Close onClick={onClose} />
			<div className='wrm__card-content'>
				<h3>{name}</h3>
				<p>{desc}</p>
				{
					link && link.length > 0 &&
						<a href={link} target="_blank">{`See More >`}</a>
				}
				{
					videoUrl &&
						<>
						{
							hero &&
								<div className="wrm__card-hero">
									<a onClick={onModal}>
										<img src={hero} alt={name}/>
										<span>360</span>
									</a>
								</div>
						}
					</>
				}				
				{
					!videoUrl && gallery &&
						<>
							{
								hero &&
									<div className="wrm__card-hero">
										<a onClick={onModal}>
											<img src={hero} alt={name}/>
											<span>View</span>
										</a>
									</div>
							}
						</>
				}
				{
					!gallery &&
						hero &&
							<div className="wrm__card-hero">
								<img src={hero} alt={name}/>
							</div>
				}
			</div>
		</div>
    )
}

export default Card
