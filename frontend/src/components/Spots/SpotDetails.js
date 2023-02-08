import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsOfSpot } from '../../store/reviews';
import { getSpotDetails } from '../../store/spots';
import SpotBookings from '../Bookings/SpotBookings';
import CreateReviewFormModal from '../CreateReviewModal'
import ReviewOfSpot from '../Reviews/ReviewOfSpot';
import './SpotDetails.css'

// path: '/spots/:spotId'
export default function SpotDetails(){

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const singleSpot = useSelector(state=>state.spot.singleSpot) //object

    const reviews = useSelector(state=>state.reviews.spot)
    const reviewsArr = Object.values(reviews)

    let userId
    const user = useSelector(state =>state.session.user)
    if(user) {
        userId = user.id
    }


    useEffect(()=>{
        dispatch(getSpotDetails(spotId))
        dispatch(getReviewsOfSpot(spotId))

    },[dispatch,spotId])


    if (!singleSpot) return null
    if(!singleSpot.SpotImages || !singleSpot.Owner) return null


    return (
        <div id="spot_details_container">
            <div className='spot_header'>
                <div className='spot_name'>
                    <h2>{singleSpot.name}</h2>
                </div>
                <div className='spot_sub_header'>
                    {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
                </div>
            </div>
            <div className='spot_and_reviews'>
                <div id="spot_images_container">
                    <div className='main_image_container'>
                        <img id='image0' src={singleSpot.SpotImages[0].url} alt={singleSpot.name} />
                    </div>
                    {singleSpot.SpotImages[1] && (
                        <div className='side_images_container'>
                            <div className='other_images_container'>
                                <img id='image1' src={singleSpot.SpotImages[1].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image2' src={singleSpot.SpotImages[2].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image3' src={singleSpot.SpotImages[3].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image4' src={singleSpot.SpotImages[4].url} alt={singleSpot.name}/>
                            </div>
                        </div>
                    )}
                    {/* {singleSpot.SpotImages.map(image => (
                        <img id={'first_image'} key={image.id} src={image.url} alt={singleSpot.name}/>
                    ))} */}
                </div>
                <div className='owner_review'>
                    <div className='owner_name'>
                        <h2>Hosted by {singleSpot.Owner.firstName}</h2>
                        <div>
                            {/* <i className='fas fa-solid fa-star'/>{singleSpot.avgStarRating} */}
                            {reviewsArr.length} reviews
                        </div>
                    </div>
                </div>
                <div className='price_pannel'>
                    <div>
                        <span id='room_price'>
                            ${singleSpot.price}
                        </span>
                        night
                    </div>
                        {userId && singleSpot.Owner.id !== userId && (
                            <CreateReviewFormModal />
                        )}
                </div>

                <div>
                    <ReviewOfSpot spotId={spotId}/>
                </div>
{/* ============================================================================ */}
                <div>
                    <SpotBookings spotId={spotId}/>
                </div>
{/* ============================================================================ */}
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
