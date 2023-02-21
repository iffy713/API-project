import Spinner from "../Spinner/Spinner";
import StarRating from 'react-star-ratings'
import './UserSingleReview.css'


export default function UserSingleReview({review}){

    console.log(review)
    const singleSpot = review.Spot

    const timeString = review.createdAt
    const date = new Date(timeString)
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    if (!singleSpot) return <Spinner />


    return (
        <div id="user-single-reviews-ctn">
            {/* This is single review Component */}
            <div id="single-review-left">
                <div>
                    <img src={singleSpot.previewImage} style={{"width":"200px", "height":"180px"}}/>
                </div>
                <div>
                    <h4>{singleSpot.name}</h4>
                    {/* <p>{singleSpot.address}, {singleSpot.city}</p> */}
                </div>
                <div>
                    <h5>
                        Created on {formattedDate}
                    </h5>
                </div>
            </div>
            <div id='single-review-right'>
                <StarRating
                    rating={review.stars}
                    starRatedColor="rgb(57, 57,57)"
                    starDimension='18px'
                    starSpacing='2px'
                />
                <div>
                    {review.review}
                </div>

            </div>
        </div>
    )
}
