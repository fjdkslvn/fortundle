import React from "react";
import styles from "./Key.module.css";

const Key = ({ keyInfo, state, writeWord }) => {
  return (
    <button
      className={[
        styles.key,
        styles[state],
        keyInfo.function && styles.function,
      ].join(" ")}
      onClick={() => writeWord(keyInfo.keyCode)}
    >
      {keyInfo.hangle}
    </button>
  );
};

export default Key;
