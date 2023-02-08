import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/booking";
import UserSingleBooking from "./UserSingleBooking";

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
        <div>
            Trips
            {userBookingsArr.map(booking=>(
                <UserSingleBooking booking={booking} key={booking.id}/>
            ))}
        </div>
    )
}
