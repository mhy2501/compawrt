
import MyNavBar from '../components/MyNavBar'
import { Organization } from '../components/Organization'
import './Ngos.css'

function Ngos() {
    return (
        <>
         <MyNavBar />
         <div className='org-cards'>
         {Organization.map((org, index) => {
            return (
                <div className={org.cName} key={index}>
                    <img className='org-img' src={org.img} alt="org logo" />
                    <a href={org.volunteerUrl}>
                        <button className='volunteer-btn'>Volunteer</button>
                    </a>
                    <a href={org.donateUrl}>
                        <button className='donate-btn'>Donate</button>
                    </a>
                </div>
            )

         })}
         </div>
        </>
    )
}

export default Ngos