import React from 'react'

function Card({ active, feature }) {
	const { slug } = feature;

    return (
		<div className={'wander-resort-map__card ' + (active ? 'active' : '')}>
			<p>{slug}</p>
		</div>
    )
}

export default Card
