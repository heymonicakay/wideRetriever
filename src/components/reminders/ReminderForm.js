import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ReminderContext } from "./ReminderProvider"
import { DateContext } from "../time/DateProvider"

import "./Reminder.css"

export const ReminderForm = (props) => {
//REFS
  const dueDate = useRef(null)
  const reminderNote = useRef(null)
  const reminderTitle = useRef(null)
  const dueDateTime = useRef(null)

//CONTEXT
  const { addReminder } = useContext(ReminderContext)
  const { monthArrayShort } = useContext(DateContext)
//EFFECT
  useEffect(()=>{
    setTitleValue("")
    setNoteValue("")
    setDateValue("")
    setTimeValue("")
    setRecurringValue("none")
    setIsRecurring(false)
  }, [])

//STATE
  const [reminder, setReminder] = useState({})
  const [isHidden, setIsHidden] = useState(true)
  const [showNotes, setShowNotes] = useState(false)
  const [titleValue, setTitleValue] = useState("")
  const [noteValue, setNoteValue] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [timeValue, setTimeValue] = useState("")
  const [recurringValue, setRecurringValue] = useState("none")
  const [isRecurring, setIsRecurring] = useState(false)


//HANDLE
  const handleControlledInputChange = (e) => {
    const newReminder = Object.assign({}, reminder)
    newReminder[e.target.name] = e.target.value
    setReminder(newReminder)
  }

  const constructNewReminder = () => {
    const newDueDate = dueDate.toLocaleDateString('en-US')
    const dueDateTimestamp = Date.now(dueDate.current.value)
    if( reminderTitle.current.value === ""){
      alert("Add a title to your reminder.")
    }
    else {
    {addReminder({
      userId: props.currentUserId,
      reminderTitle: reminder.reminderTitle,
      reminderNote: reminder.reminderNote,
      dueDate: newDueDate,
      dueDateTimestamp: dueDateTimestamp,
      timeDue: reminder.dueDateTime,
      dateSet: today,
      timestamp: todayTimestamp,
      isCompleted: false,
      dateCompleted: "",
      isRecurring: isRecurring,
      recurrance: reminder.recurrance
    })}
    }
}

  // translate alien timstamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp)
  // const test = new Date()
  // const testIso = new Date().toISOString()
  // const testTime = test.getTime()
  // // console.log(test, "test")
  // console.log(testTime, "test time")
  // console.log(testIso, "test ISO")

  // exposing functionality to get and set player
  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  // get whole player obj then set player
  // useEffect(() => {
  //   const playerId = parseInt(props.match.params.playerId)
  //     getPlayerByPlayerId(playerId)
  //       .then(setPlayer)
  // }, [])

//HANDLE
  const handleBlur = () => {
    if (reminderTitle.current.value === "") {
      setIsHidden(true)
    }
  }

  const titleChange = (e)=>{
    setTitleValue(e.target.value)
  }

  const noteChange = (e)=>{
    setNoteValue(e.target.value)
  }

  const dateChange = (e)=>{
    setDateValue(e.target.value)
  }

  const timeChange = (e)=>{
    setTimeValue(e.target.value)
  }

  const recurringChange = (e) => {
    setRecurringValue(e.target.value)
  }

const changeTime = ()=>{
  console.log(dueDateTime.current.value, "current time value")

  const timeValue = dueDateTime.current.value

}

const changeDate = () => {

  console.log(dueDate.current.value, "current value")
  const dueDateTimestamp = new Date(dueDate.current.value)
  console.log(dueDateTimestamp, "new Date(dueDate.current.value")
  //output date obj
  const localDueDate = dueDateTimestamp.toLocaleDateString('en-US')
  console.log(localDueDate, "local due date")

  console.log(new Date(), "this day new Date()")
  const tz = new Date().getTimezoneOffset()

  console.log(tz, "timezone offset")



  // const newDateFormat = new Date(dueDate.current.value).toISOString().substr(0, 10)
  // console.log(newDateFormat, "new date NEW CONFIG format")

  // const newDate = newDateFormat.getDate()
  // console.log(newDate, "new date get date")
  // const monthInt = newDateFormat.getMonth()
  // const newMonth = monthArrayShort[monthInt]
  // console.log(newMonth, "new date get month")
  // const newYear = newDateFormat.getFullYear()
  // console.log(newYear, "new date get year")

  // const today = new Date()
  // if(newDateFormat > today) {
  //   console.log("future date")
  // }
  // if(newDateFormat < today) {
  //   console.log("past date")
  // }
  // if(newDateFormat === today) {
  //   console.log("today")
  // }

}
  const toggleNotes = () => {
    if(showNotes === false){
      setShowNotes(true)
    }
    if(showNotes===true){
      setShowNotes(false)
    }
  }
  const toggleIsRecurring = () => {
    if(isRecurring === false){
      setIsRecurring(true)
    }
    if(isRecurring ===true){
      setIsRecurring(false)
    }
  }

  return (
      <>
          <input ref={reminderTitle} value={titleValue} placeholder="Add a reminder..." name="reminderTitle" className="input intput-reminder-title" onChange={(e)=> {
            titleChange(e)
            handleControlledInputChange(e)}} onFocus={()=>{setIsHidden(false)}} onBlur={()=>{handleBlur()}}/>

          <span className="reminder-form-details" hidden={isHidden}>

            <div className="due-date">
              <input className="due-date-input" type="date" ref={dueDate} value={dateValue} name="dueDate" className="input input-reminder-date" onChange={(e)=>{
                dateChange(e)
                handleControlledInputChange(e)}} onBlur={changeDate}/>
            </div>

            <div className="due-date-time">
              <input className="due-date-time-input" type="time" ref={dueDateTime} value={timeValue} name="dueDateTime" className="input input-reminder-time" onChange={(e)=>{
                timeChange(e)
                handleControlledInputChange(e)}} onBlur={changeTime}/>
            </div>

            <div className="add-notes">
              <div className="add-notes-btn" onClick={toggleNotes} >Add Notes</div>
              {showNotes
              ? <textarea ref={reminderNote} value={noteValue} name="reminderNote" className="input input-reminder-note" onChange={(e)=> {
                noteChange(e)
                handleControlledInputChange(e)}}  placeholder="Additional notes..."/>
              :<></>
              }
            </div>

            <div className="recurring">
              <div name="isRecurring" value={isRecurring} onClick={toggleIsRecurring}>Is Recurring</div>
              {isRecurring
              ?
              <select className="select-recurring" value={recurringValue} name="recurrance" onChange={(e)=>{
                recurringChange(e)
                handleControlledInputChange(e)
              }}>
                <option value="none">none</option>
                <option value="day">day</option>
                <option value="week">week</option>
                <option value="month">month</option>
              </select>
              :<></>
              }

            </div>

            <button className="btn" type="button"
              onClick={(e) => {
              constructNewReminder()
              setShowNotes(false)
              setIsHidden(true)
              setTitleValue("")
              setNoteValue("")
              setDateValue("")
              setTimeValue("")
              setRecurringValue("none")}}>
                Add Reminder
            </button>


          </span>
      </>
  );
}
