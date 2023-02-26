import SingleSpotMap from "../../../GoogleMap/SingleSpotMap";
import ReviewOfSpot from "../../../Reviews/ReviewOfSpot";


export default function BottomContainer({spotId, singleSpot}){
    return (
        <>
            <ReviewOfSpot />
            <SingleSpotMap singleSpot={singleSpot}/>
        </>
    )
}
