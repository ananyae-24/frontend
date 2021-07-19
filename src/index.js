import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalProvider from "./contex/reducers/Provider";
import socketClient from "socket.io-client";
const SERVER = "https://sheltered-headland-12004.herokuapp.com/";
let socket = socketClient(SERVER);
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App socket={socket} />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
