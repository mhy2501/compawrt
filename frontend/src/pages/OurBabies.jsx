import MyNavBar from '../components/MyNavBar'
import { Outlet } from 'react-router-dom'

function OurBabies() {
    return (
        <>
        <MyNavBar />
        <h1>this is the our babies page</h1>
        <Outlet />
        </>
    )
}

export default OurBabies