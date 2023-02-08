import { DateRangePicker } from "react-dates";
import { useDispatch } from "react-redux";
import moment from "moment";
import { thunkCreateBooking } from "../../store/booking";

export default function BookingPannel({spotId,startDate, endDate, focusedInput, setStartDate, setEndDate, setFocusedInput}) {

    const dispatch = useDispatch()

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


    return (
        <div id="booking-pannel-outer">
            <div id="booking-pannel-ctn">
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={({startDate, endDate})=> {
                        setStartDate(startDate)
                        setEndDate(endDate)
                    }}
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    focusedInput={focusedInput}
                />
                <button onClick={handleReserve}>Reserve</button>
            </div>
        </div>
    )
}
