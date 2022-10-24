import { useDispatch, useSelector} from "react-redux"
import React, { useState } from "react"
import { createSpotReview } from "../../store/reviews"
// import {  useHistory } from "react-router-dom";


export default function CreateReviewForm(){

    const dispatch = useDispatch()
    // const history = useHistory()

    const [ review, setReview ] = useState('')
    const [ stars, setStars ] = useState(5)
    const [ errors, setErrors ] = useState([])

    const singleSpot = useSelector(state=>state.spot.singleSpot) //object
    const currentUser = useSelector(state=> state.session.user)
    // console.log("singleSpot in create review", singleSpot)
    // console.log("currentUser in create Review=======", currentUser)

    const onSubmit = e => {
        e.preventDefault()
        setErrors([])

        const newReview = {
            review,
            stars
        }



        return dispatch(createSpotReview(newReview, singleSpot.id,currentUser))//.then(history.push(`/spots/${singleSpot.id}`))
            .catch(async(res)=> {
                const data = await res.json()
                console.log("trying to create a review!!!!!!!!!!!",data)

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
                    <select value={stars}
                        onChange={e=> setStars(e.target.value)}
                        id="select_box"
                        >
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                    </select>
                </div>
                <div>
                    <button id="create_review_submit_btn" type="submit">Submit your review</button>
                </div>
            </form>
        </div>
    )
}
