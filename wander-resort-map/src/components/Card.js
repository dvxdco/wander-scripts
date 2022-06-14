import React from 'react'
import Close from './Close'

function Card({ index, active, feature, onClose, onModal }) {
	const { slug, name, desc, link, hero, gallery, videoUrl } = feature; // these are grabbed in index.js from data attributes in html
	
	// console.log(slug, videoUrl, gallery, hero);

    return (
		<div className={'wrm__card' + (active ? ' active' : '')}>
			<Close onClick={onClose} />
			<div className='wrm__card-content'>
				<h3>{name}</h3>
				<p>{desc}</p>
				{/* videoUrl: { videoUrl } | gallery: { gallery } | hero: { hero } | { String((gallery === "false")) } */}
				{
					link && link.length > 0 &&
						<a href={link} target="_blank">{`See More >`}</a>
				}
				{
					!videoUrl && gallery == "false" && hero &&
						<div className="wrm__card-hero">
							<img src={hero} alt={name}/>
						</div>
				}
				{
					!videoUrl && gallery == "true" && hero &&
						<>
							{
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
			</div>
		</div>
    )
}

export default Card