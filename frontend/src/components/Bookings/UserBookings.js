import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/booking";
import UserSingleBooking from "./UserSingleBooking";
import './UserBookings.css'

export default function UserBookings(){
    const dispatch = useDispatch()
    const userBookingsObj = useSelector(state => state.bookings)
    let userBookingsArr
    console.log(userBookingsArr)

    useEffect(()=>{
        dispatch(thunkGetUserBookings())
    }, [dispatch])

    userBookingsArr = Object.values(userBookingsObj)

    return (
        <div id='my-trips-ctn-outer'>
            <h1>
                Trips
            </h1>
            <div id="my-bookings-outer">
                {userBookingsArr.map(booking=>(
                    <UserSingleBooking booking={booking} key={booking.id}/>
                ))}
            </div>
        </div>
    )
}
