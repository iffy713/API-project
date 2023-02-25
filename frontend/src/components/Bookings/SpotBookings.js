import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetSpotBookings } from "../../store/booking";
import moment from "moment";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import { thunkCreateBooking } from "../../store/booking";
import 'react-dates/lib/css/_datepicker.css';
import './SpotBookings.css'



export default function SpotBookings({spotId}){
    const dispatch = useDispatch()
    // const spotBookingsObj = useSelector(state =>state.bookings)
    const [ startDate, setStartDate ] = useState(null)
    const [ endDate, setEndDate ] = useState(null)
    const [ focusedInput, setFocusedInput ] = useState(null)


    // console.log(spotBookingsObj)

    // useEffect(()=>{
    //     dispatch(thunkGetSpotBookings(spotId))
    // }, [dispatch])



    let startDateString = ''
    let endDateString = ''
    if(startDate){
        startDateString = moment(startDate).format("YYYY-MM-DD")
    }
    if(endDate){
        endDateString = moment(endDate).format("YYYY-MM-DD")
    }

    const handleReserve = () => {
        const booking = {
            "startDate": startDateString,
            "endDate": endDateString
        }
        dispatch(thunkCreateBooking(spotId, booking))
    }
    return(
        <>
            <DateRangePicker
                numberOfMonths={2}
                minimumNights={1}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({startDate, endDate})=> {
                    setStartDate(startDate)
                    setEndDate(endDate)
                }}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                focusedInput={focusedInput}
            />
            {/* <button onClick={handleReserve}>Reserve</button> */}
        </>
    )
}
