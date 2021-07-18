import React from "react";
import Screen from "../Game/screen";
import { Switch, Route } from "react-router-dom";
import Home from "../home/home";
function Router(props) {
  return (
    <div>
      <Switch>
        <Route path={"/game"} exact={true}>
          <Screen socket={props.socket} id={props.id} />
        </Route>
        <Route path="/" exact={true}>
          <Home socket={props.socket} id={props.id} />
        </Route>
      </Switch>
    </div>
  );
}

export default Router;
