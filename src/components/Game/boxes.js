import React from "react";
import styles from "./boxes.module.css";
function Box(props) {
  let name = `${styles.box}`;
  if (props.selected) name = name + ` ${styles.box_selected}`;
  if (props.colour == 0) name = name + ` ${styles.box_red}`;
  else if (props.colour == 1) name = name + ` ${styles.box_green}`;
  return <div className={name} onClick={props.onClick}></div>;
}

export default Box;
