import { DayPickerRangeController } from "react-dates";
import CreateReviewFormModal from "../../../CreateReviewModal";
import './index.css'

export default function MiddleContainer({singleSpot,userId}){

    return (
        <>
            <div id='middle-ctn'>
                <div id='middle-ctn-left'>
                    <div style={{'borderBottom': "1px solid gray"}}>
                        <h2>Hosted by {singleSpot.Owner.firstName}</h2>
                    </div>
                    <div>
                        <DayPickerRangeController />
                    </div>
                </div>
                <div id='middle-ctn-right'>
                    <div id='price-pannel-outer'>
                        <div id="price-pannel-ctn">
                            <div>
                                <span id='room_price'>
                                    ${singleSpot.price}
                                </span>
                                night
                            </div>
                            <div>
                                <span><i className="fa-solid fa-star"></i></span>
                                <span>{singleSpot.avgStarRating.toFixed(1)} ·</span>
                                <span>{singleSpot.numReviews} reviews</span>
                            </div>
                            <div>
                                <button id='date-select-btn'>
                                    <div className="date-select-children">
                                        <div className="date-select-header">CHECK-IN</div>
                                        <div className="date-select-input">

                                        </div>
                                    </div>
                                    <div className="date-select-children">
                                        <div className="date-select-header">CHECKOUT</div>
                                        <div className="date-select-input">

                                        </div>

                                    </div>
                                </button>
                                {/* <SpotBookings spotId={spotId}/> */}
                            </div>
                                {/* {userId && singleSpot.Owner.id !== userId && (
                                    <CreateReviewFormModal />
                                )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
