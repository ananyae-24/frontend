import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalProvider from "./contex/reducers/Provider";
import socketClient from "socket.io-client";

const SERVER = "https://sheltered-headland-12004.herokuapp.com/"; //http://localhost:3000/
let socket = socketClient(SERVER);
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <div>
        <App socket={socket} />
      </div>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
