import React from 'react'
import Close from './Close'

function Card({ index, active, feature, onClose, onModal }) {
	const { slug, name, desc, link, cta, hero, gallery, videoUrl } = feature; // these are grabbed in index.js from data attributes in html
	
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
						<a href={link} target="_blank">
							{cta}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
							</svg>
						</a>
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