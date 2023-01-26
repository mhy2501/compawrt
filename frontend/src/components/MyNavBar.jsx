import React from 'react'
import './MyNavBar.css'
import { MenuItems } from './MenuItems'
import { Link } from 'react-router-dom'
import logo from '../assets/compawrtlogo.png'


function MyNavBar() {
  return (
    <div>
      <nav className='navbar'>
        <img src={logo} alt='compawrt logo' className='navbar-logo'></img>
        <ul className='nav-menu'>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>{item.title}</Link>
              </li>
              )
            })}
            <Link to='/signup'>
              <button>Sign up</button>
            </Link>
        </ul>
      </nav>
    </div>
  )
}

export default MyNavBar