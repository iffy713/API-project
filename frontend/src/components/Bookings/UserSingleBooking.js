import './UserSingleBooking.css'

export default function UserSingleBooking({booking}){

    const spotInfo = booking.Spot
    console.log(booking)

    const formatDate = function(timeStamp){
        const date = new Date(timeStamp)
        const formattedDate = date.toLocaleDateString("en-US",{
            year :"numeric",
            month: "short",
            day: "2-digit"
        })
        return formattedDate
    }

    return (
        <div id="user-single-booking-ctn">
            <div>
                <img src={spotInfo.previewImage} alt={spotInfo.name} style={{"width":"200px", "height":"200px"}}/>
            </div>
            <div>
                Start Date : {formatDate(booking.startDate)}
            </div>
            <div>
                End Date: {formatDate(booking.endDate)}
            </div>

        </div>
    )
}
