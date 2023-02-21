import { useEffect, useState } from "react";
import { DateRangePicker, DayPickerRangeController } from "react-dates";
import { useDispatch } from "react-redux";
import moment from "moment";
import CreateReviewFormModal from "../../../CreateReviewModal";
import './index.css'
import { thunkCreateBooking } from "../../../../store/booking";
import SpotBookings from "../../../Bookings/SpotBookings";

export default function MiddleContainer({singleSpot,userId, spotId}){

    const dispatch = useDispatch()
    const [ startDate, setStartDate ] = useState(null)
    const [ endDate, setEndDate ] = useState(null)
    const [ focusedInput, setFocusedInput ] = useState(null)

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
            'startDate': startDateString,
            'endDate': endDateString
        }
        dispatch(thunkCreateBooking(spotId, booking))
    }

    return (
        <>
            <div id='middle-ctn'>
                <div id='middle-ctn-left'>
                    <div style={{'borderBottom': "1px solid gray"}}>
                        <h2>Hosted by {singleSpot.Owner.firstName}</h2>
                    </div>
                    <div>
                        {/* <DateRangePicker /> */}
                        <DayPickerRangeController
                            numberOfMonths={2}
                            minimumNights={1}
                            startDate={startDate}
                            endDate={endDate}
                            onDatesChange={({startDate, endDate})=> {
                                setStartDate(startDate)
                                setEndDate(endDate)
                            }}
                            focusedInput={focusedInput}
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                            // initialVisibleMonth={()=> moment().add(2,'M')}
                        />
                        {/* <SpotBookings /> */}
                    </div>
                </div>
                <div id='middle-ctn-right'>
                    <div id='price-pannel-outer'>
                        <div id="price-pannel-ctn">
                            <div id="price-pannel-top">
                                <div>
                                    <span id='room_price'>
                                        ${singleSpot.price}
                                    </span>
                                    <span style={{"margin-left":"5px"}}>
                                        night
                                    </span>
                                </div>
                                <div style={{"marginTop":"8px"}}>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span>{singleSpot.avgStarRating.toFixed(1)} ·</span>
                                    <span style={{"margin-left":"5px"}}>{singleSpot.numReviews} reviews</span>
                                </div>
                            </div>
                            <div id="price-pannel-bottom">
                                <div style={{'position':'relative'}}>
                                    <div>
                                        <div style={{'display':'flex'}}>
                                            <div style={{'width':'100%'}}>
                                                <div style={{'position':'relative'}}>
                                                    <div id="date-select-btn-ctn">
                                                        <button id='date-select-btn' type="button">
                                                            <div className="date-select-children">
                                                                <div className="date-select-header">CHECK-IN</div>
                                                                <div className="date-select-input">
                                                                    {startDate}
                                                                </div>
                                                            </div>
                                                            <div className="date-select-children" style={{'borderLeft':'1px solid rgb(176, 176, 176)'}}>
                                                                <div className="date-select-header">CHECKOUT</div>
                                                                <div className="date-select-input">
                                                                    {endDate}
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{'flexShrink':'0'}}>
                                    <div >
                                        <button onClick={handleReserve} id='booking-reserve-btn'>Reserve</button>
                                    </div>
                                </div>
                            </div>
                                {userId && singleSpot.Owner.id !== userId && (
                                    <CreateReviewFormModal />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
