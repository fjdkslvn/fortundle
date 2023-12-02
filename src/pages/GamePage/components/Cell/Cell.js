import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ value, state }) => {
  return (
    <div
      className={
        state
          ? [styles.cell, styles.submitWord, styles[state]].join(" ")
          : [styles.cell, styles.splitWord, value && styles.inputCell].join(" ")
      }
    >
      {value}
    </div>
  );
};

export default Cell;
