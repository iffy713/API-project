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
        // history.push(`/spots/${singleSpot.id}`)

        // console.log("spotId in modal!!!!!!!!!!!",spotId)
        const newReview = {
            review,
            stars
        }

        return dispatch(createSpotReview(newReview, singleSpot.id,currentUser))//.then(history.push(`/spots/${singleSpot.id}`))
            .catch(async(res)=> {
                const data = await res.json()
                // console.log("trying to create a review!!!!!!!!!!!",data)

                if(data && data.statusCode) setErrors(data.message)
            })
    }

    return (
        <div>
            <h2>This is CreateReviewForm component</h2>
            <form onSubmit={onSubmit}>
                <h2>How was your stay?...</h2>
                <ul>
                    {errors.map((error)=> (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <div>
                    <textarea placeholder="Leave your review here..."
                        value={review}
                        onChange={e=>setReview(e.target.value)}
                        required
                        ></textarea>
                </div>
                <div>
                    <select value={stars}
                        onChange={e=> setStars(e.target.value)}
                        >
                        can you see me?
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit your review</button>
                </div>
            </form>
        </div>
    )
}
