import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails'
const LOAD_SPOTS_CURRENT_USER = 'spots/loadSpotCurrentUser'

const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'

const ADD_IMAGE = 'spots/addImage'

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

const addImage = (img, spot) =>{
    return {
        type: ADD_IMAGE,
        img,
        spot
    }
}

export const getAllSpots = () => async (dispatch)=>{
    const res = await csrfFetch('/api/spots')
    const data = await res.json()
    console.log("data in thunkkkkkkkkkkkkkkkkk", data)
    if(res.ok){
        dispatch(loadSpots(data.Spots))
    }
}
    //==========thunk=============
export const getSpotDetails = (spotId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const data = await res.json()
        console.log("!!!!!!!!!data in thunk==========",data)
        dispatch(loadSpotDetails(data))
    }
}

export const getSpotCurrentUser = () => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/current`)
    if(res.ok){
        const data = await res.json()
        // console.log("spot of current user ==========",data)
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

    const { imageUrl } = data
    if(res.ok){
        const newSpot = await res.json()
        console.log('newSpot in thunk=========', newSpot)
        dispatch(createSpot(newSpot))

        //add Spot Image Url
        const resImg = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: imageUrl,
                preview: true
            })
        })
        if(resImg.ok){
            const dataImg = await resImg.json()
            console.log(".......imgUrl in thunk", dataImg)
            dispatch(addImage(dataImg, newSpot))
            return newSpot
        }
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
    if(res.ok) {
        const data = await res.json()
        dispatch(editSpot(data))
        return data
    }
}

export const deleteSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if(res.ok) {
        console.log("deleted data in thunk!!!!!!!!",res.json())
        dispatch(deleteSpot(spotId))
    }
}

const initialState = {allSpots:{}, singleSpot:{}}
const spotReducer = (state=initialState, action) =>{
    let newState
    switch (action.type){
        //get all spots
        case LOAD_SPOTS:
            newState = {allSpots:{}, singleSpot:{}}
            action.spots.forEach(spot => (
                newState.allSpots[spot.id] = {...spot}
            ))
            return newState

        //get spot by id
        case LOAD_SPOT_DETAILS:
            newState = {allSpots:{}, singleSpot:{}}
            newState.singleSpot = action.spot
            return newState

        //get all spots of current user
        case LOAD_SPOTS_CURRENT_USER:
            const ownerSpots = {}
            action.spots.forEach(spot=>{
                ownerSpots[spot.id]= spot
            })
            return {
                ...state,
                allSpots: ownerSpots,
                singleSpot: {}
            }

        //create a new spot
        case CREATE_SPOT:
            return {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    ...action.spot
                },
                singleSpot: {
                    // ...action.spot
                }
            }

        //update a spot
        case EDIT_SPOT: {
            let newState = {...state}
            newState.allSpots = {
                ...state.allSpots,
                [action.spot.id]: action.spot
            }
            newState.singleSpot = {
                ...action.spot,
                ...state.singleSpot
            }
            return newState
        }

        //delete a spot
        case DELETE_SPOT: {
            // newState = {...state, ...newState.allSpots}
            newState = {singleSpot:{}, allSpots: {...state.allSpots}}
            // console.log("state in reducer of delete spot=====================",state.allSpots)

            delete newState.allSpots[action.spotId]
            return newState
        }

        //add an image payload: img, spot
        case ADD_IMAGE: {
            return {
                ...state,
                singleSpot: {
                    // ...state.singleSpot,
                    ...action.spot,
                    SpotImages: [action.img]
                },
                // allSpots: {
                //     ...state.allSpots,
                //     [action.spot.id.previewImage]:action.img
                // }
            }
        }

        default:
            return state
    }
}

export default spotReducer;
