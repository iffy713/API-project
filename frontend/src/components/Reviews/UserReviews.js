import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewOfUser, getReviewsOfCurrentUser } from "../../store/reviews"
import { useHistory } from "react-router-dom";
import './ReviewOfSpots.css'
import UserSingleReview from "./UserSingleReview";


export default function UserReviews(){

    const history = useHistory()
    const dispatch = useDispatch()
    const userReviewsObj = useSelector(state=>state.reviews.user)
    // //console.log("I am here!!!!!",userReviewsObj)
    const userReviewsArr = Object.values(userReviewsObj)
    // //console.log("is this an array?????????", userReviewsArr)

    useEffect(()=>{
        dispatch(getReviewsOfCurrentUser(userReviewsArr))
    },[dispatch])

    const handleDelete = (reviewId) =>{
        dispatch(deleteReviewOfUser(reviewId))
        history.push('/reviews/current')
    }


    return (
        <div  id='my_reviews_container_outer'>
            <h1>All My Reviews</h1>
            <div id='my_reviews_container'>
                <div>
                    {userReviewsArr.map(review=>(
                        <div key={review.id} id="my_single_review">
                            <UserSingleReview review={review}/>
                        <div id="review_delete_btn_container">
                            <button id="review_delete_btn" onClick={()=>handleDelete(review.id)}>
                                Delete
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
