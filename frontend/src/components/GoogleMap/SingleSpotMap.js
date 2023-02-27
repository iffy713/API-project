import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import './SingleSpotMap.css'

export default function SingleSpotMap({singleSpot}){

    console.log(singleSpot)

    //This sets the center of the map. This must be set BEFORE the map loads
    const  [ currentPosition, setCurrentPosition ] = useState({lat:singleSpot.lat, lng:singleSpot.lng})

    // This is the equivalent to a script tag
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
    })

    const containerStyle = {
        width: '100%',
        height: '480px'
    }

    const [ map, setMap ] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        // Important! Always set the container height explicitly
        <div>
            <div>
                <h3>Where you'll be</h3>
                <div>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</div>
            </div>
            <div className='single-spot-map-outer'>
                { isLoaded && <div>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={8}
                        center={currentPosition}
                        onUnmount={onUnmount}
                    >
                    <Marker
                        position={currentPosition}
                        title={singleSpot.name}
                        streetView={false}
                    />
                    </GoogleMap>

                </div>

                }
            </div>

        </div>
    )

}
