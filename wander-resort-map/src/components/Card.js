import React from 'react'
import Close from './Close'

function Card({ active, index, feature, onClose }) {
	const { slug, name, desc, hero } = feature; // these are grabbed in index.js from data attributes in html

	const onLinkOut = () => {
		document.dispatchEvent(new CustomEvent('eModalShow', { payload: { index: index } }))
		console.log('eModalShow dispatched', index);
	}

    return (
		<div className={'wrm__card ' + (active ? 'active' : '')}>
			<div className='wrM__card-content'>
				<Close onClick={onClose} />
				<h3>{name}</h3>
				<p>{desc}</p>
				<a onClick={onLinkOut}>See More ></a>
				<a onClick={onLinkOut}>
					<img src={hero} alt={name}/>
				</a>
			</div>
		</div>
    )
}

export default Card
