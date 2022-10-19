import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails'
const LOAD_SPOTS_CURRENT_USER = 'spots/loadSpotCurrentUser'

const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'

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

const editSpot = (spot) =>{
    return {
        type: EDIT_SPOT,
        spot
    }
}

const deleteSpot = (spotId) =>{
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const getAllSpots = () => async (dispatch)=>{
    const res = await csrfFetch('/api/spots')
    const data = await res.json()
    if(res.ok){
        dispatch(loadSpots(data.Spots))
    }
}

export const getSpotDetails = (spotId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const data = await res.json()
    // console.log("data in thunk==========",data)
    if(res.ok){
        dispatch(loadSpotDetails(data))
    }
}

export const getSpotCurrentUser = () => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/current`)
    const data = await res.json()
    // console.log("spot of current user ==========",data)
    if(res.ok){
        dispatch(loadSpotsOfCurrentUser(data.Spots))
    }
}

export const createNewSpot = data => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        const newSpot = await res.json()
        console.log('newSpot in thunk=========', newSpot)
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

export const updateSpot = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(spot)
    })
    const data = await res.json()
    if(res.ok) {
        dispatch(editSpot(data))
    }
}

export const deleteSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if(res.ok) {
        dispatch(deleteSpot(spotId))
    }

}

const initialState = {allSpots:{}, singleSpot:{}}
const spotReducer = (state=initialState, action) =>{

    switch (action.type){
        //get all spots
        case LOAD_SPOTS:
            const newState = {}
            action.spots.forEach(spot => (
                newState[spot.id] = spot
            ))
            return {
                ...state,
                allSpots: newState
            }

        //get spot by id
        case LOAD_SPOT_DETAILS:
            return {
                ...state,
                singleSpot: action.spot
            }

        //get all spots of current user
        case LOAD_SPOTS_CURRENT_USER:
            const ownerSpots = {}
            action.spots.forEach(spot=>{
                ownerSpots[spot.id]= spot
            })
            return {
                // ...state,
                allSpots: ownerSpots
            }

        //create a new spot
        case CREATE_SPOT:
            const spotCreated = action.spot
            // return {
            //     ...singleSpot,
            //     [allSpots.spotCreated.id] : spotCreated
            // }
            return {
                ...state,
                    [action.spot.id]:{
                        ...state[action.spot.id],
                        ...action.spot
                    }

            }

        //update a spot
        case EDIT_SPOT: {
            let editedState = {...state}
            editedState.allSpots = {
                ...state.allSpots,
                [action.spot.id]: action.spot
            }
            editedState.singleSpot = {
                ...action.spot,
                ...state.singleSpot
            }
            return editedState
        }

        //delete a spot
        case DELETE_SPOT: {
            let deleteState = {
                ...state
            }
            delete deleteState.allSpots[action.spotId]
            // deleteState.singleSpot = {}
            return deleteState
        }

        default:
            return state
    }
}

export default spotReducer;
