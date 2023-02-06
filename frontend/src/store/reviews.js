import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = 'reviews/loadUserReviews'
const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews'

const CREATE_REVIEW = 'reviews/create'
const DELETE_REVIEW = 'reviews/delete'

const loadReviewsOfUser = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}

const loadReviewsOfSpot = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}



const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getReviewsOfCurrentUser = ()=> async (dispatch)=>{
    // //console.log("thin is in current reviews thunk!!!!!!!!!!!!")
    const res = await csrfFetch('/api/reviews/current')
    if(res.ok){
        const data = await res.json()
        // //console.log("=====response in thunk~~~~~~~~~~~~~~~~", data.Reviews)
        dispatch(loadReviewsOfUser(data.Reviews))
    }
}

export const getReviewsOfSpot = (spotId)=> async (dispatch)=>{

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok){
        const data = await res.json()
        dispatch(loadReviewsOfSpot(data.Reviews))
    }
}

export const deleteReviewOfUser = (reviewId)=> async (dispatch)=> {
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE'
    })
    if(res.ok) {
        // const data = await res.json()
        dispatch(deleteReview(reviewId))
    }
}

export const createSpotReview = (data, spotId,owner)=> async (dispatch) =>{
    // //console.log(spotId)
    // //console.log("owner in thunk==============",owner)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        const newReview = await res.json()
        // //console.log("============newReview in thunk", newReview)
        newReview.User = owner

        dispatch(createReview(newReview,))
    }
}

const initialState = { spot:{}, user:{} }
const reviewReducer = (state=initialState, action)=>{
    let newState = {}
    switch (action.type){
        case LOAD_USER_REVIEWS:
            action.reviews.forEach(review => (
                newState[review.id] = review
            ))
            return {
                ...state,
                user: newState
            }

        case LOAD_SPOT_REVIEWS:
            action.reviews.forEach(review => (
                newState[review.id] = review
            ))
            return {
                ...state,
                spot: newState
            }

        // *************
        case CREATE_REVIEW:
            newState = {...state}
            // //console.log("=============new review",action.review)
            newState.spot ={
                ...state.spot,
                [action.review.id] : action.review
            }
            return newState

        case DELETE_REVIEW:
            newState = {spot:{},user: {...state.user}}
            // //console.log("review state in reducer!!!!!!!", newState)
            delete newState.user[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewReducer;
