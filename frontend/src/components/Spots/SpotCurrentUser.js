import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotCurrentUser } from "../../store/spots"
import './SpotCurrentUser.css'

export default function SpotCurrentUser() {

    const dispatch = useDispatch()
    const allSpotsObj = useSelector(state=>state.spot)
    const allSpotsArr = Object.values(allSpotsObj)

    // console.log("===========", allSpotsArr)
    useEffect(()=>{
        dispatch(getSpotCurrentUser())
    },[dispatch])

    if(!allSpotsArr) return null

    return (
        <div className='spot_card_container'>
            <h2>All My Spots</h2>
            <button>Create a New Spot</button>
            {allSpotsArr.map(spot=>(
                <div className='single_card'>
                    <img key={spot.id} src={spot.previewImage} alt={spot.name} className='spot_img'/>
                    <div>
                        {spot.name}
                        <span><i className='fas fa-solid fa-star'/>{spot.avgRating}</span>
                    </div>
                    <div>{spot.city},{spot.state}</div>
                </div>
            ))}
        </div>
    )
}
