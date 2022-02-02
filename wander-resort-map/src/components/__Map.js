import React, { useRef, useEffect, useState } from 'react'
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom'

const TOOL_NONE = "none";
const MAP_HEIGHT = 500;

function Map(props) {
    const Viewer = useRef(null);

    useEffect(() => {
      Viewer.current.fitToViewer();
    }, []);

    const _zoomOnViewerCenter = () => Viewer.current.zoomOnViewerCenter(1.1)
    const _fitSelection = () => Viewer.current.fitSelection(40, 40, 200, 200)
    const _fitToViewer = () => Viewer.current.fitToViewer()

    return (
        <div>
            <button className="btn" onClick={() => _zoomOnViewerCenter()}>Zoom on center</button>
            <button className="btn" onClick={() => _fitSelection()}>Zoom area 200x200</button>
            <button className="btn" onClick={() => _fitToViewer()}>Fit</button>
            <UncontrolledReactSVGPanZoom
                ref={Viewer}
                width={800}
                height={MAP_HEIGHT}
                onZoom={e => console.log('zoom')}
                onPan={e => console.log('pan')}
                onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                // customToolbar={() => <></>}
                // customMiniature={() => <></>}
                // preventPanOutside
            >
            <svg width={800} height={400}>
                <g>
                    <rect x="0" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142" />
                    <rect x="200" y="100" width="100" height="200" fill="#0ff" stroke="#0ff" />
                    <rect x="400" y="190" width="100" height="200" fill="#ff0" stroke="#ff0" />
                    <rect x="600" y="100" width="100" height="200" fill="#f0f" stroke="#f0f" />
                </g>
            </svg>
            </UncontrolledReactSVGPanZoom>
        </div>
    )
}

export default Map