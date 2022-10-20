import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getReviewsOfSpot } from '../../store/reviews';
import { getSpotDetails } from '../../store/spots';
// import CreateReviewForm from '../Reviews/CreateReviewForm';
import ReviewOfSpot from '../Reviews/ReviewOfSpot';
// path: '/spots/:spotId'
export default function SpotDetails(){

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const singleSpot = useSelector(state=>state.spot.singleSpot)

    const reviews = useSelector(state=>state.reviews.spot)
    const reviewsArr = Object.values(reviews)

    const userId = useSelector(state=>state.session.user.id)

    useEffect(()=>{
        dispatch(getSpotDetails(spotId))
        dispatch(getReviewsOfSpot(spotId))
    },[dispatch,spotId])

    if(!singleSpot) return null

    return (
        <div>
            <h1>====SPOT DETAIL COMPONENT{spotId}====</h1>
            <h1>{singleSpot.name}</h1>
            <div>
                <span>{singleSpot.avgStarRating}</span>
                <span>{singleSpot.city},{singleSpot.state},{singleSpot.country}</span>
            </div>
            <div>
                <span>
                    {singleSpot.price} night
                </span>
                <span>
                    <i className='fas fa-solid fa-star'/>{singleSpot.avgStarRating}
                </span>
                <span>
                    {reviewsArr.length} reviews
                </span>
                <div>
                    {singleSpot.SpotImages.map(image => (
                        <img key={image.id} src={image.url} alt={singleSpot.name}/>
                    ))}
                </div>
                <div>
                    <h2>Hosted by {singleSpot.Owner.firstName}</h2>
                </div>
                <div>
                    <ReviewOfSpot spotId={spotId}/>
                </div>
            </div>
        </div>
        // {singleSpot.Owner.id===userId?<div></div>:
        // <div>
        //     {/* <button>Click to leave a review</button> */}
        //     <NavLink to={'/reviews/new'}>Click to leave a review
        //     </NavLink>
        // </div>
    )
}
