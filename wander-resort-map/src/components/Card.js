import React from 'react'
import Close from './Close'

function Card({ active, feature, onClose }) {
	const { slug, name, desc, hero } = feature; // these are grabbed in index.js from data attributes in html
    return (
		<div className={'wrm__card ' + (active ? 'active' : '')}>
			<div className='wrM__card-content'>
				<Close onClick={onClose} />
				<h3>{name}</h3>
				<p>{desc}</p>
				<img src={hero} alt={name}/>
			</div>
		</div>
    )
}

export default Card
