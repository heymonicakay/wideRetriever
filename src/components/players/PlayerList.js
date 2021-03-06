import React from "react"
import { Player } from "./Player"
import "./Player.css"

export const PlayerList = (props) => {

        return (
          <>
        {props.userPlayers.map(p => {

          return <Player
          {...props}
          key={p.id}
          player={p}
          currentUser={props.currentUser}
          />
        })
      }
      </>
      )
}

