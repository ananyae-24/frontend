import React, { useState, useEffect, useContext } from "react";
import styles from "./home.module.css";
import { GlobalContext } from "../../contex/reducers/Provider";
import action from "../../contex/action/game";
import { useHistory } from "react-router-dom";
import Myid from "../../contex/action/myid";
function Home(props) {
  let [state, setState] = useState({
    name: "",
    code: "",
    loading: false,
    message: "",
    gameid: null,
    disabled: false,
  });
  let { gameState, gameDispatch } = useContext(GlobalContext);
  let socket = props.socket;
  const history = useHistory();
  useEffect(() => {
    socket.on("Waiting for other player to join", (data) => {
      let id = data.id_player_1;
      setState((prevState) => {
        return {
          ...prevState,
          message: "Waiting for other player to join",
          gameid: data._id,
        };
      });
    });
    socket.on("Start game", async (game) => {
      let gameid = game._id;
      let player1 = game.player1;
      let id_player_1 = game.id_player_1;
      let player2 = game.player2;
      let id_player_2 = game.id_player_2;
      let data = {
        gameid,
        user: socket.id,
        name: state.name,
        player1,
        player2,
        id_player_1,
        id_player_2,
      };
      let res = await action(data)(gameDispatch);
      if (res) {
        history.push("/game");
      }
    });
  });
  function changename(e) {
    setState((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  }
  function changecode(e) {
    setState((prevState) => {
      return { ...prevState, code: e.target.value };
    });
  }
  function join_room(e) {
    e.preventDefault();
    socket.emit("random_join", { id: gameState.myid, name: state.name });
    setState((prevState) => {
      return { ...prevState, disabled: true };
    });
  }
  return (
    <div className={styles.center}>
      <div>{state.message}</div>
      <p>Enter Name</p>
      <input
        className={styles.padding}
        type="text"
        value={state.name}
        onChange={(e) => {
          e.preventDefault();
          changename(e);
        }}
      />
      <br />
      <button disabled={state.disabled} onClick={join_room}>
        Play against ramdom players
      </button>
      <br />
      {/* <p>Enter Code</p>
      <input
        className={styles.padding}
        type="text"
        value={state.code}
        onChange={(e) => {
          e.preventDefault();
          changecode(e);
        }}
      />
      <br />
      <button>Play against friend</button> */}
    </div>
  );
}

export default Home;
