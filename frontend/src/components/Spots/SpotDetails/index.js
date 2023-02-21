import { useEffect } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsOfSpot } from '../../../store/reviews';
import { getSpotDetails } from '../../../store/spots';
import SpotBookings from '../../Bookings/SpotBookings';
import CreateReviewFormModal from '../../CreateReviewModal'
import ReviewOfSpot from '../../Reviews/ReviewOfSpot';
import BottomContainer from './BottomContainer';
import MiddleContainer from './MiddleContainer';
import './SpotDetails.css'
import TopContainer from './TopContainer';

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
            <MiddleContainer singleSpot={singleSpot} userId={userId} spotId={spotId}/>
            <BottomContainer spotId={spotId}/>
        </div>
    )
}
