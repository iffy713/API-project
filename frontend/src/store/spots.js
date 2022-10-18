// import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails'
const LOAD_SPOTS_CURRENT_USER = 'spots/loadSpotCurrentUser'

const CREATE_SPOT = 'spots/createSpot'
// const EDIT_SPOT = 'spots/editSpot'
// const DELETE_SPOT = 'spots/deleteSpot'

const loadSpots = (spots) =>{
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadSpotDetails = (spot) =>{
    return {
        type: LOAD_SPOT_DETAILS,
        spot
    }
}

const loadSpotsOfCurrentUser = (spots) =>{
    return {
        type: LOAD_SPOTS_CURRENT_USER,
        spots
    }
}


const createSpot = (spot) =>{
    return {
        type: CREATE_SPOT,
        spot
    }
}

// const editSpot = () =>{
//     return {
//         type: EDIT_SPOT
//     }
// }

// const deleteSpot = () =>{
//     return {
//         type: DELETE_SPOT
//     }
// }

export const getAllSpots = () => async (dispatch)=>{
    const res = await fetch('/api/spots')
    const data = await res.json()
    if(res.ok){
        dispatch(loadSpots(data.Spots))
    }
}

export const getSpotDetails = (spotId) => async (dispatch) =>{
    const res = await fetch(`/api/spots/${spotId}`)
    const data = await res.json()
    // console.log("data in thunk==========",data)
    if(res.ok){
        dispatch(loadSpotDetails(data))
    }
}

export const getSpotCurrentUser = () => async (dispatch) =>{
    const res = await fetch(`/api/spots/current`)
    const data = await res.json()
    console.log("spot of current user ==========",data)
    if(res.ok){
        dispatch(loadSpotsOfCurrentUser(data.Spots))
    }
}

export const createNewSpot = data => async (dispatch) => {
    const res = await fetch(`/api/spots/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        const newSpot = await res.json()
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

const spotReducer = (state={}, action) =>{
    const newState = {...state}
    switch (action.type){
        //get all spots
        case LOAD_SPOTS:
            action.spots.forEach(spot=>{
                newState[spot.id] = spot
            })
            return newState

        //get spot by id
        case LOAD_SPOT_DETAILS:
            return {
                ...state,
                [action.spot.id]:{...action.spot}
            }

        //get all spots of current user
        case LOAD_SPOTS_CURRENT_USER:
            const ownerSpots = {...state}
            action.spots.forEach(spot=>{
                ownerSpots[spot.id]= spot
            })
            return ownerSpots

        //create a new spot
        case CREATE_SPOT:
            return {
                ...state,
                [action.spot.id]:{
                    ...state[action.spot.id],
                    spot: [...state[action.spot.id]]
                }
            }

        default:
            return state
    }
}

export default spotReducer;
