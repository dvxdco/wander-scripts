import React, { useEffect, useState } from 'react'


function Nav({ label, features, activeIndex, setActiveIndex }) {
    return (
		<nav className="wander-resort-map__nav">
			<input id="dropdown" className="toggle" type="checkbox"/>
			<label htmlFor="dropdown" className="nav-label">
				{ label }
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 30 17" fill="none">
					<path d="M1 1.30273L15.3024 15.6051L29.6047 1.30273" stroke="#35363B"/>
				</svg>
			</label>
			<div className="dropdown-content">
				<ul className="dropdown-content-inner" aria-labelledby="dropdownToggle">
					{
						features.map((feature, index) => {
							return (
								<li className={(index === activeIndex ? 'selected' : '')} key={index} onClick={(e) => setActiveIndex(index)}>
									{feature.slug}
								</li>
							)
						})
					}
				</ul>
			</div>
		</nav>
    )
}

export default Nav