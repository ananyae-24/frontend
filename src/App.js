import logo from "./logo.svg";
import styles from "./App.module.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Router from "./components/router/router";

import { GlobalContext } from "./contex/reducers/Provider";
import Myid from "./contex/action/myid";

function App(props) {
  let socket = props.socket;
  let [msg, setmsg] = useState(0);
  let { gameState, gameDispatch } = useContext(GlobalContext);
  socket.on("init", (msg) => {
    Myid(msg)(gameDispatch);
  });
  return (
    <div>
      <div className={styles.bg}></div>
      <Navbar />
      <BrowserRouter>
        <Router socket={socket} id={msg} />
      </BrowserRouter>
    </div>
  );
}

export default App;
