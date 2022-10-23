import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import './SpotCard.css'

export default function SpotCard(){

    const dispatch = useDispatch()
    const allSpotsObj = useSelector(state=>state.spot.allSpots)
    const allSpotsArr = Object.values(allSpotsObj)
    // console.log("***************is this an array?",allSpotsArr)


    useEffect(()=>{
        dispatch(getAllSpots())
    },[dispatch])

    if(!allSpotsArr.length) return null


    return (
        <div className='spot_card_container'>
            <div className="spot_card_outer">
                {allSpotsArr.map(spot => (
                    <div key={spot.id} className='single_card'>
                        <NavLink
                            key={spot.id}
                            to={`/spots/${spot.id}`}
                            className="nav_to_details"
                            >
                            <div className="display_img_container">
                                <img className='spot_img' src={spot.previewImage} alt={`${spot.name}`}/>
                            </div>
                            <div className="location_rate">
                                <span>{spot.city}, {spot.state}</span>
                                <span><i className='fas fa-solid fa-star'/> {spot.avgRating}</span>
                            </div>
                                <div className="spot_price">
                                    <span style={{fontWeight: "bold"}}>${spot.price}<span style={{fontWeight: "normal"}}>night</span></span>
                                </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}
