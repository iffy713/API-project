import { csrfFetch } from "./csrf"

const LOAD_SPOT_BOOKINGS = 'bookings/loadSpotBookings'
const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings'

const actionGetSpotBookings = (bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    }
}

const actionGetUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const thunkGetSpotBookings = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    // console.log("!!!!!!response in thunk of get sopt booing",res)
    if(res.ok){
        const data = await res.json()
        // console.log("data in thunkkkkkkk", data)
        dispatch(actionGetSpotBookings(data.Booking))
    }
}

export const thunkGetUserBookings = () => async(dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if(res.ok){
        const data = await res.json()
        dispatch(actionGetUserBookings(data.Booking))
    }
}

const bookingReducer = (state={}, action) => {
    let newState = {}
    switch(action.type){
        case LOAD_SPOT_BOOKINGS:
            action.bookings.forEach(booking => (
                // console.log(booking)
                newState[booking.id] = booking
            ))
            return newState

        case LOAD_USER_BOOKINGS:
            action.bookings.forEach(booking => (
                newState[booking.id] = booking
            ))
            return newState

        default:
            return state
    }
}

export default bookingReducer
