const game = (state, { type, payload }) => {
  if (type === "START") {
    // gameid, user: socket.id
    return {
      ...state,
      user: payload.user,
      gameid: payload.gameid,
      player1: payload.player1,
      player2: payload.player2,
      id_player_1: payload.id_player_1,
      id_player_2: payload.id_player_2,
    };
  } else if (type === "MYID") {
    return { ...state, myid: payload };
  } else return state;
};
export default game;
