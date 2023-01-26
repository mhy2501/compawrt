import { useState, useEffect } from 'react'
import app from '../api/axios-config'
import DashboardProfile from './DashboardProfile'

function UserProfile() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const res = await app.get('/user')
            setUser(res.data)
        } catch (err) {
            setError(err.message)
        }
       
    }
 console.log(user)
  return (
    <>
      {user && <DashboardProfile user={user} />}
   {/* {console.log(user)} */}
   </>
  )
    
   
}

export default UserProfile
