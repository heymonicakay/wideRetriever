import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "./PlayerProvider"

import "./PlayerForm.css"

export const PlayerForm = (props) => {
  const hiddenFileInput = useRef(null)
  const playerName = useRef(null)
  const breed = useRef(null)
  const age = useRef(null)
  const delDialog = useRef(null)

  const editMode = props.match.params.hasOwnProperty("playerId")
  const [player, setPlayer] = useState({})
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("https://res.cloudinary.com/heymonicakay/image/upload/v1600707287/wideRetriever/693F6F0F-7A84-45D0-A5D5-A7B24C1DC8B6_cayzff.png")
  const [isHidden, setIsHidden] = useState(true)

  const { addPlayer, players, editPlayer, getPlayers, removePlayer } = useContext(PlayerContext)

  const handleControlledInputChange = (event) => {
    const newPlayer = Object.assign({}, player)
    newPlayer[event.target.name] = event.target.value
    setPlayer(newPlayer)
  }

  const handleClick = e => {
    hiddenFileInput.current.click();
  };

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'wideRetriever')
    setLoading(true)

    const res = await fetch("	https://api.cloudinary.com/v1_1/heymonicakay/image/upload",
      {
        method: 'POST',
        body: data
      })

    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)
    setIsHidden(false)
  }

  const getPlayerInEditMode = () => {
    if (editMode) {
      const playerId = parseInt(props.match.params.playerId)
      const selectedPlayer = players.find(p => p.id === playerId) || {}
      setPlayer(selectedPlayer)
    }
  }
  useEffect(() => {
    getPlayers()
  }, [])

  useEffect(() => {
    getPlayerInEditMode()
  }, [players])

  const constructNewPlayer = () => {

    const userId = parseInt(sessionStorage.getItem("wr__user"))

    if (editMode) {
      editPlayer({
        id: player.id,
        playerImg: player.playerImg,
        userId: userId,
        name: player.name,
        breed: player.breed,
        age: player.age,
      })
      .then(() => props.history.push("/players"))
    }
    else {
      addPlayer({
        userId: userId,
        playerImg: image,
        name: player.name,
        breed: player.breed,
        age: player.age,
      })
      .then(() => props.history.push("/players"))
    }
  }

  return (
    <>
    <dialog className="dialog dialog--del-check" ref={delDialog}>
            <div className="cont__dialog-msg--del-check">
              Woof! Are you sure you want to remove {player.name} from the roster?
            </div>

            <div className="cont__dialog-btns--del-check">
              <button className="btn btn-del--sure" onClick={() => removePlayer(player.id).then(() => props.history.push("/players"))}>
                  Yes, I'm sure.
              </button>
              <button className="btn btn-del--nvm" onClick={e => delDialog.current.close()}>
                  Actually, nevermind.
              </button>
            </div>
          </dialog>

    <div className="cont--form-pl">

      <section className="form">

        <h2 className="h2 header header__form header__form--pl">
          {editMode
            ? "Update Player"
            : "Add Player"
          }
        </h2>

        {editMode
          ? (
            <div className="upload--img">
              <img src={player.playerImg} alt="" className="img-uploaded" />
              <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1600721607/wideRetriever/39C3366F-F773-4E49-B179-178B3AF5A19E_hafmwv.png" alt="" className="img-overlay" onClick={()=>{
                  handleClick()}}/>

              <div className="file-input-container">
                  <input type="file" style={{display: 'none'}} ref={hiddenFileInput} name="file" size="10" placeholder="upload an image" onChange={uploadImage}/>
                </div>
            </div>
            )
          :
            (
              <>
                <div className="file-input-container">
                  <input type="file" style={{display: 'none'}} ref={hiddenFileInput} name="file" size="10" placeholder="upload an image" onChange={uploadImage}/>
                </div>
              {loading
                ?(
                    <h3 className="h3 h3--img-load">Fetching..</h3>
                  )
                :(
                  <>
                    <img src={image} alt="" className="img-uploaded" onClick={handleClick}/>
                    <span className="img-overlay" hidden={isHidden} alt=""
                      onClick={()=>{
                        handleClick()}}
                    ></span>
                  </>
                  )
              }
              </>
            )
        }

          <label className="label label__pl-form--name" htmlFor="name">Player Name</label>
          <input type="text" name="name" className="form-pl__ctrl form-pl__ctrl--name" placeholder="Ex: Rufus" defaultValue={player.name} ref={playerName} onChange={handleControlledInputChange}
          />

          <label className="label label__pl-form--name" htmlFor="breed">Player Breed</label>
          <input type="text" name="breed" className="form-pl__ctrl form-pl__ctrl--breed" placeholder="Ex: Poodle" defaultValue={player.breed} ref={breed} onChange={handleControlledInputChange}
          />

          <label className="label label__pl-form--name" htmlFor="age">Player Age</label>
          <input type="text" name="age" required className="form-pl__ctrl form-pl__ctrl--age" placeholder="Ex: 4" defaultValue={player.age} ref={age} onChange={handleControlledInputChange}
          />

          <button type="button" className="btn btn__sbmt btn__sbmt--pl"
            onClick={e => {
              e.preventDefault()
              constructNewPlayer()
            }}>
              {editMode
                ? "Update Player"
                : "Add Player"
              }
          </button>
          {editMode
            ? (
            <button className="btn btn--red"
                  onClick={() => {
                delDialog.current.showModal()
              }}>
                Remove From Roster
            </button>
            )
            : null
          }
      </section>
    </div>
    </>
  )
}