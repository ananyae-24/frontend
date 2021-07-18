import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import socketClient from "socket.io-client";
import Navbar from "./components/NavBar/Navbar";
import Router from "./components/router/router";
import GlobalProvider from "./contex/reducers/Provider";
const SERVER = "http://127.0.0.1:8000";
function App() {
  let socket = socketClient(SERVER);
  let [msg, setmsg] = useState(0);
  useEffect(() => {
    socket.on("init", (msg) => {
      setmsg(msg);
    });
  }, []);
  return (
    <div>
      <GlobalProvider>
        <Navbar />
        <BrowserRouter>
          <Router socket={socket} id={msg} />
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
