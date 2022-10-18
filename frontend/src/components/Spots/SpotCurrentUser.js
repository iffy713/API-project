import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getSpotCurrentUser } from "../../store/spots"
import { deleteSingleSpot } from "../../store/spots"
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
            <NavLink to='/spots/current/new'>Create a New Spot</NavLink>
            {allSpotsArr.map(spot=>(
                <div>
                    <div className='single_card'>
                        <img key={spot.id} src={spot.previewImage} alt={spot.name} className='spot_img'/>
                        <div>
                            {spot.name}
                            <span><i className='fas fa-solid fa-star'/>{spot.avgRating}</span>
                        </div>
                        <div>{spot.city},{spot.state}</div>
                        <div>{spot.price} night</div>
                    </div>
                    <div>
                        <NavLink to={`/spots/${spot.id}/update`}>
                            <button>Update</button>
                        </NavLink>
                        <button onClick={()=>dispatch(deleteSingleSpot(spot.id))}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
