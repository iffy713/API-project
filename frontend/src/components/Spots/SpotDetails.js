import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spots';

// path: '/spots/:spotId'
export default function SpotDetails(){

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const singleSpot = useSelector(state=>state.spot[spotId])

    useEffect(()=>{
        dispatch(getSpotDetails(spotId))
    },[dispatch,spotId])

    if(!singleSpot) return null

    return (
        <div>

            <div>
                <h1>{singleSpot.name}</h1>
                <span>{singleSpot.avgStarRating}</span>
                <span>{singleSpot.city},{singleSpot.state},{singleSpot.country}</span>
            </div>
            <div>
                {singleSpot.SpotImages.map(image=>(
                    <img key={image.id} src={image.url} alt={singleSpot.name}/>
                ))}
            </div>
            <div>
                <h2>Hosted by</h2>
            </div>
        </div>
    )
}
