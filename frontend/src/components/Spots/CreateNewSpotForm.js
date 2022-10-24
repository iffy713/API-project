import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNewSpot } from "../../store/spots"
import './CreateNewSpotForm.css'

export default function CreateNewSpotForm(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDesprition] = useState()
    const [errors, setErrors] = useState([])
    const [imageUrl, setImageUrl] = useState()


    const handleSubmit = async e =>{
        e.preventDefault()
        setErrors([])
        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            description,
            imageUrl
        }


        let createdSpot = await dispatch(createNewSpot(newSpot))
            .catch(async(res)=> {
                const data = await res.json()
                //console.log("trying to create a new spot", data)
                if(data && data.errors) setErrors(data.errors)
                // //console.log(errors)
            })
        if(createdSpot){
            setErrors([])
            history.push(`/spots/current`)
        }
    }

    return(
        <div id='creat_spot_form_container'>
            <div>
                <h1 id="title_of_create_form">Create a new spot</h1>
            </div>
            <form onSubmit={handleSubmit}
                id='create_spot_form'
            >
                <ul className="error_messages">
                    {errors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
                <div>
                    <input placeholder="Address"
                        required
                        type={'text'}
                        value={address}
                        onChange={e=>setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="City"
                        required
                        type={'text'}
                        value={city}
                        onChange={e=>setCity(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="State"
                        required
                        type={'text'}
                        value={state}
                        onChange={e=>setState(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Country"
                        required
                        type={'text'}
                        value={country}
                        onChange={e=>setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Latitude"
                        required
                        type={'text'}
                        value={lat}
                        onChange={e=>setLat(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Lontitude"
                        required
                        type={'text'}
                        value={lng}
                        onChange={e=>setLng(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Name of your spot"
                        required
                        type={'text'}
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Price per night"
                        required
                        type={'text'}
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder='Image Url'
                        required
                        type={'text'}
                        value={imageUrl}
                        onChange={e=>setImageUrl(e.target.value)}
                    />
                </div>
                <div id="create_spot_textarea_container">
                    <textarea placeholder="Description"
                        className="text_area_box"
                        required
                        type={'text'}
                        value={description}
                        onChange={e=>setDesprition(e.target.value)}
                    />
                </div>
                <div>
                    <button id="create_form_submit_btn"type="submit">Create Spot</button>
                </div>
            </form>
        </div>

    )
}
