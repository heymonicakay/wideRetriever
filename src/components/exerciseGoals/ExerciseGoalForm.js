import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseGoalContext} from "./ExerciseGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"

import "../exercise/ExerciseForm.css"

export const ExerciseGoalForm = (props) => {
// REFS
  const goalSet = useRef(null)
  const measurementType = useRef(null)
  const frequency = useRef(null)
//CONTEXT
  const { addExerciseGoal } = useContext(ExerciseGoalContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies, getFrequencies } = useContext(FrequencyContext)
  const { player, getPlayerByPlayerId } = useContext(PlayerContext)
//STATE
  const [ exerciseGoal, setExerciseGoal ] = useState({})
  const [ singular, setSingular ] = useState(true)
  const playerId = parseInt(props.match.params.playerId)
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')
//EFFECT
  useEffect(()=>{
    getMeasurementTypes()
    getFrequencies()
    getPlayerByPlayerId(playerId)
  }, [])
//HANDLE
  const handleControlledInputChange = (e) => {
    if(goalSet.current.value <= 1) {
      setSingular(true)
    }
    else {
      setSingular(false)
    }
    const newExerciseGoal = Object.assign({}, exerciseGoal)
    newExerciseGoal[e.target.name] = e.target.value
    setExerciseGoal(newExerciseGoal)
  }

  const constructNewExerciseGoal = () => {
    const playerId = parseInt(props.match.params.playerId)
    {addExerciseGoal({
      playerId,
      goalSet: parseInt(exerciseGoal.goalSet),
      measurementTypeId: parseInt(measurementType.current.value),
      frequencyId: parseInt(frequency.current.value),
      timestamp: Date.now(),
      date: today,
    })
    .then(props.history.push(`/players/goals/training/add/${playerId}`))}
  }

  return (
    <div className="cont--form-ex">
      <section className="form">
        <div className="h1 header__form header__form--ex">
          Exercise Goal for {player.name}
        </div>

        <div className="how-often">How often would you like {player.name} to exercise?</div>

        <div className="row">

        <input type="number" defaultValue="" min="0" max="60" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

        {singular
          ?
          <>
            <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
              {measurementTypes.map(mt => (
                  <option key={mt.id} value={mt.id}>
                      {mt.measurement}
                  </option>
              ))}
          </select>
          </>
          :
          <>
          <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
              {measurementTypes.map(mt => (
                  <option key={mt.id} value={mt.id}>
                      {mt.plural}
                  </option>
              ))}
          </select>
          </>
        }

        <label forHTML="frequency">every</label>

        <select defaultValue="" name="frequency" ref={frequency} id="frequency" className="select select--fq" onChange={handleControlledInputChange}>
              {frequencies.map(f => (
                <option key={f.id} value={f.id}>
                      {f.each}
                  </option>
              ))}
          </select>
          </div>

          <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExerciseGoal()
              }}>
              Set Goal!
              </button>
      </section>
    </div>
  );
}
