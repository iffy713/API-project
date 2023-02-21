import './TopContainer.css'

export default function TopContainer({singleSpot}){

    return (
        <>
            <section className='spot-detail-header'>
                <div className='spot-detail-name-ctn'>
                    <h1 id="spot-detail-name">{singleSpot.name}</h1>
                </div>
                <div id='spot_sub_header'>
                    <span id='sub_header_child1'>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span>{singleSpot.avgStarRating.toFixed(1)} ·</span>
                        <span>{singleSpot.numReviews} reviews</span>
                    </span>
                    <span className='sub_header_dot'>·</span>
                    <span><i className="fa-solid fa-award"></i> Superhost</span>
                    <span className='sub_header_dot'>·</span>
                    <span id='sub_header_address'>
                        {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
                    </span>
                </div>
            </section>
            <div id="spot_images_container">
                    <div className='main_image_container'>
                        <img id='image0' src={singleSpot.SpotImages[0].url} alt={singleSpot.name} />
                    </div>
                    {singleSpot.SpotImages[1] && (
                        <div className='side_images_container'>
                            <div className='other_images_container'>
                                <img id='image1' src={singleSpot.SpotImages[1].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image2' src={singleSpot.SpotImages[2].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image3' src={singleSpot.SpotImages[3].url} alt={singleSpot.name}/>
                            </div>
                            <div className='other_images_container'>
                                <img id='image4' src={singleSpot.SpotImages[4].url} alt={singleSpot.name}/>
                            </div>
                        </div>
                    )}
                </div>
        </>
    )
}
