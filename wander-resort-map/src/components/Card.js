import React from 'react'
import Close from './Close'

function Card({ index, active, feature, onClose }) {
	const { slug, name, desc, link, hero, gallery } = feature; // these are grabbed in index.js from data attributes in html

	const onLinkOut = () => {
		document.dispatchEvent(new CustomEvent('eModalShow', { detail: { id: slug, index: index } }))
	}

    return (
		<div className={'wrm__card ' + (active ? 'active' : '')}>
			<Close onClick={onClose} />
			<div className='wrm__card-content'>
				<h3>{name}</h3>
				<p>{desc}</p>
				{
					link && link.length > 0 &&
						<a href={link} target="_blank">{`See More >`}</a>
				}
				{
					gallery == "true" &&
						<>
							{
								hero &&
									<div className="wrm__card-hero">
										<a onClick={onLinkOut}>
											<img src={hero} alt={name}/>
											<span>View</span>
										</a>
									</div>
							}
						</>
				}
				{
					gallery == "false" &&
						hero &&
							<div className="wrm__card-hero">
								<img src={hero} alt={name}/>
								<span>View</span>
							</div>
				}
			</div>
		</div>
    )
}

export default Card
