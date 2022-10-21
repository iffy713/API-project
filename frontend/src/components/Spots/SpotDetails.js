import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsOfSpot } from '../../store/reviews';
import { getSpotDetails } from '../../store/spots';
import CreateReviewFormModal from '../CreateReviewModal'
import ReviewOfSpot from '../Reviews/ReviewOfSpot';

// path: '/spots/:spotId'
export default function SpotDetails(){

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const singleSpot = useSelector(state=>state.spot.singleSpot) //object
    console.log("!!!!!!!!!!!!!!!!!!!singleSpot!!!!!",singleSpot)

    const reviews = useSelector(state=>state.reviews.spot)
    const reviewsArr = Object.values(reviews)

    let userId
    const user = useSelector(state =>state.session.user)
    if(user) {
        userId = user.id
    }

    // const userId = useSelector(state=>state.session.user.id)
    // console.log("!!!!!session", session)
    // console.log("==========userId",userId)

    useEffect(()=>{
        dispatch(getSpotDetails(spotId))
        dispatch(getReviewsOfSpot(spotId))
    },[dispatch,spotId])

    // if(!session) return null

    // let images = []
    if (!singleSpot) return null
    if(!singleSpot.SpotImages || !singleSpot.Owner) return null

    console.log("!!!!!!!!!!", spotId)

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
                {userId && singleSpot.Owner.id !== userId && (
                    <CreateReviewFormModal />
                )}
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
