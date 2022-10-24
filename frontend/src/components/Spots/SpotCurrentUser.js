import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getSpotCurrentUser } from "../../store/spots"
import { deleteSingleSpot } from "../../store/spots"
import './SpotCurrentUser.css'

export default function SpotCurrentUser() {

    // const history = useHistory()
    const dispatch = useDispatch()
    const allSpotsObj = useSelector(state=>state.spot.allSpots)
    const allSpotsArr = Object.values(allSpotsObj)

    console.log("===========", allSpotsArr)
    useEffect(()=>{
        dispatch(getSpotCurrentUser())
    },[dispatch])



    if(!allSpotsArr) return null

    return (
        <div className='my_listing_container'>
            <h2>Manage My Listings</h2>
            <NavLink to='/spots/current/new'>
                <button id="create_spot_btn">
                    Create a New Spot
                </button>
            </NavLink>
            <div id="listed_spots_container">
                {allSpotsArr.map(spot=>(
                    <div key={spot.id}>
                        <div key={spot.id} className='single_card'>
                            <div id="current_user_spot_img_container" className="display_img_container">
                                <img key={spot.id} src={spot.previewImage} alt={spot.name} className='spot_img'/>
                            </div>
                            <div>
                                {spot.name}
                                <span><i className='fas fa-solid fa-star'/>{spot.avgRating}</span>
                            </div>
                            <div>{spot.city},{spot.state}</div>
                            <div>{spot.price} night</div>
                            <div>
                                <NavLink to={`/spots/${spot.id}/update`}>
                                    <button>Update</button>
                                 </NavLink>
                                <button id='delete_btn' onClick={()=>dispatch(deleteSingleSpot(spot.id))}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
