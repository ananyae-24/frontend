import React, { useState, useEffect, useContext } from "react";
import Box from "./boxes";
import styles from "./game.module.css";
import { GlobalContext } from "../../contex/reducers/Provider";
function Game(props) {
  let { gameState, gameDispatch } = useContext(GlobalContext);
  let myid = gameState.myid;
  let socket = props.socket;

  let [win, setWin] = useState({ winner: null });
  let [state, setState] = useState({
    id_to_play: "player1",
    player1: {
      id: "234",
      pieces: [],
    },
    player2: {
      id: "456",
      pieces: [],
    },
    selected: null,
    over: false,
    winner: null,
    // loading:false,
  });
  useEffect(() => {
    let temp = {
      id_to_play: "player1",
      player1: {
        id: gameState.id_player_1,
        pieces: [],
      },
      player2: {
        id: gameState.id_player_2,
        pieces: [],
      },
      selected: null,
      over: false,
      winner: null,
      // loading:false,
    };
    setState((prevState) => {
      return temp;
    });
  }, []);
  socket.on("move", (data) => {
    // console.log("move", data);
    setState((prevState) => {
      return data;
    });
  });
  useEffect(() => {});
  function sendinfo() {
    let data = { state, gameid: gameState.gameid };
    socket.emit("move", data);
  }
  function place_piece(box, player) {
    if (check_valid_move(box, state.selected, 3)) {
      let new_player = { ...state };
      if (new_player[player].pieces.length < 3)
        new_player[player].pieces.push(box);
      else {
        new_player[player].pieces = new_player[player].pieces.filter(function (
          item
        ) {
          return item !== state.selected;
        });
        new_player[player].pieces.push(box);
        new_player.selected = null;
      }
      if (player === "player1") new_player.id_to_play = "player2";
      else new_player.id_to_play = "player1";
      // console.log("new state", new_player);
      setState((prevState) => {
        return new_player;
      });
    }
    // console.log("state", state);
    call_check_state();
    sendinfo();
  }

  function select_a_piece(box) {
    if (state[state.id_to_play].pieces.includes(box))
      setState((prevState) => {
        return { ...prevState, selected: box };
      });
  }
  function check_its_my_turn() {
    let curr_turn = state.id_to_play;
    // console.log(state[curr_turn].id, myid);
    // console.log(state[curr_turn].id === myid);
    return state[curr_turn].id === myid;
  }
  function click_handler(e, box, player, player_not_playing) {
    e.preventDefault();
    if (check_its_my_turn() && !props.over) {
      if (!state[player_not_playing].pieces.includes(box)) {
        if (state[player].pieces.includes(box) && box != state.selected) {
          select_a_piece(box);
        } else if (
          state[player].pieces.includes(box) &&
          box === state.selected
        ) {
          deselect(box);
        } else if (state[player].pieces.length < 3) {
          place_piece(box, player);
        } else if (
          state[player].pieces.length === 3 &&
          state.selected !== null
        ) {
          place_piece(box, player);
        }
      }
    }
  }

  function deselect(box) {
    if (state.selected === box)
      setState((prevState) => {
        return { ...prevState, selected: null };
      });
  }
  function getcolour(box) {
    if (state.player1.pieces.includes(box)) return 0;
    else if (state.player2.pieces.includes(box)) return 1;
    else return null;
  }
  function call_check_state() {
    if (
      checkwinstate(state.player1.pieces) ||
      checkwinstate(state.player2.pieces)
    ) {
      if (checkwinstate(state.player1.pieces)) {
        setState((prevState) => {
          return { ...prevState, over: true, winner: "player1" };
        });
        socket.emit("over", {
          winner: "player1",
          message: "Winner is Player1",
          gameid: gameState.gameid,
        });
        setWin({ winner: "player1" });
      } else {
        setState((prevState) => {
          return { ...prevState, over: true, winner: "player2" };
        });
        socket.emit("over", {
          winner: "player2",
          message: "Winner is Player2",
          gameid: gameState.gameid,
        });
        setWin({ winner: "player2" });
      }
    }
  }
  function checkwinstate(arr) {
    let x = false;
    // console.log(arr);
    if (
      (arr.includes(0) && arr.includes(1) && arr.includes(2)) ||
      (arr.includes(3) && arr.includes(4) && arr.includes(5)) ||
      (arr.includes(6) && arr.includes(7) && arr.includes(8)) ||
      (arr.includes(0) && arr.includes(3) && arr.includes(6)) ||
      (arr.includes(1) && arr.includes(4) && arr.includes(7)) ||
      (arr.includes(2) && arr.includes(5) && arr.includes(8)) ||
      (arr.includes(0) && arr.includes(4) && arr.includes(8)) ||
      (arr.includes(2) && arr.includes(4) && arr.includes(6))
    ) {
      x = true;
    }
    return x;
  }
  function check_valid_move(to, from, len) {
    if (from === null) return true;
    let x = false;
    if (from % len !== 0 && from % len !== len - 1) {
      if (
        to === from + 1 ||
        to === from - 1 ||
        to === from + len ||
        to === from - len ||
        to === from + len - 1 ||
        to === from + len + 1 ||
        to === from - len + 1 ||
        to === from - len - 1
      )
        x = true;
    } else if (from % len === len - 1) {
      if (
        to === from - 1 ||
        to === from + len ||
        to === from + len - 1 ||
        to === from - len ||
        to === from - len - 1
      )
        x = true;
    } else if (from % len === 0) {
      if (
        to === from + 1 ||
        to === from + len ||
        to === from + len + 1 ||
        to === from - len ||
        to === from - len + 1
      )
        x = true;
    }
    return x;
  }
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(
      <Box
        key={i}
        colour={getcolour(i)}
        selected={i === state.selected}
        onClick={(e) => {
          e.preventDefault();
          if (!state.over) {
            if (state.id_to_play === "player1")
              click_handler(e, i, "player1", "player2");
            else click_handler(e, i, "player2", "player1");
          }
        }}
      />
    );
  }
  let ann_class = `${styles.ann} ${
    state.id_to_play == "player1" ? styles.red : styles.green
  }`;
  if (state.over) {
    ann_class = `${styles.ann} ${
      state.winner == "player1" ? styles.red : styles.green
    }`;
  }
  return (
    <div>
      <div className={styles.grid}>{board}</div>
      <div className={ann_class}>
        {!state.over ? (
          <p className={styles.p}>This turn is of {state.id_to_play}</p>
        ) : (
          <p className={styles.p}>The winner is {state.winner}</p>
        )}
      </div>
    </div>
  );
}

export default Game;
