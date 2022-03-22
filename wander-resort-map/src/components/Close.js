import React from 'react'

function Close({onClick}) {
    return (
		<button className="wrm__close" onClick={onClick}>
			<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="22.7071" y1="0.707107" x2="2.70711" y2="20.7071" stroke="#35363B" strokeWidth="1"/>
				<line y1="-1" x2="28.2843" y2="-1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 2 0)" stroke="#35363B" strokeWidth="1"/>
			</svg>
		</button>
    )
}

export default Close
