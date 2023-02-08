import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotBookings } from "../../store/booking";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import BookingPannel from "./BookingPannel";

export default function SpotBookings({spotId}){
    const dispatch = useDispatch()
    // const spotBookingsObj = useSelector(state =>state.bookings)
    const [ startDate, setStartDate ] = useState(null)
    const [ endDate, setEndDate ] = useState(null)
    const [ focusedInput, setFocusedInput ] = useState(null)


    // console.log(spotBookingsObj)

    useEffect(()=>{
        dispatch(thunkGetSpotBookings(spotId))
    }, [dispatch])

    // console.log("!!!!!!!!!",startDate)
    // console.log("!!!!!!!!!",endDate)

    return(
        <div>
            {!startDate && !endDate?(
                <div>
                    Select Check-in Date
                </div>):(
                <div>
                    Select Checkout Date
                </div>
            )}
            {/* {startDate && endDate && (
                <div>
                    {startDate} - {endDate}
                </div>
            )} */}
            <BookingPannel
                spotId={spotId}
                startDate={startDate}
                endDate={endDate}
                focusedInput={focusedInput}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setFocusedInput={setFocusedInput}
            />
                {/* <DayPickerRangeController
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
                /> */}
        </div>
    )
}
