import React, { useState, useContext, useEffect } from "react";
import Game from "./game";
import { GlobalContext } from "../../contex/reducers/Provider";
import styles from "./screen.module.css";
import { useHistory } from "react-router-dom";
function Screen(props) {
  const history = useHistory();
  let { gameState, gameDispatch } = useContext(GlobalContext);
  let [state, setState] = useState({
    over: false,
    disable: false,
  });
  let socket = props.socket;
  useEffect(() => {
    socket.on("over", (val) => {
      setState((prevState) => {
        return { ...prevState, over: true, message: `Game Over (${val})` };
      });
    });
    socket.on("leave", (message) => {
      setState((prevState) => {
        return { ...prevState, over: true, message: `Game Over (${message})` };
      });
    });
  });
  function leave_handler(e) {
    e.preventDefault();
    socket.emit("leave", gameState.gameid);
    setState((prevState) => {
      return { ...prevState, disable: true };
    });
    history.push("/");
  }
  return (
    <div>
      <div className={styles.right}>
        <div className={styles.text}>
          <p>PLAYER ONE</p>
          <p>Name:- {gameState.player1}</p>
        </div>
      </div>
      {state.over ? (
        <div className={styles.center}>
          <p>{state.message ? state.message : "Game Over"}</p>
          <button disabled={state.disable} onClick={leave_handler}>
            Leave
          </button>
        </div>
      ) : null}

      <Game socket={props.socket} id={props.id} over={state.over} />
      <div className={styles.left}>
        <div className={styles.text}>
          <p>PLAYER TWO</p>
          <p>Name:-{gameState.player2}</p>
        </div>
      </div>
    </div>
  );
}

export default Screen;
