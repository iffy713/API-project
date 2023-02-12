import { useEffect } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsOfSpot } from '../../../store/reviews';
import { getSpotDetails } from '../../../store/spots';
import SpotBookings from '../../Bookings/SpotBookings';
import CreateReviewFormModal from '../../CreateReviewModal'
import ReviewOfSpot from '../../Reviews/ReviewOfSpot';
import './SpotDetails.css'
import TopContainer from './TopContainer/TopContainer';

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
            <TopContainer singleSpot={singleSpot}/>
            {/* <div className='spot_header'>
                <div className='spot_name'>
                    <h1>{singleSpot.name}</h1>
                </div>
                <div id='spot_sub_header'>
                    <span id='sub_header_child1'>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span>{singleSpot.avgStarRating.toFixed(1)} ·</span>
                        <span>{singleSpot.numReviews} reviews</span>
                    </span>
                    <span className='sub_header_dot'>·</span>
                    <span><i class="fa-solid fa-award"></i> Superhost</span>
                    <span className='sub_header_dot'>·</span>
                    <span id='sub_header_address'>
                        {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
                    </span>
                </div>
            </div> */}
            <div className='spot_and_reviews'>
                {/* <div id="spot_images_container">
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
                </div> */}
                <div id='spot_detail_center'>
                    <div className='spot_detail_center_left'>
                        <div style={{'borderBottom': "1px solid gray"}}>
                            <h2>Hosted by {singleSpot.Owner.firstName}</h2>
                        </div>
                        {/* <div>
                            <div className='detail_page_icons_column'>
                                <span className='detail_page_icon_ctn'><i class="fa-solid fa-door-open"></i></span>
                                <span>Self check-in</span>
                            </div>
                            <div className='detail_page_icons_column'>
                                <span className='detail_page_icon_ctn'><i class="fa-solid fa-award"></i></span>
                                <span>{singleSpot.Owner.firstName} is a Superhost</span>
                            </div>
                        </div> */}
                        <div>
                            <DayPickerRangeController />
                        </div>
                    </div>
                    <div className='spot_detail_center_right'>
                        <div className='price_pannel_outer'>
                            <div className='price_pannel_ctn'>

                                <div>
                                    <span id='room_price'>
                                        ${singleSpot.price}
                                    </span>
                                    night
                                </div>
                                <div>
                                    <SpotBookings spotId={spotId}/>
                                </div>
                                    {userId && singleSpot.Owner.id !== userId && (
                                        <CreateReviewFormModal />
                                    )}
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    {/* <ReviewOfSpot spotId={spotId}/> */}
                </div>
{/* ============================================================================ */}
                <div>
                    {/* <SpotBookings spotId={spotId}/> */}
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
