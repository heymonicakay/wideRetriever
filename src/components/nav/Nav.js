import React, { useState, useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { PlayerSearch } from "../players/PlayerSearch"
import { UserContext } from "../users/UserProvider"
import "./Nav.css"

export const Nav = (props) => {
  const createDropdown = useRef(null)
  const accountDropdown = useRef(null)
  const acctBtn = useRef(null)
  const crtBtn = useRef(null)

  const [hideCreateDropdown, setHideCreateDropdown] = useState(true)
  const [hideAccountDropdown, setHideAccountDropdown] = useState(true)
  const [currentUser, setCurrentUser] = useState([])

  const { getCurrentUser } = useContext(UserContext)

  useEffect(()=>{
    getCurrentUser()
    .then(setCurrentUser)
  }, [])


  const toggleCreate = () => {
    if(hideCreateDropdown === true) {
      setHideCreateDropdown(false)
    }
    else{
      setHideCreateDropdown(true)
    }
  }

  const toggleAccount = () => {
    if(hideAccountDropdown === true) {
      setHideAccountDropdown(false)
    }
    else{
      setHideAccountDropdown(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
  }

  return (

    <ul className="nav">
      <div className="cont--search">
        <PlayerSearch {...props}/>
      </div>

      <div className="nav--right-btn-group">
        <div className="btn--create" ref={crtBtn} onClick={()=>{
          toggleCreate()
          setHideAccountDropdown(true)
        }}>
          +
        </div>
        <div className="btn--account" ref={acctBtn} onClick={()=>{
          toggleAccount()
          setHideCreateDropdown(true)

        }}>
          M
        </div>
      </div>

      <div className="cont--create" ref={accountDropdown} hidden={hideCreateDropdown}>

        <Link className="nav__link nav__link--add-pl" to="/players/create"
          onClick={()=>{
            toggleCreate()
          }}>
            Add Player
        </Link>
        <Link className="nav__link nav__link--add-reminder" to="/reminders/create" onClick={()=>{
          toggleCreate()
        }}>
          Add Reminder
        </Link>
        <Link className="nav__link nav__link--add-todo" to="/todo/create" onClick={()=>{
          toggleCreate()
        }}>
          Add To Do
        </Link>
      </div>

      <div className="cont--account" ref={createDropdown} hidden={hideAccountDropdown}>
        <Link className="nav__link nav__link--home" to="/" onClick={()=>{
          toggleAccount()
        }}>
          Home
        </Link>
        <Link className="nav__link nav__link--logout" to="/" onClick={()=>{
          toggleAccount()
          handleLogout()
        }}>
          Logout
        </Link>
      </div>
    </ul>
  )
}