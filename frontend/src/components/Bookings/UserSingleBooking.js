import Spinner from "../Spinner/Spinner"

export default function UserSingleBooking({booking}){

    const spotInfo = booking.Spot

    return (
        <div>
            Single booking component
            <div>
                <img src={spotInfo.previewImage} alt={spotInfo.name} style={{"width":"200px", "height":"200px"}}/>
            </div>
            {spotInfo.name}
        </div>
    )
}
