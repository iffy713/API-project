import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotBookings } from "../../store/booking";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'

export default function SpotBookings({spotId}){
    const dispatch = useDispatch()
    const spotBookingsObj = useSelector(state =>state.bookings)
    console.log(spotBookingsObj)

    useEffect(()=>{
        dispatch(thunkGetSpotBookings(spotId))
    }, [dispatch])

    return(
        <div>
            Booking Component
            {/* <DateRangePicker/> */}
        </div>
    )
}
