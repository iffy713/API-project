import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviewsOfSpot } from "../../store/reviews"

export default function ReviewOfSpot({spotId}) {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state=>state.reviews.spot)
    const reviewsArr = Object.values(reviewsObj)

    useEffect(()=>{
        dispatch(getReviewsOfSpot(spotId))
        setLoaded(true)
    }, [dispatch,spotId])

    const [loaded, setLoaded] = useState(false)

    // console.log("reviews OBJ================", reviewsObj)
    // console.log('reviews array=============', reviewsArr)

    if(!loaded) return null

    return (
        <div>
            <h1>====This is Review Of Spot Component====</h1>
            {/* <div>Reviews</div> */}
            {reviewsArr.map(review=> (
                <div key={review.id}>
                    <span key={review.id}>
                        <h3>{review.User.firstName} review owner</h3>
                        <h5>{review.createdAt}</h5>
                    </span>
                    <span>
                        <p key={review.id}>{review.review}</p>
                    </span>
                </div>
            ))}


        </div>
    )
}
