import React, { useState, useRef } from "react";
import styles from "./Cell.module.css";

const Cell = ({ value, state }) => {
  return (
    <div
      className={
        state
          ? [styles.submitWord, styles[state]].join(" ")
          : [styles.splitWord, value && styles.inputCell].join(" ")
      }
    >
      {value}
    </div>
  );
};

export default Cell;
