import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = 'reviews/loadUserReviews'
const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews'

// const CREATE_REVIEW = 'reviews/create'
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

// const createReview = () => {
//     return {
//         type: CREATE_REVIEW
//     }
// }



const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getReviewsOfCurrentUser = ()=> async (dispatch)=>{
    // console.log("thin is in current reviews thunk!!!!!!!!!!!!")
    const res = await csrfFetch('/api/reviews/current')
    if(res.ok){
        const data = await res.json()
        // console.log("=====response in thunk~~~~~~~~~~~~~~~~", data.Reviews)
        dispatch(loadReviewsOfUser(data.Reviews))
    }
}

export const getReviewsOfSpot = (spotId)=> async (dispatch)=>{
    console.log("this is in reviews of spot thunk!!!")

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok){
        const data = await res.json()
        console.log("this is revews of spot in thunk!!!!!!!!", data)
        dispatch(loadReviewsOfSpot(data.Reviews))
    }
}

export const deleteReviewOfUser = (reviewId)=> async (dispatch)=> {
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE'
    })
    if(res.ok) {
        const data = await res.json()
        console.log("=======delete review in thunk=======",data)
        dispatch(deleteReview(reviewId))
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

        case DELETE_REVIEW:
            newState = {...state}
            delete newState.user[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewReducer;
