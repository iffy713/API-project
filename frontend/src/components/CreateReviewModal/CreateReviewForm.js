import { useDispatch, useSelector} from "react-redux"
import React, { useState } from "react"
import { createSpotReview } from "../../store/reviews"
import StarRating from 'react-star-ratings'

export default function CreateReviewForm({setShowModal}){

    const dispatch = useDispatch()
    // const history = useHistory()

    const [ review, setReview ] = useState('')
    const [ stars, setStars ] = useState(0)
    const [ errors, setErrors ] = useState([])

    const singleSpot = useSelector(state=>state.spot.singleSpot) //object
    const currentUser = useSelector(state=> state.session.user)
    // //console.log("singleSpot in create review", singleSpot)
    // //console.log("currentUser in create Review=======", currentUser)

    const onSubmit = e => {
        e.preventDefault()
        setErrors([])

        const newReview = {
            review,
            stars
        }



        return dispatch(createSpotReview(newReview, singleSpot.id,currentUser)).then(setShowModal(false))//.then(history.push(`/spots/${singleSpot.id}`))
            .catch(async(res)=> {
                const data = await res.json()
                //console.log("trying to create a review!!!!!!!!!!!",data)

                if(data && data.message) setErrors(data.message)
            })
    }

    return (
        <div id="review_create_form_container">
            <form onSubmit={onSubmit} id="create_review_form">
                <h2>How was your stay?...</h2>
                <ul className="error_messages">
                    {errors}
                </ul>
                <div>
                    <textarea
                        className="text_area_box"
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={e=>setReview(e.target.value)}
                        required
                        ></textarea>
                </div>
                <div>
                    <span style={{fontSize: "15px"}}>Stars</span>
                    <StarRating
                        isSelectable={true}
                        rating={stars}
                        changeRating={(rating) => setStars(rating)}
                        numberOfStars={5}
                        starHoverColor="rgb(255, 90, 95)"
                        starRatedColor="rgb(255, 90, 95)"
                        // starEmptyColor="rgb(227, 227, 227)"
                        starDimension='18px'
                        starSpacing='2px'
                    />
                </div>
                <div>
                    <button id="create_review_submit_btn" type="submit">Submit your review</button>
                </div>
            </form>
        </div>
    )
}
