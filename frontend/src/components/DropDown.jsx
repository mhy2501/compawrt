import {useState} from 'react'
import './DropDown.css'

function DropDown({dropDown, setDropDown}) {

    const [isActive, setIsActive] = useState(false)
    const options = [
        "Philippine Animal Welfare Society (PAWS)", 
        "Compassion and Responsibility for Animals (CARA)",
        "People for the Ethical Treatment of Animals (PETA)",
        "Animal Welfare Coalition (AWC)",
        "Animal Kingdom Foundation (AKF)",
        "Pawssion Project",
        "Philippine Animal Rescue Team (PART)",
        "WWF - Philippines"
    ]
   
    return (
    <div className='dropdown'>
        <div className='dropdown-btn' onClick={(e) => {setIsActive(!isActive)}}>
        {dropDown}
        <span className='fas fa-caret-down'></span>
        </div>
        {isActive && (
            <div className='dropdown-content'>
                {options.map((option) => (
                    <div
                    onClick= { () => {
                        setDropDown(option)
                        setIsActive(false)
                    }}
                    className="dropdown-item"
                    >
                        {option}
                        </div>
                ))}
                </div>
        )}

    </div>
  )
}

export default DropDown