import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewOfUser, getReviewsOfCurrentUser } from "../../store/reviews"
import { useHistory } from "react-router-dom";


export default function UserReviews(){

    const history = useHistory()
    const dispatch = useDispatch()
    const userReviewsObj = useSelector(state=>state.reviews.user)
    console.log("I am here!!!!!",userReviewsObj)
    const userReviewsArr = Object.values(userReviewsObj)
    console.log("is this an array?????????", userReviewsArr)

    useEffect(()=>{
        dispatch(getReviewsOfCurrentUser(userReviewsArr))
    },[dispatch])

    const handleDelete = (reviewId) =>{
        dispatch(deleteReviewOfUser(reviewId))
        history.push('/reviews/current')
    }


    return (
        <div>
            <h1>All My Reviews</h1>
            <div>
                {userReviewsArr.map(review=>(
                    <div key={review.id}>
                    <p key={review.id}>{review.review}</p>
                    <div>
                        <button disabled>Edit</button>
                        <button onClick={()=>handleDelete(review.id)}>Delete</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
